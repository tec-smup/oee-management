import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { Sponsor } from '../../models/sponsor';

@Injectable()
export class SponsorService extends BaseService {
    constructor(private http: Http) {     
        super();
    }

    list(): Observable<Sponsor[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});
    
        const channelId = localStorage.getItem('channelId');
        const url = environment.sponsorListURL.replace(':channelId', channelId);

        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    add(sponsor: Sponsor): Observable<Sponsor> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                

        const channelId = localStorage.getItem('channelId');
        sponsor.channel_id = parseInt(channelId);

        return this.http.post(environment.sponsorAddURL, 
            JSON.stringify(sponsor), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(sponsor: Sponsor): Observable<Sponsor> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.sponsorUpdateURL, 
            JSON.stringify(sponsor), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
  
    delete(sponsor: Sponsor): Observable<Sponsor> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.sponsorDeleteURL, 
            JSON.stringify(sponsor), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }    
}
