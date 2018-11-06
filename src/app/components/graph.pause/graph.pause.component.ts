import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PauseModalComponent } from './pause.modal.component';
import * as moment from 'moment-timezone';
import { MachinePauseDash } from '../../models/machine.pause.dash';

@Component({
  selector: 'app-graph-pause',
  templateUrl: './graph.pause.component.html',
  styleUrls: ['./graph.pause.component.css']
})
export class GraphPauseComponent extends BaseComponent implements OnInit, OnDestroy {
  amChart: AmChart;
  dropdownMachine: string;
  dropdownChannel: number;
  dateTimeRange: Date[];
  bsModalRef: BsModalRef;
  loading: boolean = false;

  pauses: Array<MachinePauseDash> = [];

  constructor(
    private dashboardService: DashboardService,    
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private modalService: BsModalService) {
    super();        
    this.toastr.setRootViewContainerRef(vcr);

      //devo fazer isso aqui pois o componente que carrega as últimas medições depende dessa data
      let now = new Date(Date.now());
      let channelTurn = this.getTurn();
      this.dateTimeRange = [this.setTimeOnDatetime(now, (channelTurn.initial)), this.setTimeOnDatetime(now, (channelTurn.final))];    
  }

  ngOnInit() {
    this.AmCharts.addInitHandler(function(chart) {
  
      // check if data is mepty
      if (chart.dataProvider === undefined || chart.dataProvider.length === 0) {
        // add some bogus data
        var dp = {};
        dp[chart.categoryField] = new Date();
        dp[chart.valueField] = 0;
        dp["chart_tooltip_desc"] = "__value";
        chart.dataProvider.push(dp)
        
        // disable slice labels
        chart.labelsEnabled = false;
        
        // add label to let users know the chart is empty
        chart.addLabel("50%", "50%", "Não encontrei dados com os filtros informados.", "middle", 16);
        
        // dim the whole chart
        chart.alpha = 0.3;
      }
      
    }, ["serial"]);

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
    //   this.toastr.warning("Datas selecionadas não podem ter mais de 1 dia de diferença.", "Erro!", { enableHTML: true, showCloseButton: true });
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
    this.loading = true;
    this.dashboardService.chart(
      this.formatDateTimeMySQL(this.dateTimeRange[0], true), 
      this.formatDateTimeMySQL(this.dateTimeRange[1], false), 
      this.dropdownChannel, 
      this.dropdownMachine
    )
    .subscribe(
      result => {   
          this.AmCharts.updateChart(this.amChart, () => {            
            this.amChart.dataProvider.shift(); 
            if(result.length > 0) {
              this.amChart.dataProvider = result;
              this.amChart.allLabels = [];
            }
            else {
              this.amChart.dataProvider = [{
                labels: new Date(),
                data: 0,
                chart_tooltip_desc: "__value"
              }];
              this.amChart.addLabel("50%", "50%", "Não encontrei dados com os filtros informados.", "middle", 16);
            }    
            this.amChart.validateData();                              
          });
          this.loading = false;
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        this.loading = false;
      });  
  }  

