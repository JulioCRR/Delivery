webpackJsonp(["ctg-execution.module"],{

/***/ "./src/app/ctg-execution/ctg-execution.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtgExecutionModule", function() { return CtgExecutionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ctg_execution_ctg_execution_routing__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ctg_execution_pruebasIgtoc_pruebasIgtoc_component__ = __webpack_require__("./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ctg_execution_solicitudAmbiente_solicitudAmbiente_component__ = __webpack_require__("./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ctg_execution_help_ctg_help_component__ = __webpack_require__("./src/app/ctg-execution/help/ctg_help.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ctg_execution_listadoSolicitudes_listadoSolicitudes_component__ = __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ctg_execution_listadoSolicitudes_listadoConPrivilegios_listadoSolicitudesCP_component__ = __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ctg_execution_listadoSolicitudes_listadoSinPrivilegios_listadoSolicitudesSP_component__ = __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ctg_execution_ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ctg_execution_formatters_DatePipeFormatter__ = __webpack_require__("./src/app/ctg-execution/formatters/DatePipeFormatter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ctg_execution_formatters_UpperCasePipe__ = __webpack_require__("./src/app/ctg-execution/formatters/UpperCasePipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var CtgExecutionModule = (function () {
    function CtgExecutionModule() {
    }
    return CtgExecutionModule;
}());
CtgExecutionModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ListboxModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TabViewModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputSwitchModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MessagesModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataListModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SelectButtonModule"],
            __WEBPACK_IMPORTED_MODULE_5__ctg_execution_ctg_execution_routing__["a" /* CtgExecutionRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__ctg_execution_pruebasIgtoc_pruebasIgtoc_component__["a" /* PruebasIgtocComponent */], __WEBPACK_IMPORTED_MODULE_7__ctg_execution_solicitudAmbiente_solicitudAmbiente_component__["a" /* SolicitudAmbienteComponent */], __WEBPACK_IMPORTED_MODULE_9__ctg_execution_listadoSolicitudes_listadoSolicitudes_component__["a" /* ListadoSolicitudesCtgComponent */],
            __WEBPACK_IMPORTED_MODULE_10__ctg_execution_listadoSolicitudes_listadoConPrivilegios_listadoSolicitudesCP_component__["a" /* ListadoSolicitudesCPCtgComponent */], __WEBPACK_IMPORTED_MODULE_11__ctg_execution_listadoSolicitudes_listadoSinPrivilegios_listadoSolicitudesSP_component__["a" /* ListadoSolicitudesSPCtgComponent */], __WEBPACK_IMPORTED_MODULE_13__ctg_execution_formatters_DatePipeFormatter__["a" /* DatePipeFormatter */],
            __WEBPACK_IMPORTED_MODULE_8__ctg_execution_help_ctg_help_component__["a" /* CtgHelpComponent */], __WEBPACK_IMPORTED_MODULE_14__ctg_execution_formatters_UpperCasePipe__["a" /* UpperCasePipeFormatter */]],
        providers: [__WEBPACK_IMPORTED_MODULE_12__ctg_execution_ctg_execution_service__["a" /* CtgExecutionCommonService */]]
    })
], CtgExecutionModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctg-execution.module.js.map

/***/ }),

/***/ "./src/app/ctg-execution/ctg-execution.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtgExecutionRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ctg_execution_pruebasIgtoc_pruebasIgtoc_component__ = __webpack_require__("./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ctg_execution_solicitudAmbiente_solicitudAmbiente_component__ = __webpack_require__("./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ctg_execution_listadoSolicitudes_listadoSolicitudes_component__ = __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//import {AuthGuard} from '../app.auth';
var ctgRoutes = [
    {
        path: 'igtoc_test',
        component: __WEBPACK_IMPORTED_MODULE_2__ctg_execution_pruebasIgtoc_pruebasIgtoc_component__["a" /* PruebasIgtocComponent */],
    },
    {
        path: 'solicitud_ambiente',
        component: __WEBPACK_IMPORTED_MODULE_3__ctg_execution_solicitudAmbiente_solicitudAmbiente_component__["a" /* SolicitudAmbienteComponent */],
    },
    {
        path: 'list_solicitudes',
        component: __WEBPACK_IMPORTED_MODULE_4__ctg_execution_listadoSolicitudes_listadoSolicitudes_component__["a" /* ListadoSolicitudesCtgComponent */],
    }
];
var CtgExecutionRoutingModule = (function () {
    function CtgExecutionRoutingModule() {
    }
    return CtgExecutionRoutingModule;
}());
CtgExecutionRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(ctgRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], CtgExecutionRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctg-execution.routing.js.map

/***/ }),

/***/ "./src/app/ctg-execution/ctg-execution.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResponsableUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtgExecutionCommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_service__ = __webpack_require__("./src/app/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ctg_execution_modelo_RespuestaCtg__ = __webpack_require__("./src/app/ctg-execution/modelo/RespuestaCtg.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ctg_execution_modelo_M2kSolicitudCtg__ = __webpack_require__("./src/app/ctg-execution/modelo/M2kSolicitudCtg.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ResponsableUser = (function () {
    function ResponsableUser(idUsuario, responsable) {
        this.idUsuario = idUsuario;
        this.responsable = responsable;
    }
    return ResponsableUser;
}());

function mapSolicitud(response) {
    var responseJson = response.json();
    var respuesta;
    console.log("PARSEANDO SOLICITUD: ", responseJson);
    if (responseJson) {
        respuesta = new __WEBPACK_IMPORTED_MODULE_7__ctg_execution_modelo_M2kSolicitudCtg__["a" /* M2kSolicitudCtg */](responseJson.id, responseJson.fechaSolicitud, responseJson.horaInicio, responseJson.horaFin, responseJson.usuarioM2k, responseJson.numTotalTransacciones, responseJson.transaccion, responseJson.proyectoAsociado, responseJson.comentarios, parseUser(responseJson.solicitante), parseUser(responseJson.responsableAutorizacion), responseJson.folio, responseJson.fechaCracion, responseJson.estatus, responseJson.programa, responseJson.countEjecuciones);
    }
    return respuesta;
}
function parseSolicitud(responseJson) {
    var respuesta = new __WEBPACK_IMPORTED_MODULE_7__ctg_execution_modelo_M2kSolicitudCtg__["a" /* M2kSolicitudCtg */](responseJson.id, responseJson.fechaSolicitud, responseJson.horaInicio, responseJson.horaFin, responseJson.usuarioM2k, responseJson.numTotalTransacciones, responseJson.transaccion, responseJson.proyectoAsociado, responseJson.comentarios, parseUser(responseJson.solicitante), parseUser(responseJson.responsableAutorizacion), responseJson.folio, responseJson.fechaCracion, responseJson.estatus, responseJson.programa, responseJson.countEjecuciones);
    return respuesta;
}
function mapSolicitudes(response) {
    var solicitudes = response.json();
    var parsedSolicitudes;
    if (solicitudes) {
        parsedSolicitudes = solicitudes.map(parseSolicitud);
    }
    return parsedSolicitudes;
}
function mapRespuesta(response) {
    var respuesta;
    var responseJson = response.json();
    var respCics;
    var respnsXml;
    var respnsProg;
    var mensajeValidacion;
    if (response) {
        if (responseJson.req != null) {
            respCics = responseJson.req.cicsRcString;
        }
        else {
            respCics = 'ERROR_REQUEST';
        }
        if (responseJson.respuestaXML != null) {
            respnsXml = responseJson.respuestaXML;
        }
        else {
            respnsXml = 'SIN RESPUESTA';
        }
        if (responseJson.respuestaCTG) {
            respnsProg = responseJson.respuestaCTG;
        }
        else {
            respnsProg = 'SIN RESPUESTA';
        }
        if (responseJson.mensajeValidacion) {
            mensajeValidacion = responseJson.mensajeValidacion.toUpperCase();
        }
        else {
            mensajeValidacion = 'VALIDACION EXITOSA';
        }
        respuesta = new __WEBPACK_IMPORTED_MODULE_5__ctg_execution_modelo_RespuestaCtg__["a" /* RespuestaCtg */](respCics, respnsXml, responseJson.cadenaEnviadaCTG, respnsProg, mensajeValidacion);
    }
    return respuesta;
}
function mapUser(response) {
    var responseJson = response.json();
    var user;
    if (responseJson) {
        user = new __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__["f" /* User */](responseJson.id, responseJson.nempleado, responseJson.nombre, responseJson.apaterno, responseJson.amaterno, responseJson.correo, responseJson.usuarioRed, responseJson.extension);
    }
    return user;
}
function parseUser(responseJson) {
    var user = new __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__["f" /* User */](responseJson.id, responseJson.nempleado, responseJson.nombre, responseJson.apaterno, responseJson.amaterno, responseJson.correo, responseJson.usuarioRed, responseJson.extension);
    return user;
}
function extractFolios(solicitudes) {
    var folios = [];
    solicitudes.forEach(function (eachObj) {
        folios.push("" + eachObj.id);
    });
    return folios;
}
function mapSimpleResponse(response) {
    var responseJson = response.json();
    return responseJson;
}
var CtgExecutionCommonService = CtgExecutionCommonService_1 = (function () {
    function CtgExecutionCommonService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.notify = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
        this.url = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath;
        this.notifyObservable$ = this.notify.asObservable();
    }
    CtgExecutionCommonService.prototype.notifyOther = function (data) {
        if (data) {
            this.notify.next(data);
        }
    };
    CtgExecutionCommonService.prototype.ejecutarPruebaCtg = function (prueba) {
        var _this = this;
        var url = this.baseUrl + '/ejecutarPruebaCtg';
        var resp$ = this.http.post(url, prueba, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(mapRespuesta).catch(function (error) {
            console.log("FINISH ERROR EJECUTAR PRUEBA CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.obtenerResponsable = function (id) {
        var _this = this;
        var resp$ = this.http.get(this.baseUrl + "/obtenerResponsableAuth/" + id, { headers: this.getHeaders(), withCredentials: true });
        console.log("GETTING RESPONSABLE....");
        return resp$.map(mapUser).catch(function (error) {
            console.log("FINISH ERROR OBTENER RESPONSABLE CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.obtenerPermisos = function (id) {
        var _this = this;
        var resp$ = this.http.get(this.baseUrl + "/consultarPermisos/" + id, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(function (responseJson) { return responseJson.json(); }).catch(function (error) {
            console.log("FINISH ERROR OBTENER PERMISOS to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.guardarSolicitud = function (solicitud) {
        var _this = this;
        var url = this.baseUrl + '/guardarSolicitudCtg';
        var resp$ = this.http.post(url, solicitud, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(mapSolicitud).catch(function (error) {
            console.log("FINISH ERROR GUARDAR SOLICITUD CTG to call service....");
            if (_this.globalService.authService.isLoggedIn && error.status == 409) {
                var errorMessage = void 0;
                if (error._body.includes(CtgExecutionCommonService_1.EXCEPCION_JAVA)) {
                    errorMessage = error._body.substring(CtgExecutionCommonService_1.EXCEPCION_JAVA.length, error._body.length);
                }
                else {
                    errorMessage = error._body;
                }
                _this.globalService.alertService.push({ severity: 'error',
                    summary: 'Error al guardar la solicitud', detail: errorMessage });
            }
            else {
                return _this.globalService.getError(error);
            }
        });
    };
    CtgExecutionCommonService.prototype.listarSolicitudes = function (idUsuario, tipoSolicitud) {
        var _this = this;
        var resp$ = this.http.get(this.baseUrl + "/getSolicitudesByUsuario?id=" + idUsuario + "&tipo=" + tipoSolicitud, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(mapSolicitudes).catch(function (error) {
            console.log("FINISH ERROR LISTAR SOLICITUDES CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.actualizarSolicitudes = function (solicitudes, opcion) {
        var _this = this;
        var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["e" /* URLSearchParams */]();
        urlSearchParams.append('solicitudes', extractFolios(solicitudes));
        urlSearchParams.append('opcion', opcion);
        var resp$ = this.http.post(this.baseUrl + "/actualizarEstatusSol", urlSearchParams, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(mapSimpleResponse).catch(function (error) {
            console.log("FINISH ERROR ACTUALIZAR SOLICITUDES CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.validarCodigoProduccion = function (codigoProduccion, idUsuario) {
        var _this = this;
        var resp$ = this.http.get(this.baseUrl + "/validarCodigoProduccion?codigo=" + codigoProduccion + "&usr=" + idUsuario, { headers: this.getHeaders(), withCredentials: true });
        return resp$.map(mapSolicitud).catch(function (error) {
            console.log("FINISH ERROR VALIDAR CODIGO PRODUCCION CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        headers.append("Pragma", "no-cache"); // HTTP 1.0.
        headers.append("Expires", "0"); // Proxies.
        return headers;
    };
    CtgExecutionCommonService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("Data extraida: ", body);
        return body;
    };
    CtgExecutionCommonService.prototype.getLogoBase64 = function () {
        var _this = this;
        var urlImagen = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + "/assets/json/logoTelcelB64.json";
        return this.http.get(urlImagen).map(this.extractData).catch(function (error) {
            console.log("FINISH ERROR EJECUTAR PRUEBA CTG to call service....");
            return _this.globalService.getError(error);
        });
    };
    CtgExecutionCommonService.prototype.assignResponsable = function (responsable) {
        console.log("INIT ASSIGN RESPONSABLE");
        return this.http.get(this.url + "/asignaResponsable?responsable=" + responsable.responsable + "&idU=" + responsable.idUsuario);
        //return this.http.post(`${this.baseUrl}/user-profile/enviaEmail`,email);
    };
    return CtgExecutionCommonService;
}());
CtgExecutionCommonService.EXCEPCION_JAVA = 'java.lang.Exception:';
CtgExecutionCommonService = CtgExecutionCommonService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object])
], CtgExecutionCommonService);

var CtgExecutionCommonService_1, _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctg-execution.service.js.map

/***/ }),

/***/ "./src/app/ctg-execution/formatters/DatePipeFormatter.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePipeFormatter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DatePipeFormatter = (function () {
    function DatePipeFormatter() {
    }
    DatePipeFormatter.prototype.transform = function (value, format) {
        if (format === void 0) { format = ""; }
        if (value != null) {
            // Try and parse the passed value.
            var momentDate = __WEBPACK_IMPORTED_MODULE_1_moment__(value);
            // If moment didn't understand the value, return it unformatted.
            if (!momentDate.isValid())
                return value;
            // Otherwise, return the date formatted as requested.
            return momentDate.format(format);
        }
        else {
            return '';
        }
    };
    return DatePipeFormatter;
}());
DatePipeFormatter = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'datex'
    })
], DatePipeFormatter);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/DatePipeFormatter.js.map

/***/ }),

/***/ "./src/app/ctg-execution/formatters/UpperCasePipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpperCasePipeFormatter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UpperCasePipeFormatter = (function () {
    function UpperCasePipeFormatter() {
    }
    UpperCasePipeFormatter.prototype.transform = function (val) {
        if (val) {
            return val.toUpperCase();
        }
        else {
            return '';
        }
    };
    return UpperCasePipeFormatter;
}());
UpperCasePipeFormatter = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'upperx' })
], UpperCasePipeFormatter);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/UpperCasePipe.js.map

/***/ }),

