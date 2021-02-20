webpackJsonp(["monitor-omega.module"],{

/***/ "./src/app/monitor-omega/model/Cics.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Cics */
/* unused harmony export toCics */
/* harmony export (immutable) */ __webpack_exports__["a"] = toCicsList;
var Cics = (function () {
    function Cics(cicsRels, jobName, totalCpu, db2Cpu, pThrdMax, activeThreads, commitRateSec, roCommitRateSec, alertRaised) {
        this.cicsRels = cicsRels;
        this.jobName = jobName;
        this.totalCpu = totalCpu;
        this.db2Cpu = db2Cpu;
        this.pThrdMax = pThrdMax;
        this.activeThreads = activeThreads;
        this.commitRateSec = commitRateSec;
        this.roCommitRateSec = roCommitRateSec;
        this.alertRaised = alertRaised;
    }
    Cics.getNewInstance = function () {
        return new Cics('', '', '', '', '', '', '', '', false);
    };
    return Cics;
}());

function toCics(r) {
    var cicsThread = ({
        cicsRels: r.cicsRels,
        jobName: r.jobName,
        totalCpu: r.totalCpu,
        db2Cpu: r.db2Cpu,
        pThrdMax: r.pThrdMax,
        activeThreads: r.activeThreads,
        commitRateSec: r.commitRateSec,
        roCommitRateSec: r.roCommitRateSec,
        fechaUpdate: new Date(r.fechaUpdate),
        alertRaised: r.alertRaised
    });
    return cicsThread;
}
function toCicsList(r) {
    var cicsThreadList = [];
    if (r) {
        cicsThreadList = r.map(toCics);
    }
    return cicsThreadList;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/Cics.js.map

/***/ }),

/***/ "./src/app/monitor-omega/model/CicsThread.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CicsThread */
/* unused harmony export toCicsThread */
/* harmony export (immutable) */ __webpack_exports__["a"] = toCicsThreadList;
var CicsThread = (function () {
    function CicsThread(elapsed, planName, tran, cpu, status, getPg, update, commit, jobName, region, transaccion, threadType, elapsedTime, pantallaM2k) {
        this.elapsed = elapsed;
        this.planName = planName;
        this.tran = tran;
        this.cpu = cpu;
        this.status = status;
        this.getPg = getPg;
        this.update = update;
        this.commit = commit;
        this.jobName = jobName;
        this.region = region;
        this.transaccion = transaccion;
        this.threadType = threadType;
        this.elapsedTime = elapsedTime;
        this.pantallaM2k = pantallaM2k;
    }
    CicsThread.getNewInstance = function () {
        return new CicsThread('', '', '', '', '', '', '', '', '', '', '', 0, 0.0, '');
    };
    return CicsThread;
}());

function toCicsThread(r) {
    var cicsThreadSummary = ({
        elapsed: r.elapsed,
        planName: r.planName,
        tran: r.tran,
        cpu: r.cpu,
        status: r.status,
        getPg: r.getPg,
        update: r.update,
        commit: r.commit,
        jobName: r.jobName,
        region: r.region,
        transaccion: r.transaccion,
        threadType: r.threadType,
        elapsedTime: r.elapsedTime,
        pantallaM2k: r.pantallaM2k
    });
    return cicsThreadSummary;
}
function toCicsThreadList(r) {
    var cicsThreadSummaryList = r.map(toCicsThread);
    return cicsThreadSummaryList;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/CicsThread.js.map

/***/ }),

