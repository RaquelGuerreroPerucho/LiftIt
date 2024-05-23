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
export class InicioPage{

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
/*    
    this.userSev.registerUser(this.email, this.contrasenya).subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
    */
  }

  login(){
    
    console.log(this.emailLogin);
    console.log(this.contrasenyaLogin);

    this.userSev.loginUser(this.emailLogin, this.contrasenyaLogin).pipe(
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

  selectTabs = 'registrarse';

}
