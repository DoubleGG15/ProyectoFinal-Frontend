import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Agreement, AgreementPoint } from '../../../models/api.models';
import { AuthService } from '../../../services/auth.service';

/** Mock de acuerdo — se reemplaza por AgreementService.getAgreementByCaseId(caseId) */
const MOCK_AGREEMENT: Agreement = {
  id: 'agr-001',
  caseId: 'case-001',
  mediatorId: 'mediator-01',
  agreementText:
    'Tras la sesión de mediación del 20 de junio de 2026, las partes acuerdan lo siguiente ' +
    'para resolver el conflicto de ruido excesivo en el Bloque A:',
  points: [
    {
      id: 'pt-1',
      description: 'El Sr. Carlos Ramos se compromete a apagar la música después de las 10:00 PM todos los días.',
      deadline: '2026-07-01',
      complianceStatus: 'pendiente',
    },
    {
      id: 'pt-2',
      description: 'Ambas partes acuerdan comunicarse de forma respetuosa y en persona ante cualquier nueva queja.',
      deadline: '2026-07-15',
      complianceStatus: 'pendiente',
    },
  ],
  confirmedByReporter: false,
  confirmedByRespondent: false,
  isImmutable: false,
};

@Component({
  selector: 'app-agreement-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './agreement-confirmation.component.html',
  styleUrls: ['./agreement-confirmation.component.css'],
})
export class AgreementConfirmationComponent implements OnInit {
  caseId: string = '';
  agreement: Agreement = MOCK_AGREEMENT;
  currentUserId: string | null = null;

  /** Simulación: ¿el ciudadano logueado es el "reporter" del caso? */
  isReporter: boolean = true;

  confirmed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.currentUserId = this.authService.getUserId();
    // TODO: cargar acuerdo real desde AgreementService
    // TODO: determinar isReporter comparando reporterId con currentUserId
  }

  /** ¿El acuerdo ya está formalizado (inmutable)? */
  get isImmutable(): boolean {
    return this.agreement.isImmutable;
  }

  /** ¿Ya confirmé como ciudadano logueado? */
  get alreadyConfirmed(): boolean {
    return this.isReporter
      ? this.agreement.confirmedByReporter
      : this.agreement.confirmedByRespondent;
  }

  onConfirm(): void {
    if (this.isImmutable || this.alreadyConfirmed) return;

    // MOCK: marcar la confirmación localmente
    if (this.isReporter) {
      this.agreement = { ...this.agreement, confirmedByReporter: true };
    } else {
      this.agreement = { ...this.agreement, confirmedByRespondent: true };
    }

    // Si ambas partes confirmaron → marcar como formalizado e inmutable
    if (this.agreement.confirmedByReporter && this.agreement.confirmedByRespondent) {
      this.agreement = {
        ...this.agreement,
        isImmutable: true,
        formalizedAt: new Date().toISOString(),
      };
      console.log('✅ ACUERDO FORMALIZADO E INMUTABLE:', this.agreement);
    }

    this.confirmed = true;
    console.log('Confirmación registrada (MOCK):', this.agreement);
  }

  onGoBack(): void {
    this.router.navigate(['/ciudadano/caso', this.caseId]);
  }

  trackPoint(_index: number, point: AgreementPoint): string {
    return point.id;
  }
}
