import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Agreement, AgreementPoint, ComplienceStatus } from '../../../models/api.models';

@Component({
  selector: 'app-compliance-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './compliance-report.component.html',
  styles: [
    `
      .container {
        min-height: 100vh;
        background: linear-gradient(135deg, #1e332a 0%, #2d4c3f 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
        font-family: 'Outfit', 'Inter', sans-serif;
      }

      .compliance-card {
        width: 100%;
        max-width: 600px;
        background: rgba(45, 76, 63, 0.85);
        border: 1px solid rgba(242, 193, 78, 0.3);
        border-radius: 16px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #ffffff;
        padding: 1.5rem;
      }

      .card-header {
        border-bottom: 2px solid #f2c14e;
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
      }

      .card-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #f2c14e;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .case-badge {
        font-size: 0.85rem;
        background-color: rgba(242, 193, 78, 0.2);
        color: #f2c14e;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        border: 1px solid #f2c14e;
        margin-top: 0.5rem;
        display: inline-block;
      }

      .agreement-point-detail {
        background: rgba(255, 255, 255, 0.05);
        border-left: 4px solid #f2c14e;
        padding: 1rem;
        border-radius: 0 8px 8px 0;
        margin-bottom: 1.5rem;
      }

      .point-label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #f2c14e;
        margin-bottom: 0.25rem;
        font-weight: 600;
      }

      .point-desc {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .point-deadline {
        font-size: 0.85rem;
        color: #ff8a80;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-weight: 500;
      }

      .compliance-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      ::ng-deep .mat-mdc-form-field {
        width: 100%;
      }

      /* Estilos personalizados para inputs y selectores (Dark green & Gold Theme) */
      ::ng-deep .mat-mdc-text-field-wrapper {
        background-color: rgba(255, 255, 255, 0.08) !important;
      }

      ::ng-deep .mat-mdc-form-field-focus-indicator {
        color: #f2c14e !important;
      }

      ::ng-deep .mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label {
        color: #f2c14e !important;
      }

      ::ng-deep .mdc-text-field--focused .mdc-line-ripple::after {
        border-bottom-color: #f2c14e !important;
      }

      ::ng-deep .mat-mdc-select-arrow {
        color: #f2c14e !important;
      }

      ::ng-deep .mat-mdc-select-value {
        color: #ffffff !important;
      }

      ::ng-deep .mat-mdc-input-element {
        color: #ffffff !important;
        caret-color: #f2c14e !important;
      }

      ::ng-deep .mat-mdc-form-field-label {
        color: rgba(255, 255, 255, 0.7) !important;
      }

      /* Estilos del panel desplegable de mat-select */
      ::ng-deep .mat-mdc-select-panel {
        background-color: #2d4c3f !important;
        border: 1px solid #f2c14e !important;
      }

      ::ng-deep .mat-mdc-option {
        color: #ffffff !important;
      }

      ::ng-deep .mat-mdc-option:hover:not(.mdc-list-item--disabled),
      ::ng-deep .mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled) {
        background-color: rgba(242, 193, 78, 0.15) !important;
      }

      ::ng-deep .mat-mdc-option.mdc-list-item--selected .mdc-list-item__primary-text {
        color: #f2c14e !important;
      }

      .error-hint {
        color: #ff8a80;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        display: block;
      }

      .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
      }

      .btn-cancel {
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: #ffffff !important;
        border-radius: 8px !important;
        padding: 0.5rem 1.5rem !important;
      }

      .btn-submit {
        background-color: #f2c14e !important;
        color: #2d4c3f !important;
        font-weight: 700 !important;
        border-radius: 8px !important;
        padding: 0.5rem 1.5rem !important;
      }

      .btn-submit:disabled {
        background-color: rgba(242, 193, 78, 0.4) !important;
        color: rgba(45, 76, 63, 0.6) !important;
      }
    `,
  ],
})
export class ComplianceReportComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  caseId: string = '';
  mockAgreementPoint!: AgreementPoint;

  // Formulario Reactivo Estricto
  form = this.fb.group({
    status: this.fb.control<ComplienceStatus | ''>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    comments: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(15)],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    // 1. Capturar el ID de la ruta (caseId)
    this.caseId = this.route.snapshot.paramMap.get('id') || 'caso-default-999';

    // 2. Simular carga de un punto del acuerdo (AgreementPoint) ya vencido
    // Para probar la inmutabilidad y vencimiento simulamos un deadline anterior al 19/06/2026
    this.mockAgreementPoint = {
      id: 'point-456',
      description:
        'Construir el muro medianero divisorio utilizando materiales aislantes de ruido y pintura ecológica verde bosque.',
      deadline: '2026-06-15T18:00:00Z',
      complianceStatus: 'pendiente',
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { status, comments } = this.form.value;

    // 3. Construir objeto de auditoría inmutable
    const auditPayload = {
      caseId: this.caseId,
      pointId: this.mockAgreementPoint.id,
      description: this.mockAgreementPoint.description,
      previousStatus: this.mockAgreementPoint.complianceStatus,
      newStatus: status as ComplienceStatus,
      comments: comments,
      timestamp: new Date().toISOString(),
      reporterRole: 'ciudadano',
      systemLogId: `AUDIT-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)}`,
    };

    // Imprimir el payload inmutable completo
    console.log('🔒 [EXPEDIENTE DIGITAL - LOG INMUTABLE DE AUDITORÍA]');
    console.log(JSON.stringify(auditPayload, null, 2));
    console.log('----------------------------------------------------');

    // Redirigir al ciudadano a '/ciudadano/mis-casos'
    this.router.navigate(['/ciudadano/mis-casos']);
  }
}
