import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, BlockUIModule, PanelModule,
   GrowlModule, ButtonModule, ListboxModule, TabViewModule, InputSwitchModule, DialogModule, MessagesModule,
  CalendarModule, SpinnerModule, InputTextareaModule, DataListModule, SelectButtonModule, TooltipModule, DropdownModule} from 'primeng/primeng';
import {CtgExecutionRoutingModule} from '../ctg-execution/ctg-execution.routing';
import {PruebasIgtocComponent} from '../ctg-execution/pruebasIgtoc/pruebasIgtoc.component';
import {SolicitudAmbienteComponent} from '../ctg-execution/solicitudAmbiente/solicitudAmbiente.component';
import {CtgHelpComponent} from '../ctg-execution/help/ctg_help.component';
import {ListadoSolicitudesCtgComponent} from '../ctg-execution/listadoSolicitudes/listadoSolicitudes.component';
import {ListadoSolicitudesCPCtgComponent} from '../ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component';
import {ListadoSolicitudesSPCtgComponent} from '../ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component';
import {CtgExecutionCommonService} from '../ctg-execution/ctg-execution.service';
import {DatePipeFormatter} from '../ctg-execution/formatters/DatePipeFormatter';
import {UpperCasePipeFormatter} from '../ctg-execution/formatters/UpperCasePipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    GrowlModule,
    ButtonModule,
    BlockUIModule,
    PanelModule,
    ListboxModule,
    TabViewModule,
    InputSwitchModule,
    DialogModule,
    MessagesModule,
    CalendarModule,
    SpinnerModule,
    InputTextareaModule,
    DataListModule,
    SelectButtonModule,
    CtgExecutionRoutingModule,
    TooltipModule,
	DropdownModule
  ],
  declarations: [PruebasIgtocComponent, SolicitudAmbienteComponent, ListadoSolicitudesCtgComponent,
  ListadoSolicitudesCPCtgComponent, ListadoSolicitudesSPCtgComponent, DatePipeFormatter,
  CtgHelpComponent, UpperCasePipeFormatter],
  providers: [CtgExecutionCommonService]
})
export class CtgExecutionModule { }
