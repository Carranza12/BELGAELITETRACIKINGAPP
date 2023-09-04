import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenamientoRoutingModule } from './entrenamiento-routing.module';
import { EntrenamientoComponent } from './entrenamiento.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntrenamientoComponent
  ],
  imports: [
    CommonModule,
    EntrenamientoRoutingModule,
    ReactiveFormsModule
  ]
})
export class EntrenamientoModule { }
