import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FilterService } from '../../../services/dashboard/filter.service';
import { BaseComponent } from '../../base.component';
 
@Component({
  selector: 'app-datetime-range',  
  templateUrl: './date.range.component.html'
})
export class DateRangeComponent extends BaseComponent implements OnInit {
  dateTimeRange: Date[];

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();

      //seta data inicial no selector
      let now = new Date(Date.now());
      let channelTurn = this.getTurn();
      this.dateTimeRange = [this.setTimeOnDatetime(now, (channelTurn.initial)), this.setTimeOnDatetime(now, (channelTurn.final))];    
  }

  ngOnInit() {      
    this.filterService.setDateRangeFilter(this.dateTimeRange); 
  }

  changeDateRange(dates: any): any {
    this.filterService.setDateRangeFilter(dates.value);
  }   

}