/***/ "./src/app/ctg-execution/help/ctg_help.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/ctg-execution/help/ctg_help.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dialog header=\"Ayuda!\" [(visible)]=\"displayFormHelp\" modal=\"modal\" width=\"400\"\r\n         [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"true\">\r\n        \r\n         <h2>Diccionario de Ayuda</h2>\r\n         <span style=\"max-width: 50px;color:blue;\"><i class=\"fa fa-question-circle-o\" aria-hidden=\"true\"></i></span>\r\n         <label>Definición del significado de los campos de la pantalla.</label>   \r\n         <br/>\r\n         <br/>\r\n         <ul>\r\n            <li *ngFor=\"let help of valoresAyuda\" style=\"text-align: left\"><b>{{help.clave}}:</b> {{help.valor}}</li>\r\n         </ul>\r\n\r\n        <p-footer>\r\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-close\" (click)=\"cancelDialog()\" label=\"Salir\" class=\"ui-button-info\"></button>\r\n        </p-footer>\r\n</p-dialog>\r\n<span style=\"color:blue;float: right;\">\r\n<i class=\"fa fa-question-circle-o\" aria-hidden=\"true\"\r\n          style=\"cursor:pointer;\" (click)=\"cargarAyuda()\" pTooltip=\"Ayuda\" tooltipPosition=\"top\"></i>\r\n</span>\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/help/ctg_help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CtgHelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__ = __webpack_require__("./src/app/ctg-execution/help/model/HelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CtgHelpComponent = (function () {
    function CtgHelpComponent(ctgExecutionCommonService) {
        this.ctgExecutionCommonService = ctgExecutionCommonService;
        this.valoresAyuda = [];
        //this.subscription = this.ctgExecutionCommonService.notifyObservable$.subscribe((res) => {            
        //    if (res.hasOwnProperty('option') && res.option === 'setValoresAyuda') {
        //        this.setValoresAyuda(res.value);
        //    }
        //});
    }
    CtgHelpComponent.prototype.ngOnInit = function () {
        this.displayFormHelp = false;
    };
    CtgHelpComponent.prototype.cargarAyuda = function () {
        this.valoresAyuda = [];
        this.valoresAyuda.push(this.ayuda);
        this.displayFormHelp = true;
    };
    CtgHelpComponent.prototype.cancelDialog = function () {
        this.displayFormHelp = false;
    };
    CtgHelpComponent.prototype.setValoresAyuda = function (ayuda) {
        this.valoresAyuda = ayuda;
    };
    return CtgHelpComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__["a" /* Help */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__["a" /* Help */]) === "function" && _a || Object)
], CtgHelpComponent.prototype, "ayuda", void 0);
CtgHelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-ctg-help',
        template: __webpack_require__("./src/app/ctg-execution/help/ctg_help.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/help/ctg_help.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object])
], CtgHelpComponent);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ctg_help.component.js.map

/***/ }),

