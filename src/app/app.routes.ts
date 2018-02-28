import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {
      path: '**',
      component: LoginComponent
    },
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },  
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent
    },
  ];

  export const Routing = RouterModule.forRoot(appRoutes);