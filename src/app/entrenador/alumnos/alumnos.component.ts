import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  public alumnosList: any = [];
  public alumnosTotales: any = []
  public AlumnosPaginated!:any;
  public alumnosListFiltered: any = [];
  public buscadorControl: FormControl = new FormControl('');
  public messageWhenArrayEmpty: string = "No tienes alumnos dados de alta, para crear uno, pulsa el boton de 'Nuevo alumno'."
  public numberOfPage : number = 1;
  constructor(private router: Router, private _firebase: FirebaseService, private spinner: NgxSpinnerService) { }

  async ngOnInit(): Promise<void> {
    this.alumnosTotales = await this._firebase.alumnos;
    this.getData();
    this.buscadorControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((nuevoValor) => {
        this.buscarAlumno(nuevoValor);
        if (!nuevoValor) {
          this.alumnosListFiltered = this.alumnosList
        }
      });
      
  }

  public nextPage(){
    if(this.numberOfPage < this.AlumnosPaginated.totalPages.length){
      this.numberOfPage++;
      this.getData()
    }
  }

  public backPage(){
    if(this.numberOfPage > 0){
      this.numberOfPage--;
      this.getData()
    }
  }

  public goPage(page:number){
    this.numberOfPage = page;
    this.getData()
  }

  public buscarAlumno(terminoBusqueda: string) {
    const resultados = this.alumnosTotales.filter((alumno: any) =>
      alumno.nombre_completo.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    this.messageWhenArrayEmpty = resultados.length === 0 ? "No se encontraron resultados." : "No tienes alumnos dados de alta, para crear uno, pulsa el boton de 'Nuevo alumno'."
    this.alumnosListFiltered = resultados;
  }

  public async getData() {
    this.spinner.show();
    this.AlumnosPaginated = await this._firebase.getPaginatedAlumnos(this.numberOfPage,5)
    this.alumnosList = this.AlumnosPaginated.data;
    this.alumnosList.sort(this.compararFechasAsc)
    this.alumnosList.reverse();
    this.alumnosListFiltered = this.alumnosList;
    this.spinner.hide();
  }

  public openEdit(id: string) {
    this.router.navigate(['/entrenador/alumnos/editar', id]);
  }

  public compararFechasAsc(a: any, b: any) {
    const dateA: any = new Date(a.creationDate);
    const dateB: any = new Date(b.creationDate);
    return dateA - dateB;
  }
}
