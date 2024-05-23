import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-perfil',
  templateUrl: './pagina-perfil.page.html',
  styleUrls: ['./pagina-perfil.page.scss'],
})
export class PaginaPerfilPage implements OnInit {

  email: string = "";
  idioma: string = "";
  tema: string = "";
  version: string="";

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  navegarAlInicio(){
    this.removeToken();
    this.navCtrl.navigateForward('inicio');
  }

  removeToken = async () => {
    await Preferences.remove({ key: 'userToken' });}
};
