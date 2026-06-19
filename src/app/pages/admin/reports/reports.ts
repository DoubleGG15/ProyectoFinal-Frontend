import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: ['Nuevo', 'Asignado', 'En mediación', 'Resuelto'],
        datasets: [{ data: [2, 3, 1, 4] }]
      }
    });

    new Chart('typeChart', {
      type: 'bar',
      data: {
        labels: ['Ruido', 'Mascotas', 'Basura', 'Límites'],
        datasets: [{
          label: 'Casos',
          data: [4, 2, 3, 1]
        }]
      }
    });
  }
}