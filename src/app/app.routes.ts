import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineComponent } from './components/machine/machine.component';

const appRoutes: Routes = [
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
    {
      path: 'machine',
      canActivate: [AuthGuard],
      component: MachineComponent
    },    
    {
      path: '**',
      redirectTo: 'dashboard'
    },    
  ];

  export const Routing = RouterModule.forRoot(appRoutes);