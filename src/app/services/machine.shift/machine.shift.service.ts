import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { MachineShift } from '../../models/machine.shift';

@Injectable()
export class MachineShiftService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(machineCode: string): Observable<MachineShift[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
        let url = environment.machineShiftListURL.replace(':machineCode', machineCode);
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(machineShift: MachineShift): Observable<MachineShift> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.machineShiftURL, 
            JSON.stringify(machineShift), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  
    
    delete(id: number): Observable<MachineShift> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.machineDeleteShiftURL, 
            JSON.stringify({id: id}), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));        
    }       
}