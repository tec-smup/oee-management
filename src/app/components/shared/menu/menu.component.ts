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
  productionCount: Array<any> = [];
  productionTypes: Array<string> = [];

  constructor(private dashboardService: DashboardService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) { 
    super();
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.channelIdSelected = changes.channelId && changes.channelId.currentValue != null ? 
      changes.channelId.currentValue : this.channelIdSelected;

    this.dateIniSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[0], true) : this.dateIniSelected;
    this.dateFinSelected = changes.date ? this.formatDateTimeMySQL(changes.date.currentValue[1], false) : this.dateFinSelected;
    
    if(this.channelIdSelected == 0)
      return;

    this.dashboardService.productionCount(this.dateIniSelected, this.dateFinSelected, this.channelIdSelected)
    .subscribe(
      result => {        
        //limpa array
        this.productionCount = [];

        //obtem os tipos de produção
        this.productionTypes = result.map(function(elem) {
          return elem.tipo;
        })
        .filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });

        //itera sobre os tipos para fazer o recalculo da produção
        this.productionTypes.forEach(f => {
          //mapeia array com o primeiro tipo
          let typeArray = result.filter(fi => fi.tipo === f)          
          .map(m => (
            {
              hora: m.hora,
              tipo: m.tipo,
              total: m.total,
              totalOld: m.total
            })
          );

          //faz calculo inverso: 1-0, 2-1, 3-2, etc
          typeArray.filter(function (object, index, array) {
            if(index === 0) {
              return object;
            }
            else {
              object.total -= array[index-1].totalOld;
              return object;
            }
          });
          this.productionCount.push(typeArray);  
        });
        console.log(this.productionCount);

      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });     
  }   
}
