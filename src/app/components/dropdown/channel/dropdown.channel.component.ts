import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ChannelService } from '../../../services/channel/channel.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
 
@Component({
  selector: 'dropdown-channel',  
  templateUrl: './dropdown-channel.html',
})
export class DropdownChannelComponent implements OnInit {
  items: Array<any> = [];
  selectedChannelId: any;

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
      },
      error => {
        this.toastr.error(error, "Oops!", { enableHTML: true });
      });     
  }
}