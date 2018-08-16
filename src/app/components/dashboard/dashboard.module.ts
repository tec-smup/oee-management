import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { LastFeedComponent } from './lastFeed.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import {AgGridModule} from "ag-grid-angular";
import { AmChartsModule } from '@amcharts/amcharts3-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AgGridModule.withComponents([]),
    AmChartsModule,
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
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ]
})
export class DashboardModule { }
