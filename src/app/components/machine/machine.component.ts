import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachineService } from '../../services/machine/machine.service';
import { Machine } from '../../models/machine';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  machine: Machine = new Machine();
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";

  constructor(private machineService: MachineService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);     
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
  }

  ngOnInit() {
  }

  private onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.machineService.list()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error("Parece que houve um erro de comunicação, tente daqui a pouco.", "Oops!");
      }); 
    params.api.sizeColumnsToFit();   
  }
  onCellValueChanged(event) {
    //isso nao precisa, remover quando ativar o jwt
    let machine = new Machine();
    machine.code = event.data.code;
    machine.name = event.data.name;
    machine.department = event.data.department;
    machine.product = event.data.product;
    machine.last_maintenance = event.data.last_maintenance;
    machine.next_maintenance = event.data.next_maintenance;

    this.machineService.update(machine)
    .subscribe(
      result => {},
      error => {
        let message = error.status + " - " + error.statusText + error._body;
        this.toastr.error(message, "Oops!");
      }
    );
  } 

  add(event) {
    event.preventDefault();
    var res = this.gridApi.updateRowData({ add: [this.machine] });
    this.machineService.add(this.machine)
    .subscribe(
      result => {},
      error => {
        let message = error.status + " - " + error.statusText + error._body;
        this.toastr.error(message, "Oops!");
      }      
    );
    this.machine = new Machine();
  }

  remove() {
    var selectedData = this.gridApi.getSelectedRows();
    console.log(selectedData);
    // var res = this.gridApi.updateRowData({ remove: selectedData });
    // printResult(res);
  }  
}
