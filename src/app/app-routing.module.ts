import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModalComponent } from './entrenador/add-modal/add-modal.component';
import { AlumnosComponent } from './entrenador/alumnos/alumnos.component';
import { AddAlumnoComponent } from './entrenador/add-alumno/add-alumno.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'entrenador',
    providers: [AuthService],
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./entrenador/entrenador.module').then((m) => m.EntrenadorModule),
  },
  { path: 'entrenador/nuevo',
  canActivate: [AuthGuard], component: AddModalComponent },
  { path: 'entrenador/editar/:id', canActivate: [AuthGuard], component: AddModalComponent },
  { path: 'entrenador/alumnos', canActivate: [AuthGuard], component: AlumnosComponent },
  { path: 'entrenador/alumnos/nuevo', canActivate: [AuthGuard], component: AddAlumnoComponent },
  { path: 'entrenador/alumnos/editar/:id', canActivate: [AuthGuard], component: AddAlumnoComponent },
  {
    path: 'entrenamiento/:AlumnoID/:EntrenamientoID',
    loadChildren: () =>
      import('./entrenamiento/entrenamiento.module').then(
        (m) => m.EntrenamientoModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
