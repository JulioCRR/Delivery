import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EncryptionComponent} from './encryption/encryption.component';
import {EncryptionValidateComponent} from './encryption-validate/encryption-validate.component';

const routes: Routes = [
    {
        path: 'generate',
        component: EncryptionComponent
    },
    {
        path: 'validate',
        component: EncryptionValidateComponent
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
export class EncryptionCredentialRoutingModule {}
