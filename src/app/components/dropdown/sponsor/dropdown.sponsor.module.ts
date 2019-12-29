import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownSponsorComponent } from './dropdown.sponsor.component';
import { SponsorService } from '../../../services/sponsor/sponsor.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ 
      DropdownSponsorComponent
    ],
    exports: [ 
      DropdownSponsorComponent
    ],
    providers: [SponsorService],
  })
  export class DropdownSponsorModule { }