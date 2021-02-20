import { request } from 'http';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AlertService } from '../../alert.service';
import { endpointServer } from '../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {User} from '../../admin/admin.service';
import { SelectItem } from 'primeng/primeng';
import {Input} from '@angular/core';
import {CtgExecutionCommonService} from '../ctg-execution.service';
import { Subscription } from 'rxjs/Subscription';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-listadoSolicitudes',
  templateUrl: './listadoSolicitudes.component.html',
  styleUrls: ['./listadoSolicitudes.component.css']
})
export class ListadoSolicitudesCtgComponent implements OnInit {
    
    private usuario: User;
    private permiso: String;
    private opcionesSolicitud: SelectItem[];
    private selectOption: any;

    constructor(private alertService: AlertService, 
        private ctgExecutionCommonService: CtgExecutionCommonService, 
        private globalService: GlobalService) {
    }

    ngOnInit(): void {
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.opcionesSolicitud = [
            {label:'INACTIVAS', value:1},
            {label:'ACTIVAS', value:2},
            {label:'RECHAZADAS', value:3},
            {label:'CANCELADAS', value:4},
            {label:'COMPLETADAS', value:5},
        ];
        this.consultarPermisos();    
    }
    
    consultarPermisos() {
        this.ctgExecutionCommonService.obtenerPermisos(this.usuario.id).subscribe(
            data => {
                    this.permiso = data.permiso;
                    },
            err => {console.log(err);},
            () => {console.log('done');}
        );
    }

    consultarSolicitudes() {
        if (this.permiso == 'CP') {
            this.ctgExecutionCommonService.notifyOther({option: 'consultarSolicitudesCP', value: this.selectOption});
        } else {
            this.ctgExecutionCommonService.notifyOther({option: 'consultarSolicitudesSP', value: this.selectOption});
        }

    }
}