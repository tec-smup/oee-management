import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { FilterService } from '../../services/dashboard/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-machine-production',
  templateUrl: './machine.production.component.html',
  styleUrls: ['./machine.production.component.css']
})
export class MachineProductionComponent extends BaseComponent implements OnInit, OnDestroy {
  private intervalTimer: any;
  public timerStr: string = "00:00:00";
  private unsubscribe: Subscription[] = [];
  
  constructor(
    public toastr: ToastsManager, 
    private filterService: FilterService) 
  {
    super();
    this.listenFilters();              
  }

  ngOnInit() {
    this.startIntervalTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
    this.unsubscribe.forEach(f => f.unsubscribe());
  } 

  private startIntervalTimer() {
    let sec = 60;
    this.timerStr = this.secToTime(sec);
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;       

        if(sec == 0) {
          sec = 60;
          this.startIntervalTimer();          
          this.filterService.setRefreshingCountdown(true);
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }  

  private stopIntervalTimer() {
    this.timerStr = 'pausado';
    clearInterval(this.intervalTimer);
  }

  private listenFilters() {
		const subsDWMY = this.filterService.onDWMYUpdate$.subscribe(dwmy => {      
      //diferente de dia atual, trava o countdown
      if(dwmy != 3) 
        this.stopIntervalTimer();
      else 
        this.startIntervalTimer();
    });
		this.unsubscribe.push(subsDWMY);    
  }   
}
