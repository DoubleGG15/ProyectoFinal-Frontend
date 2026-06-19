import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitizenMockService } from '../services/citizen-mock.service';

@Component({
  selector: 'app-compliance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Reporte de Cumplimiento o Incumplimiento</h2>
      <p class="subtitle">Utiliza este formulario si el plazo del acuerdo venció o si deseas informar sobre su estado.</p>

      <form (ngSubmit)="enviarReporte()" class="card-form">
        <div class="form-group">
          <label>Tipo de Reporte:</label>
          <select [(ngModel)]="reporte.tipo" name="tipo" class="form-control">
            <option value="cumplido">El acuerdo se cumplió con éxito</option>
            <option value="incumplido">Denuncia por Incumplimiento / Vencimiento de plazo</option>
          </select>
        </div>

        <div class="form-group">
          <label>Detalles / Evidencia:</label>
          <textarea [(ngModel)]="reporte.detalles" name="detalles" rows="5" class="form-control" placeholder="Describe los hechos actuales aquí..."></textarea>
        </div>

        <button type="submit" class="btn-submit">Enviar Reporte Oficial</button>
      </form>

      <div class="alert-success" *ngIf="ticketTracking">
        <h4>Reporte enviado correctamente</h4>
        <p>Código de seguimiento: <strong>{{ ticketTracking }}</strong></p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 2rem auto; padding: 1rem; font-family: sans-serif; }
    .subtitle { color: #7f8c8d; margin-bottom: 1.5rem; }
    .card-form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; }
    .form-group label { font-weight: 600; margin-bottom: 0.5rem; color: #2c3e50; }
    .form-control { padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
    .btn-submit { width: 100%; background: #34495e; color: white; padding: 0.8rem; border: none; border-radius: 4px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s; }
    .btn-submit:hover { background: #2c3e50; }
    .alert-success { margin-top: 1.5rem; background: #d4edda; color: #155724; padding: 1rem; border-radius: 4px; border: 1px solid #c3e6cb; text-align: center; }
  `]
})
export class ComplianceReportComponent {
  reporte = {
    tipo: 'incumplido',
    detalles: ''
  };
  ticketTracking = '';

  constructor(private mockService: CitizenMockService) {}

  enviarReporte() {
    if (!this.reporte.detalles.trim()) return alert("Por favor escribe los detalles del reporte.");
    
    this.mockService.submitComplianceReport(this.reporte).subscribe(res => {
      this.ticketTracking = res.trackingId;
      this.reporte.detalles = ''; // Limpiar formulario
    });
  }
}