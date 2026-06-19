import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgreementService } from '../../../../shared/services/agreement';
import { ConflictCase, ConflictStatus } from '../../../../models/api.models';

const STATUS_CONFIG: Record<ConflictStatus, { label: string; color: string }> = {
  nuevo:                 { label: 'Nuevo',          color: '#3b82f6' },
  asignado:              { label: 'Asignado',        color: '#f59e0b' },
  'en mediacion':        { label: 'En Mediación',    color: '#8b5cf6' },
  resuelto:              { label: 'Resuelto',        color: '#10b981' },
  'cerrado sin acuerdo': { label: 'Sin Acuerdo',     color: '#ef4444' },
};

@Component({
  selector: 'app-assigned-cases',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assigned-cases.html',
  styleUrls: ['./assigned-cases.css'],
})
export class AssignedCasesComponent implements OnInit {
  casos: ConflictCase[] = [];
  isLoading: boolean = true;
  errorMsg: string | null = null;

  readonly statusConfig = STATUS_CONFIG;

  constructor(private agreementService: AgreementService) {}

  ngOnInit(): void {
    this.cargarCasos();
  }

  cargarCasos(): void {
    this.isLoading = true;
    this.errorMsg  = null;

    this.agreementService.listarCasosAsignados().subscribe({
      next: (data: ConflictCase[]) => {
        this.casos    = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error al cargar los casos del mediador:', err);
        this.errorMsg  = 'No se pudieron cargar los casos. Se muestran datos locales.';
        this.isLoading = false;
      },
    });
  }

  getStatusLabel(status: ConflictStatus): string {
    return this.statusConfig[status]?.label ?? status;
  }

  getStatusColor(status: ConflictStatus): string {
    return this.statusConfig[status]?.color ?? '#64748b';
  }
}
