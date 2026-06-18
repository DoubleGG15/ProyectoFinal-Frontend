import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mediator-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mediator-dashboard.html',
  styleUrls: ['./mediator-dashboard.css']
})
export class MediatorDashboard {
  // Datos simulados informativos para el Dashboard
  metricas = {
    casosAsignados: 5,
    sesionesHoy: 2,
    acuerdosLogrados: 14
  };
}