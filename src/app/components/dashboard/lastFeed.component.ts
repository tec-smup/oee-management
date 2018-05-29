import { Component, OnInit, ViewContainerRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lastfeed',
  templateUrl: './lastFeed.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class LastFeedComponent extends BaseComponent implements OnInit, OnDestroy {
  lastFeed: Array<Dashboard["lastFeed"]> = [];
  pauses: Dashboard["pauses"] = [];
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 25;
  @Output() refreshDash = new EventEmitter<boolean>();
  intervalTimer: any;
  timerStr: string = "00:00:00";
  
  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);      
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    this.dashboardService.lastFeed(this.getCurrentDate())
    .subscribe(
      result => {
        this.lastFeed = result.lastFeeds;
        this.pauses = result.pauses;
        
        if(this.lastFeed.length > 0) {
          this.setColumnDefs();
          this.gridApi.setRowData(this.lastFeed);        
          this.gridApi.sizeColumnsToFit();              
        }     
        this.startIntervalTimer();
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });        
  }

  setColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Canal",
        field: "channel_name",
      },
      {
        headerName: "Maquina",
        field: "machine_name",
      },      
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field1_desc : "",
        field: "field1",
      },  
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field2_desc : "",
        field: "field2",
      },              
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field3_desc : "",
        field: "field3",
      },             
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field4_desc : "",
        field: "field4",
      },       
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field5_desc : "",
        field: "field5",
      },   
      {
        headerName: "Inserido em",
        field: "inserted_at",
      },           
    ];    
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  refreshNow() {
    this.refreshDash.emit(true);
    this.startIntervalTimer();
    this.gridApi.showLoadingOverlay();
    this.dashboardService.lastFeed(this.getCurrentDate())
    .subscribe(
      result => {
        this.lastFeed = result.lastFeeds;
        this.pauses = result.pauses;

        if(this.lastFeed.length > 0) {
          this.setColumnDefs();
          this.gridApi.setRowData(this.lastFeed);        
          this.gridApi.sizeColumnsToFit();          
        }
        this.gridApi.hideOverlay();
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });    
  }  

  startIntervalTimer() {
    let sec = 300;
    this.timerStr = this.secToTime(sec);
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;
        if(sec == 0) {
          this.refreshNow();
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }   
}
