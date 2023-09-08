import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { AddModalComponent } from './add-modal/add-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss']
})
export class EntrenadorComponent implements OnInit {
  public entrenamientosList: any = [];
  public itemsPerPage: number = 10;
  public numberOfPage: number = 1;
  
  constructor(private renderer: Renderer2, private _dialog: Dialog,private router: Router, private _firebase: FirebaseService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData();
  }

  public openEdit(item: any) {
    this.router.navigate(['/entrenador/editar', item.id]);
  }

  public openSendDialog(entrenamiento:any){
    const protocolo = window.location.protocol;
    const host = window.location.host;
    const url = `${protocolo}//${host}/entrenamiento`;

    let templateAlumnos = '';
    console.log(entrenamiento)
    entrenamiento.para.forEach((alumno:any,index:number) => {
      templateAlumnos += `
      <div class="alumno_contenedor_link">
        <p>${alumno.nombre_completo}<p>
        <button id="btn_${index}" class="btn btn-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
        Copiar Link</button>
      </div>
        `
    });


    console.log('templateAlumnos:', templateAlumnos)
    Swal.fire({
      title: 'Comparte con tus alumnos!',
      html: templateAlumnos,
    confirmButtonText: 'Cerrar'
    })

    entrenamiento.para.forEach((alumno:any,index:number) => {
      document.getElementById(`btn_${index}`)?.addEventListener('click', () => {
        console.log('link copiado...')
        const link = `${url}/${alumno.id}/${entrenamiento.id}`
        this.copiarAlPortapapeles(link, alumno)
      });
    })

  
  }

  copiarAlPortapapeles(texto: string,alumno:any) {
    const texto_personalizado = `Hola ${alumno.nombre_completo}, espero te encuentres muy bien, aquí te mando el entrenamiento de esta semana: ${texto} , ¡estaré viendo tus comentarios desde la aplicación!.`
    const elementoTemporal = this.renderer.createElement('textarea');
    this.renderer.setAttribute(elementoTemporal, 'readonly', '');
    this.renderer.setProperty(elementoTemporal, 'value', texto_personalizado);
    this.renderer.appendChild(document.body, elementoTemporal);
    elementoTemporal.select();
    document.execCommand('copy');
    this.renderer.removeChild(document.body, elementoTemporal);
    Swal.fire({
      icon: 'success',
      title: `Link copiado con exito: ${texto}` ,
      showConfirmButton: false,
      timer: 1500
    })
  }

 

  public async getData() {
    this.spinner.show();
    this.entrenamientosList = await this._firebase.entrenamientos;
    this.entrenamientosList.sort(this.compararFechasAsc)
    this.entrenamientosList.reverse();
    this.spinner.hide();
  }

  public compararFechasAsc(a: any, b: any) {
    const dateA: any = new Date(a.creationDate);
    const dateB: any = new Date(b.creationDate);
    return dateA - dateB;
  }

  public async deleteEntrenamiento(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar el entrenamiento?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: 'SI, quiero eliminarlo.',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this._firebase.removeDocument('entrenamientos', id);
        const findIndex = (await this._firebase.entrenamientos).findIndex((item: any) => item.id === id);
        if (findIndex !== -1) {
          (await this._firebase.entrenamientos).splice(findIndex, 1);
        }
        this.entrenamientosList = await this._firebase.entrenamientos
        this.cdr.detectChanges();
        Swal.fire('Entrenamiento eliminado', 'Entrenamiento eliminado con éxito.', 'info')
      } else if (result.isDenied) {
        Swal.fire('Operación cancelada.', '', 'info')
      }
    })

  }
}
