import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from '@shared';

@Injectable()
export class CmpSlnService extends ListBaseService {
    protected baseUrl = 'comparison/solutions';

    constructor(
        protected http: _HttpClient
    ) { 
        super(http);
    }
}
