import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user/user.component';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfilesFormComponent} from './profiles-form/profiles-form.component';
import {UserFormComponent} from './user-form/user-form.component';

import {AuthGuard} from '../app.auth';

const adminRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: ':id',
                component: UserFormComponent,
            }
        ]
    },
    {
        path: 'profile',
        component: ProfilesComponent,
        children: [
            {
                path: ':id',
                component: ProfilesFormComponent,
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
export class AdminRoutingModule {}
