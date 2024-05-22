import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-entrenamiento',
  templateUrl: './detalles-entrenamiento.page.html',
  styleUrls: ['./detalles-entrenamiento.page.scss'],
})
export class DetallesEntrenamientoPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000
    }
  };

  images = [
    'assets/imagenes/pakozoic1.png',
    'assets/imagenes/pakozoik2.png',
    'assets/imagenes/pakozoik3.png'
  ];

  constructor() { }

  ngOnInit() {
  }

}
