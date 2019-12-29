import { 
  Component, 
  OnInit, 
  ViewContainerRef,
  OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';
import { FilterService } from '../../services/dashboard/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lastfeed',
  templateUrl: './lastFeed.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class LastFeedComponent extends BaseComponent implements OnInit, OnDestroy {
  private channelId: number  = undefined;
  private machineCode: string  = undefined;  
  private dateRange: Date[] = undefined;

  private unsubscribe: Subscription[] = []; 

  public lastFeed: Array<Dashboard["lastFeed"]> = [];
  public pauses: Dashboard["pauses"] = [];
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 25;

  private intervalTimer: any;
  public timerStr: string = "00:00:00";
  public refreshing: boolean = false;

  productionCount: Array<any> = [];
  productionOEE: Array<any> = [];
  
  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private filterService: FilterService) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);   
      this.listenFilters();  
  }

  ngOnInit() {
  } 

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
    this.unsubscribe.forEach(f => f.unsubscribe());
  }

  private listenFilters() {
		const subsCountdown = this.filterService.onCountdownUpdate$.subscribe(refresh => {
      this.getLastFeed();
      this.getProductionCount();
    });
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;        
  }

  setColumnDefs() {
    this.columnDefs = [
      {
        headerName: "Canal",
        field: "channel_name",
      },
      {
        headerName: "Maquina",
        field: "machine_name",
      },      
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field1_desc : "",
        field: "field1",
      },  
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field2_desc : "",
        field: "field2",
      },              
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field3_desc : "",
        field: "field3",
      },             
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field4_desc : "",
        field: "field4",
      },       
      {
        headerName: this.lastFeed.length > 0 ? this.lastFeed[0].field5_desc : "",
        field: "field5",
      },   
      {
        headerName: "Inserido em",
        field: "inserted_at",
      },           
    ];    
    this.gridApi.setColumnDefs(this.columnDefs);
  } 

  private getLastFeed() {
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

    const dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    const dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.gridApi.showLoadingOverlay();
    this.dashboardService.lastFeed(dateIni, dateFin, this.channelId, this.machineCode, this.getCurrentUser().id)
    .subscribe(
      result => {        
        this.lastFeed = result.lastFeeds;
        this.pauses = result.pauses;
        this.startIntervalTimer();

        if(this.lastFeed.length > 0) {
          this.setColumnDefs();
          this.gridApi.setRowData(this.lastFeed);        
          this.gridApi.sizeColumnsToFit();          
        }
        this.gridApi.hideOverlay();        
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });
  }

  private startIntervalTimer() {
    let sec = this.lastFeed[0] ? this.lastFeed[0].refresh_time : 300;
    this.timerStr = this.secToTime(sec);
    this.refreshing = false;
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;
        if(sec == 0) {
          sec = 60;
          this.refreshing = true;
          clearInterval(this.intervalTimer);
          this.filterService.setRefreshingCountdown(true);
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }   

  //agora ja ta um pouco melhor, mas sempre da pra melhorar
  private getProductionCount() { 
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

    const dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    const dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.dashboardService.productionCount(dateIni, dateFin, this.channelId)
    .subscribe(
      result => {
        this.productionCount = [];  

        //rejeito result set "ok" do mysql
        let validResultSet = [];
        for(let i = 0; i < result.length; i++) {
          if(result[i].length > 0) 
            validResultSet.push(result[i]);
        }        

        validResultSet.forEach(table => {
          //pega primeira linha para montar dados de colunas
          let first = table[0];
          
          //monta nome das colunas das maquinas
          let columns = [];
          for(let col in first) {
            if(col.indexOf("COL_") > -1)
              columns.push({
                code: col,
                name: col.replace("COL_","")
            });
          }          

          let totalizer = {
            totalHora : 0,
            mediaTaxa: 0
          };

        //faz calculo totalizador
        for(let i = 0; i < table.length; i++) {                        
          totalizer.totalHora += table[i].total;
          totalizer.mediaTaxa += table[i].taxa;
        }
        totalizer.mediaTaxa = Math.round((totalizer.mediaTaxa / (table.length >= 6 ? table.length-1 : table.length)) * 100) / 100;
        totalizer.totalHora = Math.round(totalizer.totalHora * 100) / 100;       

        //shift_hour é o cara responsavel por avisar que a tabela tem quebra de turno em determinada hora, não precisa 
        //entrar no productionCount. Consigo verificar diretamente table[0] pq nos clientes que não tem shift_hour, esse
        //cara nem existe em validResultSet
        if(!table[0].shift_hour) {
          this.productionCount.push({
            table: table,
            columns: columns,
            totalizer: totalizer
          });
        }
      }); 
    },
    error => {
      this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
    });     
  }
  
  exportProductionExcel() {
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

    const dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    const dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.dashboardService.exportProductionExcel(
      dateIni, dateFin, this.channelId
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

  exportPauseExcel() {
    //retorna enquanto não tiver os filtros completos 
    if(this.dateRange == undefined || this.channelId == undefined || this.machineCode == undefined)
      return; 

    const dateIni = this.formatDateTimeMySQL(this.dateRange[0], true);
    const dateFin = this.formatDateTimeMySQL(this.dateRange[1], false);

    this.dashboardService.exportPauseExcel(dateIni, dateFin, this.channelId, this.machineCode) .subscribe(
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

  get pauseIncidests() {
    return this.pauses.map(m => m.incidents)
      .reduce((incidents, incident) => incidents + incident, 0);
  }
}
