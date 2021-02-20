webpackJsonp(["encryption-credential.module"],{

/***/ "./src/app/encryption-credential/encryption-credential.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptionCredentialModule", function() { return EncryptionCredentialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__encryption_credential_service__ = __webpack_require__("./src/app/encryption-credential/encryption-credential.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__encryption_credential_routing__ = __webpack_require__("./src/app/encryption-credential/encryption-credential.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__encryption_encryption_component__ = __webpack_require__("./src/app/encryption-credential/encryption/encryption.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__encryption_validate_encryption_validate_component__ = __webpack_require__("./src/app/encryption-credential/encryption-validate/encryption-validate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__help_encryption_help_component__ = __webpack_require__("./src/app/encryption-credential/help/encryption_help.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var EncryptionCredentialModule = (function () {
    function EncryptionCredentialModule() {
    }
    return EncryptionCredentialModule;
}());
EncryptionCredentialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SelectButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_6__encryption_credential_routing__["a" /* EncryptionCredentialRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MessagesModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__encryption_encryption_component__["a" /* EncryptionComponent */], __WEBPACK_IMPORTED_MODULE_8__encryption_validate_encryption_validate_component__["a" /* EncryptionValidateComponent */], __WEBPACK_IMPORTED_MODULE_9__help_encryption_help_component__["a" /* HelpComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__encryption_credential_service__["a" /* EncryptionCredentialService */]
        ]
    })
], EncryptionCredentialModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption-credential.module.js.map

/***/ }),

/***/ "./src/app/encryption-credential/encryption-credential.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncryptionCredentialRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__encryption_encryption_component__ = __webpack_require__("./src/app/encryption-credential/encryption/encryption.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__encryption_validate_encryption_validate_component__ = __webpack_require__("./src/app/encryption-credential/encryption-validate/encryption-validate.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: 'generate',
        component: __WEBPACK_IMPORTED_MODULE_2__encryption_encryption_component__["a" /* EncryptionComponent */]
    },
    {
        path: 'validate',
        component: __WEBPACK_IMPORTED_MODULE_3__encryption_validate_encryption_validate_component__["a" /* EncryptionValidateComponent */]
    }
];
var EncryptionCredentialRoutingModule = (function () {
    function EncryptionCredentialRoutingModule() {
    }
    return EncryptionCredentialRoutingModule;
}());
EncryptionCredentialRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]
        ]
    })
], EncryptionCredentialRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption-credential.routing.js.map

/***/ }),

/***/ "./src/app/encryption-credential/encryption-credential.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncryptionCredentialService; });
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




var EncryptionCredentialService = (function () {
    function EncryptionCredentialService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
    }
    EncryptionCredentialService.prototype.validateCredntial = function (data) {
        return this.globalService.post(this.baseUrl + "/validate-token-pdf", data);
    };
    return EncryptionCredentialService;
}());
EncryptionCredentialService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object])
], EncryptionCredentialService);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption-credential.service.js.map

/***/ }),

