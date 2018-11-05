import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { PauseReason } from '../../models/pause.reason';

@Injectable()
export class PauseReasonService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    dropdown(channelId: number): Observable<PauseReason[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.pauseReasonDropdownURL
            .replace(":channelId", channelId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}