import { NgModule } from '@angular/core';
import { NgUploaderModule } from 'ngx-uploader';
import { HotTableModule } from 'angular-handsontable';

import { DataInquireService } from "../../common/core/services/data.inquire.service";
import { MainWindowRoutingRoutes } from './main-window-routing.module';
import { NgxSharedModule } from '../../common/ngx-shared';
import { SharedModule } from '../../common/shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../common/core/net/token/token.interceptor';
import { ResParserInterceptor } from '../../common/core/net/res-parser/res-parser.interceptor';

import {
    MainWindowComponent,
    ManagerPanelComponent,
    ModelToolLibTreeComponent,
    ModelToolLibListComponent,
    DataToolLibListComponent,
    PropertyPanelComponent,
    DataListComponent,
    VisualListComponent,
} from './index';

import {
    ModelToolService,
    DataToolService,
    DataListService,
    VisualListService,
} from './services/index';

const COMPONENTS = [
    MainWindowComponent,
    ManagerPanelComponent,
    ModelToolLibTreeComponent,
    ModelToolLibListComponent,
    DataToolLibListComponent,
    PropertyPanelComponent,
    DataListComponent,
    VisualListComponent,
];

const SERVICES = [
    // DataInquireService,
    ModelToolService,
    DataToolService,
    DataListService,
    VisualListService,
];

@NgModule({
    imports: [
        NgxSharedModule,
        SharedModule,
        HotTableModule,
        NgUploaderModule,
        MainWindowRoutingRoutes,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        ...SERVICES,
        { provide: HTTP_INTERCEPTORS, useClass: ResParserInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        
    ]
})
export class MainWindowModule {}
