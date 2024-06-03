import { Component, Renderer2, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Entrenamiento } from '../services/entrenamiento.model';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { CalendarOptions } from '@fullcalendar/core';
import { en } from '@fullcalendar/core/internal-common';
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../services/usuario.service';

registerLocaleData(localeEs);

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarioPage implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('cardsContainer') cardContainer!: ElementRef;

  entrenamientos = new Map();

  nombreUsuario: string = "";
  estadoEntrenamiento: string = "";
  tiempoEntrenamiento: string = "";
  horaEntrenamiento: string = "";

  ejerciciosObtenidos = false;


  @ViewChild('myDatetime') myDatetime!: ElementRef;
  calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrapPlugin],
    locale: esLocale,
    //plugins: [grid]],
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    height: 'auto',
    events: [
      {
        title: "Entrenamiento",
        start: '2024-05-30T10:00:00',
        end: '2024-05-30T16:00:00',
        color: '#b5a2e8',
      },
      /*
      {
        title: "Entrenamiento",
        start: '2024-06-01T10:00:00',
        end: '2024-06-02T16:00:00',
        display: 'background',
        color: 'purple'
      },*/
    ]
  };

  userSev: UserService;

  constructor(
          private UserService: UserService,
          private toastController: ToastController,
          private renderer: Renderer2,
          private elementRef: ElementRef,
          private entrServ: EntrenamientoService,
          private http: HttpClient,
          private navCtrl: NavController) {
    this.userSev = UserService;
    this.myDatetime = new ElementRef(null);
  }

  ngOnInit() {
    this.initializePage();
  }
  async initializePage() {
    console.log('El token es:', Preferences.get({
      key: 'userToken'
    }));

    await this.obtenerNombreUsuario();
    await this.obterDatosCard();

  }

  async obtenerNombreUsuario() {
    const { value } = await Preferences.get({ key: 'userName' });
    this.nombreUsuario = value ?? '';
    this.presentToast(" userName :" + value);

  }

  async obterDatosCard() {
    const { value: userEmail } = await Preferences.get({ key: 'userEmail' });
    const { value: userToken } = await Preferences.get({ key: 'userToken' });

   // this.presentToast(" USUARIO :" + userId);


    this.userSev.getUserByEmail(userEmail!, userToken!).pipe(
      tap(async (user) => {
        
        this.entrServ.getEntrenamientosUsuario(user.id!, userToken!).pipe(
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
                id: entre.id,
              });
              this.entrenamientos.set(String(entre.id), entre);
          /*    this.presentToast(entre.id +
                " " + entre.sensacion +
                " " + entre.fecha +
                " " + entre.duracion);*/
            });
    
            this.calendarComponent.getApi().refetchEvents();
          }),
          catchError(err => {
          //  this.presentToast(err);
            return of(err);
          })
        ).subscribe();
      }),
      catchError(err => {
        
        return of(err);
      })
    ).subscribe();


    

    this.calendarComponent.getApi().on('eventClick', (info: any) => {

      this.limpiarCartas();
      console.log(info.event.id);
      console.log(info.event.start);
      console.log(info.event.start.getFullYear());
      console.log(info.event.start.getMonth() + 1);
      console.log(info.event.start.getDate());

      let eventosDelDia = this.obtenerEventosDelDia(info.event.start);

      console.log("Eventos del dia: ", eventosDelDia);

      for (let ev of eventosDelDia) {
        let entre = this.entrenamientos.get(String(ev.id));
        console.log(this.entrenamientos);
        console.log(this.entrenamientos.get(String(ev.id)));
        console.log("evento: ", ev, " id: ", ev.id);
        console.log("entrenamiento: ", entre); //" id: ", entre.id);
          if (entre.id == ev.id) {
            this.anyadirCard(
              entre.estado ? "Completado" : "No Completado",
              entre.fecha.toString(),
              entre.duracion.toString(),
              entre.sensacion,
              entre.id);
          }
      }
    });
  }

  limpiarCartas() {
    while (this.cardContainer.nativeElement.firstChild) {
      this.renderer.removeChild(this.cardContainer.nativeElement, this.cardContainer.nativeElement.firstChild);
    }
  }

  obtenerEventosDelDia(fecha: Date) {
    const calendarApi = this.calendarComponent.getApi();
    const eventosDelDia = calendarApi.getEvents().filter(evento => {
      const fechaEvento = evento.start;
      return fechaEvento && fechaEvento.getDate() === fecha.getDate() &&
        fechaEvento.getMonth() === fecha.getMonth() &&
        fechaEvento.getFullYear() === fecha.getFullYear();
    });
    return eventosDelDia;
  }

  navegarADetalles(idEntrenamiento: string) {
    this.navCtrl.navigateForward(`/detalles-entrenamiento/${idEntrenamiento}`);
  }

  anyadirCard(
            estadoEntrenamiento: string,
            horaEntrenamiento: string,
            tiempoEntrenamiento: string,
            nombreEntrenamiento: string,
            idEntrenamiento : string) {

    let cardContainer = this.renderer.createElement('div');
    this.renderer.addClass(cardContainer, 'card-container');

    let ionCard = this.renderer.createElement('ion-card');
    this.renderer.addClass(ionCard, 'custom-card');
    this.renderer.listen(ionCard, 'click', () => this.navegarADetalles(idEntrenamiento));
    //this.renderer.setAttribute(ionCard, 'href', '/detalles-entrenamiento');

    // Aquí puedes continuar creando los demás elementos y añadiéndolos a ionCard

    let ionCardHeader = this.renderer.createElement('ion-card-header');
    let ionCardSubtitle = this.renderer.createElement('ion-card-subtitle');
    this.renderer.addClass(ionCardSubtitle, 'custom-subtitle');
    this.renderer.setProperty(ionCardSubtitle, 'textContent', estadoEntrenamiento);
    this.renderer.appendChild(ionCardHeader, ionCardSubtitle);
    this.renderer.appendChild(ionCard, ionCardHeader);

    let ionCardTitle = this.renderer.createElement('ion-card-title');
    this.renderer.setProperty(ionCardTitle, 'textContent', nombreEntrenamiento);
    this.renderer.appendChild(ionCard, ionCardTitle);

    let flexContainer = this.renderer.createElement('div');
    this.renderer.addClass(flexContainer, 'flex-container');

    let ionCardContentHora = this.renderer.createElement('ion-card-content');
    this.renderer.addClass(ionCardContentHora, 'custom-content');
    this.renderer.setProperty(ionCardContentHora, 'textContent', 'Hora: ' + horaEntrenamiento);
    this.renderer.appendChild(flexContainer, ionCardContentHora);

    let ionCardContentTiempo = this.renderer.createElement('ion-card-content');
    this.renderer.addClass(ionCardContentTiempo, 'custom-content');
    this.renderer.setProperty(ionCardContentTiempo, 'textContent', 'Tiempo: ' + tiempoEntrenamiento);
    this.renderer.appendChild(flexContainer, ionCardContentTiempo);

    this.renderer.appendChild(ionCard, flexContainer);

    // Aquí puedes continuar creando los demás elementos y añadiéndolos a ionCard

    this.renderer.appendChild(cardContainer, ionCard);
    this.renderer.appendChild(this.cardContainer.nativeElement, cardContainer);

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    })
    toast.present()
  }

}

function logTraining(training: Entrenamiento) {
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

