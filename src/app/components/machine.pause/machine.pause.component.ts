import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachinePauseService } from '../../services/machine.pause/machine.pause.service';
import { MachinePause } from '../../models/machine.pause';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { MachinePauseList } from '../../models/machine.pause.list';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-machine-pause',
  templateUrl: './machine.pause.component.html',
  styleUrls: ['./machine.pause.component.css']
})
export class MachinePauseComponent extends BaseComponent implements OnInit, OnDestroy {
  machinePause: MachinePause = new MachinePause();
  gridApi;
  gridColumnApi;
  columnDefs;
  rowSelection = "multiple";
  editType = "fullRow";
  getRowHeight;
  date: any;
  pauses: MachinePauseList["pauses"] = [];
  intervalLoad: any;
  intervalTimer: any;
  timer: number = 300000;
  timerStr: string = "00:00:00";

  constructor(private machinePauseService: MachinePauseService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();        
    this.date = new Date(Date.now());             
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Máquina",
        field: "mc_name",
        width: 100
      },
      {
        headerName: "Pausa",
        field: "pause_to_time", 
        width: 50
      },
      {
        headerName: "Justificativa",
        field: "justification",
        editable: true,
        cellStyle: { "white-space": "normal" }
      },
      {
        headerName: "Data registro",
        field: "date",
        width: 70
      },      
    ];  
    this.getRowHeight = function(params) {
      return params.data.justification != null ? 
        18 * (Math.floor(params.data.justification.length / 45) + 1) : 30;
    };     
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
    clearInterval(this.intervalLoad);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    clearInterval(this.intervalLoad);
    this.intervalLoad = setInterval(
      () => {
        this.loadDataGrid(this.getCurrentDate());
      }, this.timer);  
      this.loadDataGrid(this.getCurrentDate());
  }

  loadDataGrid(date) {    
    this.machinePauseService.list(date, this.getCurrentUser().id)
    .subscribe(
      result => {
        this.gridApi.setRowData(result.list);
        this.pauses = result.pauses;
        this.startIntervalTimer();
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );    
    this.gridApi.sizeColumnsToFit();
  }

  onCellValueChanged(event) {
    this.update(event.data);
  } 

  update(data) {
    let pause = new MachinePause();
    pause.id = 0;
    pause.mc_cd = data.mc_cd;
    pause.date_ref = data.date_ref;
    pause.pause = data.pause;
    pause.justification = data.justification;

    this.machinePauseService.add(pause)
    .subscribe(
      result => {
        this.changeDateRange(pause.date_ref);
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );    
  }

  changeDateRange(dateSelected: any): any { 
    clearInterval(this.intervalLoad);
    this.intervalLoad = setInterval(
      () => {
        this.loadDataGrid(this.formatDate(this.date));
      }, this.timer);
      this.loadDataGrid(this.formatDate(this.date));
  }  

  startIntervalTimer() {
    let sec = 300;
    this.timerStr = this.secToTime(sec);
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }  
}
