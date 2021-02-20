import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from './core.routing'

import {DataTableModule, SharedModule, BlockUIModule, PanelModule,
   DropdownModule,GrowlModule, ButtonModule, TooltipModule, TreeModule,
   CheckboxModule,DialogModule} from 'primeng/primeng';

import {CoreComponent} from './core/core.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CoreDashboardComponent} from './core-dashboard/core-dashboard.component';
import {MenuComponent} from './menu/menu.component';

import { CoreService } from './core.service';
import { LoginComponent } from './login/login.component';
@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
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
        DropdownModule,
        DialogModule
    ],
    declarations: [
        CoreComponent,
        CoreDashboardComponent,
        MenuComponent

    ],
    providers: [
      CoreService
    ],
})
export class CoreModule {}
