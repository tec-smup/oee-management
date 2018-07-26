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
import { ChannelGridButtonRenderer } from './grid/channel.grid.buttons.component';
import { MachineModalComponent } from './modal/machine.modal.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownMachineModule } from '../dropdown/machine/dropdown.machine.module';
import { ConfigModalComponent } from './modal/config.modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownStatusModule,
    AgGridModule.withComponents([ChannelGridButtonRenderer]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    DropdownYesNoModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot(),
    DropdownMachineModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    ChannelComponent,    
    NumberOnlyDirective,
    MachineModalComponent,
    ConfigModalComponent,
    ChannelGridButtonRenderer    
  ],
  exports: [ ChannelComponent ],
  providers: [ 
    ChannelService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
   ],
   entryComponents: [
    MachineModalComponent,
    ConfigModalComponent
  ],      
})
export class ChannelModule { }
