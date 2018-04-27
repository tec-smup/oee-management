import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GridOptions } from "ag-grid";
import { ChannelService } from '../../services/channel/channel.service';
import { Channel } from '../../models/channel';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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

  constructor(private channelService: ChannelService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Name",
        field: "name",
        editable: true  
      },
      {
        headerName: "Token",
        field: "token",
        editable: true         
      },
      {
        headerName: "Status",
        field: "status",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Ativo", "Inativo"]
        }
      },
      {
        headerName: "Created at",
        field: "created_at",
      },
      {
        headerName: "Updated at",
        field: "updated_at",
      },
      {
        headerName: "Time Shift",
        field: "time_shift",
        editable: true,
        cellEditor: "numericCellEditor"
      },
    ];    
    this.components = { numericCellEditor: this.getNumericCellEditor() };
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.channelService.list()
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
    var res = this.gridApi.updateRowData({ add: [this.channel] });
    this.channelService.add(this.channel)
    .subscribe(
      result => {},
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
    channel.status = data.status;
    channel.time_shift = data.time_shift;
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
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    
    if(res.remove.length > 0) {
      res.remove.forEach(row => {
        //isso nao precisa, remover quando ativar o jwt
        let channel = new Channel();
        channel.id = row.data.id;
        //--------

        this.channelService.delete(channel)
        .subscribe(
          result => {},
          error => {
            this.toastr.error(error, "Oops!", { enableHTML: true });
          }
        );         
      });      
    }
  }    
 }