webpackJsonp(["agenda-ambiente.module"],{

/***/ "./src/app/agenda-ambiente/agenda-ambiente.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgendaAmbienteModule", function() { return AgendaAmbienteModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agenda_ambiente_service__ = __webpack_require__("./src/app/agenda-ambiente/agenda-ambiente.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agenda_ambiente_routing__ = __webpack_require__("./src/app/agenda-ambiente/agenda-ambiente.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__calendar_calendar_component__ = __webpack_require__("./src/app/agenda-ambiente/calendar/calendar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help_help_module__ = __webpack_require__("./src/app/help/help.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__solicitud_ambiente_solicitud_ambiente_component__ = __webpack_require__("./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__catalogos_catalogos_service__ = __webpack_require__("./src/app/catalogos/catalogos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__editar_solicitud_editar_solicitud_component__ = __webpack_require__("./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AgendaAmbienteModule = (function () {
    function AgendaAmbienteModule() {
    }
    return AgendaAmbienteModule;
}());
AgendaAmbienteModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ListboxModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TabViewModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputMaskModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ProgressBarModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["OverlayPanelModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["LightboxModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["AutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ScheduleModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_6__agenda_ambiente_routing__["a" /* ProjectAgendaRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8__help_help_module__["a" /* HelpModule */],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ConfirmDialogModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MultiSelectModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__calendar_calendar_component__["a" /* CalendarComponent */], __WEBPACK_IMPORTED_MODULE_9__solicitud_ambiente_solicitud_ambiente_component__["a" /* SolicitudAmbienteComponent */], __WEBPACK_IMPORTED_MODULE_11__editar_solicitud_editar_solicitud_component__["a" /* EditarSolicitudComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__agenda_ambiente_service__["a" /* AgendaAmbienteService */], __WEBPACK_IMPORTED_MODULE_10__catalogos_catalogos_service__["a" /* CatalogosService */]
        ]
    })
], AgendaAmbienteModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/agenda-ambiente.module.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/agenda-ambiente.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectAgendaRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_calendar_component__ = __webpack_require__("./src/app/agenda-ambiente/calendar/calendar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solicitud_ambiente_solicitud_ambiente_component__ = __webpack_require__("./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__editar_solicitud_editar_solicitud_component__ = __webpack_require__("./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: 'editarSolicitud',
        component: __WEBPACK_IMPORTED_MODULE_4__editar_solicitud_editar_solicitud_component__["a" /* EditarSolicitudComponent */]
    },
    {
        path: 'solicitud',
        component: __WEBPACK_IMPORTED_MODULE_3__solicitud_ambiente_solicitud_ambiente_component__["a" /* SolicitudAmbienteComponent */]
    },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__calendar_calendar_component__["a" /* CalendarComponent */],
    }
];
var ProjectAgendaRoutingModule = (function () {
    function ProjectAgendaRoutingModule() {
    }
    return ProjectAgendaRoutingModule;
}());
ProjectAgendaRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], ProjectAgendaRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/agenda-ambiente.routing.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/agenda-ambiente.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaAmbienteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_service__ = __webpack_require__("./src/app/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







function mapDays(response) {
    var parseDaysIn;
    if (response.json() != null) {
        parseDaysIn = response.json().map(toDays);
    }
    return parseDaysIn;
}
function toDays(r) {
    var diasInhabiles = ({
        id: r.id,
        diaInhabil: r.diaInhabil
    });
    return diasInhabiles;
}
function mapTrans(response) {
    var parsedTrans;
    if (response.json() != null) {
        parsedTrans = response.json().map(toTrans);
    }
    return parsedTrans;
}
function toTrans(r) {
    var infotrans = ({
        transaccion: r
    });
    return infotrans;
}
function mapSolicitudes(response) {
    var detalleSol;
    if (response.json() != null) {
        detalleSol = response.json().map(toSolicitudes);
    }
    return detalleSol;
}
function toSolicitudes(r) {
    var solicitudes = ({
        folio: r.folio,
        user: r.user,
        nomProyect: r.nomProyect,
        fechaInicio: extractDate(r.fechaInicio),
        fechaFinal: extractDate(r.fechaFinal),
        dias: r.dias,
        comentarios: r.comentarios,
        usuario: r.usuario,
        permisosIp: r.permisosIp,
        permisosTrans: r.permisosTrans,
        userMail: r.userMail,
        turno: r.turno,
        nomUser: r.nomUser
    });
    return solicitudes;
}
function extractDate(date) {
    if (date == undefined) {
        return '';
    }
    var fechaInicio = __WEBPACK_IMPORTED_MODULE_6_moment__(date).format('YYYY-MM-DD');
    return fechaInicio;
}
var AgendaAmbienteService = (function () {
    function AgendaAmbienteService(http, globalService, authService) {
        this.http = http;
        this.globalService = globalService;
        this.authService = authService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* endpointServer */].basePath + '/rest';
        this.moduleName = 'agenda-ambiente';
        this.restUrl = this.baseUrl + '/' + this.moduleName;
    }
    AgendaAmbienteService.prototype.eliminarSolicitud = function (folio) {
        console.log("SE ELIMINA LA SOLICITUD" + folio);
        return this.globalService.get(this.restUrl + "/eliminarSolicitud?folio=" + folio);
    };
    AgendaAmbienteService.prototype.agregarTrans = function (trans, folio) {
        console.log("SE AGREGA TRANSACCIONES " + trans);
        return this.globalService.get(this.restUrl + "/agregarTrans?folio=" + folio + "&trans=" + trans);
    };
    AgendaAmbienteService.prototype.agregarIp = function (ip, folio) {
        console.log("SE AGREGA IP " + ip);
        return this.globalService.get(this.restUrl + "/agregarIps?folio=" + folio + "&ips=" + ip);
    };
    AgendaAmbienteService.prototype.getTurnByFolio = function (folio) {
        console.log("SE BUSCAN LAS IP'S DEL FOLIO " + folio);
        return this.globalService.get(this.restUrl + "/obtenerTurno?folio=" + folio);
    };
    AgendaAmbienteService.prototype.getIpsByFolio = function (folio) {
        console.log("SE BUSCAN LAS IP'S DEL FOLIO " + folio);
        return this.globalService.get(this.restUrl + "/obtenerIp?folio=" + folio);
    };
    AgendaAmbienteService.prototype.getTransByFolio = function (folio) {
        console.log("SE BUSCAN LAS TRANSACCIONES DEL FOLIO " + folio);
        return this.globalService.get(this.restUrl + "/obtenerTrans?folio=" + folio);
    };
    AgendaAmbienteService.prototype.getAgendaUser = function (starDate, idUser) {
        console.log("SOLICITA LA AGENDA DEL USUARIO" + idUser);
        return this.globalService.get(this.restUrl + "/buscarAgendaUsuario?starDate=" + starDate + "&user=" + idUser, mapSolicitudes);
    };
    AgendaAmbienteService.prototype.getLimiteAmbiente = function () {
        return this.globalService.get(this.restUrl + "/limiteAmbiente");
    };
    AgendaAmbienteService.prototype.getLimiteHabiles = function () {
        return this.globalService.get(this.restUrl + "/limiteHabiles");
    };
    AgendaAmbienteService.prototype.getLimiteReservacion = function () {
        console.log("peticon");
        return this.globalService.get(this.restUrl + "/limiteReservacion");
    };
    AgendaAmbienteService.prototype.getDiasInhabiles = function () {
        return this.globalService.get(this.restUrl + "/validarDias", mapDays);
    };
    AgendaAmbienteService.prototype.sendSolicitud = function (data) {
        return this.globalService.post(this.restUrl + "/sendSolicitud", data);
    };
    AgendaAmbienteService.prototype.validarAmbiente = function (data) {
        console.log("VALIDAR");
        return this.globalService.post(this.restUrl + "/validarAmbiente", data);
    };
    AgendaAmbienteService.prototype.getTrans = function () {
        return this.globalService.get(this.restUrl + "/search-trans", mapTrans);
    };
    AgendaAmbienteService.prototype.getAgenda = function (fecha) {
        console.log("SOLICITAR LA AGENDA DEL USUARIO" + fecha);
        return this.globalService.get(this.restUrl + "/obtener-agenda/" + fecha, mapSolicitudes);
    };
    AgendaAmbienteService.prototype.getAgendaFolio = function (folio) {
        console.log("SE SOLICITA PETICION  CON EL FOLIO" + folio);
        return this.globalService.get(this.restUrl + "/obtener-agendafolio/" + folio, mapSolicitudes);
    };
    AgendaAmbienteService.prototype.verificarSolicitud = function (data) {
        console.log("SE VALIDA LA PETICION");
        return this.globalService.post(this.restUrl + "/validaSolicitud", data);
    };
    AgendaAmbienteService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(error.json().error || 'Server error');
    };
    return AgendaAmbienteService;
}());
AgendaAmbienteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__global_service__["a" /* GlobalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AuthService */]) === "function" && _c || Object])
], AgendaAmbienteService);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/agenda-ambiente.service.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/calendar/calendar.component.css":
/***/ (function(module, exports) {

module.exports = ".middleField {\r\n    width: 43%;\r\n    padding-top: 8px;\r\n}\r\n\r\n.fc-next-button ui-button ui-state-default ui-corner-right {\r\n    float: right;\r\n}\r\n\r\ntable th {\r\n    text-align: center;\r\n}\r\n\r\n.spinFa {\r\n    position: absolute;\r\n    z-index: 2;\r\n    opacity: 0.5;\r\n    bottom: 35px;\r\n    left: 45%;\r\n}\r\n\r\n.fc-content{white-space:normal}\r\n"

/***/ }),

