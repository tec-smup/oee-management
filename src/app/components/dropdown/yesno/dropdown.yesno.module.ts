import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownYesNoComponent } from './dropdown.yesno.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownYesNoComponent ],
    exports: [ DropdownYesNoComponent ],
  })
  export class DropdownYesNoModule { }