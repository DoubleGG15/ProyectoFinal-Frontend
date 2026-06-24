import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { AdminCasesComponent } from './pages/admin/cases/cases';
import { MediadoresComponent } from './pages/admin/mediadores/mediadores';
import { ReportsComponent } from './pages/admin/reports/reports';
import { UsersComponent } from './pages/admin/users/users';
import { ReportCaseComponent } from './pages/citizen/report-case/report-case';

import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';

import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { CaseReportFormComponent } from './pages/citizen/case-report-form/case-report-form.component';
import { MyCasesComponent } from './pages/citizen/my-cases/my-cases.component';
import { CaseStatusComponent } from './pages/citizen/case-status/case-status';
import { AgreementConfirmationComponent } from './pages/citizen/agreement-confirmation/agreement-confirmation';
import { ComplianceReportComponent } from './pages/citizen/compliance-report/compliance-report';

import { LandingComponent } from './pages/public/landing/landing';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // --- Rutas Públicas ---
  { 
    path: 'inicio', 
    component: LandingComponent 
  },
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

  // --- Rutas del Ciudadano ---
  {
    path: 'ciudadano/dashboard',
    component: CitizenDashboardComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/reportar',
    component: CaseReportFormComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  { 
    path: 'ciudadano/reportar-caso', 
    component: ReportCaseComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/mis-casos',
    component: MyCasesComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/caso/:id',
    component: CaseStatusComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/acuerdo/:id/confirmar',
    component: AgreementConfirmationComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/acuerdo/:id/cumplimiento',
    component: ComplianceReportComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/estado',
    component: CaseStatusComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/acuerdo',
    component: AgreementConfirmationComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  {
    path: 'ciudadano/reporte',
    component: ComplianceReportComponent,
    canActivate: [roleGuard(['Ciudadano', 'ciudadano'])]
  },
  
  // --- Rutas de Administrador ---
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
  {
    path: 'admin/casos',
    component: AdminCasesComponent,
  },
  {
    path: 'admin/mediadores',
    component: MediadoresComponent,
  },
  {
    path: 'admin/reportes',
    component: ReportsComponent,
  },

  // --- Rutas de Mediador ---
  {
    path: 'mediador/dashboard',
    component: MediatorDashboard,
    canActivate: [roleGuard(['Mediador', 'mediador'])],
  },
  {
    path: 'mediador/casos',
    component: AssignedCasesComponent,
    canActivate: [roleGuard(['Mediador', 'mediador'])],
  },
  {
    path: 'mediador/caso/:id',
    component: CaseDetail,
    canActivate: [roleGuard(['Mediador', 'mediador'])],
  },

  // --- Redirección Comodín ---
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
