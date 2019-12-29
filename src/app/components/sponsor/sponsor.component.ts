import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { Sponsor } from '../../models/sponsor';
import { SponsorService } from '../../services/sponsor/sponsor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent extends BaseComponent implements OnInit {
  sponsor: Sponsor = new Sponsor();
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 10;
  rowSelection = "multiple";
  editType = "fullRow";
  context; 

  constructor(private sponsorService: SponsorService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.toastr.setRootViewContainerRef(vcr);     
    this.columnDefs = [
      {
        headerName: "Nome",
        field: "sponsor_name",
        editable: true,
      },   
      {
        headerName: "Email",
        field: "email",
        editable: true,
      }                 
    ];    
    this.context = { componentParent: this };
    
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sponsorService.list()
    .subscribe(
      result => {
        params.api.setRowData(result);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }); 
    params.api.sizeColumnsToFit();   
  }
  onCellValueChanged(event) {
    this.update(event.data);
  } 

  add(event) {
    event.preventDefault();
    
    this.sponsorService.add(this.sponsor)
    .subscribe(
      result => {
        const sponsor: Sponsor = {...result};
        this.gridApi.updateRowData({ add: [sponsor] });
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );    
    this.sponsor = new Sponsor();
  }

  update(data) {
    this.sponsorService.update(data)
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
        this.sponsorService.delete(row)
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
