webpackJsonp(["admin.module"],{

/***/ "./src/app/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user_component__ = __webpack_require__("./src/app/admin/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profiles_profiles_component__ = __webpack_require__("./src/app/admin/profiles/profiles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_routing__ = __webpack_require__("./src/app/admin/admin.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__profiles_form_profiles_form_component__ = __webpack_require__("./src/app/admin/profiles-form/profiles-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_form_user_form_component__ = __webpack_require__("./src/app/admin/user-form/user-form.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_8__admin_routing__["a" /* AdminRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["TreeModule"],
            __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["CheckboxModule"],
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__user_user_component__["a" /* UserComponent */], __WEBPACK_IMPORTED_MODULE_5__profiles_profiles_component__["a" /* ProfilesComponent */], __WEBPACK_IMPORTED_MODULE_9__profiles_form_profiles_form_component__["a" /* ProfilesFormComponent */], __WEBPACK_IMPORTED_MODULE_10__user_form_user_form_component__["a" /* UserFormComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__admin_service__["a" /* AdminService */]
        ]
    })
], AdminModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/admin.module.js.map

/***/ }),

/***/ "./src/app/admin/admin.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_component__ = __webpack_require__("./src/app/admin/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profiles_profiles_component__ = __webpack_require__("./src/app/admin/profiles/profiles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profiles_form_profiles_form_component__ = __webpack_require__("./src/app/admin/profiles-form/profiles-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_form_user_form_component__ = __webpack_require__("./src/app/admin/user-form/user-form.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var adminRoutes = [
    {
        path: 'user',
        component: __WEBPACK_IMPORTED_MODULE_2__user_user_component__["a" /* UserComponent */],
        children: [
            {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_5__user_form_user_form_component__["a" /* UserFormComponent */],
            }
        ]
    },
    {
        path: 'profile',
        component: __WEBPACK_IMPORTED_MODULE_3__profiles_profiles_component__["a" /* ProfilesComponent */],
        children: [
            {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_4__profiles_form_profiles_form_component__["a" /* ProfilesFormComponent */],
            }
        ]
    }
];
var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    return AdminRoutingModule;
}());
AdminRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(adminRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], AdminRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/admin.routing.js.map

/***/ }),

