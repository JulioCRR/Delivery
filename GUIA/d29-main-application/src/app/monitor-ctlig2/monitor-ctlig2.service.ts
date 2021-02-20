import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {endpointServer} from '../../environments/environment';
import {GlobalService} from '../global.service';

export class ProcessPaginator {
    constructor(
        public processes: Process[],
        public size: number,
        public totalElements: number,
        public totalPages: number,
        public number: number,
    ) {}
}

export class Process {
    constructor(
        public id: number,
        public start: Date,
        public end: Date,
        public status: number,
        public description: string,
    ) {}
}

export class ProcessDetail {
    constructor(
        public id: number,
        public idProcess: number,
        public region: number,
        public start: Date,
        public end: Date,
        public status: number,
        public description: string,
        public request: string,
        public response: string,
    ) {}
}



var pagina=0;
var size=5;
var max=((pagina+1)*size);
var min=(max-size);

function mapProcesses(response: Response): ProcessPaginator {
    // The response of the API has a results
    // property with the actual results
    let responseJson = response.json();
    let processPaginator = new ProcessPaginator(

        responseJson._embedded.history.map(toProcess),
        responseJson.page.size,
        responseJson.page.totalElements,
        responseJson.page.totalPages,
        responseJson.page.number,
    );
    return processPaginator;
}

function mapMigProc(response:Response):ProcessPaginator{

  let responseJson = response.json();
  let respJ=[];
  for(var i=0,j=0;i<responseJson.length;i++){
      if(i>=min && i<max){
        respJ[j]=responseJson[i];
        j++;
      }
  }
  let elements=Object.keys(responseJson).length;
  let pages= elements/size;
  let processPaginator = new ProcessPaginator(
    respJ.map(toProcessMig),
    size,
    elements,
    pages,
    pagina
  );
  return processPaginator;
}



function mapProcessesDetail(response: Response): ProcessDetail[] {
    return response.json()._embedded.historydetail.map(toProcessDetail);
}

function mapProcessesDetailUnique(response: Response): ProcessDetail {
    return toProcessDetail(response.json());
}

function toProcess(r: any): Process {

    let process = <Process>({
        id: extractId(r, 'rest/history'),
        start: extractDate(r.startTime),
        end: extractDate(r.endTime),
        status: extractStatus(r),
        description: r.description,
    });
    return process;
}


function toProcessMig(r: any): Process{
  let proc = <Process>({
    id: r.id,
    start: extractDate(r.startTime),
    end: extractDate(r.endTime),
    status: extractStatus(r),
    description: r.description
  });
  return proc;
}

function toProcessDetail(r: any): ProcessDetail {

    let processDetail = <ProcessDetail>({
        id: extractId(r, 'rest/history-detail'),
        idProcess: r.historyId,
        region: r.region,
        start: extractDate(r.startTime),
        end: extractDate(r.endTime),
        status: extractStatus(r),
        description: r.description,
        request: r.request,
        response: r.response,
    });
    return processDetail;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractDate(date: Date): any {
    if (date == undefined) {
        return '';
    }
    return new Date(date);
}

function extractId(processData: any, type: any) {
    let extractedId = processData._links.self.href.replace(endpointServer.basePath + '/' + type + '/', '');
    console.log("EXTRACTED ID -> "+extractedId);
    return parseInt(extractedId);
}

function extractStatus(processData: any) {
    if (processData.status == 'PROCESSING') {
        return 0;
    }
    if (processData.status == 'SUCCESSFUL') {
        return 1;
    }
    if (processData.status == 'ERROR') {
        return 2;
    }
}

@Injectable()
export class MonitorCtlig2Service {
    private baseUrl: string = endpointServer.basePath + '/rest';
    constructor(private http: Http, public globalService: GlobalService) {
    }

    getProcessList(pageProcess: number): Observable<ProcessPaginator> {
        return this.globalService.get(`${this.baseUrl}/history?page=${pageProcess}&size=5&sort=startTime,desc`, mapProcesses);
    }

    getMigList(pageProcess: number): Observable<ProcessPaginator> {
      pagina=pageProcess;
      max=((pagina+1)*size);
      min=(max-size);
      return this.globalService.get(`${this.baseUrl}/historyMigra?page=${pageProcess}&size=5&sort=startTime`, mapMigProc);
    }

    getProcessDetailByProcess(id: number): any {
        return this.globalService.get(`${this.baseUrl}/history-detail/search/findByHistoryId?historyId=${id}`, mapProcessesDetail);
    }

    getProcessDetailByid(id: number) {
        return this.globalService.get(`${this.baseUrl}/history-detail/${id}`, mapProcessesDetailUnique);
    }

    executeProcess() {
        return this.globalService.post(`${this.baseUrl}/execute-clean-queue`);
    }

    executeProcessByRegion(region: string) {
        return this.globalService.post(`${this.baseUrl}/execute-clean-queue/${region}`);
    }


    //Servicios agregados para la ejecución del servicio 1*2W
    getHistoryMigra(pageProcess:number):Observable<ProcessPaginator>{
      return this.globalService.get(`${this.baseUrl}/historyMigra?page=0&size=5&sort=startTime`, mapMigProc);
    }

    executeMigra(){
        return this.globalService.post(`${this.baseUrl}/restartMigra`);
    }

    executeMigraByRegion(region:string){
        return this.globalService.post(`${this.baseUrl}/restartMigra/${region}`);
    }
    // fin de servicios agregados

    getInterval() {
        return this.globalService.get(`${this.baseUrl}/change-autoclean-interval`);
    }

    changeInterval(interval: string) {
        return this.globalService.put(`${this.baseUrl}/change-autoclean-interval/${interval}`);
    }
}