/***/ "./src/app/monitor-omega/model/OmegaData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OmegaData; });
/* harmony export (immutable) */ __webpack_exports__["b"] = toOmegaData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cics__ = __webpack_require__("./src/app/monitor-omega/model/Cics.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CicsThread__ = __webpack_require__("./src/app/monitor-omega/model/CicsThread.ts");


var OmegaData = (function () {
    function OmegaData(fechaUpdate, listCics, listCicsThread) {
        this.fechaUpdate = fechaUpdate;
        this.listCics = listCics;
        this.listCicsThread = listCicsThread;
    }
    OmegaData.getNewInstance = function () {
        return new OmegaData(new Date(), [], []);
    };
    return OmegaData;
}());

function toOmegaData(r) {
    var response = OmegaData.getNewInstance();
    if (r) {
        response = ({
            fechaUpdate: new Date(r.fechaUpdate),
            listCics: Object(__WEBPACK_IMPORTED_MODULE_0__Cics__["a" /* toCicsList */])(r.listCics),
            listCicsThread: Object(__WEBPACK_IMPORTED_MODULE_1__CicsThread__["a" /* toCicsThreadList */])(r.listCicsThread)
        });
    }
    return response;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/OmegaData.js.map

/***/ }),

/***/ "./src/app/monitor-omega/model/PropiedadesMonitorOmega.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropiedadesMonitorOmega; });
/* harmony export (immutable) */ __webpack_exports__["b"] = mapPropiedades;
/* harmony export (immutable) */ __webpack_exports__["c"] = toPropiedadesMonitorOmega;
var PropiedadesMonitorOmega = (function () {
    function PropiedadesMonitorOmega(intervaloRefrescado, umbralAlertas, monitorOn, correosAlerta, correosAlertaError, maxCpu) {
        this.intervaloRefrescado = intervaloRefrescado;
        this.umbralAlertas = umbralAlertas;
        this.monitorOn = monitorOn;
        this.correosAlerta = correosAlerta;
        this.correosAlertaError = correosAlertaError;
        this.maxCpu = maxCpu;
    }
    PropiedadesMonitorOmega.getNewInstance = function () {
        return new PropiedadesMonitorOmega(0, 0.0, false, '', '', 0.0);
    };
    return PropiedadesMonitorOmega;
}());

function mapPropiedades(response) {
    var responseJson = response.json();
    var propiedades;
    if (responseJson) {
        propiedades = ({
            intervaloRefrescado: responseJson.intervaloRefrescado,
            umbralAlertas: responseJson.umbralAlertas,
            maxCpu: responseJson.maxCpu
        });
    }
    return propiedades;
}
function toPropiedadesMonitorOmega(r) {
    var porpiedadesMonitorOmega = ({
        intervaloRefrescado: r.intervaloRefrescado,
        umbralAlertas: r.umbralAlertas,
        monitorOn: r.monitorOn,
        correosAlerta: r.correosAlerta,
        correosAlertaError: r.correosAlertaError,
        maxCpu: r.maxCpu
    });
    return porpiedadesMonitorOmega;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PropiedadesMonitorOmega.js.map

/***/ }),

