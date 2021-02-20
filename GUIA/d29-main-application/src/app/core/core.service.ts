import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';
import { LoginComponent } from './login/login.component';



export class Profile {
  constructor(
      public id: number,
      public nombre: string,
  ) {}
}

export class UserPaginator {
  constructor(
      public users: User[],
      public size: number,
      public totalElements: number,
      public totalPages: number,
      public number: number,
  ) {}
}

export class User {
  constructor(
      public id: number,
      public nempleado: string,
      public nombre: string,
      public apaterno: string,
      public amaterno: string,
      public correo: string,
      public usuarioRed: string,
      public extension: string,
      public area: string,
      public oficina: string,
      public puesto: string,
      public password: string
  ) {}
}

export class ModuleUser{
  constructor(
    public id: number,
    public modulos: any[]=[],
    public justificacion: string,
    public nEmpleado: string,
    public nombre: string,
    public aPaterno: string,
    public aMaterno: string,
    public correo: string,
    public usuarioRed: string,
    public extension: string,
    public area: string,
    public oficina: string,
    public puesto: string,
    public password: string
  ){}
}

export class Help{
  constructor(
    public clave: string,
    public valor: string
  ){}
}



function mapUser(response: Response): User {
  // The response of the API has a results
  // property with the actual results
  let responseJson = response.json();
  console.log("PARSEANDO USUARIO: ", responseJson);
  let user = new User(
      //extractId(responseJson, 'rest/user'),
      responseJson.id,
      responseJson.nempleado,
      responseJson.nombre,
      responseJson.apaterno,
      responseJson.amaterno,
      responseJson.correo,
      responseJson.usuarioRed,
      responseJson.extension,
      responseJson.area,
      responseJson.oficina,
      responseJson.puesto,
      responseJson.password
  );
  return user;
}

function toUser(r: any): User {

  let user = <User>({
      id: extractId(r, 'rest/menu'),
      nempleado: r.nempleado,
      nombre: r.nombre,
      apaterno: r.apaterno,
      amaterno: r.amaterno,
      correo: r.correo,
      usuarioRed: r.usuarioRed,
      extension: r.extension
  });
  return user;
}

function mapUsers(response: Response): UserPaginator {
  // The response of the API has a results
  // property with the actual results
  let responseJson = response.json();
  let userPaginator;
  if (responseJson._embedded.menu == undefined) {
      userPaginator = new UserPaginator(
          [],
          responseJson.page.size,
          responseJson.page.totalElements,
          responseJson.page.totalPages,
          responseJson.page.number,
      );
  } else {
      userPaginator = new UserPaginator(
          responseJson._embedded.menu.map(toUser),
          responseJson.page.size,
          responseJson.page.totalElements,
          responseJson.page.totalPages,
          responseJson.page.number,
      );
  }
  return userPaginator;
}

function extractId(processData: any, type: any) {
  let extractedId = processData._links.self.href.replace(endpointServer.basePath + '/' + type + '/', '');
  return parseInt(extractedId);
}



@Injectable()
export class CoreService {
  private baseUrl:string=endpointServer.basePath + '/registro';
  private url:string=this.baseUrl+"/user-profile/getModules";
  constructor(private http:Http, public globalService:GlobalService){
  }
  private getHeaders(): any {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    headers.append("Pragma", "no-cache"); // HTTP 1.0.
    headers.append("Expires", "0"); // Proxies.
    return headers;
  }

  getUser(Nemp:string): Observable<User> {
    return this.globalService.get(`${this.baseUrl}/user/${Nemp}`, mapUser);
  }

  saveUser(modulo) {
    return this.http.post(`${this.baseUrl}/user-profile/saveUser`, modulo);
  }

  sendMail(email:string){
    return this.http.post(`${this.baseUrl}/user-profile/enviaEmail`,email);
  }

  getModules(){
    console.log("INIT GET MODULES METHOD");
    return this.http.get(`${this.baseUrl}/user-profile/getModules`);
  }

  getAreas(){
    console.log("INIT GET AREAS METHOD");
    return this.http.get(`${this.baseUrl}/user-profile/getAreas`);
  }

  getPuestos(){
    console.log("INIT GET PUESOTS METHOD");
    return this.http.get(`${this.baseUrl}/user-profile/getPuestos`);
  }

  getOficinas(){
    console.log("INIT GET OFICINAS METHOD");
    return this.http.get(`${this.baseUrl}/user-profile/getOficinas`);
  }

}
