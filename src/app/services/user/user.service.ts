import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { User } from '../../models/user';

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
      return this.http.get(environment.userListURL)
          .map(res => res.json())
          .pipe(catchError(this.handleError));
  }

  add(user: User): Observable<User> {
      let headers = new Headers({ 'Content-Type': 'application/json' });                
      return this.http.post(environment.userAddURL, 
          JSON.stringify(user), { headers: headers })
          .map(res => res.json())
          .pipe(catchError(this.handleError));            
  }

  update(user: User): Observable<User> {
      let headers = new Headers({ 'Content-Type': 'application/json' });                
      return this.http.post(environment.userUpdateURL, 
          JSON.stringify(user), { headers: headers })
          .map(res => res.json())
          .pipe(catchError(this.handleError));         
  }
  
  delete(user: User): Observable<User> {
      let headers = new Headers({ 'Content-Type': 'application/json' });                
      return this.http.post(environment.userDeleteURL, 
          JSON.stringify(user), { headers: headers })
          .map(res => res.json())
          .pipe(catchError(this.handleError));         
  }  
}
