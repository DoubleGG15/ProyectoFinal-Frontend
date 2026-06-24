import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitizenMockService, CitizenCase } from '../services/citizen-mock.service';

@Component({
  selector: 'app-agreement-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" *ngIf="caso">
      <h2>Revisión del Acta de Acuerdo</h2>
      
      <div class="agreement-box">
        <h3>Términos del Acuerdo Provisional</h3>
        <p class="details">{{ caso.agreementDetails }}</p>
      </div>

      <div class="feedback-section" *ngIf="solicitandoCambios">
        <label for="feedback">Describe detalladamente los cambios que solicitas:</label>
        <textarea id="feedback" [(ngModel)]="comentarios" rows="4" placeholder="Escribe aquí..."></textarea>
      </div>

      <div class="actions">
        <button *ngIf="!solicitandoCambios" class="btn btn-success" (click)="aceptar()">Aceptar Acuerdo</button>
        <button *ngIf="!solicitandoCambios" class="btn btn-danger" (click)="solicitandoCambios = true">Solicitar Cambios</button>
        
        <button *ngIf="solicitandoCambios" class="btn btn-primary" (click)="enviarCambios()">Enviar Solicitud de Cambio</button>
        <button *ngIf="solicitandoCambios" class="btn btn-secondary" (click)="solicitandoCambios = false">Cancelar</button>
      </div>

      <p class="msg" *ngIf="mensaje">{{ mensaje }}</p>
    </div>
  `,
  styles: [`
    .container { max-width: 700px; margin: 2rem auto; padding: 1.5rem; font-family: sans-serif; }
    .agreement-box { background: #f9f9f9; border: 1px solid #dcdde1; padding: 2rem; border-radius: 6px; margin-bottom: 1.5rem; }
    .details { font-size: 1.1rem; line-height: 1.6; color: #2f3640; italic; }
    .feedback-section { margin-bottom: 1.5rem; display: flex; flex-direction: column; }
    .feedback-section label { font-weight: bold; margin-bottom: 0.5rem; color: #2c3e50; }
    textarea { padding: 0.7rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; }
    .actions { display: flex; gap: 1rem; }
    .btn { padding: 0.7rem 1.5rem; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
    .btn-success { background: #2ecc71; color: white; }
    .btn-danger { background: #e74c3c; color: white; }
    .btn-primary { background: #3498db; color: white; }
    .btn-secondary { background: #95a5a6; color: white; }
    .msg { margin-top: 1rem; font-weight: bold; color: #27ae60; text-align: center; }
  `]
})
export class AgreementConfirmationComponent implements OnInit {
  caso?: CitizenCase;
  solicitandoCambios = false;
  comentarios = '';
  mensaje = '';

  constructor(private mockService: CitizenMockService) {}

  ngOnInit() {
    this.mockService.getCaseStatus().subscribe(data => this.caso = data);
  }

  aceptar() {
    this.mockService.submitAgreementDecision(true).subscribe(res => {
      this.mensaje = "¡Has aceptado el acuerdo con éxito!";
    });
  }

  enviarCambios() {
    if (!this.comentarios.trim()) return alert("Por favor escribe los cambios que necesitas.");
    this.mockService.submitAgreementDecision(false, this.comentarios).subscribe(res => {
      this.mensaje = "Tu solicitud de cambios ha sido enviada al mediador.";
      this.solicitandoCambios = false;
    });
  }
}