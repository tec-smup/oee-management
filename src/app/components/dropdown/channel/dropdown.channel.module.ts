import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DropdownChannelComponent } from './dropdown.channel.component';
import { ChannelService } from '../../../services/channel/channel.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgSelectModule
    ],
    declarations: [ DropdownChannelComponent ],
    exports: [ DropdownChannelComponent ],
    providers: [ChannelService],
  })
  export class DropdownChannelModule { }