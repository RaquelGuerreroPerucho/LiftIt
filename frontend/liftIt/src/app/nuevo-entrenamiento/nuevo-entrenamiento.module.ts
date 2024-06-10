import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';

import { IonicModule } from '@ionic/angular';

import { NuevoEntrenamientoPageRoutingModule } from './nuevo-entrenamiento-routing.module';

import { NuevoEntrenamientoPage } from './nuevo-entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoEntrenamientoPageRoutingModule
  ],
  declarations: [NuevoEntrenamientoPage, ]
})
export class NuevoEntrenamientoPageModule {}
