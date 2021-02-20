import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { endpointServer } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { Http, Response, Headers} from '@angular/http';
import {PruebaCtg} from '../ctg-execution/modelo/PruebaCtg';
import {RespuestaCtg} from '../ctg-execution/modelo/RespuestaCtg';
import {User} from '../admin/admin.service';
import {M2kSolicitudCtg} from '../ctg-execution/modelo/M2kSolicitudCtg';
import {SolM2kSolicitudCtg} from '../ctg-execution/modelo/SolM2kSolicitudCtg';
import { URLSearchParams } from '@angular/http';


export class ResponsableUser {
  constructor(
    public idUsuario: string,
    public responsable: string
  ) {}
}

function mapSolicitud(response: Response): M2kSolicitudCtg {

    let responseJson = response.json();
    let respuesta: any;
    console.log("PARSEANDO SOLICITUD: " , responseJson);
    if (responseJson) {
        respuesta = new M2kSolicitudCtg(
            responseJson.id,
            responseJson.fechaSolicitud,
            responseJson.horaInicio,
            responseJson.horaFin,
            responseJson.usuarioM2k,
            responseJson.numTotalTransacciones,
            responseJson.transaccion,
            responseJson.proyectoAsociado,
            responseJson.comentarios,
            parseUser(responseJson.solicitante),
            parseUser(responseJson.responsableAutorizacion),
            responseJson.folio,
            responseJson.fechaCracion,
            responseJson.estatus,
            responseJson.programa,
            responseJson.countEjecuciones
        );
    }

    return respuesta;
}

function parseSolicitud(responseJson: any): M2kSolicitudCtg {

    let respuesta = new M2kSolicitudCtg(
        responseJson.id,
        responseJson.fechaSolicitud,
        responseJson.horaInicio,
        responseJson.horaFin,
        responseJson.usuarioM2k,
        responseJson.numTotalTransacciones,
        responseJson.transaccion,
        responseJson.proyectoAsociado,
        responseJson.comentarios,
        parseUser(responseJson.solicitante),
        parseUser(responseJson.responsableAutorizacion),
        responseJson.folio,
        responseJson.fechaCracion,
        responseJson.estatus,
        responseJson.programa,
        responseJson.countEjecuciones
    );
    return respuesta;
}

function mapSolicitudes(response: Response): M2kSolicitudCtg[] {
  let solicitudes = response.json();
  let parsedSolicitudes: any;
  if (solicitudes) {
        parsedSolicitudes = solicitudes.map(parseSolicitud);
  }
  return parsedSolicitudes;
}

function mapRespuesta(response: Response): RespuestaCtg {

    let respuesta: any;
    let responseJson = response.json();
    let respCics: any;
    let respnsXml: any;
    let respnsProg: any;
	let mensajeValidacion: any;

    if (response) {

        if (responseJson.req != null) {
            respCics = responseJson.req.cicsRcString;
        } else {
            respCics = 'ERROR_REQUEST';
        }

        if (responseJson.respuestaXML != null) {
            respnsXml = responseJson.respuestaXML;
        } else {
            respnsXml = 'SIN RESPUESTA';
        }

        if (responseJson.respuestaCTG) {
            respnsProg = responseJson.respuestaCTG;
        } else {
            respnsProg = 'SIN RESPUESTA';
        }

		if (responseJson.mensajeValidacion) {
            mensajeValidacion = responseJson.mensajeValidacion.toUpperCase();
        } else {
            mensajeValidacion = 'VALIDACION EXITOSA';
        }

        respuesta = new RespuestaCtg(
        respCics,
        respnsXml,
        responseJson.cadenaEnviadaCTG,
        respnsProg,
		mensajeValidacion,
        );
    }

    return respuesta;
}

function mapUser(response: Response): User {

    let responseJson = response.json();
    let user: any;

    if (responseJson) {

        user = new User(
            responseJson.id,
            responseJson.nempleado,
            responseJson.nombre,
            responseJson.apaterno,
            responseJson.amaterno,
            responseJson.correo,
            responseJson.usuarioRed,
            responseJson.extension,
        );
    }

    return user;
}


function parseUser(responseJson: any): User {

    let user = new User(
        responseJson.id,
        responseJson.nempleado,
        responseJson.nombre,
        responseJson.apaterno,
        responseJson.amaterno,
        responseJson.correo,
        responseJson.usuarioRed,
        responseJson.extension,
    );
    return user;
}

function extractFolios(solicitudes: M2kSolicitudCtg[]): any {
    let folios: String[]=[];
    solicitudes.forEach(eachObj => {
        folios.push(""+eachObj.id);
    });
    return folios;
}

function mapSimpleResponse(response: Response): M2kSolicitudCtg {
    let responseJson = response.json();
    return responseJson;
}

