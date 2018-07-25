import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { UserChannelButtonRenderer } from './grid/user.grid.buttons.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  user: User = new User();
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context;
  frameworkComponents;
  statusMappings = {
    1: "Ativo",
    0: "Inativo",
  };
  YesNoMappings = {
    1: "Sim",
    0: "Não",
  };    

  constructor(private userService: UserService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Usuário",
        field: "username",
      },
      {
        headerName: "Status",
        field: "active",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.statusMappings) },
        refData: this.statusMappings
      },
      {
        headerName: "Administrador",
        field: "admin",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.YesNoMappings) },
        refData: this.YesNoMappings
      }, 
      {
        headerName: "Empresa",
        field: "company_name",
        editable: true,
      },   
      {
        headerName: "Telefone",
        field: "phone",
        editable: true,
      },            
      {
        headerName: "Criado em",
        field: "created_at",
      },          
      {
        headerName: "Configurações",
        cellRenderer: "userChannelButtonRenderer",
        colId: "params",
      },                   
    ];    
    this.context = { componentParent: this };
    this.frameworkComponents = {
      userChannelButtonRenderer: UserChannelButtonRenderer
    };    
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.userService.list()
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

  setStatus($event) {
    this.user.active = $event;
  }
  setAdmin($event) {
    this.user.admin = $event;
  }

  add(event) {
    event.preventDefault();
    this.userService.add(this.user)
    .subscribe(
      result => {
        this.gridApi.updateRowData({ add: [result] });
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );    
    this.user = new User();
  }

  update(data) {
    //isso nao precisa, remover quando ativar o jwt
    let user = new User();
    user.id = data.id;
    user.company_name = data.company_name;
    user.phone = data.phone;
    user.active = (isNaN(data.active) ? (data.active == 'Ativo' ? 1 : 0) : parseInt(data.active));
    user.admin = (isNaN(data.admin) ? (data.admin == 'Sim' ? 1 : 0) : parseInt(data.admin));
    //--------

    this.userService.update(user)
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
        let user = new User();
        user.id = row.id;
        //--------

        this.userService.delete(user)
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

  // methodFromParent(cell) {
  //   alert("Parent Component Method from " + cell + "!");
  // }

}
