import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import { MachineService } from '../../services/machine/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  private gridOptions: GridOptions;

  constructor(private machineService: MachineService) {     
    this.gridOptions = <GridOptions>{};      
    this.gridOptions.columnDefs = [
      {
          headerName: "Code",
          field: "code",
      },
      {
          headerName: "Name",
          field: "name",
      },
      {
        headerName: "Department",
        field: "department",
      },
      {
        headerName: "Product",
        field: "product",
      },
    ];
    this.list(); 
    console.log("this.gridOptions.rowData");       
    //this.gridOptions.rowData =[{"code":"asas","name":"asasaas","department":"asas","product":"asas","last_maintenance":null,"next_maintenance":null},{"code":"asdas","name":"dasdasd","department":"asdasd","product":"asdasd","last_maintenance":null,"next_maintenance":null},{"code":"MAQ1","name":"Máquina 1","department":"Departamento","product":"Produto","last_maintenance":"18/12/2017","next_maintenance":"18/12/2017"},{"code":"MAQ2","name":"Máquina 2","department":"Departamento","product":"Produto","last_maintenance":null,"next_maintenance":null},{"code":"MAQ3","name":"Máquina 3","department":"","product":"","last_maintenance":null,"next_maintenance":null},{"code":"MAQ4","name":"Maquina 4","department":"Departamento","product":"Produto","last_maintenance":"27/12/2017","next_maintenance":"03/01/2018"},{"code":"MAQ5","name":"Máquina 5","department":"Departamento","product":"Produto","last_maintenance":"06/03/2018","next_maintenance":null},{"code":"zzzzz","name":"zzzzzz","department":"","product":"","last_maintenance":null,"next_maintenance":null}];
  }

  ngOnInit() {   
  }

  list() {
    this.machineService.list()
    .subscribe(result => { 
      console.log(JSON.stringify(result));
      this.gridOptions.rowData = result;
    });    
  }
}
