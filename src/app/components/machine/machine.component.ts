import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachineService } from '../../services/machine/machine.service';
import { Machine } from '../../models/machine';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent extends BaseComponent implements OnInit {
  machine: Machine = new Machine();
  gridApi;
  gridColumnApi;
  columnDefs;
  components;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  currentUser;

  constructor(private machineService: MachineService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();                
    this.currentUser = this.getCurrentUser();
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Código",
        field: "code",
      },
      {
        headerName: "Nome",
        field: "name",
        editable: true         
      },
      {
        headerName: "Nome no app",
        field: "mobile_name",
        editable: true         
      },      
      {
        headerName: "Departamento",
        field: "department",
        editable: true
      },
      {
        headerName: "Produto",
        field: "product",
        editable: true
      },
      {
        headerName: "Última manutenção",
        field: "last_maintenance",
        editable: true,
        cellEditor: "datePicker"
      },
      {
        headerName: "Próxima manutenção",
        field: "next_maintenance",
        editable: true,
        cellEditor: "datePicker"
      },
    ];   
    this.components = { datePicker: this.getDatePicker() }; 
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.machineService.list(this.getCurrentUser().id, 0) //passa canal zero pois quero ver todas as maquinas do usuario
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
    this.machine.userId = this.getCurrentUser().id; //remover quando ativar definitivamente o token
    this.machineService.add(this.machine) 
    .subscribe(
      result => {
        this.gridApi.updateRowData({ add: [result] });
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );
    this.machine = new Machine();
  }

  update(data) {
    //isso nao precisa, remover quando ativar o jwt
    let machine = new Machine();
    machine.code = data.code;
    machine.name = data.name;
    machine.mobile_name = data.mobile_name;
    machine.department = data.department;
    machine.product = data.product;
    machine.last_maintenance = data.last_maintenance;
    machine.next_maintenance = data.next_maintenance;
    //--------

    this.machineService.update(machine)
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
        let machine = new Machine();
        machine.code = row.code;
        //--------

        this.machineService.delete(machine)
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
}
