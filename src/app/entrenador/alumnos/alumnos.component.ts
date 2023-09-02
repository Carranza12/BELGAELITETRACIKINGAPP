import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  constructor(private router: Router){}

  public openEdit(id:string){
    this.router.navigate(['/entrenador/alumnos/editar', id]);
  }
}
