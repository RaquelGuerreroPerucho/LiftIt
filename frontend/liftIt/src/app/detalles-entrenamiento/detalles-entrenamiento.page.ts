import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrenamiento } from '../services/entrenamiento.model';
import { EntrenamientoService } from '../services/entrenamiento.service';
import { Preferences } from '@capacitor/preferences';
import { catchError, of, tap } from 'rxjs';

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

sensaciones : string = "";
calentamiento : string = "";

  entrService: EntrenamientoService;

  constructor(private route: ActivatedRoute, entrenamientoService: EntrenamientoService) {
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

        this.sensaciones = result.sensacion;
        this.calentamiento = result.calentamiento;

      }),
      catchError(err => {
        console.error(err);
        return of(err);
      })
    ).subscribe();


  }


  


}
