import { 
  Component, 
  OnInit, 
  ViewContainerRef, 
  EventEmitter, 
  Output, 
  OnDestroy, 
  Input,
  SimpleChange } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';
import { Dashboard } from '../../models/dashboard';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-lastfeed',
  templateUrl: './lastFeed.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class LastFeedComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  channelIdSelected:  number = 0;
  @Input() date: Date[];
  dateIniSelected: string;
  dateFinSelected: string;
  @Input() machineCode: string;
  machineCodeSelected: string = "";

  lastFeed: Array<Dashboard["lastFeed"]> = [];
  pauses: Dashboard["pauses"] = [];
  gridApi;
  gridColumnApi;
  columnDefs;
  paginationPageSize = 25;

  @Output() refreshDash = new EventEmitter<boolean>();
  intervalTimer: any;
  timerStr: string = "00:00:00";
  refreshing: boolean = false;

  productionCount: Array<any> = [];
  productionOEE: Array<any> = [];
  
  constructor(private dashboardService: DashboardService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) {   
      super();
      this.toastr.setRootViewContainerRef(vcr);    
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.channelIdSelected = changes.channelId && changes.channelId.currentValue != null ? 
      changes.channelId.currentValue : this.channelIdSelected;

    this.machineCodeSelected = changes.machineCode && changes.machineCode.currentValue != null ? 
      changes.machineCode.currentValue : this.machineCodeSelected;  

    this.dateIniSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[0], true) : this.dateIniSelected;
    this.dateFinSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[1], false) : this.dateFinSelected;
    
    if(this.channelIdSelected == 0 || !this.machineCodeSelected)
      return;
     
    this.getLastFeed();
    this.getProductionCount();
    this.getProductionOEE();
  }  

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
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

  refreshNow() {
    this.getLastFeed();
    this.refreshDash.emit(true);    
  }  

  getLastFeed() {    
    this.gridApi.showLoadingOverlay();
    this.dashboardService.lastFeed(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected, this.machineCodeSelected, this.getCurrentUser().id)
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

  startIntervalTimer() {
    let sec = this.lastFeed[0] ? this.lastFeed[0].refresh_time : 300;
    this.timerStr = this.secToTime(sec);
    this.refreshing = false;
    clearInterval(this.intervalTimer);
    this.intervalTimer = setInterval(
      () => {
        sec--;
        if(sec == 0) {
          this.refreshing = true;
          clearInterval(this.intervalTimer);
          this.refreshNow();
          this.getProductionCount();
          this.getProductionOEE();
        }
        this.timerStr = this.secToTime(sec);
      }, 1000);
  }   

  //ja tenho que refazer toda essa pagina ta td uma bosta...
  //agora ja ta um pouco melhor, mas sempre da pra melhorar
  getProductionCount() {  
    this.dashboardService.productionCount(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected)
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
    this.dashboardService.exportProductionExcel(
      this.dateIniSelected, this.dateFinSelected, this.channelIdSelected
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
    this.dashboardService.exportPauseExcel(
      this.dateIniSelected, this.dateFinSelected, this.channelIdSelected, this.machineCodeSelected
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

  getProductionOEE() {  
    this.dashboardService.productionOEE(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected)
    .subscribe(
      result => {
        this.productionOEE = []; 
        
        //rejeito result set "ok" do mysql
        for(let i = 0; i < result.length; i++) {
          //vou ter que resolver isso depois na proc, to sem paciencia agora
          if(result[i].length > 0) 
            this.productionOEE.push(result[i]);
        }
                
        //filtra oee conforme maquina selecionada e exibe ao lado do menu (é o que deu por hj...)
        let oee = this.productionOEE[0].filter(f => {
          return f.machine_code === this.machineCodeSelected;
        });
        let divOee = document.getElementById("divOEE");
        if(oee && oee.length > 0) {
          divOee.style.display = "block";
          let p = divOee.getElementsByTagName("p");
          p[0].innerHTML = `OEE ${oee[0].machine_name}:<br/>${oee[0].oee}%`;
        }
    },
    error => {
      console.log(error);
    });     
  }  
}
