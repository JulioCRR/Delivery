import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, BlockUIModule, PanelModule, LightboxModule,
  GrowlModule, ButtonModule, ListboxModule, TabViewModule, OverlayPanelModule,
  DropdownModule, CalendarModule, InputMaskModule, ProgressBarModule,
  SpinnerModule, AutoCompleteModule, ScheduleModule, DialogModule, TooltipModule ,InputTextModule,ConfirmDialogModule,MultiSelectModule} from 'primeng/primeng';

import { AgendaAmbienteService } from './agenda-ambiente.service';
import { ProjectAgendaRoutingModule } from './agenda-ambiente.routing';
import { CalendarComponent } from './calendar/calendar.component';
import { HelpModule } from '../help/help.module';


import { SolicitudAmbienteComponent } from './solicitud-ambiente/solicitud-ambiente.component';
import { CatalogosService } from '../catalogos/catalogos.service';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';





@NgModule({
  imports: [

    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    BlockUIModule,
    PanelModule,
    GrowlModule,
    ButtonModule,
    ListboxModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    InputMaskModule,
    ProgressBarModule,
    OverlayPanelModule,
    SpinnerModule,
    LightboxModule,
    AutoCompleteModule,
    ScheduleModule,
    DialogModule,
    TooltipModule,
    ProjectAgendaRoutingModule,
    HelpModule,
    InputTextModule,
    ConfirmDialogModule,
    MultiSelectModule
  ],
  declarations: [CalendarComponent, SolicitudAmbienteComponent,EditarSolicitudComponent],
  providers: [
    AgendaAmbienteService, CatalogosService
  ]

})
export class AgendaAmbienteModule { }
