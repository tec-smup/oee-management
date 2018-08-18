import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastsManager } from 'ng2-toastr';
import { Channel } from "../../../models/channel";
import { UserService } from "../../../services/user/user.service";
import { User } from "../../../models/user";

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
        <form class="form-inline" 
          (ngSubmit)="changePass.form.valid && confirm($event)" #changePass="ngForm" novalidate>

          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
            <input 
              name="password" 
              [(ngModel)]="user.password" 
              #password="ngModel"            
              type="text" 
              class="form-control" 
              placeholder="Nova senha"
              required>
          </div>
          <button 
            type="submit" 
            class="btn btn-outline-primary" 
            [disabled]="!changePass.form.valid">Confirmar</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="bsModalRef.hide()">Fechar</button>
      </div>
      `
  })
   
  export class ChangePassModalComponent implements OnInit {
    title: string;
    userId: number;
    channels: Array<Channel> = [];
    user: User = new User();
   
    constructor(
      public bsModalRef: BsModalRef,
      private userService: UserService,
      public toastr: ToastsManager,
      vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);         
    }
   
    ngOnInit() {
      this.user.id = this.userId;
    }

    confirm(event) {
      event.preventDefault();
      this.userService.changePass(this.user)
      .subscribe(
        result => {
          this.toastr.success("Senha alterada.", "Sucesso!", { enableHTML: true, showCloseButton: true });
          this.user.password = "";
        },
        error => {
          this.toastr.error(error, "Erro!", { enableHTML: true, showCloseButton: true });
        }
      );      
    }
  }