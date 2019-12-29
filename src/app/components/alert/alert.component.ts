import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { Alert } from '../../models/alert';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends BaseComponent implements OnInit {
  alert: Alert = new Alert();
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context; 
  channelId: number;

  constructor(private alertService: AlertService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.channelId = parseInt(localStorage.getItem('channelId'));
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Responsável",
        field: "sponsor_name",
        editable: false,
      },   
      {
        headerName: "Motivo da pausa",
        field: "pause_reason_name",
        editable: false,
      },
      {
        headerName: "Tempo da pausa",
        field: "pause_time",
        editable: false,
      }                       
    ];    
    this.context = { componentParent: this };
    
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.alertService.list()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    params.api.sizeColumnsToFit();   
  }
  onCellValueChanged(event) {
    this.update(event.data);
  } 

  setPauseReason($event) {
    this.alert.pause_reason_id = $event.id;
  }  
  setSponsor($event) {
    this.alert.sponsor_id = $event.sponsor_id;
  }    
  setAlertPauseTime($event) {
    this.alert.pause_time = $event;
  }

  add(event) {
    event.preventDefault();
    
    this.alertService.add(this.alert)
    .subscribe(
      result => {
        const alert: Alert = {...result};
        this.gridApi.updateRowData({ add: [alert] });
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );        
  }

  update(data: Alert) {
    this.alertService.update(data)
    .subscribe(
      result => {},
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();  
    
    if(selectedData.length > 0) {
      selectedData.forEach(row => {
        this.alertService.delete(row)
        .subscribe(
          result => {
            this.gridApi.updateRowData({ remove: [row] });
          },
          error => {
            this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
          }
        );         
      });      
    }
  }

}