/***/ "./src/app/ctg-execution/help/model/HelpModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Help; });
var Help = (function () {
    function Help(clave, valor) {
        this.clave = clave;
        this.valor = valor;
    }
    return Help;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/HelpModel.js.map

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.css":
/***/ (function(module, exports) {

module.exports = ".custom-messate-black{\r\n    color: #fff;\r\n    background-color: #122952;\r\n}\r\n\r\n.espacioIzq{\r\n    padding-left: 5px;\r\n}"

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"padding-bottom: 10px;\">\r\n    <p-dataTable [value]=\"solicitudes\" [(selection)]=\"seleccion\" dataKey=\"id\" [paginator]=\"true\" \r\n    [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,20]\">\r\n        <p-header>\r\n            <h2>Solicitudes de Ambiente CTG </h2>\r\n        </p-header>  \r\n          <div *ngIf=\"enableButtons === 'true'\" class=\"row\">  \r\n                <p-column [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\r\n          </div>\r\n\r\n          <p-column field=\"folioGenerado\" header=\"Folio\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"\r\n                    [style]=\"{'width':'180px'}\">\r\n                <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                   <span><a style=\"color:blue;text-decoration: underline;cursor:pointer;\" (click)=\"showSolicitud(sol)\" pTooltip=\"Ver detalle del folio\" tooltipPosition=\"top\">{{sol[col.field]}}</a></span> \r\n              </ng-template>    \r\n            </p-column>\r\n\r\n          <p-column field=\"estatus\" header=\"Estatus\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <div *ngIf=\"sol[col.field] == 'ACT'\" >\r\n                    <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-success\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">ACTIVO</span>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'INA'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-info\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">INACTIVO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'REC'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-error\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-ban\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">RECHAZADO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'CAN'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-warn\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-trash-o\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">CANCELADO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'COM'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all custom-messate-black\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-trash-o\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">COMPLETADO</span>\r\n                    </div>      \r\n                </div>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"fecha_solicitud\" header=\"Fecha Solicitud\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field] | date:'dd/MM/yyyy'}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"hora_inicio\" header=\"Hora Inicio\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field]}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"hora_fin\" header=\"Hora Fin\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field]}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"programa\" header=\"Programa\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>  \r\n          <p-column field=\"solicitante\" header=\"Solicitante\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Buscar\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field].nombre}} {{sol[col.field].apaterno}} {{sol[col.field].amaterno}}</span>\r\n              </ng-template>\r\n          </p-column>  \r\n          <p-footer>\r\n                <div *ngIf=\"enableButtons === 'true'\" class=\"row\">  \r\n                    <label>Folios para Autorizar/Rechazar</label>\r\n                    <button pButton type=\"button\" icon=\"fa-times\" label=\"RECHAZAR\" class=\"ui-button-danger\" style=\"float:right;\" (click)=\"actualizarSolicitudes('RECHAZAR')\"></button>  \r\n                    <button pButton type=\"button\" icon=\"fa-check\" label=\"APROBAR\" class=\"ui-button-success\" style=\"float:right;\" (click)=\"actualizarSolicitudes('APROBAR')\"></button>\r\n                \r\n                    <ul>\r\n                        <li *ngFor=\"let sol of seleccion\" style=\"text-align: left\">Folio: {{sol.folioGenerado}}</li>\r\n                    </ul>\r\n                </div>\r\n          </p-footer>\r\n    </p-dataTable>\r\n</div>\r\n\r\n<div *ngIf=\"enableButtons === 'true'\" class=\"row\">\r\n<p-dialog header=\"Confirmación de la Acción\" [(visible)]=\"displayFormConfirm\" modal=\"modal\" width=\"300\"\r\n         [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"true\">\r\n        \r\n\r\n        <div class=\"row\"><label>¿Esta seguro de {{accion}} lo(s) siguiente(s) folio(s)?</label></div>\r\n        <div class=\"row\">\r\n           <ul>\r\n                  <li *ngFor=\"let sol of seleccion\" style=\"text-align: left\">Folio: {{sol.folioGenerado}}</li>\r\n              </ul>\r\n        </div>\r\n        \r\n        \r\n        <p-footer>\r\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-check\" (click)=\"confirmDialog()\" label=\"Confirmar\" class=\"ui-button-success\"></button>\r\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-times\" (click)=\"cancelDialog()\" label=\"Cancelar\" class=\"ui-button-info\"></button>\r\n        </p-footer>\r\n</p-dialog>\r\n</div>\r\n\r\n<div *ngIf=\"displaySolicitudModal == true\">\r\n<p-dialog header=\"Detalle de la Solicitud\" [(visible)]=\"displaySolicitudModal\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" width=\"350\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>FOLIO</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.folioGenerado}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>FECHA SOLICITUD</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.fecha_solicitud}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>HORA INICIO</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.hora_inicio}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>HORA FIN</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.hora_fin}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>TRANSACCIÓN</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.transaccion}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>PROGRAMA</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.programa}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>No. TRANSACCIONES</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.total_transacciones}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>USUARIO MOBILE</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.usuario}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>ESTATUS</label></div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'ACT'\" >\r\n                <div class=\"ui-grid-col-6\">ACTIVO</div>    \r\n            </div>    \r\n            <div *ngIf=\"selectedSolicitud.estatus == 'INA'\" >\r\n                <div class=\"ui-grid-col-6\">INACTIVO</div>  \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'REC'\" >\r\n                 <div class=\"ui-grid-col-6\">RECHAZADO</div>    \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'CAN'\" >\r\n                 <div class=\"ui-grid-col-6\">CANCELADO</div>       \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'COM'\" >\r\n                 <div class=\"ui-grid-col-6\">COMPLETADO</div>       \r\n            </div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>RESPONSABLE AUTORIZACIÓN</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.responsableAutorizacion.nombre}} {{selectedSolicitud.responsableAutorizacion.apaterno}} {{selectedSolicitud.responsableAutorizacion.amaterno}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>SOLICITANTE</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.solicitante.nombre}} {{selectedSolicitud.solicitante.apaterno}} {{selectedSolicitud.solicitante.amaterno}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>PROYECTO ASOCIADO</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.proyectoAsociado}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>COMENTARIO</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.comentarios}}</div>\r\n        </div>\r\n</p-dialog>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadoSolicitudesCPCtgComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
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




var ListadoSolicitudesCPCtgComponent = (function () {
    function ListadoSolicitudesCPCtgComponent(alertService, ctgExecutionCommonService, globalService) {
        this.alertService = alertService;
        this.ctgExecutionCommonService = ctgExecutionCommonService;
        this.globalService = globalService;
        this.solicitudes = [];
        this.seleccion = [];
    }
    ListadoSolicitudesCPCtgComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.enableButtons = 'false';
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.displayFormConfirm = false;
        this.displaySolicitudModal = false;
        this.cols = [
            { field: 'folioGenerado', header: 'Folio' },
            { field: 'fecha_solicitud', header: 'Fecha Solicitud' },
            { field: 'hora_inicio', header: 'Hora Inicio' },
            { field: 'hora_fin', header: 'Hora Fin' },
            { field: 'transaccion', header: 'Transaccion' },
            { field: 'total_transacciones', header: 'No. de ejecuciones' },
            { field: 'solicitante', header: 'Solicitante' },
            { field: 'estatus', header: 'Estatus' }
        ];
        this.subscription = this.ctgExecutionCommonService.notifyObservable$.subscribe(function (res) {
            if (res.hasOwnProperty('option') && res.option === 'consultarSolicitudesCP') {
                console.log(res.value);
                _this.consultarSolicitudesCP(res.value);
            }
        });
    };
    ListadoSolicitudesCPCtgComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ListadoSolicitudesCPCtgComponent.prototype.getSolicitudesByUsuario = function (tipoSolicitud) {
        var _this = this;
        this.solicitudes = [];
        this.ctgExecutionCommonService.listarSolicitudes(this.usuario.id, tipoSolicitud).subscribe(function (data) { _this.solicitudes = data; console.log("SOLICITUDES -> ON SUSCRIBRE:", data); }, function (err) { console.log(err); }, function () { return console.log('done'); });
    };
    ListadoSolicitudesCPCtgComponent.prototype.actualizarSolicitudes = function (opcion) {
        this.accion = opcion;
        if (this.seleccion.length == 0) {
            this.alertService.push({ severity: 'error', summary: 'Solicitud sin datos', detail: "No se puede procesar una solicitud vacia. Favor de seleccionar al menos una solicitud!" });
        }
        else {
            this.displayFormConfirm = true;
        }
    };
    ListadoSolicitudesCPCtgComponent.prototype.confirmDialog = function () {
        var _this = this;
        //EJECUTAR SOLICITUDES   
        this.ctgExecutionCommonService.actualizarSolicitudes(this.seleccion, this.accion).subscribe(function (data) {
            _this.limpiarArray();
            _this.alertService.push({ severity: 'info', summary: 'Acción Exitosa', detail: "Se ha completado la acción correctamente." });
        }, function (err) { console.log(err); }, function () {
            _this.seleccion = [];
            _this.displayFormConfirm = false;
            console.log('done');
        });
    };
    ListadoSolicitudesCPCtgComponent.prototype.rowTrackBy = function (index, row) { return row.id; };
    ListadoSolicitudesCPCtgComponent.prototype.showSolicitud = function (sol) {
        console.log("SOLICITUD SELECCIONADA: ", sol);
        this.selectedSolicitud = sol;
        this.displaySolicitudModal = true;
    };
    ListadoSolicitudesCPCtgComponent.prototype.limpiarArray = function () {
        var _this = this;
        this.seleccion.forEach(function (element) {
            var index = _this.solicitudes.indexOf(element);
            _this.solicitudes.splice(index, 1);
        });
    };
    ListadoSolicitudesCPCtgComponent.prototype.cancelDialog = function () {
        this.displayFormConfirm = false;
    };
    ListadoSolicitudesCPCtgComponent.prototype.consultarSolicitudesCP = function (tipoSolicitud) {
        console.log("Tipo solicitud: " + tipoSolicitud);
        if (tipoSolicitud == 1) {
            console.log("HABILITANDO BOTONES.");
            this.enableButtons = 'true';
        }
        else {
            console.log("DESHABILITANDO BOTONES.");
            this.enableButtons = 'false';
        }
        this.seleccion = [];
        this.getSolicitudesByUsuario(tipoSolicitud);
    };
    ListadoSolicitudesCPCtgComponent.prototype.changeSort = function (event) {
        if (!event.order) {
            this.sortF = 'year';
        }
        else {
            this.sortF = event.field;
        }
    };
    return ListadoSolicitudesCPCtgComponent;
}());
ListadoSolicitudesCPCtgComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-listadoSolicitudesCP',
        template: __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoConPrivilegios/listadoSolicitudesCP.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _c || Object])
], ListadoSolicitudesCPCtgComponent);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/listadoSolicitudesCP.component.js.map

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.css":
/***/ (function(module, exports) {

module.exports = ".custom-messate-black{\r\n    color: #fff;\r\n    background-color: #122952;\r\n}\r\n\r\n.espacioIzq{\r\n    padding-left: 5px;\r\n}"

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"padding-bottom: 10px;\">\r\n    <p-dataTable [value]=\"solicitudes\" [(selection)]=\"seleccion\" dataKey=\"id\" [paginator]=\"true\" \r\n    [rows]=\"10\" [sortField]=\"sortF\" [sortOrder]=\"sortO\" (onSort)=\"changeSort($event)\"\r\n     [rowsPerPageOptions]=\"[5,10,20]\">\r\n        <p-header>\r\n            <h2>Solicitudes de Ambiente CTG</h2>\r\n        </p-header>\r\n        \r\n        <div *ngIf=\"enableButtons === 'true'\">\r\n            <p-column [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\r\n         </div>   \r\n        <p-column field=\"folioGenerado\" header=\"Folio\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"\r\n                    [style]=\"{'width':'15%'}\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                   <span><a style=\"color:blue;text-decoration: underline;cursor:pointer;\" (click)=\"showSolicitud(sol)\" pTooltip=\"Ver detalle del folio\" tooltipPosition=\"top\">{{sol[col.field]}}</a></span> \r\n              </ng-template>      \r\n        </p-column>\r\n\r\n          <p-column field=\"estatus\" header=\"Estatus\" [sortable]=\"true\" [style]=\"{'width':'13%'}\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <div *ngIf=\"sol[col.field] == 'ACT'\" >\r\n                    <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-success\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">ACTIVO</span>\r\n                    </div>\r\n                </div>    \r\n                <div *ngIf=\"sol[col.field] == 'INA'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-info\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">INACTIVO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'REC'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-error\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-ban\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">RECHAZADO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'CAN'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-warn\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-trash-o\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">CANCELADO</span>\r\n                    </div>      \r\n                </div>\r\n                <div *ngIf=\"sol[col.field] == 'COM'\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all custom-messate-black\"\r\n                        style=\"margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-hourglass\"></span>\r\n                            <span class=\"ui-message-text espacioIzq\">COMPLETADO</span>\r\n                    </div>      \r\n                </div>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"fecha_solicitud\" header=\"Fecha Solicitud\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field] | date:'dd/MM/yyyy'}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"hora_inicio\" header=\"Hora Inicio\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field]}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"hora_fin\" header=\"Hora Fin\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <span>{{sol[col.field]}}</span>\r\n              </ng-template>\r\n          </p-column>\r\n          <p-column field=\"transaccion\" header=\"Transacción\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\r\n          <p-column field=\"programa\" header=\"Programa\" [sortable]=\"true\"\r\n                    [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>            \r\n          <p-column field=\"total_transacciones\" header=\"No. de Transacciones\" [sortable]=\"true\"></p-column>\r\n          <p-column field=\"proyectoAsociado\" header=\"Proyecto Asociado\" [sortable]=\"true\">\r\n              <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <div *ngIf=\"sol[col.field] == null\" >\r\n                    SIN PROYECTO\r\n                </div>\r\n                <div *ngIf=\"sol[col.field] != null\" >\r\n                    <span>{{sol[col.field]}}</span>\r\n                </div>\r\n              </ng-template>\r\n          </p-column>\r\n            <!--LUPA PARA MOSTRAR EL DETALLE DE LA SOLICITUD-->   \r\n        <!--<p-column [style]=\"{'width':'50px'}\" header=\"Detalle\">\r\n            <ng-template let-col let-sol=\"rowData\" pTemplate=\"body\">\r\n                <div style=\"text-align:center\">\r\n                    <i class=\"fa fa-search\" (click)=\"showSolicitud(sol)\" style=\"cursor:pointer;\" pTooltip=\"Ver detalle del folio\" tooltipPosition=\"top\"></i>   \r\n                </div>\r\n            </ng-template>    \r\n        </p-column> -->\r\n        <!-- FIN -->\r\n        \r\n            <p-footer>\r\n                <div *ngIf=\"enableButtons === 'true'\" class=\"row\">\r\n                    <label>Folios para Cancelar</label>\r\n                        <button pButton type=\"button\" icon=\"fa-times\" label=\"CANCELAR\" class=\"ui-button-warning\" style=\"float:right;\" (click)=\"actualizarSolicitudes('CANCELAR')\"></button>\r\n                    <ul>\r\n                        <li *ngFor=\"let sol of seleccion\" style=\"text-align: left\">Folio: {{sol.folioGenerado}}</li>\r\n                    </ul>\r\n                </div>\r\n            </p-footer>  \r\n    </p-dataTable>\r\n </div>\r\n\r\n <div *ngIf=\"enableButtons === 'true'\">\r\n <p-dialog header=\"Confirmación de la Acción\" [(visible)]=\"displayFormConfirm\" modal=\"modal\" width=\"300\"\r\n         [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"true\">\r\n        \r\n\r\n        <div class=\"row\"><label>¿Esta seguro de {{accion}} lo(s) siguiente(s) folio(s)?</label></div>\r\n        <div class=\"row\">\r\n           <ul>\r\n                  <li *ngFor=\"let sol of seleccion\" style=\"text-align: left\">Folio: {{sol.folioGenerado}}</li>\r\n              </ul>\r\n        </div>\r\n        \r\n        \r\n        <p-footer>\r\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-check\" (click)=\"confirmDialog()\" label=\"Confirmar\" class=\"ui-button-success\"></button>\r\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-times\" (click)=\"cancelDialog()\" label=\"Cancelar\" class=\"ui-button-info\"></button>\r\n        </p-footer>\r\n</p-dialog>\r\n</div> \r\n\r\n<div *ngIf=\"displaySolicitudModal == true\">\r\n<p-dialog header=\"Detalle de la Solicitud\" [(visible)]=\"displaySolicitudModal\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" width=\"350\">\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Folio</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.folioGenerado}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Fecha Solicitud</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.fecha_solicitud}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Hora Inicio</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.hora_inicio}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Hora Fin</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.hora_fin}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Transacción</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.transaccion}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Programa</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.programa}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>No. Transacciones</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.total_transacciones}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Usuario Mobile</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.usuario}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Estatus</label></div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'ACT'\" >\r\n                <div class=\"ui-grid-col-6\">ACTIVO</div>    \r\n            </div>    \r\n            <div *ngIf=\"selectedSolicitud.estatus == 'INA'\" >\r\n                <div class=\"ui-grid-col-6\">INACTIVO</div>  \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'REC'\" >\r\n                 <div class=\"ui-grid-col-6\">RECHAZADO</div>    \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'CAN'\" >\r\n                 <div class=\"ui-grid-col-6\">CANCELADO</div>       \r\n            </div>\r\n            <div *ngIf=\"selectedSolicitud.estatus == 'COM'\" >\r\n                 <div class=\"ui-grid-col-6\">COMPLETADO</div>       \r\n            </div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Responsable Autorización</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.responsableAutorizacion.nombre}} {{selectedSolicitud.responsableAutorizacion.apaterno}} {{selectedSolicitud.responsableAutorizacion.amaterno}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Proyecto Asociado</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.proyectoAsociado}}</div>\r\n        </div>\r\n        <div class=\"ui-grid-row\">\r\n            <div class=\"ui-grid-col-6\"><label>Comentarios</label></div>\r\n            <div class=\"ui-grid-col-6\">{{selectedSolicitud.comentarios}}</div>\r\n        </div>\r\n</p-dialog>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadoSolicitudesSPCtgComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
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




var ListadoSolicitudesSPCtgComponent = (function () {
    function ListadoSolicitudesSPCtgComponent(alertService, ctgExecutionCommonService, globalService) {
        this.alertService = alertService;
        this.ctgExecutionCommonService = ctgExecutionCommonService;
        this.globalService = globalService;
        this.solicitudes = [];
        this.seleccion = [];
    }
    ListadoSolicitudesSPCtgComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.enableButtons = 'false';
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.displayFormConfirm = false;
        this.displaySolicitudModal = false;
        this.cols = [
            { field: 'folioGenerado', header: 'Folio' },
            { field: 'fecha_solicitud', header: 'Fecha Solicitud' },
            { field: 'hora_inicio', header: 'Hora Inicio' },
            { field: 'hora_fin', header: 'Hora Fin' },
            { field: 'transaccion', header: 'Transaccion' },
            { field: 'total_transacciones', header: 'No. de ejecuciones' },
            { field: 'solicitante', header: 'Solicitante' },
            { field: 'estatus', header: 'Estatus' }
        ];
        this.subscription = this.ctgExecutionCommonService.notifyObservable$.subscribe(function (res) {
            if (res.hasOwnProperty('option') && res.option === 'consultarSolicitudesSP') {
                console.log(res.value);
                _this.consultarSolicitudesSP(res.value);
            }
        });
    };
    ListadoSolicitudesSPCtgComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ListadoSolicitudesSPCtgComponent.prototype.consultarSolicitudesSP = function (tipoSolicitud) {
        if (tipoSolicitud == 1) {
            this.enableButtons = 'true';
        }
        else {
            this.enableButtons = 'false';
        }
        this.seleccion = [];
        this.getSolicitudesByUsuario(tipoSolicitud);
    };
    ListadoSolicitudesSPCtgComponent.prototype.showSolicitud = function (sol) {
        console.log("SOLICITUD SELECCIONADA: ", sol);
        this.selectedSolicitud = sol;
        this.displaySolicitudModal = true;
    };
    ListadoSolicitudesSPCtgComponent.prototype.getSolicitudesByUsuario = function (tipoSolicitud) {
        var _this = this;
        this.solicitudes = [];
        this.ctgExecutionCommonService.listarSolicitudes(this.usuario.id, tipoSolicitud).subscribe(function (data) {
            console.log("SOLICITUDES: ", data);
            _this.solicitudes = data;
        }, function (err) { console.log(err); }, function () { return console.log('done'); });
    };
    ListadoSolicitudesSPCtgComponent.prototype.actualizarSolicitudes = function (opcion) {
        this.accion = opcion;
        if (this.seleccion.length == 0) {
            this.alertService.push({ severity: 'error', summary: 'Solicitud sin datos', detail: "No se puede procesar una solicitud vacia. Favor de seleccionar al menos una solicitud!" });
        }
        else {
            this.displayFormConfirm = true;
        }
    };
    ListadoSolicitudesSPCtgComponent.prototype.confirmDialog = function () {
        var _this = this;
        //EJECUTAR SOLICITUDES   
        this.ctgExecutionCommonService.actualizarSolicitudes(this.seleccion, this.accion).subscribe(function (data) {
            _this.limpiarArray();
            _this.alertService.push({ severity: 'info', summary: 'Acción Exitosa', detail: "Se ha completado la acción correctamente." });
        }, function (err) { console.log(err); }, function () {
            _this.seleccion = [];
            _this.displayFormConfirm = false;
            console.log('done');
        });
    };
    ListadoSolicitudesSPCtgComponent.prototype.limpiarArray = function () {
        var _this = this;
        this.seleccion.forEach(function (element) {
            var index = _this.solicitudes.indexOf(element);
            _this.solicitudes.splice(index, 1);
        });
    };
    ListadoSolicitudesSPCtgComponent.prototype.cancelDialog = function () {
        this.displayFormConfirm = false;
    };
    ListadoSolicitudesSPCtgComponent.prototype.changeSort = function (event) {
        if (!event.order) {
            this.sortF = 'year';
        }
        else {
            this.sortF = event.field;
        }
    };
    return ListadoSolicitudesSPCtgComponent;
}());
ListadoSolicitudesSPCtgComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-listadoSolicitudesSP',
        template: __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSinPrivilegios/listadoSolicitudesSP.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _c || Object])
], ListadoSolicitudesSPCtgComponent);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/listadoSolicitudesSP.component.js.map

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container theme-showcase\" role=\"main\">\r\n\r\n<div class=\"page-header\">\r\n  <h1>Mis Solicitudes</h1>\r\n  <p>En esta sección se muestran las solicitudes de Ambiente generadas por el usuario, si es JEFE o SUPERVISOR, podrá ACEPTAR O RECHAZAR solicitudes de sus equipos de trabajo. \r\n  </p>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div  class=\"col-md-6\" style=\"padding-bottom: 20px;\">    \r\n        <label>Seleccione el tipo de solicitudes.</label><br/>\r\n        <p-selectButton [options]=\"opcionesSolicitud\" [(ngModel)]=\"selectOption\"\r\n        (onChange)=\"consultarSolicitudes()\"></p-selectButton>\r\n    </div>     \r\n</div>\r\n\r\n<div *ngIf=\"permiso == 'CP'\" >\r\n    <app-listadoSolicitudesCP></app-listadoSolicitudesCP>\r\n</div>    \r\n<div *ngIf=\"permiso == 'SP'\" >\r\n     <app-listadoSolicitudesSP></app-listadoSolicitudesSP>     \r\n</div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadoSolicitudesCtgComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
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




