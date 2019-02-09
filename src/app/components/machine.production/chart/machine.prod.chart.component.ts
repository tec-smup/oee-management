import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-machine-production-chart',
  templateUrl: './machine.prod.chart.component.html',
  styleUrls: ['./machine.prod.chart.component.css']
})
export class MachineProductionChartComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;
  @Input() dateRangeError: boolean;

  public chart: AmChart;
  public refreshing: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {
      super();
  } 

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.dateRange && this.channelId && this.machineCode) {
      if(!this.dateRangeError) {
        this.refreshing = true;
        this.getChartData();
      }
    }
  }   

  ngAfterViewInit() {
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
                
        // dim the whole chart
        chart.alpha = 0.3;
      }
      
    }, ["serial"]);    
    this.chart = this.AmCharts.makeChart("amChart", this.makeOptions([]));
  }  

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }    
  }

  getChartData() {  
    let dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    let dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.dashboardService.chart(
      dateIni, 
      dateFin, 
      this.channelId, 
      this.machineCode
    )
    .subscribe(
      result => {   
          this.AmCharts.updateChart(this.chart, () => {            
            this.chart.dataProvider.shift(); 
            if(result.length > 0) {
              this.chart.dataProvider = result;
              this.chart.allLabels = [];
            }
            else {
              this.chart.dataProvider = [{
                labels: new Date(),
                data: 0,
                chart_tooltip_desc: "__value"
              }];
            }    
            this.chart.validateData(); 
            this.refreshing = false;                             
          });
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });  
  } 

  makeOptions(dataProvider) {
    return {
        "type": "serial",
        "theme": "light",
        "language": "pt",
        "dataDateFormat": "YYYY-MM-DDTHH:NN:SS.QQQ",
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
        "mouseWheelZoomEnabled": false,
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
        },         
        "export": {
            "enabled": true
        }        
    };
  }  
}
