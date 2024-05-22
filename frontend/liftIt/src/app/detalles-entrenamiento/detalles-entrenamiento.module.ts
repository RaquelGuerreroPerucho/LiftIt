import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesEntrenamientoPageRoutingModule } from './detalles-entrenamiento-routing.module';

import { DetallesEntrenamientoPage } from './detalles-entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesEntrenamientoPageRoutingModule
  ],
  declarations: [DetallesEntrenamientoPage]
})
export class DetallesEntrenamientoPageModule {}
