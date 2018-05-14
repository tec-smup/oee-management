import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  chart = []; 
  dropdownMachine: string;
  dropdownChannel: number;
  public dateTimeRange: Date[];

  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);   
      let range1 = new Date(Date.now());
      let range2 = new Date(range1.getTime() + 60*60000);
      this.dateTimeRange = [range1, range2];   
  }

  ngOnInit() {       
  }

  setChannel($event) {
    this.dropdownChannel = $event;
    if(this.dropdownChannel && this.dropdownMachine)
      this.refreshChart();    
  }

  setMachine($event) {
    this.dropdownMachine = $event;
    if(this.dropdownChannel && this.dropdownMachine)
      this.refreshChart();
  }  

  refreshChart() {
    Chart.helpers.each(Chart.instances, function(instance) {
      instance.chart.destroy();
    });
    this.getChartData();
  }

  getChartData() {  
    this.dashboardService.chart(
      this.formatDateTime(this.dateTimeRange[0]), 
      this.formatDateTime(this.dateTimeRange[1]), 
      this.dropdownChannel, 
      this.dropdownMachine
    )
    .subscribe(
      result => {
        let time = result.map(e => e.time);
        let oee = result.map(e => e.oee);

        this.chart = new Chart('chartCanvas', {
          type: 'line',
          data: {
            labels: time,
            datasets: [{
              data: oee,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#007bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            },
            legend: {
              display: false,
            },  
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return 'OEE: ' + tooltipItem.yLabel + '%';
                }
              }                  
            }                      
          }         
        });        
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });  
  }   
}
