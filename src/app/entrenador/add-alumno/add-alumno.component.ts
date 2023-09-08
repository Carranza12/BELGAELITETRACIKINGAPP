import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  public isEdit: boolean = false;
  public param: any = "";
  public alumno:any = {};
  public titleModal: string = 'Agrega un nuevo alumno'
  public alumnoFormGroup: FormGroup = new FormGroup({
    nombre_completo: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    fecha_ingreso: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    objetivo: new FormControl('', Validators.required)
  })


  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private _firebase: FirebaseService, private _router: Router, private cdr:ChangeDetectorRef) { }


  ngOnInit(): void {
    this.initData()
  }

  public async initData() {
    this.spinner.show()
    this.param = this.route.snapshot.paramMap.get('id');
    if (this.param) {
      this.isEdit = true;
      this.titleModal = "Edita un alumno"      
      const alumno = await this._firebase.getDocument('alumnos', this.param);
      this.alumno = alumno;
      this.alumnoFormGroup.controls["nombre_completo"].setValue(alumno.nombre_completo);
      this.alumnoFormGroup.controls["edad"].setValue(alumno.edad);
      this.alumnoFormGroup.controls["fecha_ingreso"].setValue(alumno.fecha_ingreso);
      this.alumnoFormGroup.controls["status"].setValue(alumno.status);
      this.alumnoFormGroup.controls["objetivo"].setValue(alumno.objetivo)
    }
    this.spinner.hide()
  }

  public async submit() {
    if (this.alumnoFormGroup.invalid) {
      return;
    }
    const alumno = {
      creationDate: new Date(),
      nombre_completo: this.alumnoFormGroup.controls["nombre_completo"].value,
      edad: this.alumnoFormGroup.controls["edad"].value,
      fecha_ingreso: this.alumnoFormGroup.controls["fecha_ingreso"].value,
      status: this.alumnoFormGroup.controls["status"].value,
      objetivo: this.alumnoFormGroup.controls["objetivo"].value,
    }
    this.spinner.show();
    if (!this.isEdit) {
      const res = await this._firebase.addDocument('alumnos', alumno);
      (await this._firebase.alumnos).push({...alumno, id: res.id });
      Swal.fire('Guardado!', 'Alumno registrado con éxito', 'success')
      this.alumnoFormGroup.reset()
      this.cdr.detectChanges()
      this._router.navigateByUrl("/entrenador/alumnos")
      this.spinner.hide()
      return;
    }
    if (this.isEdit) {
      await this._firebase.updateDocument('alumnos', alumno, this.alumno.id);
      const findIndex = (await this._firebase.alumnos).findIndex((item:any) => item.id === this.alumno.id);
      if(findIndex !== -1 ){
        (await this._firebase.alumnos)[findIndex] = {...alumno, id: this.alumno.id, creationDate:this.alumno.creationDate }
      }
      Swal.fire('Actualizado!', 'Alumno actualizado con éxito', 'success')
      this.alumnoFormGroup.reset()
      this.cdr.detectChanges()
      this._router.navigateByUrl("/entrenador/alumnos")
      this.spinner.hide()
      return;
    }

  }

}
