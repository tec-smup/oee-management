import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import { MachineProductionChartComponent } from './chart/machine.prod.chart.component';
import { MachineProductionNominalComponent } from './nominal.output/machine.prod.nominal.component';
import { MachineProductionPausesComponent } from './pauses/machine.prod.pauses.component';
import { MachineProductionComponent } from './machine.production.component';

import { DashboardService } from '../../services/dashboard/dashboard.service';
import { HHMMSSPipe } from '../../pipes/HHMMSS';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,    
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
  ],
  declarations: [ 
    MachineProductionComponent,   
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionPausesComponent,
    HHMMSSPipe
  ],
  exports: [ 
    MachineProductionComponent,
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionPausesComponent,
    HHMMSSPipe
  ],
  providers: [ 
    DashboardService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ]
})
export class MachineProductionModule { }
