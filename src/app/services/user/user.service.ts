import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { User } from '../../models/user';
import { UserChannel } from '../../models/user.channel';

@Injectable()
export class UserService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    isUserLoggedIn() {
    if(localStorage.getItem('currentUser')) {
        return true;
    }
    return false;
    }

    list(): Observable<User[]> {
    let headers = new Headers({ 
        'Content-Type': 'application/json',
        'x-access-token': this.getToken()
    });
    let options = new RequestOptions({headers: headers});
            
        return this.http.get(environment.userListURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(user: User): Observable<User> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.userAddURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(user: User): Observable<User> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.userUpdateURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(user: User): Observable<User> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.userDeleteURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  

    addChannel(userChannel: UserChannel): Observable<UserChannel> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.userChannelAddURL, 
            JSON.stringify(userChannel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }
    
    deleteChannel(userChannel: UserChannel): Observable<UserChannel> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.userChannelDeleteURL, 
            JSON.stringify(userChannel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  

    changePass(user: User): Observable<User> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.userChangePassURL, 
            JSON.stringify(user), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }   
}