/***/ "./src/app/admin/profiles-form/profiles-form.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/profiles-form/profiles-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!profile\">\n    Cargando...\n</div>\n<div *ngIf=\"profile\">\n    <h2>Perfil - {{profile.nombre}}</h2>\n\n    <div class=\"row\" style=\"margin-top: 30px;\">\n        <div class=\"col-md-6\">\n            <div class=\"row\">\n                <label class=\"col-md-4 control-label\" >Usuarios del perfil</label>\n                <div class=\"col-md-1 col-md-offset-7\">\n                    <button *ngIf=\"finishLoadUsers\" class=\"btn btn-primary\" pTooltip=\"Agregar usuario a este perfil\"\n                        pButton icon=\"fa-plus\" data-toggle=\"modal\" data-target=\"#myModal\"></button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <p-dataTable [value]=\"paginator.users\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\" [lazy]=\"true\"\n                        (onLazyLoad)=\"loadLazyData($event)\" [totalRecords]=\"paginator.totalElements\">\n                        <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px'}\"></p-column>\n                        <p-column field=\"nombre\" header=\"Nombre\">\n                            <ng-template let-col let-user=\"rowData\" pTemplate=\"body\" style=\"text-align:center\" width=\"10\">\n                                {{user['nombre']}} {{user['apaterno']}} {{user['amaterno']}}\n                            </ng-template>\n                        </p-column>\n                        <p-column field=\"nempleado\" header=\"N. Empleado\" [style]=\"{'width':'150px'}\"></p-column>\n                        <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                            <ng-template pTemplate=\"header\">\n\n                            </ng-template>\n                            <ng-template let-user=\"rowData\" pTemplate=\"body\">\n                                <button type=\"button\" class=\"ui-button-danger\" pTooltip=\"Quitar del perfil\"\n                                        pButton icon=\"fa-trash-o\" (click)=\"deleteUsers(user['id'])\"></button>\n                            </ng-template>\n                        </p-column>\n                    </p-dataTable>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-6\">\n            <div class=\"row\">\n                <label class=\"col-md-4 control-label\" >Menus del perfil</label>\n                <div class=\"col-md-2 col-md-offset-6\">\n                    <button *ngIf=\"finishLoadUsers\" class=\"btn btn-primary\" pTooltip=\"Recargar\" tooltipPosition=\"left\"\n                        (click)=\"refreshMenuList()\"\n                        pButton icon=\"fa-refresh\" ></button>\n                    <button *ngIf=\"finishLoadUsers\" class=\"btn btn-primary\" pTooltip=\"Guardar\" tooltipPosition=\"left\"\n                        (click)=\"saveMenuData()\"\n                        pButton icon=\"fa-floppy-o\" ></button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <p-tree class=\"col-md-12\" [style]=\"{'width':'auto'}\"  [value]=\"menuTrees\" selectionMode=\"checkbox\"\n                            (onNodeSelect)=\"selectTree($event)\"\n                            (onNodeUnselect)=\"unselectTree($event)\"\n                            [(selection)]=\"selectedTrees\">\n                    </p-tree>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- Modal -->\n    <div *ngIf=\"finishLoadUsers\" class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">Agregar un usuario al perfil {{profile.nombre}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group\">\n                                <div class=\"row\" style=\"margin-bottom: 20px;\">\n                                    <label class=\"col-md-2 control-label\" for=\"textSearch\">Buscar</label>\n                                    <div class=\"col-md-4\">\n                                        <input type=\"text\" class=\"form-control\"\n                                               required\n                                               [(ngModel)]=\"textSearch\" name=\"textSearch\"\n                                               (ngModelChange)=\"filterSearch($event)\"\n                                               id=\"textSearch\" placeholder=\"Buscar...\">\n                                    </div>\n                                </div>\n                                <div class=\"row\">\n                                    <p-dataTable [value]=\"paginatorUser.users\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\" [lazy]=\"true\"\n                                        (onLazyLoad)=\"loadLazyDataUsersToSelected($event)\" [totalRecords]=\"paginatorUser.totalElements\"\n                                        [(selection)]=\"selectedUserToProfile\">\n                                        <p-column [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\n                                        <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px'}\"></p-column>\n                                        <p-column field=\"nombre\" header=\"Nombre\">\n                                            <ng-template let-col let-user=\"rowData\" pTemplate=\"body\" style=\"text-align:center\" width=\"10\">\n                                                {{user['nombre']}} {{user['apaterno']}} {{user['amaterno']}}\n                                            </ng-template>\n                                        </p-column>\n                                        <p-column field=\"nempleado\" header=\"N. Empleado\" [style]=\"{'width':'150px'}\"></p-column>\n                                    </p-dataTable>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveUsers()\">Agregar</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/admin/profiles-form/profiles-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilesFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("./src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilesFormComponent = (function () {
    function ProfilesFormComponent(service, route, router, authService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.list = [];
        this.paginator = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["g" /* UserPaginator */](this.list, 0, 0, 0, 0);
        this.listUsers = [];
        this.paginatorUser = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["g" /* UserPaginator */](this.listUsers, 0, 0, 0, 0);
    }
    ProfilesFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.textSearch = "";
        this.finishLoadUsers = false;
        this.route.params.subscribe(function (params) {
            _this.profile = null;
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.service.getProfile(_this.id).subscribe(function (p) {
                _this.profile = p;
            });
            _this.refreshMenuList();
        });
    };
    ProfilesFormComponent.prototype.loadLazyData = function (event) {
        this.page = event.first / 10;
        this.refreshDataUser();
    };
    ProfilesFormComponent.prototype.refreshDataUser = function () {
        var _this = this;
        this.service.getUsersFromProfile(this.id, this.page).subscribe(function (p) {
            _this.paginator = p;
            _this.finishLoadUsers = true;
        });
    };
    ProfilesFormComponent.prototype.loadLazyDataUsersToSelected = function (event) {
        this.refreshDataUsersToSelected(event.first / 10);
    };
    ProfilesFormComponent.prototype.filterSearch = function () {
        this.refreshDataUsersToSelected(0);
    };
    ProfilesFormComponent.prototype.refreshDataUsersToSelected = function (page) {
        var _this = this;
        this.pageForUsers = page;
        this.service.getUsers(this.profile.id, this.textSearch, this.pageForUsers).subscribe(function (p) {
            _this.paginatorUser = p;
        });
    };
    ProfilesFormComponent.prototype.refreshMenuList = function () {
        var _this = this;
        this.service.getMenus().subscribe(function (files) {
            _this.menuTrees = files.json.data;
            _this.selectedTrees = [];
            _this.service.getMenusByPerfil(_this.id).subscribe(function (result) {
                var listMenus = result.json;
                _this.menuTrees.forEach(function (element) {
                    if (listMenus.includes(Number(element.data))) {
                        _this.searchInTree(_this.selectedTrees, listMenus, element);
                        //                            element.partialSelected = true;
                    }
                });
            });
        });
    };
    ProfilesFormComponent.prototype.deleteUsers = function (id) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["c" /* PerfilUsuarioWrapper */](this.id, [id], null);
        this.service.deleteUsers(data).subscribe(function () {
            _this.refreshDataUser();
        });
    };
    ProfilesFormComponent.prototype.saveUsers = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["c" /* PerfilUsuarioWrapper */](this.id, [], null);
        this.selectedUserToProfile.forEach(function (element) {
            data.users.push(element.id);
        });
        this.service.saveUsers(data).subscribe(function () {
            _this.refreshDataUser();
            _this.selectedUserToProfile = [];
        });
    };
    ProfilesFormComponent.prototype.saveMenuData = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["b" /* PerfilMenuWrapper */](this.id, null, new Array());
        this.selectedTrees.forEach(function (element) {
            _this.searchParents(data.menus, element);
        });
        this.service.saveMenus(data).subscribe(function () {
            _this.refreshMenuList();
        });
    };
    ProfilesFormComponent.prototype.searchParents = function (list, element) {
        if (element.parent != undefined) {
            if (!this.searchValueInArray(list, Number(element.parent.data))) {
                list.push(element.parent.data);
            }
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
            this.searchParents(list, element.parent);
        }
        else {
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
        }
    };
    ProfilesFormComponent.prototype.searchValueInArray = function (array, value) {
        var result = false;
        array.forEach(function (id) {
            if (id == value) {
                result = true;
                return;
            }
        });
        return result;
    };
    ProfilesFormComponent.prototype.selectTree = function (event) {
    };
    ProfilesFormComponent.prototype.unselectTree = function (event) {
    };
    ProfilesFormComponent.prototype.searchInTree = function (selectedTrees, listMenus, element) {
        var _this = this;
        if (listMenus.includes(Number(element.data))) {
            selectedTrees.push(element);
            if (element.children.length > 0) {
                element.children.forEach(function (tmpElement) {
                    _this.searchInTree(selectedTrees, listMenus, tmpElement);
                });
            }
        }
    };
    ProfilesFormComponent.prototype.savePerfil = function () {
        //        console.log(this.newProfile);
        //
        //        this.service.saveProfile(this.newProfile).subscribe(() => {
        //            this.newProfile = new Profile(null, "");
        //            this.refreshDataProfile();
        //        });
    };
    return ProfilesFormComponent;
}());
ProfilesFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profiles-form',
        template: __webpack_require__("./src/app/admin/profiles-form/profiles-form.component.html"),
        styles: [__webpack_require__("./src/app/admin/profiles-form/profiles-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */]) === "function" && _d || Object])
], ProfilesFormComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/profiles-form.component.js.map

/***/ }),

