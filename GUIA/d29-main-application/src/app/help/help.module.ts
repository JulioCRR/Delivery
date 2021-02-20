import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, DialogModule, MessagesModule,TooltipModule,GalleriaModule} from 'primeng/primeng';
import {SimpleHelpComponent} from '../help/simpleHelp/simple_help.component';
import {ImageHelpComponent} from '../help/imageHelp/image_help.component';
import {SimpleHelp} from '../help/model/SimpleHelpModel';
import {ImageHelp} from '../help/model/ImageHelpModel';

@NgModule({
  imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule,
        GrowlModule,
        ButtonModule,
        BlockUIModule,
        PanelModule,
        DialogModule,
        MessagesModule,
        TooltipModule,
        GalleriaModule
  ],
  declarations: [SimpleHelpComponent, ImageHelpComponent],
  providers: [],
  exports: [SimpleHelpComponent, ImageHelpComponent]
})
export class HelpModule { }