var ListadoSolicitudesCtgComponent = (function () {
    function ListadoSolicitudesCtgComponent(alertService, ctgExecutionCommonService, globalService) {
        this.alertService = alertService;
        this.ctgExecutionCommonService = ctgExecutionCommonService;
        this.globalService = globalService;
    }
    ListadoSolicitudesCtgComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.opcionesSolicitud = [
            { label: 'INACTIVAS', value: 1 },
            { label: 'ACTIVAS', value: 2 },
            { label: 'RECHAZADAS', value: 3 },
            { label: 'CANCELADAS', value: 4 },
            { label: 'COMPLETADAS', value: 5 },
        ];
        this.consultarPermisos();
    };
    ListadoSolicitudesCtgComponent.prototype.consultarPermisos = function () {
        var _this = this;
        this.ctgExecutionCommonService.obtenerPermisos(this.usuario.id).subscribe(function (data) {
            _this.permiso = data.permiso;
        }, function (err) { console.log(err); }, function () { console.log('done'); });
    };
    ListadoSolicitudesCtgComponent.prototype.consultarSolicitudes = function () {
        if (this.permiso == 'CP') {
            this.ctgExecutionCommonService.notifyOther({ option: 'consultarSolicitudesCP', value: this.selectOption });
        }
        else {
            this.ctgExecutionCommonService.notifyOther({ option: 'consultarSolicitudesSP', value: this.selectOption });
        }
    };
    return ListadoSolicitudesCtgComponent;
}());
ListadoSolicitudesCtgComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-listadoSolicitudes',
        template: __webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/listadoSolicitudes/listadoSolicitudes.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _c || Object])
], ListadoSolicitudesCtgComponent);

var _a, _b, _c;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/listadoSolicitudes.component.js.map

/***/ }),

/***/ "./src/app/ctg-execution/modelo/M2kSolicitudCtg.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M2kSolicitudCtg; });
var M2kSolicitudCtg = (function () {
    function M2kSolicitudCtg(id, fecha_solicitud, hora_inicio, hora_fin, usuario, total_transacciones, transaccion, proyectoAsociado, comentarios, solicitante, responsableAutorizacion, folioGenerado, fechaHoraGeneracion, estatus, programa, countEjecuciones) {
        this.id = id;
        this.fecha_solicitud = fecha_solicitud;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.usuario = usuario;
        this.total_transacciones = total_transacciones;
        this.transaccion = transaccion;
        this.proyectoAsociado = proyectoAsociado;
        this.comentarios = comentarios;
        this.solicitante = solicitante;
        this.responsableAutorizacion = responsableAutorizacion;
        this.folioGenerado = folioGenerado;
        this.fechaHoraGeneracion = fechaHoraGeneracion;
        this.estatus = estatus;
        this.programa = programa;
        this.countEjecuciones = countEjecuciones;
    }
    return M2kSolicitudCtg;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/M2kSolicitudCtg.js.map

/***/ }),

/***/ "./src/app/ctg-execution/modelo/PruebaCtg.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PruebaCtg; });
var PruebaCtg = (function () {
    function PruebaCtg(usuario, password, programa, region, transaccion, cadena, ambiente, codigoProduccion, fhEjecucion, idUsuarioEjecucion, idSolicitudEjecucion) {
        this.usuario = usuario;
        this.password = password;
        this.programa = programa;
        this.region = region;
        this.transaccion = transaccion;
        this.cadena = cadena;
        this.ambiente = ambiente;
        this.codigoProduccion = codigoProduccion;
        this.fhEjecucion = fhEjecucion;
        this.idUsuarioEjecucion = idUsuarioEjecucion;
        this.idSolicitudEjecucion = idSolicitudEjecucion;
    }
    return PruebaCtg;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PruebaCtg.js.map

/***/ }),

/***/ "./src/app/ctg-execution/modelo/RespuestaCtg.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RespuestaCtg; });
var RespuestaCtg = (function () {
    function RespuestaCtg(respuestaCTG, respuestaXML, cadenaEnviadaCTG, respuestaPrograma, mensajeValidacion) {
        this.respuestaCTG = respuestaCTG;
        this.respuestaXML = respuestaXML;
        this.cadenaEnviadaCTG = cadenaEnviadaCTG;
        this.respuestaPrograma = respuestaPrograma;
        this.mensajeValidacion = mensajeValidacion;
    }
    return RespuestaCtg;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/RespuestaCtg.js.map

/***/ }),

/***/ "./src/app/ctg-execution/modelo/SolM2kSolicitudCtg.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolM2kSolicitudCtg; });
var SolM2kSolicitudCtg = (function () {
    function SolM2kSolicitudCtg(id, fecha_solicitud, hora_inicio, hora_fin, usuario, total_transacciones, transaccion, proyectoAsociado, comentarios, solicitante, responsableAutorizacion, folioGenerado, fechaHoraGeneracion, estatus, ambiente, programa) {
        this.id = id;
        this.fecha_solicitud = fecha_solicitud;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.usuario = usuario;
        this.total_transacciones = total_transacciones;
        this.transaccion = transaccion;
        this.proyectoAsociado = proyectoAsociado;
        this.comentarios = comentarios;
        this.solicitante = solicitante;
        this.responsableAutorizacion = responsableAutorizacion;
        this.folioGenerado = folioGenerado;
        this.fechaHoraGeneracion = fechaHoraGeneracion;
        this.estatus = estatus;
        this.ambiente = ambiente;
        this.programa = programa;
    }
    return SolM2kSolicitudCtg;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/SolM2kSolicitudCtg.js.map

/***/ }),

