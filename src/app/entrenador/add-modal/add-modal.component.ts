import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  public isEdit : boolean = false;
  public param: any = "";
  public titleModal:string = 'Agrega un nuevo entrenamiento'
  public alumnos:any = []

  public entrenamientoFormGroup:FormGroup = new FormGroup({
    titulo_semana : new FormControl('', Validators.required),
    objetivo_semana : new FormControl('', Validators.required),
    tipo_entrenamiento_lunes : new FormControl('Tipo de entrenamiento', Validators.required),
    tipo_lugar_lunes : new FormControl('Tipo de lugar de entrenamiento', Validators.required),
    titulo_lunes : new FormControl('', Validators.required),
    indicaciones_lunes : new FormControl('', Validators.required),
    tipo_entrenamiento_martes : new FormControl('', Validators.required),
    tipo_lugar_martes : new FormControl('', Validators.required),
    titulo_martes : new FormControl('', Validators.required),
    indicaciones_martes : new FormControl('', Validators.required),
    tipo_entrenamiento_miercoles : new FormControl('', Validators.required),
    tipo_lugar_miercoles : new FormControl('', Validators.required),
    titulo_miercoles : new FormControl('', Validators.required),
    indicaciones_miercoles : new FormControl('', Validators.required),
    tipo_entrenamiento_jueves : new FormControl('', Validators.required),
    tipo_lugar_jueves : new FormControl('', Validators.required),
    titulo_jueves : new FormControl('', Validators.required),
    indicaciones_jueves : new FormControl('', Validators.required),
    tipo_entrenamiento_viernes : new FormControl('', Validators.required),
    tipo_lugar_viernes : new FormControl('', Validators.required),
    titulo_viernes : new FormControl('', Validators.required),
    indicaciones_viernes : new FormControl('', Validators.required),
    tipo_entrenamiento_domingo : new FormControl('', Validators.required),
    tipo_lugar_domingo : new FormControl('', Validators.required),
    titulo_domingo : new FormControl('', Validators.required),
    indicaciones_domingo : new FormControl('', Validators.required),

  })
  constructor(private route: ActivatedRoute, private _firebase: FirebaseService){}

  public entrenamientoExample = {
    titulo_semana: 'Titulo de prueba',
    objetivo_semana: 'el objetivo de esta semana es disfrutar el entrenamiento y tener buenas sensaciones',
    para: [
      {
        nombre:"Francisco Carranza"
      },
      {
        nombre:"David Gomez"
      },
    ],
    lunes: {
      titulo: "entrenamiento del lunes",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    },
    martes: {
      titulo: "entrenamiento del martes",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    },
    miercoles: {
      titulo: "entrenamiento del miercoles",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    },
    jueves: {
      titulo: "entrenamiento del jueves",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    },
    viernes: {
      titulo: "entrenamiento del viernes",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    },
    domingo: {
      titulo: "entrenamiento del domingo",
      indicaciones: "aqui es donde van todas las instrucciones del entrenamiento a detalle",
      nivel_intensidad: 7,
      lugar_entrenamiento: "1",
      tipo_entrenamiento: "3"
    }
  }

  async ngOnInit(): Promise<void> {
    
    this.param = this.route.snapshot.paramMap.get('id');
    console.log('Valor del parámetro de ruta:', this.param);
    this.alumnos = await this._firebase.alumnos;
    console.log("alumnos:", this.alumnos)
    if(this.param){
      this.isEdit = true;
      this.titleModal = "Edita un entrenamiento"
    }
  }
}
