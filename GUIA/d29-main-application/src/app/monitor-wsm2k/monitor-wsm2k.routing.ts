import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonitorWsm2kComponent} from './monitor-wsm2k/monitor-wsm2k.component';
import {ReporteIncidenciasComponent} from './reporte-incidencias/reporte-incidencias.component';
import {ReporteTiemposComponent} from './reporte-tiempos/reporte-tiempos.component';
import {ReporteUsuariosComponent} from './reporte-usuarios/reporte-usuarios.component';
import {ReporteServiciosComponent} from './reporte-servicios/reporte-servicios.component';
import {ReporteInstanciasComponent} from './reporte-instancias/reporte-instancias.component';
import {AdministracionMonitoreoComponent} from './administracion-monitoreo/administracion-monitoreo.component';

const routes: Routes = [
    {
        path: 'monitor',
        component: MonitorWsm2kComponent
    },
	{
        path: 'reporte-incidencias',
        component: ReporteIncidenciasComponent
    },
	{
        path: 'reporte-tiempos',
        component: ReporteTiemposComponent
    },
	{
        path: 'reporte-usuarios',
        component: ReporteUsuariosComponent
    },
	{
        path: 'reporte-servicios',
        component: ReporteServiciosComponent
    },
	{
        path: 'reporte-instancias',
        component: ReporteInstanciasComponent
    },
    {
        path: 'administracion-monitoreo',
        component: AdministracionMonitoreoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MonitorWsm2kRoutingModule {}
