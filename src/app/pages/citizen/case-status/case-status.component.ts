import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { ConflictCase, ConflictStatus, MediationSession } from '../../../models/api.models';

/** Mock del caso actual — se reemplaza por CaseService.getCaseById(id) */
const MOCK_CASE: ConflictCase = {
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
};

/** Mock de sesiones relacionadas al caso */
const MOCK_SESSIONS: MediationSession[] = [
  {
    id: 'session-001',
    caseId: 'case-001',
    mediatorId: 'mediator-01',
    scheduledDate: '2026-06-20',
    scheduledTime: '14:00',
    modality: 'virtual',
    meetingLink: 'https://meet.example.com/sesion-001',
    status: 'programada',
    createdAt: '2026-06-12T10:00:00Z',
  },
];

/** Orden de estados para el stepper de progreso */
const STATUS_STEPS: ConflictStatus[] = [
  'nuevo',
  'asignado',
  'en mediacion',
  'resuelto',
];

@Component({
  selector: 'app-case-status',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
  ],
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.css'],
})
export class CaseStatusComponent implements OnInit {
  caseId: string = '';
  caso: ConflictCase = MOCK_CASE;
  sessions: MediationSession[] = MOCK_SESSIONS;

  readonly statusSteps = STATUS_STEPS;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    // TODO: Llamar CaseService.getCaseById(this.caseId) para datos reales
  }

  /** Devuelve el índice del estado actual en el stepper (0-based) */
  get currentStepIndex(): number {
    const idx = this.statusSteps.indexOf(this.caso.status as ConflictStatus);
    return idx >= 0 ? idx : 0;
  }

  /** ¿El caso tiene sesión programada próxima? */
  get nextSession(): MediationSession | undefined {
    return this.sessions.find(s => s.status === 'programada');
  }

  getModalityLabel(mod: string): string {
    return mod === 'virtual' ? '🖥️ Virtual' : '🏢 Presencial';
  }
}
