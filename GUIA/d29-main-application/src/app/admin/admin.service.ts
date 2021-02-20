import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';
import {TreeNode} from 'primeng/primeng';


export class PerfilMenuWrapper {
    constructor(
        public idPerfil: number,
        public idUsuario: number,
        public menus: number[]
    ) {}
}

export class PerfilUsuarioWrapper {
    constructor(
        public id: number,
        public users: number[],
        public profiles: number[]
    ) {}
}

export class ProfilePaginator {
    constructor(
        public profiles: Profile[],
        public size: number,
        public totalElements: number,
        public totalPages: number,
        public number: number,
    ) {}
}

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
    ) {}

    getFullName() {
        return this.nombre + " " + this.apaterno + " " + this.amaterno;
    }

  static getNewInstance(): User {
    return new User(0, '', '', '', '', '', '', '');
  }
}

function toProfile(r: any): Profile {
    let profile = <Profile>({
        id: extractId(r, 'rest/profiles'),
        nombre: r.nombre
    });
    return profile;
}

function mapProfiles(response: Response): ProfilePaginator {
    // The response of the API has a results
    // property with the actual results
    let responseJson = response.json();

    let profilePaginator = new ProfilePaginator(
        responseJson._embedded.profiles != undefined ? responseJson._embedded.profiles.map(toProfile) : [],
        responseJson.page.size,
        responseJson.page.totalElements,
        responseJson.page.totalPages,
        responseJson.page.number,
    );
    return profilePaginator;
}

function mapProfile(response: Response): Profile {
    // The response of the API has a results
    // property with the actual results
    let responseJson = response.json();

    let profile = new Profile(
        extractId(responseJson, 'rest/profiles'),
        responseJson.nombre
    );
    return profile;
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
    );
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

export function toUsuario(r: any): User {
  let output: User = null;
  if (r) {
    output = <User>({
      id: r.id,
      nempleado: r.nempleado,
      nombre: r.nombre,
      apaterno: r.apaterno,
      amaterno: r.amaterno,
      correo: r.correo,
      usuarioRed: r.usuarioRed,
      extension: r.extension
    });
  }
  return output;
}
@Injectable()
export class AdminService {
    private baseUrl: string = endpointServer.basePath + '/rest';
    constructor(private http: Http, public globalService: GlobalService) {
    }

    getProfileList(page: number): Observable<ProfilePaginator> {
        return this.globalService.get(`${this.baseUrl}/profiles?page=${page}&size=5&sort=id`, mapProfiles);
    }
    getProfile(id: number): Observable<Profile> {
        return this.globalService.get(`${this.baseUrl}/profiles/${id}`, mapProfile);
    }

    getUser(id: number): Observable<User> {
        return this.globalService.get(`${this.baseUrl}/user/${id}`, mapUser);
    }

    getUsersFromProfile(id: number, page: number): Observable<UserPaginator> {
        return this.globalService.get(`${this.baseUrl}/user-profile/search/findByPerfilId?perfilId=${id}&size=10&page=${page}`, mapUsers);
    }

    getProfilesFromUser(id: number, page: number): Observable<ProfilePaginator> {
        return this.globalService.get(`${this.baseUrl}/user-profile/search/findByUserId?userId=${id}&size=10&page=${page}`, mapProfiles);
    }

    getUsers(idProfile: number, text: string, page: number): Observable<UserPaginator> {
        return this.globalService.get(`${this.baseUrl}/user-profile/search/findByTextForWhitoutProfile?idProfile=${idProfile}&text=${text}&size=10&page=${page}`, mapUsers);
    }

    getProfiles(id: number, page: number): Observable<ProfilePaginator> {
        return this.globalService.get(`${this.baseUrl}/user-profile/search/findByTextForWhitoutUser?idUser=${id}&size=10&page=${page}`, mapProfiles);
    }

    saveUsers(data) {
        return this.globalService.post(`${this.baseUrl}/user-profile`, data);
    }

    saveProfiles(data) {
        return this.globalService.post(`${this.baseUrl}/user-profile`, data);
    }

    deleteUsers(data) {
        return this.globalService.delete(`${this.baseUrl}/user-profile/`, data);
    }

    deleteProfiles(data) {
        return this.globalService.delete(`${this.baseUrl}/user-profile/`, data);
    }

    getMenus() {
        return this.globalService.get(`${this.baseUrl}/menu-tree`);
    }

    saveMenus(data) {
        return this.globalService.post(`${this.baseUrl}/menu-tree`, data);
    }

    getMenusByPerfil(id: number) {
        return this.globalService.get(`${this.baseUrl}/menu-tree-by-perfil?idPerfil=${id}`);
    }

    getMenusByUsuario(id: number) {
        return this.globalService.get(`${this.baseUrl}/menu-tree-by-usuario?idUsuario=${id}`);
    }

    saveProfile(data) {
        return this.globalService.post(`${this.baseUrl}/profiles`, data);
    }

    deleteProfile(data) {
        return this.globalService.delete(`${this.baseUrl}/profiles/${data.id}`);
    }

    saveUser(data) {
        return this.globalService.post(`${this.baseUrl}/user-profile/saveSingleUser`, data);
    }
}
