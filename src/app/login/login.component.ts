import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public showErrors: boolean = false;
  public showPassword: boolean = false;
  public sesionIsStart!: boolean;

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _auth:AuthService
  ) {
  }

  ngOnInit() {
     
  }

  public async submit(): Promise<void> {
    console.log("submit")
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    try {
      if (email !== "marcosSanchez" || password!== "123456"){
        Swal.fire({
          title: 'Error!',
          text: "credenciales invalidas",
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
      this._auth.startSesion()
      console.log("cambair ruta...")
      this.router.navigateByUrl("/entrenador")
    } catch (error: any) {
  
      Swal.fire({
        title: 'Error!',
        text: "error",
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  



}