/***/ "./src/app/monitor-omega/model/ReportePantallaOmega.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ReportePantallaOmega */
/* harmony export (immutable) */ __webpack_exports__["a"] = mapPantalla;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OmegaData__ = __webpack_require__("./src/app/monitor-omega/model/OmegaData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PropiedadesMonitorOmega__ = __webpack_require__("./src/app/monitor-omega/model/PropiedadesMonitorOmega.ts");


var ReportePantallaOmega = (function () {
    function ReportePantallaOmega(lastUpdate, alertsCount, omegaData, propiedadesMonitorOmega) {
        this.lastUpdate = lastUpdate;
        this.alertsCount = alertsCount;
        this.omegaData = omegaData;
        this.propiedadesMonitorOmega = propiedadesMonitorOmega;
    }
    ReportePantallaOmega.getNewInstance = function () {
        return new ReportePantallaOmega(new Date(), 0, __WEBPACK_IMPORTED_MODULE_0__OmegaData__["a" /* OmegaData */].getNewInstance(), __WEBPACK_IMPORTED_MODULE_1__PropiedadesMonitorOmega__["a" /* PropiedadesMonitorOmega */].getNewInstance());
    };
    return ReportePantallaOmega;
}());

function mapPantalla(response) {
    var pantalla = ReportePantallaOmega.getNewInstance();
    var responseJson = response.json();
    if (responseJson) {
        pantalla = ({
            lastUpdate: responseJson.lastUpdate,
            alertsCount: responseJson.alertsCount,
            omegaData: Object(__WEBPACK_IMPORTED_MODULE_0__OmegaData__["b" /* toOmegaData */])(responseJson.omegaData),
            propiedadesMonitorOmega: Object(__WEBPACK_IMPORTED_MODULE_1__PropiedadesMonitorOmega__["c" /* toPropiedadesMonitorOmega */])(responseJson.propiedadesMonitorOmega)
        });
    }
    return pantalla;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ReportePantallaOmega.js.map

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorOmegaModule", function() { return MonitorOmegaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__monitor_omega_service__ = __webpack_require__("./src/app/monitor-omega/monitor-omega.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__monitor_omega_routing__ = __webpack_require__("./src/app/monitor-omega/monitor-omega.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__monitor_omega_monitor_omega_component__ = __webpack_require__("./src/app/monitor-omega/monitor-omega/monitor-omega.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help_help_module__ = __webpack_require__("./src/app/help/help.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var MonitorOmegaModule = (function () {
    function MonitorOmegaModule() {
    }
    return MonitorOmegaModule;
}());
MonitorOmegaModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GalleriaModule"],
            __WEBPACK_IMPORTED_MODULE_6__monitor_omega_routing__["a" /* MonitorOmegaRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8__help_help_module__["a" /* HelpModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__monitor_omega_monitor_omega_component__["a" /* MonitorOmegaComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__monitor_omega_service__["a" /* MonitorOmegaService */]
        ]
    })
], MonitorOmegaModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-omega.module.js.map

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorOmegaRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monitor_omega_monitor_omega_component__ = __webpack_require__("./src/app/monitor-omega/monitor-omega/monitor-omega.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__monitor_omega_monitor_omega_component__["a" /* MonitorOmegaComponent */]
    }
];
var MonitorOmegaRoutingModule = (function () {
    function MonitorOmegaRoutingModule() {
    }
    return MonitorOmegaRoutingModule;
}());
MonitorOmegaRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], MonitorOmegaRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-omega.routing.js.map

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorOmegaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_service__ = __webpack_require__("./src/app/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_ReportePantallaOmega__ = __webpack_require__("./src/app/monitor-omega/model/ReportePantallaOmega.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_PropiedadesMonitorOmega__ = __webpack_require__("./src/app/monitor-omega/model/PropiedadesMonitorOmega.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MonitorOmegaService = (function () {
    function MonitorOmegaService(http, globalService, authService) {
        this.http = http;
        this.globalService = globalService;
        this.authService = authService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
        this.restUrl = this.baseUrl + '/monitor-omega';
    }
    MonitorOmegaService.prototype.getEndPoint = function () {
        return __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath;
    };
    MonitorOmegaService.prototype.getReportePantallaOmega = function () {
        var _this = this;
        return this.globalService.get(this.restUrl + "/reporteOmega", __WEBPACK_IMPORTED_MODULE_5__model_ReportePantallaOmega__["a" /* mapPantalla */]).catch(function (error) {
            if (error.status === 0) {
                _this.authService.logout();
            }
        });
    };
    MonitorOmegaService.prototype.getPropiedadesMonitor = function () {
        return this.globalService.get(this.restUrl + "/propiedadesOmega", __WEBPACK_IMPORTED_MODULE_6__model_PropiedadesMonitorOmega__["b" /* mapPropiedades */]);
    };
    MonitorOmegaService.prototype.actualizaPropiedadesMonitor = function (data) {
        return this.globalService.post(this.restUrl + "/propiedadesOmega", data);
    };
    return MonitorOmegaService;
}());
MonitorOmegaService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AuthService */]) === "function" && _c || Object])
], MonitorOmegaService);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-omega.service.js.map

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega/monitor-omega.component.css":
/***/ (function(module, exports) {

module.exports = ".thread-type-alert {\r\n  background-color: red !important;\r\n  color: white !important;\r\n}\r\n\r\n.thread-type-ignore {\r\n  background-color: darkgray !important;\r\n  color: black !important;\r\n}\r\n\r\np-spinner#intervaloRefrescado, #umbralAlertas, #maximoCpu {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: 0px;\r\n  color: transparent !important;\r\n  border-color: transparent !important;\r\n  background-color: transparent !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega/monitor-omega.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header\">\n  <h1>Monitoreo Omegamon II for DB2.</h1>\n  <p>Muestra las transacciones CICS del Omegamon II for DB2.</p>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-2\">\n      <label>&Uacute;ltima Actualizaci&oacute;n</label>\n      <simple-help [ayuda]=\"ayudaFecha\"></simple-help>\n      <p id=\"lastUpdate\"></p>\n    </div>\n\n    <div class=\"col-md-2\">\n      <label>Estado del Monitor</label>\n      <simple-help [ayuda]=\"ayudaMonitorOn\"></simple-help>\n      <p id=\"monitorOn\"></p>\n    </div>\n\n    <div class=\"col-md-1\">\n      <label>Alertas</label>\n      <simple-help [ayuda]=\"ayudaAlertas\"></simple-help>\n      <p id=\"alertsCount\"></p>\n    </div>\n\n    <div class=\"col-md-2\">\n      <label>Tiempo Refrescado</label>\n      <simple-help [ayuda]=\"ayudaTiempo\"></simple-help>\n      <p id=\"refreshRate\"></p>\n    </div>\n\n    <div class=\"col-md-2\">\n      <label>Umbral Tiempo</label>\n      <simple-help [ayuda]=\"ayudaUmbral\"></simple-help>\n      <p id=\"alertThreshold\"></p>\n    </div>\n\n    <div class=\"col-md-2\">\n      <label>Umbral CPU</label>\n      <simple-help [ayuda]=\"ayudaMaxCpu\"></simple-help>\n      <p id=\"maxCpu\"></p>\n    </div>\n\n    <div class=\"col-md-1\">\n      <button type=\"button\" class=\"ui-button-warning\" pTooltip=\"Editar Propiedades\" data-toggle=\"modal\" data-target=\"#adminMonitor\" (click)=\"clearPropiedades()\" tooltipPosition=\"left\" pButton icon=\"fa-pencil\" ></button>\n      <simple-help [ayuda]=\"ayudaPropiedades\"></simple-help>\n    </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-11\"></div>\n  <div class=\"col-md-1\">\n    <button type=\"button\" class=\"ui-button-info\" pTooltip=\"Reordenar Por Alerta\" (click)=\"reordena()\" tooltipPosition=\"left\" pButton icon=\"fa-refresh\" ></button>\n    <simple-help [ayuda]=\"ayudaReordenar\"></simple-help>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-2\">\n    <label>CICS Omega</label>\n    <image-help [ayuda]=\"ayudaTabla\"></image-help>\n  </div>\n  <div class=\"col-md-11\"></div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <table id=\"omegaTableCics\" class=\"display\" width=\"100%\" cellspacing=\"0\">\n      <thead>\n        <tr>\n          <th>CICS</th>\n          <th>Total CPU</th>\n          <th></th> <!-- alertRaised -->\n        </tr>\n      </thead>\n    </table>\n\n  </div>\n</div>\n\n<br/>\n<br/>\n\n<div class=\"row\">\n  <div class=\"col-md-2\">\n    <label>Transacciones Omega</label>\n    <image-help [ayuda]=\"ayudaTabla\"></image-help>\n  </div>\n  <div class=\"col-md-11\"></div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <table id=\"omegaTable\" class=\"display\" width=\"100%\" cellspacing=\"0\">\n      <thead>\n        <tr>\n          <th>CICS</th>\n          <th>Regi&oacute;n</th>\n          <th>Programa</th>\n          <th>Transacci&oacute;n</th>\n          <th>Pantalla M2k</th>\n          <th>Tiempo</th>\n          <th>CPU</th>\n          <th>Estatus</th>\n          <th></th> <!-- threadType -->\n          <th></th> <!-- tiempoNum -->\n        </tr>\n      </thead>\n    </table>\n\n  </div>\n</div>\n\n<!-- Modal Administracion Monitor -->\n<div class=\"modal fade\" id=\"adminMonitor\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"adminMonitorLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n          <form #form=\"ngForm\" novalidate >\n              <div class=\"modal-header\">\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                  <h4 class=\"modal-title\" id=\"adminMonitorLabel\">Administrar Monitor</h4>\n              </div>\n              <div class=\"modal-body\">\n                  <div class=\"row\">\n                    <div class=\"form-group col-md-12\">\n                      <label>Refrescado de Datos (de 3 a 15 minutos)</label>\n                      <p-spinner id=\"intervaloRefrescado\" class=\"form-control\" name=\"intervaloRefrescado\" required [(ngModel)]=\"propiedadesUser.intervaloRefrescado\" [step]=\"1\" [min]=\"3\" [max]=\"15\" placeholder=\"Ej. 3\"></p-spinner>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"form-group col-md-12\">\n                      <label>Umbral de Tiempo (de 5.0 a 15.0 segundos)</label>\n                      <p-spinner id=\"umbralAlertas\" class=\"form-control\" name=\"umbralAlertas\" required [(ngModel)]=\"propiedadesUser.umbralAlertas\" [step]=\"0.1\" [min]=\"5.0\" [max]=\"15.0\" placeholder=\"Ej. 5.0\"></p-spinner>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"form-group col-md-12\">\n                      <label>Umbral de CPU (de 30.0 a 95.0 segundos)</label>\n                      <p-spinner id=\"maximoCpu\" class=\"form-control\" name=\"maximoCpu\" required [(ngModel)]=\"propiedadesUser.maxCpu\" [step]=\"0.1\" [min]=\"30.0\" [max]=\"95.0\" placeholder=\"Ej. 30.0\"></p-spinner>\n                    </div>\n                  </div>\n              </div>\n              <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"clearPropiedades()\">Cancelar</button>\n                  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"savePropiedades()\" [disabled]=\"!form.valid\">Guardar</button>\n              </div>\n          </form>\n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/monitor-omega/monitor-omega/monitor-omega.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorOmegaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monitor_omega_service__ = __webpack_require__("./src/app/monitor-omega/monitor-omega.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_PropiedadesMonitorOmega__ = __webpack_require__("./src/app/monitor-omega/model/PropiedadesMonitorOmega.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_model_ImageHelpModel__ = __webpack_require__("./src/app/help/model/ImageHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__ = __webpack_require__("./src/app/monitor-omega/scripts/dataTableFunctions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// Llama a la desconexion antes de quitar la pagina (F5)
$(window).on('beforeunload', function () {
    Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["b" /* disconnect */])();
});
var MonitorOmegaComponent = (function () {
    function MonitorOmegaComponent(service, alertService) {
        this.service = service;
        this.alertService = alertService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* endpointServer */].basePath;
        this.helpAssets = 'assets/images/help';
        this.isAdmin = false;
        this.propiedadesUser = __WEBPACK_IMPORTED_MODULE_2__model_PropiedadesMonitorOmega__["a" /* PropiedadesMonitorOmega */].getNewInstance();
        this.propiedades = __WEBPACK_IMPORTED_MODULE_2__model_PropiedadesMonitorOmega__["a" /* PropiedadesMonitorOmega */].getNewInstance();
    }
    MonitorOmegaComponent.prototype.ngOnInit = function () {
        this.baseUrl = this.service.getEndPoint();
        this.cargarAyuda();
        this.refrescaDatos();
        Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["e" /* startTimer */])();
    };
    MonitorOmegaComponent.prototype.ngOnDestroy = function () {
        Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["b" /* disconnect */])();
    };
    MonitorOmegaComponent.prototype.clearPropiedades = function () {
        var _this = this;
        this.service.getPropiedadesMonitor().subscribe(function (p) {
            _this.propiedades = p;
            _this.propiedadesUser = new __WEBPACK_IMPORTED_MODULE_2__model_PropiedadesMonitorOmega__["a" /* PropiedadesMonitorOmega */](_this.propiedades.intervaloRefrescado, _this.propiedades.umbralAlertas, _this.propiedades.monitorOn, _this.propiedades.correosAlerta, _this.propiedades.correosAlertaError, _this.propiedades.maxCpu);
        });
    };
    MonitorOmegaComponent.prototype.savePropiedades = function () {
        var _this = this;
        this.service.actualizaPropiedadesMonitor(this.propiedadesUser).subscribe(function (p) {
            if (p.status === 200) {
                _this.refrescaDatos();
                _this.alertService.push({ severity: 'info', summary: 'Actualizado', detail: 'Propiedades actualizadas' });
            }
            else {
                _this.alertService.push({ severity: 'error', summary: 'Sin Actualizar', detail: 'Ocurrio un error al actualizar las propiedades' });
            }
        });
        jQuery('#adminMonitor').modal('hide');
    };
    MonitorOmegaComponent.prototype.reordena = function () {
        Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["d" /* resetDTOrder */])();
    };
    MonitorOmegaComponent.prototype.cargarAyuda = function () {
        this.ayudaFecha = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Última Actualizacion', 'Fecha y hora de la última actualización de los datos de Omega');
        this.ayudaAlertas = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Alertas', 'Alertas registradas en la última actualización');
        this.ayudaTiempo = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Tiempo Refrescado', 'Tiempo de intervalo del refrescado de datos de Omega');
        this.ayudaUmbral = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Umbral Tiempo', 'Tiempo que una transacción de Omega debe durar para ser considerada como alerta');
        this.ayudaPropiedades = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Editar Propiedades', 'Permite editar el tiempo de refrescado y el umbral de alertas');
        this.ayudaReordenar = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Reordenar Datos', 'Reordena la tabla mostrando las transacciones de alerta, normales y las ignoradas respectivamente');
        this.ayudaTabla = new __WEBPACK_IMPORTED_MODULE_6__help_model_ImageHelpModel__["a" /* ImageHelp */](this.helpAssets + "/monitor-omega-help_tabla.png", 'Colores usados para identificar las transacciones alertadas (rebasa umbral de alertas), ' +
            'normales e ignoradas (tiempos altos son normales)', 'Ayuda Tabla Omega');
        this.ayudaMonitorOn = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Estado del Monitor', 'Estado en el que se encuentra el monitor (Encendido/Apagado)');
        this.ayudaMaxCpu = new __WEBPACK_IMPORTED_MODULE_5__help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Umbral CPU', 'Porcentaje máximo permitido del CPU antes de ser considerado como alerta');
    };
    MonitorOmegaComponent.prototype.refrescaDatos = function () {
        var _this = this;
        this.service.getReportePantallaOmega().subscribe(function (p) {
            _this.reportePantallaOmega = p;
            if (_this.reportePantallaOmega) {
                Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["c" /* initData */])(_this.reportePantallaOmega);
                Object(__WEBPACK_IMPORTED_MODULE_7__scripts_dataTableFunctions__["a" /* connect */])(_this.baseUrl);
            }
        });
    };
    return MonitorOmegaComponent;
}());
MonitorOmegaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-monitor-omega',
        template: __webpack_require__("./src/app/monitor-omega/monitor-omega/monitor-omega.component.html"),
        styles: [__webpack_require__("./src/app/monitor-omega/monitor-omega/monitor-omega.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__monitor_omega_service__["a" /* MonitorOmegaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__monitor_omega_service__["a" /* MonitorOmegaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__alert_service__["a" /* AlertService */]) === "function" && _b || Object])
], MonitorOmegaComponent);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/monitor-omega.component.js.map

