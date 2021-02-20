import {
    Component, OnInit, HostBinding,
    trigger, transition,
    animate, style, state
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import{Location} from '@angular/common';


import {ProcessDetail, MonitorCtlig2Service} from '../monitor-ctlig2.service';


@Component({
    selector: 'app-ctlig2-detail',
    templateUrl: './ctlig2-detail.component.html',
    styleUrls: ['./ctlig2-detail.component.css']
})
export class Ctlig2DetailComponent implements OnInit {
    processDetail: ProcessDetail;
    id: number;
    url: string;
    private sub: any;

    constructor(
        private service: MonitorCtlig2Service,
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location
    ) {}

    ngOnInit() {
      this.url=""+this.router.url;
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            this.service.getProcessDetailByid(this.id).subscribe(p => this.processDetail = p);
        });
    }

    backW(){
      this._location.back();
    }

}
