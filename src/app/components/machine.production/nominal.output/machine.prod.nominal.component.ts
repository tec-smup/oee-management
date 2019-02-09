import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { BaseComponent } from '../../base.component';
import { MachineService } from '../../../services/machine/machine.service';

@Component({
  selector: 'app-machine-production-nominal',
  templateUrl: './machine.prod.nominal.component.html',
  styleUrls: ['./machine.prod.nominal.component.css']
})
export class MachineProductionNominalComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;
  @Input() dateRangeError: boolean;  
  
  comparative = {
    table: [],
    sum: {}
  };
  
  private refreshing: boolean = false;

  constructor(
    private machineService: MachineService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {
    super();
                
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.dateRange && this.channelId && this.machineCode) {
      if(!this.dateRangeError) {
        this.refreshing = true;
        this.getComparative();
      }      
    }
  }  

  getComparative() {    
    let dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    let dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.machineService.getNominalComparative({
      channelId: this.channelId,
      machineCode: this.machineCode,
      dateIni: dateIni,
      dateFin: dateFin
    })
    .subscribe(
      result => {     
        this.comparative.table = [];
        this.comparative.sum = {};  
          
        let sum = { production: 0, nominal: 0, diff: 0 };
        for(let i = 0; i < result.length; i++) {
          sum.production += result[i].production;
          sum.nominal += result[i].nominal;
          sum.diff += result[i].diff;
        }
        this.comparative.table = result;
        this.comparative.sum = sum;
        this.refreshing = false;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }   
}
