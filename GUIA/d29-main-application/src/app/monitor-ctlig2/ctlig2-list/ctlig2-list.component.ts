import 'rxjs/add/operator/switchMap';
import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Process, ProcessDetail, MonitorCtlig2Service, ProcessPaginator} from '../monitor-ctlig2.service';
import {Message, LazyLoadEvent} from 'primeng/primeng';
import {AuthService} from '../../app.service';

@Component({
    selector: 'app-ctlig2-list',
    templateUrl: './ctlig2-list.component.html',
    styleUrls: ['./ctlig2-list.component.css']
})
export class Ctlig2ListComponent implements OnInit {
    @Input() processList: Process[] = [];
    @Input() processPaginator: ProcessPaginator = new ProcessPaginator(this.processList, 0, 0, 0, 0);
    @Input() processDetailList: ProcessDetail[] = [];
    @Input() processSelected: Process;
    @Input() msgs: Message[];
    @Input() page: number;
    @Input() url:string;
    totalRecordsProcess: number;


    constructor(
        private service: MonitorCtlig2Service,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
    }

    onProcessSelected(event: any) {
        this.processSelected = event.data;
        this.service.getProcessDetailByProcess(this.processSelected.id).subscribe(p => this.processDetailList = p
            , (err: any) => {
                if (err.status == 401) {
                    this.authService.logout();
                }
            });
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Detalle de', detail: event.data.description});
    }

    loadDataProcess(event: LazyLoadEvent) {
        this.page = event.first / 5;
        this.service.getProcessList(this.page).subscribe(p => this.processPaginator = p
            , (err) => {
                if (err.status == 401) {
                    this.authService.logout();
                }
            });
    }

    loadHistMig(event:LazyLoadEvent){
      this.page=event.first/5;
      this.service.getMigList(this.page).subscribe(p => this.processPaginator = p
        , (err) => {
                if(err.status==401){
                    this.authService.logout();
                }
            });
    }
}
