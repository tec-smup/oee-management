import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { LastFeedComponent } from './lastFeed.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DropdownChannelModule,
    DropdownMachineModule
  ],
  declarations: [ 
    DashboardComponent,
    LastFeedComponent,
  ],
  exports: [ 
    DashboardComponent, 
    LastFeedComponent,
  ],
  providers: [ DashboardService ]
})
export class DashboardModule { }
