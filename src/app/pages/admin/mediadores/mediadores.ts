import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mediadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mediadores.html',
  styleUrl: './mediadores.css'
})
export class MediadoresComponent implements OnInit {
  mediadores: any[] = [];
  errorMessage: string = '';
zonas: { [key: string]: string } = {};

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMediadores();
  }

  cargarMediadores(): void {
    this.adminService.listarMediadores().subscribe({
      next: (data: any[]) => {
        console.log('MEDIADORES:', data);
        this.mediadores = data;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = 'Error al cargar mediadores';
        this.cd.detectChanges();
      }
    });
  }

  desactivarMediador(userId: string): void {
    this.adminService.desactivarMediador(userId).subscribe({
      next: () => {
        this.cargarMediadores();
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = 'Error al desactivar mediador';
        this.cd.detectChanges();
      }
    });
  }
asignarZona(userId: string): void {
  const zoneId = this.zonas[userId];

  if (!zoneId || zoneId.trim() === '') {
    this.errorMessage = 'Debe escribir una zona.';
    return;
  }

  this.adminService.asignarZona(userId, zoneId).subscribe({
    next: () => {
      this.zonas[userId] = '';
      this.cargarMediadores();
    },
    error: (err: any) => {
      console.log(err);
      this.errorMessage = 'Error al asignar zona';
      this.cd.detectChanges();
    }
  });
}

}