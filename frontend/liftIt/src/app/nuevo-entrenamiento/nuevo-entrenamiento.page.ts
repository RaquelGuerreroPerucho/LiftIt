import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-entrenamiento',
  templateUrl: './nuevo-entrenamiento.page.html',
  styleUrls: ['./nuevo-entrenamiento.page.scss'],
})
export class NuevoEntrenamientoPage implements OnInit {
  sensaciones: string = '';
  calentamiento: string = '';
  ejerciciosPrincipales: string = '';
  ejerciciosComplementarios: string = '';
  core: string = '';
  enfriamiento: string = '';
  trainingTime: string = '';
  esTiempoValido: boolean = true;
  intensidad: string = '';

  constructor() {}

  ngOnInit() {}

  validarTiempo() {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    this.esTiempoValido = regex.test(this.trainingTime);
  }
}