@Injectable()
export class CtgExecutionCommonService {
  private notify = new Subject<any>();
  private baseUrl: string = endpointServer.basePath + '/rest';
  private url:string=endpointServer.basePath;
  private static EXCEPCION_JAVA = 'java.lang.Exception:';

  notifyObservable$ = this.notify.asObservable();

  constructor(private http: Http, public globalService: GlobalService){}

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  public ejecutarPruebaCtg(prueba:PruebaCtg): any {
    let url = this.baseUrl + '/ejecutarPruebaCtg';
    let resp$ = this.http.post(url, prueba, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(mapRespuesta).catch((error: any) => {
                console.log("FINISH ERROR EJECUTAR PRUEBA CTG to call service....");
                return this.globalService.getError(error);
            });

  }

  public obtenerResponsable(id:any): any {
    let resp$ = this.http.get(`${this.baseUrl}/obtenerResponsableAuth/${id}`, {headers: this.getHeaders(), withCredentials: true});
    console.log("GETTING RESPONSABLE....");
    return resp$.map(mapUser).catch((error: any) => {
                console.log("FINISH ERROR OBTENER RESPONSABLE CTG to call service....");
                return this.globalService.getError(error);
            });
  }

  public obtenerPermisos(id:any): any {
    let resp$ = this.http.get(`${this.baseUrl}/consultarPermisos/${id}`, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(responseJson => responseJson.json()).catch((error: any) => {
                console.log("FINISH ERROR OBTENER PERMISOS to call service....");
                return this.globalService.getError(error);
            });
  }

  public guardarSolicitud(solicitud:SolM2kSolicitudCtg): any {
    let url = this.baseUrl + '/guardarSolicitudCtg';
    let resp$ = this.http.post(url, solicitud, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(mapSolicitud).catch((error: any) => {
                console.log("FINISH ERROR GUARDAR SOLICITUD CTG to call service....");
                if ( this.globalService.authService.isLoggedIn && error.status == 409) {
                    let errorMessage: any;
                    if (error._body.includes(CtgExecutionCommonService.EXCEPCION_JAVA)) {
                        errorMessage = error._body.substring(CtgExecutionCommonService.EXCEPCION_JAVA.length,error._body.length);
                    } else {
                        errorMessage = error._body;
                    }
                    this.globalService.alertService.push({severity: 'error',
                    summary: 'Error al guardar la solicitud', detail: errorMessage});
                } else {
                    return this.globalService.getError(error);
                }
            });

  }

  public listarSolicitudes(idUsuario:number, tipoSolicitud: number): any {
    let resp$ = this.http.get(`${this.baseUrl}/getSolicitudesByUsuario?id=${idUsuario}&tipo=${tipoSolicitud}`, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(mapSolicitudes).catch((error: any) => {
                console.log("FINISH ERROR LISTAR SOLICITUDES CTG to call service....");
                return this.globalService.getError(error);
            });
  }

  public actualizarSolicitudes(solicitudes: any, opcion: any): any {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('solicitudes', extractFolios(solicitudes));
    urlSearchParams.append('opcion', opcion);
    let resp$ = this.http.post(`${this.baseUrl}/actualizarEstatusSol`,urlSearchParams, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(mapSimpleResponse).catch((error: any) => {
                console.log("FINISH ERROR ACTUALIZAR SOLICITUDES CTG to call service....");
                return this.globalService.getError(error);
            });
  }

  public validarCodigoProduccion(codigoProduccion: any, idUsuario: number): any {
    let resp$ = this.http.get(`${this.baseUrl}/validarCodigoProduccion?codigo=${codigoProduccion}&usr=${idUsuario}`, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(mapSolicitud).catch((error: any) => {
                console.log("FINISH ERROR VALIDAR CODIGO PRODUCCION CTG to call service....");
                return this.globalService.getError(error);
            });
  }

  private getHeaders(){
    let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.
    return headers;
  }

  private extractData(res: Response) {
      let body = res.json();
      console.log("Data extraida: ", body);
      return body;
  }

  public getLogoBase64(): Observable<Response> {
    let urlImagen = endpointServer.basePath + "/assets/json/logoTelcelB64.json";
    return this.http.get(urlImagen).map(this.extractData).catch((error: any) => {
                console.log("FINISH ERROR EJECUTAR PRUEBA CTG to call service....");
                return this.globalService.getError(error);
            });
  }



  public assignResponsable(responsable:ResponsableUser):any{
    console.log("INIT ASSIGN RESPONSABLE");
    return this.http.get(`${this.url}/asignaResponsable?responsable=${responsable.responsable}&idU=${responsable.idUsuario}`);
    //return this.http.post(`${this.baseUrl}/user-profile/enviaEmail`,email);
  }

}
