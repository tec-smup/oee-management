import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { Dashboard } from '../../models/dashboard';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class DashboardService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    lastFeed(date: string, channelId: number, machineCode: string, userId: number): Observable<Dashboard> {

        return this.http.get(environment.lastFeedURL + "?date=" + date + "&ch_id=" + channelId.toString() + "&mc_cd=" + machineCode + "&userId=" + userId.toString())
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }   
    
    chart(date_ini: string, date_fin: string, ch_id: number, mc_cd: string): Observable<Dashboard["chart"][]> {
        let query = "?date_ini=" + date_ini 
            + "&date_fin=" + date_fin 
            + "&ch_id=" + ch_id 
            + "&mc_cd=" + mc_cd;
        return this.http.get(environment.chartURL + query)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}