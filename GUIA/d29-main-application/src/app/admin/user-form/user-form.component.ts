import {Component, OnInit} from '@angular/core';
import {Profile, User, ProfilePaginator, AdminService, PerfilMenuWrapper, PerfilUsuarioWrapper} from '../admin.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Message, LazyLoadEvent, TreeNode} from 'primeng/primeng';
import {AuthService} from '../../app.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    user: User;
    list: Profile[] = [];
    paginator: ProfilePaginator = new ProfilePaginator(this.list, 0, 0, 0, 0);

    listProfiles: Profile[] = [];
    paginatorPerfil: ProfilePaginator = new ProfilePaginator(this.listProfiles, 0, 0, 0, 0);

    id: number;
    textSearch: string;
    pageForProfiles: number;
    page: number;
    selectedProfileToUser: Profile[];
    finishLoadProfiles: boolean;

    menuTrees: TreeNode[];
    selectedTrees: TreeNode[];

    constructor(private service: AdminService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
        this.textSearch = "";
        this.finishLoadProfiles = false;

        this.route.params.subscribe(params => {
            this.user = null;
            this.id = +params['id']; // (+) converts string 'id' to a number

            this.service.getUser(this.id).subscribe((p) => {
                this.user = p
            });

        });
    }

    loadLazyData(event: LazyLoadEvent) {
        this.page = event.first / 10;
        this.refreshDataUser();
    }

    refreshDataUser() {
        this.service.getProfilesFromUser(this.id, this.page).subscribe((p) => {
            this.paginator = p;
            this.finishLoadProfiles = true;
            this.refreshMenuList();
            this.refreshDataProfilesToSelected(0);

        });
    }

    loadLazyDataProfilesToSelected(event: LazyLoadEvent) {
        this.refreshDataProfilesToSelected(event.first / 10);
    }

    filterSearch() {
        this.refreshDataProfilesToSelected(0);
    }

    refreshDataProfilesToSelected(page) {
        this.pageForProfiles = page;
        this.service.getProfiles(this.user.id, this.pageForProfiles).subscribe((p) => {
            this.paginatorPerfil = p;
        });
    }

    refreshMenuList() {
        this.service.getMenus().subscribe((files) => {
            this.menuTrees = files.json.data;

            this.selectedTrees = [];
            this.service.getMenusByUsuario(this.id).subscribe((result) => {
                let listMenus = result.json;
                this.menuTrees.forEach((element) => {
                    if (listMenus.includes(Number(element.data))) {
                        this.searchInTree(this.selectedTrees, listMenus, element);
                        //                            element.partialSelected = true;

                    }

                })
            });


        });
    }

    deleteProfiles(id) {
        let data = new PerfilUsuarioWrapper(this.id, null, [id]);
        this.service.deleteProfiles(data).subscribe(() => {
            this.refreshDataUser();

        });
    }

    saveProfiles() {
        let data = new PerfilUsuarioWrapper(this.id, null, []);
        this.selectedProfileToUser.forEach((element) => {
            data.profiles.push(element.id);
        });
        this.service.saveProfiles(data).subscribe(() => {
            this.refreshDataUser();
            this.selectedProfileToUser = [];
        });
    }

    saveMenuData() {
        let data = new PerfilMenuWrapper(null, this.id, new Array());

        this.selectedTrees.forEach((element) => {
            this.searchParents(data.menus, element);
        });
        this.service.saveMenus(data).subscribe(() => {
            this.refreshMenuList();
        });
    }

    searchParents(list, element) {
        if (element.parent != undefined) {
            if (!this.searchValueInArray(list, Number(element.parent.data))) {
                list.push(element.parent.data);
            }
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
            this.searchParents(list, element.parent);
        } else {
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
        }

    }

    searchValueInArray(array, value) {
        var result = false;
        array.forEach((id) => {
            if (id == value) {
                result = true;
                return;
            }
        });

        return result;
    }

    selectTree(event) {

    }
    unselectTree(event) {

    }

    searchInTree(selectedTrees, listMenus, element) {
        if (listMenus.includes(Number(element.data))) {
            selectedTrees.push(element);
            if (element.children.length > 0) {
                element.children.forEach((tmpElement) => {
                    this.searchInTree(selectedTrees, listMenus, tmpElement);
                });
            }
        }
    }

    savePerfil() {
        //
        //        this.service.saveUser(this.newUser).subscribe(() => {
        //            this.newUser = new User(null, "");
        //            this.refreshDataUser();
        //        });
    }
}
