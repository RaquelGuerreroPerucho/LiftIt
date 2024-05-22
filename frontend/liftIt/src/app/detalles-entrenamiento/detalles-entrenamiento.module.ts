import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesEntrenamientoPageRoutingModule } from './detalles-entrenamiento-routing.module';

import { DetallesEntrenamientoPage } from './detalles-entrenamiento.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesEntrenamientoPageRoutingModule
  ],
  declarations: [DetallesEntrenamientoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallesEntrenamientoPageModule {}
