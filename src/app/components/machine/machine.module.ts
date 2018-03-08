import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineComponent } from './machine.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ 
    MachineComponent
  ],
  exports: [ MachineComponent ]
})
export class MachineModule { }
