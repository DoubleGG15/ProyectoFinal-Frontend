import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-cases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cases.html',
  styleUrl: './cases.css'
})
export class AdminCasesComponent implements OnInit {
  casos: any[] = [];
  mediadores: any[] = [];

  mediadorSeleccionado: { [key: string]: string } = {};
  errorMessage = '';
  successMessage = '';

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.adminService.listarCasos().subscribe({
      next: (data: any) => {
        this.casos = Array.isArray(data)
          ? data
          : data.$values ?? data.Values ?? [];

        console.log('CASOS:', this.casos);
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('ERROR CASOS:', err);
        this.errorMessage = 'Error al cargar casos';
        this.cd.detectChanges();
      }
    });

    this.adminService.listarMediadores().subscribe({
      next: (data: any) => {
        this.mediadores = Array.isArray(data)
          ? data
          : data.$values ?? data.Values ?? [];

        console.log('MEDIADORES:', this.mediadores);
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('ERROR MEDIADORES:', err);
        this.errorMessage = 'Error al cargar mediadores';
        this.cd.detectChanges();
      }
    });
  }

  getId(item: any): string {
    return item.id || item.Id || item.casoId || item.CasoId || item.userId || item.UserId || '';
  }

  asignarMediador(casoId: string): void {
    const mediadorId = this.mediadorSeleccionado[casoId];

    if (!mediadorId) {
      this.errorMessage = 'Seleccione un mediador';
      this.successMessage = '';
      return;
    }

    this.adminService.asignarMediadorCaso(casoId, mediadorId).subscribe({
      next: () => {
        this.successMessage = 'Mediador asignado correctamente';
        this.errorMessage = '';

        setTimeout(() => {
          this.cargarDatos();
          this.cd.detectChanges();
        }, 300);
      },
      error: (err: any) => {
        console.error('ERROR ASIGNAR:', err);
        this.errorMessage = err.error?.message || 'Error al asignar mediador';
        this.successMessage = '';
        this.cd.detectChanges();
      }
    });
  }
}