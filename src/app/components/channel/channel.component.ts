import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GridOptions } from "ag-grid";
import { ChannelService } from '../../services/channel/channel.service';
import { Channel } from '../../models/channel';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent extends BaseComponent implements OnInit {
  channel: Channel = new Channel();
  gridApi;
  gridColumnApi;
  columnDefs;
  components;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  statusMappings = {
    0: "Inativo",
    1: "Ativo"
  };  
  YesNoMappings = {
    1: "Sim",
    0: "Não",
  };
  currentUser;
  
  constructor(private channelService: ChannelService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.currentUser = this.getCurrentUser();
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Nome",
        field: "name",
        editable: true  
      },
      {
        headerName: "Descrição",
        field: "description",
        editable: true  
      },      
      {
        headerName: "Token",
        field: "token"        
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
        headerName: "Resetar turno?",
        field: "reset_time_shift",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: { values: this.extractValues(this.YesNoMappings) },
        refData: this.YesNoMappings
      },
      {
        headerName: "Tempo de turno",
        field: "time_shift",
        editable: true,
        cellEditor: "numericCellEditor"
      },
      {
        headerName: "Início do turno",
        field: "initial_turn",
        editable: true
      },
      {
        headerName: "Final do turno",
        field: "final_turn",
        editable: true
      },            
      {
        headerName: "Criado em",
        field: "created_at",
      },
      {
        headerName: "Atualizado em",
        field: "updated_at",
      },            
    ];    
    this.components = { numericCellEditor: this.getNumericCellEditor() };
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.channelService.listAll()
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
    this.channel.active = $event;
  }

  setResetTimeShift($event) {
    this.channel.reset_time_shift = $event;
  }  

  add(event) {
    event.preventDefault(); 
    this.channel.initial_turn = this.getTime(this.channel.initial_turn);    
    this.channel.final_turn = this.getTime(this.channel.final_turn);
    this.channel.userId = this.getCurrentUser().id;

    this.channelService.add(this.channel)
    .subscribe(
      result => {
        this.gridApi.updateRowData({ add: [result] });
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );    
    this.channel = new Channel();
  }

  update(data) {
    //isso nao precisa, remover quando ativar o jwt
    let channel = new Channel();
    channel.id = data.id;
    channel.name = data.name;
    channel.description = data.description;
    channel.token = data.token;
    channel.active = (isNaN(data.active) ? (data.active == 'Ativo' ? 1 : 0) : parseInt(data.active));
    channel.time_shift = data.time_shift;
    channel.reset_time_shift = (isNaN(data.reset_time_shift) ? (data.reset_time_shift == 'Sim' ? 1 : 0) : parseInt(data.reset_time_shift));
    //--------

    this.channelService.update(channel)
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
        let channel = new Channel();
        channel.id = row.id;
        //--------

        this.channelService.delete(channel)
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