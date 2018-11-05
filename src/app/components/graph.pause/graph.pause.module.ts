import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphPauseComponent } from './graph.pause.component';
import { SharedModule } from '../shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { PauseModalComponent } from './pause.modal.component';
import { DropdownPauseReasonModule } from '../dropdown/pause.reason/dropdown.pause.reason.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AmChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DropdownChannelModule,
    DropdownMachineModule,
    DropdownPauseReasonModule 
  ],
  declarations: [ 
    GraphPauseComponent,    
    PauseModalComponent
  ],
  exports: [ GraphPauseComponent ],
  providers: [ 
    DashboardService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ],
  entryComponents: [
    PauseModalComponent
  ],   
})
export class GraphPauseModule { }
