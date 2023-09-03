import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss'],
})
export class EntrenamientoComponent implements OnInit {
  public calendarMain: boolean = true;
  public DetailsMain: boolean = false;
  public CommentsMain: boolean = false;
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor() {}

  ngOnInit(): void {
   
  }

  public changePage(page: string) {
    if (page === 'calendar') {
      this.calendarMain = true;
      this.DetailsMain = false;
      this.CommentsMain = false;
      this.isMenuOpen = !this.isMenuOpen;
    }
    if (page === 'details') {
      this.calendarMain = false;
      this.DetailsMain = true;
      this.CommentsMain = false;
      this.isMenuOpen = !this.isMenuOpen;
    }
    if (page === 'comments') {
      this.calendarMain = false;
      this.DetailsMain = false;
      this.CommentsMain = true;
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
