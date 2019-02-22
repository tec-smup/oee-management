import { Component, OnInit, ViewContainerRef, OnDestroy, Input, SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { MachinePauseService } from '../../../services/machine.pause/machine.pause.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-machine-production-chart-pause-pareto',
  templateUrl: './machine.prod.chart.pause.pareto.component.html',
  styleUrls: ['./machine.prod.chart.pause.pareto.component.css']
})
export class MachineProductionChartPauseParetoComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;
  @Input() dateRangeError: boolean;
  @Input() refreshing: boolean;
  public filter: number = 3; //default por dia
  public filterDescription: string = "filtro por dia selecionado";

  public chart: AmChart;  
  public productionOEE: Array<any>;

  constructor(
    private machinePauseService: MachinePauseService,
    private AmCharts: AmChartsService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {
      super();
  } 

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(!this.dateRangeError && ((this.dateRange && this.channelId && this.machineCode) || this.refreshing)) {
      this.refreshing = true;
      this.getChartData();
    }
  }   

  ngAfterViewInit() {  
    this.chart = this.AmCharts.makeChart("amChartPareto", this.makeOptions([]));
  }  

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }    
  }

  setFilter(selected) {
    switch(selected) {
      case 0:
        this.filterDescription = "filtro por ano selecionado";
        break;
      case 1:
        this.filterDescription = "filtro por mês selecionado";
        break;
      case 2:
        this.filterDescription = "filtro por semana selecionado";
        break;
      case 3:
        this.filterDescription = "filtro por dia selecionado";
        break;  
      default:                      
        this.filterDescription = "filtro por dia selecionado";
        break;
    }
    this.filter = selected;
    this.refreshing = true;
    this.getChartData();
  }

  getChartData() {  
    this.machinePauseService.pareto(
      this.channelId, 
      this.machineCode,
      this.filter
    )
    .subscribe(
      result => {   
          this.AmCharts.updateChart(this.chart, () => {
            this.chart.dataProvider.shift(); 
            if(result.pareto.length > 0) {
              this.chart.dataProvider = result.pareto;
            }
            else {
              this.chart.dataProvider = [{
                pause_name_short: " ",
                pause: 0,
                sum_percentage: 0
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
      "titles": [
        {
          "text": "Diagrama de pareto de pausas",
          "size": 15
        }
      ],      
      "responsive": {
        "enabled": true
      },       
      "dataProvider": dataProvider,
      "valueAxes": [
        {
          "id": "v1",
          "axisAlpha": 0,
          "position": "left"
        },
        {
            "id": "v2",
            "axisAlpha": 0,
            "position": "right",
            "unit": "%",
            "gridAlpha": 0,
            "maximum": 100
        }
      ],
      "startDuration": 1,
      "graphs": [
        { 
          "fillAlphas": 1,
          "title": "Pause em minutos",
          "type": "column",
          "valueField": "pause",
          "fillColors": "#1a3a5a",
          "balloonFunction": function(graphDataItem, graph) {            
            let text = `
              Tempo: ${graphDataItem.dataContext.pause_in_time}
              <br>Pausa: ${graphDataItem.dataContext.pause_name}
              <br>Tipo: ${graphDataItem.dataContext.pause_type}
            `;                
            return text;
          }           
        }, 
        {
          "valueAxis": "v2",
          "bullet": "round",
          "lineThickness": 3,
          "bulletSize": 7,
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "useLineColorForBulletBorder": true,
          "fillAlphas": 0,
          "lineAlpha": 1,
          "title": "%",
          "valueField": "sum_percentage",
          "lineColor": "#A8CF45",
          "balloonFunction": function(graphDataItem, graph) {
            let text = graphDataItem.dataContext.sum_percentage + "%";                
            return text;
          }          
        }
      ],
      "categoryField": "pause_name_short",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0,         
      }
    };
  }
}
