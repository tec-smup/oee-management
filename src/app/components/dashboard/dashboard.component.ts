import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
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
      
      //devo fazer isso aqui pois o componente que carrega as últimas medições depende dessa data
      let now = new Date(Date.now());
      let channelTurn = this.getTurn();
      this.dateTimeRange = [this.setTimeOnDatetime(now, (channelTurn.initial || "08:00")), this.setTimeOnDatetime(now, (channelTurn.final || "18:00"))];   
  }

  ngOnInit() {       
  }

  ngOnDestroy() {
    //destroi instancias anteriores do grafico
    Chart.helpers.each(Chart.instances, function(instance) {    
      instance.destroy(); 
    }); 
  }  

  changeDateRange(dates: any): any {
    // var hours = Math.abs(dates.value[0] - dates.value[1]) / 36e5;   
    // if(hours > 24) {
    //   this.toastr.warning("Datas selecionadas não podem ter mais de 1 dia de diferença.", "Oops!", { enableHTML: true });
    // }
    // else {
    //   this.refreshChart(true);  
    // }  
    this.refreshChart(true);
  }

  setChannel($event) {
    let now1 = this.dateTimeRange[0];
    let now2 = this.dateTimeRange[1];
    this.dateTimeRange = [this.setTimeOnDatetime(now1, ($event.initial_turn || "08:00")), this.setTimeOnDatetime(now2, ($event.final_turn || "18:00"))];   

    this.dropdownChannel = $event.id;
  }

  setMachine($event) {
    this.dropdownMachine = $event;
    this.refreshChart(true);
  }  

  refreshChart(refresh: boolean) {
    if(refresh && this.dropdownChannel && this.dropdownMachine && this.dateTimeRange.length == 2) {
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
        let labels = result.map(e => e.labels);
        let data = result.map(e => e.data);
        let tooltips = result[0] ? result[0].chart_tooltip_desc : "";

        let instanceExists = false;
        Chart.helpers.each(Chart.instances, function(instance) {    
          instanceExists = true;

          let callbacks = instance.options.tooltips.callbacks;
          callbacks.label = function(tooltipItem, data) {
            return tooltips.replace("__value", tooltipItem.yLabel);
          };

          instance.data.labels = labels;
          instance.data.datasets.forEach(function(dataset) {            
            dataset.data = data;
          });
          instance.update(); 
        });

        if(instanceExists)
          return;

        this.chart = new Chart('chartCanvas', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: data,
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
                  return tooltips.replace("__value", tooltipItem.yLabel);
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
  
  exportExcel() { 
    this.dashboardService.exportChartExcel(
      this.formatDateTime(this.dateTimeRange[0]), 
      this.formatDateTime(this.dateTimeRange[1]), 
      this.dropdownChannel, 
      this.dropdownMachine
    ) 
    .subscribe(
      result => {
        let url = window.URL.createObjectURL(result.data);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = result.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      }
    );
  }
}
