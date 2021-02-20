import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component'
import { SolicitudAmbienteComponent } from './solicitud-ambiente/solicitud-ambiente.component'
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component'

const routes: Routes = [
  {
    path: 'editarSolicitud',
    component: EditarSolicitudComponent
  },
  {
    path: 'solicitud',
    component: SolicitudAmbienteComponent
  },
  {
    path: '',
    component: CalendarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectAgendaRoutingModule { }
