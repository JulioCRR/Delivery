import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';
import { Subject }    from 'rxjs/Subject';
import * as moment from 'moment';

import { M2kCatUsuarios } from '../search-petition/modelo/M2kCatUsuarios';
import { M2kCatTransacciones } from '../search-petition/modelo/M2kCatTransacciones';
import {PeticionWS} from '../search-petition/modelo/PeticionWS';
import {D29Id,ValidarForm} from '../search-petition/modelo/D29Id';
import {D29EstatusFront} from '../search-petition/modelo/D29EstatusFront';

export class M2kInfoRegistro  {
    constructor(
        public idPeticion: string,
        public xmlEntrada: string,
        public xmlRespuesta: string,
        public ip: string,
        public region: string,
        public usuario: string,
        public funcion: string,
        public tiempoTotalWeb: number,
        public tiempoTotalConector: number,
        public tipoConector: string,
        public fechaInicio: Date,
        public accion: string,
        public tipoRespuesta: string,
        public instancia: string,
        public server: string,

    ) {}
}



function mapTrans(response: Response): M2kCatTransacciones[] {
    let parsedTrans: any;
    if (response.json() != null) {
      parsedTrans = response.json().map(toTrans);
    }
    return parsedTrans;
  }

function mapUsers(response: Response): M2kCatUsuarios[] {
    let parsedUsers: any;
    if (response.json() != null) {
      parsedUsers = response.json().map(toUsers);
    }
    return parsedUsers;
  }



  function mapEstatus(response: Response): D29EstatusFront []{
    let parsedEstatus: any;
    if (response.json() != null) {
        parsedEstatus = response.json().map(toInfoEstatus);
    }
    return parsedEstatus;
  }



function toTrans(r: any): M2kCatTransacciones {
    let infotrans = <M2kCatTransacciones>({
        transaccion: r
    });
    return infotrans;
}



function toinfoCont(response: Response): ValidarForm  {
    let r = response.json();
    let infoValidacion = <ValidarForm>({
        conteo: r,
    });
    return infoValidacion;
}


  function toinfobatch(response: Response): D29Id {
    let r = response.json();
    let infoidfolio = <D29Id>({
        idfolio: r,
    });
    return infoidfolio;
}

  function toInfoRegistro(response: Response): M2kInfoRegistro {
    let r = response.json();
    console.log(r);
    let infoRegistro = <M2kInfoRegistro>({
        idPeticion: r.idPeticion,
        fechaInicio: extractDate(r.fechaInicio),
        xmlEntrada: r.xmlEntrada,
        xmlRespuesta: r.xmlRespuesta,
        ip: r.ip,
        region: (r.region!=null) ? r.region:"N/A",
        usuario:(r.usuario!=null) ? r.usuario:"N/A",
        funcion: (r.funcion!=null) ? r.funcion:"N/A",
        tiempoTotalWeb:(r.tiempoTotalWeb!=null) ? r.tiempoTotalWeb:"N/A",
        tiempoTotalConector: (r.tiempoTotalConector!=null) ? r.tiempoTotalConector:"N/A",
        tipoConector: (r.tipoConector!=null) ? r.tipoConector:"N/A",
        server:(r.serverHost!=null) ? r.serverHost:"N/A",
        accion: (r.accion!=null) ? r.accion:"N/A",
        tipoRespuesta:(r.tipoRespuesta!=null) ? r.tipoRespuesta:"N/A",
        instancia: (r.instancia!=null) ? r.instancia:"N/A",
    });
    return infoRegistro;

}


