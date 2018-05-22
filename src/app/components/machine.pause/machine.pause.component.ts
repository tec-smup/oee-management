import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachinePauseService } from '../../services/machine.pause/machine.pause.service';
import { MachinePause } from '../../models/machine.pause';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-machine-pause',
  templateUrl: './machine.pause.component.html',
  styleUrls: ['./machine.pause.component.css']
})
export class MachinePauseComponent extends BaseComponent implements OnInit {
  machinePause: MachinePause = new MachinePause();
  gridApi;
  gridColumnApi;
  columnDefs;
  rowSelection = "multiple";
  editType = "fullRow";
  getRowHeight;
  date: any;

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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();   
  }

  add(event) {
    event.preventDefault();    
    this.machinePauseService.add(this.machinePause)
    .subscribe(
      result => {
        this.gridApi.updateRowData({ add: [result] });
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );
    this.machinePause = new MachinePause();
  }  

  setMachine($event) {
    this.machinePause.mc_cd = $event;
  }  

  changeDateRange(date: any): any {    
    this.date = date.value; 

    this.machinePauseService.list(this.date)
    .subscribe(
      result => {
        this.gridApi.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });     
  }  
}
