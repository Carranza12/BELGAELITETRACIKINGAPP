import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenamientoComponent } from './entrenamiento.component';

const routes: Routes = [{ path: '', component: EntrenamientoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenamientoRoutingModule { }
