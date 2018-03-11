import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { Machine } from '../../models/machine';
import { environment } from '../../../environments/environment';

@Injectable()
export class MachineService {
    token: string;

    constructor(private http: Http) {
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    list(): Observable<Machine[]> {
        return this.http.get(environment.machineListURL)
            .map(res => res.json());
    }

    addOrUpdate(machine: Machine): Observable<Machine> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.machineAddURL, 
            JSON.stringify(machine), { headers: headers })
            .map(res => res.json());            
    }    

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}