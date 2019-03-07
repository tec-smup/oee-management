import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

import { MachinePauseService } from '../../services/machine.pause/machine.pause.service';
import { MachineService } from '../../services/machine/machine.service';

import { MachineProductionChartComponent } from './chart/machine.prod.chart.component';
import { MachineProductionNominalComponent } from './nominal.output/machine.prod.nominal.component';
import { MachineProductionPausesComponent } from './pauses/machine.prod.pauses.component';
import { MachineProductionComponent } from './machine.production.component';
import { MachineProductionChartPauseParetoComponent } from './chart.pause.pareto/machine.prod.chart.pause.pareto.component';

import { HHMMSSPipe } from '../../pipes/HHMMSS';
import { MachineShiftService } from '../../services/machine.shift/machine.shift.service';
import { GaugeShiftOeeComponent } from './shift.oee/shift.oee.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,    
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,   
    AmChartsModule
  ],
  declarations: [ 
    MachineProductionComponent,   
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionPausesComponent,
    MachineProductionChartPauseParetoComponent,
    GaugeShiftOeeComponent,
    HHMMSSPipe
  ],
  exports: [ 
    MachineProductionComponent,
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionPausesComponent,
    MachineProductionChartPauseParetoComponent,
    GaugeShiftOeeComponent,
    HHMMSSPipe
  ],
  providers: [ 
    MachinePauseService,
    MachineService,
    MachineShiftService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ]
})
export class MachineProductionModule { }
