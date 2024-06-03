
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services/usuario.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreUsuario: string = "";
  email: string = "";
  preguntaSeguridad: string = "";
  respuestaSeguridad: string = "";
  contrasenya: string = "";
  repetirContasenya: string = "";

  emailLogin: string = "";
  contrasenyaLogin: string = "";

  authSev: AuthService;
  userSev: UserService;



  constructor(private AuthService: AuthService, private navCtrl: NavController, private toastController: ToastController, private UserService: UserService) {

    this.authSev = AuthService;
    this.userSev = UserService;

  }

  ngOnInit() {
    this.checkValue();
  };


  checkValue = async () => {
    const { value } = await Preferences.get({ key: 'userToken' });
    console.log('El token es:', value);

    if (value != null) {
      this.navCtrl.navigateForward('calendario');
    }

  };

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    })
    toast.present()
  }


  registrarse() {
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
    if (!usernameRegex.test(this.nombreUsuario)) {
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

    this.authSev.registerUser(this.email, this.contrasenya, this.nombreUsuario, this.preguntaSeguridad, this.respuestaSeguridad).pipe(
      tap(result => {
        console.log(result);
        this.loginWithParams(this.email,this.contrasenya)
      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();
  }


  loginWithParams(email: string, pass : string)
  {
    console.log(email);
    console.log(pass);

    this.authSev.loginUser(email, pass).pipe(
      tap(async (result) => {
        console.log(result.token);
        // Obtén los datos del usuario
        this.userSev.getUserByEmail(email, result.token).pipe(
          tap(async (user) => {
            const token = result.token;
            
          
            await Preferences.set({
              key: 'userToken',
              value: token
            });    
            console.log(user);
           
            await Preferences.set({
              key: 'userEmail',
              value: user.email
            }); 

            await Preferences.set({
              key: 'userName',
              value: user.username
            }); 

            this.navCtrl.navigateForward('calendario');
          }),
          catchError(err => {
            this.presentToast('No se ha podido recuperar usuario');
        console.log(result.token);
            
            return of(err);
          })
        ).subscribe();
      }),
      catchError(err => {
      //  this.presentToast('Usuario/contraseña incorrectos');
        this.presentToast(err);
        return of(err);
      })
    ).subscribe();
  }


  login() {
    this.loginWithParams(this.emailLogin,  this.contrasenyaLogin);
  }

  selectTabs = 'registrarse';

}
