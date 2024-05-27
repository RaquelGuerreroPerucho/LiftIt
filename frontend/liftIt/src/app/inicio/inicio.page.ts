
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  preguntaSeguridad : string="";
  respuestaSeguridad : string="";
  contrasenya : string = "";
  repetirContasenya : string = "";

  emailLogin : string = "";
  contrasenyaLogin : string = "";

  userSev : UsuarioService;

  constructor(private usuarioService : UsuarioService, private navCtrl : NavController, private toastController: ToastController){

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

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    })
    toast.present()
  }


  registrarse(){
    console.log(this.nombreUsuario);
    console.log(this.email);
    console.log(this.contrasenya);
    console.log(this.repetirContasenya);
    console.log(this.preguntaSeguridad);
    console.log(this.respuestaSeguridad);

    // Comprobar que los campos de pregunta y respuesta de seguridad están rellenados
    if (this.preguntaSeguridad === "" || this.respuestaSeguridad === "") {
        this.presentToast('Por favor, rellene los campos de pregunta y respuesta de seguridad');
        return;
    }

    // Comprobar que el nombre de usuario es válido
    const usernameRegex = /^\S*$/;
    if(!usernameRegex.test(this.nombreUsuario)){
      this.presentToast('El nombre de usuario no debe contener espacios');
      return;
    }

    // Comprobar que el email es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.presentToast('El email no es válido');
        return;
    }

    // Comprobar que las contraseñas coinciden
    if (this.contrasenya !== this.repetirContasenya) {
      this.presentToast('Las contraseñas no coinciden');
        return;
    }

    // Comprobar que la contraseña es segura
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(this.contrasenya)) {
      this.presentToast('La contraseña no es segura');
        return;
    }

    this.userSev.registerUser(this.email, this.contrasenya, this.nombreUsuario, this.preguntaSeguridad, this.respuestaSeguridad).pipe(
      tap(result => {
        console.log(result);
        this.navCtrl.navigateForward('calendario');
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
        this.presentToast('Usuario/contraseña incorrectos');
        return of(err);
      })
    ).subscribe();
  }

  selectTabs = 'registrarse';

}
