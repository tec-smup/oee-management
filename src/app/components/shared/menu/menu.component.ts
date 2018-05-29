import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() linkActive: string;
  currentUser;
  
  constructor() { 
    super();
  }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
  }
}
