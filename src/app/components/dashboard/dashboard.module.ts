import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DropdownChannelModule
  ],
  declarations: [ 
    DashboardComponent
  ],
  exports: [ DashboardComponent ]
})
export class DashboardModule { }
