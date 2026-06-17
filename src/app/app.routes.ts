import { Routes } from '@angular/router';
import { MediatorDashboard } from './features/mediator/pages/mediator-dashboard/mediator-dashboard'; // ◄--- Cambiado aquí
import { AssignedCasesComponent } from './features/mediator/pages/assigned-cases/assigned-cases';
import { CaseDetail } from './features/mediator/pages/case-detail/case-detail'; // ◄--- Cambiado aquí

export const routes: Routes = [
  { 
    path: 'mediador/dashboard', 
    component: MediatorDashboard 
  },
  { 
    path: 'mediador/casos', 
    component: AssignedCasesComponent 
  },
  { 
    path: 'mediador/caso/:id', 
    component: CaseDetail
  },
  { 
    path: '', 
    redirectTo: 'mediador/dashboard', 
    pathMatch: 'full' 
  }
];