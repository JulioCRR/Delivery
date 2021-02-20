import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { endpointServer } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { AuthService } from '../app.service';
import * as moment from 'moment';

import { SolicitudModel } from '../agenda-ambiente/model/SolicitudModel';
import {M2kCatTransacciones} from  '../agenda-ambiente/model/M2kCatTransaciones';
import {DiasInhablies} from  '../agenda-ambiente/model/DiasInhablies';

function mapDays(response: Response): DiasInhablies[] {
  let parseDaysIn: any;
  if (response.json() != null) {
    parseDaysIn = response.json().map(toDays);
  }
  return parseDaysIn;
}


function toDays(r: any): DiasInhablies {
  let diasInhabiles = <DiasInhablies>({
    id:r.id,
    diaInhabil:r.diaInhabil
  });
  return diasInhabiles;
}

function mapTrans(response: Response): M2kCatTransacciones[] {
  let parsedTrans: any;
  if (response.json() != null) {
    parsedTrans = response.json().map(toTrans);
  }
  return parsedTrans;
}

function toTrans(r: any): M2kCatTransacciones {
  let infotrans = <M2kCatTransacciones>({
      transaccion: r
  });
  return infotrans;
}



function mapSolicitudes(response: Response): SolicitudModel []{
  let detalleSol: any;
  if (response.json() != null) {
    detalleSol = response.json().map(toSolicitudes);
  }
  return detalleSol;
}



function toSolicitudes(r: any): SolicitudModel{

  let solicitudes = <SolicitudModel >({
    folio:r.folio,
    user:r.user,
    nomProyect:r.nomProyect,
    fechaInicio:extractDate(r.fechaInicio),
    fechaFinal:extractDate(r.fechaFinal),
    dias:r.dias,
    comentarios:r.comentarios,
    usuario:r.usuario,
    permisosIp:r.permisosIp,
    permisosTrans:r.permisosTrans,
    userMail:r.userMail,
    turno:r.turno,
    nomUser:r.nomUser
  });
  return   solicitudes;
}



function extractDate(date: Date): any {
  if (date == undefined) {
      return '';
  }
  var fechaInicio=moment(date).format('YYYY-MM-DD');
  return fechaInicio;
}



@Injectable()
export class AgendaAmbienteService {
  private baseUrl: string = endpointServer.basePath + '/rest';
  private moduleName: string = 'agenda-ambiente';
  private restUrl: string = this.baseUrl + '/' + this.moduleName;

  constructor(private http: Http, public globalService: GlobalService, public authService: AuthService) {}

  public eliminarSolicitud(folio:any) {
    console.log("SE ELIMINA LA SOLICITUD" + folio);
    return this.globalService.get(`${this.restUrl}/eliminarSolicitud?folio=${folio}`);
  }

  public agregarTrans(trans:any, folio:any) {
    console.log("SE AGREGA TRANSACCIONES " + trans);
    return this.globalService.get(`${this.restUrl}/agregarTrans?folio=${folio}&trans=${trans}`);
  }

  public agregarIp(ip:any, folio:any) {
    console.log("SE AGREGA IP " + ip);
    return this.globalService.get(`${this.restUrl}/agregarIps?folio=${folio}&ips=${ip}`);
  }

  public getTurnByFolio(folio:any){
    console.log("SE BUSCAN LAS IP'S DEL FOLIO "+folio);
    return this.globalService.get(`${this.restUrl}/obtenerTurno?folio=${folio}`);
  }

  public getIpsByFolio(folio:any){
    console.log("SE BUSCAN LAS IP'S DEL FOLIO "+folio);
    return this.globalService.get(`${this.restUrl}/obtenerIp?folio=${folio}`);
  }

  public getTransByFolio(folio:any){
    console.log("SE BUSCAN LAS TRANSACCIONES DEL FOLIO "+folio);
    return this.globalService.get(`${this.restUrl}/obtenerTrans?folio=${folio}`);
  }

  public getAgendaUser(starDate:any, idUser:any) {
    console.log("SOLICITA LA AGENDA DEL USUARIO" + idUser);
    return this.globalService.get(`${this.restUrl}/buscarAgendaUsuario?starDate=${starDate}&user=${idUser}`, mapSolicitudes);
  }

  public getLimiteAmbiente(): any {
    return this.globalService.get(`${this.restUrl}/limiteAmbiente`);
  }

  public getLimiteHabiles(): any{
    return this.globalService.get(`${this.restUrl}/limiteHabiles`);
  }

  public getLimiteReservacion(): any {
    console.log("peticon");
    return this.globalService.get(`${this.restUrl}/limiteReservacion`);
  }

  public getDiasInhabiles(): any {
    return this.globalService.get(`${this.restUrl}/validarDias`,mapDays);
  }


  public sendSolicitud(data: SolicitudModel) :any{
    return this.globalService.post(`${this.restUrl}/sendSolicitud`, data);
  }

  public validarAmbiente(data){
    console.log("VALIDAR" );
    return this.globalService.post(`${this.restUrl}/validarAmbiente`, data);
  }

  public getTrans(): any {
    return this.globalService.get(`${this.restUrl}/search-trans`, mapTrans);
  }

  public getAgenda(fecha:any):any {
    console.log("SOLICITAR LA AGENDA DEL USUARIO" + fecha);
    return this.globalService.get(`${this.restUrl}/obtener-agenda/${fecha}`, mapSolicitudes);
  }


  public getAgendaFolio(folio:any): any {
    console.log("SE SOLICITA PETICION  CON EL FOLIO" + folio);
    return this.globalService.get(`${this.restUrl}/obtener-agendafolio/${folio}`, mapSolicitudes);
  }

  public verificarSolicitud(data) :any{
    console.log("SE VALIDA LA PETICION");
    return this.globalService.post(`${this.restUrl}/validaSolicitud`,data);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
