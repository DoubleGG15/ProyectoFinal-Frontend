import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard';
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail';
import { CitizenDashboardComponent } from './pages/citizen/dashboard/citizen-dashboard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['Administrador', 'Admin'])]
  },
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
  {
    path: 'ciudadano/dashboard',
    component: CitizenDashboardComponent,
    canActivate: [roleGuard(['Ciudadano'])]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];