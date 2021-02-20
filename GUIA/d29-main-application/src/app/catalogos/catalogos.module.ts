import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, BlockUIModule, PanelModule,
   GrowlModule, ButtonModule, ListboxModule, TabViewModule, InputSwitchModule, DialogModule} from 'primeng/primeng';
import { CatalogosService } from './catalogos.service';
import { CatalogosRoutingModule } from './catalogos.routing';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { AccionesComponent } from './acciones/acciones.component';
import { FormatSelectItemPipe } from './transacciones/utils/FormatSelectItemPipe';
import {HelpModule} from '../help/help.module';

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
      ListboxModule,
      TabViewModule,
      CatalogosRoutingModule,
      HelpModule,
      InputSwitchModule,
      DialogModule
  ],
  declarations: [TransaccionesComponent, AccionesComponent, FormatSelectItemPipe],
  providers: [CatalogosService]
})
export class CatalogosModule { }
