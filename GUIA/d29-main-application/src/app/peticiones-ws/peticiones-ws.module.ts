import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {
  DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule,
  DropdownModule, SpinnerModule, InputSwitchModule, CalendarModule, CheckboxModule, TooltipModule,
  InputTextareaModule, SelectButtonModule, InputTextModule, AutoCompleteModule, MultiSelectModule,
  DialogModule
} from 'primeng/primeng';
import { PeticionesWSService } from './peticiones-ws.service';
import { PeticionesWSRoutingModule } from './peticiones-ws.routing';
import { SolicitudUsuarioCorpComponent } from './solicitud-usuario-corp/solicitud-usuario-corp.component';
import { SolicitudPeticionesWebComponent } from './solicitud-peticiones-web/solicitud-peticiones-web.component';
import { HelpModule } from '../help/help.module';
import { ListSolicitudesComponent } from './list-solicitudes/list-solicitudes.component';
import { ListSolUsuarioCorpComponent } from './list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component';
import { ListSolPeticionesWebComponent } from './list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component';
import { AdminPeticionesComponent } from './admin-peticiones/admin-peticiones.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    BlockUIModule,
    PanelModule,
    GrowlModule,
    ButtonModule,
    DropdownModule,
    SpinnerModule,
    InputSwitchModule,
    CalendarModule,
    CheckboxModule,
    TooltipModule,
    InputTextareaModule,
    SelectButtonModule,
    InputTextModule,
    AutoCompleteModule,
    MultiSelectModule,
    DialogModule,
    PeticionesWSRoutingModule,
    HelpModule
  ],
  declarations: [SolicitudUsuarioCorpComponent, SolicitudPeticionesWebComponent, ListSolicitudesComponent, ListSolUsuarioCorpComponent, ListSolPeticionesWebComponent, AdminPeticionesComponent],
  providers: [
    PeticionesWSService
  ]
})
export class PeticionesWSModule { }
