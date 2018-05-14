import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart = []; 
  dropdownMachine: string;
  dropdownChannel: number;

  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      this.toastr.setRootViewContainerRef(vcr);      
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
    this.dashboardService.chart('11/05/2018 16:00', '11/05/2018 17:00', this.dropdownChannel, this.dropdownMachine)
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
