import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production-oee',
  templateUrl: './machine.prod.oee.component.html',
  styleUrls: ['./machine.prod.oee.component.css']
})
export class MachineProductionOeeComponent implements OnInit, OnDestroy {
  
  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
