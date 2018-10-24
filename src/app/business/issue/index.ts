import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConversationModule } from '../conversation';
import { MatSharedModule } from '../../common/mat-shared';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { IssueRoutingModule } from './index-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';

const modules = [
    SharedModule,
    ConversationModule,
    IssueRoutingModule,
    MatSharedModule,
    SimplemdeModule.forRoot()
];
const components = [
    IssueDetailComponent,
    IssueListComponent,
    CreateIssueComponent,
];
const services = [];
const pipes = [];
const directives = [];

/**************************************************************/
/**************************************************************/

@NgModule({
    imports: [...modules],
    declarations: [
        ...components,
        ...pipes,
        ...directives
    ],
    providers: [...services]
})
export class IssueModule { }