import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production',
  templateUrl: './machine.production.component.html',
  styleUrls: ['./machine.production.component.css']
})
export class MachineProductionComponent extends BaseComponent implements OnInit, OnDestroy {
  dropdownMachine: string;
  dropdownChannel: number;
  dateTimeRange: Date[];
  dateTimeRangeError: boolean = false;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();             
    //devo fazer isso aqui pois o componente que carrega as últimas medições depende dessa data
    let now = new Date(Date.now());
    let channelTurn = this.getTurn();
    this.dateTimeRange = [this.setTimeOnDatetime(now, (channelTurn.initial)), this.setTimeOnDatetime(now, (channelTurn.final))];    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  changeDateRange(dates: any): any {
    this.dateTimeRangeError = false;
    var hours = Math.abs(dates.value[0] - dates.value[1]) / 36e5;   
    if(hours > 24) {
      this.dateTimeRangeError = true;
      this.toastr.warning("Datas selecionadas não podem ter mais de 1 dia de diferença.", "Erro!", { enableHTML: true, showCloseButton: true });
    }
  }  
  setChannel($event) {
    let now1 = this.dateTimeRange[0];
    let now2 = this.dateTimeRange[1];
    this.dateTimeRange = [this.setTimeOnDatetime(now1, ($event.initial_turn || "08:00")), this.setTimeOnDatetime(now2, ($event.final_turn || "18:00"))];   

    this.dropdownChannel = $event.id;
  }
  setMachine($event) {
    this.dropdownMachine = $event;
  }    
}
