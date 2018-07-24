import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ChannelService } from "../../../services/channel/channel.service";
import { ToastsManager } from 'ng2-toastr';
import { Channel } from "../../../models/channel";

@Component({
    selector: 'modal-content',
    template: `
      <div class="modal-header">
        <h5 class="modal-title pull-left">{{title}}</h5>
        <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table table-hover table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Status</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let channel of channels">
              <td>{{channel.name}}</td>
              <td>{{channel.active}}</td>
              <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Acoes">
                  <button type="button" class="btn btn-outline-danger" title="Remover canal">
                    <fa name="minus-circle"></fa>
                  </button>
                </div>              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
      </div>
    `
  })
   
  export class UserChannelModalComponent implements OnInit {
    title: string;
    userId: number;
    closeBtnName: string;
    channels: Array<Channel> = [];
   
    constructor(
      public bsModalRef: BsModalRef,
      private channelService: ChannelService,
      public toastr: ToastsManager,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr); 
      }
   
    ngOnInit() {
      this.channelService.list(this.userId)
      .subscribe(
        result => {
          this.channels = result;
        },
        error => {
          this.toastr.error(error, "Oops!", { enableHTML: true });
        });
    }
  }