import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';
import {TreeNode} from 'primeng/primeng';


export class IncidenciaPaginator {
  constructor(
      public incidencias: Incidencia[]
  ) {}
}

export class Incidencia {
  constructor(
      public id: number,
      public mensaje: string,
      public intervaloTiempo: number,
      public maximoUmbralErrores: number,
      public tipoBusqueda: string,
      public destinatariosAlertas: string,
  ) {}
}

function toIncidencia(r: any): Incidencia {
  
   let incidencia = <Incidencia>({
       id: r.id,
       mensaje: r.mensaje,
       intervaloTiempo: r.intervaloTiempo,
       maximoUmbralErrores: r.maximoUmbralErrores,
       tipoBusqueda: r.tipoBusqueda,
       destinatariosAlertas: r.destinatariosAlertas
   });
   return incidencia;
}

function mapIncidencias(response: Response): Incidencia[] {
  let parsedIncidencias = response.json().map(toIncidencia);
  return parsedIncidencias;
}

function mapIncidencia(response: Response): IncidenciaPaginator {
  // The response of the API has a results
  // property with the actual results
  let responseJson = response.json();
  console.log("responseJson: "+responseJson );
  let incidenciaPaginator;
  if (responseJson._embedded == undefined) {
    incidenciaPaginator = new IncidenciaPaginator(
          []
      );
      console.log("entro al if: " );  
  } else {
    incidenciaPaginator = new IncidenciaPaginator(
          responseJson._embedded.map(toIncidencia)
      );
      console.log("entro al else: " );  
  }
  console.log("incidenciaPaginator: "+incidenciaPaginator );
  return incidenciaPaginator;
}



@Injectable()
export class MonitorWsm2kService {
  
  private baseUrl: string = endpointServer.basePath + '/rest';
  constructor(private http: Http, public globalService: GlobalService) {
  }

  getIncidencias(): Observable<Incidencia[]> {
    return this.globalService.get(`${this.baseUrl}/consultaIncidencias`,mapIncidencias);    
  }

  getIncidenciasPorMensaje(mensaje: string): Observable<Incidencia[]> {
    return this.globalService.get(`${this.baseUrl}/incidencias/consultaPorMensaje?mensaje=${mensaje}`,mapIncidencias);    
  }

  guardaIncidencia(data) {
    return this.globalService.post(`${this.baseUrl}/guardaIncidencia`, data);
  }

  actualizaIncidencia(data) {
    return this.globalService.post(`${this.baseUrl}/actualizaIncidencia`, data);
  }
  
  getEndPoint(): String {
    return endpointServer.basePath;
  }


  buscaIncidenciasPorMensaje(mensaje: string ) {
    
    let transactions$ = this.http.get(`${this.baseUrl}/incidencias/consultaPorMensaje?mensaje=${mensaje}`, {headers: this.getHeaders(), withCredentials: true});
    let transacciones = transactions$.map(mapIncidencias).catch(this.handleError);
    
    return transacciones;
 }

  public getAllIncidencias(): Observable<Incidencia[]> {
    let transactions$ = this.http.get(`${this.baseUrl}/consultaIncidencias`, {headers: this.getHeaders(), withCredentials: true});
    let transacciones = transactions$.map(mapIncidencias).catch(this.handleError);
    console.log("incidencias: "+transacciones);
    return transacciones;
  }

  private getHeaders(){
    let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.
    return headers;
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
