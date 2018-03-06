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

    console.log(this.user.username, this.user.password);

    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
        .subscribe(result => {
            if (result === true) {
              this.router.navigate(['dashboard']);
            } 
            else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
  }
}

  // app.use(function(req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     next();
  //   }); 