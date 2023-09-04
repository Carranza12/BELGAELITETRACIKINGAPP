import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  public isEdit: boolean = false;
  public param: any = "";
  public titleModal: string = 'Agrega un nuevo entrenamiento'
  public alumnos: any = []
  public entrenamiento: any = {};
  public paraList: any = [];

  public entrenamientoFormGroup: FormGroup = new FormGroup({
    titulo_semana: new FormControl('', Validators.required),
    objetivo_semana: new FormControl('', Validators.required),
    tipo_entrenamiento_lunes: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_lunes: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_lunes: new FormControl('', Validators.required),
    indicaciones_lunes: new FormControl('', Validators.required),
    tipo_entrenamiento_martes: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_martes: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_martes: new FormControl('', Validators.required),
    indicaciones_martes: new FormControl('', Validators.required),
    tipo_entrenamiento_miercoles: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_miercoles: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_miercoles: new FormControl('', Validators.required),
    indicaciones_miercoles: new FormControl('', Validators.required),
    tipo_entrenamiento_jueves: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_jueves: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_jueves: new FormControl('', Validators.required),
    indicaciones_jueves: new FormControl('', Validators.required),
    tipo_entrenamiento_viernes: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_viernes: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_viernes: new FormControl('', Validators.required),
    indicaciones_viernes: new FormControl('', Validators.required),
    tipo_entrenamiento_domingo: new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_domingo: new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_domingo: new FormControl('', Validators.required),
    indicaciones_domingo: new FormControl('', Validators.required),

  })
  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute, private _firebase: FirebaseService, private _router: Router) { }

  

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.param = this.route.snapshot.paramMap.get('id');
    this.alumnos = await this._firebase.alumnos;
    this.alumnos = this.alumnos.filter((alumno:any) => alumno.status === "Activo")

    if (this.param) {
      this.isEdit = true;
      this.titleModal = "Edita un entrenamiento"
      const entrenamiento = await this._firebase.getDocument('entrenamientos', this.param);
      this.entrenamiento = entrenamiento;
      this.loadDataEdit(this.entrenamiento)
    }
    this.spinner.hide();
  }

  public loadDataEdit(entrenamiento:any){
    this.entrenamientoFormGroup.controls["titulo_semana"].setValue(entrenamiento.titulo_semana);
    this.entrenamientoFormGroup.controls["objetivo_semana"].setValue(entrenamiento.objetivo_semana);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_lunes"].setValue(entrenamiento.tipo_entrenamiento_lunes);
    this.entrenamientoFormGroup.controls["tipo_lugar_lunes"].setValue(entrenamiento.tipo_lugar_lunes);
    this.entrenamientoFormGroup.controls["titulo_lunes"].setValue(entrenamiento.titulo_lunes);
    this.entrenamientoFormGroup.controls["indicaciones_lunes"].setValue(entrenamiento.indicaciones_lunes);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_martes"].setValue(entrenamiento.tipo_entrenamiento_martes);
    this.entrenamientoFormGroup.controls["tipo_lugar_martes"].setValue(entrenamiento.tipo_lugar_martes);
    this.entrenamientoFormGroup.controls["titulo_martes"].setValue(entrenamiento.titulo_martes);
    this.entrenamientoFormGroup.controls["indicaciones_martes"].setValue(entrenamiento.indicaciones_martes);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_miercoles"].setValue(entrenamiento.tipo_entrenamiento_miercoles);
    this.entrenamientoFormGroup.controls["tipo_lugar_miercoles"].setValue(entrenamiento.tipo_lugar_miercoles);
    this.entrenamientoFormGroup.controls["titulo_miercoles"].setValue(entrenamiento.titulo_miercoles);
    this.entrenamientoFormGroup.controls["indicaciones_miercoles"].setValue(entrenamiento.indicaciones_miercoles);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_jueves"].setValue(entrenamiento.tipo_entrenamiento_jueves);
    this.entrenamientoFormGroup.controls["titulo_jueves"].setValue(entrenamiento.titulo_jueves);
    this.entrenamientoFormGroup.controls["tipo_lugar_jueves"].setValue(entrenamiento.tipo_lugar_jueves);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_viernes"].setValue(entrenamiento.tipo_entrenamiento_viernes);
    this.entrenamientoFormGroup.controls["indicaciones_jueves"].setValue(entrenamiento.indicaciones_jueves);
    this.entrenamientoFormGroup.controls["tipo_lugar_viernes"].setValue(entrenamiento.tipo_lugar_viernes);
    this.entrenamientoFormGroup.controls["titulo_viernes"].setValue(entrenamiento.titulo_viernes);
    this.entrenamientoFormGroup.controls["indicaciones_viernes"].setValue(entrenamiento.indicaciones_viernes);
    this.entrenamientoFormGroup.controls["tipo_entrenamiento_domingo"].setValue(entrenamiento.tipo_entrenamiento_domingo);
    this.entrenamientoFormGroup.controls["tipo_lugar_domingo"].setValue(entrenamiento.tipo_lugar_domingo);
    this.entrenamientoFormGroup.controls["titulo_domingo"].setValue(entrenamiento.titulo_domingo);
    this.entrenamientoFormGroup.controls["indicaciones_domingo"].setValue(entrenamiento.indicaciones_domingo);
    this.paraList = entrenamiento.para;
  }

  public async submit() {
    if (this.entrenamientoFormGroup.invalid) {
      return;
    }
    if(this.entrenamientoFormGroup.controls['tipo_entrenamiento_lunes'].value === "Tipo de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_entrenamiento_martes'].value === "Tipo de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_entrenamiento_miercoles'].value === "Tipo de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_entrenamiento_jueves'].value === "Tipo de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_entrenamiento_viernes'].value === "Tipo de entrenamiento" || 
    this.entrenamientoFormGroup.controls['tipo_entrenamiento_domingo'].value === "Tipo de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_lunes'].value === "Tipo de lugar de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_martes'].value === "Tipo de lugar de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_miercoles'].value === "Tipo de lugar de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_jueves'].value === "Tipo de lugar de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_viernes'].value === "Tipo de lugar de entrenamiento" ||
    this.entrenamientoFormGroup.controls['tipo_lugar_domingo'].value === "Tipo de lugar de entrenamiento" 
    ){
      Swal.fire('Error al guardar!', 'Por favor rellena todos los tipos de entrenamientos y todos los tipos de lugares de cada día de la semana!', 'warning');
      return;
    }
    const entrenamiento = {
      creationDate: new Date(),
      para: this.paraList,
      titulo_semana: this.entrenamientoFormGroup.controls["titulo_semana"].value,
      objetivo_semana: this.entrenamientoFormGroup.controls["objetivo_semana"].value,
      tipo_entrenamiento_lunes: this.entrenamientoFormGroup.controls["tipo_entrenamiento_lunes"].value,
      tipo_lugar_lunes: this.entrenamientoFormGroup.controls["tipo_lugar_lunes"].value,
      titulo_lunes: this.entrenamientoFormGroup.controls["titulo_lunes"].value,
      indicaciones_lunes: this.entrenamientoFormGroup.controls["indicaciones_lunes"].value,
      tipo_entrenamiento_martes: this.entrenamientoFormGroup.controls["tipo_entrenamiento_martes"].value,
      tipo_lugar_martes: this.entrenamientoFormGroup.controls["tipo_lugar_martes"].value,
      titulo_martes: this.entrenamientoFormGroup.controls["titulo_martes"].value,
      indicaciones_martes: this.entrenamientoFormGroup.controls["indicaciones_martes"].value,
      tipo_entrenamiento_miercoles: this.entrenamientoFormGroup.controls["tipo_entrenamiento_miercoles"].value,
      tipo_lugar_miercoles: this.entrenamientoFormGroup.controls["tipo_lugar_miercoles"].value,
      titulo_miercoles: this.entrenamientoFormGroup.controls["titulo_miercoles"].value,
      indicaciones_miercoles: this.entrenamientoFormGroup.controls["indicaciones_miercoles"].value,
      tipo_entrenamiento_jueves: this.entrenamientoFormGroup.controls["tipo_entrenamiento_jueves"].value,
      titulo_jueves: this.entrenamientoFormGroup.controls["titulo_jueves"].value,
      tipo_lugar_jueves: this.entrenamientoFormGroup.controls["tipo_lugar_jueves"].value,
      tipo_entrenamiento_viernes: this.entrenamientoFormGroup.controls["tipo_entrenamiento_viernes"].value,
      indicaciones_jueves: this.entrenamientoFormGroup.controls["indicaciones_jueves"].value,
      tipo_lugar_viernes: this.entrenamientoFormGroup.controls["tipo_lugar_viernes"].value,
      titulo_viernes: this.entrenamientoFormGroup.controls["titulo_viernes"].value,
      indicaciones_viernes: this.entrenamientoFormGroup.controls["indicaciones_viernes"].value,
      tipo_entrenamiento_domingo: this.entrenamientoFormGroup.controls["tipo_entrenamiento_domingo"].value,
      tipo_lugar_domingo: this.entrenamientoFormGroup.controls["tipo_lugar_domingo"].value,
      titulo_domingo: this.entrenamientoFormGroup.controls["titulo_domingo"].value,
      indicaciones_domingo: this.entrenamientoFormGroup.controls["indicaciones_domingo"].value,
    }
    this.spinner.show();
    if (!this.isEdit) {
      const res = await this._firebase.addDocument('entrenamientos', entrenamiento);
      Swal.fire('Guardado!', 'Entrenamiento registrado con éxito', 'success');
      (await this._firebase.entrenamientos).push({...entrenamiento, id: res.id })
      this.entrenamientoFormGroup.reset()
      this._router.navigateByUrl("/entrenador")
      this.spinner.hide();
      return;
    }
    if (this.isEdit) {
      await this._firebase.updateDocument('entrenamientos', entrenamiento, this.entrenamiento.id);
      Swal.fire('Actualizado!', 'Entrenamiento actualizado con éxito', 'success');
      const findIndex = (await this._firebase.entrenamientos).findIndex((item:any) => item.id === this.entrenamiento.id);
      if(findIndex !== -1 ){
        (await this._firebase.entrenamientos)[findIndex] = {...entrenamiento, id: this.entrenamiento.id, creationDate:this.entrenamiento.creationDate }
      }
      this.entrenamientoFormGroup.reset()
      this._router.navigateByUrl("/entrenador")
      this.spinner.hide();
      return;
    }

  }

  public addPara(alumno: any) {
    const index = this.paraList.findIndex((a: any) => a.id === alumno.id);
    if (index === -1) {
      this.paraList.push(alumno);
    } else {
      this.paraList.splice(index, 1);
    }
  }

  public isAlumnoInParaList(alumno: any): boolean {
    return this.paraList.some((a: any) => a.id === alumno.id);
  }

}
