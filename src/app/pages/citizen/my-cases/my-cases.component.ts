import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../services/auth.service';
import { ConflictCase, ConflictStatus } from '../../../models/api.models';

/** Mock de casos del ciudadano logueado — se reemplaza por llamada HTTP real */
const MOCK_MY_CASES: ConflictCase[] = [
  {
    id: 'case-001',
    reporterId: 'uid-ciudadano-1',
    reporterName: 'María López',
    respondentId: '',
    respondentName: 'Carlos Ramos',
    conflictType: 'ruido',
    description: 'Música a alto volumen todos los fines de semana después de la medianoche.',
    address: 'Bloque A, Apto 3B, Residencial Los Pinos',
    status: 'en mediacion',
    mediatorId: 'mediator-01',
    evidenceUrls: ['evidencia_ruido.jpg'],
    assignedAt: '2026-06-10T09:00:00Z',
  },
  {
    id: 'case-002',
    reporterId: 'uid-ciudadano-1',
    reporterName: 'María López',
    respondentId: '',
    respondentName: 'Ana Flores',
    conflictType: 'mascotas',
    description: 'Perro sin correa en el área común, agredió a mi hijo menor.',
    address: 'Parque Central, Colonia El Roble',
    status: 'nuevo',
    evidenceUrls: [],
  },
  {
    id: 'case-003',
    reporterId: 'uid-ciudadano-1',
    reporterName: 'María López',
    respondentId: '',
    respondentName: 'Roberto García',
    conflictType: 'limites',
    description: 'Construcción que invade 30 cm de mi propiedad según escritura.',
    address: 'Calle Principal No. 45, Tegucigalpa',
    status: 'resuelto',
    mediatorId: 'mediator-02',
    evidenceUrls: ['escritura.pdf', 'foto_limite.jpg'],
    assignedAt: '2026-05-01T08:00:00Z',
    closedAt: '2026-06-01T17:00:00Z',
  },
];

/** Paleta de colores y etiquetas por estado */
const STATUS_CONFIG: Record<ConflictStatus, { label: string; color: string }> = {
  nuevo:              { label: 'Nuevo',            color: '#3b82f6' },
  asignado:           { label: 'Asignado',         color: '#f59e0b' },
  'en mediacion':     { label: 'En Mediación',     color: '#8b5cf6' },
  resuelto:           { label: 'Resuelto',         color: '#10b981' },
  'cerrado sin acuerdo': { label: 'Sin Acuerdo',   color: '#ef4444' },
};

@Component({
  selector: 'app-my-cases',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.css'],
})
export class MyCasesComponent implements OnInit {
  cases: ConflictCase[] = [];
  userEmail: string | null = null;

  readonly statusConfig = STATUS_CONFIG;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    // MOCK: filtrar por reporterId del token cuando haya integración real
    this.cases = MOCK_MY_CASES;
  }

  getStatusLabel(status: ConflictStatus): string {
    return this.statusConfig[status]?.label ?? status;
  }

  getStatusColor(status: ConflictStatus): string {
    return this.statusConfig[status]?.color ?? '#64748b';
  }
}
