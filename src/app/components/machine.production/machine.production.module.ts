import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
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
import { DropdownDWMYModule } from '../dropdown/dwmy.filter/dropdown.dwmy.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownChannelModule,
    DropdownMachineModule,    
    AmChartsModule,
    DropdownDWMYModule
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
    MachineShiftService
  ]
})
export class MachineProductionModule { }
