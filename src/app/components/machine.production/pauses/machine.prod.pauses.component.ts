import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { BaseComponent } from '../../base.component';
import { MachinePauseService } from '../../../services/machine.pause/machine.pause.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../services/dashboard/filter.service';

@Component({
  selector: 'app-machine-production-pauses',
  templateUrl: './machine.prod.pauses.component.html',
  styleUrls: ['./machine.prod.pauses.component.css']
})
export class MachineProductionPausesComponent extends BaseComponent implements OnInit, OnDestroy {
  private dwmy: number = undefined;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  public refreshing: boolean = false;

  private unsubscribe: Subscription[] = [];

  pauses = {
    table: [],
    sum: {}
  }; 
  
  constructor(
    private machinePauseService: MachinePauseService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService) {
      super();
      this.toastr.setRootViewContainerRef(vcr);
      this.listenFilters();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(f => f.unsubscribe());
  }

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(s => this.getPauses());
		const subsDWMY = this.filterService.onDWMYUpdate$.subscribe(dwmy => {      
			this.dwmy = dwmy;
    });
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channelId => {
			this.channelId = channelId;
    });  
		const subsMachine = this.filterService.onMachineUpdate$.subscribe(machineCode => {
			this.machineCode = machineCode;
		});            
		this.unsubscribe.push(subsCountdown);    
		this.unsubscribe.push(subsDWMY);    
		this.unsubscribe.push(subsChannel);    
		this.unsubscribe.push(subsMachine);    
  }      

  getPauses() {    
    //retorna enquanto não tiver os filtros completos 
    if(this.dwmy == undefined || this.channelId == undefined || this.machineCode == undefined)
      return;

    const dateRange: string[] = this.setDateByFilter(this.dwmy);
    this.refreshing = true;   

    this.machinePauseService.list(dateRange[0], dateRange[1], this.channelId, this.machineCode)
    .subscribe(
      result => {     
        this.pauses.table = [];
        this.pauses.sum = {};    

        this.pauses.table = result.pauses;
        this.pauses.sum = result.pause_grouped;
        this.refreshing = false;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }  
}
