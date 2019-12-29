import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphPauseComponent } from './graph.pause.component';
import { SharedModule } from '../shared/shared.module';

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { PauseModalComponent } from './pause.modal.component';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';
import { DateRangeModule } from '../dropdown/dateRange/date.range.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AmChartsModule,
    DropdownChannelModule,
    DropdownMachineModule,
    DropdownPauseReasonModule,
    DateRangeModule
  ],
  declarations: [ 
    GraphPauseComponent,    
    PauseModalComponent
  ],
  exports: [ GraphPauseComponent ],
  providers: [ 
    DashboardService,
  ],
  entryComponents: [
    PauseModalComponent
  ],   
})
export class GraphPauseModule { }
