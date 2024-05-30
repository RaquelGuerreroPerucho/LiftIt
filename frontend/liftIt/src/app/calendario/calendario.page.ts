import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Training } from '../services/training.model';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { CalendarOptions } from '@fullcalendar/core';
import { en } from '@fullcalendar/core/internal-common';
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';


registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarioPage implements OnInit{

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  nombreUsuario: string = "";
  estadoEntrenamiento: string = "";
  tiempoEntrenamiento: string = "";
  horaEntrenamiento: string = "";
  

  @ViewChild('myDatetime') myDatetime!: ElementRef;
  calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrapPlugin],
    locale: esLocale,
    //plugins: [grid]],
    initialDate: '2024-05-30',
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    width:'auto',
    height:'auto',
    events:[
      /*{
        title: "Entrenamiento",
        start: '2024-05-30T10:00:00',
        end: '2024-05-30T16:00:00',
        display: 'background',
        color: 'purple'
      },
      {
        title: "Entrenamiento",
        start: '2024-06-01T10:00:00',
        end: '2024-06-02T16:00:00',
        display: 'background',
        color: 'purple'
      },*/
    ]
  };

  constructor(private elementRef: ElementRef, private entrServ : EntrenamientoService, private http: HttpClient) {
    this.myDatetime = new ElementRef(null);
  }

  ngOnInit() {
  console.log('El token es:', Preferences.get({
    key: 'userToken'
  }));

  this.obtenerNombreUsuario();
  this.obterDatosCard();

}

async obtenerNombreUsuario(){
  const { value } = await Preferences.get({ key: 'userName' });
  this.nombreUsuario = value ?? '';
}

async obterDatosCard(){
  const { value: userToken } = await Preferences.get({ key: 'userToken' });
  const { value: userId } = await Preferences.get({ key: 'userId' });

  this.entrServ.getEntrenamientosUsuario(userId!, userToken!).pipe(
    tap(async (result) => {
      
      console.log(result);
      result.forEach(entre => {
        console.log("Entrenamiento  -> ", logTraining(entre));
        
        this.calendarComponent.getApi().addEvent({
          title: "Entrenamiento",
          start: entre.fecha,
          end: entre.fecha,
         // end: new Date(entre.fecha.getTime() + (entre.duracion.hours * 60 * 60 * 1000) + (entre.duracion.minutes * 60 * 1000)),
          color: '#b5a2e8',
          eventBackgroundColor: '#5dbd96',
          eventTextColor: 'white',
        }); 

      });
    }),
    catchError(err => {
    
      return of(err);
    })
  ).subscribe();
  }
}

function logTraining(training: Training) {
  console.log(`id: ${training.id}`);
  console.log(`descripcion: ${training.descripcion}`);
  console.log(`duracion: ${training.duracion}`);
  console.log(`estado: ${training.estado}`);
  console.log(`fecha: ${training.fecha}`);
  console.log(`intensidad: ${training.intensidad}`);
  console.log(`sensacion: ${training.sensacion}`);
  console.log(`user_id: ${training.user_id}`);
  console.log(`calendar_id: ${training.calendar_id}`);
  console.log(`calentamiento: ${training.calentamiento}`);
  console.log(`core: ${training.core}`);
  console.log(`ejer_complementarios: ${training.ejer_complementarios}`);
  console.log(`ejer_principales: ${training.ejer_principales}`);
  console.log(`enfriamiento: ${training.enfriamiento}`);
  // Agrega aquí los demás campos que necesites
}