function toInfoEstatus(r: any): D29EstatusFront {
    let infoEstatus = <D29EstatusFront>({
        folioFront: r.folioFront,
        estatusFront:r.estatusFront,
        telefonoFront:r.telefonoFront,
        ipFront:(r.ipFront!=null) ? r.ipFront:"N/A",
        regionFront:(r.regionFront!=null) ? r.regionFront:"N/A" ,
        usuarioFront:(r.usuarioFront!=null) ? r.usuarioFront:"N/A" ,
        transaccionFront:(r.transaccionFront!=null) ? r.transaccionFront:"N/A",
        fechaInicioFront:extractDate(r.fechaInicioFront),
        horaInicioFront: extractHour(r.horaInicioFront),
        horaFinalFront: extractHour(r.horaFinalFront),
        fechaSolicituFront:extractDateFront(r.fechaSolicituFront) ,
        fechaEjecuBack:extractDateFront(r.fechaEjecucion) ,
        mensajeStatus:r.msjStatus,
        fechaCompleta:r.fechaCom,

    });
    return infoEstatus;
}



function toUsers(r: any): M2kCatUsuarios {
    let infoUser = <M2kCatUsuarios>({
        clave_usuario: r
    });
    return infoUser;
}

function extractDate(date: Date): any {
    if (date == undefined) {
        return '';
    }
    var fechaInicio=moment(date).format('YYYY-MM-DD');
    return fechaInicio;
}


function extractDateFront(date: Date): any {
  if (date == undefined) {
      return '';
  }
  var fechaHora=moment(date).format('YYYY-MM-DD hh:ss');
  return fechaHora;
}

function extractHour(date: Date): any {
  if (date == undefined) {
      return '';
  }
  var hora=moment(date).format('hh:ss');
  return hora;
}



@Injectable()
export class SearchPetitionService {

  private notify = new Subject<any>();
  private baseUrl: string = endpointServer.basePath + '/rest';
  private static EXCEPCION_JAVA = 'java.lang.Exception:';
  notifyObservable$ = this.notify.asObservable();

  constructor(private http: Http, public globalService: GlobalService){}


  public validar(enviarConsulta: PeticionWS): any {
    let url = this.baseUrl + '/validarConsulta';
    let resp$ = this.http.post(url, enviarConsulta, {headers: this.getHeaders(), withCredentials: true});
    return resp$.map(toinfoCont).catch((error: any) => {
                if ( this.globalService.authService.isLoggedIn && error.status == 409) {
                    let errorMessage: any;
                    this.globalService.alertService.push({severity: 'error',
                    summary: 'Error al validar informacion', detail: errorMessage});
                } else {
                    return this.globalService.getError(error);
                }
            });

  }

    getInfoEstatusById(userId: string): any {
        let transactions$ = this.http.get(`${this.baseUrl}/search-estatus/${userId}`, {headers: this.getHeaders(), withCredentials: true});
        return transactions$.map(mapEstatus).catch((error: any) => {
                    console.log("Failed to get all regions to call service....");
                    return this.globalService.getError(error);
                });
    }

    getInfoRegistroById(id: string): any {
        return this.globalService.get(`${this.baseUrl}/search-petition/${id}`, toInfoRegistro);

    }


     public guardarPeticion(enviarConsulta: PeticionWS): any {
        let url = this.baseUrl + '/guardarPeticion';
        let resp$ = this.http.post(url, enviarConsulta, {headers: this.getHeaders(), withCredentials: true});
        return resp$.map(toinfobatch).catch((error: any) => {
                    console.log("FINISH ERROR GUARDAR EN BITACORA....");
                    if ( this.globalService.authService.isLoggedIn && error.status == 409) {
                        let errorMessage: any;
                        this.globalService.alertService.push({severity: 'error',
                        summary: 'Error al guardar la solicitud', detail: errorMessage});
                    } else {
                        return this.globalService.getError(error);
                    }
                });

      }
      public getUsers(): any {
        let transactions$ = this.http.get(`${this.baseUrl}/search-users`, {headers: this.getHeaders(), withCredentials: true});
        return transactions$.map(mapUsers).catch((error: any) => {
                    console.log("Failed to get all users to call service....");
                    return this.globalService.getError(error);
                });
      }

      public getTrans(): any {
        let transactions$ = this.http.get(`${this.baseUrl}/search-trans`, {headers: this.getHeaders(), withCredentials: true});
        return transactions$.map(mapTrans).catch((error: any) => {
                    console.log("Failed to get all transactions to call service....");
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
}
