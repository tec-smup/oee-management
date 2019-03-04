import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { Shift } from '../../models/shift';

@Injectable()
export class ShiftsService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    dropdown(): Observable<Shift[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(environment.shiftDropdownURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}