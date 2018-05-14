import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
@Component({
  selector: 'dropdown-machine',  
  templateUrl: './dropdown-machine.html',
})
export class DropdownMachineComponent implements OnInit {
  items: Array<any> = [];
  selectedMachineCode: any;
  @Output() changeEvent = new EventEmitter<string>();

  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    this.machineService.list()
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