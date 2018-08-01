import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Login } from '../../models/login';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { BaseService } from '../base.service';



@Injectable()
export class AuthenticationService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    login(user: User): Observable<Login> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
                
        return this.http.post(environment.userAuthenticationURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => {
                let resJson = res.json();
                if(resJson.success) {
                    localStorage.setItem('token', resJson.token);                    
                }
                return resJson;
            });
    }

    getUserDataByToken(token: string): Observable<User> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        let options = new RequestOptions({headers: headers});
                
        let url = environment.userGetDataByTokenPassURL;
        return this.http.get(url, options)
            .map(res => {
                let resJson = res.json();
                localStorage.setItem('currentUser', JSON.stringify(resJson)); 
                return resJson;
            })
            .pipe(catchError(this.handleError));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }
}