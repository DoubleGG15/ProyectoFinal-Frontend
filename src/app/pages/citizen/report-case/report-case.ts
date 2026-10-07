import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-report-case',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-case.html',
  styleUrl: './report-case.css'
})
export class ReportCaseComponent {
  titulo: string = '';
  descripcion: string = '';
  direccion: string = '';
  categoria: string = '';
  contraparteId: string = '';
  zoneId: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private caseService: CaseService) {}

  crearCaso(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.caseService.crearCaso(
      this.titulo,
      this.descripcion,
      this.direccion,
      this.categoria,
      this.contraparteId,
      this.zoneId
    ).subscribe({
      next: () => {
        this.successMessage = 'Caso creado correctamente.';
        this.isLoading = false;

        this.titulo = '';
        this.descripcion = '';
        this.direccion = '';
        this.categoria = '';
        this.contraparteId = '';
        this.zoneId = '';
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = err.error?.message || 'Error al crear el caso.';
        this.isLoading = false;
      }
    });
  }
}