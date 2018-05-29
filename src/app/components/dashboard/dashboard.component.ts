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
  dateTimeRange: Date[];

  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);   
      let now = new Date(Date.now());
      this.dateTimeRange = [this.setTimeOnDatetime(now, "07:00"), this.setTimeOnDatetime(now, "18:00")];   
  }

  ngOnInit() {       
  }

  changeDateRange(dates: any): any {
    var hours = Math.abs(dates.value[0] - dates.value[1]) / 36e5;   
    if(hours > 24) {
      this.toastr.warning("Datas selecionadas não podem ter mais de 1 dia de diferença.", "Oops!", { enableHTML: true });
    }
    else {
      this.refreshChart(true);  
    }  
  }

  setChannel($event) {
    this.dropdownChannel = $event.id;
    this.refreshChart(true);    
  }

  setMachine($event) {
    this.dropdownMachine = $event; 
    this.refreshChart(true);
  }  

  refreshChart(refresh: boolean) {
    if(refresh && this.dropdownChannel && this.dropdownMachine && this.dateTimeRange.length == 2) {
      Chart.helpers.each(Chart.instances, function(instance) {
        instance.chart.destroy();
      });
      this.getChartData();
    }
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
