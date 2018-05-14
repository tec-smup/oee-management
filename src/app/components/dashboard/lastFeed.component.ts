import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lastfeed',
  templateUrl: './lastFeed.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class LastFeedComponent extends BaseComponent implements OnInit {
  lastFeed: Array<Dashboard["lastFeed"]> = [];
  
  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);      
  }

  ngOnInit() {
    this.getLastFeed();  
  }

  getLastFeed() {
    let date = this.getCurrentDate();
    this.dashboardService.lastFeed(date)
    .subscribe(
      result => {
        this.lastFeed = result;
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });  
  }  
}
