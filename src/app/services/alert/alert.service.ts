import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { Alert } from '../../models/alert';

@Injectable()
export class AlertService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    list(): Observable<Alert[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const channelId = localStorage.getItem('channelId');
        const url = environment.alertListURL.replace(':channelId', channelId);

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(alert: Alert): Observable<Alert> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                

        const channelId = localStorage.getItem('channelId');
        alert.channel_id = parseInt(channelId);

        return this.http.post(environment.alertAddURL, 
            JSON.stringify(alert), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(alert: Alert): Observable<Alert> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.alertUpdateURL, 
            JSON.stringify(alert), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(alert: Alert): Observable<Alert> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.alertDeleteURL, 
            JSON.stringify(alert), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }  
}
