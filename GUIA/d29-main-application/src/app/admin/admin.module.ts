import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {HttpModule} from '@angular/http';
import {ProfilesComponent} from './profiles/profiles.component';
import {DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, TooltipModule, TreeModule, CheckboxModule} from 'primeng/primeng';

import {AdminService} from './admin.service';

import {AdminRoutingModule} from './admin.routing';
import {ProfilesFormComponent} from './profiles-form/profiles-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        SharedModule,
        GrowlModule,
        ButtonModule,
        BlockUIModule,
        PanelModule,
        TooltipModule,
        TreeModule,
        CheckboxModule,
    ],
    declarations: [UserComponent, ProfilesComponent, ProfilesFormComponent, UserFormComponent],
    providers: [
        AdminService
    ]
})
export class AdminModule {}
