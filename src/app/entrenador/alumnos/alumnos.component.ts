import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  public alumnosList: any = [];

  constructor(private router: Router, private _firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getData();
  }

  public async getData() {
    this.alumnosList = await this._firebase.getDocuments('alumnos', {});
  }

  public openEdit(id: string) {
    this.router.navigate(['/entrenador/alumnos/editar', id]);
  }
}
