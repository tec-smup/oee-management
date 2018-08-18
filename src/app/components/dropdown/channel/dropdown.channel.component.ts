import { Component, ViewContainerRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel.service';
import { ToastsManager } from 'ng2-toastr';
import { BaseComponent } from '../../base.component';
 
@Component({
  selector: 'dropdown-channel',  
  templateUrl: './dropdown-channel.html',
})
export class DropdownChannelComponent extends BaseComponent implements OnInit {
  items: Array<any> = [];
  selectedChannelId: any;
  @Input() listAll: boolean;
  @Output() changeEvent = new EventEmitter<any>();

  constructor(
    private channelService: ChannelService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    super();
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    if(this.listAll == true) {
      this.list();
    }
    else {
      this.listByUser();     
    }
  }

  private listByUser() {
    this.channelService.listByUser(this.getCurrentUser().id)
    .subscribe(
      result => {
        this.items = result.filter(f => f.active.toString() === "Ativo");
        if(this.items.length > 0) {
          this.selectedChannelId = this.items[0].id;
          this.refreshValue(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });    
  }

  private list() {
    this.channelService.listAll()
    .subscribe(
      result => {
        this.items = result.filter(f => f.active.toString() === "Ativo");
        if(this.items.length > 0) {
          this.selectedChannelId = this.items[0].id;
          this.refreshValue(this.items[0]);
        }
      },
      error => {
        this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
      });    
  }

  public refreshValue(value:any) {
    this.selectedChannelId = value.id;
    let channel = this.items.filter(f => f.id == this.selectedChannelId);    
    this.changeEvent.emit(channel[0]);
  }    
}