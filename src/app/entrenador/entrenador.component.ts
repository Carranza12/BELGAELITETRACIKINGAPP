import { Component } from '@angular/core';
import { AddModalComponent } from './add-modal/add-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss']
})
export class EntrenadorComponent {
  public entrenamientos = [
    {
      title: 'Semana del 31 de agosto al 03 de septiembre',
      para: [
        {
          nombre: 'Francisco Carranza'
        },
        {
          nombre: 'David Gomez'
        },
      ],
      objetivo: "Afinando detalles para el maraton LALA"
    },
    {
      title: 'Semana del 31 de agosto al 03 de septiembre',
      para: [
        {
          nombre: 'Francisco Carranza'
        },
        {
          nombre: 'David Gomez'
        },
      ],
      objetivo: "Afinando detalles para el maraton LALA"
    }
  ]
  constructor(private router: Router) {}
  
  public openEdit(id:string){
    this.router.navigate(['/entrenador/editar', id]);
  }
}
