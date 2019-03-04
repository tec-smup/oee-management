import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownShiftsComponent } from './dropdown.shifts.component';
import { ShiftsService } from '../../../services/shifts/shifts.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ 
      DropdownShiftsComponent
    ],
    exports: [ 
      DropdownShiftsComponent
    ],
    providers: [ShiftsService],
  })
  export class DropdownShiftsModule { }