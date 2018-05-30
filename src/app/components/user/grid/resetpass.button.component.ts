import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'resetpass-button',
    template: `
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">
            <fa name="cog" animation="spin"></fa>
        </button>
    </div>      
    `,
})
export class ResetPassButtonRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        console.log(this.params.data);
        this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}