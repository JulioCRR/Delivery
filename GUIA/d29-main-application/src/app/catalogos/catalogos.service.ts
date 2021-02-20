import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { endpointServer } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { M2kCatTransaccion } from './model/M2kCatTransaccion';
import { M2kCatAccion } from './model/M2kCatAccion';
import { M2kRelAccionTransaccion } from './model/M2kRelAccionTransaccion';
import { Http, Response, Headers} from '@angular/http';

function mapRelAccionTransaccion(response: Response): M2kRelAccionTransaccion[] {
  
  let parsedTransactions: any;
  if (response.json() != null) {
    console.log("Rel Accion Transaccion: ", response.json());
    parsedTransactions = response.json().map(toRelation);
  }

  return parsedTransactions;
}

function mapTransactions(response: Response): M2kCatTransaccion[] {
  let parsedTransactions = response.json().map(toTransaction);
  return parsedTransactions;
}

function toRelation(r:any): M2kRelAccionTransaccion {
    let infoRegistro = <M2kRelAccionTransaccion>({
        request: r.request,
        responseExitoso: r.responseExitoso,
        responseErrorEM2k: r.responesErrorM2k,
        responseErrorEMOB: r.responseErrorMob,
        accion: r.m2kCatAccion,
        transaccion: r.m2kCatTransaccionesFront,
        fechaCreacion: r.fechaCreacion,
        fechaModificacion: r.fechaUltimaModificacion
    });
    return infoRegistro;
}

function toTransaction(r:any): M2kCatTransaccion {
    let infoRegistro = <M2kCatTransaccion>(
      {
        id: r.id,
        transaccion: r.transaccion,
        nombrePantalla: r.nombrePantalla,
        descripcion: r.descripcion,
        transaccionPantallaTransient: r.transaccion +' ('+ r.nombrePantalla+')'
    });
    console.log("INFO REGISTRO ---->>>> "+infoRegistro.transaccion);
    return infoRegistro;
}

@Injectable()
export class CatalogosService {

  private baseUrl: string = endpointServer.basePath + '/rest';
  
  constructor(private http: Http, public globalService: GlobalService) {}

  public getAllTransactions(): any {
    let transactions$ = this.http.get(`${this.baseUrl}/search-transactions`, {headers: this.getHeaders(), withCredentials: true});
    return transactions$.map(mapTransactions).catch((error: any) => {
                console.log("FINISH ERROR OBTENER ALL TRANSACTIONS to call service....");
                return this.globalService.getError(error);
            });
  }

  public getActions(id:string): any {
    let transactions$ = this.http.get(`${this.baseUrl}/search-actionsBytransaction/${id}`, {headers: this.getHeaders(), withCredentials: true});
    return transactions$.map(mapRelAccionTransaccion).catch((error: any) => {
                console.log("FINISH ERROR OBTENER ACTIONS to call service....");
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
      return body;
  }

}