/***/ "./src/app/encryption-credential/encryption-validate/encryption-validate.component.css":
/***/ (function(module, exports) {

module.exports = ".danger_marker {\r\n  color:red;\r\n  font-weight: bold;\r\n}\r\n\r\n.region{\r\n  height: 150px;\r\n  width: 300px;\r\n\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/app/encryption-credential/encryption-validate/encryption-validate.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Validador de credenciales</h2>\n<div class=\"container theme-showcase\" role=\"main\"></div>\n<form [formGroup]=\"validateForm\" class=\"form-horizontal\" (ngSubmit)=\"validateCredential()\">\n    <div class=\"form-group\">\n        <div class=\"row\">\n            <div class=\"form-group col-md-6\">\n                <label>Clave</label>\n                <span class=\"danger_marker\">*</span>\n                <app-encryption-help [ayuda]=\"ayudaClave\"></app-encryption-help>\n                <input pInputText type=\"text\" class=\"form-control\" formControlName=\"clave\"\n                       placeholder=\"Ingresa la clave del PDF\" pTooltip=\"Ingresa la clave del PDF\"/>\n                <div class=\"ui-message ui-messages-error ui-corner-all\"\n                     *ngIf=\"!validateForm.controls['clave'].valid&&validateForm.controls['clave'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Campo obligatorio\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"form-group col-md-6\">\n                <label>Folio</label>\n                <span class=\"danger_marker\">*</span>\n                <app-encryption-help [ayuda]=\"ayudaFolio\"></app-encryption-help>\n                <input pInputText type=\"text\" class=\"form-control\" formControlName=\"folio\"\n                       placeholder=\"Ingresa la clave del PDF\" pTooltip=\"Ingresa la clave del PDF\"/>\n                <div class=\"ui-message ui-messages-error ui-corner-all\"\n                     *ngIf=\"!validateForm.controls['folio'].valid&&validateForm.controls['folio'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Campo obligatorio\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"form-group col-md-6\">\n                <label>Signature</label>\n                <span class=\"danger_marker\">*</span>\n                <app-encryption-help [ayuda]=\"ayudaSignature\"></app-encryption-help>\n                <textarea class=\"form-control\" rows=\"5\" pInputTextarea autoResize=\"autoResize\"\n                          (keyup)=\"removeBreakLine($event)\" formControlName=\"signature\"\n                          pTooltip=\"Ingresa la cadena de la firma digital\"></textarea>\n                <div class=\"ui-message ui-messages-error ui-corner-all\"\n                     *ngIf=\"!validateForm.controls['signature'].valid&&validateForm.controls['signature'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Campo obligatorio\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"form-group col-md-6\" [ngClass]=\"{'has-error':formErrors.usuarioM2k}\">\n                <label class=\"control-label\" for=\"usuarioM2k\">Usuario Mobile</label>\n                <span class=\"danger_marker\">*</span>\n                <app-encryption-help [ayuda]=\"ayudaUsr\"></app-encryption-help>\n                <input pInputText type=\"text\" class=\"form-control\" required\n                [ngModel]=\"usuarioM2k\"  formControlName=\"usuarioM2k\"\n                       placeholder=\"Ingresa el usuario Mobile\" pTooltip=\"Ingresa el usuario Mobile\"/>\n                       <!-- Mensaje de Error de Validación-->\n                       <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioM2k\">{{formErrors.usuarioM2k}}</div>\n                <div class=\"ui-message ui-messages-error ui-corner-all\"\n                     *ngIf=\"!validateForm.controls['usuarioM2k'].valid&&validateForm.controls['usuarioM2k'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Campo obligatorio\n                </div>\n              </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"form-group col-md-6\" style=\"vertical-align:middle right;padding-bottom: 30px;\">\n              <label>Seleccione la region de ejecución.</label>\n              <span class=\"danger_marker\">*</span>\n              <app-encryption-help [ayuda]=\"ayudaRegion\"></app-encryption-help>\n              <p-dropdown [options]=\"regionM2k\" [style]=\"{'width':'530px'}\"   formControlName=\"regionM2k\"\n              (onChange)=\"cambioRegion()\"></p-dropdown>\n              <div class=\"ui-message ui-messages-error ui-corner-all\"\n                             *ngIf=\"!validateForm.controls['regionM2k'].valid&&validateForm.controls['regionM2k'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                        </div>\n            </div>\n           </div>\n\n\n        <div class=\"row\">\n          <div class=\"col-md-9\">\n              <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!validateForm.valid\">Validar</button>\n          </div>\n        </div>\n\n\n    </div>\n\n</form>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/encryption-credential/encryption-validate/encryption-validate.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncryptionValidateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__encryption_credential_service__ = __webpack_require__("./src/app/encryption-credential/encryption-credential.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__ = __webpack_require__("./src/app/encryption-credential/help/model/HelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_service__ = __webpack_require__("./src/app/global.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EncryptionValidateComponent = (function () {
    function EncryptionValidateComponent(service, alertService, fb, globalService) {
        this.service = service;
        this.alertService = alertService;
        this.fb = fb;
        this.globalService = globalService;
        this.prodEnvChecked = false;
        this.formErrors = {
            'programaInput': '',
            'transaccionInput': '',
            'cadenaIgtocInput': '',
            'usuarioM2k': '',
            'regionM2k': '',
        };
        this.validationMessages = {
            'usuarioM2k': {
                'required': 'El usuario MOBILE es REQUERIDO.',
                'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
                'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.',
            },
            'regionM2k': {
                'required': 'Cambio de region.',
            },
        };
    }
    EncryptionValidateComponent.prototype.ngOnInit = function () {
        this.validateForm = this.fb.group({
            'clave': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            'folio': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            'signature': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            'usuarioM2k': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            'regionM2k': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
        this.cargarAyuda();
        if (this.prodEnvChecked == true) {
            this.enviromentSelected = "Producción";
        }
        else {
            this.enviromentSelected = "Desarrollo";
        }
        this.regionM2k = [
            { label: 'R01', value: 'R01' },
            { label: 'R02', value: 'R02' },
            { label: 'R03', value: 'R03' },
            { label: 'R04', value: 'R04' },
            { label: 'R05', value: 'R05' },
            { label: 'R06', value: 'R06' },
            { label: 'R07', value: 'R07' },
            { label: 'R08', value: 'R08' },
            { label: 'R09', value: 'R09' },
        ];
        this.selectOption = 1;
    };
    EncryptionValidateComponent.prototype.validateCredential = function () {
        var _this = this;
        this.service.validateCredntial(this.validateForm.value).subscribe(function (p) {
            if (p.json.message) {
                _this.alertService.push({ severity: 'error', summary: 'Mobile2000', detail: p.json.message });
            }
            else {
                console.log(p.json.value);
                if (p.json.value) {
                    _this.alertService.push({ severity: 'success', summary: 'Credenciales válidas', detail: "Las credenciales fueron generadas de una fuente confiable" });
                }
                else {
                    _this.alertService.push({ severity: 'warn', summary: 'Credenciales inválidas', detail: "Los datos introducidos son apócrifos" });
                }
            }
        });
    };
    EncryptionValidateComponent.prototype.checkSession = function () {
    };
    EncryptionValidateComponent.prototype.cargarAyuda = function () {
        this.ayudaUsr = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Usuario Mobile', 'Usuario registrado en M2K con autoridad para ejecutar el componente en Producción.');
        this.ayudaClave = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Clave', 'Contraseña encriptada: Cadena de caracteres generada en el PDF a un lado de la etiqueta Clave.');
        this.ayudaFolio = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Folio', 'Folio de Solicitud: Cadena de caracteres generada en el PDF a un lado de la etiqueta Folio.');
        this.ayudaSignature = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Signature', 'Firma de seguridad: Cadena de caracteres generada en el PDF bajo la etiqueta Signature.');
        this.ayudaRegion = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Region', 'Opciones de region: Cambio de region operativo a nivel nacional.');
    };
    EncryptionValidateComponent.prototype.removeBreakLine = function (event) {
        if (this.validateForm.controls['signature'].value != undefined) {
            this.validateForm.controls['signature'].patchValue(this.validateForm.controls['signature'].value.replace(/(\r?\n|\r)/gm, "").replace(" ", ""));
        }
    };
    EncryptionValidateComponent.prototype.cambioRegion = function () {
        console.log(this.validateForm.controls['regionM2k'].value);
    };
    return EncryptionValidateComponent;
}());
EncryptionValidateComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-encryption-validate',
        template: __webpack_require__("./src/app/encryption-credential/encryption-validate/encryption-validate.component.html"),
        styles: [__webpack_require__("./src/app/encryption-credential/encryption-validate/encryption-validate.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__encryption_credential_service__["a" /* EncryptionCredentialService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__encryption_credential_service__["a" /* EncryptionCredentialService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__alert_service__["a" /* AlertService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__global_service__["a" /* GlobalService */]) === "function" && _d || Object])
], EncryptionValidateComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption-validate.component.js.map

/***/ }),

/***/ "./src/app/encryption-credential/encryption/encryption.component.css":
/***/ (function(module, exports) {

module.exports = ".danger_marker {\r\n  color:red;\r\n  font-weight: bold;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/encryption-credential/encryption/encryption.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Generación de credenciales WS-M2K</h2>\n\n<form [formGroup]=\"generateForm\" class=\"form-horizontal\" (ngSubmit)=\"generateCredential()\">\n    <div class=\"form-group\">\n        <div class=\"row\">\n            <div class=\"form-group col-md-6\">\n                <label>Contraseña M2K</label>\n                <app-encryption-help [ayuda]=\"ayudaPasswordM2k\"></app-encryption-help>\n                <span class=\"danger_marker\">*</span>\n                <input pInputText type=\"password\" onkeypress=\"mayus(this);\" class=\"form-control\" formControlName=\"password\"\n                       maxlength=\"8\"\n                       placeholder=\"Ingresa contraseña de Mobile 2000\" pTooltip=\"Ingresa contraseña de Mobile 2000\"/>\n                <div class=\"ui-message ui-messages-error ui-corner-all\"\n                     *ngIf=\"!generateForm.controls['password'].valid&&generateForm.controls['password'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Debe tener al menos 6 caracteres de la A-Z Mayuscula, incluidos números.\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"loading\" *ngIf=\"loading\">\n          <img src=\"../../assets/images/descarga\" />\n        </div>\n\n\n        <div class=\"row\">\n            <div class=\"col-md-1\">\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!generateForm.valid\">Generar</button>\n            </div>\n        </div>\n    </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/encryption-credential/encryption/encryption.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncryptionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__ = __webpack_require__("./src/app/encryption-credential/help/model/HelpModel.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EncryptionComponent = (function () {
    function EncryptionComponent(alertService, fb) {
        this.alertService = alertService;
        this.fb = fb;
    }
    EncryptionComponent.prototype.ngOnInit = function () {
        this.generateForm = this.fb.group({
            'password': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength[8]),
        });
        this.cargarAyuda();
        this.loading = true;
        if (!this.generateCredential) {
            alert("error en el servidor");
        }
        else {
            this.loading = false;
        }
    };
    EncryptionComponent.prototype.generateCredential = function () {
        openWindowWithPostRequest(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* endpointServer */].basePath + '/rest/generate-token-pdf/', this.generateForm.controls['password'].value);
    };
    EncryptionComponent.prototype.cargarAyuda = function () {
        this.ayudaPasswordM2k = new __WEBPACK_IMPORTED_MODULE_4__help_model_HelpModel__["a" /* Help */]('Contraseña Mobile', 'Contraseña registrado en M2K con autoridad para ejecutar el componente en Producción');
    };
    return EncryptionComponent;
}());
EncryptionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-encryption',
        template: __webpack_require__("./src/app/encryption-credential/encryption/encryption.component.html"),
        styles: [__webpack_require__("./src/app/encryption-credential/encryption/encryption.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _b || Object])
], EncryptionComponent);

function openWindowWithPostRequest(endpoint, password) {
    var winName = 'MyWindow';
    var winURL = endpoint;
    var windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    var params = { 'password': password };
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", winURL);
    form.setAttribute("target", winName);
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    window.open('', winName, windowoption);
    form.target = winName;
    form.submit();
    document.body.removeChild(form);
}
var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption.component.js.map

/***/ }),

/***/ "./src/app/encryption-credential/help/encryption_help.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/encryption-credential/help/encryption_help.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dialog header=\"Ayuda!\" [(visible)]=\"displayFormHelp\" modal=\"modal\" width=\"400\"\n         [responsive]=\"true\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"true\">\n\n         <h2>Diccionario de Ayuda</h2>\n         <span style=\"max-width: 50px;color:blue;\"><i class=\"fa fa-question-circle-o\" aria-hidden=\"true\"></i></span>\n         <label>Definición del significado de los campos de la pantalla.</label>\n         <br/>\n         <br/>\n         <ul>\n            <li *ngFor=\"let help of valoresAyuda\" style=\"text-align: left\"><b>{{help.clave}}:</b> {{help.valor}}</li>\n         </ul>\n\n        <p-footer>\n            <button style=\"float:right\" type=\"button\" pButton icon=\"fa-close\" (click)=\"cancelDialog()\" label=\"Salir\" class=\"ui-button-info\"></button>\n        </p-footer>\n</p-dialog>\n<span style=\"color:blue;float: right;\">\n<i class=\"fa fa-question-circle-o\" aria-hidden=\"true\"\n          style=\"cursor:pointer;\" (click)=\"cargarAyuda()\" pTooltip=\"Ayuda\" tooltipPosition=\"top\"></i>\n</span>\n"

/***/ }),

