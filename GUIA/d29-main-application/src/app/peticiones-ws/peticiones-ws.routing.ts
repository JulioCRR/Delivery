import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudUsuarioCorpComponent } from './solicitud-usuario-corp/solicitud-usuario-corp.component';
import { SolicitudPeticionesWebComponent } from './solicitud-peticiones-web/solicitud-peticiones-web.component';
import { ListSolicitudesComponent } from './list-solicitudes/list-solicitudes.component';
import { AdminPeticionesComponent } from './admin-peticiones/admin-peticiones.component';

const routes: Routes = [
  {
    path: 'solicitud_usuario_corp',
    component: SolicitudUsuarioCorpComponent,
  },
  {
    path: 'solicitud_peticiones_web',
    component: SolicitudPeticionesWebComponent,
  },
  {
    path: 'lista_solicitudes',
    component: ListSolicitudesComponent,
  },
  {
    path: 'admin_peticiones',
    component: AdminPeticionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeticionesWSRoutingModule { }
