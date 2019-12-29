import { 
  Component, 
  ViewContainerRef, 
  OnInit, 
  OnDestroy
} from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
import { FilterService } from '../../../services/dashboard/filter.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'dropdown-machine',  
  templateUrl: './dropdown-machine.html',
})
export class DropdownMachineComponent extends BaseComponent implements OnInit, OnDestroy {
  items: Array<any> = [];
  selectedMachineCode: any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {      
    const subs = this.filterService.onChannelUpdate$.subscribe(channelId => this.load(channelId));   
    this.unsubscribe.push(subs); 
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(f => f.unsubscribe());
  }

  private load(channelId: number) {
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
    this.filterService.setMachineFilter(value.code);
  }    
}