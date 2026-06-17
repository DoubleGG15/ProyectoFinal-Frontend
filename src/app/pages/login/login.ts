// Un componente => a una pantalla
// 3 partes, ts => logica, html => estructura visual y css => a los estilos

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        console.log('LOGIN OK:', response);

        this.authService.saveToken(response.token);
        this.isLoading = false;

        // Temporal: solo para comprobar que sí entra al login
       this.router.navigate(['/admin/dashboard']);
      },

      error: (err: any) => {
        console.log('ERROR LOGIN:', err);

        this.errorMessage =
          err.error?.message || 'Credenciales inválidas. Intenta de nuevo.';

        this.isLoading = false;
      },
    });
  }
}
