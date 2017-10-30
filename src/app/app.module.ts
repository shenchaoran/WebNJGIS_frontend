import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppTranslationModule } from './app.translation.module';
import { NgxSharedModule } from './common/ngx-shared/ngx-shared.module';
import { SharedModule } from './common/shared/shared.module';
import { CoreModule } from './common/core/core.module';
import { routing } from './app.routing';
import { App } from './app.component';
// import { TokenInterceptor } from './common/core/net/token/token.interceptor';

@NgModule({
    bootstrap: [App],
    declarations: [App],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BrowserAnimationsModule,

        RouterModule,
        routing,

        NgxSharedModule,
        AppTranslationModule,
        SharedModule.forRoot(),
        CoreModule
    ],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ]
})
export class AppModule {}
