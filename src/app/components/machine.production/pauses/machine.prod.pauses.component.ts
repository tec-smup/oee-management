import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { BaseComponent } from '../../base.component';
import { MachinePauseService } from '../../../services/machine.pause/machine.pause.service';

@Component({
  selector: 'app-machine-production-pauses',
  templateUrl: './machine.prod.pauses.component.html',
  styleUrls: ['./machine.prod.pauses.component.css']
})
export class MachineProductionPausesComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;
  @Input() dateRangeError: boolean;

  pauses = {
    table: [],
    sum: {}
  };  

  public refreshing: boolean = false;
  
  constructor(
    private machinePauseService: MachinePauseService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {
      super();
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.dateRange && this.channelId && this.machineCode) {
      if(!this.dateRangeError)  {
        this.refreshing = true;
        this.getPauses();
      }
    }
  }   

  getPauses() {    
    let dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    let dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);
    this.machinePauseService.list(dateIni, dateFin, this.channelId, this.machineCode)
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
