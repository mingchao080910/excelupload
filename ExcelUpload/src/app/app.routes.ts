import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component:LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'phone',
    loadChildren: () =>
      import('./pages/phone-manage/phone-manage-routing').then(
        (m) => m.PHONERoutes
      ),
    canActivate: [authGuard],
  },
  {
    path: 'band',
    loadChildren: () =>
      import('./pages/band-manage/band-manage-routing').then(
        (m) => m.BandRoutes
      ),
    canActivate: [authGuard],
  },
  {
    path: 'feature',
    loadChildren: () =>
      import('./pages/feature-manage/feature-manage-routing').then(
        (m) => m.FeatureRoutes
      ),
    canActivate: [authGuard],
  },
];
