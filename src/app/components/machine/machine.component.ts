import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachineService } from '../../services/machine/machine.service';
import { Machine } from '../../models/machine';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { MachineGridButtonRenderer } from './grid/machine.grid.buttons.component';

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
  context;
  frameworkComponents;    

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
        editable: true,
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
        headerName: "Velocidade nominal",
        field: "nominal_output",
        editable: true
      },      
      // {
      //   headerName: "Última manutenção",
      //   field: "last_maintenance",
      //   editable: true,
      //   cellEditor: "datePicker"
      // },
      // {
      //   headerName: "Próxima manutenção",
      //   field: "next_maintenance",
      //   editable: true,
      //   cellEditor: "datePicker"
      // },
      {
        headerName: "Configurações",
        cellRenderer: "machineGridButtonRenderer",
        colId: "params",
      },      
    ];   
    this.components = { datePicker: this.getDatePicker() }; 
    this.context = { componentParent: this };
    this.frameworkComponents = {
      machineGridButtonRenderer: MachineGridButtonRenderer
    };    
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if(this.getCurrentUser().admin === 1)
      this.listAll();
    else
      this.list();
   
  }

  list() {
    this.machineService.list(this.getCurrentUser().id, 0) //passa canal zero pois quero ver todas as maquinas do usuario
    .subscribe(
      result => {
        this.gridApi.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    this.gridApi.sizeColumnsToFit();
  }
  listAll() {
    this.machineService.listAll() //passa canal zero pois quero ver todas as maquinas do usuario
    .subscribe(
      result => {
        this.gridApi.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    this.gridApi.sizeColumnsToFit();    
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
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );
    this.machine = new Machine();
  }

  update(data) {
    this.machineService.update(data)
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

        this.machineService.delete(row)
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
