import { Component, OnInit } from '@angular/core';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Time } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';

import { NavController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Entrenamiento } from '../services/entrenamiento.model';
import { Preferences } from '@capacitor/preferences';
import { UserService } from '../services/usuario.service';
import { catchError, of, tap } from 'rxjs';
import { Directory, Encoding, FileInfo, Filesystem } from '@capacitor/filesystem';
import { S, T } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-nuevo-entrenamiento',
  templateUrl: './nuevo-entrenamiento.page.html',
  styleUrls: ['./nuevo-entrenamiento.page.scss'],
})
export class NuevoEntrenamientoPage implements OnInit {

  path: string = 'ImagesTest';
  photos: string[] = [];

  completado: boolean = false;
  sensaciones: string = '';
  calentamiento: string = '';
  ejerciciosPrincipales: string = '';
  ejerciciosComplementarios: string = '';
  core: string = '';
  enfriamiento: string = '';
  trainingTime: string = '';
  esTiempoValido: boolean = true;
  intensidad: string = '';

  entrService: EntrenamientoService;
  userSev: UserService;

  constructor(private http: HttpClient,
    private navCtrl: NavController,
    entrenamientoService: EntrenamientoService,
    userService: UserService, private toastController: ToastController
  ) {
    this.entrService = entrenamientoService;
    this.userSev = userService;
  }

  ngOnInit() {
    Camera.requestPermissions();
    this.getPhotos();
  }

  //Tema fotos tipo video

  async takePhoto() {
    debugger;
    {
      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });

      if (image) {
        this.savePhoto(image.base64String!);
        this.getPhotos();
      }
      
    };
  }

  async savePhoto(photo?: string) {
    await Filesystem.writeFile({
      path: this.path + '/Test.jpg',
      data: photo || '',
      directory: Directory.Documents,
    });
  }

  getPhotos(){
    debugger;
    Filesystem.readdir(
      {
      path: this.path,
      directory: Directory.Documents,
    }
  ).then(files =>{
   this.loadPhotos(files.files);
  }).catch(err => {
    console.log(err);
    Filesystem.mkdir({
      path: this.path,
      directory: Directory.Documents,
    });
  });
  }

  loadPhotos(photos: FileInfo[]){
    photos.forEach(file => {
      Filesystem.readFile({
        path: `${this.path}/${file.name}`,
      directory: Directory.Documents,
      }).then(photo => {
        this.photos.push('data:image/jpeg;base64,'+ photo.data);
      }
      )
    });
  }

  //Hasta aqui/

  async guardarEntrenamiento() {
    console.log('Sensaciones:', this.sensaciones);
    console.log('Calentamiento:', this.calentamiento);
    console.log('Ejercicios Principales:', this.ejerciciosPrincipales);
    console.log('Ejercicios Complementarios:', this.ejerciciosComplementarios);
    console.log('Core:', this.core);
    console.log('Enfriamiento:', this.enfriamiento);
    console.log('Tiempo:', this.trainingTime);
    console.log('Intensidad:', this.intensidad);

    await this.postGuardarEntrenamiento();
  }

  async postGuardarEntrenamiento() {
    const { value: userEmail } = await Preferences.get({ key: 'userEmail' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    // this.presentToast(" USUARIO :" + userId);

    this.userSev
      .getUserByEmail(userEmail!, userToken!)
      .pipe(
        tap(async (user) => {
          let fecha = new Date();

          let entrenamiento: Entrenamiento = {
            id: '', // Puedes asignar un valor adecuado para el id
            calentamiento: this.calentamiento,
            core: this.core,
            duracion: this.trainingTime, // Puedes asignar un valor adecuado para la duración
            ejerComplementarios: this.ejerciciosComplementarios,
            ejerPrincipales: this.ejerciciosPrincipales,
            enfriamiento: this.enfriamiento,
            estado: this.esTiempoValido,
            fecha: fecha, // Puedes asignar un valor adecuado para la fecha
            hora: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`, // Puedes asignar un valor adecuado para la hora
            intensidad: this.intensidad,
            sensacion: this.sensaciones,
            titulo: 'Entrenamiento', // Puedes asignar un valor adecuado para el título
            idCalendar: '1', // Puedes asignar un valor adecuado para el calendar_id
            idUser: user.id // Puedes asignar un valor adecuado para el user_id
          };

          console.log('Estado:', entrenamiento.estado);
          console.log('Fecha:', entrenamiento.fecha);
          console.log('Hora:', entrenamiento.hora);
          console.log('Intensidad:', entrenamiento.intensidad);
          console.log('Sensación:', entrenamiento.sensacion);
          console.log('Título:', entrenamiento.titulo);
          console.log('ID del Calendario:', entrenamiento.idUser);
          console.log('ID del Usuario:', entrenamiento.idUser);

          this.entrService
            .createTraining(entrenamiento, userToken!)
            .pipe(
              tap(async (result) => {
                console.log(result);
                this.completado = true;

                this.navCtrl.navigateForward('calendario');
              }),
              catchError((err) => {
                console.error(err);
                return of(err);
              })
            )
            .subscribe();
        }),
        catchError((err) => {
          console.error(err);
          return of(err);
        })
      )
      .subscribe();
  }

  validarTiempo() {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    this.esTiempoValido = regex.test(this.trainingTime);
  }


}
