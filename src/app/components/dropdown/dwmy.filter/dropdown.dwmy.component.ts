import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FilterService } from '../../../services/dashboard/filter.service';
 
@Component({
  selector: 'dropdown-dwmy',  
  templateUrl: './dropdown-dwmy.html'
})
export class DropdownDWMYComponent implements OnInit {
  items: Array<any> = [
    {
      id: 4,
      name: 'Dia anterior',
    },      
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
  selectedFilter: number;

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    this.toastr.setRootViewContainerRef(vcr);            
    
    //sempre vai selecionar inicialmente o valor Dia atual
    this.selectedFilter = this.items[1].id;    
  }

  ngOnInit() {       
    this.filterService.setDWMyFilter(this.selectedFilter);
  }

  public refreshValue(value:any) {
    this.selectedFilter = value.id;    
    this.filterService.setDWMyFilter(value.id);
  }
}