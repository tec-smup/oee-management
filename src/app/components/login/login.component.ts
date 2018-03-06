import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserComponent = new UserComponent();
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }  

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(event) {
    event.preventDefault();
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
        .subscribe(result => {
            if (result === true) {
              this.router.navigate(['dashboard']);
            } 
            else {
                this.error = this.authenticationService.message;
                this.loading = false;
            }
        });
  }
} 