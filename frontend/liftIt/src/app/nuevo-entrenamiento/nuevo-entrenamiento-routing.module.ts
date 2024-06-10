import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEntrenamientoPage } from './nuevo-entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEntrenamientoPageRoutingModule {}
