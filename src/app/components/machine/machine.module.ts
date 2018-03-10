import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MachineComponent } from './machine.component';
import { SharedModule } from '../shared/shared.module';
import {AgGridModule} from "ag-grid-angular/main";
import { MachineService } from '../../services/machine/machine.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([])    
  ],
  declarations: [ 
    MachineComponent,    
  ],
  exports: [ MachineComponent ],
  providers: [ MachineService ]
})
export class MachineModule { }
