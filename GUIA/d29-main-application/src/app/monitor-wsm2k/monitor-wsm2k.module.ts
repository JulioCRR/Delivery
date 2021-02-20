import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, TooltipModule, InputTextareaModule} from 'primeng/primeng';
import {MonitorWsm2kService} from './monitor-wsm2k.service';
import {MonitorWsm2kRoutingModule} from './monitor-wsm2k.routing';
import { MonitorWsm2kComponent } from './monitor-wsm2k/monitor-wsm2k.component';
import { ReporteIncidenciasComponent } from './reporte-incidencias/reporte-incidencias.component';
import { ReporteTiemposComponent } from './reporte-tiempos/reporte-tiempos.component';
import { ReporteUsuariosComponent } from './reporte-usuarios/reporte-usuarios.component';
import { ReporteServiciosComponent } from './reporte-servicios/reporte-servicios.component';
import { ReporteInstanciasComponent } from './reporte-instancias/reporte-instancias.component';
import { AdministracionMonitoreoComponent } from './administracion-monitoreo/administracion-monitoreo.component';

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
		MonitorWsm2kRoutingModule
  ],
  declarations: [MonitorWsm2kComponent, ReporteIncidenciasComponent, ReporteTiemposComponent, ReporteUsuariosComponent, ReporteServiciosComponent, ReporteInstanciasComponent, AdministracionMonitoreoComponent],
  providers: [
	MonitorWsm2kService
  ]
})
export class MonitorWsm2kModule { }
