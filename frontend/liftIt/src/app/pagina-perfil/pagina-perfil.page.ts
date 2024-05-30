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
    this.removeUserData();
    this.navCtrl.navigateForward('inicio');
  }

  removeUserData = async () => {
    await Preferences.remove({ key: 'userToken' });
    await Preferences.remove({ key: 'userId' });
    await Preferences.remove({ key: 'userEmail' });
    await Preferences.remove({ key: 'userName' });

}}
