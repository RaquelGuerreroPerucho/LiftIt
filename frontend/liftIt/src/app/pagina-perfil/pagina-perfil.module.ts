import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaPerfilPageRoutingModule } from './pagina-perfil-routing.module';

import { PaginaPerfilPage } from './pagina-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaPerfilPageRoutingModule
  ],
  declarations: [PaginaPerfilPage]
})
export class PaginaPerfilPageModule {}
