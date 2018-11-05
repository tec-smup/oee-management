import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { MachinePauseDash } from "../../models/machine.pause.dash";
import { DashboardService } from "../../services/dashboard/dashboard.service";

@Component({
    selector: 'modal-content',
    templateUrl: './pause.modal.component.html'
  })
   
  export class PauseModalComponent implements OnInit {
    pauses: Array<MachinePauseDash> = [];
    title: string;
    channelId: number;
    success: boolean = false;
   
    constructor(
      public bsModalRef: BsModalRef,
      public toastr: ToastsManager,
      vcr: ViewContainerRef,
      private dashboardService: DashboardService) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
    }

    confirm() {
      this.pauses.forEach(f => {       
        this.dashboardService.addPause(f)
        .subscribe(
          result => {
            this.success = true;
            console.log(result);   
            this.bsModalRef.hide();         
          },
          error => {
            this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
          }
        ); 
      });
    }

    setPauseReason($event) {
      this.pauses.forEach(f => {
        f.pause_reason_id = $event.id;
      });
    }
  }