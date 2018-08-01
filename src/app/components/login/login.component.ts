import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastsManager } from 'ng2-toastr';
import { User } from '../../models/user';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  user: User = new User();
  loading = false;
  message = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) {
    super();
    this.toastr.setRootViewContainerRef(vcr);
  }  

  ngOnInit() {
    this.authenticationService.logout();   
  }

  login(event) {
    event.preventDefault();
    this.loading = true;
    this.authenticationService.login(this.user)
        .subscribe(loginResult => {
            if (loginResult.success) {
              this.authenticationService.getUserDataByToken(this.getToken())
              .subscribe(userData => {
                this.router.navigate(['dashboard']);
              },
              error => {
                this.toastr.error("Parece que houve um problema com o servidor, tente daqui a pouco...", "Erro!");
                this.loading = false;
              });
            }
            else {
              this.message = loginResult.message;
              this.loading = false;
            }
        },
        error => {
          this.toastr.error("Parece que houve um problema com o servidor, tente daqui a pouco...", "Erro!");
          this.loading = false;
        });
  }
} 