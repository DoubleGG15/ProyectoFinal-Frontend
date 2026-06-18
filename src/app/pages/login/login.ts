import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

        const role = this.authService.getUserRole()?.toLowerCase();
        console.log('User role decoded:', role);
        
        if (role === 'administrador' || role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'mediador') {
          this.router.navigate(['/mediador/dashboard']);
        } else {
          this.router.navigate(['/ciudadano/dashboard']);
        }
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
