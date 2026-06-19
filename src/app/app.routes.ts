import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';
import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { roleGuard } from './core/guards/role.guard';
<<<<<<< HEAD
import { CaseReportFormComponent } from './features/casos/crear-caso/case-report-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['Administrador', 'Admin'])],
  },
=======
import { AdminCasesComponent } from './pages/admin/cases/cases';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/casos', component: AdminCasesComponent },

>>>>>>> b709c5b (avance)
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
<<<<<<< HEAD
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
=======

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
>>>>>>> b709c5b (avance)
