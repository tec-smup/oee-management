import { Component, OnInit, OnDestroy, Input, SimpleChange, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { MachineShiftService } from '../../../services/machine.shift/machine.shift.service';
import { Parameters } from '../../../models/parameters';
import { ToastsManager } from 'ng2-toastr';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../services/dashboard/filter.service';

@Component({
  selector: 'gauge-shift-oee',
  templateUrl: './shift.oee.component.html',
  styleUrls: ['./shift.oee.component.css']
})
export class GaugeShiftOeeComponent extends BaseComponent implements OnInit, OnDestroy { 
  private dwmy: number = undefined;
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  public refreshing: boolean = false;

  private unsubscribe: Subscription[] = [];

  public charts: Array<AmChart> = new Array<AmChart>();
  public gauges: Array<any> = [];
  
  constructor(private machineShiftService: MachineShiftService,
              private amChartsService: AmChartsService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private filterService: FilterService) {
    super();
    this.toastr.setRootViewContainerRef(vcr); 
    this.listenFilters();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  } 

  ngOnDestroy() {
    this.destroyCharts(null);
    this.unsubscribe.forEach(f => f.unsubscribe());
  }  
  private destroyCharts(cb) {    
    if (this.charts) {
      this.charts.forEach(f => this.amChartsService.destroyChart(f));
    }
    this.charts = [];  
    if(cb !== null) cb();
  }

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(refresh => this.getData());
		const subsDWMY = this.filterService.onDWMYUpdate$.subscribe(dwmy => {      
			this.dwmy = dwmy;
    });
		const subsChannel = this.filterService.onChannelUpdate$.subscribe(channelId => {
			this.channelId = channelId;
    });  
		const subsMachine = this.filterService.onMachineUpdate$.subscribe(machineCode => {
			this.machineCode = machineCode;
		});            
		this.unsubscribe.push(subsCountdown);    
		this.unsubscribe.push(subsDWMY);    
		this.unsubscribe.push(subsChannel);    
		this.unsubscribe.push(subsMachine);    
  }  

  private getData() {
    console.log('antes')
    console.log(this.dwmy, this.channelId, this.machineCode)
    //retorna enquanto não tiver os filtros completos 
    if(isNaN(this.dwmy) || !this.channelId || !this.machineCode)
      return; 

      console.log('depois')

    this.destroyCharts(() => {
    const dateRange: string[] = this.setDateByFilter(this.dwmy);
    this.refreshing = true;
      
      let params = new Parameters(); 
      params.channelId = this.channelId;
      params.machineCode = this.machineCode;
      params.dateIni = dateRange[0];
      params.dateFin = dateRange[1];

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