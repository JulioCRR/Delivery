webpackJsonp(["monitor-ctlig2.module"],{

/***/ "./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"margin-top:80px;\">\n  <div class=\"col-md-4\">\n      <h2>HISTORIAL TAREA MIGRA</h2>\n  </div>\n  <div class=\"col-md-5 col-md-offset-7\">\n\n      <!--<div class=\"pull-left\"  *ngIf=\"showChangeInterval\">\n          <button type=\"button\" class=\"btn btn-link\" data-toggle=\"modal\" data-target=\"#myModal\">Cambiar intervalo</button>\n      </div>-->\n\n      <div class=\"pull-right\">\n          <label for=\"selectRegion\">Región</label>\n          <select [ngModel]=\"regionSelected\" (ngModelChange)=\"updateSelectedValue($event)\">\n              <option *ngFor=\"let region of listRegion\" [value]=\"region\" >{{region}}</option>\n          </select>\n\n          <button [disabled]=\"loading\" type=\"button\" class=\"btn btn-primary\" (click)=\"executeMigra()\">Ejecutar</button>\n          <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"/>\n      </div>\n  </div>\n</div>\n<div class=\"row\">\n  <app-ctlig2-list #ctglig2List [page]=\"page\" [processList]=processList [processPaginator]=\"processPaginator\" [processSelected]=\"processSelected\" [processDetailList]=\"processDetailList\" [msgs]=\"msgs\" [url]=\"url\"></app-ctlig2-list>\n</div>\n\n<div *ngIf=\"ctglig2List.processSelected\">\n  <app-ctlig2-list-detail [processDetailList]=\"ctglig2List.processDetailList\"></app-ctlig2-list-detail>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n          <div class=\"modal-header\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n              <h4 class=\"modal-title\" id=\"myModalLabel\">Ejecución por región</h4>\n          </div>\n          <div class=\"modal-body\">\n              <div class=\"row\">\n                  <div class=\"col-md-12\">\n                      <div class=\"form-group\">\n                          <label for=\"selectRegion\">Intervalo de ejecución</label>\n                          <select [ngModel]=\"intervalSelected\" (ngModelChange)=\"updateSelectedIntervalValue($event)\">\n                              <option *ngFor=\"let interval of listInterval\" [value]=\"interval\" >{{interval}}</option>\n                          </select>\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n              <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"changeAutocleanInterval()\">Aceptar</button>\n          </div>\n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ctlig2CronComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_service__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Ctlig2CronComponent = (function () {
    function Ctlig2CronComponent(service, route, router, authService, alertService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.alertService = alertService;
        this.processList = [];
        this.processPaginator = new __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_service__["c" /* ProcessPaginator */](this.processList, 0, 0, 0, 0);
        this.processDetailList = [];
        this.loading = false;
        this.showChangeInterval = false;
    }
    Ctlig2CronComponent.prototype.updateSelectedValue = function (event) {
        this.regionSelected = event;
    };
    Ctlig2CronComponent.prototype.updateSelectedIntervalValue = function (event) {
        this.intervalSelected = event;
    };
    Ctlig2CronComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.url = "" + this.router.url;
        console.log("URL ACTUAL ->" + this.url);
        console.log('entro a ngOnInit()');
        this.listRegion = ['TODAS', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.regionSelected = this.listRegion[0];
        this.listInterval = ['5', '15', '30', '45', '60'];
        this.service.getInterval().subscribe(function (data) {
            _this.intervalSelected = data.json;
            _this.showChangeInterval = true;
        });
    };
    Ctlig2CronComponent.prototype.executeMigra = function () {
        var _this = this;
        if (this.regionSelected == 'TODAS') {
            console.log('entro a executeProcess()');
            this.alertService.push({ severity: 'info', summary: 'Ejecutando...', detail: "Todas las regiones" });
            this.service.executeMigra().subscribe(function () {
                // this.processDetailList = [];
                _this.alertService.push({ severity: 'info', summary: 'Proceso ejecutado', detail: "Todas las regiones" });
                _this.service.getHistoryMigra(_this.page).subscribe(function (p) { return _this.processPaginator = p; });
            });
            console.log(this.processDetailList);
        }
        else {
            this.executeMigraByRegion();
        }
    };
    Ctlig2CronComponent.prototype.executeMigraByRegion = function () {
        var _this = this;
        console.log('entro a executeMigraByRegion()');
        this.alertService.push({ severity: 'info', summary: 'Ejecutando...', detail: "Región: " + this.regionSelected });
        this.service.executeMigraByRegion(this.regionSelected).subscribe(function () {
            // this.processDetailList = [];
            _this.service.getHistoryMigra(_this.page).subscribe(function (p) { return _this.processPaginator = p; });
            _this.alertService.push({ severity: 'info', summary: 'Proceso ejecutado', detail: "Región: " + _this.regionSelected });
        });
    };
    Ctlig2CronComponent.prototype.changeAutocleanInterval = function () {
        var _this = this;
        console.log('entro a changeAutocleanInterval()');
        this.alertService.push({ severity: 'info', summary: 'Ejecutando..', detail: "Valor: " + this.intervalSelected });
        this.service.changeInterval(this.intervalSelected).subscribe(function () {
            _this.alertService.push({ severity: 'info', summary: 'Cambiado', detail: "Valor: " + _this.intervalSelected });
        });
    };
    Ctlig2CronComponent.prototype.loadHistoryData = function () {
        var _this = this;
        console.log("INTO THE LOAD HISTORY DATA METHOD");
        this.service.getHistoryMigra(this.page).subscribe(function (p) { return _this.processPaginator = p; });
        this.alertService.push({ severity: 'info', summary: 'EXECUTED PROCESS', detail: "EXECUTING LOAD HISTORY DATA " });
    };
    return Ctlig2CronComponent;
}());
Ctlig2CronComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-ctlig2-cron',
        template: __webpack_require__("./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */]) === "function" && _e || Object])
], Ctlig2CronComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctlig2-cron.component.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!processDetail\">\n    Cargando...\n</div>\n<div *ngIf=\"processDetail\">\n    <p-growl [value]=\"msgs\"></p-growl>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <h2>Detalle de proceso para la región: {{processDetail.region}}</h2>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <label>Inicio del proceso</label> {{processDetail.start | date: 'dd/MM/yyyy HH:mm'}}\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <label>Fin del proceso</label> {{processDetail.end | date: 'dd/MM/yyyy HH:mm'}}\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <label>Descripción</label> {{processDetail.description}}\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <h2>Request</h2>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <pre lang=\"xml\" >{{processDetail.request}}</pre>\n        </div>\n    </div>\n\n\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <h2>Response</h2>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <pre lang=\"xml\" >{{processDetail.response}}</pre>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <a class=\"site_title\">\n                <button type=\"button\" class=\"btn btn-link\" (click)=\"backW()\">Regresar</button>\n            </a>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ctlig2DetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Ctlig2DetailComponent = (function () {
    function Ctlig2DetailComponent(service, route, router, _location) {
        this.service = service;
        this.route = route;
        this.router = router;
        this._location = _location;
    }
    Ctlig2DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.url = "" + this.router.url;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.service.getProcessDetailByid(_this.id).subscribe(function (p) { return _this.processDetail = p; });
        });
    };
    Ctlig2DetailComponent.prototype.backW = function () {
        this._location.back();
    };
    return Ctlig2DetailComponent;
}());
Ctlig2DetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-ctlig2-detail',
        template: __webpack_require__("./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]) === "function" && _d || Object])
], Ctlig2DetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctlig2-detail.component.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"margin-top: 25px;\">\n    <div class=\"col-md-4\">\n        <h2>Detalle por región</h2>\n    </div>\n    <div class=\"col-md-4 col-md-offset-4\">\n        <div class=\"input-group input-group-md\">\n            <span class=\"input-group-addon\" id=\"sizing-addon1\"><i class=\"fa fa-search\"></i></span>\n            <input #gbDetail type=\"search\" pInputText class=\"form-control\" placeholder=\"Buscar en todos los campos...\" />\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <p-dataTable selectionMode=\"single\" [responsive]=\"true\" [value]=\"processDetailList\" [rows]=\"10\" [globalFilter]=\"gbDetail\" (onRowSelect)=\"onProcessDetailSelected($event)\">\n        <p-column field=\"region\" header=\"Región\" styleClass=\"col-region col-history-table\"></p-column>\n\n        <p-column field=\"start\" header=\"Fecha de ejecución\" styleClass=\"col-history-table\">\n            <ng-template let-col let-process=\"rowData\" pTemplate=\"body\">\n                {{process[col.field] | date: 'dd/MM/yyyy HH:mm'}}\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"status\" header=\"Estatus\" styleClass=\"col-estatus col-history-table\">\n            <ng-template let-col let-process=\"rowData\" pTemplate=\"body\" style=\"text-align:center\">\n                <i *ngIf=\"process[col.field] == 0\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n                <i *ngIf=\"process[col.field] == 1\" class=\"fa fa-check-circle fa-2x\"></i>\n                <i *ngIf=\"process[col.field] == 2\" class=\"fa fa-times fa-2x\"></i>\n            </ng-template>\n        </p-column>\n\n        <p-column field=\"description\" header=\"Descripción\"></p-column>\n    </p-dataTable>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ctlig2ListDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
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



