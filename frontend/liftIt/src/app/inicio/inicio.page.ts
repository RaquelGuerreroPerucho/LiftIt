
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';


import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{

  nombreUsuario : string = "";
  email : string = "";
  contrasenya : string = "";
  repetirContasenya : string = "";

  emailLogin : string = "";
  contrasenyaLogin : string = "";

  userSev : UsuarioService;

  constructor(private usuarioService : UsuarioService, private navCtrl : NavController){

    this.userSev = usuarioService;
    
   }

   ngOnInit() {
    this.checkValue();
    };
  

  checkValue = async () => {
    const { value } = await Preferences.get({ key: 'userToken' });
    console.log('El token es:', value);

    if (value != null){
      this.navCtrl.navigateForward('calendario');
    }
    
  };


registrarse(){
    console.log(this.nombreUsuario);
    console.log(this.email);
    console.log(this.contrasenya);
    console.log(this.repetirContasenya);

    this.userSev.registerUser(this.email, this.contrasenya).pipe(
      tap(result => {
        console.log(result);
      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();
  }

  login(){
    
    console.log(this.emailLogin);
    console.log(this.contrasenyaLogin);

    this.userSev.loginUser(this.emailLogin, this.contrasenyaLogin).pipe(
      tap(async(result) => {
        console.log(result);
        const token = result.token;
        await Preferences.set({
          key: 'userToken',
          value: token
        });
        this.navCtrl.navigateForward('calendario');

      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();
  }

  selectTabs = 'registrarse';

}
