import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Message, LazyLoadEvent} from 'primeng/primeng';
import {AuthService} from '../../app.service';
import {AlertService} from '../../alert.service';
import { MonitorCtlig2Service, Process, ProcessPaginator, ProcessDetail } from '../monitor-ctlig2.service';

@Component({
  selector: 'app-ctlig2-cron',
  templateUrl: './ctlig2-cron.component.html',
  styleUrls: ['./ctlig2-cron.component.css']
})
export class Ctlig2CronComponent implements OnInit {
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

  ngOnInit(): void {
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

  executeMigra() {
    if (this.regionSelected == 'TODAS') {
        console.log('entro a executeProcess()');
        this.alertService.push({severity: 'info', summary: 'Ejecutando...', detail: "Todas las regiones"});

        this.service.executeMigra().subscribe(() => {
            // this.processDetailList = [];
            this.alertService.push({severity: 'info', summary: 'Proceso ejecutado', detail: "Todas las regiones"});
            this.service.getHistoryMigra(this.page).subscribe(p => this.processPaginator = p);
        });
        console.log(this.processDetailList);
    } else {
        this.executeMigraByRegion();
    }
}

executeMigraByRegion() {
    console.log('entro a executeMigraByRegion()');
    this.alertService.push({severity: 'info', summary: 'Ejecutando...', detail: "Región: " + this.regionSelected});
    this.service.executeMigraByRegion(this.regionSelected).subscribe(() => {
        // this.processDetailList = [];
        this.service.getHistoryMigra(this.page).subscribe(p => this.processPaginator = p);
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

loadHistoryData(){
  console.log("INTO THE LOAD HISTORY DATA METHOD");
  this.service.getHistoryMigra(this.page).subscribe(p => this.processPaginator = p);
  this.alertService.push({severity: 'info', summary: 'EXECUTED PROCESS', detail: "EXECUTING LOAD HISTORY DATA "});
}


}
