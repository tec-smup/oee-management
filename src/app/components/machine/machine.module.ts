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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([MachineGridButtonRenderer]),
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    MachineComponent,    
    MachineGridButtonRenderer,
    SQLModalComponent
  ],
  exports: [ MachineComponent ],
  providers: [ MachineService ],
  entryComponents: [
    MachineModalComponent,
    SQLModalComponent
  ],  
})
export class MachineModule { }
