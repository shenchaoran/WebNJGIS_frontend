import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MSService } from "../services/geo-models.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { DynamicTitleService } from '@core/services/dynamic-title.service';
import { ListBaseService, ListBaseComponent } from '@shared';

@Component({
    selector: 'ogms-geo-model-list',
    templateUrl: './geo-model-list.component.html',
    styleUrls: ['./geo-model-list.component.scss']
})
export class GeoModelListComponent extends ListBaseComponent implements OnInit {
    
    constructor(
        protected route: ActivatedRoute,
        protected service: MSService,
        protected _notice: NzNotificationService,
        protected title: DynamicTitleService
    ) { 
        super(route, service, _notice, title);
    }
}
