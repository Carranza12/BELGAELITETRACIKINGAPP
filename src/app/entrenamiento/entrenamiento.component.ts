import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FirebaseService } from '../services/firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { map } from 'rxjs';


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss'],
})
export class EntrenamientoComponent implements OnInit {
  public paramAlumnoID: any = "";
  public paramEntrenamientoID: any = "";
  public calendarMain: boolean = true;
  public DetailsMain: boolean = false;
  public CommentsMain: boolean = false;
  public commentsList:any = [];

  public usernameControl:FormControl = new FormControl('', Validators.required);
  public CommentControl:FormControl = new FormControl('', Validators.required);
  isMenuOpen = false;

  public alumnoInfo:any = {}
  public entrenamientoInfo:any = {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private route: ActivatedRoute, private _firebase:FirebaseService, private spinner: NgxSpinnerService) {}

  async ngOnInit(): Promise<void> {
    this.spinner.show()
    this.paramAlumnoID = this.route.snapshot.paramMap.get('AlumnoID');
    this.paramEntrenamientoID = this.route.snapshot.paramMap.get('EntrenamientoID');
    this.alumnoInfo = await this._firebase.getDocument("alumnos", this.paramAlumnoID);
    this.entrenamientoInfo = await this._firebase.getDocument("entrenamientos", this.paramEntrenamientoID);
    this.usernameControl.setValue(this.alumnoInfo.nombre_completo)
    let query = {
      filters: [
        {
          attr: 'alumnoID',
          operation: '==',
          value: this.paramAlumnoID,
        },
        {
          attr: 'entrenamientoID',
          operation: '==',
          value: this.paramEntrenamientoID,
        },
      ],
    }
    this.commentsList = await this._firebase.getDocuments("comments",query)
    this.commentsList = this.commentsList.map((comment:any) => {
      const creationDate = comment.creationDate.toDate();
      return { ...comment, creationDate };
    });
  
    this.spinner.hide()
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

  public async submit(){
    if(this.CommentControl.invalid || this.usernameControl.invalid){
      return;
    }
    this.spinner.show()
    const comment = {
      alumnoID: this.paramAlumnoID,
      entrenamientoID: this.paramEntrenamientoID,
      username: this.usernameControl.value,
      comment: this.CommentControl.value,
      creationDate: new Date()
    }
    const res = await this._firebase.addDocument("comments", comment);
    Swal.fire('Publicado!', 'Ahora tu entrenador podrá saber como te sientes.', 'success');
    this.CommentControl.reset()
    this.usernameControl.reset()
    this.commentsList.push({...comment, id: res.id})
    this.spinner.hide()
  }

  public async deleteComment(id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar el comentario?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: 'SI, quiero eliminarlo.',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this._firebase.removeDocument('comments', id);
        const findIndex = this.commentsList.findIndex((item: any) => item.id === id);
        if (findIndex !== -1) {
          this.commentsList.splice(findIndex, 1);
        }
        Swal.fire('Comentario eliminado', 'Tu comentario fue eliminado con éxito.', 'info')
      } else if (result.isDenied) {
        Swal.fire('Operación cancelada.', '', 'info')
      }
    })
  }
}
