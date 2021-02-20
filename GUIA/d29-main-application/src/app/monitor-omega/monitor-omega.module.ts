import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, SpinnerModule,
         TooltipModule, DialogModule, GalleriaModule } from 'primeng/primeng';
import { MonitorOmegaService } from './monitor-omega.service';
import { MonitorOmegaRoutingModule } from './monitor-omega.routing';
import { MonitorOmegaComponent } from './monitor-omega/monitor-omega.component';
import { HelpModule } from '../help/help.module';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    BlockUIModule,
    PanelModule,
    GrowlModule,
    ButtonModule,
    SpinnerModule,
    TooltipModule,
    DialogModule,
    GalleriaModule,
    MonitorOmegaRoutingModule,
    HelpModule
  ],
  declarations: [MonitorOmegaComponent],
  providers: [
    MonitorOmegaService
  ]
})
export class MonitorOmegaModule { }
