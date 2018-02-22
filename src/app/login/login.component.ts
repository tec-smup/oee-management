import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login - OEE Management';

    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   }); 

  constructor(http: Http) {
    let stream = http.get('http://paul8liveira.blog.br/oee/api/1/get?token=67RRJQRANOMPQ30Q&fields=1,2,3,4,5&results=2');
    stream.subscribe(response => {
      console.log(response.json());
    });
  }
}
