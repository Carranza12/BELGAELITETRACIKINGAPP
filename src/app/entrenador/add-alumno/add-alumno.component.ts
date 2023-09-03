import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
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
  })


  constructor(private route: ActivatedRoute, private _firebase: FirebaseService, private _router: Router) { }


  ngOnInit(): void {
    this.initData()
  }

  public async initData() {
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
    }
  }

  public async submit() {
    if (this.alumnoFormGroup.invalid) {
      return;
    }
    const alumno = {
      nombre_completo: this.alumnoFormGroup.controls["nombre_completo"].value,
      edad: this.alumnoFormGroup.controls["edad"].value,
      fecha_ingreso: this.alumnoFormGroup.controls["fecha_ingreso"].value,
      status: this.alumnoFormGroup.controls["status"].value,
    }
    if (!this.isEdit) {
      await this._firebase.addDocument('alumnos', alumno);
      Swal.fire('Guardado!', 'Alumno registrado con éxito', 'success')
      this.alumnoFormGroup.reset()
      return;
    }
    if (this.isEdit) {
      await this._firebase.updateDocument('alumnos', alumno, this.alumno.id);
      Swal.fire('Actualizado!', 'Alumno actualizado con éxito', 'success')
      this.alumnoFormGroup.reset()
      this._router.navigateByUrl("/entrenador/alumnos")
      return;
    }

  }

}
