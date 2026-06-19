import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboardComponent {
  userEmail: string = 'Administrador';
  errorMessage: string = '';
  goTo(route: string): void {
  this.router.navigate([route]);
}
  dashboard: any = {
    TotalUsuarios: 0,
    TotalCasos: 0,
    TotalMediadores: 0,
  
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}