import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';
import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { roleGuard } from './core/guards/role.guard';
import { LandingComponent } from './pages/public/landing/landing.component';
import { CaseStatusComponent } from './pages/citizen/case-status/case-status.component';
import { AgreementConfirmationComponent } from './pages/citizen/agreement-confirmation/agreement-confirmation.component';
import { ComplianceReportComponent } from './pages/citizen/compliance-report/compliance-report.component';
import { CaseReportFormComponent } from './features/casos/crear-caso/case-report-form.component';

export const routes: Routes = [
  // --- Rutas Públicas ---
  { 
    path: 'inicio', 
    component: LandingComponent 
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
  
  // --- Rutas de Administrador ---
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['Administrador', 'Admin'])],
  },

  // --- Rutas de Mediador ---
import { AdminCasesComponent } from './pages/admin/cases/cases';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/casos', component: AdminCasesComponent },


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

  // --- Rutas Comodín y Redirecciones ---
  {
    path: '',
    redirectTo: 'inicio', // Redirige a la nueva landing page por defecto
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
  {
    path: 'ciudadano/dashboard',
    component: CitizenDashboardComponent,
    canActivate: [roleGuard(['Ciudadano'])],
  },
  // AGREGA ESTA NUEVA RUTA PARA EL FORMULARIO
  {
    path: 'ciudadano/reportar',
    component: CaseReportFormComponent, // <-- Te marcará error en rojo hasta que crees este componente
    canActivate: [roleGuard(['Ciudadano'])],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

