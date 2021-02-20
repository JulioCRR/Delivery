import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule} from 'primeng/primeng';

import {MonitorCtlig2RoutingModule} from './monitor-ctlig2.routing';

import {MonitorCtlig2Service} from './monitor-ctlig2.service';
import {MonitorCtlig2Component} from './monitor-ctlig2/monitor-ctlig2.component';
import {Ctlig2ListComponent} from './ctlig2-list/ctlig2-list.component';
import {Ctlig2ListDetailComponent} from './ctlig2-list-detail/ctlig2-list-detail.component';
import {Ctlig2DetailComponent} from './ctlig2-detail/ctlig2-detail.component';
import { Ctlig2ListProcessComponent } from './ctlig2-list-process/ctlig2-list-process.component';
import { Ctlig2CronComponent } from './ctlig2-cron/ctlig2-cron.component';



@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        DataTableModule,
        SharedModule,
        GrowlModule,
        ButtonModule,
        BlockUIModule,
        PanelModule,
        MonitorCtlig2RoutingModule
    ],
    declarations: [MonitorCtlig2Component,
        Ctlig2ListComponent,
        Ctlig2ListDetailComponent,
        Ctlig2DetailComponent,
        Ctlig2ListProcessComponent,
        Ctlig2CronComponent],
    providers: [
        MonitorCtlig2Service
    ]
})
export class MonitorCtlig2Module {}
