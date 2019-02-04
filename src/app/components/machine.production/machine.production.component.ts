import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';

@Component({
  selector: 'app-machine-production',
  templateUrl: './machine.production.component.html',
  styleUrls: ['./machine.production.component.css']
})
export class MachineProductionComponent extends BaseComponent implements OnInit, OnDestroy {
  
  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();             
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