/***/ "./src/app/encryption-credential/help/encryption_help.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__ = __webpack_require__("./src/app/encryption-credential/help/model/HelpModel.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HelpComponent = (function () {
    function HelpComponent() {
        this.valoresAyuda = [];
    }
    HelpComponent.prototype.ngOnInit = function () {
        this.displayFormHelp = false;
    };
    HelpComponent.prototype.cargarAyuda = function () {
        this.valoresAyuda = [];
        this.valoresAyuda.push(this.ayuda);
        this.displayFormHelp = true;
    };
    HelpComponent.prototype.cancelDialog = function () {
        this.displayFormHelp = false;
    };
    HelpComponent.prototype.setValoresAyuda = function (ayuda) {
        this.valoresAyuda = ayuda;
    };
    return HelpComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__["a" /* Help */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__help_model_HelpModel__["a" /* Help */]) === "function" && _a || Object)
], HelpComponent.prototype, "ayuda", void 0);
HelpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-encryption-help',
        template: __webpack_require__("./src/app/encryption-credential/help/encryption_help.component.html"),
        styles: [__webpack_require__("./src/app/encryption-credential/help/encryption_help.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HelpComponent);

var _a;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/encryption_help.component.js.map

/***/ }),

/***/ "./src/app/encryption-credential/help/model/HelpModel.ts":
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

/***/ })

});
//# sourceMappingURL=encryption-credential.module.chunk.js.map