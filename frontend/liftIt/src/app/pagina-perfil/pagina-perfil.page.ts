import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { U, co } from '@fullcalendar/core/internal-common';
import { NavController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { UserService } from '../services/usuario.service';
import { catchError, of, tap } from 'rxjs';
import { Usuario } from '../services/usuario.model';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.page.html',
  styleUrls: ['./pagina-perfil.page.scss'],
})
export class PaginaPerfilPage implements OnInit {
  id: string = '';
  email: string = '';
  username: string = '';
  version: string = '';
  isEditing: boolean = false;

  userSev: UserService;

  constructor(private navCtrl: NavController, userSev: UserService) {
    this.userSev = userSev;
  }

  ngOnInit() {
    this.version = '0.8.0';
    this.obterDatosUsuario();
  }

  navegarAlInicio() {
    this.removeUserData();
    this.navCtrl.navigateForward('inicio');
  }

  removeUserData = async () => {
    await Preferences.remove({ key: 'userToken' });
    await Preferences.remove({ key: 'userID' });
    await Preferences.remove({ key: 'userEmail' });
    await Preferences.remove({ key: 'userName' });
  };

  async obterDatosUsuario() {
    const { value: userId } = await Preferences.get({ key: 'userID' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    console.log('userId:' + userId, 'userToken:' + userToken);
    this.userSev
      .getUserById(userId!, userToken!)
      .pipe(
        tap((result) => {
          console.log(result);

          this.email = result.email;
          this.username = result.username;
        }),
        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
      .subscribe();
  }

  enableEditing() {
    this.isEditing = true;
  }

  async saveChanges() {
    await this.editarPerfil();
    this.isEditing = false;
  }

  async editarPerfil() {
    const { value: userId } = await Preferences.get({ key: 'userID' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    let usuario: Usuario = {
      email: this.email,
      username: this.username,
      id: '',
      password: ''
    }

     this.userSev
    .updateUser(userId!, usuario,userToken!)
      .pipe(
        tap((data) => {
          console.log(data);
          console.log('Usuario actualizado');
        }),
        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
    }
}
