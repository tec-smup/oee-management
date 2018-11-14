import { Component, OnInit, Input, SimpleChange, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() linkActive: string;
  currentUser;
  docsURL: string = environment.docsURL;
  @Input() channelId: number;
  channelIdSelected:  number = 0;
  @Input() date: Date[];
  dateIniSelected: string;
  dateFinSelected: string;  
  //productionCount: Array<any> = [];
  //intervalTimer: any;

  constructor(/*private dashboardService: DashboardService,*/
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) { 
    super();
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }

  ngOnDestroy() {
    //clearInterval(this.intervalTimer);
  }  

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.channelIdSelected = changes.channelId && changes.channelId.currentValue != null ? 
      changes.channelId.currentValue : this.channelIdSelected;

    this.dateIniSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[0], true) : this.dateIniSelected;
    this.dateFinSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[1], false) : this.dateFinSelected;
    
    if(this.channelIdSelected == 0)
      return;

    // this.getData();
    // let sec = 60;
    // clearInterval(this.intervalTimer);
    // this.intervalTimer = setInterval(
    //   () => {
    //     sec--;
    //     if(sec == 0) {
    //       sec = 60;
    //       this.getData();
    //     }
    //   }, 1000);      
    
  }
  
  // getData() {
  //   let type: number = 1;
  //   this.dashboardService.productionCount(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected, type)
  //   .subscribe(
  //     result => {
  //       this.productionCount = [];
        
  //       //pega colunas para exibir na lista
  //       let columsArray = [];
  //       for(let col in result[0]) {
  //         if(col.indexOf("MAQ_") > -1)
  //           columsArray.push(col.replace("MAQ_",""));
  //       }

  //       let totalizador = {
  //         totalHora : 0,
  //         mediaTaxa: 0
  //       };

  //       //faz calculo inverso: 1-0, 2-1, 3-2, etc
  //       for(let i = 0; i < result.length; i++) {            
  //         if(i > 0) {
  //           let total = result[i].total -= result[i-1].total_ref;
  //           result[i].total = total < 0 ? 0 : total; //controle para negativos
            
  //           let taxa = Math.round((result[i].taxa - result[i-1].taxa_ref) * 100) / 100;
  //           result[i].taxa = taxa < 0 ? 0 : taxa; //controle para negativos
  //         }            
  //         totalizador.totalHora += result[i].total;
  //         totalizador.mediaTaxa += result[i].taxa;
  //       }
  //       totalizador.mediaTaxa = Math.round((totalizador.mediaTaxa / result.length) * 100) / 100;
        
  //       this.productionCount.push(result);          
  //       this.productionCount.push(totalizador);
  //       this.productionCount.push(columsArray);
  //       console.log(this.productionCount);
  //     },
  //     error => {
  //       this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
  //     });     
  // }
}
