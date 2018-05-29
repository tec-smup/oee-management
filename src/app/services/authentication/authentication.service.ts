import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Login } from '../../models/login';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable()
export class AuthenticationService {
    token: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(user: User): Observable<Login> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
                
        return this.http.post(environment.userAuthenticationURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => {
                let resJson = res.json();
                if(resJson.success) {
                    this.token = resJson.token;
                    localStorage.setItem('currentUser', JSON.stringify(resJson));                    
                }
                return resJson;
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}