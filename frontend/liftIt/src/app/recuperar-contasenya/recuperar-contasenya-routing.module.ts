import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarContasenyaPage } from './recuperar-contasenya.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContasenyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarContasenyaPageRoutingModule {}
