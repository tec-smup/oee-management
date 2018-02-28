import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http, 
              private router: Router,
              private user: UserService) { }  

  ngOnInit() {}

  loginUser(event) {
    event.preventDefault();
    let user = event.target.elements[0].value;
    let pass = event.target.elements[1].value;

    this.user.setUserLoggedIn();
    this.router.navigate(['dashboard']);

    console.log(user, pass);

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