import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  address: string = '';
  password: string = '';
  role: string = 'ciudadano';

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.register(
      this.fullName,
      this.email,
      this.address,
      this.password,
      this.role
    ).subscribe({
      next: () => {
        this.successMessage = 'Cuenta creada. Ahora inicia sesión.';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error al registrar. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
