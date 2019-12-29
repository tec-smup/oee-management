import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DateRangeComponent } from './date.range.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule

    ],
    declarations: [ DateRangeComponent ],
    exports: [ DateRangeComponent ],
    providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: 'pr-br' }]
  })
  export class DateRangeModule { }