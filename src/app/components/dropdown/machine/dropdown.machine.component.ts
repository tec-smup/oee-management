import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from '../../base.component';
 
@Component({
  selector: 'dropdown-machine',  
  templateUrl: './dropdown-machine.html',
})
export class DropdownMachineComponent extends BaseComponent implements OnInit {
  items: Array<any> = [];
  selectedMachineCode: any;
  @Output() changeEvent = new EventEmitter<string>();

  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    this.machineService.list(this.getCurrentUser().id)
    .subscribe(
      result => {
        this.items = result;
        this.selectedMachineCode = this.items[0].code;
        this.refreshValue(this.items[0]);
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });     
  }

  public refreshValue(value:any) {
    this.selectedMachineCode = value.code;    
    this.changeEvent.emit(this.selectedMachineCode);
  }    
}