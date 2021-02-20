
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SearchPetitionService} from './search-petition.service';

import {SearchPetitionComponent} from './search-petition/search-petition.component';
import {SearchPetitionRoutingModule} from './search-petition.routing';
import {SearchPetitionDetailComponent} from './search-petition-detail/search-petition-detail.component';
import {PanelModule, GrowlModule, CalendarModule, DataTableModule,InputSwitchModule,SharedModule, BlockUIModule,ButtonModule, ListboxModule, TabViewModule,  DialogModule, MessagesModule,
         SpinnerModule, InputTextareaModule, DataListModule, SelectButtonModule, TooltipModule } from 'primeng/primeng';
import {DatePipeFormatter} from '../search-petition/formatters/DatePipeFormatter';
import {XmlPipe} from '../search-petition/formatters/XmlFormater';
import { SearchPetitionConsultaAbiertaComponent } from './search-petition-consulta-abierta/search-petition-consulta-abierta.component';
import { SearchStatusDetailComponent } from './search-status-detail/search-status-detail.component';
import { HelpModule } from '../help/help.module';







@NgModule({
    imports: [
        CommonModule,
        SearchPetitionRoutingModule,
        PanelModule,
        FormsModule,
        GrowlModule,
        CalendarModule,
        ReactiveFormsModule,
        DataTableModule,
        InputSwitchModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        TooltipModule,
        HelpModule

    ],
    declarations: [SearchPetitionComponent,

        SearchPetitionDetailComponent, DatePipeFormatter,XmlPipe, SearchPetitionConsultaAbiertaComponent, SearchStatusDetailComponent],
    providers: [SearchPetitionService,SearchPetitionComponent,InputSwitchModule],

})
export class SearchPetitionModule {}



