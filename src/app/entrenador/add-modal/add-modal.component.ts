import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  public isEdit : boolean = false;
  public param: any = "";
  public titleModal:string = 'Agrega un nuevo entrenamiento'
  constructor(private route: ActivatedRoute){}

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

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    console.log('Valor del parámetro de ruta:', this.param);
    if(this.param){
      this.isEdit = true;
      this.titleModal = "Edita un entrenamiento"
    }
  }
}