var Ctlig2ListDetailComponent = (function () {
    function Ctlig2ListDetailComponent(router) {
        this.router = router;
        this.processDetailList = [];
    }
    Ctlig2ListDetailComponent.prototype.ngOnInit = function () {
    };
    Ctlig2ListDetailComponent.prototype.onProcessDetailSelected = function (event) {
        this.router.navigate(['admin/monitor-ctlig2', event.data.id]);
    };
    return Ctlig2ListDetailComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Array)
], Ctlig2ListDetailComponent.prototype, "processDetailList", void 0);
Ctlig2ListDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-ctlig2-list-detail',
        template: __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _a || Object])
], Ctlig2ListDetailComponent);

var _a;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctlig2-list-detail.component.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"margin-top:80px;\">\n    <div class=\"col-md-4\">\n        <h2>Historial</h2>\n    </div>\n    <div class=\"col-md-5 col-md-offset-7\">\n\n        <div class=\"pull-left\"  *ngIf=\"showChangeInterval\">\n            <button type=\"button\" class=\"btn btn-link\" data-toggle=\"modal\" data-target=\"#myModal\">Cambiar intervalo</button>\n        </div>\n\n        <div class=\"pull-right\">\n            <label for=\"selectRegion\">Región</label>\n            <select [ngModel]=\"regionSelected\" (ngModelChange)=\"updateSelectedValue($event)\">\n                <option *ngFor=\"let region of listRegion\" [value]=\"region\" >{{region}}</option>\n            </select>\n\n            <button [disabled]=\"loading\" type=\"button\" class=\"btn btn-primary\" (click)=\"executeProcess()\">Ejecutar</button>\n            <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"/>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <app-ctlig2-list #ctglig2List [page]=\"page\" [processList]=processList [processPaginator]=\"processPaginator\" [processSelected]=\"processSelected\" [processDetailList]=\"processDetailList\" [msgs]=\"msgs\" [url]=\"url\"></app-ctlig2-list>\n</div>\n\n<div *ngIf=\"ctglig2List.processSelected\">\n    <app-ctlig2-list-detail [processDetailList]=\"ctglig2List.processDetailList\"></app-ctlig2-list-detail>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Ejecución por región</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <div class=\"form-group\">\n                            <label for=\"selectRegion\">Intervalo de ejecución</label>\n                            <select [ngModel]=\"intervalSelected\" (ngModelChange)=\"updateSelectedIntervalValue($event)\">\n                                <option *ngFor=\"let interval of listInterval\" [value]=\"interval\" >{{interval}}</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"changeAutocleanInterval()\">Aceptar</button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ctlig2ListProcessComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Ctlig2ListProcessComponent = (function () {
    function Ctlig2ListProcessComponent(service, route, router, authService, alertService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.alertService = alertService;
        this.processList = [];
        this.processPaginator = new __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["c" /* ProcessPaginator */](this.processList, 0, 0, 0, 0);
        this.processDetailList = [];
        this.loading = false;
        this.showChangeInterval = false;
    }
    Ctlig2ListProcessComponent.prototype.updateSelectedValue = function (event) {
        this.regionSelected = event;
    };
    Ctlig2ListProcessComponent.prototype.updateSelectedIntervalValue = function (event) {
        this.intervalSelected = event;
    };
    Ctlig2ListProcessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.url = "" + this.router.url;
        console.log("URL ACTUAL ->" + this.url);
        console.log('entro a ngOnInit()');
        this.listRegion = ['TODAS', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.regionSelected = this.listRegion[0];
        this.listInterval = ['5', '15', '30', '45', '60'];
        this.service.getInterval().subscribe(function (data) {
            _this.intervalSelected = data.json;
            _this.showChangeInterval = true;
        });
    };
    Ctlig2ListProcessComponent.prototype.executeProcess = function () {
        var _this = this;
        if (this.regionSelected == 'TODAS') {
            console.log('entro a executeProcess()');
            this.alertService.push({ severity: 'info', summary: 'Ejecutando...', detail: "Todas las regiones" });
            this.service.executeProcess().subscribe(function () {
                // this.processDetailList = [];
                _this.alertService.push({ severity: 'info', summary: 'Proceso ejecutado', detail: "Todas las regiones" });
                _this.service.getProcessList(_this.page).subscribe(function (p) { return _this.processPaginator = p; });
            });
            console.log(this.processDetailList);
        }
        else {
            this.executeProcessByRegion();
        }
    };
    Ctlig2ListProcessComponent.prototype.executeProcessByRegion = function () {
        var _this = this;
        console.log('entro a executeProcessByRegion()');
        this.alertService.push({ severity: 'info', summary: 'Ejecutando...', detail: "Región: " + this.regionSelected });
        this.service.executeProcessByRegion(this.regionSelected).subscribe(function () {
            // this.processDetailList = [];
            _this.service.getProcessList(_this.page).subscribe(function (p) { return _this.processPaginator = p; });
            _this.alertService.push({ severity: 'info', summary: 'Proceso ejecutado', detail: "Región: " + _this.regionSelected });
        });
    };
    Ctlig2ListProcessComponent.prototype.changeAutocleanInterval = function () {
        var _this = this;
        console.log('entro a changeAutocleanInterval()');
        this.alertService.push({ severity: 'info', summary: 'Ejecutando..', detail: "Valor: " + this.intervalSelected });
        this.service.changeInterval(this.intervalSelected).subscribe(function () {
            _this.alertService.push({ severity: 'info', summary: 'Cambiado', detail: "Valor: " + _this.intervalSelected });
        });
    };
    return Ctlig2ListProcessComponent;
}());
Ctlig2ListProcessComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-ctlig2-list-process',
        template: __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__alert_service__["a" /* AlertService */]) === "function" && _e || Object])
], Ctlig2ListProcessComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctlig2-list-process.component.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.css":
/***/ (function(module, exports) {

module.exports = ".col-history-table {\r\n    text-align:center;\r\n}\r\n.col-id {\r\n    width: 44px;\r\n}\r\n.col-estatus {\r\n    width: 80px;\r\n}\r\n.col-region {\r\n    width: 80px;\r\n}"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--SECCIÓN DE HISTORICO SERVICIO MIGRA-->\n<div *ngIf=\"url == '/admin/monitor-ctlig2/cronCtlig2'\">\n  <p-dataTable [value]=\"processPaginator.processes\" selectionMode=\"single\" [responsive]=\"true\" [paginator]=\"true\"\n    [rows]=\"5\" (onRowSelect)=\"onProcessSelected($event)\" [lazy]=\"true\" (onLazyLoad)=\"loadHistMig($event)\"\n    [totalRecords]=\"processPaginator.totalElements\">\n    <p-row>\n\n    </p-row>\n    <p-column field=\"id\" header=\"ID\" styleClass=\"col-id col-history-table\" [style]=\"{'width':'150px'}\"></p-column>\n    <p-column field=\"start\" header=\"Fecha de ejecución\" styleClass=\"col-history-table\">\n      <ng-template let-col let-process=\"rowData\" pTemplate=\"body\">\n        {{process[col.field] | date: 'dd/MM/yyyy HH:mm'}}\n      </ng-template>\n    </p-column>\n    <p-column field=\"status\" header=\"Estatus\" styleClass=\"col-estatus col-history-table\"\n      [style]=\"{'width':'150px', 'text-align':'center'}\">\n      <ng-template let-col let-process=\"rowData\" pTemplate=\"body\" style=\"text-align:center\" width=\"10\">\n        <i *ngIf=\"process[col.field] == 0\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n        <i *ngIf=\"process[col.field] == 1\" class=\"fa fa-check-circle fa-2x\"></i>\n        <i *ngIf=\"process[col.field] == 2\" class=\"fa fa-times fa-2x\"></i>\n      </ng-template>\n    </p-column>\n    <p-column field=\"description\" header=\"Descripción\"></p-column>\n  </p-dataTable>\n</div>\n\n\n<!--SECCION DE LISTA DE HISTORICO GENERÁL -->\n\n<div *ngIf=\"url == '/admin/monitor-ctlig2/historic'\">\n  <p-dataTable [value]=\"processPaginator.processes\" selectionMode=\"single\" [responsive]=\"true\" [paginator]=\"true\"\n    [rows]=\"5\" (onRowSelect)=\"onProcessSelected($event)\" [lazy]=\"true\" (onLazyLoad)=\"loadDataProcess($event)\"\n    [totalRecords]=\"processPaginator.totalElements\">\n    <p-column field=\"id\" header=\"ID\" styleClass=\"col-id col-history-table\" [style]=\"{'width':'150px'}\"></p-column>\n    <p-column field=\"start\" header=\"Fecha de ejecución\" styleClass=\"col-history-table\">\n      <ng-template let-col let-process=\"rowData\" pTemplate=\"body\">\n        {{process[col.field] | date: 'dd/MM/yyyy HH:mm'}}\n      </ng-template>\n    </p-column>\n    <p-column field=\"status\" header=\"Estatus\" styleClass=\"col-estatus col-history-table\"\n      [style]=\"{'width':'150px', 'text-align':'center'}\">\n      <ng-template let-col let-process=\"rowData\" pTemplate=\"body\" style=\"text-align:center\" width=\"10\">\n        <i *ngIf=\"process[col.field] == 0\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n        <i *ngIf=\"process[col.field] == 1\" class=\"fa fa-check-circle fa-2x\"></i>\n        <i *ngIf=\"process[col.field] == 2\" class=\"fa fa-times fa-2x\"></i>\n      </ng-template>\n    </p-column>\n    <p-column field=\"description\" header=\"Descripción\"></p-column>\n  </p-dataTable>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ctlig2ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__("./src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Ctlig2ListComponent = (function () {
    function Ctlig2ListComponent(service, route, router, authService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.processList = [];
        this.processPaginator = new __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["c" /* ProcessPaginator */](this.processList, 0, 0, 0, 0);
        this.processDetailList = [];
    }
    Ctlig2ListComponent.prototype.ngOnInit = function () {
    };
    Ctlig2ListComponent.prototype.onProcessSelected = function (event) {
        var _this = this;
        this.processSelected = event.data;
        this.service.getProcessDetailByProcess(this.processSelected.id).subscribe(function (p) { return _this.processDetailList = p; }, function (err) {
            if (err.status == 401) {
                _this.authService.logout();
            }
        });
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Detalle de', detail: event.data.description });
    };
    Ctlig2ListComponent.prototype.loadDataProcess = function (event) {
        var _this = this;
        this.page = event.first / 5;
        this.service.getProcessList(this.page).subscribe(function (p) { return _this.processPaginator = p; }, function (err) {
            if (err.status == 401) {
                _this.authService.logout();
            }
        });
    };
    Ctlig2ListComponent.prototype.loadHistMig = function (event) {
        var _this = this;
        this.page = event.first / 5;
        this.service.getMigList(this.page).subscribe(function (p) { return _this.processPaginator = p; }, function (err) {
            if (err.status == 401) {
                _this.authService.logout();
            }
        });
    };
    return Ctlig2ListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Array)
], Ctlig2ListComponent.prototype, "processList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["c" /* ProcessPaginator */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["c" /* ProcessPaginator */]) === "function" && _a || Object)
], Ctlig2ListComponent.prototype, "processPaginator", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Array)
], Ctlig2ListComponent.prototype, "processDetailList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["b" /* Process */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["b" /* Process */]) === "function" && _b || Object)
], Ctlig2ListComponent.prototype, "processSelected", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Array)
], Ctlig2ListComponent.prototype, "msgs", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", Number)
], Ctlig2ListComponent.prototype, "page", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __metadata("design:type", String)
], Ctlig2ListComponent.prototype, "url", void 0);
Ctlig2ListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-ctlig2-list',
        template: __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */]) === "function" && _f || Object])
], Ctlig2ListComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctlig2-list.component.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorCtlig2Module", function() { return MonitorCtlig2Module; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_routing__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__monitor_ctlig2_service__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__monitor_ctlig2_monitor_ctlig2_component__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ctlig2_list_ctlig2_list_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list/ctlig2-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ctlig2_list_detail_ctlig2_list_detail_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-detail/ctlig2-list-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ctlig2_detail_ctlig2_detail_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ctlig2_list_process_ctlig2_list_process_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ctlig2_cron_ctlig2_cron_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var MonitorCtlig2Module = (function () {
    function MonitorCtlig2Module() {
    }
    return MonitorCtlig2Module;
}());
MonitorCtlig2Module = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_5__monitor_ctlig2_routing__["a" /* MonitorCtlig2RoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__monitor_ctlig2_monitor_ctlig2_component__["a" /* MonitorCtlig2Component */],
            __WEBPACK_IMPORTED_MODULE_8__ctlig2_list_ctlig2_list_component__["a" /* Ctlig2ListComponent */],
            __WEBPACK_IMPORTED_MODULE_9__ctlig2_list_detail_ctlig2_list_detail_component__["a" /* Ctlig2ListDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_10__ctlig2_detail_ctlig2_detail_component__["a" /* Ctlig2DetailComponent */],
            __WEBPACK_IMPORTED_MODULE_11__ctlig2_list_process_ctlig2_list_process_component__["a" /* Ctlig2ListProcessComponent */],
            __WEBPACK_IMPORTED_MODULE_12__ctlig2_cron_ctlig2_cron_component__["a" /* Ctlig2CronComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__monitor_ctlig2_service__["a" /* MonitorCtlig2Service */]
        ]
    })
], MonitorCtlig2Module);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-ctlig2.module.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorCtlig2RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monitor_ctlig2_monitor_ctlig2_component__ = __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ctlig2_detail_ctlig2_detail_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-detail/ctlig2-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ctlig2_list_process_ctlig2_list_process_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-list-process/ctlig2-list-process.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ctlig2_cron_ctlig2_cron_component__ = __webpack_require__("./src/app/monitor-ctlig2/ctlig2-cron/ctlig2-cron.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var adminRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__monitor_ctlig2_monitor_ctlig2_component__["a" /* MonitorCtlig2Component */],
        children: [
            {
                path: 'historic',
                component: __WEBPACK_IMPORTED_MODULE_4__ctlig2_list_process_ctlig2_list_process_component__["a" /* Ctlig2ListProcessComponent */],
            },
            {
                path: 'cronCtlig2',
                component: __WEBPACK_IMPORTED_MODULE_5__ctlig2_cron_ctlig2_cron_component__["a" /* Ctlig2CronComponent */],
            },
            {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_3__ctlig2_detail_ctlig2_detail_component__["a" /* Ctlig2DetailComponent */],
            }
        ]
    }
];
var MonitorCtlig2RoutingModule = (function () {
    function MonitorCtlig2RoutingModule() {
    }
    return MonitorCtlig2RoutingModule;
}());
MonitorCtlig2RoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(adminRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], MonitorCtlig2RoutingModule);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license

