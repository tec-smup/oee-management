import { Component, OnInit, ViewContainerRef, OnDestroy, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production-chart',
  templateUrl: './machine.prod.chart.component.html',
  styleUrls: ['./machine.prod.chart.component.css']
})
export class MachineProductionChartComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
