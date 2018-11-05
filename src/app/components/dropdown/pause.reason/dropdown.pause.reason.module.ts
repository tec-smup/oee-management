import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PauseReasonService } from '../../../services/pause.reason/pause.reason.service';
import { DropdownPauseReasonComponent } from './dropdown.pause.reason.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ 
      DropdownPauseReasonComponent
    ],
    exports: [ 
      DropdownPauseReasonComponent
    ],
    providers: [PauseReasonService],
  })
  export class DropdownPauseReasonModule { }