import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';

@Injectable()
export class EncryptionCredentialService {
    private baseUrl: string = endpointServer.basePath + '/rest';

    constructor(private http: Http, public globalService: GlobalService) {}

    validateCredntial(data) {
        return this.globalService.post(`${this.baseUrl}/validate-token-pdf`, data);
    }

}
