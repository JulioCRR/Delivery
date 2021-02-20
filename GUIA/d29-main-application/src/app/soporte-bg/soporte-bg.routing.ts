import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetallesEiComponent} from './detalles-ei/detalles-ei.component';

const routes: Routes = [
    {
        path: 'detalle-ei',
        component: DetallesEiComponent
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
export class SoporteBGRoutingModule {}