rce code is governed by an MIT- style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-ctlig2.routing.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProcessPaginator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Process; });
/* unused harmony export ProcessDetail */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorCtlig2Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_service__ = __webpack_require__("./src/app/global.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProcessPaginator = (function () {
    function ProcessPaginator(processes, size, totalElements, totalPages, number) {
        this.processes = processes;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.number = number;
    }
    return ProcessPaginator;
}());

var Process = (function () {
    function Process(id, start, end, status, description) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.status = status;
        this.description = description;
    }
    return Process;
}());

var ProcessDetail = (function () {
    function ProcessDetail(id, idProcess, region, start, end, status, description, request, response) {
        this.id = id;
        this.idProcess = idProcess;
        this.region = region;
        this.start = start;
        this.end = end;
        this.status = status;
        this.description = description;
        this.request = request;
        this.response = response;
    }
    return ProcessDetail;
}());

var pagina = 0;
var size = 5;
var max = ((pagina + 1) * size);
var min = (max - size);
function mapProcesses(response) {
    // The response of the API has a results
    // property with the actual results
    var responseJson = response.json();
    var processPaginator = new ProcessPaginator(responseJson._embedded.history.map(toProcess), responseJson.page.size, responseJson.page.totalElements, responseJson.page.totalPages, responseJson.page.number);
    return processPaginator;
}
function mapMigProc(response) {
    var responseJson = response.json();
    var respJ = [];
    for (var i = 0, j = 0; i < responseJson.length; i++) {
        if (i >= min && i < max) {
            respJ[j] = responseJson[i];
            j++;
        }
    }
    var elements = Object.keys(responseJson).length;
    var pages = elements / size;
    var processPaginator = new ProcessPaginator(respJ.map(toProcessMig), size, elements, pages, pagina);
    return processPaginator;
}
function mapProcessesDetail(response) {
    return response.json()._embedded.historydetail.map(toProcessDetail);
}
function mapProcessesDetailUnique(response) {
    return toProcessDetail(response.json());
}
function toProcess(r) {
    var process = ({
        id: extractId(r, 'rest/history'),
        start: extractDate(r.startTime),
        end: extractDate(r.endTime),
        status: extractStatus(r),
        description: r.description,
    });
    return process;
}
function toProcessMig(r) {
    var proc = ({
        id: r.id,
        start: extractDate(r.startTime),
        end: extractDate(r.endTime),
        status: extractStatus(r),
        description: r.description
    });
    return proc;
}
function toProcessDetail(r) {
    var processDetail = ({
        id: extractId(r, 'rest/history-detail'),
        idProcess: r.historyId,
        region: r.region,
        start: extractDate(r.startTime),
        end: extractDate(r.endTime),
        status: extractStatus(r),
        description: r.description,
        request: r.request,
        response: r.response,
    });
    return processDetail;
}
// to avoid breaking the rest of our app
// I extract the id from the person url
function extractDate(date) {
    if (date == undefined) {
        return '';
    }
    return new Date(date);
}
function extractId(processData, type) {
    var extractedId = processData._links.self.href.replace(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/' + type + '/', '');
    console.log("EXTRACTED ID -> " + extractedId);
    return parseInt(extractedId);
}
function extractStatus(processData) {
    if (processData.status == 'PROCESSING') {
        return 0;
    }
    if (processData.status == 'SUCCESSFUL') {
        return 1;
    }
    if (processData.status == 'ERROR') {
        return 2;
    }
}
var MonitorCtlig2Service = (function () {
    function MonitorCtlig2Service(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
    }
    MonitorCtlig2Service.prototype.getProcessList = function (pageProcess) {
        return this.globalService.get(this.baseUrl + "/history?page=" + pageProcess + "&size=5&sort=startTime,desc", mapProcesses);
    };
    MonitorCtlig2Service.prototype.getMigList = function (pageProcess) {
        pagina = pageProcess;
        max = ((pagina + 1) * size);
        min = (max - size);
        return this.globalService.get(this.baseUrl + "/historyMigra?page=" + pageProcess + "&size=5&sort=startTime", mapMigProc);
    };
    MonitorCtlig2Service.prototype.getProcessDetailByProcess = function (id) {
        return this.globalService.get(this.baseUrl + "/history-detail/search/findByHistoryId?historyId=" + id, mapProcessesDetail);
    };
    MonitorCtlig2Service.prototype.getProcessDetailByid = function (id) {
        return this.globalService.get(this.baseUrl + "/history-detail/" + id, mapProcessesDetailUnique);
    };
    MonitorCtlig2Service.prototype.executeProcess = function () {
        return this.globalService.post(this.baseUrl + "/execute-clean-queue");
    };
    MonitorCtlig2Service.prototype.executeProcessByRegion = function (region) {
        return this.globalService.post(this.baseUrl + "/execute-clean-queue/" + region);
    };
    //Servicios agregados para la ejecución del servicio 1*2W
    MonitorCtlig2Service.prototype.getHistoryMigra = function (pageProcess) {
        return this.globalService.get(this.baseUrl + "/historyMigra?page=0&size=5&sort=startTime", mapMigProc);
    };
    MonitorCtlig2Service.prototype.executeMigra = function () {
        return this.globalService.post(this.baseUrl + "/restartMigra");
    };
    MonitorCtlig2Service.prototype.executeMigraByRegion = function (region) {
        return this.globalService.post(this.baseUrl + "/restartMigra/" + region);
    };
    // fin de servicios agregados
    MonitorCtlig2Service.prototype.getInterval = function () {
        return this.globalService.get(this.baseUrl + "/change-autoclean-interval");
    };
    MonitorCtlig2Service.prototype.changeInterval = function (interval) {
        return this.globalService.put(this.baseUrl + "/change-autoclean-interval/" + interval);
    };
    return MonitorCtlig2Service;
}());
MonitorCtlig2Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object])
], MonitorCtlig2Service);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-ctlig2.service.js.map

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorCtlig2Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MonitorCtlig2Component = (function () {
    function MonitorCtlig2Component() {
    }
    MonitorCtlig2Component.prototype.ngOnInit = function () {
    };
    return MonitorCtlig2Component;
}());
MonitorCtlig2Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-monitor-ctlig2',
        template: __webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.html"),
        styles: [__webpack_require__("./src/app/monitor-ctlig2/monitor-ctlig2/monitor-ctlig2.component.css")],
    }),
    __metadata("design:paramtypes", [])
], MonitorCtlig2Component);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-ctlig2.component.js.map

/***/ })

});
//# sourceMappingURL=monitor-ctlig2.module.chunk.js.map