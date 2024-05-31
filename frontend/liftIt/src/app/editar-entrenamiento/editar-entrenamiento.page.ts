import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-entrenamiento',
  templateUrl: './editar-entrenamiento.page.html',
  styleUrls: ['./editar-entrenamiento.page.scss'],
})
export class EditarEntrenamientoPage implements OnInit {
trainingTime: string = '';
intensidad: string = '';
sensaciones: string = '';
calentamiento: string = '';
ejerciciosPrincipales: string = '';
ejerciciosComplementarios: string = '';
core: string = '';
enfriamiento: string = '';
esTiempoValido: boolean = true;


  constructor() { }

  ngOnInit() {
  }

  validarTiempo() {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    this.esTiempoValido = regex.test(this.trainingTime);
  }

}
