import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModalComponent } from './entrenador/add-modal/add-modal.component';

const routes: Routes = [
  { path: 'entrenador', loadChildren: () => import('./entrenador/entrenador.module').then(m => m.EntrenadorModule) },
  { path:'entrenador/nuevo', component: AddModalComponent},
  { path:'entrenador/editar/:id',component:AddModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
