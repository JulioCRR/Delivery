import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Process, ProcessDetail, MonitorCtlig2Service, ProcessPaginator} from '../monitor-ctlig2.service';
import {Message, LazyLoadEvent} from 'primeng/primeng';
import {AuthService} from '../../app.service';
import {AlertService} from '../../alert.service';


@Component({
    selector: 'app-ctlig2-list-process',
    templateUrl: './ctlig2-list-process.component.html',
    styleUrls: ['./ctlig2-list-process.component.css']
})
export class Ctlig2ListProcessComponent implements OnInit {
    processList: Process[] = [];
    processPaginator: ProcessPaginator = new ProcessPaginator(this.processList, 0, 0, 0, 0);
    processDetailList: ProcessDetail[] = [];

    regionSelected: string;
    intervalSelected: string;
    timeSelected: number;
    page: number;

    listRegion: string[];
    listInterval: string[];
    loading = false;
    showChangeInterval = false;
    url:string;

    updateSelectedValue(event: string): void {
        this.regionSelected = event;
    }

    updateSelectedIntervalValue(event: string): void {
        this.intervalSelected = event;
    }

    constructor(
        private service: MonitorCtlig2Service,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.url=""+this.router.url;
        console.log("URL ACTUAL ->"+this.url);
        console.log('entro a ngOnInit()');
        this.listRegion = ['TODAS', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.regionSelected = this.listRegion[0];
        this.listInterval = ['5', '15', '30', '45', '60'];

        this.service.getInterval().subscribe((data) => {

            this.intervalSelected = data.json;
            this.showChangeInterval = true;
        });
    }

    executeProcess() {
        if (this.regionSelected == 'TODAS') {
            console.log('entro a executeProcess()');
            this.alertService.push({severity: 'info', summary: 'Ejecutando...', detail: "Todas las regiones"});

            this.service.executeProcess().subscribe(() => {
                // this.processDetailList = [];
                this.alertService.push({severity: 'info', summary: 'Proceso ejecutado', detail: "Todas las regiones"});
                this.service.getProcessList(this.page).subscribe(p => this.processPaginator = p);
            });
            console.log(this.processDetailList);
        } else {
            this.executeProcessByRegion();
        }
    }

    executeProcessByRegion() {
        console.log('entro a executeProcessByRegion()');
        this.alertService.push({severity: 'info', summary: 'Ejecutando...', detail: "Región: " + this.regionSelected});
        this.service.executeProcessByRegion(this.regionSelected).subscribe(() => {
            // this.processDetailList = [];
            this.service.getProcessList(this.page).subscribe(p => this.processPaginator = p);
            this.alertService.push({severity: 'info', summary: 'Proceso ejecutado', detail: "Región: " + this.regionSelected});
        });
    }

    changeAutocleanInterval() {
        console.log('entro a changeAutocleanInterval()');
        this.alertService.push({severity: 'info', summary: 'Ejecutando..', detail: "Valor: " + this.intervalSelected});
        this.service.changeInterval(this.intervalSelected).subscribe(() => {
            this.alertService.push({severity: 'info', summary: 'Cambiado', detail: "Valor: " + this.intervalSelected});
        });
    }

}
