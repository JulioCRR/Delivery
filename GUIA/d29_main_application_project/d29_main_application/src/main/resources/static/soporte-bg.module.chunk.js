webpackJsonp(["soporte-bg.module"],{

/***/ "./src/app/soporte-bg/detalles-ei/detalles-ei.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/soporte-bg/detalles-ei/detalles-ei.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1>Detalle movimiento Equipo Ilimitado</h1>\n  <form>\n    <div class=\"form-group\">\n      <label for=\"telefono\">Teléfono</label>\n      <input type=\"text\" class=\"form-control\" name=\"telefono\" required [(ngModel)]=\"telefono\" maxlength=\"10\" size=\"10\">\n    </div>\n    <!--  \n    <div class=\"form-group\">\n      <label for=\"fechaTramite\">Fecha de támite</label>\n      <input type=\"date\" class=\"form-control\" id=\"fechaTramite\" [ngModel]=\"fechaTramite | date:'y-MM-dd'\" (ngModelChange)=\"fechaTramite = $event\"\n        name=\"fechaTramite\">\n    </div>\n    -->\n    <!-- \n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"consultaMovimiento()\" [disabled]=\"!form.valid\" data-toggle=\"modal\">Buscar</button>\n    -->\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"consultaMovimiento()\">Buscar</button>\n\n\n  </form>\n</div>\n\n<div class=\"row\" *ngIf=\"showResults\">\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <p-dataTable [value]=\"solicitudesEI\" [rows]=\"10\" [paginator]=\"true\" [pageLinks]=\"3\" [rowsPerPageOptions]=\"[5,10,20]\">\n      <p-column field=\"idSolicitud\" header=\"Id solicitud\"></p-column>\n      \n      <p-column field=\"grupoNacional\" header=\"Grupo nacional\"></p-column>\n      <p-column field=\"tipo\" header=\"Tipo\"></p-column>\n      <p-column field=\"fechaIngreso\" header=\"Fecha ingreso\"></p-column>\n      <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n        <ng-template let-solicitud=\"rowData\" pTemplate=\"body\">\n          <button type=\"button\" class=\"ui-button-success\" (click)=\"selectSolicitud(solicitud)\"\n            tooltipPosition=\"left\" pButton icon=\"fa-search-plus\"></button>\n        </ng-template>\n      </p-column>\n\n    </p-dataTable>\n  </div>\n</div>\n\n</div>\n\n<div class=\"row\" *ngIf=\"showDetail\">\n      <table>\n          <tr class=\"col-md-12\">\n\n          <td>\n          <div class=\"row\">\n            <h3>Datos de solicitud</h3>\n          </div>\n          <div class=\"row\">\n            <table>\n              <tr>\n                <td> <b>Id solicitud :</b> {{ solicitudEI.idSolicitud }} </td>\n                <td>&nbsp;&nbsp;</td>\n                <td> <b>Tramite :</b> {{ solicitudEI.tramite }} </td>\n                <td> <b>Grupo nacional :</b> {{ solicitudEI.grupoNacional }}</td>\n                <td>&nbsp;&nbsp;</td>\n                <td><b>Tipo de movimiento :</b> {{ solicitudEI.tipo }} </td>\n              </tr>\n              <tr>\n                \n              </tr>\n              <tr>\n                <td><b>Estatus solicitud :</b> {{ solicitudEI.estatus }}</td>\n                <td>&nbsp;&nbsp;</td>\n                <td><b>Mensaje :</b> {{ solicitudEI.mensaje }} </td>\n                <td><b>Fecha ingreso :</b> {{ solicitudEI.fechaIngreso }} </td>\n                <td>&nbsp;&nbsp;</td>\n                <td><b>Fecha de ejecución :</b> {{ solicitudEI.fechaIngreso }}</td>\n              </tr>\n              <tr>\n                \n              </tr>\n              <tr>\n                <td><b>Envío de respuesta :</b> {{ solicitudEI.envioRespuesta }}</td>\n                <td>&nbsp;&nbsp;</td>\n                <td><b>Id comunidad :</b> {{ solicitudEI.idComudidad }}</td>\n                <td><b>Usuario :</b>{{ detalleSolicitud.usuario }}</td>\n                <td>&nbsp;&nbsp;</td>\n                <td><b>Tipo de grupo :</b> {{ detalleSolicitud.tipoGrupo }} </td>\n              </tr>\n              <tr>\n                \n              </tr>\n\n              <tr>\n                <td><b>Número pivote :</b> {{ detalleSolicitud.pivote }}</td>\n                \n                <td></td>\n                <td><b> Aplicación: </b>{{ solicitudEI.aplicacion }}</td>\n              </tr>\n\n            </table>\n          </div>\n        </td>  \n        </tr>  \n        \n        <tr class=\"col-md-12\">\n            \n            <td>\n          <div class=\"row\">\n            <h3>Detalle de línea</h3>\n            <div>\n              <table>\n                <tr><td><b>Teléfono:</b> {{ detalleSolicitud.telefono }}</td></tr>\n                <tr>  <td><b>Región:</b> {{ detalleSolicitud.region }}</td></tr>\n                <tr>  <td><b>Fecha ejecución:</b> {{ detalleSolicitud.fechaEjecucionDetalle }}</td></tr>\n                <tr>  <td><b>Estatus:</b> {{ detalleSolicitud.estatusDetalle }}</td></tr>   \n                <tr>  <td><b>Código:</b> {{ detalleSolicitud.codigoDetalle }}</td></tr>\n                <tr>  <td><b>Mensaje:</b> {{ detalleSolicitud.mensajeDetalle }}</td></tr>\n                <tr>  <td><b>Producto:</b> {{ detalleSolicitud.productoDetalle }}</td></tr>\n              </table>\n            </div>\n          </div>\n        </td>  \n      </tr>\n      \n      <tr class=\"col-md-12\">\n          \n          <td>\n      \n          <div class=\"row\">\n            <h3>Detalle de productos</h3>\n          </div>\n          \n          <div class=\"row\">\n            <table border=\"1\">\n              <tr>\n                <th>Producto</th>\n                <th>Tipo producto</th>\n                <th>Estatus</th>\n              </tr>\n              <tr>\n                <td>{{ detalleSolicitud.productoLocal }}</td>\n                <td>Producto local</td>\n                <td>{{ detalleSolicitud.estatusProductoLocal }}</td>\n              </tr>\n              <tr>\n                  <td>{{ detalleSolicitud.productoNacional }}</td>\n                  <td>Producto nacional</td>\n                  <td>{{ detalleSolicitud.estatusProductoNacional }}</td>\n              </tr>\n              <tr>\n                  <td>{{ detalleSolicitud.productoExt }}</td>\n                  <td>Producto extensión</td>\n                  <td>{{ detalleSolicitud.estatusProductoExt }}</td>\n              </tr>\n            </table>\n\n          </div>\n        \n        </td>  \n      </tr>\n      \n      <tr class=\"col-md-12\">\n          \n          <td>\n          <div class=\"row\">\n            <h3>Detalle respuesta WS-M2K</h3>\n          </div>\n          \n          <div class=\"row\">\n              <div class=\"col-md-11\">\n                <p-dataTable [value]=\"movimientosEI\" [rows]=\"5\" [paginator]=\"true\" [pageLinks]=\"3\" [rowsPerPageOptions]=\"[5,10]\">\n                  <p-column field=\"consecutivo\" header=\"Intento\"></p-column>\n                  <p-column field=\"estatus\" header=\"Estatus\"></p-column>\n                  <p-column field=\"mensaje\" header=\"Mensaje\"></p-column>\n                  <p-column field=\"fechaEjecucion\" header=\"Fecha ejecución\"></p-column>\n                  <p-column field=\"producto\" header=\"Producto\"></p-column>\n                  <p-column field=\"pivote\" header=\"Pivote\"></p-column>\n                  <p-column styleClass=\"col-button\" [style]=\"{'width':'35px'}\">\n                    <ng-template let-movimiento=\"rowData\" pTemplate=\"body\">\n                      <button type=\"button\" class=\"ui-button-success\" pTooltip=\"Editar\" data-toggle=\"modal\" data-target=\"#agregarModal1\" (click)=\"searchPetition(movimiento)\"\n                        tooltipPosition=\"left\" pButton icon=\"fa-search-plus\"></button>\n                    </ng-template>\n                  </p-column>\n            \n                </p-dataTable>\n              </div>\n            </div>\n          </td>  \n        </tr>\n        <tr class=\"col-md-12\">\n              <td>\n                  <div class=\"row\">\n                      <h3>Operaciones de soporte</h3>\n                    </div>\n                <table>\n                  <tr>\n                    <td>\n                      <button type=\"button\" class=\"btn btn-primary\" (click)=\"activarTimer()\">Activar timer envio de respuesta</button>\n                    </td>\n                    <td>\n                      <div *ngIf=\"showBotonReproceso\">  \n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"actualizaEstatusSolicitud()\">Reprocesar solicitud</button> \n                      </div>  \n                    </td> \n                     </tr>\n                     <tr>\n                      <td>\n                       <b> {{mensajeSoporte}} </b>\n                      </td>\n                    </tr>\n                  </table>\n                \n              \n              </td>\n             \n        </tr>\n\n      </table>      \n    </div>      \n\n\n\n    <div class=\"row\" *ngIf=\"showNoResults\">\n        No se encontraron datos \n    </div> \n\n    <div class=\"row\" *ngIf=\"showSearching\">\n      Buscando solicitud... \n  </div> \n\n            <div class=\"modal fade\" id=\"agregarModal1\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"agregarModallLabel\">\n                <div class=\"modal-dialog\" role=\"document\">\n                  <div class=\"modal-content\">\n                    <form #form=\"ngForm\" novalidate>\n                      <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                          <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                        <h4 class=\"modal-title\" id=\"agregarModalLabel\">Detalle invocación servicios WS-M2K</h4>\n                      </div>\n              \n                      <div class=\"modal-body\">\n                          \n                         <div *ngIf=\"showInfoWSM2K\"> \n\n\n\n                          <p-panel >\n                              <header>\n                                  Request\n                              </header>\n                              <pre lang=\"xml\" >{{xmlRecibido}}</pre>\n                          </p-panel>\n                          <p-panel >\n                              <header>\n                                  Response\n                              </header>\n                              <pre lang=\"xml\" >{{xmlRespuesta}}</pre>\n                          </p-panel>\n\n                          <p-panel >\n                              <header>\n                                  Detalle ejecución\n                              </header>\n                              <form class=\"form-horizontal\">\n                                  <div class=\"form-group\">\n                                      <label class=\"col-md-4 control-label\">ID</label>\n                                      <div class=\"col-md-4\">\n                                          <p class=\"form-control-static\">{{idM2Kinfo}}</p>\n                                      </div>\n                                  </div>\n                          \n                                  <div class=\"col-md-6\">\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Región</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ region}}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Acción</label>\n                                          <div class=\"col-md-4\">\n                                               <p class=\"form-control-static\">{{accion }}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Usuario</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\"> {{usuario }}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Servicio</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ servicio}}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Tipo de conector</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{tipoConector }} </p>\n                                          </div>\n                                      </div>\n                                  </div>\n                                  <div class=\"col-md-6\">\n                          \n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Fecha de inicio</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ fechaInicio}}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Tiempo del conector</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{tiempoConector }}  ms</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Tiempo total</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ tiempoTotal }}  ms</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">IP</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ ip }}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Instancia</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ instancia }}</p>\n                                          </div>\n                                      </div>\n                                      <div class=\"form-group\">\n                                          <label class=\"col-md-4 control-label\">Tipo de Respuesta</label>\n                                          <div class=\"col-md-4\">\n                                              <p class=\"form-control-static\">{{ tipoRespuesta }} </p>\n                                          </div>\n                                      </div>              \n                                      \n                                  </div>\n                              </form>\n                          </p-panel>    \n\n                        </div>    \n                        \n                        <div class=\"row\" *ngIf=\"showNoInfoWSM2K\">\n                          No se encontró información en la bitácora WS-M2K\n                        </div>\n\n                        </div>\n\n                      </form>\n                      </div>\n                    </div>\n                  </div>  \n\n                                 \n"

