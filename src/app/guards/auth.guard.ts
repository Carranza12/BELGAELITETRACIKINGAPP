import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Obtenemos el valor de sesionIsStart del servicio AuthService
    const sessionIsStart = this.authService.sesionIsStart;

    // Si sesionIsStart es true, permitimos el acceso a /entrenador
    if (sessionIsStart) {
      return true;
    }

    // Si sesionIsStart es false, redirigimos al usuario a /login
    this.router.navigateByUrl('/login');
    return false;
  }
}
