import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MachineModalComponent } from "../modal/machine.modal.component";

@Component({
    selector: 'channel-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn btn-outline-secondary" (click)="channelMachineModal()" title="Máquinas do canal">
            <fa name="cogs"></fa>
        </button> 
        <button type="button" class="btn btn-outline-secondary" (click)="channelConfigModal()" title="Configurações do canal">
            <fa name="edit"></fa>
        </button>
        <button type="button" class="btn btn-outline-secondary" (click)="channelSQLModal()" title="Configurar SQL do gráfico e aplicativo">
            <fa name="code"></fa>
        </button>                     
    </div>      
    `,
})
export class ChannelGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
    }

    public channelMachineModal() {
        const initialState = {
            channelId: this.params.data.id,
            title: 'Máquinas do canal - ' + this.params.data.name
        };
        this.bsModalRef = this.modalService.show(MachineModalComponent, {initialState});
    }

    refresh(): boolean {
        return false;
    }
}