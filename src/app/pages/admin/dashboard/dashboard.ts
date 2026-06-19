import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
  userEmail: string = 'Administrador';
  errorMessage: string = '';

  dashboard = {
    TotalUsuarios: 0,
    TotalCasos: 0,
    TotalMediadores: 0,
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    forkJoin({
      usuarios: this.adminService.listarUsuarios(),
      casos: this.adminService.listarCasos(),
      mediadores: this.adminService.listarMediadores()
    }).subscribe({
      next: (res: any) => {
        const usuarios = Array.isArray(res.usuarios)
          ? res.usuarios
          : res.usuarios?.$values ?? res.usuarios?.Values ?? [];

        const casos = Array.isArray(res.casos)
          ? res.casos
          : res.casos?.$values ?? res.casos?.Values ?? [];

        const mediadores = Array.isArray(res.mediadores)
          ? res.mediadores
          : res.mediadores?.$values ?? res.mediadores?.Values ?? [];

        this.dashboard = {
          TotalUsuarios: usuarios.length,
          TotalCasos: casos.length,
          TotalMediadores: mediadores.length,
        };

        console.log('DASHBOARD FINAL:', this.dashboard);
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
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}