import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModalComponent } from './entrenador/add-modal/add-modal.component';
import { AlumnosComponent } from './entrenador/alumnos/alumnos.component';
import { AddAlumnoComponent } from './entrenador/add-alumno/add-alumno.component';

const routes: Routes = [
  { path: 'entrenador', loadChildren: () => import('./entrenador/entrenador.module').then(m => m.EntrenadorModule) },
  { path:'entrenador/nuevo', component: AddModalComponent},
  { path:'entrenador/editar/:id',component:AddModalComponent },
  { path:'entrenador/alumnos',component: AlumnosComponent },
  { path:'entrenador/alumnos/nuevo', component: AddAlumnoComponent},
  { path:'entrenador/alumnos/editar/:id',component:AddAlumnoComponent },
  { path: 'entrenamiento/:AlumnoID/:EntrenamientoID', loadChildren: () => import('./entrenamiento/entrenamiento.module').then(m => m.EntrenamientoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
