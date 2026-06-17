import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // SI hay un token almacenado
  if(authService.isLoggedIn()){
    return true;
  }

  // SI no hay un token, lo mandamos al login en lugar de mostrar la pantalla protegida
  router.navigate(['/login']);
  return false;
}
