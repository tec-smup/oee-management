import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgGridModule} from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { ChannelService } from '../../services/channel/channel.service';
import { ChannelComponent } from './channel.component';
import { DropdownStatusModule } from '../dropdown/status/dropdown.status.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { NumberOnlyDirective } from '../../directives/number.directive';
import { DropdownYesNoModule } from '../dropdown/YesNo/dropdown.yesno.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownStatusModule,
    AgGridModule.withComponents([]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    DropdownYesNoModule
  ],
  declarations: [ 
    ChannelComponent,    
    NumberOnlyDirective
  ],
  exports: [ ChannelComponent ],
  providers: [ 
    ChannelService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
   ],  
})
export class ChannelModule { }
