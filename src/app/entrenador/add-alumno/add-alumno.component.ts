import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  public alumnoFormGroup: FormGroup = new FormGroup({
    nombre_completo: new FormControl(''),
    edad: new FormControl(''),
    fecha_ingreso: new FormControl(''),
    status: new FormControl(''),
  })


  constructor(private route: ActivatedRoute, private _firebase:FirebaseService) { }


  ngOnInit(): void {
    this.initData()
    this.param = this.route.snapshot.paramMap.get('id');
    if (this.param) {
      this.isEdit = true;
      this.titleModal = "Edita un alumno"
    }
  }

  public async initData(){
   
  }
}
