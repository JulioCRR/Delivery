import {NgModule} from '@angular/core';
import {
    RouterModule, Routes,
    PreloadAllModules
} from '@angular/router';


import {LoginComponent} from './core/login/login.component';

import {AuthGuard} from './app.auth';
import {AuthService} from './app.service';

const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: './core/core.module#CoreModule',
        canLoad: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {path: '**', redirectTo: '/login'},
    {path: 'login', component: LoginComponent, canLoad: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
