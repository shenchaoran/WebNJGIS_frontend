import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';

@Injectable()
export class DataService implements Resolve<any> {
    constructor(
        private http: _HttpClient
    ) {}

    resolve() {
        const promises = [
            this.getDataTabTree().toPromise(),
            this.getStdData().toPromise()
        ];
        return Promise.all(promises)
            .then(rsts => {
                if(rsts[0].error) {
                    return Promise.reject(rsts[0].error);
                }
                if(rsts[1].error) {
                    return Promise.reject(rsts[1].error);
                }
                
                localStorage.setItem('STD_DATA', JSON.stringify(rsts[1].data));
                
                return Promise.resolve({
                    std: rsts[1].data,
                    noStd: rsts[0].data
                });
            })
            .catch(Promise.reject);
    }

    getDataTabTree(): Observable<any> {
        return this.http.get('/data');
    }

    getStdData(): Observable<any> {
        return this.http.get('/data/std');
    }
}