import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
@Component({
  selector: 'dropdown-yesno',  
  templateUrl: './dropdown-yesno.html',
})
export class DropdownYesNoComponent implements OnInit {
  items: Array<any> = [];
  selectedYesNo: any;
  @Output() yesnoEvent = new EventEmitter<number>();

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
        name: 'Sim',
      },
      {
        id: 0,
        name: 'Não',
      },      
    ];    
    this.selectedYesNo = this.items[1].id;
  }

  public refreshValue(value: any) {
    this.selectedYesNo = value.id;    
    this.yesnoEvent.emit(this.selectedYesNo);
  }
}