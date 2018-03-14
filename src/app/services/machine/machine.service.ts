import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { Machine } from '../../models/machine';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';

@Injectable()
export class MachineService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    list(): Observable<Machine[]> {
        return this.http.get(environment.machineListURL)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(machine: Machine): Observable<Machine> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machineAddURL, 
            JSON.stringify(machine), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(machine: Machine): Observable<Machine> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machineUpdateURL, 
            JSON.stringify(machine), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
    
    delete(machine: Machine): Observable<Machine> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machineDeleteURL, 
            JSON.stringify(machine), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }    
}