/***/ "./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.css":
/***/ (function(module, exports) {

module.exports = ".noPadding {\r\n    padding: 0px;\r\n}\r\n\r\n.danger_marker {\r\n    color:red;\r\n    font-weight: bold;\r\n}\r\n\r\np-dropdown#codigoProdInput {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: -webkit-fit-content;\r\n  width: -moz-fit-content;\r\n  width: fit-content;\r\n}\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dialog header=\"Código Acceso a Producción\" [(visible)]=\"displayConfirmProd\" modal=\"modal\" width=\"300\" height=\"200\" [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"false\">\r\n        <form class=\"form-horizontal\" (ngSubmit)=\"validarEnvProd()\" style=\"overflow:hidden;\">\r\n            <div style=\"padding-bottom: 15px;\">\r\n                <label class=\"control-label\" for=\"codigoProdInput\">Seleccione el Código</label>\r\n\t\t\t\t<p-dropdown id=\"codigoProdInput\" name=\"codigoProdInput\" [options]=\"foliosCTG\" [(ngModel)]=\"codigoProdInput\" placeholder=\"{{mensajeFolios}}\" class=\"form-control\" [autoWidth]=\"false\" required ></p-dropdown>\r\n            </div>\r\n\r\n            <p-footer>\r\n                <button type=\"submit\" pButton icon=\"fa-check\" label=\"Acceder\" class=\"ui-button-success\"></button>\r\n                <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancelDialog()\" label=\"Cancelar\" class=\"ui-button-info\"></button>\r\n            </p-footer>\r\n        </form>\r\n</p-dialog>\r\n\r\n<div class=\"container theme-showcase\" role=\"main\">\r\n\r\n<div class=\"page-header\">\r\n  <h1>Pantalla para ejecución de IGTOCS</h1>\r\n  <p>Para el caso del ambiente de <b>Producción</b> usted deberá realziar una solicitud de ambiente de producción y posteriormente ingresar al modulo con el CODIGO de Producción que le ha sido asignado.\r\n  </p>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\" style=\"text-align: right;padding-bottom: 10px;\">\r\n            Campos marcados con <span class=\"danger_marker\">*</span> son obligatorios.\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-md-3\" style=\"padding-bottom: 10px;\">\r\n            <div style=\"padding-bottom: 10px;\">\r\n                <h3>Ambiente de Prueba</h3>\r\n\r\n                <div *ngIf=\"isProdEnvEnabled == true\" >\r\n                    <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-success\"\r\n                        style=\"font-size: 25px;margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text\">{{enviromentSelected}}</span>\r\n                    </div>\r\n                    <div *ngIf=\"solicitudValidada\">\r\n                        <h2><label>Folio:  </label>{{solicitudValidada.folioGenerado}}</h2>\r\n                    </div>\r\n                    <div *ngIf=\"solicitudValidada\">\r\n                        <h2><label>Transacciones Solicitadas:  </label>{{solicitudValidada.total_transacciones}}</h2>\r\n                    </div>\r\n                    <div *ngIf=\"solicitudValidada\">\r\n                        <h2><label>Transacciones Ejecutadas:  </label>{{solicitudValidada.countEjecuciones}}</h2>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"isProdEnvEnabled == false\" >\r\n                    <div  aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-info\"\r\n                        style=\"font-size: 25px;margin:0;\">\r\n                            <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                            <span class=\"ui-message-text\">{{enviromentSelected}}</span>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <label>Seleccione la region de ejecución.</label><br/>\r\n                    <p-selectButton [options]=\"opcionesRegion\" [(ngModel)]=\"selectOption\"\r\n                    (onChange)=\"cambioRegion()\"></p-selectButton>\r\n                </div>\r\n            </div>\r\n\r\n            <label>Cambiar Ambiente de Ejecución</label>\r\n            <app-ctg-help [ayuda]=\"ayudaCambioAmbiente\"></app-ctg-help>\r\n            <br/>\r\n            <p-inputSwitch onLabel=\"Producción\" offLabel=\"Desarrollo\" [(ngModel)]=\"prodEnvChecked\"\r\n            (onChange)=\"handleChange($event)\"></p-inputSwitch>\r\n            <br/>\r\n            <label>CICS de Ejecución en Desarrollo</label>\r\n            <app-ctg-help [ayuda]=\"ayudaCicsDesarrollo\"></app-ctg-help>\r\n            <p-selectButton [options]=\"opcionesCics\" [(ngModel)]=\"selectCics\"\r\n                    (onChange)=\"cambioCics()\"></p-selectButton>\r\n            <br/>\r\n        </div>\r\n\r\n        <form [formGroup]=\"igtocForm\" id=\"formPruebaIgtoc\" class=\"form-horizontal\" (ngSubmit)=\"executeIgtoc()\">\r\n\r\n                <div class=\"col-md-6\" style=\"padding-bottom: 10px;\">\r\n                    <p-panel header=\"Información del Programa\">\r\n                        <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.programaInput}\">\r\n                            <label class=\"control-label\" for=\"programaInput\">PROGRAMA</label>\r\n                            <span class=\"danger_marker\">*</span>\r\n                            <app-ctg-help [ayuda]=\"ayudaProg\"></app-ctg-help>\r\n                            <input type=\"text\" class=\"form-control\"\r\n                            [value]=\"igtocForm.get('programaInput').value | upperx\" id=\"programaInput\" formControlName=\"programaInput\" placeholder=\"IGTOC..\"\r\n                            [disabled]=\"prodEnvChecked\">\r\n                            <!-- Mensaje de Error de Validación-->\r\n                            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.programaInput\">{{formErrors.programaInput}}</div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.transaccionInput}\">\r\n                            <label class=\"control-label\" for=\"transaccionInput\">TRANSACCIÓN</label>\r\n                            <span class=\"danger_marker\">*</span>\r\n                            <app-ctg-help [ayuda]=\"ayudaTrans\"></app-ctg-help>\r\n                            <input type=\"text\" class=\"form-control\"\r\n                                required\r\n                            [value]=\"igtocForm.get('transaccionInput').value | upperx\" id=\"transaccionInput\" formControlName=\"transaccionInput\" placeholder=\"I*..\"\r\n                            [disabled]=\"prodEnvChecked\">\r\n                            <!-- Mensaje de Error de Validación-->\r\n                            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.transaccionInput\">{{formErrors.transaccionInput}}</div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.cadenaIgtocInput}\">\r\n                            <label class=\"control-label\" for=\"cadenaIgtocInput\">CADENA IGTOC</label>\r\n                            <span class=\"danger_marker\">*</span>\r\n                            <app-ctg-help [ayuda]=\"ayudaCadenaIgtoc\"></app-ctg-help>\r\n                            <!--<input type=\"text\" class=\"form-control\"\r\n                                required\r\n                            [(ngModel)]=\"cadenaIgtocInput\" name=\"cadenaIgtocInput\">-->\r\n                             <textarea pInputTextarea [value]=\"igtocForm.get('cadenaIgtocInput').value | upperx\" formControlName=\"cadenaIgtocInput\"\r\n                                [rows]=\"3\" class=\"form-control\" autoResize=\"autoResize\"></textarea>\r\n                            <!-- Mensaje de Error de Validación-->\r\n                            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.cadenaIgtocInput\">{{formErrors.cadenaIgtocInput}}</div>\r\n                        </div>\r\n                    </p-panel>\r\n                </div>\r\n\r\n                <div class=\"col-md-3\" style=\"padding-bottom: 10px;\">\r\n                    <p-panel header=\"Información de Seguridad\">\r\n                        <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.usuarioInput}\">\r\n                            <label class=\"control-label\" for=\"usuarioInput\">USUARIO MOBILE</label>\r\n                            <span class=\"danger_marker\">*</span>\r\n                            <app-ctg-help [ayuda]=\"ayudaUsr\"></app-ctg-help>\r\n                            <input type=\"text\" class=\"form-control\"\r\n                                required\r\n                            [value]=\"igtocForm.get('usuarioInput').value | upperx\" id=\"usuarioInput\" formControlName=\"usuarioInput\" placeholder=\"Vi...\"\r\n                            [disabled]=\"prodEnvChecked\">\r\n                            <!-- Mensaje de Error de Validación-->\r\n                            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioInput\">{{formErrors.usuarioInput}}</div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.pwdInput}\">\r\n                            <label class=\"control-label\" for=\"pwdInput\">PASSWORD</label>\r\n                            <span class=\"danger_marker\">*</span>\r\n                            <input type=\"password\" class=\"form-control\"\r\n                                required\r\n                            formControlName=\"pwdInput\">\r\n                            <!-- Mensaje de Error de Validación-->\r\n                            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.pwdInput\">{{formErrors.pwdInput}}</div>\r\n                        </div>\r\n                    </p-panel>\r\n                    <div style=\"padding-top: 10px;\">\r\n                    <button pButton type=\"submit\" label=\"Ejecutar\" icon=\"fa-share\" style=\"float:right;\" [disabled]=\"!igtocForm.valid || isExecDisabled\"></button>\r\n                    </div>\r\n                </div>\r\n\r\n        </form>\r\n\r\n</div>\r\n\r\n<div *ngIf=\"respCtg\" class=\"row\">\r\n\r\n    <div class=\"col-md-12\" style=\"padding-bottom: 10px;\">\r\n        <p-panel>\r\n\r\n            <p-header>\r\n                <div class=\"ui-helper-clearfix\">\r\n                    <span class=\"ui-panel-title\" style=\"font-size:16px;display:inline-block;margin-top:2px\">Información de Respuesta del IGTOC</span>\r\n\r\n                    <button pButton type=\"button\" icon=\"fa-floppy-o\" label=\"Guardar\" class=\"ui-button-success\" style=\"float:right;\" (click)=\"download()\"></button>\r\n                    <button pButton type=\"button\" icon=\"fa-refresh\" label=\"Limpiar\" class=\"ui-button-info\" style=\"float:right;\" (click)=\"limpiar()\"></button>\r\n                </div>\r\n            </p-header>\r\n\r\n            <div id=\"infoEnviadaCtg\">\r\n                <label class=\"control-label\" for=\"infoEnviadaCtgOutput\">INFORMACIÓN ENVIADA AL CTG</label>\r\n                <pre>{{respCtg.cadenaEnviadaCTG}}</pre>\r\n            </div>\r\n            <div id=\"respPrograma\">\r\n                <label class=\"control-label\" for=\"respProgramaOutput\">RESPUESTA DEL PROGRAMA</label>\r\n                <pre>{{respCtg.respuestaPrograma}}</pre>\r\n            </div>\r\n            <div id=\"respXmlCtg\">\r\n                <label class=\"control-label\" for=\"respXmlOutput\">RESPUESTA XML</label>\r\n                <pre>{{respCtg.respuestaXML}}</pre>\r\n            </div>\r\n            <div id=\"codigoCtg\">\r\n                <label class=\"control-label\" for=\"respCtgOutput\">CÓDIGO CTG</label>\r\n\t\t\t\t<pre>{{respCtg.respuestaCTG}}</pre>\r\n            </div>\r\n\t\t\t<div id=\"mensajeValidacion\">\r\n                <label class=\"control-label\" for=\"mensajeValidacionOutput\">MENSAJE VALIDACION</label>\r\n                <pre>{{respCtg.mensajeValidacion}}</pre>\r\n            </div>\r\n\r\n        </p-panel>\r\n    </div>\r\n\r\n</div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PruebasIgtocComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modelo_PruebaCtg__ = __webpack_require__("./src/app/ctg-execution/modelo/PruebaCtg.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__ = __webpack_require__("./src/app/ctg-execution/help/model/HelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_service__ = __webpack_require__("./src/app/global.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PruebasIgtocComponent = (function () {
    function PruebasIgtocComponent(alertService, ctgService, fb, globalService) {
        var _this = this;
        this.alertService = alertService;
        this.ctgService = ctgService;
        this.globalService = globalService;
        this.prodEnvChecked = false;
        this.displayConfirmProd = false;
        this.isProdEnvEnabled = false;
        this.mensajeFolios = 'NO TIENE SOLICITUDES ACTIVAS';
        this.isExecDisabled = false;
        this.formErrors = {
            'programaInput': '',
            'transaccionInput': '',
            'cadenaIgtocInput': '',
            'usuarioInput': '',
            'pwdInput': ''
        };
        this.validationMessages = {
            'programaInput': {
                'required': 'El PROGRAMA es REQUERIDO.',
                'minlength': 'El PROGRAMA debe tener al menos 7 caracteres.',
                'maxlength': 'El PROGRAMA debe tener máximo 7 caracteres.'
            }, 'transaccionInput': {
                'required': 'La TRANSACCIÓN es REQUERIDA.',
                'minlength': 'La TRANSACCIÓN debe tener al menos 4 caracteres.',
                'maxlength': 'La TRANSACCIÓN debe tener máximo 4 caracteres.'
            },
            'cadenaIgtocInput': {
                'required': 'La cadena para ejecutar el IGTOC es REQUERIDA.',
                'maxlength': 'La cadena a enviar debe tener máximo 2000 caracteres.'
            },
            'usuarioInput': {
                'required': 'El usuario MOBILE es REQUERIDO.',
                'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
                'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.'
            },
            'pwdInput': {
                'required': 'El password es REQUERIDO.'
            },
        };
        this.igtocForm = fb.group({
            'programaInput': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(7), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(7)])],
            'transaccionInput': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(4)])],
            'cadenaIgtocInput': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(2000)])],
            'usuarioInput': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(1), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(10)])],
            'pwdInput': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.cargarAyuda();
        this.igtocForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    }
    PruebasIgtocComponent.prototype.ngOnInit = function () {
        this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.ctgService.obtenerResponsable(this.usuario.id).subscribe(function (data) {
            console.log(data);
        }, function (err) { console.log(err); }, function () { console.log("Responsable obtenido [done]"); });
        if (this.prodEnvChecked == true) {
            this.enviromentSelected = "Producción";
        }
        else {
            this.enviromentSelected = "Desarrollo";
        }
        this.opcionesRegion = [
            { label: 'R01', value: 1 },
            { label: 'R02', value: 2 },
            { label: 'R03', value: 3 },
            { label: 'R04', value: 4 },
            { label: 'R05', value: 5 },
            { label: 'R06', value: 6 },
            { label: 'R07', value: 7 },
            { label: 'R08', value: 8 },
            { label: 'R09', value: 9 },
        ];
        this.selectOption = 1;
        this.opcionesCics = [
            { label: 'DEVL', value: 1 },
            { label: 'CICSDSB9', value: 2 }
        ];
        this.selectCics = 1;
    };
    PruebasIgtocComponent.prototype.checkSession = function () {
    };
    PruebasIgtocComponent.prototype.cargarAyuda = function () {
        this.ayudaUsr = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('Usuario Mobile', 'Usuario registrado en M2K con autoridad para ejecutar el componente en Producción');
        this.ayudaCambioAmbiente = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('AMBIENTE', 'Existen dos ambientes: DESARROLLO y PRODUCCIÓN y ambos se ejecutan por medio de la región seleccionada. Para poder acceder al ambiente PRODUCTIVO es requerido un folio en el formato CTGPRODXXX autorizado por su SUPERVISOR/RESPONSABLE.');
        this.ayudaTrans = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('Transacción', 'Transacción M2K asignada al componente, p.ej. I*TC');
        this.ayudaProg = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('Programa', 'Nombre del programa en M2K, p.ej. IGTOC65 ');
        this.ayudaCadenaIgtoc = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('Cadena IGTOC', 'Cadena que contiene un formato especifico definido en el PROGRAMA IGTOCXX que desea probar.');
        this.ayudaCicsDesarrollo = new __WEBPACK_IMPORTED_MODULE_5__help_model_HelpModel__["a" /* Help */]('Cics Desarrollo', 'Existen dos CICS en el ambiente de desarrollo: DEVL y CICSDSB9, en ambos ambientes se permite ejecutar programas tipo IGTOC.');
    };
    PruebasIgtocComponent.prototype.onValueChanged = function (data) {
        if (!this.igtocForm) {
            return;
        }
        var form = this.igtocForm;
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
    PruebasIgtocComponent.prototype.cambioRegion = function () {
    };
    PruebasIgtocComponent.prototype.cambioCics = function () {
    };
    PruebasIgtocComponent.prototype.handleChange = function (e) {
        var isChecked = e.checked;
        this.solicitudValidada = null;
        if (isChecked == true) {
            this.showDialog();
            this.prodEnvChecked = true;
            this.solicitudesActivas();
        }
        else {
            this.prodEnvChecked = false;
            this.isProdEnvEnabled = false;
            this.enviromentSelected = "Desarrollo";
        }
        this.limpiar();
    };
    PruebasIgtocComponent.prototype.executeIgtoc = function () {
        var _this = this;
        this.isExecDisabled = true;
        var ambiente;
        var idSolicitud;
        if (this.isProdEnvEnabled) {
            ambiente = 'P';
            idSolicitud = this.solicitudValidada.id;
        }
        else {
            //ambiente = 'D';
            if (this.selectCics == 1) {
                ambiente = 'D'; //DEVL
            }
            else {
                ambiente = 'C'; //CICSDSB9
            }
            idSolicitud = 0;
            this.codigoProdInput = '';
        }
        var prueba = new __WEBPACK_IMPORTED_MODULE_3__modelo_PruebaCtg__["a" /* PruebaCtg */](this.igtocForm.get('usuarioInput').value.toUpperCase(), this.igtocForm.get('pwdInput').value, this.igtocForm.get('programaInput').value.toUpperCase(), 'R0' + this.selectOption, this.igtocForm.get('transaccionInput').value.toUpperCase(), this.igtocForm.get('cadenaIgtocInput').value.toUpperCase(), ambiente, this.codigoProdInput, new Date(), this.usuario.id, idSolicitud);
        var respuesta = this.ctgService.ejecutarPruebaCtg(prueba).subscribe(function (data) {
            _this.respCtg = data;
            if (data != null) {
                if (_this.isProdEnvEnabled) {
                    _this.solicitudValidada.countEjecuciones = _this.solicitudValidada.countEjecuciones + 1;
                }
                if (_this.respCtg.mensajeValidacion == 'VALIDACION EXITOSA') {
                    _this.alertService.push({ severity: 'info', summary: 'Acción Exitosa', detail: "Se ha completado la acción correctamente." });
                }
                else {
                    _this.alertService.push({ severity: 'error', summary: 'Error en la operación', detail: _this.respCtg.mensajeValidacion });
                }
            }
            else {
                _this.alertService.push({ severity: 'error', summary: 'Error en la operación', detail: "No se ha podido completar la operación. Favor de intentar nuevamente." });
            }
            _this.isExecDisabled = false;
        }, function (err) {
            console.log(err);
            _this.solicitudValidada = null;
            _this.cancelDialog();
            _this.limpiar();
        }, function () { _this.isExecDisabled = false; });
    };
    PruebasIgtocComponent.prototype.validarEnvProd = function () {
        var _this = this;
        this.isExecDisabled = false;
        if (this.codigoProdInput) {
            this.ctgService.validarCodigoProduccion(this.codigoProdInput, this.usuario.id).subscribe(function (data) {
                if (data != null) {
                    _this.solicitudValidada = data;
                    _this.enviromentSelected = "Produccion";
                    _this.isProdEnvEnabled = true;
                    _this.codigoProdInput = null;
                    _this.cargarEnvProd(data.programa, data.transaccion, data.usuario);
                    _this.alertService.push({ severity: 'info', summary: 'Exito', detail: "Se ha realizado con éxito el acceso al ambiente de PRODUCCIÓN." });
                }
                else {
                    _this.codigoProdInput = null;
                    _this.prodEnvChecked = false;
                    _this.isProdEnvEnabled = false;
                    _this.enviromentSelected = "Desarrollo";
                    _this.alertService.push({ severity: 'error', summary: 'Acceso no valido', detail: "El código de acceso al ambiente de PRODUCCION es incorrecto o ha caducado. Favor de revisar el folio." });
                }
            }, function (err) {
                console.log(err);
                _this.prodEnvChecked = false;
                _this.isProdEnvEnabled = false;
                _this.enviromentSelected = "Desarrollo";
                _this.codigoProdInput = null;
            }, function () {
                _this.hideDialog();
                console.log('done');
            });
        }
        else {
            this.codigoProdInput = null;
            this.prodEnvChecked = false;
            this.isProdEnvEnabled = false;
            this.enviromentSelected = "Desarrollo";
            this.alertService.push({ severity: 'error', summary: 'Codigo Vacio', detail: "El código de acceso al ambiente de PRODUCCION no puede estar vacío" });
            this.hideDialog();
        }
    };
    PruebasIgtocComponent.prototype.cargarEnvProd = function (program, transaccion, usr) {
        this.codigoProdInput = null;
        this.igtocForm.patchValue({
            'programaInput': '' + program.toUpperCase(),
            'transaccionInput': '' + transaccion.toUpperCase(),
            'usuarioInput': '' + usr.toUpperCase()
        });
        $('input[id="programaInput"]').val("" + program);
        $('input[id="transaccionInput"]').val("" + transaccion);
        $('input[id="usuarioInput"]').val("" + usr);
        $('input[id="programaInput"]').attr('readonly', "" + this.isProdEnvEnabled);
        $('input[id="transaccionInput"]').attr('readonly', "" + this.isProdEnvEnabled);
        $('input[id="usuarioInput"]').attr('readonly', "" + this.isProdEnvEnabled);
    };
    PruebasIgtocComponent.prototype.showDialog = function () {
        this.codigoProdInput = null;
        this.displayConfirmProd = true;
    };
    PruebasIgtocComponent.prototype.hideDialog = function () {
        this.codigoProdInput = null;
        this.displayConfirmProd = false;
    };
    PruebasIgtocComponent.prototype.cancelDialog = function () {
        this.prodEnvChecked = false;
        this.isProdEnvEnabled = false;
        this.enviromentSelected = "Desarrollo";
        this.hideDialog();
    };
    PruebasIgtocComponent.prototype.limpiar = function () {
        this.isExecDisabled = false;
        this.selectOption = 1;
        this.selectCics = 1;
        $('#formPruebaIgtoc').each(function () {
            this.reset();
        });
        this.respCtg = null;
        if (this.prodEnvChecked == true && this.solicitudValidada != null) {
            this.igtocForm.patchValue({
                'programaInput': '' + this.solicitudValidada.programa.toUpperCase(),
                'transaccionInput': '' + this.solicitudValidada.transaccion.toUpperCase(),
                'usuarioInput': '' + this.solicitudValidada.usuario.toUpperCase()
            });
            $('input[id="programaInput"]').val("" + this.solicitudValidada.programa);
            $('input[id="transaccionInput"]').val("" + this.solicitudValidada.transaccion);
            $('input[id="usuarioInput"]').val("" + this.solicitudValidada.usuario);
        }
        else {
            $('input[id="programaInput"]').prop('readonly', false);
            $('input[id="transaccionInput"]').prop('readonly', false);
            $('input[id="usuarioInput"]').prop('readonly', false);
        }
    };
    PruebasIgtocComponent.prototype.solicitudesActivas = function () {
        var _this = this;
        this.foliosCTG = [];
        this.mensajeFolios = 'SELECCIONAR CODIGO SOLICITUD';
        this.ctgService.listarSolicitudes(this.usuario.id, 2).subscribe(function (data) {
            console.log("SOLICITUDES: ", data);
            if (data) {
                _this.foliosCTG = data.map(function (s) {
                    return { label: s.folioGenerado, value: s.folioGenerado };
                });
            }
            else {
                _this.mensajeFolios = 'NO TIENE SOLICITUDES ACTIVAS';
            }
        }, function (err) { console.log(err); }, function () { return console.log('done'); });
    };
    PruebasIgtocComponent.prototype.download = function () {
        var doc = new jsPDF();
        this.logoTelcel = __webpack_require__("./node_modules/json-loader/index.js!./src/assets/json/logoTelcelB64.json");
        doc.addImage(this.logoTelcel.logo, 'JPEG', 50, 20, 100, 25);
        doc.setFontSize(16);
        doc.setFontStyle("italic");
        doc.setTextColor(115, 135, 156);
        doc.text(20, 55, 'Sistema de Gestión de Servicios M2K - Ejecución de IGTOC');
        doc.setFontSize(13);
        doc.text(20, 70, 'Programa');
        doc.setTextColor(51, 122, 183);
        doc.text(20, 80, this.igtocForm.get('programaInput').value.toUpperCase());
        doc.setTextColor(115, 135, 156);
        doc.text(20, 90, 'Transacción');
        doc.setTextColor(51, 122, 183);
        doc.text(20, 100, this.igtocForm.get('transaccionInput').value.toUpperCase());
        doc.setTextColor(115, 135, 156);
        doc.text(20, 110, 'Región');
        doc.setTextColor(51, 122, 183);
        doc.text(20, 120, 'R0' + this.selectOption);
        doc.setTextColor(115, 135, 156);
        doc.text(20, 130, 'Usuario Mobile');
        doc.setTextColor(51, 122, 183);
        doc.text(20, 140, this.igtocForm.get('usuarioInput').value.toUpperCase());
        doc.setTextColor(115, 135, 156);
        if (this.prodEnvChecked == true) {
            doc.text(20, 150, 'Ambiente Producción');
            doc.text(20, 160, 'Código de Respuesta CTG');
            doc.setTextColor(51, 122, 183);
        }
        else {
            doc.text(20, 150, 'Ambiente Desarrollo');
            doc.setTextColor(51, 122, 183);
            if (this.selectCics == 1) {
                doc.text(20, 160, 'DEVL');
            }
            else {
                doc.text(20, 160, 'CICSDSB9');
            }
        }
        doc.setTextColor(51, 122, 183);
        var sourceCodigoCtg = $('#codigoCtg')[0];
        var margins = {
            width: 175
        };
        var specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(sourceCodigoCtg, // HTML string or DOM elem ref.
        20, // x coord
        170, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });
        //SE AGREGAN LOS CAMPOS QUE PUEDEN TENER UNA LONGITUD MUY EXTENSA: CADENA ENVIADA, RESPEUSTA PROGRAMA, RESPUESTA XML
        var sourceCadEnviada = $('#infoEnviadaCtg')[0];
        var sourceRespProg = $('#respPrograma')[0];
        var sourceRespXml = $('#respXmlCtg')[0];
        var sourceMensajeValidacion = $('#mensajeValidacion')[0];
        var margins = {
            width: 175
        };
        var specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(sourceCadEnviada, // HTML string or DOM elem ref.
        20, // x coord
        185, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });
        doc.addPage();
        doc.fromHTML(sourceRespProg, // HTML string or DOM elem ref.
        20, // x coord
        30, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });
        doc.addPage();
        doc.fromHTML(sourceRespXml, // HTML string or DOM elem ref.
        20, // x coord
        30, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });
        doc.addPage();
        doc.fromHTML(sourceMensajeValidacion, // HTML string or DOM elem ref.
        20, // x coord
        30, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });
        doc.save('EjecucionCTG_' + this.igtocForm.get('programaInput').value.toUpperCase() + '.pdf');
    };
    return PruebasIgtocComponent;
}());
PruebasIgtocComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-pruebasIgtoc',
        template: __webpack_require__("./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/pruebasIgtoc/pruebasIgtoc.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__global_service__["a" /* GlobalService */]) === "function" && _d || Object])
], PruebasIgtocComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/pruebasIgtoc.component.js.map

