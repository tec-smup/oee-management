import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production-nominal',
  templateUrl: './machine.prod.nominal.component.html',
  styleUrls: ['./machine.prod.nominal.component.css']
})
export class MachineProductionNominalComponent implements OnInit, OnDestroy {
  
  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
                
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
