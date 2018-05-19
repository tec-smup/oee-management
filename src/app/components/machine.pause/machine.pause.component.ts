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
  components;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";

  constructor(private machinePauseService: MachinePauseService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();                
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Máquina",
        field: "mc_cd",
      },
      {
        headerName: "Data Inicial",
        field: "date_ini",
        editable: true,
        cellEditor: "datePicker"  
      },
      {
        headerName: "Data Final",
        field: "date_fin",
        editable: true,
        cellEditor: "datePicker"
      },
      {
        headerName: "Justificativa 1",
        field: "justification1",
        editable: true
      },
      {
        headerName: "Justificativa 2",
        field: "justification2",
        editable: true
      },      
      {
        headerName: "Justificativa 3",
        field: "justification3",
        editable: true
      },      
    ];   
    this.components = { datePicker: this.getDatePicker() }; 
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.machinePauseService.list()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }); 
    params.api.sizeColumnsToFit();   
  }
  onCellValueChanged(event) {
    this.update(event.data);
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

  update(data) {
    //isso nao precisa, remover quando ativar o jwt
    let machinePause = new MachinePause();
    machinePause.id = data.id;
    machinePause.mc_cd = data.mc_cd;
    machinePause.pause_ini = data.pause_ini;
    machinePause.pause_fin = data.pause_fin;
    machinePause.justification1 = data.justification1;
    machinePause.justification2 = data.justification2;
    machinePause.justification3 = data.justification3;
    //--------

    this.machinePauseService.update(machinePause)
    .subscribe(
      result => {},
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );    
  }

  delete() {
    let selectedData = this.gridApi.getSelectedRows();  
    
    if(selectedData.length > 0) {
      selectedData.forEach(row => {
        //isso nao precisa, remover quando ativar o jwt
        let machinePause = new MachinePause();
        machinePause.id = row.id;
        //--------

        this.machinePauseService.delete(machinePause)
        .subscribe(
          result => {
            this.gridApi.updateRowData({ remove: [row] });
          },
          error => {
            this.toastr.error(error, "Oops!", { enableHTML: true });
          }
        );         
      });      
    }
  }  

  setMachine($event) {
    this.machinePause.mc_cd = $event;
  }  

  changeDateRange(dates: any): any {   
    this.machinePause.pause_ini = dates.value[0];  
    this.machinePause.pause_fin = dates.value[1];  
  }  
}
