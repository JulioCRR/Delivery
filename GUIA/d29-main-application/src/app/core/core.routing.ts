import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreComponent} from './core/core.component';
import {CoreDashboardComponent} from './core-dashboard/core-dashboard.component';
import {AuthGuard} from '../app.auth';

const adminRoutes: Routes = [
    {
        path: '',
        component: CoreComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'admin',
                        loadChildren: '../admin/admin.module#AdminModule'
                    },
                    {
                        path: 'monitor-ctlig2',
                        loadChildren: '../monitor-ctlig2/monitor-ctlig2.module#MonitorCtlig2Module'
                    },
                    {
                        path: 'search-petition',
                        loadChildren: '../search-petition/search-petition.module#SearchPetitionModule'
                    },
                    {
                        path: 'encryption-credential',
                        loadChildren: '../encryption-credential/encryption-credential.module#EncryptionCredentialModule'
                    },
                    {
                        path: 'catalogos',
                        loadChildren: '../catalogos/catalogos.module#CatalogosModule'
                    },
                    {
                        path: 'ctg-executions',
                        loadChildren: '../ctg-execution/ctg-execution.module#CtgExecutionModule'
                    },
					{
                        path: 'soporte-bg',
                        loadChildren: '../soporte-bg/soporte-bg.module#SoporteBgModule'
                    },
                    // {
                    //     path: 'monitor-wsm2k',
                    //     loadChildren: '../monitor-wsm2k/monitor-wsm2k.module#MonitorWsm2kModule'
                    // },
                    {
                        path: 'monitor-omega',
                        loadChildren: '../monitor-omega/monitor-omega.module#MonitorOmegaModule'
                    },
                    {
                      path: 'agenda-ambiente',
                      loadChildren: '../agenda-ambiente/agenda-ambiente.module#AgendaAmbienteModule'
                    },
                    {
                      path: 'peticiones-ws',
                      loadChildren: '../peticiones-ws/peticiones-ws.module#PeticionesWSModule'
                    },
                    {path: '', component: CoreDashboardComponent},
                    {path: '**', redirectTo: ''}
                ]
            },
            {path: '**', redirectTo: '', canLoad: [AuthGuard]}
        ]
    },
    {path: '**', redirectTo: '', canLoad: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CoreRoutingModule {}
