import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../base.component';
import { AmChart, AmChartsService } from '../../../../node_modules/@amcharts/amcharts3-angular';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/dashboard/filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {
  private amChart: AmChart;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  private dateRange: Date[] = undefined;
  
  private unsubscribe: Subscription[] = [];  
  
  constructor(
    private dashboardService: DashboardService, 
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
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
        
        // add label to let users know the chart is empty
        //chart.addLabel("50%", "50%", "Não encontrei dados com os filtros informados.", "middle", 16);
        
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
    this.unsubscribe.forEach(f => f.unsubscribe());
  }  

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(refresh => this.getChartData());
		const subsDateRange = this.filterService.onDateRangeUpdate$.subscribe(dateRange => {      
			this.dateRange = dateRange;
    });
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channelId => {
			this.channelId = channelId;
    });  
		const subsMachine = this.filterService.onMachineUpdate$.subscribe(machineCode => {
			this.machineCode = machineCode;
		});            
		this.unsubscribe.push(subsCountdown);    
		this.unsubscribe.push(subsDateRange);    
		this.unsubscribe.push(subsChannel);    
		this.unsubscribe.push(subsMachine);    
  }

  getChartData() {  
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

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
          },
          "listeners": [{
            "event": "rendered",
            "method": this.handleRender.bind(this)
          }]          
      };
  }    

  handleRender(event) {
    //console.log(event.chart.dataProvider);
  }

  exportExcel() {
    this.dashboardService.exportChartExcel(
      this.formatDateTimeMySQL(this.dateRange[0], true), 
      this.formatDateTimeMySQL(this.dateRange[1], false), 
      this.channelId, 
      this.machineCode
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
          this.toastr.warning("Não existe dados com os filtros selecionados.", "Aviso!", { enableHTML: true, showCloseButton: true });
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      }
    );
  }
}