/***/ "./src/app/admin/profiles/profiles.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/profiles/profiles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <label class=\"col-md-4 control-label\" ><h2>Perfiles</h2></label>\n    <div class=\"col-md-1 col-md-offset-7\">\n        <button class=\"btn btn-primary\" pTooltip=\"Agregar perfil\" tooltipPosition=\"left\" style=\"margin-bottom: 10px; margin-top:10px;\"\n                pButton icon=\"fa-plus\" data-toggle=\"modal\" data-target=\"#agregarPerfilModal\" (click)=\"clearNewProfile()\" ></button>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <p-dataTable [value]=\"paginator.profiles\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"5\" [lazy]=\"true\"\n            (onLazyLoad)=\"loadLazyData($event)\" [totalRecords]=\"paginator.totalElements\">\n            <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px', 'overflow': 'hidden'}\"></p-column>\n            <p-column field=\"nombre\" header=\"Descripción\"></p-column>\n            <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                <ng-template let-user=\"rowData\" pTemplate=\"body\">\n                    <button type=\"button\" class=\"ui-button-warning\" pTooltip=\"Editar\"\n                            data-toggle=\"modal\" data-target=\"#agregarPerfilModal\" (click)=\"selectProfile(user)\" tooltipPosition=\"left\"\n                            pButton icon=\"fa-pencil\" ></button>\n                </ng-template>\n            </p-column>\n            <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                <ng-template let-user=\"rowData\" pTemplate=\"body\">\n                    <button type=\"button\" class=\"ui-button-success\" pTooltip=\"Permisos\"  tooltipPosition=\"left\"\n                            pButton icon=\"fa-key\" (click)=\"onRowSelected(user['id'])\" ></button>\n                </ng-template>\n            </p-column>\n        </p-dataTable>\n    </div>\n</div>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"agregarPerfilModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"agregarPerfilModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <form #form=\"ngForm\" novalidate >\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"agregarPerfilModalLabel\">Agregar perfil</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n\n                            <div class=\"form-group\">\n                                <label for=\"inputNombre\">Nombre</label>\n                                <input type=\"text\" class=\"form-control\" name=\"nombre\" required [(ngModel)]=\"profile.nombre\" placeholder=\"Nombre del perfil\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"profile.id\">\n                        <div class=\"col-md-12\">\n                            <button pButton type=\"button\" class=\"ui-button-danger\" (click)=\"deleteProfile()\" icon=\"fa-trash-o\" label=\"Eliminar\" data-dismiss=\"modal\"></button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"clearNewProfile()\">Cerrar</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"savePerfil()\" [disabled]=\"!form.valid\">Agregar</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/admin/profiles/profiles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilesComponent = (function () {
    function ProfilesComponent(service, route, router, authService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.list = [];
        this.profile = new __WEBPACK_IMPORTED_MODULE_2__admin_service__["d" /* Profile */](null, "");
        this.paginator = new __WEBPACK_IMPORTED_MODULE_2__admin_service__["e" /* ProfilePaginator */](this.list, 0, 0, 0, 0);
    }
    ProfilesComponent.prototype.ngOnInit = function () {
    };
    ProfilesComponent.prototype.loadLazyData = function (event) {
        this.page = event.first / 5;
        this.refreshDataProfile();
    };
    ProfilesComponent.prototype.refreshDataProfile = function () {
        var _this = this;
        this.service.getProfileList(this.page).subscribe(function (p) { return _this.paginator = p; });
    };
    ProfilesComponent.prototype.onRowSelected = function (id) {
        this.router.navigate(['admin/admin/profile', id]);
    };
    ProfilesComponent.prototype.selectProfile = function (profileSelected) {
        this.profile = profileSelected;
    };
    ProfilesComponent.prototype.savePerfil = function () {
        var _this = this;
        this.service.saveProfile(this.profile).subscribe(function () {
            _this.profile = new __WEBPACK_IMPORTED_MODULE_2__admin_service__["d" /* Profile */](null, "");
            _this.refreshDataProfile();
            jQuery('#agregarPerfilModal').modal("hide");
        });
    };
    ProfilesComponent.prototype.clearNewProfile = function () {
        this.profile = new __WEBPACK_IMPORTED_MODULE_2__admin_service__["d" /* Profile */](null, "");
    };
    ProfilesComponent.prototype.deleteProfile = function () {
        var _this = this;
        this.service.deleteProfile(this.profile).subscribe(function () {
            _this.profile = new __WEBPACK_IMPORTED_MODULE_2__admin_service__["d" /* Profile */](null, "");
            _this.refreshDataProfile();
            jQuery('#agregarPerfilModal').modal("hide");
        }, function (err) {
            if (err.status == 500) {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', summary: 'No se completo la acción', detail: "No se pudo eliminar el perfil, cuenta con dependencias" });
            }
        });
    };
    return ProfilesComponent;
}());
ProfilesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profiles',
        template: __webpack_require__("./src/app/admin/profiles/profiles.component.html"),
        styles: [__webpack_require__("./src/app/admin/profiles/profiles.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AuthService */]) === "function" && _d || Object])
], ProfilesComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/profiles.component.js.map

/***/ }),

