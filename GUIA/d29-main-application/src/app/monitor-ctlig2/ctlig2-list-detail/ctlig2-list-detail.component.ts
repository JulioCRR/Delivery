import 'rxjs/add/operator/switchMap';
import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Process, ProcessDetail, MonitorCtlig2Service, ProcessPaginator} from '../monitor-ctlig2.service';
import {Message, LazyLoadEvent} from 'primeng/primeng';
import {AuthService} from '../../app.service';

@Component({
    selector: 'app-ctlig2-list-detail',
    templateUrl: './ctlig2-list-detail.component.html',
    styleUrls: ['./ctlig2-list-detail.component.css']
})
export class Ctlig2ListDetailComponent implements OnInit {
    @Input() processDetailList: ProcessDetail[] = [];


    constructor(private router: Router) {}

    ngOnInit() {
    }

    onProcessDetailSelected(event: any) {
        this.router.navigate(['admin/monitor-ctlig2', event.data.id]);
    }

}
