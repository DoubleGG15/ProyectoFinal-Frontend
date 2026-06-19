import { Component, OnInit } from '@angular/core';
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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.adminService.listarCasos().subscribe({
      next: (data) => this.casos = data,
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar casos';
      }
    });

    this.adminService.listarMediadores().subscribe({
      next: (data) => this.mediadores = data,
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar mediadores';
      }
    });
  }

  asignarMediador(casoId: string): void {
    const mediadorId = this.mediadorSeleccionado[casoId];

    if (!mediadorId) {
      this.errorMessage = 'Seleccione un mediador';
      return;
    }

    this.adminService.listarCasos().subscribe({
  next: (data: any[]) => this.casos = data,
  error: (err: any) => {
    console.error(err);
    this.errorMessage = 'Error al cargar casos';
  }
});
error: (err: any) => {
  console.error(err);
  this.errorMessage = err.error?.message || 'Error al asignar mediador';
}
  }
}