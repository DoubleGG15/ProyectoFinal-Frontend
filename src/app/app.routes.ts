import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';
import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { roleGuard } from './core/guards/role.guard';
import { CaseReportFormComponent } from './pages/citizen/case-report-form/case-report-form.component';
import { MyCasesComponent } from './pages/citizen/my-cases/my-cases.component';
import { CaseStatusComponent } from './pages/citizen/case-status/case-status.component';
import { AgreementConfirmationComponent } from './pages/citizen/agreement-confirmation/agreement-confirmation.component';
import { ComplianceReportComponent } from './pages/citizen/compliance-report/compliance-report.component';
import { LandingComponent } from './pages/public/landing/landing.component';

export const routes: Routes = [
  // ── Pública ────────────────────────────────────────────────
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  // ── Administrador ──────────────────────────────────────────
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['Administrador', 'Admin'])],
  },

  // ── Mediador ───────────────────────────────────────────────
  {
    path: 'mediador/dashboard',
    component: MediatorDashboard,
    canActivate: [roleGuard(['Mediador'])],
  },
  {
    path: 'mediador/casos',
    component: AssignedCasesComponent,
    canActivate: [roleGuard(['Mediador'])],
  },
  {
    path: 'mediador/caso/:id',
    component: CaseDetail,
    canActivate: [roleGuard(['Mediador'])],
  },

  // ── Ciudadano ──────────────────────────────────────────────
  {
    path: 'ciudadano/dashboard',
    component: CitizenDashboardComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: 'ciudadano/reportar',
    component: CaseReportFormComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: 'ciudadano/mis-casos',
    component: MyCasesComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: 'ciudadano/caso/:id',
    component: CaseStatusComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: 'ciudadano/acuerdo/:id/confirmar',
    component: AgreementConfirmationComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: 'ciudadano/acuerdo/:id/cumplimiento',
    component: ComplianceReportComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },

  // ── Fallback ───────────────────────────────────────────────
  {
    path: '**',
    redirectTo: '',
  },
];

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