/***/ "./src/app/agenda-ambiente/calendar/calendar.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"page-header\">\n    <h1>AGENDA DE AMBIENTE WS-M2K</h1>\n\n    <div style=\"float: right\">\n      <a [href]=\"pdfSrc\" target=\"_blank\" class=\"btn btn-link\">Manual del Usuario <i class=\"fa fa-file-pdf-o\" aria-hidden=\"true\"></i></a>\n    </div>\n\n    <p>Este módulo le permite agendar el ambiente de desarrollo WS-M2k para realizar pruebas.</p>\n\n</div>\n\n<div>\n    <a [routerLink]=\"['editarSolicitud']\" id=\"btnEdit\" class=\"btn btn-info\" style=\"float: right; top: 20px;\">Mis solicitudes</a>\n</div>\n<div>\n    <a [routerLink]=\"['solicitud']\" class=\"btn btn-primary\">Agendar Ambiente</a>\n</div>\n\n\n<div class=\"spinFa\" *ngIf=\"spin\">\n  <i class=\"fa fa-spinner fa-spin \" style=\"font-size:200px;  color:rgb(0, 89, 255);\"></i>\n</div>\n<p-dialog [(visible)]=\"spin\" modal=\"modal\" width=\"2\" height=\"2\" class=\"spinFa\" [responsive]=\"true\" [showHeader]=\"false\" [resizable]=\"false\"  [draggable]=\"false\" [closable]=\"false\"></p-dialog>\n\n<div>\n    <p-schedule #fc [events]=\"listCalendarEvent\" [header]=\"calendarHeader\" [defaultView]=\"calendarDefaultView\" [businessHours]=\"false\" [allDaySlot]=\"false\" [defaultDate]=\"calendarDefaultDate\" [slotEventOverlap]=\"false\" [options]=\"calendarOptions\" [fixedWeekCount]=\"false\" [nowIndicator]=\"true\"\n     [weekends]=\"false\"  [eventLimit]=\"9\" [editable]=\"false\" (onDayClick)=\"clickCalendarDay($event , fc) \" (onViewRender)=\"calendarOnViewRender($event , fc) \" (onEventClick)=\"clickCalendarEvent($event, fc) \" [dayRender]=\"dayRender\" [eventRender]=\"eventRender\">\n    </p-schedule>\n\n</div>\n\n<div>\n    <p-dialog [(visible)]=\"displayDetailAgenda\" modal=\"modal\" width=\"400\" [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"false\" [contentStyle]=\"{'max-height':'400px'}\">\n        <p-header>\n            Detalle de Consulta\n        </p-header>\n\n        <div *ngFor=\"let detalle of detalleSolictud \">\n            <div class=\"row \" style=\"padding-top:5px;padding-bottom: 10px;margin-left: 1%; \">\n                <div aria-live=\"polite \" class=\"ui-message ui-widget ui-corner-all ui-messages-success \" style=\"font-size: 20px;width: 100%; text-align: center;\">\n                    <span class=\"ui-message-icon fa fa-info-circle \"></span>\n                    <span class=\"ui-message-text \">FOLIO: {{detalle.folio }}</span>\n                </div>\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">PROYECTO: </label> {{detalle.nomProyect}}\n            </div>\n            <div class=\"row\">\n              <label class=\"middleField\">SOLICITANTE: </label>{{detalle.nomUser}}\n          </div>\n            <div class=\"row\">\n                <label class=\"middleField\">CORREO: </label>{{detalle.userMail}}\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">USUARIO: </label>{{detalle.usuario}}\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">FECHA DE INCIO:</label> {{detalle.fechaInicio}}\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">FECHA FINAL:  </label>{{detalle.fechaFinal}}\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">HORARIO:</label>\n                <span *ngIf=\"detalle.turno===1\">9:00 hrs a 12:00 hrs.</span>\n                <span *ngIf=\"detalle.turno===2\">12:00 hrs a 15:00 hrs.</span>\n                <span *ngIf=\"detalle.turno===3\">15:00 hrs a 18:00 hrs.</span>\n            </div>\n            <div class=\"row\">\n                <label class=\"middleField\">COMENTARIO: </label>{{detalle.comentarios}}\n            </div>\n            <div class=\"row\">\n              <label class=\"middleField\">PERMISOS: </label>\n          </div>\n            <div>\n                <h5>\n                    <div class=\"col-md-5 \">\n                        <div class=\"row \">\n                            <table class=\"table\">\n                                <tr>\n                                    <th>Ip's</th>\n                                </tr>\n                                <tr *ngFor=\"let i of detalle.permisosIp \">\n                                    <th>{{i.ip}}</th>\n                                </tr>\n\n                            </table>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 \">\n                        <div class=\"row \">\n                            <table class=\"table \">\n                                <tr>\n                                    <th>Transacción</th>\n                                </tr>\n                                <tr *ngFor=\"let i of detalle.permisosTrans \">\n                                    <th>{{i.transaccion}}</th>\n                                </tr>\n                            </table>\n\n                        </div>\n                    </div>\n\n                </h5>\n            </div>\n        </div>\n        <p-footer>\n            <button style=\"float:right; margin-right: 40px; \" type=\"button \" pButton icon=\"fa-close \" (click)=\"cancelDetalleAgenda() \" label=\"Salir \" class=\"ui-button-info \"></button>\n        </p-footer>\n    </p-dialog>\n</div>\n"

/***/ }),

