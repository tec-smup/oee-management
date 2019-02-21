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

    list(dateIni: string, dateFin: string, channelId: number, machineCode: string): Observable<MachinePauseList> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let params = {
            dateIni: dateIni,
            dateFin: dateFin,
            ch_id: channelId,
            mc_cd: machineCode
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
    
    pareto(channelId: number, machineCode: string, filter: number): Observable<MachinePauseList> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let params = {
            channel_id: channelId,
            machine_code: machineCode,
            filter: filter
        };
        let options = new RequestOptions({
            headers: headers, 
            search: params
        });

        return this.http.get(environment.machinePauseChartParetoURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    
}