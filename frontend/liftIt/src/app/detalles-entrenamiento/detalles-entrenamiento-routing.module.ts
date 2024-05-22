import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DetallesEntrenamientoPage } from './detalles-entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesEntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesEntrenamientoPageRoutingModule {}
