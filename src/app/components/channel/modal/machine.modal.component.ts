import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { ChannelMachine } from "../../../models/channel.machine";
import { Machine } from "../../../models/machine";
import { MachineService } from "../../../services/machine/machine.service";
import { BaseComponent } from "../../base.component";
import { ChannelService } from "../../../services/channel/channel.service";

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
        <div class="form-group">
          <dropdown-machine-no-cascade (changeEvent)="setMachine($event)"></dropdown-machine-no-cascade>
          <button type="button" class="btn btn-outline-primary" (click)="add()">Adicionar</button>
        </div>
        <table class="table table-hover table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let machine of machines">
              <td>{{machine.code}}</td>
              <td>{{machine.name}}</td>
              <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Acoes">
                  <button type="button" class="btn btn-outline-danger" (click)="delete(machine.code)" title="Remover máquina">
                    <fa name="minus-circle"></fa>
                  </button>
                </div>              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
      </div>
      `
  })
   
  export class MachineModalComponent extends BaseComponent implements OnInit {
    title: string;
    channelId: number;
    machines: Array<Machine> = [];
    channelMachine: ChannelMachine = new ChannelMachine();
   
    constructor(
      private machineService: MachineService,
      private channelService: ChannelService,
      public bsModalRef: BsModalRef,
      public toastr: ToastsManager,
      vcr: ViewContainerRef) {
        super();
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
      this.channelMachine.channelId = this.channelId;
      this.loadGrid();
    }

    loadGrid() {
      this.machineService.listByChannel(this.channelMachine.channelId)
      .subscribe(
        result => {
          this.machines = result;
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true });
        });      
    }

    setMachine(code) {
      this.channelMachine.machineCode = code;
    }

    add() {
      this.channelService.addMachine(this.channelMachine)
      .subscribe(
        result => {
          this.loadGrid();
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true });
        }
      );  
    }

    delete(machineCode: string) {
      this.channelMachine.machineCode = machineCode;

      this.channelService.deleteMachine(this.channelMachine)
      .subscribe(
        result => {
          this.loadGrid();
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true });
        }
      );          
    }
  }