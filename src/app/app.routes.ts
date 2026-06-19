import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { UsersComponent } from './pages/admin/users/users';
import { MediadoresComponent } from './pages/admin/mediadores/mediadores';
import { ReportCaseComponent } from './pages/citizen/report-case/report-case';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';
import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { roleGuard } from './core/guards/role.guard';

// --- Tus importaciones (Corregidas sin el .component) ---
import { LandingComponent } from './pages/public/landing/landing';
import { CaseStatusComponent } from './pages/citizen/case-status/case-status';
import { AgreementConfirmationComponent } from './pages/citizen/agreement-confirmation/agreement-confirmation';
import { ComplianceReportComponent } from './pages/citizen/compliance-report/compliance-report';

export const routes: Routes = [
  // --- Rutas Públicas ---
  { 
    path: 'inicio', 
    component: LandingComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // --- Rutas del Ciudadano ---
  {
    path: 'ciudadano/dashboard',
    component: CitizenDashboardComponent,
    canActivate: [roleGuard(['Ciudadano'])]
  },
  {
    path: 'ciudadano/estado',
    component: CaseStatusComponent
  },
  {
    path: 'ciudadano/acuerdo',
    component: AgreementConfirmationComponent
  },
  {
    path: 'ciudadano/reporte',
    component: ComplianceReportComponent
  },
  { 
    path: 'ciudadano/reportar-caso', 
    component: ReportCaseComponent 
  },
  
  // --- Rutas de Administrador ---
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['Administrador', 'Admin'])]
  },

  // --- Rutas de Mediador ---
  {
    path: 'mediador/dashboard',
    component: MediatorDashboard,
    canActivate: [roleGuard(['Mediador'])]
  },
  {
    path: 'mediador/casos',
    component: AssignedCasesComponent,
    canActivate: [roleGuard(['Mediador'])]
  },
  {
    path: 'mediador/caso/:id',
    component: CaseDetail,
    canActivate: [roleGuard(['Mediador'])]
  },

  // --- Rutas Comodín y Redirecciones (SIEMPRE AL FINAL) ---
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];