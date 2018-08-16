import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { AmChart, AmChartsService } from '../../../../node_modules/@amcharts/amcharts3-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  amChart: AmChart;
  dropdownMachine: string;
  dropdownChannel: number;
  dateTimeRange: Date[];

  constructor(
    private dashboardService: DashboardService, 
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);   
      
      //devo fazer isso aqui pois o componente que carrega as últimas medições depende dessa data
      let now = new Date(Date.now());
      let channelTurn = this.getTurn();
      this.dateTimeRange = [this.setTimeOnDatetime(now, (channelTurn.initial)), this.setTimeOnDatetime(now, (channelTurn.final))];   
  }

  ngOnInit() {     
    this.amChart = this.AmCharts.makeChart('amChart', this.makeOptions([]));      

    // this.timer = setInterval(() => {
    //     this.AmCharts.updateChart(this.amChart, () => {
    //         this.amChart.dataProvider = this.makeRandomDataProvider();
    //     });
    // }, 3000);     
  }

  ngOnDestroy() {
    //destroi instancias anteriores do grafico
    //clearInterval(this.timer);
    if (this.amChart) {
        this.AmCharts.destroyChart(this.amChart);
    }     
  }  

  changeDateRange(dates: any): any {
    // var hours = Math.abs(dates.value[0] - dates.value[1]) / 36e5;   
    // if(hours > 24) {
    //   this.toastr.warning("Datas selecionadas não podem ter mais de 1 dia de diferença.", "Erro!", { enableHTML: true });
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
      this.formatDateTimeMySQL(this.dateTimeRange[0], true), 
      this.formatDateTimeMySQL(this.dateTimeRange[1], false), 
      this.dropdownChannel, 
      this.dropdownMachine
    )
    .subscribe(
      result => {
        let tooltips = result[0] ? result[0].chart_tooltip_desc : "[[value]]";
        
        this.AmCharts.updateChart(this.amChart, () => {
          this.amChart.dataProvider = result;          
        });              
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true });
      });  
  }  

  makeOptions(dataProvider) {
      return {
          "type": "serial",
          "theme": "light",
          "language": "pt",
          "marginRight": 20,
          "autoMarginOffset": 20,
          "responsive": {
            "enabled": true
          },          
          "marginTop": 0,
          "dataProvider": dataProvider,
          "valueAxes": [{
              "axisAlpha": 0.2,
              "dashLength": 1,
              "position": "left"
          }],
          "mouseWheelZoomEnabled": true,
          "graphs": [{
              "id": "g1",
              "balloonText": "[[value]]",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "hideBulletsCount": 50,
              "valueField": "data",
              "useLineColorForBulletBorder": true,
              "balloon": {
                  "drop": true
              },
              "balloonFunction": function(graphDataItem, graph) {
                let text = graphDataItem.dataContext.chart_tooltip_desc;
                let data = graphDataItem.dataContext.data;
                return text.replace("__value", data);
              }
          }],
          "chartScrollbar": {
              "autoGridCount": true,
              "graph": "g1",
              "scrollbarHeight": 40
          },
          "chartCursor": {
              "categoryBalloonDateFormat": "JJ:NN:SS, DD/MM/YYYY",
              "limitToGraph":"g1"
          },
          "categoryField": "labels",
          "categoryAxis": {
              "dateFormats": [
                  { "period": "fff", "format": "JJ:NN:SS" },
                  { "period": "ss", "format": "JJ:NN:SS" },
                  { "period": "mm", "format": "JJ:NN:SS" },
                  { "period": "hh", "format": "JJ:NN:SS" },
                  { "period": "DD", "format": "DD/MM" },
                  { "period": "WW", "format": "DD/MM" },
                  { "period": "MM", "format": "MMM" },
                  { "period": "YYYY", "format": "YYYY"}
              ],
              "parseDates": true,
              "axisColor": "#DADADA",
              "dashLength": 1,
              "minorGridEnabled": true,
              "minPeriod": "mm",
          },
          "export": {
              "enabled": true
          }
      };
  }    

  exportExcel() {
    this.dashboardService.exportChartExcel(
      this.formatDateTimeMySQL(this.dateTimeRange[0], true), 
      this.formatDateTimeMySQL(this.dateTimeRange[1], false), 
      this.dropdownChannel, 
      this.dropdownMachine
    ) 
    .subscribe(
      result => {
        if(result.data.size > 0) {
          let url = window.URL.createObjectURL(result.data);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = result.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
        else {
          this.toastr.warning("Não existe dados com os filtros selecionados.", "Aviso!", { enableHTML: true });
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true });
      }
    );
  }
}
