import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  userEmail: string = 'Administrador';
  errorMessage: string = '';

  dashboard: any = {
    TotalUsuarios: 0,
    TotalCasos: 0,
    TotalMediadores: 0
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email') || 'Administrador';

    this.cargarDashboard();

    setTimeout(() => {
      this.cargarDashboard();
    }, 500);
  }

  cargarDashboard(): void {
    this.adminService.obtenerDashboard().subscribe({
      next: (data: any) => {
        console.log('DASHBOARD:', data);

        this.dashboard = {
          TotalUsuarios: data.TotalUsuarios ?? data.totalUsuarios ?? 0,
          TotalCasos: data.TotalCasos ?? data.totalCasos ?? 0,
          TotalMediadores: 0
        };

        this.adminService.listarMediadores().subscribe({
          next: (mediadores: any) => {

            const listaMediadores = Array.isArray(mediadores)
              ? mediadores
              : mediadores?.$values ?? mediadores?.Values ?? [];

            console.log('MEDIADORES DASHBOARD:', listaMediadores);

            this.dashboard.TotalMediadores = listaMediadores.length;

            this.cd.detectChanges();
          },
          error: (err: any) => {
            console.error('ERROR MEDIADORES:', err);
            this.dashboard.TotalMediadores = 0;
            this.cd.detectChanges();
          }
        });

        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('ERROR DASHBOARD:', err);
        this.errorMessage = 'Error al cargar estadísticas';
        this.cd.detectChanges();
      }
    });
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}