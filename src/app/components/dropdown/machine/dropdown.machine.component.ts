import { 
  Component, 
  ViewContainerRef, 
  OnInit, 
  Output, 
  EventEmitter, 
  Input, 
  OnChanges, 
  SimpleChange  } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
 
@Component({
  selector: 'dropdown-machine',  
  templateUrl: './dropdown-machine.html',
})
export class DropdownMachineComponent extends BaseComponent implements OnInit {
  items: Array<any> = [];
  selectedMachineCode: any;
  @Input() channelId: number;
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
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let id = changes.channelId && changes.channelId.currentValue != null ? changes.channelId.currentValue : null;
    if(id) {
      this.load(id);
    }
  }

  load(channelId: number) {
    this.machineService.list(this.getCurrentUser().id, channelId)
    .subscribe(
      result => {
        this.items = result;
        if(this.items.length > 0) {
          this.selectedMachineCode = this.items[0].code;
          this.refreshValue(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }

  public refreshValue(value:any) {
    this.selectedMachineCode = value.code;    
    this.changeEvent.emit(this.selectedMachineCode);
  }    
}