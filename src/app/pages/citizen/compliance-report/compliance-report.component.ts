import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Agreement, AgreementPoint, ComplienceStatus } from '../../../models/api.models';

/** Mock del acuerdo resuelto — se reemplaza por AgreementService */
const MOCK_AGREEMENT: Agreement = {
  id: 'agr-001',
  caseId: 'case-003',
  mediatorId: 'mediator-02',
  agreementText: 'Acuerdo formalizado el 1 de junio de 2026 para el conflicto de límites de propiedad.',
  points: [
    {
      id: 'pt-1',
      description: 'Roberto García demolerá la extensión de 30 cm que invade la propiedad antes del 15 de julio.',
      deadline: '2026-07-15',
      complianceStatus: 'pendiente',
    },
    {
      id: 'pt-2',
      description: 'Ambas partes firmarán acta notarial de los límites de propiedad acordados.',
      deadline: '2026-07-30',
      complianceStatus: 'pendiente',
    },
  ],
  confirmedByReporter: true,
  confirmedByRespondent: true,
  formalizedAt: '2026-06-01T17:00:00Z',
  isImmutable: true,
};

/** Status para el select */
const COMPLIANCE_OPTIONS: { value: ComplienceStatus; label: string }[] = [
  { value: 'cumplido',    label: '✅ Cumplido' },
  { value: 'incumplido',  label: '❌ Incumplido' },
  { value: 'pendiente',   label: '⏳ Pendiente' },
];

@Component({
  selector: 'app-compliance-report',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './compliance-report.component.html',
  styleUrls: ['./compliance-report.component.css'],
})
export class ComplianceReportComponent implements OnInit {
  caseId: string = '';
  agreement: Agreement = MOCK_AGREEMENT;
  complianceForm!: FormGroup;
  submitted: boolean = false;

  readonly complianceOptions = COMPLIANCE_OPTIONS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.initForm();
    // TODO: cargar acuerdo real desde AgreementService.getAgreementByCaseId(caseId)
  }

  initForm(): void {
    // Control dinámico: un campo de status por cada punto del acuerdo
    const group: Record<string, ReturnType<FormBuilder['control']>> = {};
    this.agreement.points.forEach((point: AgreementPoint) => {
      group[point.id] = this.fb.control<ComplienceStatus>('pendiente', Validators.required);
    });
    this.complianceForm = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.complianceForm.invalid) return;

    const formValues = this.complianceForm.value as Record<string, ComplienceStatus>;

    // Construir el estado actualizado de los puntos del acuerdo
    const updatedPoints: AgreementPoint[] = this.agreement.points.map((point: AgreementPoint) => ({
      ...point,
      complianceStatus: formValues[point.id],
    }));

    const reportPayload = {
      agreementId: this.agreement.id,
      caseId: this.caseId,
      updatedPoints,
      reportedAt: new Date().toISOString(),
    };

    console.log('--- REPORTE DE CUMPLIMIENTO (MOCK) ---');
    console.log(reportPayload);

    this.submitted = true;
    // TODO: Llamar AgreementService.reportCompliance(reportPayload)
  }

  onGoBack(): void {
    this.router.navigate(['/ciudadano/caso', this.caseId]);
  }

  trackPoint(_index: number, point: AgreementPoint): string {
    return point.id;
  }
}
