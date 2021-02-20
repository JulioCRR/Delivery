import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {DataTableModule, SelectButtonModule, SharedModule, BlockUIModule, PanelModule, GrowlModule, ButtonModule, DialogModule, MessagesModule, TooltipModule, InputTextareaModule, DropdownModule} from 'primeng/primeng';
import {EncryptionCredentialService} from './encryption-credential.service';
import {EncryptionCredentialRoutingModule} from './encryption-credential.routing';
import {EncryptionComponent} from './encryption/encryption.component';
import { EncryptionValidateComponent } from './encryption-validate/encryption-validate.component';
import { HelpComponent} from './help/encryption_help.component';




@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SelectButtonModule,
        DataTableModule,
        SharedModule,
        GrowlModule,
        ButtonModule,
        BlockUIModule,
        PanelModule,
        EncryptionCredentialRoutingModule,
        TooltipModule,
        InputTextareaModule,
        DialogModule,
        MessagesModule,
        DropdownModule





    ],
    declarations: [EncryptionComponent, EncryptionValidateComponent, HelpComponent],
    providers: [
        EncryptionCredentialService
    ]
})
export class EncryptionCredentialModule {}
