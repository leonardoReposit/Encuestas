import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.Register) },
  { path: '', loadComponent: () => import('./components/encuesta-list/encuesta-list').then(m => m.EncuestaList) },
  { path: 'encuestas/nueva', loadComponent: () => import('./components/encuesta-form/encuesta-form').then(m => m.EncuestaForm), canActivate: [adminGuard] },
  { path: 'encuestas/:id', loadComponent: () => import('./components/encuesta-detail/encuesta-detail').then(m => m.EncuestaDetail) },
  { path: 'encuestas/:id/resultados', loadComponent: () => import('./components/resultados/resultados').then(m => m.Resultados) },
  { path: '**', redirectTo: '' }
];
