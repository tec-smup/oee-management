import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-graph-pause',
  templateUrl: './graph.pause.component.html',
  styleUrls: ['./graph.pause.component.css']
})
export class GraphPauseComponent extends BaseComponent implements OnInit, OnDestroy {
  dropdownMachine: string;
  dropdownChannel: number;
  dateTimeRange: Date[];

  constructor(private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {
    super();        
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
