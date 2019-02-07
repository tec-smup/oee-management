import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Dashboard } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { BaseComponent } from '../../base.component';

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
  
  constructor(
    private dashboardService: DashboardService,
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
      if(!this.dateRangeError) this.getPauses();
    }
  }   

  getPauses() {    
    let dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    let dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);
    this.dashboardService.lastFeed(dateIni, dateFin, this.channelId, this.machineCode, this.getCurrentUser().id)
    .subscribe(
      result => {   
        this.pauses.table = [];
        this.pauses.sum = {};

        //pega tipos de pause distintos
        let types = result.pauses.map(function(p) {
          return p.type;
        })
        .filter(function(elem, pos, arr) {
          return arr.indexOf(elem) == pos;
        });     
        
        //monta objeto de total de pausas por tipo
        let pauseTotal = {
          total: 0
        };
        for(let i = 0; i < types.length; i++) {
          pauseTotal[types[i]] = 0;
        }

        //soma pausas agrupadas por tipo
        for(let i = 0; i < result.pauses.length; i++) {
          pauseTotal.total += result.pauses[i].pause_in_minutes;
        }           
        this.pauses.table = result.pauses;
        this.pauses.sum = pauseTotal;        
        console.log(this.pauses);
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }  
}
