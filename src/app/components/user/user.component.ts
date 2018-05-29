import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GridOptions } from "ag-grid";
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from '../base.component';

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
        headerName: "Criado em",
        field: "created_at",
      },            
    ];    
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
    //this.update(event.data);
  } 

  setStatus($event) {
    this.user.active = $event;
  }
  setAdmin($event) {
    this.user.admin = $event;
  }

  // add(event) {
  //   event.preventDefault(); 
  //   this.channel.initial_turn = this.getTime(this.channel.initial_turn);    
  //   this.channel.final_turn = this.getTime(this.channel.final_turn);

  //   this.channelService.add(this.channel)
  //   .subscribe(
  //     result => {
  //       this.gridApi.updateRowData({ add: [result] });
  //     },
  //     error => {
  //       this.toastr.error(error, "Oops!", { enableHTML: true });
  //     }
  //   );    
  //   this.channel = new Channel();
  // }

  // update(data) {
  //   //isso nao precisa, remover quando ativar o jwt
  //   let channel = new Channel();
  //   channel.id = data.id;
  //   channel.name = data.name;
  //   channel.description = data.description;
  //   channel.token = data.token;
  //   channel.active = (isNaN(data.active) ? (data.active == 'Ativo' ? 1 : 0) : parseInt(data.active));
  //   channel.time_shift = data.time_shift;
  //   //--------

  //   this.channelService.update(channel)
  //   .subscribe(
  //     result => {},
  //     error => {
  //       this.toastr.error(error, "Oops!", { enableHTML: true });
  //     }
  //   );    
  // }

  // delete() {
  //   let selectedData = this.gridApi.getSelectedRows();  
    
  //   if(selectedData.length > 0) {
  //     selectedData.forEach(row => {
  //       //isso nao precisa, remover quando ativar o jwt
  //       let channel = new Channel();
  //       channel.id = row.id;
  //       //--------

  //       this.channelService.delete(channel)
  //       .subscribe(
  //         result => {
  //           this.gridApi.updateRowData({ remove: [row] });
  //         },
  //         error => {
  //           this.toastr.error(error, "Oops!", { enableHTML: true });
  //         }
  //       );         
  //     });      
  //   }
  // }

}
