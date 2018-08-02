import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { MachinePause } from '../../models/machine.pause';
import { MachinePauseList } from '../../models/machine.pause.list';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';

@Injectable()
export class MachinePauseService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(date: string, userId: number): Observable<MachinePauseList> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let params = {
            dateIni: date,
            dateFin: date,
            userId: userId
        };
        let options = new RequestOptions({
            headers: headers, 
            search: params
        });

        return this.http.get(environment.machinePauseListURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.machinePauseAddURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.machinePauseUpdateURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
    
    delete(machinePause: MachinePause): Observable<MachinePause> {
        let headers = new Headers({ 
            'Content-Type': 'application/json', 
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.machinePauseDeleteURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }    
}