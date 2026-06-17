import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
  dashboard: any = null;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.obtenerDashboard().subscribe({
     next: (data: any) => {
  console.log('DASHBOARD DATA:', data);
  this.dashboard = data;
},
error: (err: any) => {
  console.log('ERROR DASHBOARD:', err);
  this.errorMessage = 'Error al cargar el dashboard';
}
    });
  }
}