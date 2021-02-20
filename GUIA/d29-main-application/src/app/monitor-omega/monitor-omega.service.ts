import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { endpointServer } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { AuthService } from '../app.service';
import { ReportePantallaOmega, mapPantalla } from './model/ReportePantallaOmega';
import { PropiedadesMonitorOmega, mapPropiedades } from './model/PropiedadesMonitorOmega';

@Injectable()
export class MonitorOmegaService {
  private baseUrl: string = endpointServer.basePath + '/rest';
  private restUrl: string = this.baseUrl + '/monitor-omega';
  constructor(private http: Http, public globalService: GlobalService, public authService: AuthService) {}

  public getEndPoint(): string {
    return endpointServer.basePath;
  }

  public getReportePantallaOmega(): Observable<ReportePantallaOmega> {
    return this.globalService.get(`${this.restUrl}/reporteOmega`, mapPantalla).catch((error: any) => {
      if (error.status === 0) {
        this.authService.logout();
      }
    });
  }

  public getPropiedadesMonitor(): Observable<PropiedadesMonitorOmega> {
    return this.globalService.get(`${this.restUrl}/propiedadesOmega`, mapPropiedades);
  }

  public actualizaPropiedadesMonitor(data: PropiedadesMonitorOmega) {
    return this.globalService.post(`${this.restUrl}/propiedadesOmega`, data);
  }
}
