import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {Message} from 'primeng/primeng';

@Injectable()
export class AlertService {
    private keepAfterNavigationChange = false;
    private subject = new Subject<any>();

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next([]);
                }
            }
        });
    }

    push(message: any, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next([message]);
    }

    getMessages(): Observable<any> {
        return this.subject.asObservable();
    }

    clearMessage() {
        this.subject.next([]);
    }

    alert(severity: string, summary: string, detail: string) {
      this.push({ 'severity': severity, 'summary': summary, 'detail': detail });
    }

    createMessage(severity: string, summary: string, detail: string): any {
      return { 'severity': severity, 'summary': summary, 'detail': detail };
    }
}

export class AlertSeverity {
  constructor() { }
  static SUCCESS: string = 'success';
  static INFO: string = 'info';
  static WARN: string = 'warn';
  static ERROR: string = 'error';
}
