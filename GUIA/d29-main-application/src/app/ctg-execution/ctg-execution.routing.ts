import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PruebasIgtocComponent} from '../ctg-execution/pruebasIgtoc/pruebasIgtoc.component';
import {SolicitudAmbienteComponent} from '../ctg-execution/solicitudAmbiente/solicitudAmbiente.component';
import {ListadoSolicitudesCtgComponent} from '../ctg-execution/listadoSolicitudes/listadoSolicitudes.component';
//import {AuthGuard} from '../app.auth';

const ctgRoutes: Routes = [
    {
        path: 'igtoc_test',
        component: PruebasIgtocComponent,
    },
    {
        path: 'solicitud_ambiente',
        component: SolicitudAmbienteComponent,
    },
    {
        path: 'list_solicitudes',
        component: ListadoSolicitudesCtgComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ctgRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CtgExecutionRoutingModule {}