/***/ }),

/***/ "./src/app/soporte-bg/detalles-ei/detalles-ei.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetallesEiComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_petition_search_petition_service__ = __webpack_require__("./src/app/search-petition/search-petition.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__ = __webpack_require__("./src/app/soporte-bg/soporte-bg.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DetallesEiComponent = (function () {
    function DetallesEiComponent(http, service, searchPetitionService, alertService) {
        this.http = http;
        this.service = service;
        this.searchPetitionService = searchPetitionService;
        this.alertService = alertService;
        //solicitudesEI:SolicitudEI[];
        this.solicitudesEI = [{ "idSolicitud": 0, "tramite": 0, "grupoNacional": 0, "aplicacion": "0", "estatus": null, "mensaje": "", "fechaIngreso": "", "fechaEjecucion": "", "envioRespuesta": "", "idComudidad": 0, "tipo": "" }];
        this.solicitudesAux = [{ "idSolicitud": 0, "tramite": 0, "grupoNacional": 0, "aplicacion": "0", "estatus": null, "mensaje": "", "fechaIngreso": "", "fechaEjecucion": "", "envioRespuesta": "", "idComudidad": 0, "tipo": "" }];
        this.solicitudEI = new __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__["c" /* SolicitudEI */](0, 0, 0, "0", "", "", "", "", "", "", 0);
        this.detalleSolicitud = new __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__["a" /* DetalleSolicitud */]("", "", "", "", "", "", "", "", "", "", "", "", 0, "", "", "", "", false);
        this.mensajeSoporte = "";
        this.movimientoEI = new __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__["b" /* MovimientoEI */](0, 0, "", "", 0, "", "", "", 0, "", 0, "", "");
        this.showNoResults = true;
        this.showResults = false;
        this.showDetail = false;
        this.showSearching = false;
        this.showInfoWSM2K = true;
        this.showNoInfoWSM2K = false;
        this.showBotonReproceso = false;
        this.idpetition = "";
    }
    DetallesEiComponent.prototype.ngOnInit = function () {
    };
    DetallesEiComponent.prototype.consultaMovimiento = function () {
        var _this = this;
        this.showSearching = true;
        this.showNoResults = false;
        this.solicitudesEI = this.solicitudesAux;
        console.log("consultando moviemiento con: " + this.telefono + " : " + this.fechaTramite);
        this.service.getSolitudesPorTelefono(this.telefono).subscribe(function (p) {
            _this.solicitudesEI = p;
            console.log("solicitudes encontradas: " + _this.solicitudesEI.length);
            if (_this.solicitudesEI.length > 0 && _this.solicitudesEI[0].idSolicitud != 0) {
                _this.showResults = true;
                _this.showNoResults = false;
                _this.showDetail = false;
                _this.showSearching = false;
            }
            else {
                _this.showResults = false;
                _this.showNoResults = true;
                _this.showDetail = false;
                _this.showSearching = false;
            }
        });
    };
    DetallesEiComponent.prototype.selectSolicitud = function (solicitudSeleccionada) {
        var _this = this;
        this.solicitudEI = solicitudSeleccionada;
        this.showDetail = true;
        this.mensajeSoporte = "";
        console.log("datos de consulta solicitud,telefono: " + this.solicitudEI.idSolicitud + "," + this.telefono);
        this.service.getDetalleSolicitud(this.telefono, this.solicitudEI.idSolicitud, this.solicitudEI.estatus).subscribe(function (p) {
            _this.detallesSolicitudes = p;
            _this.detalleSolicitud = _this.detallesSolicitudes[0];
            console.log("bandera reproceso: " + _this.detalleSolicitud.banderaReproceso);
            _this.showBotonReproceso = _this.detalleSolicitud.banderaReproceso;
        });
        this.service.getMovimientosEI(this.telefono, this.solicitudEI.idSolicitud).subscribe(function (p) {
            _this.movimientosEI = p;
        });
    };
    DetallesEiComponent.prototype.searchPetition = function (movimiento) {
        var _this = this;
        delete this.infoRegistro;
        this.movimientoEI = movimiento;
        this.idpetition = this.movimientoEI.idPeticion;
        console.log("id peticion: " + this.idpetition);
        if (this.idpetition != null) {
            this.searchPetitionService.getInfoRegistroById(this.idpetition).subscribe(function (p) {
                _this.infoRegistro = p;
                _this.xmlRespuesta = _this.infoRegistro.xmlRespuesta;
                _this.xmlRecibido = _this.infoRegistro.xmlEntrada;
                _this.idM2Kinfo = _this.infoRegistro.idPeticion;
                _this.region = _this.infoRegistro.region;
                _this.accion = _this.infoRegistro.accion;
                _this.usuario = _this.infoRegistro.usuario;
                _this.servicio = _this.infoRegistro.funcion;
                _this.tipoConector = _this.infoRegistro.tipoConector;
                _this.fechaInicio = _this.infoRegistro.fechaInicio;
                _this.tiempoConector = _this.infoRegistro.tiempoTotalConector;
                _this.tiempoTotal = _this.infoRegistro.tiempoTotalWeb;
                _this.ip = _this.infoRegistro.ip;
                _this.instancia = _this.infoRegistro.instancia;
                _this.tipoRespuesta = _this.infoRegistro.tipoRespuesta;
                if (_this.idM2Kinfo.length > 1) {
                    _this.showNoInfoWSM2K = false;
                    _this.showInfoWSM2K = true;
                }
                else {
                    _this.showNoInfoWSM2K = true;
                    _this.showInfoWSM2K = false;
                }
            }, function (err) {
                _this.alertService.push({ severity: 'info', summary: 'B�squeda', detail: "No se encontraron resultados" });
            });
        }
        else {
            this.showNoInfoWSM2K = true;
            this.showInfoWSM2K = false;
        }
        //console.log("xml regresado: "+this.infoRegistro.xmlRespuesta );
    };
    DetallesEiComponent.prototype.activarTimer = function () {
        var _this = this;
        console.log("activar timer");
        this.service.activarTimer().subscribe(function (p) {
            _this.responseSoporte = p;
            _this.mensajeSoporte = _this.responseSoporte[0].mensaje;
        });
    };
    DetallesEiComponent.prototype.actualizaEstatusSolicitud = function () {
        var _this = this;
        console.log("actualizando solicitud");
        this.service.actualizaEstatusSolicitud(this.telefono, this.solicitudEI.idSolicitud).subscribe(function (p) {
            _this.responseSoporte = p;
            _this.mensajeSoporte = _this.responseSoporte[0].mensaje;
        });
    };
    return DetallesEiComponent;
}());
DetallesEiComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-detalles-ei',
        template: __webpack_require__("./src/app/soporte-bg/detalles-ei/detalles-ei.component.html"),
        styles: [__webpack_require__("./src/app/soporte-bg/detalles-ei/detalles-ei.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__["d" /* SoporteBgService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__soporte_bg_service__["d" /* SoporteBgService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__search_petition_search_petition_service__["b" /* SearchPetitionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__search_petition_search_petition_service__["b" /* SearchPetitionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _d || Object])
], DetallesEiComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/detalles-ei.component.js.map

/***/ }),

/***/ "./src/app/soporte-bg/soporte-bg.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoporteBgModule", function() { return SoporteBgModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__soporte_bg_service__ = __webpack_require__("./src/app/soporte-bg/soporte-bg.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__detalles_ei_detalles_ei_component__ = __webpack_require__("./src/app/soporte-bg/detalles-ei/detalles-ei.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__soporte_bg_routing__ = __webpack_require__("./src/app/soporte-bg/soporte-bg.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__search_petition_search_petition_service__ = __webpack_require__("./src/app/search-petition/search-petition.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var SoporteBgModule = (function () {
    function SoporteBgModule() {
    }
    return SoporteBgModule;
}());
SoporteBgModule = __decorate([
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
            __WEBPACK_IMPORTED_MODULE_7__soporte_bg_routing__["a" /* SoporteBGRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__detalles_ei_detalles_ei_component__["a" /* DetallesEiComponent */]], providers: [
            __WEBPACK_IMPORTED_MODULE_5__soporte_bg_service__["d" /* SoporteBgService */], __WEBPACK_IMPORTED_MODULE_8__search_petition_search_petition_service__["b" /* SearchPetitionService */]
        ]
    })
], SoporteBgModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/soporte-bg.module.js.map

/***/ }),

/***/ "./src/app/soporte-bg/soporte-bg.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoporteBGRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detalles_ei_detalles_ei_component__ = __webpack_require__("./src/app/soporte-bg/detalles-ei/detalles-ei.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'detalle-ei',
        component: __WEBPACK_IMPORTED_MODULE_2__detalles_ei_detalles_ei_component__["a" /* DetallesEiComponent */]
    }
];
var SoporteBGRoutingModule = (function () {
    function SoporteBGRoutingModule() {
    }
    return SoporteBGRoutingModule;
}());
SoporteBGRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], SoporteBGRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/soporte-bg.routing.js.map

/***/ }),

/***/ "./src/app/soporte-bg/soporte-bg.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SolicitudEI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleSolicitud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MovimientoEI; });
/* unused harmony export ResponseSoporte */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SoporteBgService; });
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




var SolicitudEI = (function () {
    function SolicitudEI(idSolicitud, tramite, grupoNacional, tipo, aplicacion, estatus, mensaje, fechaIngreso, fechaEjecucion, envioRespuesta, idComudidad) {
        this.idSolicitud = idSolicitud;
        this.tramite = tramite;
        this.grupoNacional = grupoNacional;
        this.tipo = tipo;
        this.aplicacion = aplicacion;
        this.estatus = estatus;
        this.mensaje = mensaje;
        this.fechaIngreso = fechaIngreso;
        this.fechaEjecucion = fechaEjecucion;
        this.envioRespuesta = envioRespuesta;
        this.idComudidad = idComudidad;
    }
    return SolicitudEI;
}());

var DetalleSolicitud = (function () {
    function DetalleSolicitud(telefono, region, estatusDetalle, codigoDetalle, fechaEjecucionDetalle, mensajeDetalle, productoDetalle, usuario, tipoGrupo, productoLocal, productoNacional, productoExt, pivote, serviceOffering, estatusProductoLocal, estatusProductoNacional, estatusProductoExt, banderaReproceso) {
        this.telefono = telefono;
        this.region = region;
        this.estatusDetalle = estatusDetalle;
        this.codigoDetalle = codigoDetalle;
        this.fechaEjecucionDetalle = fechaEjecucionDetalle;
        this.mensajeDetalle = mensajeDetalle;
        this.productoDetalle = productoDetalle;
        this.usuario = usuario;
        this.tipoGrupo = tipoGrupo;
        this.productoLocal = productoLocal;
        this.productoNacional = productoNacional;
        this.productoExt = productoExt;
        this.pivote = pivote;
        this.serviceOffering = serviceOffering;
        this.estatusProductoLocal = estatusProductoLocal;
        this.estatusProductoNacional = estatusProductoNacional;
        this.estatusProductoExt = estatusProductoExt;
        this.banderaReproceso = banderaReproceso;
    }
    return DetalleSolicitud;
}());

