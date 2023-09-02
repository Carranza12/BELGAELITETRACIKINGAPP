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
  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');

    // Puedes usar el valor del parámetro de ruta como desees
    console.log('Valor del parámetro de ruta:', this.param);
    if(this.param){
      this.titleModal = "Edita un entrenamiento"
    }
  }
}
