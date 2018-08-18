import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { ChannelConfig } from "../../../models/channel.config";
import { ChannelService } from "../../../services/channel/channel.service";
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var $ :any;

@Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header">
        <h5 class="modal-title pull-left">{{title}}</h5>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form 
        *ngIf="channelConfig | async; else loading" [formGroup]="form"
          (ngSubmit)="form.valid && confirm($event)">

          <input 
              id="channel_id" 
              formControlName="channel_id"
              type="hidden" />

          <div class="form-group">
          
            <div id="accordion">              
              <div class="card">
                <div class="card-header" id="headingSQLChart">
                  <h5 class="mb-0">
                    <button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSQLChart" aria-expanded="false" aria-controls="collapseSQLChart">
                      Configurar SQL do Gráfico
                    </button>
                  </h5>
                </div>
                <div id="collapseSQLChart" class="collapse" aria-labelledby="headingSQLChart" data-parent="#accordion">
                  <div class="card-body">
                    <textarea 
                      id="chart_sql" 
                      formControlName="chart_sql"                      
                      class="form-control" 
                      rows="10" >
                    </textarea>
                    <small class="form-text text-muted">
                      <p>Esse é o SQL responsável por exibir os dados no gráfico.</p> 
                      <p>A regra é a seguinte: Quando esse SQL está preenchido, no gráfico, todas as máquinas vão exibir os valores conforme esse SQL.
                      Isso serve para casos onde várias máquinas fazem o mesmo trabalho. Agora se você precisa exibir um dado específico por máquina, faça essa
                      configuração no <a href="/machine">cadastro de máquinas</a>.</p>
                      <p><b>Colunas necessárias:</b></p>  
                      <p>labels (eixo X do gráfico)</p>  
                      <p>data (eixo Y do gráfico)</p>  
                      <p><b>Variáveis que podem ser utilizadas:</b></p>  
                      <p>__date_ini (formtado %d/%m/%Y %H:%i')</p>  
                      <p>__date_fin (formtado %d/%m/%Y %H:%i')</p>  
                      <p>__ch_id (id do canal)</p>  
                      <p>'__mc_cd' (código da máquina)</p>  
                      <p><b>Obs: Configuração de SQL da máquina se sobrepõe a esta.</b></p>     
                    </small>                                 
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingSQLMobile">
                  <h5 class="mb-0">
                    <button type="button" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSQLMobile" aria-expanded="false" aria-controls="collapseSQLMobile">
                      Configurar o SQL do Aplicativo
                    </button>
                  </h5>
                </div>
                <div id="collapseSQLMobile" class="collapse" aria-labelledby="headingSQLMobile" data-parent="#accordion">
                  <div class="card-body">
                    <textarea 
                      id="mobile_sql" 
                      formControlName="mobile_sql"                      
                      class="form-control" 
                      rows="10" >
                    </textarea>
                    <small class="form-text text-muted">
                      <p>Esse é o SQL responsável por exibir os dados no app.</p> 
                      <p>A regra é a seguinte: Quando esse SQL está preenchido, no app, todas as máquinas vão exibir os valores conforme esse SQL.
                      Isso serve para casos onde várias máquinas fazem o mesmo trabalho. Agora se você precisa exibir um dado específico por máquina, faça essa
                      configuração no <a href="/machine">cadastro de máquinas</a>.</p>
                      <p><b>Colunas necessárias:</b></p>  
                      <p>id (id da tabela feed)</p>  
                      <p>ch_id (id do canal na tabela feed)</p>  
                      <p>mc_cd (código da máquina na tabela feed)</p>
                      <p>mobile_name (pode ser o código da máquina ou a coluna mobile_name da tabela de máquinas)</p>
                      <p>campos necessários (field1 a field5)</p>
                      <p>time (hora do campo inserted_at da tabela feed no formato %H:%i:%s)</p>
                      <p>oee (fórmula definida pelos valores dos campos de 1 a 5)</p>
                      <p>field_desc (para cada campo exibido. Ex: se exibe o field1 busca a descrição do field1 na tabela feed_config)</p>
                      <p><b>Variáveis que podem ser utilizadas:</b></p>  
                      <p>__user_id (id do usuário)</p>  
                      <p>__date (formtado %d%m%Y)</p>  
                      <p>__ch_id (id do canal)</p>  
                      <p>'__mc_cd' (código da máquina)</p>
                      <p>__limit (quantidade de registros)</p>                        
                      <p><b>Obs: Configuração de SQL da máquina se sobrepõe a esta.</b></p> 
                    </small> 
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button 
            type="submit" 
            class="btn btn-outline-primary" 
            [disabled]="!form.valid">Confirmar</button>
        </form>
        <ng-template #loading>
          Carregando...
        </ng-template>        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
      </div>
      `
  })
   
  export class SQLModalComponent implements OnInit {
    title: string;
    channelId: number;
    form: FormGroup;
    channelConfig: Observable<ChannelConfig>;
   
    constructor(
      public bsModalRef: BsModalRef,
      private channelService: ChannelService,
      public toastr: ToastsManager,
      private formBuilder: FormBuilder,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
      this.form = this.formBuilder.group({
        channel_id: [''],
        chart_sql: [''],
        mobile_sql: [''],
      });

      this.channelConfig = this.channelService.getChannelConfig(this.channelId)
      .pipe(
        tap(channelConfig => this.form.patchValue(channelConfig))
      );
    }

    confirm(event) {
      event.preventDefault();
      //fecha acordion     
      $(".collapse").collapse('hide');

      this.channelService.updateChannelSQL(this.form.value)
      .subscribe(
        result => {
          this.toastr.success("Configurações de SQL do canal atualizadas.", "Sucesso!", { enableHTML: true, showCloseButton: true });
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );      
    }
  }