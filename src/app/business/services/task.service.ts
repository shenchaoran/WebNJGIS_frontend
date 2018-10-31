import { Topic, Task } from '@models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { _HttpClient } from '@core/services/http.client';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService extends ListBaseService {
    protected baseUrl = '/comparison/tasks';

    public taskList:Task[];

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
    ) { 
        super(http);
    }

    create() {
        this.userService.redirectIfNotLogined();
    }

    invoke(id: string): Observable<any> {
        if (id) {
            return this.http.post(`${this.baseUrl}/${id}/invoke`, undefined);
        } else {
            return undefined;
        }
    }

    insert(obj: {
        task: any,
        calcuTasks: any[]
    }): Observable<any> {
        return this.http.post(`${this.baseUrl}`, obj);
    }

    public findByUserId(userId) {
        this.clear();
        return this.http.get(`${this.baseUrl}`, {
            params: {
                userId: userId,
            }
        }).pipe(map(res => {
            if (!res.error) {
                this.taskList = res.data.docs;
                console.log(this.taskList[0]);
            }
            return res;
        }));
    }

    public clear() {
        this.taskList = [];
    }
}
