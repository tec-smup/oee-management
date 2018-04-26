import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {AgGridModule} from "ag-grid-angular/main";
import { SharedModule } from '../shared/shared.module';
import { ChannelService } from '../../services/channel/channel.service';
import { ChannelComponent } from './channel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([])     
  ],
  declarations: [ 
    ChannelComponent,    
  ],
  exports: [ ChannelComponent ],
  providers: [ ChannelService ],  
})
export class ChannelModule { }
