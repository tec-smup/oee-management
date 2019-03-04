import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SQLModalComponent } from "../modal/sql.modal.component";
import { ShiftModalComponent } from "../modal/shift.modal.component";

@Component({
    selector: 'channel-grid-buttons',
    template: `
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn btn-outline-secondary" (click)="machineSQLModal()" title="Configurar SQL do gráfico e aplicativo">
            <fa name="code"></fa>
        </button>   
        <button type="button" class="btn btn-outline-secondary" (click)="machineShift()" title="Configurar turno da máquina">
            <fa name="adjust"></fa>
        </button>          
    </div>     
    `
})
export class MachineGridButtonRenderer implements ICellRendererAngularComp {
    public params: any;
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    agInit(params: any): void {
        this.params = params;
    }

    public machineSQLModal() {
        const initialState = {
            machineCode: this.params.data.code,
            title: 'Configuração do SQL - [' + this.params.data.code + '] ' + this.params.data.name
        };
        this.bsModalRef = this.modalService.show(SQLModalComponent, {initialState});
    }

    public machineShift() {
        const initialState = {
            machineCode: this.params.data.code,
            title: 'Configurar turno - [' + this.params.data.code + '] ' + this.params.data.name
        };
        this.bsModalRef = this.modalService.show(ShiftModalComponent, {initialState});
    }    

    refresh(): boolean {
        return false;
    }
}