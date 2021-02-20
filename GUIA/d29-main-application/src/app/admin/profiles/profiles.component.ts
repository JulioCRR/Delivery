import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../app.service';
import {Profile, ProfilePaginator, AdminService} from '../admin.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Message, LazyLoadEvent} from 'primeng/primeng';
declare var jQuery: any;

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
    list: Profile[] = [];
    profile: Profile = new Profile(null, "");
    paginator: ProfilePaginator = new ProfilePaginator(this.list, 0, 0, 0, 0);
    page: number;
    msgs: Message[];

    constructor(private service: AdminService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
    }

    loadLazyData(event: LazyLoadEvent) {
        this.page = event.first / 5;
        this.refreshDataProfile();
    }

    refreshDataProfile() {
        this.service.getProfileList(this.page).subscribe(p => this.paginator = p);
    }

    onRowSelected(id: any) {
        this.router.navigate(['admin/admin/profile', id]);
    }
    selectProfile(profileSelected) {
        this.profile = profileSelected;
    }

    savePerfil() {

        this.service.saveProfile(this.profile).subscribe(() => {
            this.profile = new Profile(null, "");
            this.refreshDataProfile();
            jQuery('#agregarPerfilModal').modal("hide");
        });
    }
    clearNewProfile() {
        this.profile = new Profile(null, "");
    }

    deleteProfile() {
        this.service.deleteProfile(this.profile).subscribe(() => {
            this.profile = new Profile(null, "");
            this.refreshDataProfile();
            jQuery('#agregarPerfilModal').modal("hide");
        }, (err) => {
            if (err.status == 500) {
                this.msgs = [];

                this.msgs.push({severity: 'error', summary: 'No se completo la acción', detail: "No se pudo eliminar el perfil, cuenta con dependencias"});
            }
        });
    }


}
