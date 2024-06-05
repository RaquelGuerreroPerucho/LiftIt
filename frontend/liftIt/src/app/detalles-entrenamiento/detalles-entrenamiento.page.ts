import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrenamiento } from '../services/entrenamiento.model';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Preferences } from '@capacitor/preferences';
import { catchError, of, tap } from 'rxjs';
import { UserService } from '../services/usuario.service';

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detalles-entrenamiento',
  templateUrl: './detalles-entrenamiento.page.html',
  styleUrls: ['./detalles-entrenamiento.page.scss'],
})
export class DetallesEntrenamientoPage implements OnInit {
  idEntrenamiento: string | null;
  images=[
    'assets/imagenes/pakozoic1.png',
    'assets/imagenes/pakozoik2.png',
    'assets/imagenes/pakozoik3.png',
  ];

id: string = "";
calentamiento: string = "";
core: string = "";
duracion: string = "";
ejerComplementarios: string = "";
ejerPrincipales: string = "";
enfriamiento: string = "";
estado: string = "";
estadoTexto: string = "";
fecha: string = "";
hora: string = "";
intensidad: string = "";
sensacion: string = "";
titulo: string = "";
calendar_id: string = "";
user_id: string = "";

  entrService: EntrenamientoService;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, entrenamientoService: EntrenamientoService, userSev : UserService) {
    this.idEntrenamiento = this.route.snapshot.paramMap.get('id');
    this.entrService = entrenamientoService;
   }

  swiperSliderChanged(e: any){
    console.log('changed: ',e);
  }



  ngOnInit() {

    this.obterDatosEntrenamiento();
  }

  async obterDatosEntrenamiento() {

    const { value: userEmail } = await Preferences.get({ key: 'userEmail' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });


    this.entrService.getEntrenamientoById(this.idEntrenamiento!, userToken!, userEmail!).pipe(
      tap(result => {
        console.log(result);

        this.id = result.id;
        this.calentamiento = result.calentamiento;
        this.core = result.core;
        this.duracion = result.duracion.toString();
        this.ejerComplementarios = result.ejerComplementarios;
        this.ejerPrincipales = result.ejerPrincipales;
        this.enfriamiento = result.enfriamiento;
        this.estado = result.estado ? "Completado" : "No completado";
        this.fecha = result.fecha.toString();
        this.hora = result.hora.toString();
        this.intensidad = result.intensidad;
        this.sensacion = result.sensacion;
        this.titulo = result.titulo;
        this.calendar_id = result.idCalendar;
        this.user_id = result.idUser;

      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();


  }


  async borrarEntrenamiento() {
    console.log("Borrar entrenamiento");
    await this.deleteEntrenamiento();
  }

  async deleteEntrenamiento() {
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

    // this.presentToast(" USUARIO :" + userId);

    this.entrService
    .deleteTraining(this.id, userToken!)
    .pipe(
      tap(async (result) => {
        console.log(result);
        this.navCtrl.navigateForward('calendario');
      }),
      catchError((err) => {
        console.error(err);
        return of(err);
      })
    )
    .subscribe();
  }


}
