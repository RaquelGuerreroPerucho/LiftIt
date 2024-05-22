import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-entrenamiento',
  templateUrl: './detalles-entrenamiento.page.html',
  styleUrls: ['./detalles-entrenamiento.page.scss'],
})
export class DetallesEntrenamientoPage implements OnInit {

  images=[
    'assets/imagenes/pakozoic1.png',
    'assets/imagenes/pakozoik2.png',
    'assets/imagenes/pakozoik3.png',
  ];

  constructor() { }

  swiperSliderChanged(e: any){
    console.log('changed: ',e);
  }



  ngOnInit() {
  }

}
