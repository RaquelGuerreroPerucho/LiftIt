import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEntrenamientoPageRoutingModule } from './editar-entrenamiento-routing.module';

import { EditarEntrenamientoPage } from './editar-entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEntrenamientoPageRoutingModule
  ],
  declarations: [EditarEntrenamientoPage]
})
export class EditarEntrenamientoPageModule {}
