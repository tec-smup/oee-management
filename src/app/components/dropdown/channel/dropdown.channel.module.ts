import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DropdownChannelComponent } from './dropdown.channel.component'

@NgModule({
    imports: [BsDropdownModule.forRoot()],
    declarations: [ DropdownChannelComponent ],
    exports: [ DropdownChannelComponent ]
  })
  export class DropdownChannelModule { }