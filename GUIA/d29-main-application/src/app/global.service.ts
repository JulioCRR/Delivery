import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {AuthService} from './app.service';
import {AlertService} from './alert.service';

@Injectable()
export class GlobalService {
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;
    public mail:boolean;

    constructor(public http: Http, public authService: AuthService, public alertService: AlertService) {}

    private getHeaders(): any {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.
        return headers;
    }

    getError(error: any): any {
        console.log("ERROR in GlobalService ");
        console.error(error);
        switch (error.status) {
            case 0:
                this.alertService.push({severity: 'error', summary: 'Sin conexión', detail: 'No se pudo obtener la información del servidor'});
                break;
            case 403:
                this.alertService.push({severity: 'warn', summary: 'Sin acceso', detail: 'No cuentas con los privilegios requeridos'});
                break;
            case 401:
                this.alertService.push({severity: 'warn', summary: 'Sesión cerrada', detail: 'Debido a la inactividad se ha cerrado tu sesión'}, true);
                this.authService.logout();
                break;
            default:
                this.alertService.push({severity: 'error', summary: 'Error inesperado', detail: 'Ocurrio un error al procesar la solicitud'});
        }
        return Observable.throw(new Error(error.status));
    }

    public post(url: string, data = null, map = null): any {
        console.log("INIT to call service....");
        return this.http.post(url, data, {headers: this.getHeaders(), withCredentials: true})
            .map((res: Response) => {
                console.log(res);
                console.log("FINISH to call service....");
                if (map != null) {
                    return map(res);
                } else {
                    return {status: res.status, json: res.text() ? res.json() : {}};
                }
            })
            .catch((error: any) => {     //catch Errors here using catch block
                console.log("FINISH ERROR to call service....");
                return this.getError(error);
            });
    }

    public get(url: string, map = null): any {
        console.log("INIT to call service....");
        return this.http.get(url, {headers: this.getHeaders(), withCredentials: true})
            .map((res: Response) => {
                console.log("FINISH to call service....");
                if (map != null) {
                    return map(res);
                } else {
                    return {status: res.status, json: res.text() ? res.json() : {}};
                }
            })
            .catch((error: any) => {     //catch Errors here using catch block
                console.log("FINISH ERROR to call service....");
                return this.getError(error);
            });
    }

    public put(url: string, data = null): any {
        return this.http.put(url, data, {headers: this.getHeaders(), withCredentials: true})
            .map((res: Response) => {
                return {status: res.status, json: res.text() ? res.json() : {}};
            })
            .catch((error: any) => {     //catch Errors here using catch block
                return this.getError(error);
            });
    }

    public delete(url: string, data = null): any {
        return this.http.delete(url, {body: data, headers: this.getHeaders(), withCredentials: true})
            .map((res: Response) => {
                return {status: res.status, json: res.text() ? res.json() : {}};
            })
            .catch((error: any) => {     //catch Errors here using catch block
                return this.getError(error);
            });
    }
}
