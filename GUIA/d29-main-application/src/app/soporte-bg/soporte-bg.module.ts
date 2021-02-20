import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, TooltipModule, InputTextareaModule} from 'primeng/primeng';
import {SoporteBgService} from './soporte-bg.service';
import { DetallesEiComponent } from './detalles-ei/detalles-ei.component';
import {SoporteBGRoutingModule} from './soporte-bg.routing';

import {M2kInfoRegistro, SearchPetitionService} from '../search-petition/search-petition.service';


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
    SoporteBGRoutingModule
  ],
  declarations: [DetallesEiComponent],providers: [
    SoporteBgService,SearchPetitionService
    ]
  
})
export class SoporteBgModule { }
