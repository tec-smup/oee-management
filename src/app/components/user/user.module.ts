import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgGridModule} from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../../services/user/user.service';
import { UserComponent } from './user.component';
import { DropdownStatusModule } from '../dropdown/status/dropdown.status.module';
import { DropdownYesNoModule } from '../dropdown/YesNo/dropdown.yesno.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { UserChannelButtonRenderer } from './grid/user.grid.buttons.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserChannelModalComponent } from './modal/userchannel.modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChannelService } from '../../services/channel/channel.service';
import { DropdownChannelModule } from '../dropdown/channel/dropdown.channel.module';
import { ChangePassModalComponent } from './modal/changepass.modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownStatusModule,
    DropdownYesNoModule,
    AgGridModule.withComponents([UserChannelButtonRenderer]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot(),
    DropdownChannelModule,
  ],
  declarations: [ 
    UserComponent,    
    UserChannelModalComponent,
    ChangePassModalComponent,
    UserChannelButtonRenderer,    
  ],
  exports: [ UserComponent ],
  providers: [      
    UserService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
    ChannelService,
   ],
   entryComponents: [
    UserChannelModalComponent,
    ChangePassModalComponent
  ],     
})
export class UserModule { }