/***/ "./src/app/admin/user-form/user-form.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/user-form/user-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!user\">\n    Cargando...\n</div>\n<div *ngIf=\"user\">\n    <h2>Usuario - {{user.nombre}} {{user.apaterno}} {{user.amaterno}}</h2>\n\n    <div class=\"row\" style=\"margin-top: 30px;\">\n        <div class=\"col-md-6\">\n            <div class=\"row\">\n                <label class=\"col-md-4 control-label\" >Perfiles del usuario</label>\n                <div class=\"col-md-1 col-md-offset-7\">\n                    <button *ngIf=\"finishLoadProfiles\" class=\"btn btn-primary\" pTooltip=\"Agregar perfil a este usuario\"\n                        pButton icon=\"fa-plus\" data-toggle=\"modal\" data-target=\"#myModal\"></button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <p-dataTable [value]=\"paginator.profiles\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\" [lazy]=\"true\"\n                        (onLazyLoad)=\"loadLazyData($event)\" [totalRecords]=\"paginator.totalElements\">\n                        <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px'}\"></p-column>\n                        <p-column field=\"nombre\" header=\"Nombre\"></p-column>\n                        <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                            <ng-template let-profile=\"rowData\" pTemplate=\"body\">\n                                <button type=\"button\" class=\"ui-button-danger\" pTooltip=\"Quitar del usuario\"\n                                        pButton icon=\"fa-trash-o\" (click)=\"deleteProfiles(profile['id'])\"></button>\n                            </ng-template>\n                        </p-column>\n                    </p-dataTable>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-6\">\n            <div class=\"row\">\n                <label class=\"col-md-4 control-label\" >Menus del usuario</label>\n                <div class=\"col-md-2 col-md-offset-6\">\n                    <button *ngIf=\"finishLoadProfiles\" class=\"btn btn-primary\" pTooltip=\"Recargar\" tooltipPosition=\"left\"\n                        (click)=\"refreshMenuList()\"\n                        pButton icon=\"fa-refresh\" ></button>\n                    <button *ngIf=\"finishLoadProfiles\" class=\"btn btn-primary\" pTooltip=\"Guardar\" tooltipPosition=\"left\"\n                        (click)=\"saveMenuData()\"\n                        pButton icon=\"fa-floppy-o\" ></button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <p-tree class=\"col-md-12\" [style]=\"{'width':'auto'}\"  [value]=\"menuTrees\" selectionMode=\"checkbox\"\n                            (onNodeSelect)=\"selectTree($event)\"\n                            (onNodeUnselect)=\"unselectTree($event)\"\n                            [(selection)]=\"selectedTrees\">\n                    </p-tree>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- Modal -->\n    <div *ngIf=\"finishLoadProfiles\" class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">Agregar un perfil al usuario {{user.nombre}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group\">\n                                <div class=\"row\">\n                                    <p-dataTable [value]=\"paginatorPerfil.profiles\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\" [lazy]=\"true\"\n                                        (onLazyLoad)=\"loadLazyDataProfilesToSelected($event)\" [totalRecords]=\"paginatorPerfil.totalElements\"\n                                        [(selection)]=\"selectedProfileToUser\">\n                                        <p-column [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\n                                        <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px'}\"></p-column>\n                                        <p-column field=\"nombre\" header=\"Nombre\">\n                                            <ng-template let-col let-user=\"rowData\" pTemplate=\"body\" style=\"text-align:center\" width=\"10\">\n                                                {{user['nombre']}} {{user['apaterno']}} {{user['amaterno']}}\n                                            </ng-template>\n                                        </p-column>\n                                        <p-column field=\"nempleado\" header=\"N. Empleado\" [style]=\"{'width':'150px'}\"></p-column>\n                                    </p-dataTable>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveProfiles()\">Agregar</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/admin/user-form/user-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("./src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserFormComponent = (function () {
    function UserFormComponent(service, route, router, authService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.list = [];
        this.paginator = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["e" /* ProfilePaginator */](this.list, 0, 0, 0, 0);
        this.listProfiles = [];
        this.paginatorPerfil = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["e" /* ProfilePaginator */](this.listProfiles, 0, 0, 0, 0);
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.textSearch = "";
        this.finishLoadProfiles = false;
        this.route.params.subscribe(function (params) {
            _this.user = null;
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.service.getUser(_this.id).subscribe(function (p) {
                _this.user = p;
            });
        });
    };
    UserFormComponent.prototype.loadLazyData = function (event) {
        this.page = event.first / 10;
        this.refreshDataUser();
    };
    UserFormComponent.prototype.refreshDataUser = function () {
        var _this = this;
        this.service.getProfilesFromUser(this.id, this.page).subscribe(function (p) {
            _this.paginator = p;
            _this.finishLoadProfiles = true;
            _this.refreshMenuList();
            _this.refreshDataProfilesToSelected(0);
        });
    };
    UserFormComponent.prototype.loadLazyDataProfilesToSelected = function (event) {
        this.refreshDataProfilesToSelected(event.first / 10);
    };
    UserFormComponent.prototype.filterSearch = function () {
        this.refreshDataProfilesToSelected(0);
    };
    UserFormComponent.prototype.refreshDataProfilesToSelected = function (page) {
        var _this = this;
        this.pageForProfiles = page;
        this.service.getProfiles(this.user.id, this.pageForProfiles).subscribe(function (p) {
            _this.paginatorPerfil = p;
        });
    };
    UserFormComponent.prototype.refreshMenuList = function () {
        var _this = this;
        this.service.getMenus().subscribe(function (files) {
            _this.menuTrees = files.json.data;
            _this.selectedTrees = [];
            _this.service.getMenusByUsuario(_this.id).subscribe(function (result) {
                var listMenus = result.json;
                _this.menuTrees.forEach(function (element) {
                    if (listMenus.includes(Number(element.data))) {
                        _this.searchInTree(_this.selectedTrees, listMenus, element);
                        //                            element.partialSelected = true;
                    }
                });
            });
        });
    };
    UserFormComponent.prototype.deleteProfiles = function (id) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["c" /* PerfilUsuarioWrapper */](this.id, null, [id]);
        this.service.deleteProfiles(data).subscribe(function () {
            _this.refreshDataUser();
        });
    };
    UserFormComponent.prototype.saveProfiles = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["c" /* PerfilUsuarioWrapper */](this.id, null, []);
        this.selectedProfileToUser.forEach(function (element) {
            data.profiles.push(element.id);
        });
        this.service.saveProfiles(data).subscribe(function () {
            _this.refreshDataUser();
            _this.selectedProfileToUser = [];
        });
    };
    UserFormComponent.prototype.saveMenuData = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["b" /* PerfilMenuWrapper */](null, this.id, new Array());
        this.selectedTrees.forEach(function (element) {
            _this.searchParents(data.menus, element);
        });
        this.service.saveMenus(data).subscribe(function () {
            _this.refreshMenuList();
        });
    };
    UserFormComponent.prototype.searchParents = function (list, element) {
        if (element.parent != undefined) {
            if (!this.searchValueInArray(list, Number(element.parent.data))) {
                list.push(element.parent.data);
            }
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
            this.searchParents(list, element.parent);
        }
        else {
            if (!this.searchValueInArray(list, Number(element.data))) {
                list.push(element.data);
            }
        }
    };
    UserFormComponent.prototype.searchValueInArray = function (array, value) {
        var result = false;
        array.forEach(function (id) {
            if (id == value) {
                result = true;
                return;
            }
        });
        return result;
    };
    UserFormComponent.prototype.selectTree = function (event) {
    };
    UserFormComponent.prototype.unselectTree = function (event) {
    };
    UserFormComponent.prototype.searchInTree = function (selectedTrees, listMenus, element) {
        var _this = this;
        if (listMenus.includes(Number(element.data))) {
            selectedTrees.push(element);
            if (element.children.length > 0) {
                element.children.forEach(function (tmpElement) {
                    _this.searchInTree(selectedTrees, listMenus, tmpElement);
                });
            }
        }
    };
    UserFormComponent.prototype.savePerfil = function () {
        //
        //        this.service.saveUser(this.newUser).subscribe(() => {
        //            this.newUser = new User(null, "");
        //            this.refreshDataUser();
        //        });
    };
    return UserFormComponent;
}());
UserFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user-form',
        template: __webpack_require__("./src/app/admin/user-form/user-form.component.html"),
        styles: [__webpack_require__("./src/app/admin/user-form/user-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */]) === "function" && _d || Object])
], UserFormComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/user-form.component.js.map

/***/ }),

