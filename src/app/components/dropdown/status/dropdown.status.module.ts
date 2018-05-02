import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownStatusComponent } from './dropdown.status.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownStatusComponent ],
    exports: [ DropdownStatusComponent ],
  })
  export class DropdownStatusModule { }