import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { Dashboard } from '../../models/dashboard';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { MachinePauseDash } from '../../models/machine.pause.dash';

@Injectable()
export class DashboardService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    lastFeed(dateIni: string, dateFin: string, channelId: number, machineCode: string, userId: number): Observable<Dashboard> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(environment.lastFeedURL + "?dateIni=" + dateIni + "&dateFin=" + dateFin + "&ch_id=" + channelId.toString() + "&mc_cd=" + machineCode + "&userId=" + userId.toString(), options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }   
    
    chart(date_ini: string, date_fin: string, ch_id: number, mc_cd: string): Observable<Dashboard["chart"][]> {
        let query = "?date_ini=" + date_ini 
            + "&date_fin=" + date_fin 
            + "&ch_id=" + ch_id 
            + "&mc_cd=" + mc_cd;

        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(environment.chartURL + query, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    exportChartExcel(date_ini: string, date_fin: string, ch_id: number, mc_cd: string) {
        let params = {
            date_ini: date_ini, 
            date_fin: date_fin, 
            ch_id: ch_id, 
            mc_cd: mc_cd
        };

        let headers = new Headers({ 
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({
            headers: headers,
            responseType: ResponseContentType.Blob,
            search: params             
        });
        
        return this.http.get(environment.exportChartExcelURL, options)
        .map(res => {
            return {
              filename: (new Date().getTime()) + '.xlsx',
              data: res.blob()
            };
        })
        .pipe(catchError(this.handleError));        
    }

    productionCount(dateIni: string, dateFin: string, channelId: number): Observable<Dashboard["production"][]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(environment.productionURL + "?dateIni=" + dateIni + "&dateFin=" + dateFin + "&ch_id=" + channelId.toString(), options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
    
    //sei la pq essa bosta nao funciona em outro serviço
    addPause(machinePause: MachinePauseDash[]): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.machinePauseDashAddURL, 
            JSON.stringify(machinePause), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }    
}