import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'nuevo-entrenamiento',
    loadChildren: () => import('./nuevo-entrenamiento/nuevo-entrenamiento.module').then( m => m.NuevoEntrenamientoPageModule)
  },
  {
    path: 'detalles-entrenamiento',
    loadChildren: () => import('./detalles-entrenamiento/detalles-entrenamiento.module').then( m => m.DetallesEntrenamientoPageModule)
  },
  {
    path: 'editar-entrenamiento',
    loadChildren: () => import('./editar-entrenamiento/editar-entrenamiento.module').then( m => m.EditarEntrenamientoPageModule)
  },
  {
    path: 'pagina-perfil',
    loadChildren: () => import('./pagina-perfil/pagina-perfil.module').then( m => m.PaginaPerfilPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'recuperar-contasenya',
    loadChildren: () => import('./recuperar-contasenya/recuperar-contasenya.module').then( m => m.RecuperarContasenyaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
