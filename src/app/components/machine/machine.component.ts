import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachineService } from '../../services/machine/machine.service';
import { Machine } from '../../models/machine';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  public machine: Machine = new Machine();
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public editType;
  public getRowNodeId;
  public paginationPageSize = 10;

  constructor(private machineService: MachineService) {     
    this.columnDefs = [
      {
          headerName: "Code",
          field: "code",
      },
      {
          headerName: "Name",
          field: "name",
          editable: true
      },
      {
        headerName: "Department",
        field: "department",
        editable: true
      },
      {
        headerName: "Product",
        field: "product",
        editable: true
      },
      {
        headerName: "Last Maintenance",
        field: "last_maintenance",
        editable: true
      },
      {
        headerName: "Next Maintenance",
        field: "next_maintenance",
        editable: true
      },
    ];
    this.editType = "fullRow";
    this.getRowNodeId = function(data) {
      return data.id;
    };    
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.machineService.list()
    .subscribe(result => {
      params.api.setRowData(result);
    }); 
    params.api.sizeColumnsToFit();   
  } 

  adicionar(event) {
    event.preventDefault();
    var res = this.gridApi.updateRowData({ add: [this.machine] });
    this.machine = new Machine();
  }  
}
