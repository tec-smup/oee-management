import { Component, OnInit, OnDestroy, Input, SimpleChange, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { MachineShiftService } from '../../../services/machine.shift/machine.shift.service';
import { Parameters } from '../../../models/parameters';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'gauge-shift-oee',
  templateUrl: './shift.oee.component.html',
  styleUrls: ['./shift.oee.component.css']
})
export class GaugeShiftOeeComponent extends BaseComponent implements OnInit, OnDestroy { 
  @Input() channelId: number;
  @Input() dateRange: Date[];
  @Input() machineCode: string;
  @Input() dateRangeError: boolean;
  @Input() refreshing: boolean;

  public charts: Array<AmChart> = new Array<AmChart>();
  public gauges: Array<any> = [];
  
  constructor(private machineShiftService: MachineShiftService,
              private amChartsService: AmChartsService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(!this.dateRangeError && ((this.dateRange && this.channelId && this.machineCode) || this.refreshing)) {
      this.refreshing = true;
      this.getData();
    }
  } 

  ngAfterViewInit() {
  } 

  ngOnDestroy() {
    this.destroyCharts(null);
  }  
  destroyCharts(cb) {    
    if (this.charts) {
      this.charts.forEach(f => this.amChartsService.destroyChart(f));
    }
    this.charts = [];  
    if(cb !== null) cb();
  }

  getData() {
    this.destroyCharts(() => {
      let dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
      let dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);
      
      let params = new Parameters(); 
      params.channelId = this.channelId;
      params.machineCode = this.machineCode;
      params.dateIni = dateIni;
      params.dateFin = dateFin;

      this.machineShiftService.oee(params)
      .subscribe(
        result => {
          let resultOk = [];
          let obj = {}

          //tenho que fazer de forma mais elegante isso daqui
          for(let i = 0; i < result.length; i++) {
            if(result[i].length > 0) {
              let keys = Object.keys(result[i][0]);
                          
              if(keys.some(s => s === 'machine_code')) {
                if(keys.some(s => s === 'oee_msg')) {
                  obj["label"] = result[i][0];
                }                
                else {
                  obj["oee"] = result[i][0];
                  resultOk.push(obj);
                  obj = {}
                }            
              }
            }
          } 

          this.gauges = resultOk;
  
          for(let i = 0; i < this.gauges.length; i++) {
            let chart = this.amChartsService.makeChart(`gaugeShiftOEE_${i}`, this.makeOptions(
              { bands: [ 
                {
                  "color": "#cc4748",
                  "endValue": 33,
                  "startValue": 0
                }, 
                {
                  "color": "#fdd400",
                  "endValue": 66,
                  "startValue": 33
                }, 
                {
                  "color": "#84b761",
                  "endValue": 100,
                  "innerRadius": "95%",
                  "startValue": 66
                } 
              ],
              endValue: 100,
              arrows: [ { value: this.gauges[i].oee.oee } ],
              bottomText: this.gauges[i].oee.oee + '%',     
            }), 500);
            this.charts.push(chart);            
          }        
          this.refreshing = false;
        },
        error => {
          if(error !== 'sem dados')  
            this.toastr.error(error, "Erro ao carregar OEE por turno", { enableHTML: true, showCloseButton: true });   
        });
    

    });
  }

  makeOptions(data) {
    return {
      "type": "gauge",
      "theme": "none",   
      "axes": [ 
        {
          "unit": "%",
          "axisThickness": 1,
          "axisAlpha": 0.2,
          "tickAlpha": 0.2,
          "valueInterval": 10,
          "bands": data.bands,
          "bottomText": data.bottomText,
          "bottomTextYOffset": 10,
          "endValue": data.endValue
        } 
      ],
      "arrows": data.arrows,
      "export": {
        "enabled": false
      }
    };
  }  
}