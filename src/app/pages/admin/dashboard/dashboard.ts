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

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.obtenerDashboard().subscribe({
      next: (data: any) => {
        this.totalUsuarios = data.TotalUsuarios;
        this.totalCasos = data.TotalCasos;
      },
      error: (err: any) => {
        console.log('ERROR DASHBOARD:', err);
        this.errorMessage = 'Error al cargar el dashboard';
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}