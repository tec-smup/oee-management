import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgGridModule} from "ag-grid-angular/main";
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../../services/user/user.service';
import { UserComponent } from './user.component';
import { DropdownStatusModule } from '../dropdown/status/dropdown.status.module';
import { DropdownYesNoModule } from '../dropdown/YesNo/dropdown.yesno.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ResetPassButtonRenderer } from './grid/resetpass.button.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DropdownStatusModule,
    DropdownYesNoModule,
    AgGridModule.withComponents([ResetPassButtonRenderer]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AngularFontAwesomeModule
  ],
  declarations: [ 
    UserComponent,    
    ResetPassButtonRenderer
  ],
  exports: [ UserComponent ],
  providers: [ 
    UserService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' },
   ],  
})
export class UserModule { }
