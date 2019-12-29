import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AgGridModule} from "ag-grid-angular";
import { SharedModule } from '../shared/shared.module';
import { SponsorService } from '../../services/sponsor/sponsor.service';
import { SponsorComponent } from './sponsor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AgGridModule,
  ],
  declarations: [
    SponsorComponent
  ],
  exports: [ SponsorComponent ],
  providers: [     
    SponsorService 
  ],
   entryComponents: [
  ],     
})
export class SponsorModule { }
