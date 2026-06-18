import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    const userRole = authService.getUserRole();
    if (userRole && allowedRoles.map(r => r.toLowerCase()).includes(userRole.toLowerCase())) {
      return true;
    }

    // Si no tiene el rol permitido, redirigir a su propio dashboard
    if (userRole) {
      const role = userRole.toLowerCase();
      if (role === 'administrador' || role === 'admin') {
        router.navigate(['/admin/dashboard']);
      } else if (role === 'mediador') {
        router.navigate(['/mediador/dashboard']);
      } else {
        router.navigate(['/ciudadano/dashboard']);
      }
    } else {
      router.navigate(['/login']);
    }
    return false;
  };
};
