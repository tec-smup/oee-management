import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MachinePauseComponent } from './machine.pause.component';
import { SharedModule } from '../shared/shared.module';
import {AgGridModule} from "ag-grid-angular/main";
import { MachinePauseService } from '../../services/machine.pause/machine.pause.service';

import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownMachineModule,
    AgGridModule.withComponents([]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,  
  ],
  declarations: [ 
    MachinePauseComponent,    
  ],
  exports: [ MachinePauseComponent ],
  providers: [ 
    MachinePauseService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
  ]
})
export class MachinePauseModule { }
