import { Component, ViewContainerRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
@Component({
  selector: 'dropdown-channel',  
  templateUrl: './dropdown-channel.html',
})
export class DropdownChannelComponent implements OnInit {
  items: Array<any> = [];
  selectedChannelId: any;
  @Output() changeEvent = new EventEmitter<number>();

  constructor(
    private channelService: ChannelService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);              
  }

  ngOnInit() {  
    this.load();     
  }

  load() {
    this.channelService.list()
    .subscribe(
      result => {
        this.items = result;
        this.selectedChannelId = this.items[0].id;
        this.refreshValue(this.items[0]);
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });     
  }

  public refreshValue(value:any) {
    this.selectedChannelId = value.id;    
    this.changeEvent.emit(this.selectedChannelId);
  }    
}