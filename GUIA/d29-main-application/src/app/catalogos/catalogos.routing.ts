import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TransaccionesComponent} from './transacciones/transacciones.component';
import {AccionesComponent} from './acciones/acciones.component';
import {AuthGuard} from '../app.auth';

const adminRoutes: Routes = [
    {
        path: 'transacciones',
        component: TransaccionesComponent,
    },
    {
        path: 'acciones',
        component: AccionesComponent,
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
export class CatalogosRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license

rce code is governed by an MIT- style license that
can be found in the LICENSE file at http://angular.io/license
*/
