import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';
import { Agreement } from '../../../models/api.models';

@Component({
  selector: 'app-agreement-confirmation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './agreement-confirmation.component.html',
  styles: [
    `
      .agreement-container {
        background-color: #2d4c3f;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px;
        font-family: 'Outfit', 'Inter', sans-serif;
        box-sizing: border-box;
      }
      .agreement-card {
        max-width: 800px;
        width: 100%;
        background-color: #1e332a;
        color: #e2e8f0;
        border: 1px solid rgba(242, 193, 78, 0.2);
        border-radius: 12px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        padding: 16px;
      }
      .agreement-title {
        color: #f2c14e !important;
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .agreement-subtitle {
        color: #a0aec0 !important;
        font-size: 1rem;
      }
      mat-divider {
        border-top-color: rgba(242, 193, 78, 0.15) !important;
        margin: 20px 0;
      }
      .agreement-content h3 {
        color: #f2c14e;
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 12px;
        font-weight: 600;
      }
      .agreement-text {
        font-size: 1.05rem;
        line-height: 1.6;
        color: #cbd5e0;
        white-space: pre-line;
        background-color: rgba(0, 0, 0, 0.15);
        padding: 16px;
        border-radius: 8px;
        border-left: 4px solid #f2c14e;
      }
      .points-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .point-item {
        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 16px;
        transition: all 0.3s ease;
      }
      .point-item:hover {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(242, 193, 78, 0.3);
      }
      .point-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 8px;
      }
      .point-badge {
        background-color: rgba(242, 193, 78, 0.15);
        color: #f2c14e;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .point-deadline {
        color: #a0aec0;
        font-size: 0.9rem;
      }
      .point-status {
        font-size: 0.9rem;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
      }
      .point-status.pendiente {
        background-color: rgba(237, 137, 54, 0.15);
        color: #ed8936;
      }
      .point-status.cumplido {
        background-color: rgba(72, 187, 120, 0.15);
        color: #48bb78;
      }
      .point-status.incumplido {
        background-color: rgba(245, 101, 101, 0.15);
        color: #f56565;
      }
      .point-description {
        margin: 0;
        color: #e2e8f0;
        font-size: 1rem;
        line-height: 1.5;
      }
      .status-summary {
        background-color: rgba(0, 0, 0, 0.15);
        padding: 16px;
        border-radius: 8px;
      }
      .status-summary p {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        font-size: 1rem;
      }
      .status-signed {
        color: #48bb78;
        font-weight: 600;
      }
      .status-pending {
        color: #ed8936;
        font-weight: 600;
      }
      .immutable-banner {
        background-color: #f2c14e;
        color: #1a2e26;
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.5;
        padding: 18px;
        border-radius: 8px;
        text-align: center;
        margin-top: 24px;
        box-shadow: 0 4px 15px rgba(242, 193, 78, 0.3);
        border-left: 6px solid #d4a325;
        animation: fadeIn 0.5s ease-out;
      }
      .agreement-actions {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        padding: 8px 0 0 0;
        margin-top: 16px;
      }
      .btn-confirm {
        background-color: #f2c14e !important;
        color: #1e332a !important;
        font-weight: 700 !important;
        font-size: 1rem !important;
        padding: 8px 24px !important;
        border-radius: 6px !important;
        transition: all 0.3s ease !important;
      }
      .btn-confirm:hover {
        background-color: #d4a325 !important;
        transform: translateY(-2px);
      }
      .btn-reject {
        color: #f56565 !important;
        border-color: rgba(245, 101, 101, 0.4) !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
        padding: 8px 24px !important;
        border-radius: 6px !important;
        transition: all 0.3s ease !important;
      }
      .btn-reject:hover {
        background-color: rgba(245, 101, 101, 0.1) !important;
        border-color: #f56565 !important;
        transform: translateY(-2px);
      }
      .loading-container {
        color: #f2c14e;
        text-align: center;
        font-size: 1.2rem;
        padding: 40px;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class AgreementConfirmationComponent implements OnInit {
  caseId: string | null = null;
  agreement: Agreement | null = null;
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id');
    // Consumo seguro del servicio de autenticación
    if (this.authService && typeof this.authService.getUserId() === 'function') {
      this.currentUser = this.authService.getUserId();
    }

    if (this.caseId) {
      this.loadMockAgreement(this.caseId);
    }
  }

  private loadMockAgreement(caseId: string): void {
    this.agreement = {
      id: 'agree_mock_123',
      caseId: caseId,
      mediatorId: 'med_june_2026',
      agreementText: `ACUERDO FORMAL DE MEDIACIÓN Y COEXISTENCIA PACÍFICA
En virtud del proceso voluntario de mediación llevado a cabo el día 18 de junio de 2026, las partes involucradas acuerdan resolver de forma definitiva las controversias presentadas. Este instrumento legal plasma la voluntad conjunta de restaurar las relaciones comunitarias respetando las cláusulas acordadas.`,
      points: [
        {
          id: '1',
          description:
            'Cesar y restringir las emisiones de ruido excesivo provenientes de actividades domésticas fuera de las horas permitidas (22:00 a 08:00 hrs).',
          deadline: '2026-06-25',
          complianceStatus: 'pendiente',
        },
        {
          id: '2',
          description:
            'Realizar la limpieza compartida y mantenimiento de las zonas de acceso peatonal común y jardines circundantes de forma quincenal.',
          deadline: '2026-06-30',
          complianceStatus: 'pendiente',
        },
      ],
      confirmedByReporter: false,
      confirmedByRespondent: true, // Contraparte firmó previamente
      isImmutable: false,
    };
  }

  confirmAgreement(): void {
    if (this.agreement) {
      this.agreement.confirmedByReporter = true;
      this.agreement.isImmutable = true;
      console.log('Convenio Confirmado y Guardado:', this.agreement);
    }
  }

  rejectAgreement(): void {
    if (this.agreement) {
      alert('Has solicitado cambios al acuerdo. El mediador a cargo será notificado.');
      console.log('Cambios Solicitados / Acuerdo Rechazado:', this.agreement);
    }
  }
}
