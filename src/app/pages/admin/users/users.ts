import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.adminService.listarUsuarios().subscribe({
      next: (data: any[]) => {
        console.log('USUARIOS:', data);
        this.usuarios = data;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = 'Error al cargar usuarios';
        this.cd.detectChanges();
      }
    });
  }

  alternarEstado(userId: string): void {
    this.adminService.alternarEstado(userId).subscribe({
      next: () => {
        this.cargarUsuarios();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}