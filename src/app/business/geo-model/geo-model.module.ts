import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSharedModule } from '@ngx-shared';
import { SharedModule } from '@shared';

import { GeoModelRoutingModule } from './geo-model-routing.module';
import { GeoModelComponent } from './geo-model.component';
import { ModelTreeComponent } from './model-tree/model-tree.component';
import { ModelIntroComponent } from './model-intro/model-intro.component';

import { ModelService } from './services';

const SERVICES = [ModelService];

@NgModule({
    imports: [NgxSharedModule, SharedModule, GeoModelRoutingModule],
    declarations: [GeoModelComponent, ModelTreeComponent, ModelIntroComponent],
    providers: [...SERVICES]
})
export class GeoModelModule {}
