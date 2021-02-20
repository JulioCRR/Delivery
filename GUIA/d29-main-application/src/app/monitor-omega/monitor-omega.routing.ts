import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorOmegaComponent } from './monitor-omega/monitor-omega.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorOmegaComponent
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
export class MonitorOmegaRoutingModule {}
