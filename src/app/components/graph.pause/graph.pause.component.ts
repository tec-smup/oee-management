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
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/dashboard/filter.service';

@Component({
  selector: 'app-graph-pause',
  templateUrl: './graph.pause.component.html',
  styleUrls: ['./graph.pause.component.css']
})
export class GraphPauseComponent extends BaseComponent implements OnInit, OnDestroy {
  private amChart: AmChart;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  private dateRange: Date[] = undefined;
  private unsubscribe: Subscription[] = []; 

  public loading: boolean = false;

  bsModalRef: BsModalRef;
  pauses: Array<MachinePauseDash> = [];

  constructor(
    private dashboardService: DashboardService,    
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private modalService: BsModalService,
    private filterService: FilterService) {
    super();        
    this.toastr.setRootViewContainerRef(vcr);
    this.listenFilters();   
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
      
        chart.alpha = 0.3;
      }
      
    }, ["serial"]);

    this.amChart = this.AmCharts.makeChart('amChart', this.makeOptions([]));         
  }
  ngOnDestroy() {
    
    if (this.amChart) {
        this.AmCharts.destroyChart(this.amChart);
    }      
    this.unsubscribe.forEach(f => f.unsubscribe());
  }

  public refreshChart() {
    this.getChartData();
  }

  private listenFilters() {
		const subsDateRange = this.filterService.onDateRangeUpdate$.subscribe(dateRange => {      
      this.dateRange = dateRange;
      this.getChartData();
    });
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channelId => {
			this.channelId = channelId;
    });  
		const subsMachine = this.filterService.onMachineUpdate$.subscribe(machineCode => {
      this.machineCode = machineCode;
      this.getChartData();
		});               
		this.unsubscribe.push(subsDateRange);    
		this.unsubscribe.push(subsChannel);    
		this.unsubscribe.push(subsMachine);    
  }  

  getChartData() {  
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

    this.loading = true;
    this.dashboardService.chart(
      this.formatDateTimeMySQL(this.dateRange[0], true), 
      this.formatDateTimeMySQL(this.dateRange[1], false), 
      this.channelId, 
      this.machineCode
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
              //this.amChart.addLabel("50%", "50%", "Não encontrei dados com os filtros informados.", "middle", 16);
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
              "lineThickness": 3,
              "lineColorField": "line_color",
              "fillColorsField": "line_color",
              "useLineColorForBulletBorder": true,
              "balloon": {
                "adjustBorderColor": false,
                "color": "#000000",
                "horizontalPadding": 20,
                "verticalPadding": 20
              },
              "balloonFunction": function(graphDataItem, graph) {
                let pauseReason = graphDataItem.dataContext.pause_reason;
                let pauseInMin = graphDataItem.dataContext.pause_in_minutes;
                let text = graphDataItem.dataContext.chart_tooltip_desc;
                let data = graphDataItem.dataContext.data;
                text = text.replace("__value", data) || "[[value]]";
                if(pauseReason) {
                  text += `<br/><b>Motivo pausa: ${pauseReason}</b>`;
                }
                if(pauseInMin) {
                  text += `<br/><b>Pausa de: ${pauseInMin} minutos</b>`;
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
    start.channel_id = this.channelId;
    start.machine_code = this.machineCode;
    start.date_ref = moment(dataStartPoint.labels).utc().format("YYYY-MM-DD HH:mm:ss");
    start.date_formated = moment(dataStartPoint.labels).utc().format("DD/MM/YYYY HH:mm:ss");
    start.value = dataStartPoint.data;
    
    let end = new MachinePauseDash();
    end.channel_id = this.channelId;
    end.machine_code = this.machineCode;
    end.date_ref = moment(dataEndPoint.labels).utc().format("YYYY-MM-DD HH:mm:ss");
    end.date_formated = moment(dataEndPoint.labels).utc().format("DD/MM/YYYY HH:mm:ss");
    end.value = dataEndPoint.data; 
    end.date_dif = this.getDatetimeDiffInMin(end.date_ref, start.date_ref);   

    this.pauses.push(start);     
    this.pauses.push(end);  

    const initialState = {
      pauses: this.pauses,
      title: `Confirmar pausa selecionada de ${end.date_dif} minutos`,
      channelId: this.channelId
    };
    this.bsModalRef = this.modalService.show(PauseModalComponent, {initialState});

  }
  removePause() {
    this.pauses = [];
  }    
}
