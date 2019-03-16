import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownDWMYComponent } from './dropdown.dwmy.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownDWMYComponent ],
    exports: [ DropdownDWMYComponent ],
  })
  export class DropdownDWMYModule { }