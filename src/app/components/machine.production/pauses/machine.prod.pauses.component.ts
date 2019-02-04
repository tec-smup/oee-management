import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production-pauses',
  templateUrl: './machine.prod.pauses.component.html',
  styleUrls: ['./machine.prod.pauses.component.css']
})
export class MachineProductionPausesComponent implements OnInit, OnDestroy {
  
  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
