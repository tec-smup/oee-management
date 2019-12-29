import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { LastFeedComponent } from './lastFeed.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import {AgGridModule} from "ag-grid-angular";
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { FilterService } from '../../services/dashboard/filter.service';
import { DateRangeModule } from '../dropdown/dateRange/date.range.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,
    AgGridModule.withComponents([]),
    AmChartsModule,
    DateRangeModule
  ],
  declarations: [ 
    DashboardComponent,
    LastFeedComponent,
  ],
  exports: [ 
    DashboardComponent, 
    LastFeedComponent,
  ],
  providers: [ 
    DashboardService,
    FilterService
  ]
})
export class DashboardModule { }