  makeOptions(dataProvider) {
      return {
          "type": "serial",
          "theme": "light",
          "language": "pt",
          "dataDateFormat": "YYYY-MM-DDTHH:NN:SS.QQQ",
          "marginRight": 20,
          "autoMarginOffset": 20,
          "responsive": {
            "enabled": true
          },          
          "marginTop": 0,
          "dataProvider": dataProvider,
          "valueAxes": [
            {
              "axisAlpha": 0,
              "position": "left"
            }        
          ],
          "mouseWheelZoomEnabled": true,
          "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
          },          
          "graphs": [{
              "id": "g1",
              "balloonText": "[[value]]",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletSize": 5,
              "bulletColor": "#FFFFFF",
              "hideBulletsCount": 100,
              "valueField": "data",
              "lineThickness": 2,
              "lineColorField": "line_color",
              "fillColorsField": "line_color",
              "useLineColorForBulletBorder": true,
              "type": "smoothedLine",
              "balloon": {
                "adjustBorderColor": false,
                "color": "#000000",
                "horizontalPadding": 20,
                "verticalPadding": 20
              },
              "balloonFunction": function(graphDataItem, graph) {
                let pauseReason = graphDataItem.dataContext.pause_reason;
                let text = graphDataItem.dataContext.chart_tooltip_desc;
                let data = graphDataItem.dataContext.data;
                text = text.replace("__value", data) || "[[value]]";
                if(pauseReason) {
                  text += `<br/><b>Motivo pausa: ${pauseReason}</b>`;
                }
                return text;
              }
          }],
          "chartScrollbar": {
            "graph":"g1",
            "gridAlpha":0,
            "color":"#888888",
            "scrollbarHeight":30,
            "backgroundAlpha":0,
            "selectedBackgroundAlpha":0.1,
            "selectedBackgroundColor":"#888888",
            "graphFillAlpha":0,
            "autoGridCount":true,
            "selectedGraphFillAlpha":0,
            "graphLineAlpha":0.2,
            "graphLineColor":"#c2c2c2",
            "selectedGraphLineColor":"#888888",
            "selectedGraphLineAlpha":1
          },
          "chartCursor": {
            "categoryBalloonDateFormat": "JJ:NN:SS, DD/MM/YYYY",
            "limitToGraph":"g1",        
            "selectWithoutZooming": true,
            "listeners": [{
              "event": "selected",
              "method": this.selectedPause.bind(this)
            }]                    
          },
          "categoryField": "labels",
          "categoryAxis": {
              "dateFormats": [
                  { "period": "fff", "format": "JJ:NN" },
                  { "period": "ss", "format": "JJ:NN" },
                  { "period": "mm", "format": "JJ:NN" },
                  { "period": "hh", "format": "JJ:NN" },
                  { "period": "DD", "format": "DD/MM" },
                  { "period": "WW", "format": "DD/MM" },
                  { "period": "MM", "format": "MMM" },
                  { "period": "YYYY", "format": "YYYY"}
              ],
              "parseDates": true,
              "axisColor": "#DADADA",
              "dashLength": 1,
              "minorGridEnabled": true,
              "minPeriod": "ss",
          }            
      };
  }  

  selectedPause(event) {
    this.pauses = [];

    let dataStartPoint = event.chart.dataProvider[event.startIndex];
    let dataEndPoint = event.chart.dataProvider[event.endIndex];    
        
    let start = new MachinePauseDash();
    start.channel_id = this.dropdownChannel;
    start.machine_code = this.dropdownMachine;
    start.date_ref = moment(dataStartPoint.labels).utc().format("YYYY-MM-DD HH:mm:ss");
    start.date_formated = moment(dataStartPoint.labels).utc().format("DD/MM/YYYY HH:mm:ss");
    start.value = dataStartPoint.data;
    
    let end = new MachinePauseDash();
    end.channel_id = this.dropdownChannel;
    end.machine_code = this.dropdownMachine;
    end.date_ref = moment(dataEndPoint.labels).utc().format("YYYY-MM-DD HH:mm:ss");
    end.date_formated = moment(dataEndPoint.labels).utc().format("DD/MM/YYYY HH:mm:ss");
    end.value = dataEndPoint.data; 
    end.date_dif = this.getDatetimeDiffInMin(end.date_ref, start.date_ref);   

    this.pauses.push(start);     
    this.pauses.push(end);  

    const initialState = {
      pauses: this.pauses,
      title: `Confirmar pausa selecionada de ${end.date_dif} minutos`,
      channelId: this.dropdownChannel
    };
    this.bsModalRef = this.modalService.show(PauseModalComponent, {initialState});

  }
  removePause() {
    this.pauses = [];
  }    
}
