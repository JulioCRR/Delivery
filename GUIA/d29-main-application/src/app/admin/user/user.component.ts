import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../app.service';
import {User, UserPaginator, AdminService} from '../admin.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Message, LazyLoadEvent} from 'primeng/primeng';
declare var jQuery: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    textSearch: string = "";
    list: User[] = [];
    user: User = new User(
        null,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    );
    paginator: UserPaginator = new UserPaginator(this.list, 0, 0, 0, 0);
    page: number;

    constructor(private service: AdminService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
    }

    loadLazyData(event: LazyLoadEvent) {
        this.page = event.first / 10;
        this.refreshDataUser(this.page);
    }

    refreshDataUser(page) {
        this.service.getUsers(0, this.textSearch, page).subscribe((p) => {
            this.paginator = p;
        });
    }

    filterSearch() {
        this.refreshDataUser(0);
    }

    onRowSelected(id) {
        this.router.navigate(['admin/admin/user', id]);
    }

    saveUser() {

        this.service.saveUser(this.user).subscribe(() => {
            this.user = new User(
                null,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
            );
            this.refreshDataUser(this.page);
            jQuery('#agregarModal').modal("hide");
        });
    }
    clearUser() {
        this.user = new User(
            null,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        );
    }

    selectUser(userSelected) {
        this.user = userSelected;
    }


}
