import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-mediator-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mediator-dashboard.html',
  styleUrls: ['./mediator-dashboard.css'],
})
export class MediatorDashboard implements OnInit {
  userEmail: string | null = '';
  userName: string | null  = '';
  today: string = '';

  /**
   * Métricas reales del mediador.
   * casosAsignados se actualizará con datos reales del backend cuando se integre.
   * Por ahora refleja los 2 casos reales en Firebase (CasosConflicto).
   */
  metricas = {
    casosAsignados: 2,   // ← actualizado para reflejar Firebase real
    sesionesAgendadas: 1,
    acuerdosLogrados: 0,
  };

  navItems = [
    { label: 'Dashboard',        icon: '🏠', route: '/mediador/dashboard', active: true  },
    { label: 'Mis Casos',        icon: '📂', route: '/mediador/casos',     active: false },
    { label: 'Programar Sesión', icon: '📅', route: '/mediador/casos',     active: false },
    { label: 'Acuerdos',         icon: '📝', route: '/mediador/casos',     active: false },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userName  = this.userEmail?.split('@')[0] ?? 'Mediador';
    this.today = new Date().toLocaleDateString('es-HN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}