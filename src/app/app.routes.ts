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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/mediadores', component: MediadoresComponent },

  { path: 'ciudadano/reportar-caso', component: ReportCaseComponent },

  { path: 'mediador/dashboard', component: MediatorDashboard },
  { path: 'mediador/casos', component: AssignedCasesComponent },
  { path: 'mediador/caso/:id', component: CaseDetail }
];