import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './citizen-dashboard.html',
  styleUrls: ['./citizen-dashboard.css'],
})
export class CitizenDashboardComponent implements OnInit {
  userEmail: string | null = '';
  userName: string | null = '';
  userId: string | null = '';
  today: string = '';

  /** Métricas mock — se reemplazarán con CaseService */
  metricas = {
    totalCasos: 2,
    casosActivos: 1,
    casosResueltos: 1,
    acuerdosPendientes: 1,
  };

  navItems = [
    { label: 'Dashboard',        icon: '🏠', route: '/ciudadano/dashboard',   active: true  },
    { label: 'Mis Casos',        icon: '📂', route: '/ciudadano/mis-casos',   active: false },
    { label: 'Reportar Conflicto', icon: '➕', route: '/ciudadano/reportar', active: false },
    { label: 'Mi Perfil',        icon: '👤', route: '/ciudadano/dashboard',   active: false },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userId    = this.authService.getUserId();
    // Extraer nombre amistoso del email (parte antes del @)
    this.userName = this.userEmail?.split('@')[0] ?? 'Ciudadano';
    this.today = new Date().toLocaleDateString('es-HN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
