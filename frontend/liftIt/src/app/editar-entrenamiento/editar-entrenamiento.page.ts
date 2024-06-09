import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Entrenamiento } from '../services/entrenamiento.model';
import { Preferences } from '@capacitor/preferences';
import { catchError, of, tap } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-entrenamiento',
  templateUrl: './editar-entrenamiento.page.html',
  styleUrls: ['./editar-entrenamiento.page.scss'],
})
export class EditarEntrenamientoPage implements OnInit {
  entrService: EntrenamientoService;

  estado: boolean = true;
  titulo: string = '';
  trainingTime: string = '';
  intensidad: string = '';
  sensaciones: string = '';
  calentamiento: string = '';
  ejerciciosPrincipales: string = '';
  ejerciciosComplementarios: string = '';
  core: string = '';
  enfriamiento: string = '';
  esTiempoValido: boolean = true;
  idEntrenamiento: string = '';
  fecha: string = '';
  hora: string = '';
  calendarioId: string = '';

  constructor(
    private route: ActivatedRoute,
    entrenamientoService: EntrenamientoService,
    private navCtrl: NavController
  ) {
    this.entrService = entrenamientoService;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.titulo = params['titulo'];
      this.trainingTime = params['duracion'];
      this.intensidad = params['intensidad'];
      this.sensaciones = params['sensacion'];
      this.calentamiento = params['calentamiento'];
      this.ejerciciosPrincipales = params['ejerPrincipales'];
      this.ejerciciosComplementarios = params['ejerComplementarios'];
      this.core = params['core'];
      this.enfriamiento = params['enfriamiento'];
      this.hora = params['hora'];
      this.esTiempoValido = params['esTiempoValido'] === 'true';
      this.idEntrenamiento = params['idEntrenamiento'];
      this.estado = params['estado'] === 'true';
      this.fecha = params['fecha'];
      this.calendarioId = params['calendar_id'];
    });
  }

  validarTiempo() {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    this.esTiempoValido = regex.test(this.trainingTime);
  }

  async performUpdate() {
    await this.editarEntrenamiento();
  }

  async editarEntrenamiento() {
    const { value: userId } = await Preferences.get({ key: 'userID' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    let entrenamiento: Entrenamiento = {
      id: this.idEntrenamiento, // Puedes asignar un valor adecuado para el id
      calentamiento: this.calentamiento,
      core: this.core,
      duracion: this.trainingTime, // Puedes asignar un valor adecuado para la duración
      ejerComplementarios: this.ejerciciosComplementarios,
      ejerPrincipales: this.ejerciciosPrincipales,
      enfriamiento: this.enfriamiento,
      estado: this.esTiempoValido,
      fecha: new Date(this.fecha), // Puedes asignar un valor adecuado para la fecha
      hora: this.hora, // Puedes asignar un valor adecuado para la hora
      intensidad: this.intensidad,
      sensacion: this.sensaciones,
      titulo: this.titulo, // Puedes asignar un valor adecuado para el título
      idCalendar: '1', // Puedes asignar un valor adecuado para el calendar_id
      idUser: userId!, // Puedes asignar un valor adecuado para el user_id
    };

    console.log("this.idEntrenamiento ->", this.idEntrenamiento);
    console.log("entrenamienot ->", entrenamiento);
    this.entrService
      .updateTraining(this.idEntrenamiento, entrenamiento, userToken!)
      .pipe(
        tap((data) => {
          console.log(data);
          console.log('Entrenamiento actualizado');
          console.log("calendarioId ->", this.calendarioId);
          console.log("userId ->", userId);
          this.navCtrl.navigateForward(`/detalles-entrenamiento/${this.idEntrenamiento}`);

          // Aquí puedes agregar cualquier lógica adicional que necesites ejecutar con los datos
        }),
        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
      .subscribe();
  }
}
