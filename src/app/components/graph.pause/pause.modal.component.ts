import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { DashboardPause } from "../../models/dashboard.pause";

@Component({
    selector: 'modal-content',
    templateUrl: './pause.modal.component.html'
  })
   
  export class PauseModalComponent implements OnInit {
    pauses: Array<DashboardPause> = [];
   
    constructor(
      public bsModalRef: BsModalRef,
      public toastr: ToastsManager,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
      console.log(this.pauses);
    }

    confirm(event) {
      event.preventDefault();
      
    }
  }