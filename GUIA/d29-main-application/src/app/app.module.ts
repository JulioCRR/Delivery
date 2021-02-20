import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {LoginComponent} from './core/login/login.component';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {GlobalService} from './global.service';
import {AlertService} from './alert.service';
import {GrowlModule, DataTableModule,CheckboxModule} from 'primeng/primeng';
import { WebSocketService } from 'angular2-websocket-service';
import {HelpModule} from 'app/help/help.module';
import { CoreService } from './core/core.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        GrowlModule,
        DataTableModule,
        CheckboxModule,
        HelpModule,
        BrowserAnimationsModule
    ],
    providers: [CookieService, GlobalService, AlertService,WebSocketService,CoreService],
    bootstrap: [AppComponent]
})
export class AppModule {}
