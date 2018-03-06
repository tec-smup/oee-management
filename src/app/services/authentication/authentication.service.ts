import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public message: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

        var post = {
            username: username,
            password: password
        }

        return this.http.post('http://localhost:3000/oee/api/user/authentication', 
            "username=teste&password=teste", options)
            .map((response: Response) => {
                response = response.json();
                if(!response.success) {
                    this.message = response.message;
                    return false;   
                }
                this.token = response.token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
                return true;                 
                
                console.log(username, password);
                console.log(response);
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}