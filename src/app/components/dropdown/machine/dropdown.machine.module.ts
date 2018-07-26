import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownMachineComponent } from './dropdown.machine.component';
import { MachineService } from '../../../services/machine/machine.service';
import { DropdownMachineNoCascadeComponent } from './dropdown.machine.no.cascade.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ 
      DropdownMachineComponent,
      DropdownMachineNoCascadeComponent
    ],
    exports: [ 
      DropdownMachineComponent,
      DropdownMachineNoCascadeComponent
    ],
    providers: [MachineService],
  })
  export class DropdownMachineModule { }