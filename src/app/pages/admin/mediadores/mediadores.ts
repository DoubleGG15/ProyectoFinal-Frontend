import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-mediadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mediadores.html',
  styleUrl: './mediadores.css'
})
export class MediadoresComponent implements OnInit {
  mediadores: any[] = [];
  errorMessage: string = '';

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
}