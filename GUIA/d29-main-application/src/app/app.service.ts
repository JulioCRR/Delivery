import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {CanActivate, Router} from '@angular/router';
import {endpointServer} from '../environments/environment';
import {CookieService} from 'angular2-cookie/core';
import { GlobalService } from './global.service';

export class UserSessionData {
    constructor(
        public menuTrees: MenuTree[],
        public user: Usuario
    ) {}
}

export class MenuTree {
    constructor(
        public id: number,
        public nombre: string,
        public icono: string,
        public url: string,
        public menuTrees: MenuTree[]
    ) {}
}

export class Usuario {
    constructor(
        public id: number,
        public nempleado: string,
        public nombre: string,
        public apaterno: string,
        public amaterno: string,
        public correo: string,
        public usuarioRed: string,
        public extension: string
    ) {}
}

@Injectable()
export class AuthService {
    private baseUrl: string = endpointServer.basePath;
    private baseUrlRest:string=endpointServer.basePath + '/rest';

    private loggedIn = false;

    constructor(private http: Http, private router: Router, private _cookieService: CookieService) {
        this.loggedIn = !!localStorage.getItem('user_session_data');
    }

    login(username, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.

        return this.http.post(
            `${this.baseUrl}/login`,
            'username=' + username + '&password=' + password + '&submit=Login',
            {
                headers: headers,
                withCredentials: true
            }
        ).map(res => {
            if (res.ok) {
                localStorage.setItem('user_session_data', JSON.stringify(res.json()));

                this.loggedIn = true;
            }
        }).catch(this.handleError);
    }

    handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            errMsg = body.message;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        if (errMsg == undefined) {
            errMsg = 'Fuera de línea';
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    logout() {
        console.log('logout....');
        localStorage.removeItem('user_session_data');
        this.loggedIn = false;

        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.loggedIn;
    }



}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
