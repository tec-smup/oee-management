import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MachineProductionComponent } from './machine.production.component';
import { SharedModule } from '../shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MachineProductionChartComponent } from './chart/machine.prod.chart.component';
import { MachineProductionNominalComponent } from './nominal.output/machine.prod.nominal.component';
import { MachineProductionOeeComponent } from './oee/machine.prod.oee.component';
import { MachineProductionPausesComponent } from './pauses/machine.prod.pauses.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,  
  ],
  declarations: [ 
    MachineProductionComponent,   
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionOeeComponent,
    MachineProductionPausesComponent 
  ],
  exports: [ 
    MachineProductionComponent,
    MachineProductionChartComponent,
    MachineProductionNominalComponent,
    MachineProductionOeeComponent,
    MachineProductionPausesComponent    
  ],
  providers: [ 
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ]
})
export class MachineProductionModule { }
