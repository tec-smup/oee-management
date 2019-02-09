import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineComponent } from './components/machine/machine.component';
import { ChannelComponent } from './components/channel/channel.component';
import { UserComponent } from './components/user/user.component';
import { GraphPauseComponent } from './components/graph.pause/graph.pause.component';
import { MachineProductionComponent } from './components/machine.production/machine.production.component';

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
      path: 'graphpause',
      canActivate: [AuthGuard],
      component: GraphPauseComponent
    },     
    {
      path: 'user',
      canActivate: [AuthGuard],
      component: UserComponent
    },
    {
      path: 'machineproduction',
      canActivate: [AuthGuard],
      component: MachineProductionComponent
    },                
    {
      path: '**',
      redirectTo: 'dashboard'
    },    
  ];

  export const Routing = RouterModule.forRoot(appRoutes);