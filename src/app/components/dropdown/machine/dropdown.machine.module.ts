import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownMachineComponent } from './dropdown.machine.component';
import { MachineService } from '../../../services/machine/machine.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownMachineComponent ],
    exports: [ DropdownMachineComponent ],
    providers: [MachineService],
  })
  export class DropdownMachineModule { }