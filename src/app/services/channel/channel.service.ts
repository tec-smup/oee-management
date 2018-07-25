import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { Channel } from '../../models/channel';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';

@Injectable()
export class ChannelService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    listByUser(userId: number): Observable<Channel[]> {
        let url = environment.channelListURL.replace(":userId", userId.toString());
        return this.http.get(url)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    listAll(): Observable<Channel[]> {
        let url = environment.channelListAllURL;
        return this.http.get(url)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    

    add(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.channelAddURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.channelUpdateURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
    
    delete(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });                
        return this.http.post(environment.channelDeleteURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
}