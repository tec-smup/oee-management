import { Component, OnInit, Input, SimpleChange, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { environment } from '../../../../environments/environment';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() linkActive: string;
  currentUser;
  docsURL: string = environment.docsURL; 

  constructor(
    public toastr: ToastsManager, 
    vcr: ViewContainerRef) { 
    super();
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }

  ngOnDestroy() {
  }  
}
