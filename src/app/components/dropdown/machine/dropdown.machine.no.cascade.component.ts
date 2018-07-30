import { 
  Component, 
  ViewContainerRef, 
  OnInit, 
  Output, 
  EventEmitter, 
} from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
 
@Component({
  selector: 'dropdown-machine-no-cascade',  
  templateUrl: './dropdown-machine.html',
})
export class DropdownMachineNoCascadeComponent extends BaseComponent implements OnInit {
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
    this.machineService.listAll()
    .subscribe(
      result => {
        this.items = result;
        if(this.items.length > 0) {
          this.selectedMachineCode = this.items[0].code;
          this.refreshValue(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true });
      });     
  }

  public refreshValue(value:any) {
    this.selectedMachineCode = value.code;    
    this.changeEvent.emit(this.selectedMachineCode);
  }    
}