/***/ }),

/***/ "./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.css":
/***/ (function(module, exports) {

module.exports = ".customLabel{\r\n    width: 100%;\r\n    padding-top: 8px;\r\n}\r\n\r\n.rightLabel{\r\n    float: right;\r\n}\r\n\r\n.leftLabel{\r\n    float: left;\r\n}\r\n\r\n.middleField{\r\n    width: 43%;\r\n    padding-top: 8px;\r\n}\r\n\r\n.danger_marker{\r\n    color:red;\r\n    font-weight: bold;\r\n}\r\n\r\n.noPadding {\r\n    padding: 0px;\r\n}\r\n\r\n.nopermision{\r\n    font-size: large;\r\n}\r\n\r\n.largeFa{\r\n    font-size: xx-large;\r\n}\r\n\r\n.stop{\r\n    max-width: 200px;\r\n    margin-left: auto;\r\n\tmargin-right: auto;\r\n    display: block;\r\n    padding-bottom: 20px;\r\n}\r\n\r\n.showFullName{\r\n    color: darkblue;\r\n    font-weight: bold;\r\n}\r\n\r\n#asignaResp{\r\n  margin-left: 35%;\r\n  width: 25%;\r\n  height: 60px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isDataAvailable == true\">\r\n  <div *ngIf=\"usuarioResponsable\">\r\n      <p-dialog header=\"Confirmación de Solicitud\" [(visible)]=\"displayConfirmSol\" modal=\"modal\" width=\"400\"\r\n              [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"false\">\r\n\r\n\r\n              <div  *ngIf=\"solicitud\">\r\n\r\n                  <div class=\"row\" style=\"padding-top:5px;padding-bottom: 15px;\">\r\n                      <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all ui-messages-success\"\r\n                              style=\"font-size: 25px;margin:0;\">\r\n                                  <span class=\"ui-message-icon fa fa-info-circle\"></span>\r\n                                  <span class=\"ui-message-text\">Folio: {{solicitud.folioGenerado}}</span>\r\n                      </div>\r\n              </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">FECHA SOLICITUD AMBIENTE:</label>\r\n                      {{solicitud.fecha_solicitud |  date:'dd/MM/yyyy'}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">HORA INICIO:</label>\r\n                      {{solicitud.hora_inicio}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">HORA FIN:</label>\r\n                      {{solicitud.hora_fin}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">USUARIO MOBILE:</label>\r\n                      {{solicitud.usuario}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">PROGRAMA:</label>\r\n                      {{solicitud.programa}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">TRANSACCIÓN:</label>\r\n                      {{solicitud.transaccion}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">No. TRANSACCIONES:</label>\r\n                      {{solicitud.total_transacciones}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">RESPONSABLE AUTORIZACIÓN:</label>\r\n                      <div *ngIf=\"usuarioResponsable\" style=\"display:inline;\">\r\n                          {{usuarioResponsable.correo}}\r\n                      </div>\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">CORREO NOTIFICACIÓN:</label>\r\n                      {{solicitud.solicitante.correo}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">PROYECTO ASOCIADO:</label>\r\n                      {{solicitud.proyectoAsociado}}\r\n                  </div>\r\n\r\n                  <div class=\"row\">\r\n                      <label class=\"middleField\">COMENTARIOS:</label>\r\n                      <p>{{solicitud.comentarios}}</p>\r\n                  </div>\r\n\r\n              </div>\r\n\r\n              <p-footer>\r\n                  <button style=\"float:right\" type=\"button\" pButton icon=\"fa-close\" (click)=\"cancelDialog()\" label=\"Salir\" class=\"ui-button-info\"></button>\r\n              </p-footer>\r\n      </p-dialog>\r\n\r\n      <div class=\"container theme-showcase\" role=\"main\">\r\n\r\n      <div class=\"page-header\">\r\n          <h1>Solicitud de Ambiente Productivo CTG</h1>\r\n          <p>En esta sección podrá realizar una solicitud de ambiente productivo a CTG, misma que le generará un folio que estará INACTIVO hasta que su jefe/supervisor autoricen dicha solicitud.\r\n          </p>\r\n      </div>\r\n\r\n      <form [formGroup]=\"complexForm\" id=\"formSol\" class=\"form-horizontal\" (ngSubmit)=\"generarSolicitud()\">\r\n\r\n      <p-panel class=\"col-md-12\">\r\n          <p-header>\r\n              <div class=\"ui-helper-clearfix\">\r\n                  <span class=\"ui-panel-title\" style=\"font-size:16px;display:inline-block;margin-top:2px\">Formato de Solicitud de Ambiente</span>\r\n              </div>\r\n          </p-header>\r\n          <div class=\"row\">\r\n              <div class=\"col-md-12\" style=\"text-align: right;\">\r\n              Campos marcados con <span class=\"danger_marker\">*</span> son obligatorios.\r\n              </div>\r\n\r\n          </div>\r\n          <div class=\"row\" style=\"padding-bottom: 10px;\">\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.fechaInput}\">\r\n                      <label class=\"customLabel\" for=\"fechaInput\">FECHA<span class=\"danger_marker\">*</span></label>\r\n                      <p-calendar [showIcon]=\"true\"\r\n                      [locale]=\"es\" dateFormat=\"dd/mm/yy\" disabledDays=\"[0,6]\"\r\n                      [minDate]=\"minDate\" [maxDate]=\"maxDate\" readonlyInput=\"true\" showButtonBar=\"true\"\r\n                      formControlName=\"fechaInput\">\r\n                      </p-calendar>\r\n                      <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.fechaInput\">{{formErrors.fechaInput}}</div>\r\n                  </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.horaInicioInput}\">\r\n                      <label class=\"customLabel\" for=\"horaInicioInput\">HORA INICIO\r\n                          <span class=\"danger_marker\">*</span>\r\n                          <app-ctg-help [ayuda]=\"ayudaHoraInicio\"></app-ctg-help>\r\n                      </label>\r\n                      <p-calendar [timeOnly]=\"true\" [showIcon]=\"true\"\r\n                      formControlName=\"horaInicioInput\" (onSelect)=\"actualizarHoraFin()\"></p-calendar>\r\n                      <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.horaInicioInput\">{{formErrors.horaInicioInput}}</div>\r\n                  </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.horaFinOutput}\">\r\n                      <label class=\"customLabel\" for=\"horaFinOutput\">HORA FIN<span class=\"danger_marker\">*</span></label>\r\n                      <input type=\"text\" class=\"form-control middleField\"\r\n                              readonly=\"readonly\"\r\n                          [value]=\"complexForm.get('horaFinOutput').value |  datex:'HH:mm'\" formControlName=\"horaFinOutput\">\r\n                      <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.horaFinOutput\">{{formErrors.horaFinOutput}}</div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"padding-bottom: 10px;\">\r\n              <div class=\"col-md-4\">\r\n                      <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.usuarioInput}\">\r\n\r\n                          <label class=\"control-label\" for=\"usuarioInput\">USUARIO MOBILE</label>\r\n                          <span class=\"danger_marker\">*</span>\r\n                          <app-ctg-help [ayuda]=\"ayudaUsr\"></app-ctg-help>\r\n                          <input type=\"text\" class=\"form-control\"\r\n                          [value]=\"complexForm.get('usuarioInput').value | upperx\" formControlName=\"usuarioInput\" placeholder=\"Vi...\">\r\n                          <!-- Mensaje de Error de Validación-->\r\n                          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioInput\">{{formErrors.usuarioInput}}</div>\r\n                      </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                      <div class=\"form-group\" [ngClass]=\"{'has-error':noTransaccionesInput}\">\r\n                          <label class=\"customLabel\" for=\"noTransaccionesInput\">\r\n                              No. TRANSACCIONES<span class=\"danger_marker\">*</span>\r\n                              <app-ctg-help [ayuda]=\"ayudaNoTrans\"></app-ctg-help>\r\n                          </label>\r\n                          <p-spinner [maxlength]=\"3\" [min]=\"0\" [max]=\"100\"\r\n                          formControlName=\"noTransaccionesInput\"></p-spinner>\r\n                          <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.noTransaccionesInput\">{{formErrors.noTransaccionesInput}}</div>\r\n                      </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                  <div>\r\n                      <label class=\"customLabel\" for=\"responsableOutput\">RESPONSABLE AUTORIZACIÓN</label>\r\n                      <span class=\"showFullName\">{{usuarioResponsable.getFullName()}}</span>\r\n                      <input type=\"text\" class=\"form-control\"\r\n                              readonly=\"readonly\" required\r\n                          id=\"responsableOutput\" formControlName=\"responsableOutput\">\r\n\r\n                  </div>\r\n              </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"padding-bottom: 15px;\">\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.transaccionInput}\">\r\n                      <label class=\"control-label\" for=\"transaccionInput\">TRANSACCIÓN</label>\r\n                      <span class=\"danger_marker\">*</span>\r\n                      <app-ctg-help [ayuda]=\"ayudaTrans\"></app-ctg-help>\r\n                      <input type=\"text\" class=\"form-control\" required\r\n                          [value]=\"complexForm.get('transaccionInput').value | upperx\" formControlName=\"transaccionInput\" placeholder=\"I*..\">\r\n                      <!-- Mensaje de Error de Validación-->\r\n                          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.transaccionInput\">{{formErrors.transaccionInput}}</div>\r\n                  </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.programaInput}\">\r\n                      <label class=\"control-label\" for=\"programaInput\">PROGRAMA</label>\r\n                      <span class=\"danger_marker\">*</span>\r\n                      <app-ctg-help [ayuda]=\"ayudaProg\"></app-ctg-help>\r\n                      <input type=\"text\" class=\"form-control\" required\r\n                      [value]=\"complexForm.get('programaInput').value| upperx\" formControlName=\"programaInput\" placeholder=\"IGTOC..\">\r\n                      <!-- Mensaje de Error de Validación-->\r\n                          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.programaInput\">{{formErrors.programaInput}}</div>\r\n                  </div>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                  <div>\r\n                      <label class=\"control-label\" for=\"correoNotificacionOutput\">CORREO NOTIFICACIÓN</label>\r\n                      <p *ngIf=\"usuarioSolicitud\">\r\n                      <span class=\"showFullName\">{{usuarioSolicitud.nombre}} {{usuarioSolicitud.apaterno}} {{usuarioSolicitud.amaterno}}</span>\r\n                          <input type=\"text\" class=\"form-control\"\r\n                              required readonly=\"readonly\"\r\n                          formControlName=\"correoNotificacionOutput\">\r\n                      </p>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"padding-bottom: 10px;\">\r\n              <div class=\"col-md-4\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.proyAsociadoInput}\">\r\n                      <label class=\"control-label\" for=\"proyAsociadoInput\">PROYECTO ASOCIADO</label>\r\n                      <input type=\"text\" class=\"form-control\"\r\n                      [value]=\"complexForm.get('proyAsociadoInput').value | upperx\" formControlName=\"proyAsociadoInput\">\r\n                      <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-warning noPadding\" *ngIf=\"formErrors.proyAsociadoInput\">{{formErrors.proyAsociadoInput}}</div>\r\n                  </div>\r\n              </div>\r\n              <div class=\"col-md-8\">\r\n                  <div class=\"form-group\" [ngClass]=\"{'has-error':formErrors.comentarioInput}\">\r\n                      <label class=\"customLabel\" for=\"comentarioInput\">COMENTARIOS</label>\r\n                      <textarea pInputTextarea [value]=\"complexForm.get('comentarioInput').value | upperx\" formControlName=\"comentarioInput\"\r\n                      [rows]=\"3\" class=\"customLabel\" autoResize=\"autoResize\"\r\n                      ></textarea>\r\n                      <!-- Mensaje de Error de Validación-->\r\n                      <div class=\"alert alert-warning noPadding\" *ngIf=\"formErrors.comentarioInput\">{{formErrors.comentarioInput}}</div>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n  {{complexForm.errors}}\r\n          <p-footer>\r\n              <div class=\"row\">\r\n                  <div class=\"col-md-12\">\r\n                      <button pButton type=\"submit\" label=\"Generar Solicitud\"\r\n                          icon=\"fa-save\" style=\"float:right;\" [disabled]=\"!complexForm.valid\"\r\n                          ></button><!--[disabled]=\"!complexForm.valid\" -->\r\n                  </div>\r\n\r\n              </div>\r\n          </p-footer>\r\n      </p-panel>\r\n      </form>\r\n\r\n      </div>\r\n  </div>\r\n  <div *ngIf=\"!usuarioResponsable\">\r\n\r\n      <div class=\"container theme-showcase\" role=\"main\">\r\n\r\n          <div class=\"page-header\">\r\n              <h1>Solicitud de Ambiente Productivo CTG</h1>\r\n              <p>En esta sección podrá realizar una solicitud de ambiente productivo a CTG, misma que le generará un folio que estará INACTIVO hasta que su jefe/supervisor autoricen dicha solicitud.\r\n              </p>\r\n          </div>\r\n\r\n          <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                      <br>\r\n                      <br>\r\n                      <div class=\"form-group\">\r\n                          <button id=\"asignaResp\" [disabled]=\"loading\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#agregarModal\"><b>ASIGNAR RESPONSABLE</b></button>\r\n                        </div>\r\n              </div>\r\n          </div>\r\n\r\n      </div>\r\n\r\n  </div>\r\n\r\n\r\n  <!--MODAL DE SOLICITUD-->\r\n  <div class=\"modal\" id=\"agregarModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"agregarModallLabel\"\r\n    data-backdrop=\"static\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\" id=\"envioEmail\" data-backdrop=\"static\">\r\n        <form #frm=\"ngForm\" novalidate>\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\r\n                aria-hidden=\"true\">&times;</span></button>\r\n            <h4 class=\"modal-title\" id=\"agregarModalLabel\">Registro de solicitud</h4>\r\n          </div>\r\n          <div class=\"modal-body col-md-12\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-10\">\r\n                <label>Enviar email a responsable para que genere una solicitud</label>\r\n                <select class=\"form-control\" name=\"responsable\" id=\"resp\" [(ngModel)]=\"responsable.responsable\" required>\r\n                  <option value=\"\">-SELECCIONA A TU RESPONSABLE</option>\r\n                  <option value=\"angelina.chavez@telcel.com\">Angelina Chavez Hernandez</option>\r\n                  <option value=\"elyria.torres@telcel.com\">Elyria Torres Flores</option>\r\n                  <option value=\"guillermo.garcia@telcel.com\">Guillermo Garcia Espinosa</option>\r\n                  <option value=\"jesus.luna@telcel.com\">Jesus Luna Castro</option>\r\n                  <option value=\"veronica.rivera@telcel.com\">Veronica Rivera Hernandez</option>\r\n                  <option value=\"yolanda.revilla@mail.telcel.com\">Yolanda Revilla Aquino</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <br>\r\n          <br>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"cancel()\">Cancelar</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"asignarResp()\">Asignar</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudAmbienteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modelo_SolM2kSolicitudCtg__ = __webpack_require__("./src/app/ctg-execution/modelo/SolM2kSolicitudCtg.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ctg_execution_service__ = __webpack_require__("./src/app/ctg-execution/ctg-execution.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__ = __webpack_require__("./src/app/ctg-execution/help/model/HelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__global_service__ = __webpack_require__("./src/app/global.service.ts");
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
    function SolicitudAmbienteComponent(alertService, ctgService, fb, globalService) {
        this.alertService = alertService;
        this.ctgService = ctgService;
        this.fb = fb;
        this.globalService = globalService;
        this.responsable = new __WEBPACK_IMPORTED_MODULE_7__ctg_execution_service__["b" /* ResponsableUser */]("", "");
        this.formErrors = {
            'fechaInput': '',
            'horaInicioInput': '',
            'horaFinOutput': '',
            'usuarioInput': '',
            'noTransaccionesInput': '',
            'responsableOutput': '',
            'transaccionInput': '',
            'programaInput': '',
            'correoNotificacionOutput': '',
            'proyAsociadoInput': '',
            'comentarioInput': '',
        };
        this.validationMessages = {
            'fechaInput': {
                'required': 'Fecha de la Solicitud es REQUERIDA.'
            },
            'horaInicioInput': {
                'required': 'La hora de inicio es REQUERIDA.'
            },
            'horaFinOutput': {
                'required': 'La hora Fin es REQUERIDA (Autogenerado).'
            },
            'usuarioInput': {
                'required': 'El usuario MOBILE es REQUERIDO.',
                'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
                'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.'
            },
            'noTransaccionesInput': {
                'required': 'El número de transacciones es REQUERIDO.'
            },
            'responsableOutput': {},
            'transaccionInput': {
                'required': 'La TRANSACCIÓN es REQUERIDA.',
                'minlength': 'La TRANSACCIÓN debe tener al menos 4 caracteres.',
                'maxlength': 'La TRANSACCIÓN debe tener máximo 4 caracteres.'
            },
            'programaInput': {
                'required': 'El PROGRAMA es REQUERIDO.',
                'minlength': 'El PROGRAMA debe tener al menos 7 caracteres.',
                'maxlength': 'El PROGRAMA debe tener máximo 7 caracteres.'
            },
            'correoNotificacionOutput': {},
            'proyAsociadoInput': {
                'maxlength': 'El PROYECTO ASOCIADO debe tener máximo 20 caracteres.'
            },
            'comentarioInput': {
                'maxlength': 'El COMENTARIO debe tener máximo 250 caracteres.'
            }
        };
        this.isDataAvailable = false;
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        };
        this.cargarAyuda();
        this.initForm();
    }
    SolicitudAmbienteComponent.prototype.initForm = function () {
        var _this = this;
        this.complexForm = this.fb.group({
            'fechaInput': [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            'horaInicioInput': [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            'horaFinOutput': [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            'usuarioInput': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(10)])],
            'noTransaccionesInput': [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            'responsableOutput': [null, null],
            'transaccionInput': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(4), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(4)])],
            'programaInput': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].minLength(7), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(7)])],
            'correoNotificacionOutput': [null, null],
            'proyAsociadoInput': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(20)],
            'comentarioInput': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].maxLength(250)],
        });
        this.horaFinOutput = null;
        this.complexForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    SolicitudAmbienteComponent.prototype.onValueChanged = function (data) {
        if (!this.complexForm) {
            return;
        }
        var form = this.complexForm;
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
    SolicitudAmbienteComponent.prototype.cargarAyuda = function () {
        this.ayudaUsr = new __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__["a" /* Help */]('Usuario Mobile', 'Usuario registrado en M2K con autoridad para ejecutar el componente en Producción');
        this.ayudaNoTrans = new __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__["a" /* Help */]('No. Transacciones', 'Total de pruebas unitarias para el folio y por cada transacción.');
        this.ayudaTrans = new __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__["a" /* Help */]('Transacción', 'Transacción M2K asignada al componente, p.ej. I*TC');
        this.ayudaProg = new __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__["a" /* Help */]('Programa', 'Nombre del programa en M2K, p.ej. IGTOC65 ');
        this.ayudaHoraInicio = new __WEBPACK_IMPORTED_MODULE_8__help_model_HelpModel__["a" /* Help */]('Restricciones', 'La hora de Inicio, debe ser MAYOR a la hora actual. Ejemplo: Hora Actual: 15:30, Hora Solicitud debe ser 15:31 y mayores.');
    };
    SolicitudAmbienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.displayConfirmSol = false;
        this.minDate = new Date();
        this.maxDate = new Date((new Date(this.minDate)).getTime() + (60 * 60 * 24 * 1000));
        this.validating = false;
        this.usuarioSolicitud = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.responsable.idUsuario = "" + this.usuarioSolicitud.id;
        console.log("EL ID DEL USUARIO ES -> " + this.responsable.idUsuario);
        this.ctgService.obtenerResponsable(this.usuarioSolicitud.id).subscribe(function (data) {
            if (data) {
                _this.usuarioResponsable = new __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__["f" /* User */](data.id, data.nempleado, data.nombre, data.apaterno, data.amaterno, data.correo, data.usuarioRed, data.extension);
                console.log("RESPONSABLE DEL USUARIO ->>>>>>>>>>> " + _this.usuarioResponsable.nempleado);
                _this.complexForm.patchValue({
                    'responsableOutput': _this.usuarioResponsable.correo
                });
            }
        }, function (err) { console.log(err); _this.isDataAvailable = true; }, function () {
            _this.isDataAvailable = true;
            _this.complexForm.patchValue({
                'correoNotificacionOutput': _this.usuarioSolicitud.correo
            });
        });
    };
    SolicitudAmbienteComponent.prototype.setInputResponsable = function (nombre, aPaterno, aMaterno, correo) {
        $('input[id="responsableOutput"]').val("" + nombre + " " + aPaterno + " " + aMaterno + " <" + correo + ">");
        this.complexForm.patchValue({
            'responsableOutput': '' + nombre + ' ' + aPaterno + ' ' + aMaterno + ' <' + correo + '>'
        });
    };
    SolicitudAmbienteComponent.prototype.generarSolicitud = function () {
        var _this = this;
        var solicitud = new __WEBPACK_IMPORTED_MODULE_5__modelo_SolM2kSolicitudCtg__["a" /* SolM2kSolicitudCtg */](0, this.complexForm.get('fechaInput').value, this.complexForm.get('horaInicioInput').value, this.complexForm.get('horaFinOutput').value, this.complexForm.get('usuarioInput').value.toUpperCase(), this.complexForm.get('noTransaccionesInput').value, this.complexForm.get('transaccionInput').value.toUpperCase(), this.complexForm.get('proyAsociadoInput').value.toUpperCase(), this.complexForm.get('comentarioInput').value.toUpperCase(), this.usuarioSolicitud.id, this.usuarioResponsable.id, 'N/A', new Date(), 'INA', 'P', this.complexForm.get('programaInput').value.toUpperCase());
        this.ctgService.guardarSolicitud(solicitud).subscribe(function (data) {
            _this.solicitud = data;
            _this.resetForm();
            setTimeout(function () { return _this.displayConfirmSol = true; }, 1000);
        }, function (err) { }, function () { return console.log('done'); });
    };
    SolicitudAmbienteComponent.prototype.resetForm = function () {
        var _this = this;
        this.complexForm.reset();
        this.complexForm.markAsUntouched();
        Object.keys(this.complexForm.controls).forEach(function (name) {
            var control = _this.complexForm.controls[name];
            control.setErrors(null);
        });
        this.ctgService.obtenerResponsable(this.usuarioSolicitud.id).subscribe(function (data) {
            _this.usuarioResponsable = new __WEBPACK_IMPORTED_MODULE_6__admin_admin_service__["f" /* User */](data.id, data.nempleado, data.nombre, data.apaterno, data.amaterno, data.correo, data.usuarioRed, data.extension);
            _this.complexForm.patchValue({
                'responsableOutput': _this.usuarioResponsable.correo
            });
        }, function (err) { console.log(err); }, function () { return console.log('done'); });
        this.usuarioSolicitud = JSON.parse(localStorage.getItem('user_session_data')).user;
        console.log("USUARIO SESSION:", this.usuarioSolicitud);
        $('input[formcontrolname="correoNotificacionOutput"]').val("" + this.usuarioSolicitud.correo);
        this.complexForm.patchValue({
            'correoNotificacionOutput': '' + this.usuarioSolicitud.correo
        });
    };
    SolicitudAmbienteComponent.prototype.actualizarHoraFin = function () {
        this.complexForm.patchValue({
            'horaFinOutput': new Date(this.complexForm.get('horaInicioInput').value.getTime() + (60 * 60 * 1 * 1000))
        });
    };
    SolicitudAmbienteComponent.prototype.cancelDialog = function () {
        this.displayConfirmSol = false;
    };
    SolicitudAmbienteComponent.prototype.spinnerOnFocus = function () {
        console.log("SPINNER ON FOCUS.");
    };
    SolicitudAmbienteComponent.prototype.asignarResp = function () {
        var _this = this;
        console.log("SE ENVIARON LOS DATOS DE ASIGNACIÓN, el responsable es -> " + this.responsable.idUsuario + " " + this.responsable.responsable);
        this.ctgService.assignResponsable(this.responsable)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["catchError"])(function (err) {
            console.log("ERROR -> " + err.status);
            if (err.status = 400) {
                _this.alertService.push({ severity: 'error', summary: 'Error al asignar responsable', detail: 'Ocurrio un error al intentar asignar su responsable' });
            }
            else if (err.status = 401) {
                _this.alertService.push({ severity: 'error', summary: 'Error inesperado', detail: 'Ocurrio un error inesperado en el proceso de asignación' });
            }
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err.status);
        }))
            .subscribe(function () {
            _this.responsable = new __WEBPACK_IMPORTED_MODULE_7__ctg_execution_service__["b" /* ResponsableUser */]("", "");
            _this.alertService.push({ severity: 'info', summary: 'Asignación exitosa', detail: "El responsable fue asignado satisfactoriamente" });
            console.log("FINALIZANDO METODO DE ASIGNACIÓN DE RESPONSABLE");
        });
    };
    SolicitudAmbienteComponent.prototype.cnlcel = function () {
    };
    return SolicitudAmbienteComponent;
}());
SolicitudAmbienteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitudAmbiente',
        template: __webpack_require__("./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.html"),
        styles: [__webpack_require__("./src/app/ctg-execution/solicitudAmbiente/solicitudAmbiente.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__ctg_execution_service__["a" /* CtgExecutionCommonService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ctg_execution_service__["a" /* CtgExecutionCommonService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__global_service__["a" /* GlobalService */]) === "function" && _d || Object])
], SolicitudAmbienteComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/solicitudAmbiente.component.js.map

/***/ })

});
//# sourceMappingURL=ctg-execution.module.chunk.js.map