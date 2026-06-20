import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ConflictCase, ConflictStatus, MediationSession } from '../../../models/api.models';

@Component({
  selector: 'app-case-status',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
  ],
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.css'],
})
export class CaseStatusComponent implements OnInit {
  caseId: string = '';
  caso!: ConflictCase;
  sessions: MediationSession[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 1. Capturar el parámetro 'id' de la URL usando ActivatedRoute
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.cargarCaso(this.caseId);
  }

  cargarCaso(id: string): void {
    this.caso = {
      id: id || 'case-001',
      reporterId: 'uid-ciudadano-1',
      reporterName: 'María López',
      respondentId: 'uid-respondent-1',
      respondentName: 'Carlos Ramos',
      conflictType: 'ruido',
      description: 'Música a alto volumen todos los fines de semana después de la medianoche.',
      address: 'Bloque A, Apto 3B, Residencial Los Pinos',
      status: 'en mediacion', // Estado asignado para la prueba
      evidenceUrls: ['evidencia_ruido.jpg', 'evidencia_foto.png'],
      assignedAt: '2026-06-10T09:00:00Z',
      mediatorId: 'mediator-01',
    };

    this.sessions = [
      {
        id: 'session-001',
        caseId: this.caso.id,
        mediatorId: 'mediator-01',
        scheduledDate: '2026-06-25',
        scheduledTime: '16:30',
        modality: 'virtual',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        status: 'programada',
        createdAt: '2026-06-12T10:00:00Z',
      },
    ];
  }


  get currentStepIndex(): number {
    if (!this.caso) return 0;
    switch (this.caso.status) {
      case 'nuevo':
        return 0;
      case 'asignado':
        return 1;
      case 'en mediacion':
        return 2;
      case 'resuelto':
      case 'cerrado sin acuerdo':
        return 3;
      default:
        return 0;
    }
  }

  get nextSession(): MediationSession | undefined {
    return this.sessions.find((s) => s.status === 'programada');
  }

  getConflictTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      ruido: '🔊 Ruido Molesto',
      limites: '📏 Límites de Propiedad',
      'areas comunes': '🏢 Áreas Comunes',
      mascotas: '🐾 Conflictos por Mascotas',
      otros: '📁 Otros Motivos',
    };
    return labels[type] || type;
  }

  getModalityLabel(mod: string): string {
    return mod === 'virtual' ? '🖥️ Sesión Virtual (Videollamada)' : '🏢 Reunión Presencial';
  }
}
