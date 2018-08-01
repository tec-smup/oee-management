import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { Channel } from '../../models/channel';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { ChannelMachine } from '../../models/channel.machine';
import { ChannelConfig } from '../../models/channel.config';

@Injectable()
export class ChannelService extends BaseService {

    constructor(private http: Http) {
        super();
    }

    listByUser(userId: number): Observable<Channel[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.channelListURL.replace(":userId", userId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    listAll(): Observable<Channel[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.channelListAllURL;
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    

    add(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.channelAddURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));            
    }

    update(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.channelUpdateURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }
    
    delete(channel: Channel): Observable<Channel> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.channelDeleteURL, 
            JSON.stringify(channel), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    } 
    
    deleteMachine(channelMachine: ChannelMachine): Observable<ChannelMachine> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.channelDeleteMachineURL, 
            JSON.stringify(channelMachine), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     

    addMachine(channelMachine: ChannelMachine): Observable<ChannelMachine> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken() 
        });                
        return this.http.post(environment.channelAddMachineURL, 
            JSON.stringify(channelMachine), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }   
    
    getChannelConfig(channelId: number): Observable<ChannelConfig> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.channelConfigURL.replace(":channelId", channelId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }   

    updateChannelConfig(channelConfig: ChannelConfig): Observable<ChannelConfig> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.channelConfigUpdateURL, 
            JSON.stringify(channelConfig), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }    
    
    updateChannelSQL(channelConfig: ChannelConfig): Observable<ChannelConfig> { 
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });                
        return this.http.post(environment.channelSQLUpdateURL, 
            JSON.stringify(channelConfig), { headers: headers })
            .map(res => res.json())
            .pipe(catchError(this.handleError));         
    }     
}