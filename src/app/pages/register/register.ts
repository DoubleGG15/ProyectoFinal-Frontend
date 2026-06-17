// Este componente es la pantalla de registro — el formulario donde alguien
// nuevo crea su cuenta dando su nombre, email y contraseña.
// Sigue exactamente el mismo patrón que LoginComponent.
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
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