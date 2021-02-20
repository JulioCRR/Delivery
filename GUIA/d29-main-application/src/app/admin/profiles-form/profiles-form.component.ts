import {Component, OnInit} from '@angular/core';
import {User, UserPaginator, Profile, AdminService, PerfilMenuWrapper, PerfilUsuarioWrapper} from '../admin.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Message, LazyLoadEvent, TreeNode} from 'primeng/primeng';
import {AuthService} from '../../app.service';

@Component({
    selector: 'app-profiles-form',
    templateUrl: './profiles-form.component.html',
    styleUrls: ['./profiles-form.component.css']
})
export class ProfilesFormComponent implements OnInit {
    profile: Profile;
    list: User[] = [];
    paginator: UserPaginator = new UserPaginator(this.list, 0, 0, 0, 0);

    listUsers: User[] = [];
    paginatorUser: UserPaginator = new UserPaginator(this.listUsers, 0, 0, 0, 0);

    id: number;
    textSearch: string;
    pageForUsers: number;
    page: number;
    selectedUserToProfile: User[];
    finishLoadUsers: boolean;

    menuTrees: TreeNode[];
    selectedTrees: TreeNode[];

    constructor(private service: AdminService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
        this.textSearch = "";
        this.finishLoadUsers = false;

        this.route.params.subscribe(params => {
            this.profile = null;
            this.id = +params['id']; // (+) converts string 'id' to a number

            this.service.getProfile(this.id).subscribe((p) => {
                this.profile = p
            });

            this.refreshMenuList();

        });
    }

    loadLazyData(event: LazyLoadEvent) {
        this.page = event.first / 10;
        this.refreshDataUser();
    }

    refreshDataUser() {
        this.service.getUsersFromProfile(this.id, this.page).subscribe((p) => {
            this.paginator = p;
            this.finishLoadUsers = true;
        });
    }

    loadLazyDataUsersToSelected(event: LazyLoadEvent) {
        this.refreshDataUsersToSelected(event.first / 10);
    }

    filterSearch() {
        this.refreshDataUsersToSelected(0);
    }

    refreshDataUsersToSelected(page) {
        this.pageForUsers = page;
        this.service.getUsers(this.profile.id, this.textSearch, this.pageForUsers).subscribe((p) => {
            this.paginatorUser = p;
        });
    }

    refreshMenuList() {
        this.service.getMenus().subscribe((files) => {
            this.menuTrees = files.json.data;

            this.selectedTrees = [];
            this.service.getMenusByPerfil(this.id).subscribe((result) => {
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

    deleteUsers(id) {
        let data = new PerfilUsuarioWrapper(this.id, [id], null);
        this.service.deleteUsers(data).subscribe(() => {
            this.refreshDataUser();

        });
    }

    saveUsers() {
        let data = new PerfilUsuarioWrapper(this.id, [], null);
        this.selectedUserToProfile.forEach((element) => {
            data.users.push(element.id);
        });
        this.service.saveUsers(data).subscribe(() => {
            this.refreshDataUser();
            this.selectedUserToProfile = [];
        });
    }

    saveMenuData() {
        let data = new PerfilMenuWrapper(this.id, null, new Array());

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
        //        console.log(this.newProfile);
        //
        //        this.service.saveProfile(this.newProfile).subscribe(() => {
        //            this.newProfile = new Profile(null, "");
        //            this.refreshDataProfile();
        //        });
    }

}

