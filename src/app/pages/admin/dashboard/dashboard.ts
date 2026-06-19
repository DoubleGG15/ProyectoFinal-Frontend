import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
  totalUsuarios: number = 0;
  totalCasos: number = 0;
  errorMessage: string = '';
  userEmail: string | null = '';
  dashboard: any; // Propiedad declarada para almacenar los datos del dashboard

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.adminService.obtenerDashboard().subscribe({
      next: (data: any) => {
        console.log('DASHBOARD DATA:', data);
        this.dashboard = data;
      },
      error: (err: any) => {
        console.log('ERROR DASHBOARD:', err);
        // Usar datos mockeados si el backend no responde o no tiene permisos de testing todavía
        this.dashboard = {
          TotalUsuarios: 25,
          TotalCasos: 18,
          TotalMediadores: 4,
        };
        this.errorMessage = 'Nota: Mostrando datos locales de respaldo.';
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
