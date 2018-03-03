import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserComponent = new UserComponent();

  constructor(private http: Http, 
              private router: Router,
              private userService: UserService) { }  

  ngOnInit() {}

  loginUser(event) {
    event.preventDefault();

    this.userService.setUserLoggedIn();
    this.router.navigate(['dashboard']);

    console.log(this.user.username, this.user.password);

    // this.http.get('http://paul8liveira.blog.br/oee/api/1/get?token=67RRJQRANOMPQ30Q&fields=1,2,3,4,5&results=2')
    //     .map(response => response.json())
    //     .subscribe(
    //       response => {
    //         console.log(response);
    //       }, 
    //       error => console.log(error)
    //     );    
    // return false;
  }
}

  // app.use(function(req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     next();
  //   }); 