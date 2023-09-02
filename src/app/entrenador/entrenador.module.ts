import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { EntrenadorComponent } from './entrenador.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import {DialogModule} from '@angular/cdk/dialog';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';


@NgModule({
  declarations: [
    EntrenadorComponent,
    AddModalComponent,
    AlumnosComponent,
    AddAlumnoComponent
  ],
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    DialogModule
  ]
})
export class EntrenadorModule { }