/***/ "./src/app/admin/user/user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-4\">\n        <label class=\"control-label\" ><h2>Usuarios</h2></label>\n    </div>\n    <div class=\"col-md-4\"></div>\n    <div class=\"col-md-4\">\n        <div class=\"col-md-10\">\n            <input type=\"search\" class=\"form-control\"\n                   required\n                   [(ngModel)]=\"textSearch\" name=\"textSearch\"\n                   (ngModelChange)=\"filterSearch($event)\"\n                   id=\"textSearch\" placeholder=\"Buscar...\" />\n\n        </div>\n        <div class=\"col-md-2\">\n            <button class=\"btn btn-primary\" pTooltip=\"Agregar usuario\" tooltipPosition=\"left\" style=\"margin-bottom: 10px; margin-top:10px;\"\n                    pButton icon=\"fa-plus\" data-toggle=\"modal\" data-target=\"#agregarModal\"></button>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <p-dataTable [value]=\"paginator.users\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"10\" [lazy]=\"true\"\n            (onLazyLoad)=\"loadLazyData($event)\" [totalRecords]=\"paginator.totalElements\">\n            <p-column field=\"id\" header=\"ID\" styleClass=\"col-id\" [style]=\"{'width':'35px', 'overflow': 'hidden'}\"></p-column>\n            <p-column field=\"nempleado\" header=\"N. Empleado\"></p-column>\n            <p-column field=\"nombre\" header=\"Nombre\">\n                <ng-template let-col let-user=\"rowData\" pTemplate=\"body\">\n                    {{user['nombre']}} {{user['apaterno']}} {{user['amaterno']}}\n                </ng-template>\n            </p-column>\n            <p-column field=\"extension\" header=\"Extensión\" [style]=\"{'width':'150px'}\"></p-column>\n            <p-column field=\"correo\" header=\"Correo\"></p-column>\n            <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                <ng-template let-user=\"rowData\" pTemplate=\"body\">\n                    <button type=\"button\" class=\"ui-button-warning\" pTooltip=\"Editar\"\n                            data-toggle=\"modal\" data-target=\"#agregarModal\" (click)=\"selectUser(user)\" tooltipPosition=\"left\"\n                            pButton icon=\"fa-pencil\" ></button>\n                </ng-template>\n            </p-column>\n            <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                <ng-template let-user=\"rowData\" pTemplate=\"body\">\n                    <button type=\"button\" class=\"ui-button-success\" pTooltip=\"Permisos\"  tooltipPosition=\"left\"\n                            pButton icon=\"fa-key\" (click)=\"onRowSelected(user['id'])\" ></button>\n                </ng-template>\n            </p-column>\n        </p-dataTable>\n    </div>\n</div>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"agregarModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"agregarModallLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <form #form=\"ngForm\" novalidate >\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"agregarModalLabel\">Agregar usuario</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"form-group col-md-6\">\n                            <label>N. Empleado</label>\n                            <input type=\"text\" class=\"form-control\" name=\"nempleado\" required [(ngModel)]=\"user.nempleado\" placeholder=\"Ej. EX287879\">\n                        </div>\n                        <div class=\"form-group col-md-6\">\n                            <label>Nombre</label>\n                            <input type=\"text\" class=\"form-control\" name=\"nombre\" required [(ngModel)]=\"user.nombre\" placeholder=\"Ej. Angel\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"form-group col-md-6\">\n                            <label>A. Paterno</label>\n                            <input type=\"text\" class=\"form-control\" name=\"apaterno\" [(ngModel)]=\"user.apaterno\" placeholder=\"Ej. Garcia\">\n                        </div>\n                        <div class=\"form-group col-md-6\">\n                            <label>A. Materno</label>\n                            <input type=\"text\" class=\"form-control\" name=\"amaterno\" [(ngModel)]=\"user.amaterno\" placeholder=\"Ej. Hernández\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"form-group col-md-6\">\n                            <label>Correo</label>\n                            <input type=\"text\" class=\"form-control\" name=\"correo\" [(ngModel)]=\"user.correo\" placeholder=\"Ej. alan@mail.telcel.com\">\n                        </div>\n                        <div class=\"form-group col-md-6\">\n                            <label>Usuario de Red</label>\n                            <input type=\"text\" class=\"form-control\" name=\"usuarioRed\" [(ngModel)]=\"user.usuarioRed\" placeholder=\"Ej. VI9XXDF\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"form-group col-md-6\">\n                            <label>Extensión</label>\n                            <input type=\"text\" class=\"form-control\" name=\"extension\" [(ngModel)]=\"user.extension\" placeholder=\"EJ. 3259\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"clearUser()\">Cerrar</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveUser()\" [disabled]=\"!form.valid\">Guardar</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/admin/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserComponent = (function () {
    function UserComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.textSearch = "";
        this.list = [];
        this.user = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["f" /* User */](null, "", "", "", "", "", "", "");
        this.paginator = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["g" /* UserPaginator */](this.list, 0, 0, 0, 0);
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.loadLazyData = function (event) {
        this.page = event.first / 10;
        this.refreshDataUser(this.page);
    };
    UserComponent.prototype.refreshDataUser = function (page) {
        var _this = this;
        this.service.getUsers(0, this.textSearch, page).subscribe(function (p) {
            _this.paginator = p;
        });
    };
    UserComponent.prototype.filterSearch = function () {
        this.refreshDataUser(0);
    };
    UserComponent.prototype.onRowSelected = function (id) {
        this.router.navigate(['admin/admin/user', id]);
    };
    UserComponent.prototype.saveUser = function () {
        var _this = this;
        this.service.saveUser(this.user).subscribe(function () {
            _this.user = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["f" /* User */](null, "", "", "", "", "", "", "");
            _this.refreshDataUser(_this.page);
            jQuery('#agregarModal').modal("hide");
        });
    };
    UserComponent.prototype.clearUser = function () {
        this.user = new __WEBPACK_IMPORTED_MODULE_1__admin_service__["f" /* User */](null, "", "", "", "", "", "", "");
    };
    UserComponent.prototype.selectUser = function (userSelected) {
        this.user = userSelected;
    };
    return UserComponent;
}());
UserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user',
        template: __webpack_require__("./src/app/admin/user/user.component.html"),
        styles: [__webpack_require__("./src/app/admin/user/user.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object])
], UserComponent);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/user.component.js.map

/***/ })

});
//# sourceMappingURL=admin.module.chunk.js.map