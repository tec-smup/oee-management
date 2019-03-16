import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
 
@Component({
  selector: 'dropdown-dwmy',  
  templateUrl: './dropdown-dwmy.html'
})
export class DropdownDWMYComponent implements OnInit {
  items: Array<any> = [];
  selectedFilter: any;
  @Output() changeEvent = new EventEmitter<number>();

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
        id: 3,
        name: 'Dia atual',
      },      
      {
        id: 2,
        name: '7 dias atrás',
      },
      {
        id: 1,
        name: 'Mês atual',
      }, 
      {
        id: 0,
        name: 'Ano atual',
      },                 
    ];    
    this.selectedFilter = this.items[0].id;
  }

  public refreshValue(value:any) {
    this.selectedFilter = value.id;    
    this.changeEvent.emit(this.selectedFilter);
  }
}