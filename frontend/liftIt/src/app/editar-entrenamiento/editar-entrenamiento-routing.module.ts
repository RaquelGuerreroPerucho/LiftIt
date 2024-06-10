import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEntrenamientoPage } from './editar-entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEntrenamientoPageRoutingModule {}
