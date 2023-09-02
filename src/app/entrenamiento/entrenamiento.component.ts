import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss']
})
export class EntrenamientoComponent implements OnInit{
  public calendarMain: boolean = true;
  public DetailsMain: boolean = false;
  public CommentsMain: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  public changePage(page:string){
    if(page === "calendar"){
      this.calendarMain = true;
      this.DetailsMain = false;
      this.CommentsMain = false;
    }
    if(page === "details"){
      this.calendarMain = false;
      this.DetailsMain = true;
      this.CommentsMain = false;
    }
    if(page === "comments"){
      this.calendarMain = false;
      this.DetailsMain = false;
      this.CommentsMain = true;
    }
  }
}