/***/ "./src/app/agenda-ambiente/calendar/calendar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__ = __webpack_require__("./src/app/agenda-ambiente/agenda-ambiente.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalendarComponent = (function () {
    function CalendarComponent(service) {
        this.service = service;
        this.detalleSolictud = [];
        this.userlogin = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.userId = this.userlogin.id;
        this.COLOR_DIU = '#008B8B';
        this.COLOR_VES = '#6495ED';
        this.COLOR_MEDIO_DIA = '#778899';
        this.pdfSrc = "/assets/pdf/Manual_de_Usuario_Agendar_Ambiente_WS-M2k.pdf";
        this.spin = true;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        document.getElementById('btnEdit').style.display = 'none';
        this.displayPetButton = false;
        //this.calendarDefaultView = this.CALENDAR_VIEW_MONTH;
        this.calendarDefaultDate = new Date();
        this.calendarDefaultDate.setHours(0, 0, 0, 0);
        this.listCalendarEvent = [];
        this.calendarOnViewRender;
        this.calendarHeader = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.calendarOptions = {
            validRange: {},
        };
    };
    CalendarComponent.prototype.getDetalleSolictud = function () {
        var _this = this;
        this.service.getAgenda(this.userId).subscribe(function (p) {
            _this.detalleSolictud = p;
            var color;
            for (var _i = 0, _a = _this.detalleSolictud; _i < _a.length; _i++) {
                var del = _a[_i];
                (del.turno === 1) ? color = _this.COLOR_DIU : color = _this.COLOR_VES;
                var listaCal = _this.calendarEvent(del.nomProyect, del.fechaInicio, del.fechaFinal, del.folio, color, del.turno);
                _this.listCalendarEvent.push(listaCal);
            }
        }, function (err) { console.log(err); });
    };
    CalendarComponent.prototype.clickButtonAgregarPeticion = function (fc) {
        console.log("Configurar modal para agregar las peticiones");
        console.log('clickButtonAgregarPeticion(fc):');
        console.log(fc);
    };
    CalendarComponent.prototype.clickCalendarDay = function (e, fc) { };
    CalendarComponent.prototype.calendarOnViewRender = function (event, fc) {
        var _this = this;
        this.spin = true;
        var mesActual = event.view.dateProfileGenerator._view.title;
        console.log(event.view.dateProfileGenerator._view.title);
        var res = mesActual.replace(" ", "_");
        if (this.calendarEvent.length > 0) {
            this.listCalendarEvent = [];
        }
        this.service.getAgenda(res).subscribe(function (p) {
            _this.detalleSolictud = p;
            console.log("DETALLE SOLICITUD --->>> " + _this.detalleSolictud);
            if (_this.detalleSolictud == undefined) {
                _this.closeSpinner();
            }
            else {
                var color = void 0;
                //console.log("AGENDA"+this.detalleSolictud )
                for (var _i = 0, _a = _this.detalleSolictud; _i < _a.length; _i++) {
                    var del = _a[_i];
                    var d = new Date(del.fechaInicio);
                    var df = new Date(del.fechaFinal);
                    switch (del.turno) {
                        case 1:
                            color = _this.COLOR_DIU;
                            d.setHours(9, 0, 0);
                            df.setHours(12, 0, 0);
                            break;
                        case 2:
                            color = _this.COLOR_MEDIO_DIA;
                            d.setHours(12, 0, 0);
                            df.setHours(15, 0, 0);
                            break;
                        case 3:
                            color = _this.COLOR_VES;
                            d.setHours(15, 0, 0);
                            df.setHours(18, 0, 0);
                            break;
                        default:
                    }
                    if (d.getDay() === 5 || d.getDay() === 6) {
                        console.log("FECHA INHABILITADA -->>> " + d.getMonth() + "-" + d.getDate());
                        //no se agregan al calendario
                    }
                    else {
                        d.setDate(d.getDate() + 1);
                        df.setDate(df.getDate() + 1);
                        var auxDateI = new Date(d);
                        var auxDateF = new Date(df);
                        //var days=this.getDays(auxDateI, auxDateF);
                        //var days=auxDateF.getDate()-auxDateI.getDate();
                        var days = _this.getCountDays(auxDateI, auxDateF);
                        console.log("D�AS RESERVADOS --->>> ", days, del.folio);
                        //debugger;
                        if (days > 0) {
                            var auxI = new Date(auxDateI);
                            var auxF = new Date(auxDateF);
                            var weekI = _this.getWeekNumber(auxI);
                            var weekF = _this.getWeekNumber(auxF);
                            var festivo = getDayFestivos();
                            if (weekI == weekF) {
                                var contFestDays = 0;
                                for (var i = 0; i < days; i++) {
                                    for (var f = 0; f < festivo.length; f++) {
                                        var now = _this.getMonthDay(auxDateI);
                                        if (now == festivo[f]) {
                                            contFestDays = contFestDays + 1;
                                            auxDateI.setDate(auxDateI.getDate() + 1);
                                        }
                                    }
                                    auxDateI.setDate(auxDateI.getDate() + 1);
                                }
                                var auxDateI = new Date(d);
                                var auxDateF = new Date(df);
                                if (contFestDays > 0) {
                                    for (var i = 0; i < days; i++) {
                                        for (var f = 0; f < festivo.length; f++) {
                                            var now = _this.getMonthDay(auxDateI);
                                            if (now == festivo[f]) {
                                                console.log("D�A FESTIVO --->>> " + now, festivo[f]);
                                                auxF.setDate(auxDateI.getDate() - 1);
                                                var listaCalIf = _this.calendarEvent(del.nomProyect, d, auxF, del.folio, color, del.turno);
                                                _this.listCalendarEvent.push(listaCalIf);
                                                auxI.setDate(auxDateI.getDate() + 1);
                                                var listaCalFf = _this.calendarEvent("", auxI, df, del.folio, color, del.turno);
                                                _this.listCalendarEvent.push(listaCalFf);
                                                auxDateI.setDate(auxDateI.getDate() + 1);
                                            }
                                        }
                                        auxDateI.setDate(auxDateI.getDate() + 1);
                                    }
                                }
                                else {
                                    var lastDay = _this.getLastDay(auxDateI);
                                    var flag = _this.validateLast(auxDateI, days, del);
                                    auxDateI = new Date(d);
                                    auxF = new Date(auxDateI);
                                    if (flag) {
                                        for (var cont = 0; cont < days; cont++) {
                                            if (auxDateI.getDate() == lastDay) {
                                                auxF.setDate(auxDateI.getDate());
                                                var listaCalIf = _this.calendarEvent(del.nomProyect, d, auxF, del.folio, color, del.turno);
                                                _this.listCalendarEvent.push(listaCalIf);
                                                auxDateI.setDate(auxDateI.getDate() + 1);
                                            }
                                            else {
                                                auxDateI.setDate(auxDateI.getDate() + 1);
                                            }
                                        }
                                    }
                                    else {
                                        var listaCal = _this.calendarEvent(del.nomProyect, d, df, del.folio, color, del.turno);
                                        _this.listCalendarEvent.push(listaCal);
                                    }
                                }
                            }
                            else {
                                var lastDay = _this.getLastDay(auxDateI);
                                var flag = _this.validateLast(auxDateI, days, del);
                                auxDateI = new Date(d);
                                auxF = new Date(auxDateI);
                                if (flag) {
                                    for (var cont = 0; cont < days; cont++) {
                                        if (auxDateI.getDate() == lastDay) {
                                            auxF.setDate(auxDateI.getDate());
                                            var listaCalIf = _this.calendarEvent(del.nomProyect, d, auxF, del.folio, color, del.turno);
                                            _this.listCalendarEvent.push(listaCalIf);
                                            auxDateI.setDate(auxDateI.getDate() + 1);
                                        }
                                        else {
                                            auxDateI.setDate(auxDateI.getDate() + 1);
                                        }
                                    }
                                }
                                else {
                                    for (var i = 0, cont = 1; i < days; i++) {
                                        if (auxDateI.getDay() == 5 && days >= 1) {
                                            auxF.setDate(auxI.getDate() + i);
                                            console.log("FECHAS ACTUALIZADAS --->>> " + d, auxF, del.folio);
                                            var listaCalV = _this.calendarEvent(del.nomProyect, d, auxF, del.folio, color, del.turno);
                                            _this.listCalendarEvent.push(listaCalV);
                                            auxI.setDate(auxDateI.getDate() + 3);
                                            console.log("FECHAS ACTUALIZADAS --->>> " + auxI, df, del.folio);
                                            var listaCalL = _this.calendarEvent(del.nomProyect, auxI, df, del.folio, color, del.turno);
                                            _this.listCalendarEvent.push(listaCalL);
                                            auxDateI.setDate(auxDateI.getDate() + cont);
                                        }
                                        else {
                                            auxDateI.setDate(auxDateI.getDate() + cont);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            var listaCal = _this.calendarEvent(del.nomProyect, d, df, del.folio, color, del.turno);
                            _this.listCalendarEvent.push(listaCal);
                        }
                    }
                }
                _this.closeSpinner();
            }
        }, function (err) { console.log(err); });
    };
    CalendarComponent.prototype.closeSpinner = function () {
        this.spin = false;
        document.getElementById('btnEdit').style.display = 'block';
    };
    CalendarComponent.prototype.clickCalendarEvent = function (e) {
        var _this = this;
        this.service.getAgendaFolio(e.calEvent.folio).subscribe(function (p) {
            _this.detalleSolictud = p;
            console.log(_this.detalleSolictud);
            _this.displayDetailAgenda = true;
            console.log("buscar peticion");
        }, function (err) {
            console.log(err);
        });
    };
    CalendarComponent.prototype.calendarEvent = function (proyecto, fechaI, fechafIn, folio, color, turno) {
        var event = {
            title: proyecto,
            start: fechaI,
            end: fechafIn,
            folio: folio,
            color: color,
            turno: turno,
        };
        return event;
    };
    CalendarComponent.prototype.cancelDetalleAgenda = function () {
        this.displayDetailAgenda = false;
    };
    CalendarComponent.prototype.eventRender = function (event, element) {
        //debugger;
        var time = element[0].children[0].children[0];
        time.style.display = 'none';
    };
    CalendarComponent.prototype.dayRender = function (date, cell) {
        var COLOR_GRIS = '#efefef';
        var d = __WEBPACK_IMPORTED_MODULE_2_moment__(date).format('YYYY-MM-DD');
        var inhabil = new Date(d);
        var festivo = getDayFestivos();
        for (var i = 0; i < festivo.length; i++) {
            var df = __WEBPACK_IMPORTED_MODULE_2_moment__(date).format('MM-DD');
            if (!festivo[i].localeCompare(df)) {
                cambiarColorCelda(cell);
            }
            switch (inhabil.getDay()) {
                case 6:
                    cambiarColorCelda(cell);
                    break;
                case 5:
                    cambiarColorCelda(cell);
                    break;
                default:
            }
        }
    };
    CalendarComponent.prototype.getWeekNumber = function (d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    };
    CalendarComponent.prototype.getMonthDay = function (d) {
        var newFech = "";
        if (d.getMonth() < 10) {
            if (d.getDate() < 10) {
                newFech = "0" + (d.getMonth() + 1) + "-0" + d.getDate();
            }
            else {
                newFech = "0" + (d.getMonth() + 1) + "-" + d.getDate();
            }
        }
        else {
            if (d.getDate() < 10) {
                newFech = "0" + (d.getMonth() + 1) + "-0" + d.getDate();
            }
            else {
                newFech = "0" + (d.getMonth() + 1) + "-" + d.getDate();
            }
        }
        return newFech;
    };
    CalendarComponent.prototype.getDays = function (inicio, fin) {
        var days = 0;
        if (inicio.getMonth() == fin.getMonth()) {
            days = (fin.getDate() - inicio.getDate());
        }
        else {
            var lastDay = this.getLastDay(inicio);
            var difI = lastDay - inicio.getDate();
            days = difI;
        }
        return days;
    };
    //0,2,4,6,7,9,11- 31 d�as
    //3,5,8,10 30 d�as
    CalendarComponent.prototype.getLastDay = function (d) {
        var month = 0;
        if (d.getMonth() == 0 || d.getMonth() == 2 || d.getMonth() == 4 || d.getMonth() == 6 || d.getMonth() == 7 || d.getMonth() == 9 || d.getMonth() == 11) {
            month = 31;
        }
        else if (d.getMonth() == 3 || d.getMonth() == 5 || d.getMonth() == 8 || d.getMonth() == 10) {
            month = 30;
        }
        else if (d.getMonth() == 1) {
            if (d.getFullYear() % 4 == 0 && (d.getFullYear() % 100 != 0 || d.getFullYear() % 400 == 0)) {
                month = 29;
            }
            else {
                month = 28;
            }
        }
        return month;
    };
    CalendarComponent.prototype.validateLast = function (auxDateI, days, del) {
        if (days < 0) {
            days = 0;
        }
        var now = auxDateI.getDate();
        console.log("WILL VALIDATE END OF MONTH ", now);
        var lastDay = this.getLastDay(auxDateI);
        var flag = false;
        for (var i = 0; i <= days; i++) {
            if (now == lastDay) {
                flag = true;
                console.log("FLAG IS TRUE", del.folio);
            }
            auxDateI.setDate(auxDateI.getDate() + 1);
        }
        return flag;
    };
    CalendarComponent.prototype.getCountDays = function (auxDateI, auxDateF) {
        var lastDay = this.getLastDay(auxDateI);
        var inicio = auxDateI.getDate();
        var fin = auxDateF.getDate();
        var days = 0;
        if (auxDateI.getMonth() < auxDateF.getMonth()) {
            inicio = lastDay - inicio;
            days = inicio + fin;
        }
        else {
            days = fin - inicio;
        }
        return days;
    };
    return CalendarComponent;
}());
CalendarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-calendar',
        template: __webpack_require__("./src/app/agenda-ambiente/calendar/calendar.component.html"),
        styles: [__webpack_require__("./src/app/agenda-ambiente/calendar/calendar.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__["a" /* AgendaAmbienteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__["a" /* AgendaAmbienteService */]) === "function" && _a || Object])
], CalendarComponent);

function getDayFestivos() {
    var diaFestivo = new Array();
    diaFestivo.push('01-01');
    diaFestivo.push('05-01');
    diaFestivo.push('09-16');
    diaFestivo.push('11-01');
    diaFestivo.push('11-02');
    //diaFestivo.push('11-16');
    diaFestivo.push('12-26');
    return diaFestivo;
}
function cambiarColorCelda(cell) {
    var COLOR_GRIS = '#efefef';
    var celda = cell.css("background-color", COLOR_GRIS);
    return celda;
}
var _a;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/calendar.component.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.css":
/***/ (function(module, exports) {

module.exports = "th {\r\n    color: red !important;\r\n}\r\n\r\ninput:invalid {\r\n    border: 2px solid red;\r\n}\r\n\r\ninput:valid {\r\n    border: 2px solid black;\r\n}\r\n\r\n.spinFa {\r\n  position: absolute;\r\n  z-index: 2;\r\n  opacity: 0.7;\r\n  top: 30%;\r\n  left: 45%;\r\n\r\n}\r\n\r\n.modalEdit{\r\n  overflow-y: none !important;\r\n}\r\n\r\n.trEdit{\r\n  color: black !important;\r\n  margin-left:3%;\r\n}\r\n\r\n.ui-multiselect-label-container {\r\n  max-height: 20px !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"page-header\">\n  <h1>MODIFICAR SOLICITUD</h1>\n  <h2>En esta sección puedes agregar Ip's, transaciones y eliminar la solicitud.</h2>\n  <a [routerLink]=\"['/admin/agenda-ambiente']\" id=\"btnEdit\" class=\"btn btn-link\" style=\"float: right\">Regresar al calendario</a>\n</div>\n\n\n<div class=\"spinFa\" *ngIf=\"spin\">\n  <i class=\"fa fa-spinner fa-spin \" style=\"font-size:200px;  color:rgb(0, 89, 255);\"></i>\n</div>\n\n<p-dialog [(visible)]=\"spin\" modal=\"modal\" width=\"2\" height=\"2\" class=\"spinFa\" [responsive]=\"true\" [showHeader]=\"false\" [resizable]=\"false\"  [draggable]=\"false\" [closable]=\"false\"></p-dialog>\n\n\n\n<div style=\"padding-top: 70px;\" style=\"align-content: center;\">\n  <p-panel class=\"col-md-10\">\n      <p-dataTable id=\"tableSolictud\" [value]=\"tablaSolicitudes\" [rows]=\"10\" [paginator]=\"true\" [pageLinks]=\"3\" [rowsPerPageOptions]=\"[5,10,20]\" [immutable]=\"false\">\n          <p-column field=\"folio\" header=\"Folio\" [filter]=\"true\" styleClass=\"text-left\"></p-column>\n          <p-column field=\"nomProyect\" header=\"Proyecto\"></p-column>\n          <p-column field=\"periodoPrueba\" header=\"Periodo de pruebas\"></p-column>\n          <p-column header=\"Horario de ejecución\" >\n            <ng-template let-turno=\"rowData\" pTemplate=\"body\">\n              <div *ngIf=\"turno.turno==1\">\n                <p style=\"text-align: center;\">09:00 hrs - 12:00 hrs</p>\n              </div>\n              <div *ngIf=\"turno.turno==2\">\n                <p style=\"text-align: center;\">12:00 hrs - 15:00 hrs</p>\n              </div>\n              <div *ngIf=\"turno.turno==3\">\n                <p style=\"text-align: center;\">15:00 hrs - 18:00 hrs </p>\n              </div>\n            </ng-template>\n          </p-column>\n          <p-column>\n              <ng-template let-folio=\"rowData\" pTemplate=\"body\" >\n                <button id=\"btn2\" type=\"button\" class=\"btn btn-info  btn-ms \" (click)=\"getModify(folio)\" style=\" margin-left:10px\" ><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button>\n                <button id=\"btn3\" type=\"button\" class=\"btn btn-danger btn-ms \" (click)=\"openDelete(folio)\"  style=\" margin-left:25px\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                </button>\n              </ng-template>\n          </p-column>\n      </p-dataTable>\n  </p-panel>\n</div>\n\n<div>\n  <p-dialog [(visible)]=\"displayEdit\" modal=\"modal\" width=\"400\" [contentStyle]=\"{'height': '700px'}\" [responsive]=\"true\" [closeOnEscape]=\"false\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"true\">\n    <p-header>Modificar Solicitud</p-header>\n    <br>\n    <form (ngSubmit)=\"modificarSolicitud()\">\n      <label class=\"customLabel\">Agregar Ip</label>\n\n      <div class=\"row\" style=\"margin-left: 1%;\">\n        <table class=\"table\">\n          <tr *ngFor=\"let ip of existedIps\">\n            <th class=\"trEdit\"><b>{{ip}}</b></th>\n          </tr>\n        </table>\n      </div>\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" id=\"ipDesa\" [(ngModel)]=\"ipDesa\" name=\"ipDesa\" pattern=\"{{ipPattern}}\" maxlength=\"{{ipMax}}\">\n      </div>\n      <div class=\"row\">\n        <button type=\"button\" id=\"btnAddIp\" class=\"btn btn-info\" style=\" margin-left:3%\" (click)=\"agregaIp()\" >Agregar Ip</button>\n      </div>\n      <div class=\"row\" style=\"margin-left: 1%;\">\n        <label>Ip agregada</label>\n        <table>\n          <tr *ngFor=\"let ipl of ipList\">\n            <th class=\"trEdit\">{{ipl}}</th>\n          </tr>\n        </table>\n      </div>\n      <br>\n\n      <label class=\"customLabel\">Agregar Transacciones</label>\n\n      <div class=\"form-group\">\n\n        <div class=\"row\" style=\"margin-left: 1%;\">\n          <table class=\"table\"  style=\"border:none !important\">\n            <tr *ngFor=\"let trn of existedTrans\">\n              <th class=\"trEdit\"><b>- {{trn}}</b></th>\n            </tr>\n          </table>\n        </div>\n\n        <div class=\"form-group\">\n            <!--<p-listbox [options]=\"transactLis\" [style]=\"{'width':'100%','max-height':'170px'}\" style=\"border: none !important;\" [(ngModel)]=\"trans\" filter=\"filter\" checkbox=\"checkbox\" multiple=\"multiple\" class=\"form-control\" name=\"trans\" required ></p-listbox>-->\n          <p-multiSelect id=\"multiSelectTrans\" [options]=\"transactLis\" [(ngModel)]=\"trans\"defaultLabel=\"TRANSACCIONES DISPONIBLES\" [style]=\"{'width':'78%'}\" style=\"border: none !important;\" scrollHeight=\"150px\" class=\"form-control\" name=\"trans\" required (onChange)=\"onChange($event)\"></p-multiSelect>\n        </div>\n\n        <div style=\"margin-top: 70%;\">\n          <button type=\"submit\" style=\"margin-left: 18%; width: 70%; margin-top: 5%;\" class=\"btn btn-primary\">Enviar</button>\n        </div>\n        <br>\n      </div>\n\n    </form>\n    <!--<button type=\"text\" (click)=\"cancelModal()\" style=\"float:left;margin-top: -35px;\" class=\"ui-button-info \">Cerrar</button>-->\n  </p-dialog>\n</div>\n\n<div>\n  <p-dialog [(visible)]=\"displayDelete\" modal=\"modal\" width=\"400\" [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"false\">\n    <p-header>Eliminar Solicitud</p-header>\n    <div>\n      <label>Estás seguro de eliminar esta solicitud ? </label>\n    </div>\n    <br>\n    <div>\n      <button type=\"button\" class=\"btn btn-info  btn-ms \" (click)=\"cancelDelete()\" style=\" margin-left:13%\" >Cancelar</button>\n      <button type=\"button\" class=\"btn btn-danger btn-ms \" (click)=\"eliminarSolicitud()\"  style=\" margin-left:27%\" >Aceptar</button>\n    </div>\n  </p-dialog>\n</div>\n"

/***/ }),

/***/ "./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditarSolicitudComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__ = __webpack_require__("./src/app/agenda-ambiente/agenda-ambiente.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__catalogos_catalogos_service__ = __webpack_require__("./src/app/catalogos/catalogos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_CommonUtilsAgenda__ = __webpack_require__("./src/app/agenda-ambiente/util/CommonUtilsAgenda.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditarSolicitudComponent = (function () {
    function EditarSolicitudComponent(service, alertService, servicesCat, route) {
        this.service = service;
        this.alertService = alertService;
        this.servicesCat = servicesCat;
        this.route = route;
        this.detalleSolictud = [];
        this.data = [];
        this.trans = [];
        this.existedIps = [];
        this.existedTrans = [];
        this.turns = [];
        this.listaTransacciones = [];
        this.tablaSolicitudes = [];
        this.transactLis = [];
        this.ipList = [];
        this.auxCont = 0;
        this.spin = false;
        this.ipPattern = "\^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\$";
        this.ipMax = "15";
    }
    EditarSolicitudComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.getElementById('btnEdit').style.display = 'none';
        this.cargarTransa = [];
        var userlogin = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.userId = userlogin.id;
        this.validaTurno();
        this.spin = true;
        this.cargaTabla();
        this.service.getLimiteHabiles().subscribe(function (p) {
            _this.limiteHabiles = p.json;
            console.log("LIMITE DE DÍAS HABILES ---->>>> " + _this.limiteHabiles);
        }, function (err) { console.log(err); });
        /*this.servicesCat.getAllTransactions().subscribe(p =>{ this.transBack= p
          for(var d of this.transBack){
            this.cargarTransa.push({label:d.transaccionPantallaTransient, value:d.transaccion});
          }}, err => {console.log(err);});*/
        console.log("ON INIT METHOD ---->>>> ");
    };
    EditarSolicitudComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_5__util_CommonUtilsAgenda__["a" /* CommonUtilsAgenda */].removeSelector();
    };
    EditarSolicitudComponent.prototype.cargaTabla = function () {
        var _this = this;
        this.detalleSolictud = [];
        var now = new Date();
        var starDate = new Date();
        starDate.setDate(starDate.getDate() - 1);
        console.log("INFORMACIÓN PARA CARGA DE TABLA ---->>>> " + starDate + "   " + this.userId);
        this.service.getAgendaUser(starDate, this.userId).subscribe(function (p) {
            _this.detalleSolictud = p;
            console.log("LONGITUD DETALLE SOLICITUD ---->>> " + _this.detalleSolictud);
            if (_this.detalleSolictud == undefined) {
                _this.spin = false;
                document.getElementById('btnEdit').style.display = 'block';
            }
            else {
                for (var _i = 0, _a = _this.detalleSolictud; _i < _a.length; _i++) {
                    var detail = _a[_i];
                    var fi = new Date(detail.fechaInicio);
                    var ff = new Date(detail.fechaFinal);
                    detail.periodoPrueba = detail.fechaInicio + " / " + detail.fechaFinal;
                    ff.setDate(ff.getDate() + 1);
                    fi.setDate(fi.getDate() + 1);
                    fi.setHours(0, 0, 0);
                    if (_this.turnoActual == 4) {
                        _this.validaPeriodo(detail);
                        _this.tablaSolicitudes.push(detail);
                    }
                    else {
                        if (detail.turno == _this.turnoActual && now.getFullYear() == ff.getFullYear() && now.getMonth() == ff.getMonth() && now.getDate() == ff.getDate()) {
                            console.log("FOLIO EN PROCESO DE EJECUCIÓN -> " + detail.folio);
                        }
                        else if (detail.turno == _this.turnoActual && now <= ff && now >= fi) {
                            console.log("FOLIO EN PROCESO DE EJECUCIÓN -> " + detail.folio);
                        }
                        else if (detail.turno <= _this.turnoActual && now.getFullYear() == ff.getFullYear() && now.getMonth() == ff.getMonth() && now.getDate() == ff.getDate()) {
                            console.log("FOLIO TERMINADO -> " + detail.folio);
                        }
                        else {
                            _this.validaPeriodo(detail);
                            _this.tablaSolicitudes.push(detail);
                        }
                    }
                    _this.spin = false;
                    document.getElementById('btnEdit').style.display = 'block';
                }
            }
        }, function (err) { console.log(err); });
    };
    EditarSolicitudComponent.prototype.validaPeriodo = function (detail) {
        var now = new Date();
        var ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        var fi = new Date(detail.fechaInicio);
        var ff = new Date(detail.fechaFinal);
        ff.setDate(ff.getDate() + 1);
        if (now > fi) {
            if (now.getMonth() < 10) {
                if (detail.turno < this.turnoActual && now.getDate() < ultimoDia.getDate()) {
                    detail.periodoPrueba = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + (now.getDate() + 1) + " / " + ff.getFullYear() + "-0" + (ff.getMonth() + 1) + "-" + ff.getDate();
                }
                else {
                    detail.periodoPrueba = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate() + " / " + ff.getFullYear() + "-0" + (ff.getMonth() + 1) + "-" + ff.getDate();
                }
            }
            else {
                if (detail.turno < this.turnoActual && now.getDate() < ultimoDia.getDate()) {
                    detail.periodoPrueba = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate() + 1) + " / " + ff.getFullYear() + "-" + (ff.getMonth() + 1) + "-" + ff.getDate();
                }
                else {
                    detail.periodoPrueba = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " / " + ff.getFullYear() + "-" + (ff.getMonth() + 1) + "-" + ff.getDate();
                }
            }
        }
    };
    EditarSolicitudComponent.prototype.validaTurno = function () {
        var now = new Date();
        var t1Inicio = new Date();
        var t2Inicio = new Date();
        var t2fin = new Date();
        var t3fin = new Date();
        t1Inicio.setHours(9);
        t2Inicio.setHours(12);
        t2fin.setHours(15);
        t3fin.setHours(18);
        if (now.getHours() >= t1Inicio.getHours() && now.getHours() < t2Inicio.getHours()) {
            this.turnoActual = 1;
        }
        else if (now.getHours() < t2fin.getHours() && now.getHours() >= t2Inicio.getHours()) {
            this.turnoActual = 2;
        }
        else if (now.getHours() >= t2fin.getHours() && now.getHours() < t3fin.getHours()) {
            this.turnoActual = 3;
        }
        else {
            this.turnoActual = 4;
        }
        console.log("TURNO ACTUAL---> " + this.turnoActual);
    };
    EditarSolicitudComponent.prototype.getCalendarRouter = function () {
        this.route.navigate(['/admin/agenda-ambiente']);
    };
    EditarSolicitudComponent.prototype.getFolioTrans = function (detalleSolictud) {
        var _this = this;
        var now = new Date();
        var fecha = "";
        if (now.getMonth() < 10) {
            fecha = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();
        }
        else {
            fecha = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        }
        if (fecha >= detalleSolictud.fechaInicio.toString() && fecha <= detalleSolictud.fechaFinal.toString() && this.turnoActual == detalleSolictud.turno) {
            console.log("LA FECHA ENTRA EN EL RANGO DE EJECUCIÓN");
            this.getAlertServices('warn', 'Ventana en ejecución', 'No es posible agregar transacciones ya que la ventana de prueba se encuentra en ejecución');
            return;
        }
        this.folio = detalleSolictud.folio;
        this.service.getTransByFolio(this.folio).subscribe(function (p) {
            return _this.existedTrans = p.json;
        }, function (err) { console.log(err); });
        this.displayDetailTrans = true;
    };
    EditarSolicitudComponent.prototype.getFolioIP = function (detalleSolictud) {
        var _this = this;
        var now = new Date();
        var fecha = "";
        if (now.getMonth() < 10) {
            fecha = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();
        }
        else {
            fecha = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        }
        if (fecha >= detalleSolictud.fechaInicio.toString() && fecha <= detalleSolictud.fechaFinal.toString() && this.turnoActual == detalleSolictud.turno) {
            console.log("LA FECHA ENTRA EN EL RANGO DE EJECUCIÓN");
            this.getAlertServices('warn', 'Ventana en ejecución', 'No es posible agregar IP´s ya que la ventana de prueba se encuentra en ejecución');
            return;
        }
        this.folio = detalleSolictud.folio;
        this.displayDetailIp = true;
        var flag;
        console.log("OBTENIENDO IPS DEL FOLIO ");
        flag = this.service.getIpsByFolio(this.folio).subscribe(function (p) {
            return _this.existedIps = p.json;
        }, function (err) { console.log(err); });
        if (flag) {
            console.log("LA CONSULTA SE REALIZÓ BIEN");
            console.log("DETALLE SOLICITUD ------->>>> " + this.existedIps);
        }
        else {
            console.log("LA CONSULTA FALLÓ AL REALIZARSE ");
        }
    };
    EditarSolicitudComponent.prototype.modificarSolicitud = function () {
        var _this = this;
        console.log("SENDING INFO TO UPDATE IT ---->>> ");
        console.log("VALIDATE NEW IP ---->>> ");
        var statusIp;
        var statusTrans;
        var flagIp = false;
        var flagTrans = false;
        var msj = "";
        if (this.ipList.length == 0) {
            if (this.trans.length == 0) {
                this.getAlertServices('error', 'Datos nulos', 'Se debe ingresar una ip o una transacción para agregar');
                return;
            }
            else {
                console.log("INTO IP VALIDATION");
                for (var i = 0; i < this.trans.length; i++) {
                    if (this.trans[i] == this.existedTrans[i]) {
                        console.log("TRANS->>>> " + this.trans[i] + "   ExistedTransaction ->>> " + this.existedTrans[i]);
                        this.getAlertServices('error', 'Información Repetida', 'Se han seleccionado transacciones ya registradas');
                        return;
                    }
                }
                flagTrans = this.service.agregarTrans(this.trans, this.folio).subscribe(function (p) {
                    statusTrans = p.json;
                    console.log("RESPUESTA DEL SERVIDOR" + statusTrans);
                    var msj = 'Se agregaron las transacciones';
                    _this.getValidacionMes(statusTrans, msj);
                }, function (err) { });
                if (flagTrans) {
                    this.cancelModal();
                    this.getAlertServices('success', 'Solicitud Editada', 'La(s) transaccion(es) se almacenaron on exito!');
                }
                else {
                    this.cancelModal();
                    this.getAlertServices('error', 'Ah ocurrido un error', 'Ah ocurrido un error al intentar modificar su solicitud, favor de reintentar');
                }
            }
        }
        else {
            var lista = [];
            for (var i = 0, aux = 0; i < this.ipList.length; i++) {
                if (this.ipList[i]) {
                    lista[aux] = this.ipList[i];
                    console.log("POSICIIÓN " + aux + " CONTENIDO " + lista[aux]);
                    aux++;
                }
            }
            flagIp = this.service.agregarIp(lista, this.folio).subscribe(function (p) {
                statusIp = p.json;
                msj = "Se agregaron las ip ";
            }, function (err) { });
            console.log("FLAG IPS->>> " + flagIp);
            setTimeout(function () { _this.validaTransact(flagIp); }, 2000);
        }
        this.auxCont = 0;
    };
    EditarSolicitudComponent.prototype.validaTransact = function (flagIp) {
        console.log("INICIO DE VALIDACIÓN PARA GUARDAR TRANSACCIONES ");
        var flagTrans;
        if (this.trans.length != 0) {
            for (var i = 0; i < this.trans.length; i++) {
                if (this.trans[i] == this.existedTrans[i]) {
                    console.log("TRANS->>>> " + this.trans[i] + "   ExistedTransaction ->>> " + this.existedTrans[i]);
                    this.getAlertServices('error', 'Información Repetida', 'Se han seleccionado transacciones ya registradas');
                    return;
                }
            }
            flagTrans = this.service.agregarTrans(this.trans, this.folio).subscribe(function (p) {
                var statusTrans = p.json;
                console.log("RESPUESTA DEL SERVIDOR" + statusTrans);
                var msj = 'Se agregaron las transacciones';
            }, function (err) { });
        }
        console.log("ESTATUS IP -->> " + flagIp + "  ESTATUS TRANS --->> " + flagTrans);
        if (flagIp == undefined && flagTrans == undefined) {
            this.cancelModal();
            this.getAlertServices('error', 'Ah ocurrido un error', 'Ah ocurrido un error al intentar modificar su solicitud, favor de reintentar');
        }
        else if (flagTrans && flagIp == undefined) {
            this.cancelModal();
            this.getAlertServices('success', 'Solicitud Editada', 'La(s) transaccion(es) se almacenaron on exito!');
        }
        else if (flagIp && flagTrans == undefined) {
            this.cancelModal();
            this.getAlertServices('success', 'Solicitud Editada', ' Ip guardada con exito!');
        }
        else if (flagIp && flagTrans) {
            this.cancelModal();
            this.getAlertServices('success', 'Solicitud Editada', ' La solicitud de modificó correctamente');
        }
    };
    EditarSolicitudComponent.prototype.getModify = function (detalleSolictud) {
        var _this = this;
        this.trans = [];
        this.ipDesa = "";
        this.ipList = [];
        this.existedTrans = [];
        this.existedIps = [];
        this.transactLis = [];
        this.cargarTransa = [];
        this.folio = detalleSolictud.folio;
        this.spin = true;
        this.servicesCat.getAllTransactions().subscribe(function (p) {
            _this.transBack = p;
            for (var _i = 0, _a = _this.transBack; _i < _a.length; _i++) {
                var d = _a[_i];
                _this.cargarTransa.push({ label: d.transaccionPantallaTransient, value: d.transaccion });
            }
        }, function (err) { console.log(err); });
        this.service.getIpsByFolio(this.folio).subscribe(function (p) {
            return _this.existedIps = p.json;
        }, function (err) { console.log(err); });
        this.service.getTransByFolio(this.folio).subscribe(function (p) {
            return _this.existedTrans = p.json;
        }, function (err) { console.log(err); });
        setTimeout(function () {
            _this.cargaListTransact();
        }, 2000);
        setTimeout(function () { _this.displayEdit = true; }, 2000);
        console.log("DETALLE SOLICITUD GENERAL ---->>>> " + this.detalleSolictud);
    };
    EditarSolicitudComponent.prototype.cargaListTransact = function () {
        console.log("CARGA TRANSA LENGTH -->>> " + this.cargarTransa.length);
        console.log("EXISTED TRANS LENGTH -->>> " + this.existedTrans.length);
        if (this.cargarTransa) {
            var cont = 0;
            this.transactLis = this.cargarTransa;
            for (var i = 0; i < this.existedTrans.length; i++) {
                for (var j = 0; j < this.transactLis.length; j++) {
                    if (this.transactLis[j].value == this.existedTrans[i] || this.transactLis[j].value === "SALDOCORTE") {
                        console.log("TRANSACT LIST REMOVE --->>> " + this.transactLis[j].value);
                        this.transactLis.splice(j, 1);
                    }
                }
            }
            console.log("TRANSACCION-->>> " + this.transactLis.length);
        }
        this.spin = false;
        this.displayEdit = true;
    };
    EditarSolicitudComponent.prototype.agregaIp = function () {
        var patern = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm);
        if (this.ipDesa == "" || this.ipDesa == 'undefined') {
            this.ipList = [];
            this.ipDesa = "";
            this.getAlertServices('error', 'Ingresa ip', 'Es necesario que ingreses una ip para poderla agregar');
            return;
        }
        if (this.ipDesa.search(patern) != 0) {
            this.ipDesa = "";
            this.getAlertServices('error', 'Ip invalida', 'El formato de ip ingresado no es valido, favor de corregir');
            return;
        }
        for (var i = 0; i < this.existedIps.length; i++) {
            if (this.ipDesa === this.existedIps[i]) {
                this.ipList = [];
                this.getAlertServices('error', 'Ip repetida', 'La ip que se intenta agregar ya está registrada en la solicitud');
                return;
            }
        }
        if (this.ipList.length > 0) {
            for (var j = 0; j < this.ipList.length; j++) {
                if (this.ipList[j] == this.ipDesa) {
                    this.getAlertServices('error', 'Ip existente', 'La ip que se intenta agregar ya se ah agregado');
                    this.ipList = [];
                    return;
                }
            }
        }
        this.ipList[this.auxCont] = this.ipDesa;
        this.auxCont++;
        this.ipDesa = "";
        for (var i = 0; i < this.ipList.length; i++) {
            console.log("IPS AGREGADAS " + this.ipList[i]);
        }
    };
    EditarSolicitudComponent.prototype.getValidacionMes = function (status, msj) {
        switch (status) {
            case 0:
                this.cancelModal();
                this.getCalendarRouter();
                this.getAlertServices('success', 'Solicitud Editada', msj + 'con exito!');
                break;
            case 1:
                this.getAlertServices('error', 'Pruebas ejecutandose', 'Los cambios no pueden ser aplicados.');
                break;
            case 4:
                this.getAlertServices('error', 'Datos Repetidos', 'Los datos que se ingresaron ya están registrados.');
                break;
        }
    };
    EditarSolicitudComponent.prototype.cancelModalTrans = function () {
        this.displayDetailTrans = false;
    };
    EditarSolicitudComponent.prototype.openDelete = function (detalleSolictud) {
        this.folio = detalleSolictud.folio;
        this.displayDelete = true;
    };
    EditarSolicitudComponent.prototype.eliminarSolicitud = function () {
        var _this = this;
        console.log("Seleccionaste aliminar la solicitud " + this.folio);
        this.displayDelete = false;
        this.service.eliminarSolicitud(this.folio).subscribe(function (p) {
            _this.getAlertServices('success', '', 'Se eliminó con éxito la solicitud!');
            _this.route.navigate(['/admin/agenda-ambiente/editarSolicitud']);
            for (var i = 0; i < _this.tablaSolicitudes.length; i++) {
                if (_this.tablaSolicitudes[i].folio == _this.folio) {
                    console.log("ELEMENTO A ELIMINAR EN POS ->>> " + i + " -->>> " + _this.tablaSolicitudes[i].folio);
                    _this.tablaSolicitudes.splice(i, 1);
                }
            }
        }, function (err) {
            _this.getAlertServices('error', '', 'Ocurrió un error al eliminar el folio');
        });
    };
    EditarSolicitudComponent.prototype.cancelDelete = function () {
        this.displayDelete = false;
    };
    EditarSolicitudComponent.prototype.cancelModal = function () {
        this.displayEdit = false;
        this.trans = [];
        this.ipDesa = "";
        this.ipList = [];
        this.existedTrans = [];
        this.existedIps = [];
        this.transactLis = [];
        var trans = document.getElementsByClassName('ui-multiselect-label-container');
        trans[0].children[0].textContent = "TRANSACCIONES DISPONIBLES";
    };
    EditarSolicitudComponent.prototype.getAlertServices = function (sevError, sumMsg, msg) {
        this.alertService.push({ severity: sevError, summary: sumMsg,
            detail: msg });
    };
    EditarSolicitudComponent.prototype.getTurnoByFolio = function (detalleSolictud) {
        var _this = this;
        var folio = detalleSolictud.folio;
        this.service.getTurnByFolio(this.folio).subscribe(function (p) {
            return _this.turns = p.json;
        }, function (err) { console.log(err); });
        console.log("TURNOS RECIBIDOS ---->>>> " + this.turns);
    };
    EditarSolicitudComponent.prototype.validaMes = function (mes) {
        if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
            return 31;
        }
        else if (mes == 3 || mes == 5 || mes == 8 || mes == 10) {
            return 30;
        }
        else {
            return 28;
        }
    };
    EditarSolicitudComponent.prototype.onChange = function (event) {
        event.originalEvent;
        var trans = document.getElementsByClassName('ui-multiselect-label-container');
        trans[0].children[0].textContent = "TRANSACCIONES DISPONIBLES-";
    };
    return EditarSolicitudComponent;
}());
EditarSolicitudComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editar-solicitud',
        template: __webpack_require__("./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.html"),
        styles: [__webpack_require__("./src/app/agenda-ambiente/editar-solicitud/editar-solicitud.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__["a" /* AgendaAmbienteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__agenda_ambiente_service__["a" /* AgendaAmbienteService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__catalogos_catalogos_service__["a" /* CatalogosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__catalogos_catalogos_service__["a" /* CatalogosService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]) === "function" && _d || Object])
], EditarSolicitudComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/editar-solicitud.component.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/model/SolicitudModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudModel; });
var SolicitudModel = (function () {
    function SolicitudModel(folio, user, userMail, nomProyect, fechaInicio, fechaFinal, permisosIp, permisosTrans, dias, comentarios, usuario, turno, nomUser, periodoPrueba) {
        if (permisosIp === void 0) { permisosIp = []; }
        if (permisosTrans === void 0) { permisosTrans = []; }
        this.folio = folio;
        this.user = user;
        this.userMail = userMail;
        this.nomProyect = nomProyect;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.permisosIp = permisosIp;
        this.permisosTrans = permisosTrans;
        this.dias = dias;
        this.comentarios = comentarios;
        this.usuario = usuario;
        this.turno = turno;
        this.nomUser = nomUser;
        this.periodoPrueba = periodoPrueba;
    }
    return SolicitudModel;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/SolicitudModel.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.css":
/***/ (function(module, exports) {

module.exports = "    .customLabel {\r\n        font-size: 10pt;\r\n    }\r\n    \r\n    input:invalid:required {\r\n        border: 2px solid red;\r\n    }\r\n    \r\n    select:invalid:required {\r\n        border: 2px solid red;\r\n    }\r\n    \r\n    .noPadding {\r\n        height: 50px;\r\n    }\r\n    \r\n    .danger_marker {\r\n        color: red;\r\n        font-weight: bold;\r\n    }\r\n    \r\n    .headersTable {\r\n        width: 25%;\r\n    }\r\n    \r\n    .helphd {\r\n        margin-right: 40%;\r\n    }"

/***/ }),

/***/ "./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header\">\n    <h1>Solicitar ambiente WS-M2K desarrollo</h1>\n    <a [routerLink]=\"['/admin/agenda-ambiente']\" class=\"btn btn-link\" style=\"float: right\">Regresar al calendario</a>\n    <p>Ingresa los datos que se piden en el formulario para solicitar el ambiente de desarrollo.</p>\n</div>\n\n<p-panel class=\"col-md-12\">\n    <button pButton type=\"button\" icon=\"fa-floppy-o\" label=\"Clean\" style=\"float:right;\" class=\"ui-button-info rg-button\" (click)=\"cleanScreen()\"></button>\n    <p-header>\n        <div class=\"ui-helper-clearfix\">\n            <span class=\"ui-panel-title\" style=\"font-size:16px;display:inline-block;margin-top:2px;\">Formato de Solicitud de Ambiente</span>\n        </div>\n    </p-header>\n    <div class=\"col-md-12\" style=\"text-align: right;padding-bottom: 10px;\">\n        Campos marcados con <span class=\"danger_marker\">*</span> son obligatorios.\n    </div>\n    <form class=\"form-horizontal\" novalidate=\"\" (ngSubmit)=\"guardarSolicitud()\" [formGroup]=\"formGroup\" #form=\"ngForm\">\n\n        <div class=\"row\" style=\"padding-bottom: 20px; padding-top: 20px\">\n\n            <div class=\"col-md-8\" style=\"margin-top: -15px;\">\n                <div>\n                    <simple-help [ayuda]=\"nProyectoAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"nomProyect\">Nombre del Proyecto<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <input id=\"nomProyect\" style=\"height: 30px;\" type=\"text\" name=\"nomProyect\" class=\"col-md-12\" formControlName=\"nomProyect\" />\n                    <!-- Mensaje de Error de Validación-->\n                    <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.nomProyect\">{{formErrors.nomProyect}}</div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\" style=\"padding-bottom: 10px;\">\n\n            <div class=\"col-md-3\">\n                <div class=\"helphd\">\n                    <simple-help [ayuda]=\"inFePruebasAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"fechaInicio\">Inicio de pruebas<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <p-calendar [(ngModel)]=\"fechaInicio\" [minDate]=\"restriFechaMin\" [maxDate]=\"restriFechaMax\" [readonlyInput]=\"true\" dateFormat=\"dd/mm/yy\" id='horaInicio' class=\"inputselect\" name=\"fechaInicio\" formControlName=\"fechaInicio\"></p-calendar>\n                </div>\n\n            </div>\n\n            <div class=\"col-md-3\">\n                <div class=\"helphd\">\n                    <simple-help [ayuda]=\"fnFePruebasAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"fechaFinal\">Fin de  pruebas<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <p-calendar [(ngModel)]=\"fechaFinal\" [minDate]=\"restriFechaMin\" [maxDate]=\"restriFechaMax\" [readonlyInput]=\"true\" dateFormat=\"dd/mm/yy\" id='fechaFinal' class=\"inputselect\" name=\"fechaFinal\" formControlName=\"fechaFinal\"></p-calendar>\n                </div>\n            </div>\n            <div class=\"col-md-2\">\n                <div>\n                    <simple-help [ayuda]=\"usuarioAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"usuario\">Usuario<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <input id=\"usuario\" style=\"height: 30px;text-transform:uppercase\" type=\"text\" name=\"usuario\" class=\"col-md-12\" formControlName=\"usuario\" />\n                    <!-- Mensaje de Error de Validación-->\n                    <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuario\">{{formErrors.usuario}}</div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\" style=\"padding-bottom: 20px; padding-top: 20px\">\n            <div class=\"col-md-3\" style=\"margin-top: -15px;\">\n                <div>\n                    <simple-help [ayuda]=\"turnoAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"turno\">Horarios de Pruebas<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <select class=\"form-control\" formControlName=\"turno\" required>\n                    <option  selected disabled>Seleccionar Horario</option>\n                    <option value='1'>{{HORARIO_DIU}}</option>\n                      <option value='2'> {{HORARIO_MEDIODIA}}</option>\n                      <option value='3'> {{HORARIO_VES}}</option>\n                </select>\n                </div>\n            </div>\n\n            <div class=\"col-md-2\" style=\"margin-top: -15px; margin-left:25%;\">\n                <div>\n                    <simple-help [ayuda]=\"transAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"permisosTrans\" style=\"margin-left: 3%;width: 80%;\">Transaciones<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group\">\n                    <!--<p-listbox [options]=\"cargarTransa\" [style]=\"{'width':'100%','max-height':'250px'}\" style=\"border: none;\" [(ngModel)]=\"permisosTrans\" filter=\"filter\" multiple=\"multiple\" checkbox=\"checkbox\" class=\"form-control\" formControlName=\"permisosTrans\"></p-listbox>-->\n                    <p-multiSelect [options]=\"cargarTransa\" [(ngModel)]=\"permisosTrans\" defaultLabel=\"SELECCIONAR\" [style]=\"{'width':'100%','margin-left':'5%'}\" style=\"border: none !important;\" scrollHeight=\"150px\" class=\"form-control\" formControlName=\"permisosTrans\" required\n                        (onChange)=\"onChange($event)\"></p-multiSelect>\n                </div>\n            </div>\n        </div>\n        <div style=\"margin-top: -5px;\">\n            <div class=\"row\">\n                <div class=\"col-md-3\" style=\"margin-bottom:-20px\">\n                    <simple-help [ayuda]=\"ipAyuda\"></simple-help>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-1\" style=\"padding-bottom: 10px;\">\n                    <input class=\"btn btn-info\" type=\"button\" id=\"btnIpAdd\" (click)=\"agregarPermisosIp()\" value=\"Agregar Ip's\" />\n                </div>\n            </div>\n        </div>\n\n        <div>\n            <table class=\"table\" style=\"margin-bottom: 1px;max-width:24.5%;\">\n                <thead>\n                    <tr style=\"background-color:lightsteelblue\">\n                        <th style=\"text-align: center\">IP</th>\n                    </tr>\n                </thead>\n            </table>\n\n            <div>\n                <div formArrayName=\"permisosIp\" *ngFor=\"let permiso of formGroup.get('permisosIp').controls; let i = index;\">\n                    <div [formGroupName]=\"i\">\n                        <table class=\"table\" style=\"max-width:24.5%;    margin-bottom: 1px;border: 1px solid black;\">\n                            <tbody>\n                                <tr>\n                                    <td><input class=\"form-control\" [attr.id]=\"'ip' + i\" type=\"text\" pattern=\"{{ipPattern}}\" maxlength=\"{{ipMax}}\" formControlName=\"ip\" required /></td>\n                                    <td><input type=\"button\" (click)=\"eliminarPermisosIp(i)\" class=\"btn btn-danger\" style=\"margin-left: 35px;\" value=\"Eliminar\" /></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"row\" style=\" margin-top:80px\">\n            <div class=\"col-md-12\">\n                <div style=\"margin-right:34%;\">\n                    <simple-help [ayuda]=\"comentariosAyuda\"></simple-help>\n                </div>\n                <label class=\"customLabel\" for=\"comentarios\">Comentarios<span class=\"danger_marker\">*</span></label>\n                <div class=\"form-group \">\n                    <textarea pInputTextarea [ngModel]=\"comentarios\" style=\"width: 66%\" formControlName=\"comentarios\" [rows]=\"3\" class=\"customLabel\" autoResize=\"autoResize\" (ngModelChange)=\"comentarios=$event\" placeholder=\"Si se tiene algún folio SISAP relacionado con las pruebas ingresarlo en está sección...\"></textarea>\n                    <!-- Mensaje de Error de Validación-->\n                    <div class=\"alert alert-warning noPadding\" style=\"width: 66%\" *ngIf=\"formErrors.comentarios\">{{formErrors.comentarios}}</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <button type=\"submit\" id=\"enviarFormulario\" class=\"btn btn-primary btn-outline-light-blue\" [disabled]=\"!formGroup.valid\" style=\"margin-left: 54%\">Generar Solicitud</button>\n        </div>\n    </form>\n</p-panel>"

/***/ }),

