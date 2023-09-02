import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenamientoRoutingModule } from './entrenamiento-routing.module';
import { EntrenamientoComponent } from './entrenamiento.component';


@NgModule({
  declarations: [
    EntrenamientoComponent
  ],
  imports: [
    CommonModule,
    EntrenamientoRoutingModule
  ]
})
export class EntrenamientoModule { }
