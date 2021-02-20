import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchPetitionComponent} from './search-petition/search-petition.component';
import {SearchPetitionDetailComponent} from './search-petition-detail/search-petition-detail.component';



import {AuthGuard} from '../app.auth';

const adminRoutes: Routes = [
    {
        path: '',
        component: SearchPetitionComponent,
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
export class SearchPetitionRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license

rce code is governed by an MIT- style license that
can be found in the LICENSE file at http://angular.io/license
*/
