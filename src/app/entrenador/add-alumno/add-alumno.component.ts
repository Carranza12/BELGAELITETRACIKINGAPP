import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  public isEdit: boolean = false;
  public param: any = "";
  public alumnoExample:any= {}
  public titleModal: string = 'Agrega un nuevo alumno'
  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    console.log('Valor del parámetro de ruta:', this.param);
    if (this.param) {
      this.isEdit = true;
      this.titleModal = "Edita un alumno"
    }
  }
}
