import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';
import {TreeNode} from 'primeng/primeng';

export class SolicitudEI {
  constructor(
      public idSolicitud: number,
      public tramite: number,
      public grupoNacional: number,
      public tipo: string,
      public aplicacion: string,
      public estatus: string,
      public mensaje: string,
      public fechaIngreso: string,
      public fechaEjecucion: string,
      public envioRespuesta: string,
      public idComudidad: number,
  ) {}
}



export class DetalleSolicitud {
  constructor(
      public telefono: string,
      public region: string,
      public estatusDetalle: string,
      public codigoDetalle: string,
      public fechaEjecucionDetalle: string,
      public mensajeDetalle: string,
      public productoDetalle: string,
      public usuario: string,
      public tipoGrupo: string,
      public productoLocal: string,
      public productoNacional: string,
      public productoExt: string,
      public pivote: number,
      public serviceOffering: string,
      public estatusProductoLocal: string,
      public estatusProductoNacional: string,
      public estatusProductoExt: string,
      public banderaReproceso: boolean
  ) {}
}

export class MovimientoEI {
  constructor(
      public id: number,
      public idSolicitud: number,
      public telefono: string,
      public region: string,
      public consecutivo: number,
      public estatus: string,
      public mensaje: string,
      public fechaEjecucion: string,
      public grupoNacional: number,
      public producto: string,
      public tipo: number,
      public pivote: string,
      public idPeticion:string
  ) {}
}

export class ResponseSoporte{
  constructor(
    public mensaje: string,
    public respuesta: string
  ) {}
}

function toSolicitudEI(r: any): SolicitudEI {
  
   let solicitudEI = <SolicitudEI>({
       idSolicitud: r.idSolicitud,
       tramite: r.tramite,
       grupoNacional: r.grupoNacional,
       tipo: r.tipo,
       aplicacion: r.aplicacion,
       estatus: r.estatus,
       mensaje: r.mensaje,
       fechaIngreso: r.fechaIngreso,
       fechaEjecucion: r.fechaEjecucion,
       envioRespuesta: r.envioRespuesta,
       idComudidad: r.idComudidad
       
   });
   return solicitudEI;
}

function toDetalleSolicitud(r: any): DetalleSolicitud {
  let detalleSolicitud = <DetalleSolicitud>({
    telefono: r.telefono,
    region: r.region,
    estatusDetalle: r.estatusDetalle,
    codigoDetalle: r.codigoDetalle,
    fechaEjecucionDetalle: r.fechaEjecucionDetalle,
    mensajeDetalle: r.mensajeDetalle,
    productoDetalle: r.productoDetalle,
    usuario: r.usuario,
    tipoGrupo: r.tipoGrupo,
    productoLocal: r.productoLocal,
    productoNacional: r.productoNacional,
    productoExt: r.productoExt,
    pivote: r.pivote,
    serviceOffering: r.serviceOffering,
    estatusProductoLocal: r.estatusProductoLocal,
    estatusProductoNacional: r.estatusProductoNacional,
    estatusProductoExt: r.estatusProductoExt,
    banderaReproceso: r.banderaReproceso
  });
  return detalleSolicitud;  
}

function toMovimientoEI(r: any): MovimientoEI {
  
   let movimientoEI = <MovimientoEI>({
       id: r.id,
       idSolicitud: r.idSolicitud,
       telefono: r.telefono,
       region: r.region,
       consecutivo: r.consecutivo,
       estatus: r.estatus,
       mensaje: r.mensaje,
       fechaEjecucion: r.fechaEjecucion,
       grupoNacional: r.grupoNacional,
       producto: r.producto,
       tipo: r.tipo,
       pivote: r.pivote,
       idPeticion:r.idPeticion
   });
   return movimientoEI;
}

function toResponseSoporte(r: any): ResponseSoporte {
  
   let movimientoEI = <ResponseSoporte>({
       mensaje: r.mensaje,
       respuesta:r.respuesta
   });
   return movimientoEI;
}

function mapSolicitudEI(response: Response): SolicitudEI[] {
  let parsedIncidencias = response.json().map(toSolicitudEI);
  return parsedIncidencias;
}

function mapDetalleSolicitud(response: Response): DetalleSolicitud[] {
  let parsedDetalleSolicitud = response.json().map(toDetalleSolicitud);
  return parsedDetalleSolicitud;
}

function mapMovimientoEI(response: Response): MovimientoEI[] {
  let parsedDetalleSolicitud = response.json().map(toMovimientoEI);
  return parsedDetalleSolicitud;
}

function mapResponseSoporte(response: Response): ResponseSoporte[] {
  let parsedDetalleSolicitud = response.json().map(toResponseSoporte);
  return parsedDetalleSolicitud;
}

@Injectable()
export class SoporteBgService {

  private baseUrl: string = endpointServer.basePath + '/rest';

  constructor(private http: Http, public globalService: GlobalService) { }
  
  getSolitudesPorTelefono(telefono: string): Observable<SolicitudEI[]> {
    return this.globalService.get(`${this.baseUrl}/soporte-bg/consultaPorTelefono?telefono=${telefono}`,mapSolicitudEI);    
  }

  getDetalleSolicitud(telefono: string, idSolicitud: number, estatus:string): Observable<DetalleSolicitud[]> {
    return this.globalService.get(`${this.baseUrl}/soporte-bg/consultaDetalle?telefono=${telefono}&idSolicitud=${idSolicitud}&estatus=${estatus}`,mapDetalleSolicitud);    
  }
  
  getMovimientosEI(telefono: string, idSolicitud: number): Observable<MovimientoEI[]> {
    return this.globalService.get(`${this.baseUrl}/soporte-bg/consultaMovimientos?telefono=${telefono}&idSolicitud=${idSolicitud}`,mapMovimientoEI);    
  }
  
  activarTimer(): Observable<ResponseSoporte[]>{
    return this.globalService.get(`${this.baseUrl}/soporte-bg/activaTimerBG`,mapResponseSoporte);    
  }

  actualizaEstatusSolicitud(telefono: string, idSolicitud: number): Observable<ResponseSoporte[]> {
    return this.globalService.get(`${this.baseUrl}/soporte-bg/actualizaEstatusSolicitud?telefono=${telefono}&idSolicitud=${idSolicitud}`,mapResponseSoporte);    
  }

}
