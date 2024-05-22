import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  fotoPerfil!: string;
  correoPrincipal!: string;
  nombreUsuario!: string;
  email!: string;
  idioma!: string;
  tema!: string;
  version!: string;

  constructor() { }

  ngOnInit() {
    this.fotoPerfil = 'assets/imagenes/perfilPako.png';
    this.correoPrincipal = 'pakozoik@hotmail.com';
    this.nombreUsuario = 'Pakozoik';
    this.email = 'pakozoik@hotmail.com'; // Asigna valores actuales
    this.idioma = 'Español'; // Asigna valores actuales
    this.tema = 'Claro'; // Asigna valores actuales
    this.version = '1.0.0';
  }

  editarFotoPerfil() {
    // Agrega aquí la lógica para editar la foto de perfil
    console.log('Editar foto de perfil');
  }

  guardarCambios() {
    // Agrega aquí la lógica para guardar los cambios en el perfil
    console.log('Guardar cambios');
  }

}
