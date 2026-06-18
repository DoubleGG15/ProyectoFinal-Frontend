import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { UsersComponent } from './pages/admin/users/users';
import { MediadoresComponent } from './pages/admin/mediadores/mediadores';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/mediadores', component: MediadoresComponent },
   { path: '**', redirectTo: 'admin/mediadores' }
];