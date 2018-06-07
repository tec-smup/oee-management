import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
@Component({
  selector: 'dropdown-status',  
  templateUrl: './dropdown-status.html'
})
export class DropdownStatusComponent implements OnInit {
  items: Array<any> = [];
  selectedStatus: any;
  @Output() statusEvent = new EventEmitter<number>();

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    this.items = [
      {
        id: 1,
        name: 'Ativo',
      },
      {
        id: 0,
        name: 'Inativo',
      },      
    ];    
    this.selectedStatus = this.items[0].id;
  }

  public refreshValue(value:any) {
    this.selectedStatus = value.id;    
    this.statusEvent.emit(this.selectedStatus);
  }  
}