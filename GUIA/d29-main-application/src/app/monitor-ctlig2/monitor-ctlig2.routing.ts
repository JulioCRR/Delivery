import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MonitorCtlig2Component} from './monitor-ctlig2/monitor-ctlig2.component';
import {Ctlig2DetailComponent} from './ctlig2-detail/ctlig2-detail.component';
import {Ctlig2ListProcessComponent} from './ctlig2-list-process/ctlig2-list-process.component';
import {Ctlig2CronComponent} from './ctlig2-cron/ctlig2-cron.component';
import {AuthGuard} from '../app.auth';

const adminRoutes: Routes = [
    {
        path: '',
        component: MonitorCtlig2Component,
        children: [
            {
                path: 'historic',
                component: Ctlig2ListProcessComponent,
            },
            {
              path: 'cronCtlig2',
              component: Ctlig2CronComponent,
            },
            {
                path: ':id',
                component: Ctlig2DetailComponent,
            }
        ]
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MonitorCtlig2RoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license

rce code is governed by an MIT- style license that
can be found in the LICENSE file at http://angular.io/license
*/
