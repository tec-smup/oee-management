import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { ChannelConfig } from "../../../models/channel.config";
import { ChannelService } from "../../../services/channel/channel.service";
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
            <label for="field1">Descrição do campo 1</label>
            <input 
              id="field1" 
              formControlName="field1"
              type="text" 
              class="form-control" 
              placeholder="Campo 1"/>
              <small id="field1" class="form-text text-muted">A descrição dete campo aparece na lista de medições do dia.</small>
          </div>
          <div class="form-group">
            <label for="field2">Descrição do campo 2</label>
            <input 
              id="field2" 
              formControlName="field2"
              type="text" 
              class="form-control" 
              placeholder="Campo 2"/>
              <small id="field2" class="form-text text-muted">A descrição dete campo aparece na lista de medições do dia.</small>
          </div>   
          <div class="form-group">
            <label for="field3">Descrição do campo 3</label>
            <input 
              id="field3" 
              formControlName="field3"
              type="text" 
              class="form-control" 
              placeholder="Campo 3"/>
              <small id="field3" class="form-text text-muted">A descrição dete campo aparece na lista de medições do dia.</small>
          </div>      
          <div class="form-group">
            <label for="field4">Descrição do campo 4</label>
            <input 
              id="field4" 
              formControlName="field4"
              type="text" 
              class="form-control" 
              placeholder="Campo 4"/>
              <small id="field4" class="form-text text-muted">A descrição dete campo aparece na lista de medições do dia.</small>
          </div>    
          <div class="form-group">
            <label for="field5">Descrição do campo 5</label>
            <input 
              id="field5" 
              formControlName="field5"
              type="text" 
              class="form-control" 
              placeholder="Campo 5"/>
              <small id="field5" class="form-text text-muted">A descrição dete campo aparece na lista de medições do dia.</small>
          </div> 
          <div class="form-group">
            <label for="refreshtime">Tempo de atualização</label>
            <input 
              id="refresh_time" 
              formControlName="refresh_time"
              type="number" 
              class="form-control" />
              <small id="refreshtime" class="form-text text-muted">Tempo de atualização do gráfico em segundos.</small>
          </div>  
          <div class="form-group">
            <label for="chart_tooltip_desc">Tooltip do gráfico</label>
            <input 
              id="chart_tooltip_desc" 
              formControlName="chart_tooltip_desc"
              type="text" 
              class="form-control" />
              <small id="chart_tooltip_desc" class="form-text text-muted">Esse tooltip aparece quando você passa o mouse sobre as linhas do gráfico. Não esqueça de informar o marcador __value. Ex: OEE: __value%</small>
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
   
  export class ConfigModalComponent implements OnInit {
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
        field1: ['', Validators.required],
        field2: ['', Validators.required],
        field3: ['', Validators.required],
        field4: ['', Validators.required],
        field5: ['', Validators.required],
        refresh_time: ['', Validators.required],
        chart_tooltip_desc: ['', Validators.required],
      });

      this.channelConfig = this.channelService.getChannelConfig(this.channelId)
      .pipe(
        tap(channelConfig => this.form.patchValue(channelConfig))
      );
    }

    confirm(event) {
      event.preventDefault();

      this.channelService.updateChannelConfig(this.form.value)
      .subscribe(
        result => {
          this.toastr.success("Configurações do canal atualizadas.", "Sucesso!", { enableHTML: true });
        },
        error => {
          this.toastr.error(error, "Oops!", { enableHTML: true });
        }
      );      
    }
  }