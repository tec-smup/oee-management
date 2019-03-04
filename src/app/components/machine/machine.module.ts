import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MachineComponent } from './machine.component';
import { SharedModule } from '../shared/shared.module';
import {AgGridModule} from "ag-grid-angular";
import { MachineService } from '../../services/machine/machine.service';
import { MachineGridButtonRenderer } from './grid/machine.grid.buttons.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SQLModalComponent } from './modal/sql.modal.component';
import { MachineModalComponent } from '../channel/modal/machine.modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShiftModalComponent } from './modal/shift.modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownShiftsModule } from '../dropdown/shifts/dropdown.shifts.module';
import { MachineShiftService } from '../../services/machine.shift/machine.shift.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([MachineGridButtonRenderer]),
    AngularFontAwesomeModule,    
    ModalModule.forRoot(),
    DropdownShiftsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    MachineComponent,    
    MachineGridButtonRenderer,
    SQLModalComponent,
    ShiftModalComponent
  ],
  exports: [ MachineComponent ],
  providers: [ MachineService, MachineShiftService ],
  entryComponents: [
    MachineModalComponent,
    SQLModalComponent,
    ShiftModalComponent
  ],  
})
export class MachineModule { }
