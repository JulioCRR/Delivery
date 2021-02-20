import {Component} from '@angular/core';
import {Message} from 'primeng/primeng';
import {AlertService} from './alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    mainMessages: Message[];

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.getMessages().subscribe(messages => {this.mainMessages = messages;});
    }
}
