import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { endpointServer } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { User } from '../admin/admin.service';
import { ResponsableUsuarioCorp, mapResponsableUsuarioCorp } from './model/ResponsableUsuarioCorp';
import { SolicitudUsuarioCorp, mapSolicitudUsuarioCorpList } from './model/SolicitudUsuarioCorp';
import { WrapSolicitudUsuarioCorp } from './model/WrapSolicitudUsuarioCorp';
import { PeticionProperties, mapPeticionProperties } from './model/PeticionProperties';
import { WrapSolicitudPeticion } from './model/WrapSolicitudPeticion';
import { SolicitudPeticion, mapSolicitudPeticionList } from './model/SolicitudPeticion';
import { Peticion, mapPeticionList } from './model/Peticion';
import { UsuarioProperties, mapUsuarioProperties } from './model/UsuarioProperties';
import { PeticionPaginator, mapPeticionPaginator } from './model/PeticionPaginator';
import { WrapPeticion } from './model/WrapPeticion';

@Injectable()
export class PeticionesWSService {

  private baseUrl: string = endpointServer.basePath + '/rest';
  private restUrl: string = this.baseUrl + '/peticiones-ws';
  private restSearchUrl: string = this.restUrl + '/search';

  constructor(private http: Http, private globalService: GlobalService) { }

  public getSessionUser(): User {
    return JSON.parse(localStorage.getItem('user_session_data')).user;
  }

  public getUsuarioPropertiesByUsuario(idUsuario: number): Observable<UsuarioProperties> {
    return this.globalService.get(`${this.restUrl}/getUsuarioPropertiesByUsuario?idUsuario=${idUsuario}`, mapUsuarioProperties);
  }

  // **************************************************
  // Solicitud Usuario Corporativo
  // **************************************************
  public getRespUsuCorpByUsuarioCorp(usuarioCorp: string): Observable<ResponsableUsuarioCorp> {
    return this.globalService.get(`${this.restUrl}/getRespUsuCorpByUsuarioCorp?usuarioCorp=${usuarioCorp}`, mapResponsableUsuarioCorp);
  }

  public saveSolicitudUsuarioCorp(wrapSolicitud: WrapSolicitudUsuarioCorp): Observable<any> {
    return this.globalService.post(`${this.restUrl}/saveSolicitudUsuarioCorp`, wrapSolicitud);
  }

  public reportUsuarioCorp(wrapSolicitud: WrapSolicitudUsuarioCorp): Observable<any> {
    return this.globalService.post(`${this.restUrl}/reportUsuarioCorp`, wrapSolicitud);
  }

  // **************************************************
  // Solicitud Peticiones Web
  // **************************************************
  public getPeticionPropertiesByUsuario(idUsuario: number): Observable<PeticionProperties> {
    return this.globalService.get(`${this.restUrl}/getPeticionPropertiesByUsuario?idUsuario=${idUsuario}`, mapPeticionProperties);
  }

  public saveSolicitudPeticion(wrapSolicitud: WrapSolicitudPeticion): Observable<any> {
    return this.globalService.post(`${this.restUrl}/saveSolicitudPeticion`, wrapSolicitud);
  }

  // **************************************************
  // List Solicitudes - Usuario Corporativo
  // **************************************************
  public getAllSolUsuCorpBySolicitante(idUsuario: number): Observable<SolicitudUsuarioCorp[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolUsuCorpBySolicitante?idUsuario=${idUsuario}`, mapSolicitudUsuarioCorpList);
  }

  public getAllSolUsuCorpByResponsable(idUsuario: number): Observable<SolicitudUsuarioCorp[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolUsuCorpByResponsable?idUsuario=${idUsuario}`, mapSolicitudUsuarioCorpList);
  }

  public getAllSolUsuCorp(): Observable<SolicitudUsuarioCorp[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolUsuCorp`, mapSolicitudUsuarioCorpList);
  }

  public updateEstatusSolUsuCorp(listSolicitud: SolicitudUsuarioCorp[]): Observable<any> {
    return this.globalService.post(`${this.restUrl}/updateEstatusSolUsuCorp`, listSolicitud);
  }

  // **************************************************
  // List Solicitudes - Peticion
  // **************************************************
  public getAllSolPeticionBySolicitante(idUsuario: number): Observable<SolicitudPeticion[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolPeticionBySolicitante?idUsuario=${idUsuario}`, mapSolicitudPeticionList);
  }

  public getAllSolPeticionByNivelAutorizador(nivel: number): Observable<SolicitudPeticion[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolPeticionByNivelAutorizador?nivel=${nivel}`, mapSolicitudPeticionList);
  }

  public getAllSolPeticion(): Observable<SolicitudPeticion[]> {
    return this.globalService.get(`${this.restUrl}/getAllSolPeticion`, mapSolicitudPeticionList);
  }

  public getAllPeticionBySolicitud(idSolicitud: number): Observable<Peticion[]> {
    return this.globalService.get(`${this.restUrl}/getAllPeticionBySolicitud?idSolicitud=${idSolicitud}`, mapPeticionList);
  }

  public updateEstatusSolPeticion(listSolicitud: SolicitudPeticion[]): Observable<any> {
    return this.globalService.post(`${this.restUrl}/updateEstatusSolPeticion`, listSolicitud);
  }

  // **************************************************
  // Admin Peticiones
  // **************************************************
  public findAllPeticionByFilters(size: number, page: number, filters: string): Observable<PeticionPaginator> {
    return this.globalService.get(`${this.restSearchUrl}/findAllPeticionByFilters?size=${size}&page=${page}&filters=${filters}`, mapPeticionPaginator);
  }

  public getAllPeticionByFilters(filters: string): Observable<Peticion[]> {
    return this.globalService.get(`${this.restUrl}/getAllPeticionByFilters?filters=${filters}`, mapPeticionList);
  }

  public updatePeticiones(wrapPeticion: WrapPeticion): Observable<any> {
    return this.globalService.post(`${this.restUrl}/updatePeticiones`, wrapPeticion);
  }

  public checkPeticionRepetida(peticion: Peticion): Observable<any> {
    return this.globalService.post(`${this.restUrl}/checkPeticionRepetida`, peticion);
  }
}