var MovimientoEI = (function () {
    function MovimientoEI(id, idSolicitud, telefono, region, consecutivo, estatus, mensaje, fechaEjecucion, grupoNacional, producto, tipo, pivote, idPeticion) {
        this.id = id;
        this.idSolicitud = idSolicitud;
        this.telefono = telefono;
        this.region = region;
        this.consecutivo = consecutivo;
        this.estatus = estatus;
        this.mensaje = mensaje;
        this.fechaEjecucion = fechaEjecucion;
        this.grupoNacional = grupoNacional;
        this.producto = producto;
        this.tipo = tipo;
        this.pivote = pivote;
        this.idPeticion = idPeticion;
    }
    return MovimientoEI;
}());

var ResponseSoporte = (function () {
    function ResponseSoporte(mensaje, respuesta) {
        this.mensaje = mensaje;
        this.respuesta = respuesta;
    }
    return ResponseSoporte;
}());

function toSolicitudEI(r) {
    var solicitudEI = ({
        idSolicitud: r.idSolicitud,
        tramite: r.tramite,
        grupoNacional: r.grupoNacional,
        tipo: r.tipo,
        aplicacion: r.aplicacion,
        estatus: r.estatus,
        mensaje: r.mensaje,
        fechaIngreso: r.fechaIngreso,
        fechaEjecucion: r.fechaEjecucion,
        envioRespuesta: r.envioRespuesta,
        idComudidad: r.idComudidad
    });
    return solicitudEI;
}
function toDetalleSolicitud(r) {
    var detalleSolicitud = ({
        telefono: r.telefono,
        region: r.region,
        estatusDetalle: r.estatusDetalle,
        codigoDetalle: r.codigoDetalle,
        fechaEjecucionDetalle: r.fechaEjecucionDetalle,
        mensajeDetalle: r.mensajeDetalle,
        productoDetalle: r.productoDetalle,
        usuario: r.usuario,
        tipoGrupo: r.tipoGrupo,
        productoLocal: r.productoLocal,
        productoNacional: r.productoNacional,
        productoExt: r.productoExt,
        pivote: r.pivote,
        serviceOffering: r.serviceOffering,
        estatusProductoLocal: r.estatusProductoLocal,
        estatusProductoNacional: r.estatusProductoNacional,
        estatusProductoExt: r.estatusProductoExt,
        banderaReproceso: r.banderaReproceso
    });
    return detalleSolicitud;
}
function toMovimientoEI(r) {
    var movimientoEI = ({
        id: r.id,
        idSolicitud: r.idSolicitud,
        telefono: r.telefono,
        region: r.region,
        consecutivo: r.consecutivo,
        estatus: r.estatus,
        mensaje: r.mensaje,
        fechaEjecucion: r.fechaEjecucion,
        grupoNacional: r.grupoNacional,
        producto: r.producto,
        tipo: r.tipo,
        pivote: r.pivote,
        idPeticion: r.idPeticion
    });
    return movimientoEI;
}
function toResponseSoporte(r) {
    var movimientoEI = ({
        mensaje: r.mensaje,
        respuesta: r.respuesta
    });
    return movimientoEI;
}
function mapSolicitudEI(response) {
    var parsedIncidencias = response.json().map(toSolicitudEI);
    return parsedIncidencias;
}
function mapDetalleSolicitud(response) {
    var parsedDetalleSolicitud = response.json().map(toDetalleSolicitud);
    return parsedDetalleSolicitud;
}
function mapMovimientoEI(response) {
    var parsedDetalleSolicitud = response.json().map(toMovimientoEI);
    return parsedDetalleSolicitud;
}
function mapResponseSoporte(response) {
    var parsedDetalleSolicitud = response.json().map(toResponseSoporte);
    return parsedDetalleSolicitud;
}
var SoporteBgService = (function () {
    function SoporteBgService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
    }
    SoporteBgService.prototype.getSolitudesPorTelefono = function (telefono) {
        return this.globalService.get(this.baseUrl + "/soporte-bg/consultaPorTelefono?telefono=" + telefono, mapSolicitudEI);
    };
    SoporteBgService.prototype.getDetalleSolicitud = function (telefono, idSolicitud, estatus) {
        return this.globalService.get(this.baseUrl + "/soporte-bg/consultaDetalle?telefono=" + telefono + "&idSolicitud=" + idSolicitud + "&estatus=" + estatus, mapDetalleSolicitud);
    };
    SoporteBgService.prototype.getMovimientosEI = function (telefono, idSolicitud) {
        return this.globalService.get(this.baseUrl + "/soporte-bg/consultaMovimientos?telefono=" + telefono + "&idSolicitud=" + idSolicitud, mapMovimientoEI);
    };
    SoporteBgService.prototype.activarTimer = function () {
        return this.globalService.get(this.baseUrl + "/soporte-bg/activaTimerBG", mapResponseSoporte);
    };
    SoporteBgService.prototype.actualizaEstatusSolicitud = function (telefono, idSolicitud) {
        return this.globalService.get(this.baseUrl + "/soporte-bg/actualizaEstatusSolicitud?telefono=" + telefono + "&idSolicitud=" + idSolicitud, mapResponseSoporte);
    };
    return SoporteBgService;
}());
SoporteBgService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object])
], SoporteBgService);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/soporte-bg.service.js.map

/***/ })

});
//# sourceMappingURL=soporte-bg.module.chunk.js.map