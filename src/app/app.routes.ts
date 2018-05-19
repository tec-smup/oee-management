import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineComponent } from './components/machine/machine.component';
import { ChannelComponent } from './components/channel/channel.component';
import { MachinePauseComponent } from './components/machine.pause/machine.pause.component';

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
      path: 'channel',
      canActivate: [AuthGuard],
      component: ChannelComponent
    },     
    {
      path: 'machine',
      canActivate: [AuthGuard],
      component: MachineComponent
    },
    {
      path: 'machinepause',
      canActivate: [AuthGuard],
      component: MachinePauseComponent
    },        
    {
      path: '**',
      redirectTo: 'dashboard'
    },    
  ];

  export const Routing = RouterModule.forRoot(appRoutes);