/***/ "./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudAmbienteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_SolicitudModel__ = __webpack_require__("./src/app/agenda-ambiente/model/SolicitudModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agenda_ambiente_service__ = __webpack_require__("./src/app/agenda-ambiente/agenda-ambiente.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__catalogos_catalogos_service__ = __webpack_require__("./src/app/catalogos/catalogos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_CommonUtilsAgenda__ = __webpack_require__("./src/app/agenda-ambiente/util/CommonUtilsAgenda.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SolicitudAmbienteComponent = (function () {
    function SolicitudAmbienteComponent(fb, service, cdr, route, alertService, servicesCat) {
        this.fb = fb;
        this.service = service;
        this.cdr = cdr;
        this.route = route;
        this.alertService = alertService;
        this.servicesCat = servicesCat;
        this.permisosABorrar = [];
        this.restriFechaMin = new Date();
        this.restriFechaMax = new Date();
        this.diasSinLaborar = [];
        this.spin = false;
        this.HORARIO_DIU = "09:00 hrs a 12:00 hrs.";
        this.HORARIO_MEDIODIA = "12:00 hrs a 15:00 hrs.";
        this.HORARIO_VES = "15:00 hrs a 18:00 hrs.";
        this.ipPattern = "\^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\$";
        this.ipMax = "15";
        this.formErrors = {
            'nomProyect': '',
            'comentarios': '',
            'usuario': '',
        };
        this.validationMessages = {
            'nomProyect': {
                'required': 'Ingrese el nombre del proyecto.',
                'maxlength': 'Máximo 40 caracteres'
            }, 'comentarios': {
                'required': 'Favor de incluir algún comentario.',
                'maxlength': 'El COMENTARIO debe tener máximo 250 caracteres.'
            }, 'usuario': {
                'required': 'Ingrese el usuario.',
                'maxlength': 'Max. 7 caracteres.'
            },
        };
        this.transBack = [];
    }
    SolicitudAmbienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargarTransa = [];
        this.cargarAyuda();
        this.initForm();
        this.restriFechaMin.setDate(this.restriFechaMin.getDate() + 1);
        this.restriFechaMax.setDate(this.restriFechaMax.getDate() + 30);
        this.agregarPermisosIp();
        this.servicesCat.getAllTransactions().subscribe(function (p) {
            _this.transBack = p;
            for (var _i = 0, _a = _this.transBack; _i < _a.length; _i++) {
                var d = _a[_i];
                _this.cargarTransa.push({ label: d.transaccionPantallaTransient, value: d.transaccion });
                _this.limpiaLista();
            }
        }, function (err) { console.log(err); });
        this.service.getLimiteReservacion().subscribe(function (p) { return _this.limiteDias = p.json; }, function (err) { console.log(err); });
        this.service.getLimiteAmbiente().subscribe(function (p) { return _this.limiteAmbiente = p.json; }, function (err) { console.log(err); });
    };
    SolicitudAmbienteComponent.prototype.limpiaLista = function () {
        for (var i = 0; i < this.cargarTransa.length; i++) {
            if (this.cargarTransa[i].value === "SALDOCORTE") {
                this.cargarTransa.splice(i, 1);
            }
        }
    };
    SolicitudAmbienteComponent.prototype.initForm = function () {
        var _this = this;
        this.formGroup = this.fb.group({
            'fechaInicio': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](this.fechaInicio, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'nomProyect': [this.nomProyecto, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(40)])],
            'fechaFinal': [this.fechaFinal, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            'permisosIp': this.fb.array([], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            'permisosTrans': [this.transacciones, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            'comentarios': [this.comentarios, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(250)])],
            'usuario': [this.usuario, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(7)])],
            'turno': [this.turno, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
        });
        this.formGroup.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    SolicitudAmbienteComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_9__util_CommonUtilsAgenda__["a" /* CommonUtilsAgenda */].removeSelector();
    };
    SolicitudAmbienteComponent.prototype.guardarSolicitud = function () {
        document.getElementById('enviarFormulario').setAttribute('disabled', 'true');
        var userlogin = JSON.parse(localStorage.getItem('user_session_data')).user;
        var userId = userlogin.id;
        var userMail = userlogin.correo;
        console.log(this.formGroup.value);
        var solicitud = Object.assign({}, this.formGroup.value);
        var dataSolicitud = new __WEBPACK_IMPORTED_MODULE_3__model_SolicitudModel__["a" /* SolicitudModel */](0, userId, userMail, solicitud.nomProyect, solicitud.fechaInicio, solicitud.fechaFinal, solicitud.permisosIp, solicitud.permisosTrans, 0, solicitud.comentarios, solicitud.usuario, solicitud.turno);
        //this.validaDuplicidad(dataSolicitud);
        // this.enviarSolicitud(dataSolicitud);
        //this.ambienteDispo(dataSolicitud)
        //this.limiteDiasReserdados(dataSolicitud)
        if (this.validarPermisosIP(dataSolicitud.permisosIp)) {
            this.validaFinSemana(dataSolicitud);
        }
    };
    SolicitudAmbienteComponent.prototype.validaFinSemana = function (solicitud) {
        var _this = this;
        this.service.getDiasInhabiles().subscribe(function (p) {
            _this.diasInhabiles = p;
            for (var _i = 0, _a = _this.diasInhabiles; _i < _a.length; _i++) {
                var dia = _a[_i];
                _this.diasSinLaborar.push(dia.diaInhabil);
            }
            if (!_this.getValidarDia(solicitud.fechaInicio, _this.diasSinLaborar)) {
                _this.getAlertServices('error', 'Día NO laborable', 'La fecha de Inicio (' + _this.getFormatoDay(solicitud.fechaInicio) + ') NO se puede reservar.');
                document.getElementById('enviarFormulario').removeAttribute('disabled');
                return null;
            }
            else if (!_this.getValidarDia(solicitud.fechaFinal, _this.diasSinLaborar)) {
                _this.getAlertServices('error', 'Día NO laborable', 'La fecha final (' + _this.getFormatoDay(solicitud.fechaFinal) + ') NO se puede reservar.');
                document.getElementById('enviarFormulario').removeAttribute('disabled');
                return null;
            }
            else {
                _this.limiteDiasReserdados(solicitud);
            }
        }, function (err) { console.log(err); });
    };
    SolicitudAmbienteComponent.prototype.getValidarDia = function (date, data) {
        for (var i = 0; i < data.length; i++) {
            if (this.getFormatoDay(data[i]) === this.getFormatoDay(date)) {
                console.log("dia inabil");
                return false;
            }
        }
        return true;
    };
    SolicitudAmbienteComponent.prototype.limiteDiasReserdados = function (solicitud) {
        this.fechaEnvio = new Date();
        this.dias = this.getDias(solicitud.fechaInicio, solicitud.fechaFinal);
        var date = solicitud.fechaInicio;
        for (var i = 0; i < this.dias; i++) {
            this.fechaEnvio.setDate(solicitud.fechaInicio.getDate() + i);
            this.fechaEnvio.setDate(date.getDate() + i);
            if (this.fechaEnvio.getDay() === 6 || this.fechaEnvio.getDay() === 5) {
                this.dias--;
            }
            this.fechaEnvio.setDate(solicitud.fechaInicio.getDate());
        }
        if (this.dias <= this.limiteDias) {
            if (solicitud.fechaInicio.getTime() <= solicitud.fechaFinal.getTime()) {
                this.ambienteDispo(solicitud);
            }
            else {
                this.getAlertServices('error', 'Solicitud', 'La fecha Inicial No puede ser mayor a la fecha final.');
                document.getElementById('enviarFormulario').removeAttribute('disabled');
                return null;
            }
        }
        else {
            this.getAlertServices('error', 'Solicitud', 'No se puede reservar más de ' + this.limiteDias + ' días hábiles el ambiente, contando el día actual');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
            return null;
        }
    };
    SolicitudAmbienteComponent.prototype.getFormatoDay = function (date) {
        var fecha = __WEBPACK_IMPORTED_MODULE_7_moment__(date).format('DD-MM');
        return fecha;
    };
    SolicitudAmbienteComponent.prototype.ambienteDispo = function (solicitud) {
        var _this = this;
        this.service.validarAmbiente(solicitud).subscribe(function (p) {
            _this.ambiente = p.json;
            var fechaInicio = _this.getFormatoDay(_this.ambiente.diaOcupado);
            //el condicional para permitir 2 soliitudes por turno en el calendario (también se cambia en el back )
            if (_this.ambiente.cDias < _this.limiteAmbiente) {
                _this.validaDuplicidad(solicitud);
            }
            else {
                _this.getAlertServices('error', 'Disponibilidad de Ambiente', 'El día ' + fechaInicio + ' NO tiene disponiblididad para reservar el ambiente. Favor de cambiar los días de prueba.');
                document.getElementById('enviarFormulario').removeAttribute('disabled');
            }
        }, function (err) {
            console.log("ERROR" + err);
        });
    };
    SolicitudAmbienteComponent.prototype.validaDuplicidad = function (data) {
        var _this = this;
        this.service.verificarSolicitud(data).subscribe(function (p) {
            console.log("respuesta con exito");
            _this.enviarSolicitud(data);
        }, function (err) {
            _this.getAlertServices('error', 'Pemisos Duplicados', 'La solicitud ya está registrada.');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
        });
    };
    SolicitudAmbienteComponent.prototype.validarPermisosIP = function (data) {
        var repetido = true;
        var ips = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var del = data_1[_i];
            ips.push(del.ip);
        }
        var uniqueItems = Array.from(new Set(ips));
        if (data.length > uniqueItems.length || data.length < uniqueItems.length) {
            this.getAlertServices('error', 'Solicitud', 'No se permiten Ip repetidas.');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
            return false;
        }
        return repetido;
    };
    SolicitudAmbienteComponent.prototype.enviarSolicitud = function (data) {
        var _this = this;
        this.service.sendSolicitud(data).subscribe(function (p) {
            _this.route.navigate(['/admin/agenda-ambiente']);
            _this.getAlertServices('success', 'Solicitud de Ambiente', "La solicitd se envió con exito!");
        }, function (err) {
            _this.getAlertServices('error', 'Solicitud de Ambiente', 'Surgido un error al enviar la solicitud, favor de intentar más tarde.');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
        });
    };
    SolicitudAmbienteComponent.prototype.getAlertServices = function (sevError, sumMsg, msg) {
        this.alertService.push({ severity: sevError, summary: sumMsg,
            detail: msg });
    };
    SolicitudAmbienteComponent.prototype.getDias = function (ini, fin) {
        var dInicial = __WEBPACK_IMPORTED_MODULE_7_moment__(ini);
        var dFn = __WEBPACK_IMPORTED_MODULE_7_moment__(fin);
        var dia = Math.abs(dInicial.diff(dFn, 'days'));
        dia++;
        return dia;
    };
    SolicitudAmbienteComponent.prototype.getAlertaServices = function (msg, detalle) {
        this.alertService.push({ severity: 'error', summary: msg,
            detail: detalle });
    };
    SolicitudAmbienteComponent.prototype.agregarPermisosIp = function () {
        // this.cdr.detectChanges();
        var permisosArr1 = this.formGroup.get('permisosIp');
        var permisosFG1 = this.permisosIp();
        permisosArr1.push(permisosFG1);
    };
    SolicitudAmbienteComponent.prototype.eliminarPermisosIp = function (index) {
        var permisos;
        permisos = this.formGroup.get('permisosIp');
        var eliminarPermisosr = permisos.at(index);
        if (eliminarPermisosr.controls['id'].value != '0') {
            this.permisosABorrar.push(eliminarPermisosr.controls['id'].value);
        }
        permisos.removeAt(index);
        //console.log("se eliminan permisos");
    };
    SolicitudAmbienteComponent.prototype.permisosIp = function () {
        return this.fb.group({
            id: '0',
            ip: '',
        });
    };
    SolicitudAmbienteComponent.prototype.cleanScreen = function () {
        this.formGroup.reset();
    };
    SolicitudAmbienteComponent.prototype.cargarAyuda = function () {
        this.nProyectoAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Proyecto', 'Nombre del proyecto para el cual se aplicarán las pruebas.');
        this.inFePruebasAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Fecha Inicio', 'Día en que se inciarán las pruebas en desarrollo.');
        this.fnFePruebasAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Fin de Pruebas', 'Fecha de terminación de las pruebas.');
        this.usuarioAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Usuario', 'Es el usuario que se utiliza para entrar a M2K.');
        this.comentariosAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Comentarios', 'Indicar el folio SISAP o alguna referencia de las pruebas.');
        this.ipAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Ip', 'Es la Ip de donde se va invocar el servicio.');
        this.transAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Transacción', 'Es el nombre del servicio que se va a consumir.');
        this.turnoAyuda = new __WEBPACK_IMPORTED_MODULE_6__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Horario de pruebas', 'Los horarios de pruebas se distribuirán en 3 turnos. Serán de 09:00 a 12:00 , 12:00 a 15:00 y de 15:00 a 18:00 hrs. con soporte.');
    };
    SolicitudAmbienteComponent.prototype.onValueChanged = function (data) {
        if (!this.formGroup) {
            return;
        }
        var form = this.formGroup;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SolicitudAmbienteComponent.prototype.onChange = function (event) {
        var trans = document.getElementsByClassName('ui-multiselect-label-container');
        trans[0].children[0].textContent = "SELECCIONAR-";
    };
    return SolicitudAmbienteComponent;
}());
SolicitudAmbienteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitud-ambiente',
        template: __webpack_require__("./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.html"),
        styles: [__webpack_require__("./src/app/agenda-ambiente/solicitud-ambiente/solicitud-ambiente.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__agenda_ambiente_service__["a" /* AgendaAmbienteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__agenda_ambiente_service__["a" /* AgendaAmbienteService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__alert_service__["a" /* AlertService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__catalogos_catalogos_service__["a" /* CatalogosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__catalogos_catalogos_service__["a" /* CatalogosService */]) === "function" && _f || Object])
], SolicitudAmbienteComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/solicitud-ambiente.component.js.map

/***/ }),

/***/ "./src/app/agenda-ambiente/util/CommonUtilsAgenda.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtilsAgenda; });
var CommonUtilsAgenda = (function () {
    function CommonUtilsAgenda() {
    }
    CommonUtilsAgenda.removeSelector = function () {
        var selector = document.getElementsByClassName("ui-chkbox ui-widget");
        selector[0].setAttribute("style", "display: none");
    };
    return CommonUtilsAgenda;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/CommonUtilsAgenda.js.map

/***/ })

});
//# sourceMappingURL=agenda-ambiente.module.chunk.js.map