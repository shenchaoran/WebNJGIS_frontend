import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { OlMapModule } from '@feature/ol-map/ol-map.module';
import { CmpSharedModule } from '../cmp-shared';
import { ComparisonRoutingModule } from './comparison-routing.module';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionDetailComponent } from './solution-detail/solution-detail.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { CmpSlnService } from './services/cmp-sln.service';
import { CmpTaskService } from '../results/services/cmp-task.service';
import { CmpMethodService } from './services/cmp-method.service';
import { NzNotificationService, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { MethodDetailComponent } from './method-detail/method-detail.component';
import { MethodListComponent } from './method-list/method-list.component';

export * from './services/cmp-sln.service';

@NgModule({
    imports: [
        SharedModule,
        ComparisonRoutingModule,
        OlMapModule,
        CmpSharedModule,
    ],
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
        TaskConfigComponent,
        MethodDetailComponent,
        MethodListComponent,
    ],
    providers: [
        CmpSlnService,
        CmpTaskService,
        CmpMethodService,
        NzNotificationService,
    ]
})
export class ComparisonModule { }