/***/ }),

/***/ "./src/app/monitor-omega/scripts/dataTableFunctions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = connect;
/* harmony export (immutable) */ __webpack_exports__["b"] = disconnect;
/* harmony export (immutable) */ __webpack_exports__["c"] = initData;
/* harmony export (immutable) */ __webpack_exports__["d"] = resetDTOrder;
/* harmony export (immutable) */ __webpack_exports__["e"] = startTimer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_OmegaData__ = __webpack_require__("./src/app/monitor-omega/model/OmegaData.ts");

var stompClient = null;
var data = null;
var timer = null;
// Reinicia las variables globales a NULL
function resetAll() {
    stompClient = null;
    data = null;
    timer = null;
}
// Da formato en dd/MM/yyyy HH:mm:ss
function getDateFormat(date) {
    var formatString = '';
    var dateString = date.toLocaleDateString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    formatString = dateString + ' ' +
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    return formatString;
}
// Cambia el lenguaje de DataTable
function getDTLanguage() {
    return {
        'decimal': '',
        'emptyTable': 'No hay información disponible',
        'info': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        'infoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
        'infoFiltered': '(filtrado de un total de _MAX_ registros)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostrar _MENU_ registros',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar:',
        'zeroRecords': 'No se encontraron registros',
        'paginate': {
            'first': 'Primero',
            'last': 'Último',
            'next': 'Siguiente',
            'previous': 'Anterior'
        },
        'aria': {
            'sortAscending': ': Activar para ordenar la columna de manera ascendente',
            'sortDescending': ': Activar para ordenar la columna de manera descendente'
        }
    };
}
function getDTFormatCics(cicsList) {
    var arrTab = [];
    cicsList.map(function (p) {
        arrTab.push({
            cics: p.jobName,
            totalCpu: getCpuNumber(p.totalCpu),
            alertRaised: p.alertRaised
        });
    });
    return arrTab;
}
// Da el formato correcto a la informacion para el DataTable
function getDTFormatCicsThread(cicsThreadList) {
    var arrTab = [];
    cicsThreadList.map(function (r) {
        arrTab.push({
            cics: r.jobName,
            region: r.region,
            programa: r.planName,
            transaccion: r.transaccion,
            tiempo: r.elapsed.replace(/[a-z||A-Z||*]/g, ''),
            cpu: getCpuNumber(r.cpu),
            estatus: r.status,
            threadType: r.threadType,
            tiempoNum: r.elapsedTime,
            pantallaM2k: r.pantallaM2k
        });
    });
    return arrTab;
}
function getCpuNumber(cpu) {
    if (cpu) {
        var cpuNum = Number.parseFloat(cpu.replace('%', ''));
        if (isNaN(cpuNum)) {
            return -1.0;
        }
        return cpuNum;
    }
    return -1.0;
}
// Realiza la conexion al servidor por medio de SockJS
function connect(baseUrl) {
    var socket = new SockJS(baseUrl + '/pantallaOmega');
    stompClient = Stomp.over(socket);
    stompClient.debug = function () { }; // para inhabilitar la impresion en consola de los datos recibidos
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pantallaOmega', function (pantallaOmega) {
            if (pantallaOmega) {
                reloadData(pantallaOmega);
            }
        });
    });
}
// Desconecta el SockJS y elimina el Interval
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    clearInterval(timer);
    resetAll();
}
// Metodo que llama al servidor para obtener nueva informacion del monitor Omega
function getData() {
    if (stompClient != null) {
        stompClient.send('/app/pantallaOmega', {}, JSON.stringify({ 'message': 'test' }));
    }
}
// Verifica si la informacion obtenida es nueva
function reloadData(pantallaOmega) {
    var jsonPantalla = JSON.parse(pantallaOmega.body);
    if (data.lastUpdate !== jsonPantalla.lastUpdate) {
        data = jsonPantalla;
        if (!jsonPantalla.omegaData) {
            jsonPantalla.omegaData = __WEBPACK_IMPORTED_MODULE_0__model_OmegaData__["a" /* OmegaData */].getNewInstance();
        }
        fillData(jsonPantalla);
    }
}
// Llena la informacion en los campos HTML correspondientes
function fillData(reportePantallaOmega) {
    $('#lastUpdate').html(getDateFormat(new Date(reportePantallaOmega.lastUpdate)));
    $('#alertsCount').html('' + reportePantallaOmega.alertsCount);
    $('#refreshRate').html(reportePantallaOmega.propiedadesMonitorOmega.intervaloRefrescado + ' minutos');
    $('#alertThreshold').html(reportePantallaOmega.propiedadesMonitorOmega.umbralAlertas + ' segundos');
    $('#monitorOn').html(reportePantallaOmega.propiedadesMonitorOmega.monitorOn ? 'Encendido' : 'Apagado');
    $('#maxCpu').html(reportePantallaOmega.propiedadesMonitorOmega.maxCpu + '%');
    $('#omegaTableCics').dataTable().fnDestroy();
    $('#omegaTable').dataTable().fnDestroy();
    reloadTableCics(getDTFormatCics(reportePantallaOmega.omegaData.listCics));
    reloadTableCicsThread(getDTFormatCicsThread(reportePantallaOmega.omegaData.listCicsThread));
}
function reloadTableCics(dtData) {
    $('#omegaTableCics').dataTable({
        'language': getDTLanguage(),
        'paging': false,
        'ordering': true,
        'info': true,
        'searching': false,
        'autoWidth': true,
        'pageLength': 1,
        'data': dtData,
        'columns': [
            { 'data': 'cics' },
            { 'data': 'totalCpu' },
            { 'data': 'alertRaised', 'visible': false, 'searchable': false }
        ],
        'columnDefs': [
            {
                'targets': '_all',
                'createdCell': function (td, cellData, rowData, rowIndex, colIndex) {
                    if (rowData.alertRaised) {
                        $(td).addClass('thread-type-alert');
                    }
                }
            }
        ],
        'order': [[1, 'desc']],
    });
}
// Recarga la informacion del DataTable
function reloadTableCicsThread(dtData) {
    $('#omegaTable').dataTable({
        'language': getDTLanguage(),
        'paging': true,
        'ordering': true,
        'info': true,
        'searching': true,
        'autoWidth': true,
        'pageLength': 10,
        'data': dtData,
        'columns': [
            { 'data': 'cics' },
            { 'data': 'region' },
            { 'data': 'programa' },
            { 'data': 'transaccion' },
            { 'data': 'pantallaM2k' },
            { 'data': 'tiempo', 'orderData': [9] },
            { 'data': 'cpu' },
            { 'data': 'estatus' },
            { 'data': 'threadType', 'visible': false, 'searchable': false },
            { 'data': 'tiempoNum', 'visible': false, 'searchable': false }
        ],
        'columnDefs': [
            {
                'targets': '_all',
                'createdCell': function (td, cellData, rowData, rowIndex, colIndex) {
                    switch (rowData.threadType) {
                        case -1:
                            $(td).addClass('thread-type-ignore');
                            break;
                        case 1:
                            $(td).addClass('thread-type-alert');
                            break;
                    }
                }
            }
        ],
        'order': [[8, 'desc'], [0, 'asc']],
    });
}
// Inicia la informacion del monitor Omega
function initData(reportePantallaOmega) {
    data = reportePantallaOmega;
    fillData(data);
}
// Reinicia el orden del DataTable
function resetDTOrder() {
    $('#omegaTableCics').dataTable().fnSort([[1, 'desc']]);
    $('#omegaTableCics').dataTable().fnDraw();
    $('#omegaTable').dataTable().fnSort([[7, 'desc'], [0, 'asc']]);
    $('#omegaTable').dataTable().fnDraw();
}
// Inicia el intervalo, llama al metodo getData() cada N millisegundos
function startTimer() {
    $(function () {
        timer = setInterval(function () {
            getData();
        }, 15000); // millisegundos
    });
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/dataTableFunctions.js.map

/***/ })

});
//# sourceMappingURL=monitor-omega.module.chunk.js.map