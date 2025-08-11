import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BillingComponent } from './pages/billing/billing.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Shrinkit - URL Shortener'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Sign In - Shrinkit'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Get Started - Shrinkit'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: 'Dashboard - Shrinkit'
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
    title: 'Analytics - Shrinkit'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    title: 'Profile - Shrinkit'
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [AuthGuard],
    title: 'Billing - Shrinkit'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];