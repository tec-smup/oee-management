import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { MachinePause } from '../../models/machine.pause';
import { MachinePauseList } from '../../models/machine.pause.list';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';

@Injectable()
export class MachinePauseService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    list(date: string, userId: number): Observable<MachinePauseList> {
        return this.http.get(environment.machinePauseListURL + '?dateIni=' + date + "&dateFin=" + date + "&userId=" + userId.toString())
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machinePauseAddURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machinePauseUpdateURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
    
    delete(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machinePauseDeleteURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }    
}