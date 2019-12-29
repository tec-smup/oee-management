import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { BaseComponent } from '../../base.component';
import { MachineService } from '../../../services/machine/machine.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../services/dashboard/filter.service';

@Component({
  selector: 'app-machine-production-nominal',
  templateUrl: './machine.prod.nominal.component.html',
  styleUrls: ['./machine.prod.nominal.component.css']
})
export class MachineProductionNominalComponent extends BaseComponent implements OnInit, OnDestroy {
  private dwmy: number = undefined;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  public refreshing: boolean = false;

  private unsubscribe: Subscription[] = [];

  comparative = {
    table: [],
    sum: {}
  };
  
  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService) {
    super();
    this.listenFilters();    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(f => f.unsubscribe());
  }

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(s => this.getComparative());
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

  getComparative() {    
    //retorna enquanto não tiver os filtros completos 
    if(this.dwmy == undefined || this.channelId == undefined || this.machineCode == undefined)
      return;

    const dateRange: string[] = this.setDateByFilter(this.dwmy);
    this.refreshing = true;      

    this.machineService.getNominalComparative({
      channelId: this.channelId,
      machineCode: this.machineCode,
      dateIni: dateRange[0],
      dateFin: dateRange[1]
    })
    .subscribe(
      result => {     
        this.comparative.table = [];
        this.comparative.sum = {};  
          
        let sum = { production: 0, nominal: 0, diff: 0, eficiency: 0 };
        for(let i = 0; i < result.length; i++) {
          sum.production += result[i].production;
          sum.nominal += result[i].nominal;
          sum.diff += result[i].diff;
        }
        sum.eficiency = ((sum.production / sum.nominal) * 100);
        this.comparative.table = result;
        this.comparative.sum = sum;
        this.refreshing = false;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }   
}
