import { request } from 'http';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { AlertService } from '../../../alert.service';
import { endpointServer } from '../../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {M2kSolicitudCtg} from '../../modelo/M2kSolicitudCtg';
import {User} from '../../../admin/admin.service';
import { Subscription } from 'rxjs/Subscription';
import {CtgExecutionCommonService} from '../../ctg-execution.service';
import {GlobalService} from '../../../global.service';

@Component({
  selector: 'app-listadoSolicitudesCP',
  templateUrl: './listadoSolicitudesCP.component.html',
  styleUrls: ['./listadoSolicitudesCP.component.css']
})
export class ListadoSolicitudesCPCtgComponent implements OnInit, OnDestroy {
    
    private subscription: Subscription;

    private solicitudes: M2kSolicitudCtg[]=[];
    private seleccion: M2kSolicitudCtg[]=[];
    private selectedSolicitud: M2kSolicitudCtg;
    private usuario: User;
    private cols: any[];
    private accion: String;
    private displayFormConfirm: boolean;
    private displaySolicitudModal: boolean;
    private sortF: any;
    public enableButtons: String;

    constructor(private alertService: AlertService, 
        private ctgExecutionCommonService: CtgExecutionCommonService,
        private globalService: GlobalService) {
    }

    ngOnInit(): void {
        this.enableButtons = 'false';
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.displayFormConfirm = false;
        this.displaySolicitudModal = false;
        this.cols = [
            {field: 'folioGenerado', header: 'Folio'},
            {field: 'fecha_solicitud', header: 'Fecha Solicitud'},
            {field: 'hora_inicio', header: 'Hora Inicio'},
            {field: 'hora_fin', header: 'Hora Fin'},
            {field: 'transaccion', header: 'Transaccion'},
            {field: 'total_transacciones', header: 'No. de ejecuciones'},
            {field: 'solicitante', header: 'Solicitante'},
            {field: 'estatus', header: 'Estatus'}
        ];
        this.subscription = this.ctgExecutionCommonService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'consultarSolicitudesCP') {
                console.log(res.value);
                this.consultarSolicitudesCP(res.value);

            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getSolicitudesByUsuario(tipoSolicitud: any) {
      this.solicitudes = [];  
      this.ctgExecutionCommonService.listarSolicitudes(this.usuario.id, tipoSolicitud).subscribe(
          data => {this.solicitudes = data; console.log("SOLICITUDES -> ON SUSCRIBRE:", data);},
          err => {console.log(err);},
          () => console.log('done')
      );
    }

    actualizarSolicitudes(opcion: any){
        
        this.accion = opcion;
        
        if (this.seleccion.length == 0) {
            this.alertService.push({severity: 'error', summary: 'Solicitud sin datos', detail: "No se puede procesar una solicitud vacia. Favor de seleccionar al menos una solicitud!"});
        } else {
            this.displayFormConfirm = true;
        }
        
    }

    confirmDialog() {
     //EJECUTAR SOLICITUDES   
     this.ctgExecutionCommonService.actualizarSolicitudes(this.seleccion, this.accion).subscribe(
            data => {this.limpiarArray();
                    this.alertService.push({severity: 'info', summary: 'Acción Exitosa', detail: "Se ha completado la acción correctamente."});},
            err => {console.log(err);},
            () => {this.seleccion = [];
                    this.displayFormConfirm = false;
                    console.log('done');}
        );
        
    }

    rowTrackBy(index: number, row: any) { return row.id; }

    showSolicitud(sol: any) {
        console.log("SOLICITUD SELECCIONADA: ", sol);
        this.selectedSolicitud = sol;
        this.displaySolicitudModal = true;
    }

    limpiarArray() {
        this.seleccion.forEach(element => {
            const index = this.solicitudes.indexOf(element);
            this.solicitudes.splice(index,1);
        });
    }

    cancelDialog() {
        this.displayFormConfirm = false;
    }

    consultarSolicitudesCP(tipoSolicitud: any) {
        console.log("Tipo solicitud: " + tipoSolicitud);
        if (tipoSolicitud == 1) {
            console.log("HABILITANDO BOTONES.");
            this.enableButtons = 'true';
        } else {
            console.log("DESHABILITANDO BOTONES.");
            this.enableButtons = 'false';
        }
        this.seleccion =[];
        this.getSolicitudesByUsuario(tipoSolicitud);
    }

    changeSort(event) {
        if (!event.order) {
          this.sortF = 'year';
        } else {
          this.sortF = event.field;
        }
    }
}