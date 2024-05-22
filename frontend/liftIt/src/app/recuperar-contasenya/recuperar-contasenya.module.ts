import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContasenyaPageRoutingModule } from './recuperar-contasenya-routing.module';

import { RecuperarContasenyaPage } from './recuperar-contasenya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContasenyaPageRoutingModule
  ],
  declarations: [RecuperarContasenyaPage]
})
export class RecuperarContasenyaPageModule {}
