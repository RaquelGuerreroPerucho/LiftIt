import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
