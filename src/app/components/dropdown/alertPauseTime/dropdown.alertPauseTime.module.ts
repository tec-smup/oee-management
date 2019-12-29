import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownAlertPauseTimeComponent } from './dropdown.alertPauseTime.component';
import { EnumToArrayPipe } from '../../../pipes/enumToArray.pipe';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule      
    ],
    declarations: [ 
      EnumToArrayPipe,
      DropdownAlertPauseTimeComponent,
    ],
    exports: [ 
      DropdownAlertPauseTimeComponent
    ],
    providers: [],
  })
  export class DropdownAlertPauseTimeModule { }