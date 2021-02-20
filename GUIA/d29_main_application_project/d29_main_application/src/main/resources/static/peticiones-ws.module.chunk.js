webpackJsonp(["peticiones-ws.module"],{

/***/ "./src/app/catalogos/model/M2kCatTransaccionesFront.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M2kCatTransaccionesFront; });
/* unused harmony export toM2kCatTransaccionesFront */
/* harmony export (immutable) */ __webpack_exports__["b"] = toM2kCatTransaccionesFrontList;
/* unused harmony export mapM2kCatTransaccionesFront */
/* unused harmony export mapM2kCatTransaccionesFrontList */
var M2kCatTransaccionesFront = (function () {
    function M2kCatTransaccionesFront(id, transaccion, nombrePantalla, descripcion, transaccionPantallaTransient, responsableM2k, correspondencia) {
        this.id = id;
        this.transaccion = transaccion;
        this.nombrePantalla = nombrePantalla;
        this.descripcion = descripcion;
        this.transaccionPantallaTransient = transaccionPantallaTransient;
        this.responsableM2k = responsableM2k;
        this.correspondencia = correspondencia;
    }
    M2kCatTransaccionesFront.getNewInstance = function (id) {
        return new M2kCatTransaccionesFront(id, '', '', '', '', '', '');
    };
    return M2kCatTransaccionesFront;
}());

function toM2kCatTransaccionesFront(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            transaccion: r.transaccion,
            nombrePantalla: r.nombrePantalla,
            descripcion: r.descripcion,
            transaccionPantallaTransient: r.transaccion.trim() + " (" + r.nombrePantalla.trim() + ")",
            responsableM2k: r.responsableM2k,
            correspondencia: r.correspondencia
        });
    }
    return output;
}
function toM2kCatTransaccionesFrontList(r) {
    var output = [];
    if (r) {
        output = r.map(toM2kCatTransaccionesFront);
    }
    return output;
}
function mapM2kCatTransaccionesFront(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toM2kCatTransaccionesFront(responseJson);
    }
    return output;
}
function mapM2kCatTransaccionesFrontList(response) {
    var output = [];
    var responseJson = response.json();
    if (responseJson) {
        output = responseJson.map(toM2kCatTransaccionesFront);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/M2kCatTransaccionesFront.js.map

/***/ }),

/***/ "./src/app/core/common/HttpStatusCode.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpStatusCode; });

/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 *
 * Obtained from: @see {@link https://gist.github.com/scokmen/f813c904ef79022e84ab2409574d1b45}
 */
var HttpStatusCode;
(function (HttpStatusCode) {
    /**
     * The server has received the request headers and the client should proceed to send the request body
     * (in the case of a request for which a body needs to be sent; for example, a POST request).
     * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
     * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
     * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
     */
    HttpStatusCode[HttpStatusCode["CONTINUE"] = 100] = "CONTINUE";
    /**
     * The requester has asked the server to switch protocols and the server has agreed to do so.
     */
    HttpStatusCode[HttpStatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    /**
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     * This prevents the client from timing out and assuming the request was lost.
     */
    HttpStatusCode[HttpStatusCode["PROCESSING"] = 102] = "PROCESSING";
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    /**
     * The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
     */
    HttpStatusCode[HttpStatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    /**
     * SINCE HTTP/1.1
     * The server is a transforming proxy that received a 200 OK from its origin,
     * but is returning a modified version of the origin's response.
     */
    HttpStatusCode[HttpStatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    /**
     * The server successfully processed the request and is not returning any content.
     */
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    /**
     * The server successfully processed the request, but is not returning any content.
     * Unlike a 204 response, this response requires that the requester reset the document view.
     */
    HttpStatusCode[HttpStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    /**
     * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
     * The range header is used by HTTP clients to enable resuming of interrupted downloads,
     * or split a download into multiple simultaneous streams.
     */
    HttpStatusCode[HttpStatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    /**
     * The message body that follows is an XML message and can contain a number of separate response codes,
     * depending on how many sub-requests were made.
     */
    HttpStatusCode[HttpStatusCode["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    /**
     * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
     * and are not being included again.
     */
    HttpStatusCode[HttpStatusCode["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    /**
     * The server has fulfilled a request for the resource,
     * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    HttpStatusCode[HttpStatusCode["IM_USED"] = 226] = "IM_USED";
    /**
     * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
     * For example, this code could be used to present multiple video format options,
     * to list files with different filename extensions, or to suggest word-sense disambiguation.
     */
    HttpStatusCode[HttpStatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    /**
     * This and all future requests should be directed to the given URI.
     */
    HttpStatusCode[HttpStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    /**
     * This is an example of industry practice contradicting the standard.
     * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect
     * (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302
     * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307
     * to distinguish between the two behaviours. However, some Web applications and frameworks
     * use the 302 status code as if it were the 303.
     */
    HttpStatusCode[HttpStatusCode["FOUND"] = 302] = "FOUND";
    /**
     * SINCE HTTP/1.1
     * The response to the request can be found under another URI using a GET method.
     * When received in response to a POST (or PUT/DELETE), the client should presume that
     * the server has received the data and should issue a redirect with a separate GET message.
     */
    HttpStatusCode[HttpStatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    /**
     * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
     * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
     */
    HttpStatusCode[HttpStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    /**
     * SINCE HTTP/1.1
     * The requested resource is available only through a proxy, the address for which is provided in the response.
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
     */
    HttpStatusCode[HttpStatusCode["USE_PROXY"] = 305] = "USE_PROXY";
    /**
     * No longer used. Originally meant "Subsequent requests should use the specified proxy."
     */
    HttpStatusCode[HttpStatusCode["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    /**
     * SINCE HTTP/1.1
     * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
     * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
     * For example, a POST request should be repeated using another POST request.
     */
    HttpStatusCode[HttpStatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    /**
     * The request and all future requests should be repeated using another URI.
     * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
     * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
     */
    HttpStatusCode[HttpStatusCode["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    /**
     * Reserved for future use. The original intention was that this code might be used as part of some form of digital
     * cash or micro payment scheme, but that has not happened, and this code is not usually used.
     * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.
     */
    HttpStatusCode[HttpStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    /**
     * The request was valid, but the server is refusing action.
     * The user might not have the necessary permissions for a resource.
     */
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     */
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    /**
     * A request method is not supported for the requested resource;
     * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
     */
    HttpStatusCode[HttpStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    /**
     * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
     */
    HttpStatusCode[HttpStatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    /**
     * The client must first authenticate itself with the proxy.
     */
    HttpStatusCode[HttpStatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    /**
     * The server timed out waiting for the request.
     * According to HTTP specifications:
     * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
     */
    HttpStatusCode[HttpStatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    /**
     * Indicates that the request could not be processed because of conflict in the request,
     * such as an edit conflict between multiple simultaneous updates.
     */
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    /**
     * Indicates that the resource requested is no longer available and will not be available again.
     * This should be used when a resource has been intentionally removed and the resource should be purged.
     * Upon receiving a 410 status code, the client should not request the resource in the future.
     * Clients such as search engines should remove the resource from their indices.
     * Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
     */
    HttpStatusCode[HttpStatusCode["GONE"] = 410] = "GONE";
    /**
     * The request did not specify the length of its content, which is required by the requested resource.
     */
    HttpStatusCode[HttpStatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    /**
     * The server does not meet one of the preconditions that the requester put on the request.
     */
    HttpStatusCode[HttpStatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    /**
     * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
     */
    HttpStatusCode[HttpStatusCode["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    /**
     * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,
     * in which case it should be converted to a POST request.
     * Called "Request-URI Too Long" previously.
     */
    HttpStatusCode[HttpStatusCode["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    /**
     * The request entity has a media type which the server or resource does not support.
     * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
     */
    HttpStatusCode[HttpStatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    /**
     * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
     * For example, if the client asked for a part of the file that lies beyond the end of the file.
     * Called "Requested Range Not Satisfiable" previously.
     */
    HttpStatusCode[HttpStatusCode["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    /**
     * The server cannot meet the requirements of the Expect request-header field.
     */
    HttpStatusCode[HttpStatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    /**
     * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,
     * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by
     * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.
     */
    HttpStatusCode[HttpStatusCode["I_AM_A_TEAPOT"] = 418] = "I_AM_A_TEAPOT";
    /**
     * The request was directed at a server that is not able to produce a response (for example because a connection reuse).
     */
    HttpStatusCode[HttpStatusCode["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    /**
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    HttpStatusCode[HttpStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    /**
     * The resource that is being accessed is locked.
     */
    HttpStatusCode[HttpStatusCode["LOCKED"] = 423] = "LOCKED";
    /**
     * The request failed due to failure of a previous request (e.g., a PROPPATCH).
     */
    HttpStatusCode[HttpStatusCode["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    /**
     * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
     */
    HttpStatusCode[HttpStatusCode["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    /**
     * The origin server requires the request to be conditional.
     * Intended to prevent "the 'lost update' problem, where a client
     * GETs a resource's state, modifies it, and PUTs it back to the server,
     * when meanwhile a third party has modified the state on the server, leading to a conflict."
     */
    HttpStatusCode[HttpStatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    /**
     * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
     */
    HttpStatusCode[HttpStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    /**
     * The server is unwilling to process the request because either an individual header field,
     * or all the header fields collectively, are too large.
     */
    HttpStatusCode[HttpStatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    /**
     * A server operator has received a legal demand to deny access to a resource or to a set of resources
     * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
     */
    HttpStatusCode[HttpStatusCode["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    /**
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
     */
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    /**
     * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
     * Usually this implies future availability (e.g., a new feature of a web-service API).
     */
    HttpStatusCode[HttpStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    /**
     * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
     */
    HttpStatusCode[HttpStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    /**
     * The server is currently unavailable (because it is overloaded or down for maintenance).
     * Generally, this is a temporary state.
     */
    HttpStatusCode[HttpStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    /**
     * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
     */
    HttpStatusCode[HttpStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    /**
     * The server does not support the HTTP protocol version used in the request
     */
    HttpStatusCode[HttpStatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    /**
     * Transparent content negotiation for the request results in a circular reference.
     */
    HttpStatusCode[HttpStatusCode["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    /**
     * The server is unable to store the representation needed to complete the request.
     */
    HttpStatusCode[HttpStatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    /**
     * The server detected an infinite loop while processing the request.
     */
    HttpStatusCode[HttpStatusCode["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    /**
     * Further extensions to the request are required for the server to fulfill it.
     */
    HttpStatusCode[HttpStatusCode["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    /**
     * The client needs to authenticate to gain network access.
     * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
     * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
     */
    HttpStatusCode[HttpStatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HttpStatusCode || (HttpStatusCode = {}));
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/HttpStatusCode.js.map

/***/ }),

/***/ "./src/app/core/model/Area.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Area */
/* harmony export (immutable) */ __webpack_exports__["a"] = toArea;
/* harmony export (immutable) */ __webpack_exports__["b"] = toAreaList;
/* unused harmony export mapArea */
/* unused harmony export mapAreaList */
var Area = (function () {
    function Area(id, nombre, clave, areaPadre) {
        this.id = id;
        this.nombre = nombre;
        this.clave = clave;
        this.areaPadre = areaPadre;
    }
    Area.getNewInstance = function () {
        return new Area(null, '', '', null);
    };
    return Area;
}());

function toArea(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            nombre: r.nombre,
            clave: r.clave,
            areaPadre: toArea(r.areaPadre)
        });
    }
    return output;
}
function toAreaList(r) {
    var output = [];
    if (r) {
        output = r.map(toArea);
    }
    return output;
}
function mapArea(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toArea(responseJson);
    }
    return output;
}
function mapAreaList(response) {
    var output = [];
    var responseJson = response.json();
    if (responseJson) {
        output = toAreaList(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/Area.js.map

/***/ }),

/***/ "./src/app/core/model/M2kCatUsuarios.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export M2kCatUsuarios */
/* unused harmony export toM2kCatUsuarios */
/* harmony export (immutable) */ __webpack_exports__["a"] = toM2kCatUsuariosList;
/* unused harmony export mapM2kCatUsuarios */
/* unused harmony export mapM2kCatUsuariosList */
var M2kCatUsuarios = (function () {
    function M2kCatUsuarios(id, claveUsuario, descUsuario) {
        this.id = id;
        this.claveUsuario = claveUsuario;
        this.descUsuario = descUsuario;
    }
    M2kCatUsuarios.getNewInstance = function () {
        return new M2kCatUsuarios(null, '', '');
    };
    return M2kCatUsuarios;
}());

function toM2kCatUsuarios(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            claveUsuario: r.claveUsuario,
            descUsuario: r.descUsuario
        });
    }
    return output;
}
function toM2kCatUsuariosList(r) {
    var output = [];
    if (r) {
        output = r.map(toM2kCatUsuarios);
    }
    return output;
}
function mapM2kCatUsuarios(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toM2kCatUsuarios(responseJson);
    }
    return output;
}
function mapM2kCatUsuariosList(response) {
    var output = [];
    var responseJson = response.json();
    if (responseJson) {
        output = responseJson.map(toM2kCatUsuarios);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/M2kCatUsuarios.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.css":
/***/ (function(module, exports) {

module.exports = ".noPadding {\r\n  padding: 0px;\r\n}\r\n\r\np-dropdown {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: 100%;\r\n}\r\n\r\np-spinner {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: -webkit-fit-content;\r\n  width: -moz-fit-content;\r\n  width: fit-content;\r\n}\r\n\r\np-checkbox {\r\n  color: red !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header\">\r\n  <h1>Administraci&oacute;n de Peticiones WS-M2k</h1>\r\n  <p>Aqu&iacute; podr&aacute; administrar las peticiones WS-M2k registradas</p>\r\n</div>\r\n\r\n<div *ngIf=\"!isAdmin\">\r\n  <h1>No tienes permisos sobre este m&oacute;dulo</h1>\r\n</div>\r\n\r\n<div *ngIf=\"isAdmin\" class=\"container theme-showcase\" role=\"main\">\r\n  <ul class=\"nav nav-tabs\" id=\"tablist-admin\" role=\"tablist\">\r\n    <li class=\"nav-item active\">\r\n      <a class=\"nav-link active\" id=\"tablink-search\" data-toggle=\"tab\" role=\"tab\" href=\"#tab-search\">B&uacute;squeda de Peticiones</a>\r\n    </li>\r\n    <li class=\"nav-item\">\r\n      <a class=\"nav-link\" id=\"tablink-editor\" data-toggle=\"tab\" role=\"tab\" href=\"#tab-editor\">Edici&oacute;n de Peticiones</a>\r\n    </li>\r\n  </ul>\r\n\r\n  <div class=\"tab-content\">\r\n    <div class=\"tab-pane active\" id=\"tab-search\">\r\n      <div class=\"row\" style=\"padding-top: 15px;\">\r\n        <h2>Filtros de B&uacute;squeda</h2>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ambiente\">Ambiente de Ejecuci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.ambiente\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"ambiente\" [(ngModel)]=\"peticionData.ambiente\" [options]=\"dataSelector.ambiente\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"estatus\">Estatus de la Petici&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.estatus\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"estatus\" [(ngModel)]=\"peticionData.estatus\" [options]=\"dataSelector.estatus\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"usuarioCorp\">Usuario Corporativo</label>\r\n          <simple-help [ayuda]=\"ayuda.usuarioCorp\"></simple-help>\r\n          <p-autoComplete id=\"usuarioCorp\" [(ngModel)]=\"dataAutoComplete.usuarioCorp\" [suggestions]=\"filterSelector.usuarioCorp\" [minLength]=\"2\" field=\"label\" (completeMethod)=\"onAutoComplete(USUARIO_CORP, $event)\" [dropdown]=\"true\" (onDropdownClick)=\"onAutoCompleteDropdown(USUARIO_CORP)\" (onSelect)=\"onAutoCompleteSelect(USUARIO_CORP, $event)\" [placeholder]=\"NA\"></p-autoComplete>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ip\">IP Ejecuci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.ip\"></simple-help>\r\n          <input type=\"text\" id=\"ip\" [(ngModel)]=\"peticionData.ip\" style=\"width: 100%;\" [placeholder]=\"NA\" />\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"region\">Regi&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.region\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"region\" [(ngModel)]=\"peticionData.region\" [options]=\"dataSelector.region\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"transaccion\">Transacci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.transaccion\"></simple-help>\r\n          <p-autoComplete id=\"transaccion\" [(ngModel)]=\"dataAutoComplete.transaccion\" [suggestions]=\"filterSelector.transaccion\" [minLength]=\"2\" field=\"label\" (completeMethod)=\"onAutoComplete(TRANSACCION, $event)\" [dropdown]=\"true\" (onDropdownClick)=\"onAutoCompleteDropdown(TRANSACCION)\" (onSelect)=\"onAutoCompleteSelect(TRANSACCION, $event)\" [placeholder]=\"NA\"></p-autoComplete>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ppm\">Peticiones Por Minuto</label>\r\n          <simple-help [ayuda]=\"ayuda.ppm\"></simple-help>\r\n          <div>\r\n            <p-spinner id=\"ppm\" [(ngModel)]=\"peticionData.peticionesPorMinuto\" [min]=\"0\" maxlength=\"10\" [formatInput]=\"false\" [placeholder]=\"NA\"></p-spinner>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"solicitudPeticion\">ID Solicitud</label>\r\n          <simple-help [ayuda]=\"ayuda.solicitudPeticion\"></simple-help>\r\n          <div>\r\n            <p-spinner id=\"solicitudPeticion\" [(ngModel)]=\"peticionData.solicitudPeticion\" [min]=\"0\" maxlength=\"10\" [formatInput]=\"false\" [placeholder]=\"NA\"></p-spinner>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <div class=\"col-md-6 form-group\">\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClickFilterSearch()\">Filtrar Peticiones</button>\r\n        </div>\r\n        <div class=\"col-md-6 form-group\">\r\n          <div>\r\n            <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickFilterClear()\">Borrar Filtros</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <p-dataTable id=\"dtPeticiones\" #dtPeticiones [value]=\"listPeticionData\" dataKey=\"id\" emptyMessage=\"Sin Peticiones\"\r\n                      [responsive]=\"true\" [paginator]=\"true\" [rows]=\"DEFAULT_PAGE_SIZE\" [pageLinks]=\"5\" [immutable]=\"false\"\r\n                      [lazy]=\"true\" (onLazyLoad)=\"onLazyLoadData($event)\" [totalRecords]=\"paginator.totalElements\">\r\n          <p-header><b>Total de Peticiones WS-M2k: </b>{{paginator.totalElements}}</p-header>\r\n          <p-column *ngFor=\"let col of tableCols\" [header]=\"col.header\" [field]=\"col.field\"></p-column>\r\n          <p-column header=\"Editando\" field=\"repetida\" styleClass=\"col-button\" [style]=\"{'width':'70px', 'text-align': 'center'}\">\r\n            <ng-template let-col let-row=\"rowData\" pTemplate=\"body\">\r\n              <p-checkbox [(ngModel)]=\"row[col.field]\" binary=\"true\" [disabled]=\"true\" [ngModelOptions]=\"{standalone: true}\"></p-checkbox>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-info\" icon=\"fa fa-pencil\" pTooltip=\"Agregar a Ediciones\" tooltipPosition=\"left\" (click)=\"onClickRowEdit(row)\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" pTooltip=\"Quitar de Ediciones\" tooltipPosition=\"left\" (click)=\"onClickRowDelete(row['id'])\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-footer>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-info\" icon=\"fa fa-check\" label=\"Autorizar Todas\" (click)=\"onClickAccionGlobal(AUTORIZAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-warning\" icon=\"fa fa-ban\" label=\"Rechazar Todas\" (click)=\"onClickAccionGlobal(RECHAZAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" label=\"Eliminar Todas\" (click)=\"onClickAccionGlobal(ELIMINAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-success\" icon=\"fa fa-pencil\" label=\"Editar Todas\" (click)=\"onClickAccionGlobal(ACTUALIZAR)\"></button>\r\n              </div>\r\n            </div>\r\n          </p-footer>\r\n        </p-dataTable>\r\n      </div>\r\n    </div><!-- /tab-search -->\r\n    <div class=\"tab-pane\" id=\"tab-editor\">\r\n      <div class=\"row\" style=\"padding-top: 15px;\">\r\n        <h2>Campos de Edici&oacute;n</h2>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ambienteEdit\">Ambiente de Ejecuci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.ambiente\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"ambienteEdit\" [(ngModel)]=\"peticionDataEdit.ambiente\" [options]=\"dataSelector.ambiente\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ambiente\"><i class=\"fa fa-close\"></i> {{formErrors.ambiente}}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"estatusEdit\">Estatus de la Petici&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.estatus\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"estatusEdit\" [(ngModel)]=\"peticionDataEdit.estatus\" [options]=\"dataSelector.estatus\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.estatus\"><i class=\"fa fa-close\"></i> {{formErrors.estatus}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"usuarioCorpEdit\">Usuario Corporativo</label>\r\n          <simple-help [ayuda]=\"ayuda.usuarioCorp\"></simple-help>\r\n          <p-autoComplete id=\"usuarioCorpEdit\" [(ngModel)]=\"dataAutoCompleteEdit.usuarioCorp\" [suggestions]=\"filterSelector.usuarioCorp\" [minLength]=\"2\" field=\"label\" (completeMethod)=\"onAutoComplete(USUARIO_CORP, $event)\" [dropdown]=\"true\" (onDropdownClick)=\"onAutoCompleteDropdown(USUARIO_CORP)\" (onSelect)=\"onAutoCompleteSelect(USUARIO_CORP, $event, true)\" [placeholder]=\"NA\"></p-autoComplete>\r\n          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioCorp\"><i class=\"fa fa-close\"></i> {{formErrors.usuarioCorp}}</div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ipEdit\">IP Ejecuci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.ip\"></simple-help>\r\n          <input type=\"text\" id=\"ipEdit\" [(ngModel)]=\"peticionDataEdit.ip\" style=\"width: 100%;\" [placeholder]=\"NA\" />\r\n          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ip\"><i class=\"fa fa-close\"></i> {{formErrors.ip}}</div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"regionEdit\">Regi&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.region\"></simple-help>\r\n          <div>\r\n            <p-dropdown id=\"regionEdit\" [(ngModel)]=\"peticionDataEdit.region\" [options]=\"dataSelector.region\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.region\"><i class=\"fa fa-close\"></i> {{formErrors.region}}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"transaccionEdit\">Transacci&oacute;n</label>\r\n          <simple-help [ayuda]=\"ayuda.transaccion\"></simple-help>\r\n          <p-autoComplete id=\"transaccionEdit\" [(ngModel)]=\"dataAutoCompleteEdit.transaccion\" [suggestions]=\"filterSelector.transaccion\" [minLength]=\"2\" field=\"label\" (completeMethod)=\"onAutoComplete(TRANSACCION, $event)\" [dropdown]=\"true\" (onDropdownClick)=\"onAutoCompleteDropdown(TRANSACCION)\" (onSelect)=\"onAutoCompleteSelect(TRANSACCION, $event, true)\" [placeholder]=\"NA\"></p-autoComplete>\r\n          <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.transaccion\"><i class=\"fa fa-close\"></i> {{formErrors.transaccion}}</div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"ppmEdit\">Peticiones Por Minuto</label>\r\n          <simple-help [ayuda]=\"ayuda.ppm\"></simple-help>\r\n          <div>\r\n            <p-spinner id=\"ppmEdit\" [(ngModel)]=\"peticionDataEdit.peticionesPorMinuto\" [min]=\"0\" maxlength=\"10\" [formatInput]=\"false\" [placeholder]=\"NA\"></p-spinner>\r\n            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ppm\"><i class=\"fa fa-close\"></i> {{formErrors.ppm}}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-2 form-group\">\r\n          <label class=\"control-label\" for=\"solicitudPeticionEdit\">ID Solicitud</label>\r\n          <simple-help [ayuda]=\"ayuda.solicitudPeticion\"></simple-help>\r\n          <div>\r\n            <p-spinner id=\"solicitudPeticionEdit\" [(ngModel)]=\"peticionDataEdit.solicitudPeticion\" [min]=\"-1\" maxlength=\"10\" [formatInput]=\"false\" [placeholder]=\"NA\"></p-spinner>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <div class=\"col-md-4 form-group\">\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClickMultiEdit()\">Editar Peticiones</button>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <button type=\"button\" class=\"btn btn-success\" (click)=\"onClickAddNewPeticion()\">Agregar Petici&oacute;n</button>\r\n        </div>\r\n        <div class=\"col-md-4 form-group\">\r\n          <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickClearEditFileds()\">Borrar Campos</button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 10px;\">\r\n        <p-dataTable id=\"dtSelected\" #dtSelected [value]=\"listSelPeticionData\" dataKey=\"id\" emptyMessage=\"Sin Peticiones Para Editar\"\r\n                      [responsive]=\"true\" [paginator]=\"true\" [rows]=\"DEFAULT_PAGE_SIZE\" [pageLinks]=\"5\" [immutable]=\"false\">\r\n          <p-header>Editando (<b>{{listSelPeticionData.length}}</b>) Peticiones WS-M2k</p-header>\r\n          <p-column *ngFor=\"let col of tableCols\" [header]=\"col.header\" [field]=\"col.field\"></p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-info\" icon=\"fa fa-copy\" pTooltip=\"Copiar Datos\" tooltipPosition=\"left\" (click)=\"onClickRowCopy(row)\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" pTooltip=\"Quitar de Tabla\" tooltipPosition=\"left\" (click)=\"onClickRowDelete(row['id'])\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-footer>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-info\" icon=\"fa fa-check\" label=\"Autorizar Seleccionadas\" (click)=\"onClickAccion(AUTORIZAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-warning\" icon=\"fa fa-ban\" label=\"Rechazar Seleccionadas\" (click)=\"onClickAccion(RECHAZAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" label=\"Eliminar Seleccionadas\" (click)=\"onClickAccion(ELIMINAR)\"></button>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <button type=\"button\" pButton class=\"ui-button-success\" icon=\"fa fa-pencil\" label=\"Registrar Cambios\" (click)=\"onClickAccion(ACTUALIZAR)\"></button>\r\n              </div>\r\n            </div>\r\n          </p-footer>\r\n        </p-dataTable>\r\n      </div>\r\n\r\n      <div class=\"row\" style=\"padding-top: 50px;\">\r\n        <div class=\"col-md-12 form-group\">\r\n          <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickClearEdits()\">Borrar Tabla Ediciones</button>\r\n        </div>\r\n      </div>\r\n    </div><!-- /tab-editor -->\r\n  </div><!-- /tab-content -->\r\n</div><!-- /container -->\r\n\r\n<!-- MODAL CONFIRMACION -->\r\n<div class=\"modal fade\" id=\"modalConfirmacion\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modalConfirmacionLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header text-center\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <h4 class=\"modal-title\" id=\"modalConfirmacionLabel\">{{selAccionName}} Peticiones WS-M2k</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n          <p><b>Marcar la siguiente casilla para registrar los cambios en caliente</b></p>\r\n          <div class=\"col-md-12\">\r\n            <div>\r\n              <p-checkbox id=\"urgente\" [(ngModel)]=\"isUrgente\" label=\"Enviar a Producci&oacute;n\" binary=\"true\"></p-checkbox>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickDialogCancel()\">Cancelar</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClickDialogOK()\">Proceder</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPeticionesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__ = __webpack_require__("./src/app/core/common/HttpStatusCode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_PeticionPaginator__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionPaginator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__ = __webpack_require__("./src/app/peticiones-ws/utils/FormValidationType.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/CommonUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__model_WrapPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/WrapPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionData.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var DataAutoComplete = (function () {
    function DataAutoComplete(usuarioCorp, transaccion) {
        this.usuarioCorp = usuarioCorp;
        this.transaccion = transaccion;
    }
    DataAutoComplete.getNewInstance = function () {
        return new DataAutoComplete({}, {});
    };
    return DataAutoComplete;
}());
var AdminPeticionesComponent = (function () {
    function AdminPeticionesComponent(service, authService, alertService) {
        this.service = service;
        this.authService = authService;
        this.alertService = alertService;
        this.DEFAULT_PAGE_SIZE = 10;
        this.AUTORIZAR = __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].AUTORIZADA;
        this.RECHAZAR = __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].RECHAZADA;
        this.ELIMINAR = __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].ELIMINADA;
        this.ACTUALIZAR = __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].REVISION;
        this.USUARIO_CORP = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].usuarioCorp;
        this.TRANSACCION = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].transaccion;
        this.MAX_PETICIONES = 50;
        this.MODAL_ID = '#modalConfirmacion';
        this.NA = '[N/A]';
        this.FILTER_NULL_VALUE = '-';
        this.initColumns();
        this.initForm();
        this.initAyuda();
        this.initSelectors();
    }
    AdminPeticionesComponent.prototype.initColumns = function () {
        this.tableCols = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getColumns();
    };
    AdminPeticionesComponent.prototype.initForm = function () {
        var _this = this;
        this.formMessages = {};
        this.formErrors = {};
        var msgRequired = __WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].getDefaultMessage(__WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED);
        __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].getKeysPeticion().forEach(function (key) {
            _this.formMessages[key] = {};
            _this.formMessages[key][__WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED] = msgRequired;
            _this.formErrors[key] = '';
        });
        this.formMessages[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ip][__WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].FORMAT] = 'Formato IP incorrecto';
    };
    AdminPeticionesComponent.prototype.setFormError = function (key, validation) {
        this.formErrors[key] = '';
        if (validation) {
            this.formErrors[key] = this.formMessages[key][validation];
        }
    };
    AdminPeticionesComponent.prototype.resetFormErrors = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].getKeysPeticion().forEach(function (key) {
            _this.setFormError(key);
        });
    };
    AdminPeticionesComponent.prototype.initAyuda = function () {
        this.ayuda = {};
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].usuarioCorp] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Usuario Corporativo', 'Usuario corporativo de la petición (* = cualquier usuario corporativo)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ip] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('IP', 'Dirección IP desde donde es ejecutado el servicio web (* = cualquier IP)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].region] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Región', 'Número de la región (1 - 9) de la petición (* = cualquier región)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].transaccion] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Transacción', 'Transacción de la petición web (* = cualquier transacción)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ppm] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Peticiones Por Minuto', 'Número máximo de llamadas por minuto que se invoca el servicio web (0 = ignorar cantidad)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ambiente] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Ambiente Ejecución', 'Tipo de ambiente en donde se consumirá el servicio web');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].estatus] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Estatus Petición', 'Estatus de la petición');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].solicitudPeticion] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('ID Solicitud', 'ID de la solicitud en la que se encuentra registrada la petición (0 = ignorar ID, -1 = borrar ID)');
    };
    AdminPeticionesComponent.prototype.initSelectors = function () {
        var _this = this;
        this.dataSelector = {};
        this.filterSelector = {};
        __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].getKeysPeticion().forEach(function (key) {
            _this.dataSelector[key] = [];
        });
        var key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].region;
        this.dataSelector[key] = [
            { label: this.NA, value: '0' },
            { label: __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD, value: '10' },
        ];
        for (var i = 1; i < 10; i++) {
            this.dataSelector[key].push({ label: "" + i, value: "" + i });
        }
        key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ambiente;
        this.dataSelector[key].push({ label: this.NA, value: this.NA });
        __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["a" /* EnumAmbiente */].getNameValuePairs().forEach(function (data) {
            _this.dataSelector[key].push({ label: data.name, value: data.name });
        });
        this.dataSelector[key].push({ label: __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["a" /* EnumAmbiente */].N_SICATEL, value: __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["a" /* EnumAmbiente */].N_SICATEL });
        key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].estatus;
        this.dataSelector[key].push({ label: this.NA, value: this.NA });
        __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].getNameValuePairs().forEach(function (data) {
            _this.dataSelector[key].push({ label: data.name, value: data.name });
        });
        this.dataSelector[key].push({ label: __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].N_ELIMINADA, value: __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].N_ELIMINADA });
    };
    AdminPeticionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario = this.service.getSessionUser();
        this.isAdmin = false;
        this.service.getPeticionPropertiesByUsuario(this.usuario.id).subscribe(function (data) {
            _this.peticionProperties = data;
            _this.usuarioProperties = _this.peticionProperties.usuarioProperties;
            _this.isAdmin = _this.usuarioProperties.administrador;
            _this.createLists();
        }, function (error) {
            console.log('error: ', error);
        });
        this.maxRecords = -1;
        this.paginator = __WEBPACK_IMPORTED_MODULE_8__model_PeticionPaginator__["a" /* PeticionPaginator */].getNewInstance();
        this.peticionData = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getNewInstance();
        this.dataAutoComplete = DataAutoComplete.getNewInstance();
        this.filterQuery = '';
        this.isProcessBlocked = false;
        this.selAccionName = '';
        this.resetPeticionData();
    };
    AdminPeticionesComponent.prototype.createLists = function () {
        var key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].usuarioCorp;
        this.dataSelector[key] = this.peticionProperties.listM2kCatUsuarios.map(function (p) {
            return { label: __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(p.claveUsuario, true), value: __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(p.claveUsuario, true) };
        });
        this.dataSelector[key].unshift({ label: "" + __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD, value: __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD });
        this.dataSelector[key].unshift({ label: this.NA, value: '' });
        this.filterSelector[key] = [];
        key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].transaccion;
        this.dataSelector[key] = this.peticionProperties.listM2kCatTransaccionesFront.map(function (p) {
            return { label: p.transaccionPantallaTransient, value: __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(p.transaccion, true) };
        });
        this.dataSelector[key].unshift({ label: __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD + " (TODAS)", value: __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD });
        this.dataSelector[key].unshift({ label: this.NA, value: '' });
        this.filterSelector[key] = [];
    };
    AdminPeticionesComponent.prototype.resetPeticionData = function () {
        this.resetFormErrors();
        this.resetPeticionDataEdit();
        this.resetDataTable();
    };
    AdminPeticionesComponent.prototype.resetPeticionDataEdit = function () {
        this.listSelPeticionData = [];
        this.peticionDataEdit = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getNewInstance();
        this.dataAutoCompleteEdit = DataAutoComplete.getNewInstance();
        this.isAccionGlobal = false;
        this.isUrgente = false;
        this.selAccion = -1;
        this.lastId = -1;
    };
    AdminPeticionesComponent.prototype.resetDataTable = function () {
        this.page = 0;
        this.listPeticionData = [];
        if (this.dtPeticiones) {
            this.dtPeticiones.reset();
        }
    };
    AdminPeticionesComponent.prototype.filterSearch = function () {
        var _this = this;
        if (this.isProcessBlocked) {
            return;
        }
        this.globalBlock();
        this.service.findAllPeticionByFilters(this.DEFAULT_PAGE_SIZE, this.page, this.filterQuery).subscribe(function (data) {
            if (data) {
                _this.paginator = data;
                if (_this.paginator.totalElements > _this.maxRecords) {
                    _this.maxRecords = _this.paginator.totalElements;
                }
                _this.listPeticionData = _this.paginator.listPeticion.map(__WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].toPeticionData);
                if (_this.paginator.totalElements == 0) {
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Sin Peticiones', 'No hay peticiones con los filtros seleccionados');
                }
                else {
                    _this.validateEditTable();
                }
            }
            else {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error al realizar la búsqueda');
            }
            _this.globalUnblock();
        }, function (error) {
            console.log('error: ', error);
            _this.globalUnblock();
        });
    };
    AdminPeticionesComponent.prototype.updatePeticiones = function () {
        var _this = this;
        if (this.isProcessBlocked) {
            return;
        }
        var wrapPeticion = __WEBPACK_IMPORTED_MODULE_14__model_WrapPeticion__["a" /* WrapPeticion */].getNewInstance();
        if (this.isAccionGlobal) {
            wrapPeticion.filterQuery = this.filterQuery;
        }
        else {
            wrapPeticion.listPeticion = this.listSelPeticionData.map(__WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].toPeticion);
        }
        wrapPeticion.usuario = this.usuario;
        wrapPeticion.urgente = this.isUrgente;
        wrapPeticion.accion = this.selAccion;
        this.globalBlock();
        this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].INFO, 'Procesando', 'Procesando actualización de peticiones WS-M2k');
        this.service.updatePeticiones(wrapPeticion).subscribe(function (data) {
            switch (data.status) {
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Peticiones Actualizadas', 'Se actualizaron las peticiones WS-M2k');
                    break;
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].ALREADY_REPORTED:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Sin Cambios', 'No se encontraron cambios a las peticiones');
                    break;
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].NO_CONTENT:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Actualizacion', 'Favor de revisar los logs para más detalles');
                    break;
                default:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Estatus Desconocido', 'Se desconoce el estatus retornado');
                    console.log('data: ', data);
            }
            _this.globalUnblock();
            _this.resetPeticionData();
        }, function (error) { _this.globalUnblock(); });
    };
    AdminPeticionesComponent.prototype.addPeticionesEdit = function () {
        var _this = this;
        if (this.isProcessBlocked) {
            return;
        }
        this.globalBlock();
        if (this.listPeticionData.length == 0) {
            this.globalUnblock();
            return;
        }
        this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].INFO, 'Agregando Peticiones', 'Agregando peticiones a lista de ediciones');
        if (this.listPeticionData.length < this.paginator.totalElements) {
            this.service.getAllPeticionByFilters(this.filterQuery).subscribe(function (data) {
                if (data) {
                    var listData = data.map(__WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].toPeticionData);
                    __WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].addListPeticionDataToList(listData, _this.listSelPeticionData, true);
                }
                _this.validateEditTable();
                _this.globalUnblock();
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Peticiones Agregadas', 'Se agregaron las peticiones a la lista de ediciones');
            }, function (error) { _this.globalUnblock(); });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].addListPeticionDataToList(this.listPeticionData.slice(0), this.listSelPeticionData, true);
            this.validateEditTable();
            this.globalUnblock();
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Peticiones Agregadas', 'Se agregaron las peticiones a la lista de ediciones');
        }
    };
    AdminPeticionesComponent.prototype.addNewPeticion = function (dataInput) {
        var _this = this;
        if (this.isProcessBlocked) {
            return;
        }
        this.globalBlock();
        var peticion = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].toPeticion(dataInput);
        this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].INFO, 'Revisando Petición', 'Revisando la petición en base de datos');
        this.service.checkPeticionRepetida(peticion).subscribe(function (data) {
            switch (data.status) {
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].ALREADY_REPORTED:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Petición Repetida', 'La petición ya existe en la base de datos, favor de validar');
                    break;
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].NO_CONTENT:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Error al Revisar', 'Favor de revisar los logs para más detalles');
                    break;
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK:
                    dataInput.id = _this.lastId--;
                    _this.listSelPeticionData.push(__WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getClone(dataInput));
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Petición Agregada', 'Se agregó la petición');
                    break;
                default:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Estatus Desconocido', 'Se desconoce el estatus retornado');
                    console.log('data: ', data);
            }
            _this.globalUnblock();
        }, function (error) { _this.globalUnblock(); });
    };
    AdminPeticionesComponent.prototype.onLazyLoadData = function (event) {
        this.page = event.first / this.DEFAULT_PAGE_SIZE;
        this.filterSearch();
    };
    AdminPeticionesComponent.prototype.onAutoComplete = function (key, event) {
        var _this = this;
        this.filterSelector[key] = [];
        var label = event.query;
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(label)) {
            return;
        }
        this.dataSelector[key].forEach(function (data) {
            if (data.label.indexOf(__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(label, true)) > -1) {
                _this.filterSelector[key].push(data);
            }
        });
    };
    AdminPeticionesComponent.prototype.onAutoCompleteDropdown = function (key) {
        var _this = this;
        this.filterSelector[key] = [];
        this.dataSelector[key].forEach(function (data) {
            _this.filterSelector[key].push(data);
        });
    };
    AdminPeticionesComponent.prototype.onAutoCompleteSelect = function (key, event, edit) {
        if (edit) {
            this.peticionDataEdit[key] = event.value;
        }
        else {
            this.peticionData[key] = event.value;
        }
    };
    AdminPeticionesComponent.prototype.onClickFilterSearch = function () {
        this.filterQuery = this.getPeticionFilterFormat(this.getValidPeticionData(this.peticionData));
        this.resetDataTable();
    };
    AdminPeticionesComponent.prototype.onClickFilterClear = function () {
        this.peticionData = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getNewInstance();
        this.filterQuery = '';
        this.dataAutoComplete = DataAutoComplete.getNewInstance();
        this.resetDataTable();
    };
    AdminPeticionesComponent.prototype.onClickRowEdit = function (data) {
        if (__WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].addPeticionDataToList(data, this.listSelPeticionData, true)) {
            data.repetida = true;
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Petición Agregada', 'La petición se agregó a la tabla de ediciones');
        }
        else {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Petición Existente', 'Ya existe la petición en la lista de ediciones');
        }
    };
    AdminPeticionesComponent.prototype.onClickRowDelete = function (id) {
        this.listSelPeticionData = this.listSelPeticionData.filter(function (data) {
            return data.id !== id;
        });
        this.validateEditTable();
    };
    AdminPeticionesComponent.prototype.onClickRowCopy = function (data) {
        this.peticionDataEdit = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getClone(data);
        this.peticionDataEdit.id = null;
        if (this.peticionDataEdit.region == __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD) {
            this.peticionDataEdit.region = '10';
        }
    };
    AdminPeticionesComponent.prototype.onClickAccionGlobal = function (accion) {
        this.selAccion = accion;
        this.isAccionGlobal = true;
        this.selAccionName = this.getAccionName();
        if (!this.isAccionAllowed()) {
            return;
        }
        if (this.selAccion === this.ACTUALIZAR) {
            this.addPeticionesEdit();
            return;
        }
        this.modalShow();
    };
    AdminPeticionesComponent.prototype.onClickMultiEdit = function () {
        this.resetFormErrors();
        if (!this.isValidIP(this.peticionDataEdit.ip)) {
            return;
        }
        if (this.listSelPeticionData.length == 0) {
            return;
        }
        var data = this.getValidPeticionData(this.peticionDataEdit);
        this.listSelPeticionData.forEach(function (petData) {
            petData.usuarioCorp = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.usuarioCorp, petData.usuarioCorp);
            petData.ip = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.ip, petData.ip);
            petData.region = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.region, petData.region);
            petData.transaccion = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.transaccion, petData.transaccion);
            petData.peticionesPorMinuto = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.peticionesPorMinuto, petData.peticionesPorMinuto);
            petData.ambiente = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.ambiente, petData.ambiente);
            petData.estatus = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.estatus, petData.estatus);
            if (data.solicitudPeticion == '-1') {
                petData.solicitudPeticion = '';
            }
            else {
                petData.solicitudPeticion = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.solicitudPeticion, petData.solicitudPeticion);
            }
        });
    };
    AdminPeticionesComponent.prototype.onClickAddNewPeticion = function () {
        if (this.isProcessBlocked) {
            return;
        }
        var output = this.getValidPeticionData(this.peticionDataEdit);
        if (!this.isValidPeticion(output)) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Datos Incorrectos', 'Favor de validar datos ingresados');
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].isPeticionDataRepetida(output, this.listSelPeticionData)) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].WARN, 'Petición Existente', 'Ya existe la petición en la tabla de ediciones');
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(output.solicitudPeticion) || output.solicitudPeticion == '-1') {
            output.solicitudPeticion = '';
        }
        this.addNewPeticion(output);
    };
    AdminPeticionesComponent.prototype.onClickClearEditFileds = function () {
        this.resetFormErrors();
        this.peticionDataEdit = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getNewInstance();
    };
    AdminPeticionesComponent.prototype.onClickClearEdits = function () {
        this.resetPeticionDataEdit();
        this.validateEditTable();
    };
    AdminPeticionesComponent.prototype.onClickAccion = function (accion) {
        this.selAccion = accion;
        this.isAccionGlobal = false;
        this.selAccionName = this.getAccionName();
        if (!this.isAccionAllowed()) {
            return;
        }
        this.modalShow();
    };
    AdminPeticionesComponent.prototype.onClickDialogCancel = function () {
        this.isUrgente = false;
        this.modalHide();
    };
    AdminPeticionesComponent.prototype.onClickDialogOK = function () {
        this.modalHide();
        if (this.isAccionGlobal && (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(this.filterQuery) || this.paginator.totalElements >= this.maxRecords)) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Actualización No Permitida', 'No se permite realizar la acutalización de todos los registros');
            return;
        }
        this.updatePeticiones();
    };
    AdminPeticionesComponent.prototype.globalBlock = function () { this.isProcessBlocked = true; };
    AdminPeticionesComponent.prototype.globalUnblock = function () { this.isProcessBlocked = false; };
    AdminPeticionesComponent.prototype.modalShow = function () { jQuery(this.MODAL_ID).modal('show'); };
    AdminPeticionesComponent.prototype.modalHide = function () { jQuery(this.MODAL_ID).modal('hide'); };
    AdminPeticionesComponent.prototype.validateEditTable = function () {
        var listId = this.listSelPeticionData.map(function (data) {
            return data.id;
        });
        this.listPeticionData.forEach(function (peticion) {
            peticion.repetida = (listId.indexOf(peticion.id) > -1);
        });
    };
    AdminPeticionesComponent.prototype.getPeticionFilterFormat = function (data) {
        var output = '';
        var ambiente = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.ambiente) ? this.FILTER_NULL_VALUE : __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["a" /* EnumAmbiente */].getValue(data.ambiente);
        var estatus = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.estatus) ? this.FILTER_NULL_VALUE : __WEBPACK_IMPORTED_MODULE_11__utils_EnumData__["b" /* EnumEstatus */].getValue(data.estatus);
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.usuarioCorp, this.FILTER_NULL_VALUE) + '_';
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.ip, this.FILTER_NULL_VALUE) + '_';
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.region, this.FILTER_NULL_VALUE) + '_';
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.transaccion, this.FILTER_NULL_VALUE) + '_';
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.peticionesPorMinuto, this.FILTER_NULL_VALUE) + '_';
        output += ambiente + '_';
        output += estatus + '_';
        output += __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(data.solicitudPeticion, this.FILTER_NULL_VALUE);
        if (output == '-_-_-_-_-_-_-_-') {
            return '';
        }
        return output;
    };
    AdminPeticionesComponent.prototype.getValidPeticionData = function (data) {
        var output = __WEBPACK_IMPORTED_MODULE_15__model_PeticionData__["a" /* PeticionData */].getNewInstance();
        output.usuarioCorp = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(data.usuarioCorp, true);
        output.ip = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].trimToEmpty(data.ip);
        output.region = data.region;
        output.transaccion = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(data.transaccion, true);
        output.peticionesPorMinuto = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].trimToEmpty("" + data.peticionesPorMinuto);
        output.ambiente = data.ambiente;
        output.estatus = data.estatus;
        output.solicitudPeticion = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].trimToEmpty("" + data.solicitudPeticion);
        if (output.ip == __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].ALL_IP) {
            output.ip = __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD;
        }
        if (output.region == '0') {
            output.region = '';
        }
        else if (output.region == '10') {
            output.region = __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD;
        }
        if (output.peticionesPorMinuto == '0') {
            output.peticionesPorMinuto = '';
        }
        if (output.ambiente == this.NA) {
            output.ambiente = '';
        }
        if (output.estatus == this.NA) {
            output.estatus = '';
        }
        if (output.solicitudPeticion == '0') {
            output.solicitudPeticion = '';
        }
        return output;
    };
    AdminPeticionesComponent.prototype.getAccionName = function () {
        switch (this.selAccion) {
            case this.AUTORIZAR: return 'Autorizar';
            case this.RECHAZAR: return 'Rechazar';
            case this.ELIMINAR: return 'Eliminar';
            case this.ACTUALIZAR: return 'Actualizar';
        }
        return '';
    };
    AdminPeticionesComponent.prototype.isValidIP = function (ip) {
        var key = __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ip;
        this.setFormError(key);
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(ip) || __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].trimToEmpty(ip) == __WEBPACK_IMPORTED_MODULE_7__model_Peticion__["a" /* Peticion */].WILDCARD) {
            return true;
        }
        if (!__WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].isValidIP(ip)) {
            this.setFormError(key, __WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].FORMAT);
        }
        return __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(this.formErrors[key]);
    };
    AdminPeticionesComponent.prototype.isAccionAllowed = function () {
        var total;
        if (this.isAccionGlobal) {
            total = this.paginator.totalElements;
        }
        else {
            total = this.listSelPeticionData.length;
        }
        if (total == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Selección Vacía', 'No hay peticiones para actualizar o editar');
            return false;
        }
        var isValid = (total <= this.MAX_PETICIONES && total < this.maxRecords);
        if (!isValid) {
            var max = (total <= this.MAX_PETICIONES ? this.maxRecords : this.MAX_PETICIONES);
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_5_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Actualización No Permitida', "No se permite acualizar m\u00E1s de " + max + " registros");
        }
        return isValid;
    };
    AdminPeticionesComponent.prototype.isValidPeticion = function (data) {
        var _this = this;
        var valid = true;
        var required = __WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED;
        this.resetFormErrors();
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.ambiente)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ambiente, required);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.estatus)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].estatus, required);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.usuarioCorp)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].usuarioCorp, required);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.ip)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ip, required);
        }
        else if (!__WEBPACK_IMPORTED_MODULE_12__utils_CommonUtils__["a" /* CommonUtils */].isValidIP(data.ip)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ip, __WEBPACK_IMPORTED_MODULE_10__utils_FormValidationType__["a" /* FormValidationType */].FORMAT);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.region)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].region, required);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.transaccion)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].transaccion, required);
        }
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.peticionesPorMinuto)) {
            this.setFormError(__WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].ppm, required);
        }
        __WEBPACK_IMPORTED_MODULE_13__utils_Constants__["a" /* Constants */].getKeysPeticion().forEach(function (key) {
            var error = _this.formErrors[key];
            if (!__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(error)) {
                valid = false;
            }
        });
        return valid;
    };
    return AdminPeticionesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dtPeticiones'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"]) === "function" && _a || Object)
], AdminPeticionesComponent.prototype, "dtPeticiones", void 0);
AdminPeticionesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-peticiones',
        template: __webpack_require__("./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_app_app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_app_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_app_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_alert_service__["a" /* AlertService */]) === "function" && _d || Object])
], AdminPeticionesComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/admin-peticiones.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/common/SharedData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_peticiones_ws_model_UsuarioProperties__ = __webpack_require__("./src/app/peticiones-ws/model/UsuarioProperties.ts");


var SharedData = (function () {
    function SharedData() {
    }
    return SharedData;
}());

SharedData.ayuda = {};
SharedData.dataSelectorSolPeticion = {};
SharedData.dataSelectorSolUsuCorp = {};
SharedData.usuario = __WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__["f" /* User */].getNewInstance();
SharedData.usuarioProperties = __WEBPACK_IMPORTED_MODULE_1_app_peticiones_ws_model_UsuarioProperties__["a" /* UsuarioProperties */].getNewInstance();
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/SharedData.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>En esta sección encontrar&aacute;s las solicitudes de peticiones WS-M2k</h5>\n<div *ngIf=\"isTipoSolicitudEnabled\" class=\"row\" style=\"padding-top: 15px;\">\n  <div class=\"col-md-3 form-group\">\n    <label for=\"tipoSolicitud\">Tipo Solicitud</label>\n    <simple-help [ayuda]=\"ayuda.tipoSolicitud\"></simple-help>\n    <div>\n      <p-selectButton id=\"tipoSolicitud\" [options]=\"dataSelector.tipoSolicitud\" [(ngModel)]=\"selTipoSolicitud\" (onChange)=\"onChangeTipoSolicitud()\" [disabled]=\"!isTipoSolicitudEnabled\"></p-selectButton>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\" style=\"padding-top: 25px;\">\n  <p-dataTable id=\"dtSolPeticion\" #dtSolPeticion [value]=\"listSolicitudData\" [(selection)]=\"listSelSolicitudData\" dataKey=\"id\" emptyMessage=\"Sin Solicitudes\"\n                [paginator]=\"true\" [responsive]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,20]\">\n    <p-header>Solicitudes de Peticiones WS-M2k</p-header>\n    <p-column *ngIf=\"isSelectable\" [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\n    <p-column header=\"ID\" field=\"id\" [style]=\"{'width':'50px'}\" [sortable]=\"true\"></p-column>\n    <p-column header=\"Fecha Registro\" field=\"fechaRegistro\" [sortable]=\"true\"></p-column>\n    <p-column header=\"Estatus\" field=\"estatus\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column header=\"Ambiente\" field=\"ambiente\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column header=\"Fecha Caducidad\" field=\"fechaCaducidad\" [sortable]=\"true\"></p-column>\n    <p-column *ngIf=\"!isOwner\" header=\"Solicitante\" field=\"solicitante\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column header=\"Fecha Autorizaci&oacute;n\" field=\"fechaAutorizacion\" [sortable]=\"true\"></p-column>\n    <p-column header=\"Autorizador\" field=\"autorizador\"></p-column>\n    <p-column header=\"Comentario Autorizador\" field=\"comentarioAutorizador\"></p-column>\n    <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\n      <ng-template let-row=\"rowData\" pTemplate=\"body\">\n        <button type=\"button\" pButton class=\"ui-button-info\" pTooltip=\"Ver Datos Solicitud\" tooltipPosition=\"left\" icon=\"fa fa-search\" (click)=\"onClickSolicitud(row)\"></button>\n      </ng-template>\n    </p-column>\n    <p-footer *ngIf=\"isSelectable\">\n      <div class=\"row\">\n        <div *ngIf=\"isOwner\">\n          <button type=\"button\" pButton icon=\"fa fa-times\" label=\"CANCELAR\" class=\"ui-button-danger\" style=\"float:right;\" (click)=\"onClickAccion(CANCELAR)\"></button>\n        </div>\n        <div *ngIf=\"!isOwner\">\n          <button type=\"button\" pButton icon=\"fa fa-ban\" label=\"REVOCAR\" class=\"ui-button-danger\" style=\"float:right;\" (click)=\"onClickAccion(REVOCAR)\"></button>\n          <button type=\"button\" pButton icon=\"fa fa-times\" label=\"RECHAZAR\" class=\"ui-button-warning\" style=\"float:right;\" (click)=\"onClickAccion(RECHAZAR)\"></button>\n          <button type=\"button\" pButton icon=\"fa fa-check\" label=\"AUTORIZAR\" class=\"ui-button-success\" style=\"float:right;\" (click)=\"onClickAccion(AUTORIZAR)\"></button>\n        </div>\n      </div>\n    </p-footer>\n  </p-dataTable>\n</div>\n\n<div *ngIf=\"isValidListPeticion\" style=\"padding-top: 25px;\">\n  <h3>Datos de la Solicitud #{{selIdSolicitud}}</h3>\n  <div *ngIf=\"solicitudData\" class=\"row\">\n    <div class=\"col-md-2\">\n      <label>Aplicativo</label>\n      <p>{{solicitudData.aplicativo}}</p>\n    </div>\n    <div class=\"col-md-2\">\n      <label>Area Responsable</label>\n      <p>{{solicitudData.areaResponsable}}</p>\n    </div>\n    <div class=\"col-md-2\">\n      <label>Justificaci&oacute;n</label>\n      <p>{{solicitudData.justificacion}}</p>\n    </div>\n  </div>\n  <div class=\"row\" style=\"padding-top: 10px;\">\n    <p-dataTable id=\"dtPeticion\" #dtPeticion [value]=\"listPeticionData\" dataKey=\"id\" emptyMessage=\"Sin Peticiones\"\n                  [responsive]=\"true\" [paginator]=\"true\" [rows]=\"5\">\n      <p-header>Peticiones WS-M2k de la Solicitud</p-header>\n      <p-column header=\"ID\" field=\"id\"></p-column>\n      <p-column header=\"Usuario Corporativo\" field=\"usuarioCorp\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n      <p-column header=\"IP\" field=\"ip\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n      <p-column header=\"Regi&oacute;n\" field=\"region\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n      <p-column header=\"Transacci&oacute;n\" field=\"transaccion\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n      <p-column header=\"Peticiones por Minuto\" field=\"peticionesPorMinuto\"></p-column>\n      <p-column header=\"Ambiente\" field=\"ambiente\" [sortable]=\"true\"></p-column>\n      <p-column header=\"Estatus\" field=\"estatus\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListSolPeticionesWebComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_ModalData__ = __webpack_require__("./src/app/peticiones-ws/utils/ModalData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/CommonUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_SharedData__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/common/SharedData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_core_common_HttpStatusCode__ = __webpack_require__("./src/app/core/common/HttpStatusCode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_peticiones_ws_model_PeticionData__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_peticiones_ws_model_AplicativoTelcel__ = __webpack_require__("./src/app/peticiones-ws/model/AplicativoTelcel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_peticiones_ws_utils_DateUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/DateUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var SolicitudPeticionData = (function () {
    function SolicitudPeticionData(id, fechaRegistro, estatus, aplicativo, areaResponsable, ambiente, fechaCaducidad, solicitante, justificacion, autorizador, fechaAutorizacion, comentarioAutorizador) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.aplicativo = aplicativo;
        this.areaResponsable = areaResponsable;
        this.ambiente = ambiente;
        this.fechaCaducidad = fechaCaducidad;
        this.solicitante = solicitante;
        this.justificacion = justificacion;
        this.autorizador = autorizador;
        this.fechaAutorizacion = fechaAutorizacion;
        this.comentarioAutorizador = comentarioAutorizador;
    }
    SolicitudPeticionData.getNewInstance = function (id) {
        return new SolicitudPeticionData(id, '', '', '', '', '', '', '', '', '', '', '');
    };
    SolicitudPeticionData.toSolicitudPeticionData = function (r) {
        var output = null;
        var NA = 'N/A';
        var DATE_FORMAT = 'DD/MM/YYYY';
        if (r) {
            output = ({
                id: r.id,
                fechaRegistro: __WEBPACK_IMPORTED_MODULE_14_app_peticiones_ws_utils_DateUtils__["a" /* DateUtils */].formatDate(r.fechaRegistro, DATE_FORMAT, NA),
                estatus: __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].getName(r.estatus),
                aplicativo: r.aplicativo ? r.aplicativo.nombre : NA,
                areaResponsable: __WEBPACK_IMPORTED_MODULE_4__utils_StringUtils__["a" /* StringUtils */].defaultIfBlank(__WEBPACK_IMPORTED_MODULE_13_app_peticiones_ws_model_AplicativoTelcel__["a" /* AplicativoTelcel */].getAreaNombre(r.aplicativo), NA),
                ambiente: __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["a" /* EnumAmbiente */].getName(r.ambiente),
                fechaCaducidad: __WEBPACK_IMPORTED_MODULE_14_app_peticiones_ws_utils_DateUtils__["a" /* DateUtils */].formatDate(r.fechaCaducidad, DATE_FORMAT, NA),
                solicitante: __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__["a" /* CommonUtils */].getUserFullName(r.solicitante),
                justificacion: r.justificacion,
                autorizador: __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__["a" /* CommonUtils */].getUserFullName(r.autorizador),
                fechaAutorizacion: __WEBPACK_IMPORTED_MODULE_14_app_peticiones_ws_utils_DateUtils__["a" /* DateUtils */].formatDate(r.fechaAutorizacion, DATE_FORMAT, NA),
                comentarioAutorizador: r.comentarioAutorizador
            });
        }
        return output;
    };
    return SolicitudPeticionData;
}());
var ListSolPeticionesWebComponent = (function () {
    function ListSolPeticionesWebComponent(service, authService, alertService) {
        this.service = service;
        this.authService = authService;
        this.alertService = alertService;
        this.outputModalData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.AUTORIZAR = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].AUTORIZADA;
        this.RECHAZAR = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].RECHAZADA;
        this.CANCELAR = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].CANCELADA;
        this.REVOCAR = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].EXPIRADA;
        this.ayuda = __WEBPACK_IMPORTED_MODULE_10__common_SharedData__["a" /* SharedData */].ayuda;
        this.dataSelector = __WEBPACK_IMPORTED_MODULE_10__common_SharedData__["a" /* SharedData */].dataSelectorSolPeticion;
    }
    ListSolPeticionesWebComponent.prototype.ngOnInit = function () {
        this.isAdmin = false;
        this.isAutorizador = false;
        this.isTipoSolicitudEnabled = false;
        this.selTipoSolicitud = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS;
        this.defTipoSol = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS;
        this.resetSolicitudData();
    };
    ListSolPeticionesWebComponent.prototype.initComponent = function () {
        this.usuario = __WEBPACK_IMPORTED_MODULE_10__common_SharedData__["a" /* SharedData */].usuario;
        this.usuarioProperties = __WEBPACK_IMPORTED_MODULE_10__common_SharedData__["a" /* SharedData */].usuarioProperties;
        this.isAdmin = this.usuarioProperties.administrador;
        this.isAutorizador = (this.usuarioProperties.autorizador != null);
        var key = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].tipoSolicitud;
        if (!this.isAutorizador) {
            this.dataSelector[key] = this.dataSelector[key].filter(function (selector) {
                return selector.label !== __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].N_EXTERNAS;
            });
        }
        if (this.isAdmin) {
            this.dataSelector[key].push({ label: __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].N_TODAS, value: __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].TODAS });
        }
        this.isTipoSolicitudEnabled = (this.dataSelector[key].length > 1);
        this.defTipoSol = this.dataSelector[key][0] ? this.dataSelector[key][0].value : -1;
        if (this.defTipoSol == __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS && this.isAutorizador) {
            this.defTipoSol = __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].EXTERNAS;
        }
        this.selTipoSolicitud = this.defTipoSol;
        this.isResponse = true;
        this.consultarSolicitudes();
    };
    ListSolPeticionesWebComponent.prototype.clearScreen = function () {
        this.selTipoSolicitud = this.defTipoSol;
        this.resetSolicitudData();
        this.consultarSolicitudes();
    };
    ListSolPeticionesWebComponent.prototype.actualizarModal = function (inputModal) {
        if (inputModal) {
            this.actualizarSolicitudes(inputModal.input);
        }
    };
    ListSolPeticionesWebComponent.prototype.resetSolicitudData = function () {
        this.listSolicitud = [];
        this.listSelSolicitud = [];
        this.listSolicitudData = [];
        this.listSelSolicitudData = [];
        this.solicitudData = null;
        this.selIdSolicitud = -1;
        this.tipoAccion = -1;
        this.selAccion = -1;
        this.isSelectable = true;
        this.isValidListSelected = false;
        this.isOwner = false;
        if (this.dtSolicitud) {
            this.dtSolicitud.reset();
        }
        this.resetPeticionData();
    };
    ListSolPeticionesWebComponent.prototype.resetPeticionData = function () {
        this.listPeticionData = [];
        this.isValidListPeticion = false;
        if (this.dtPeticion) {
            this.dtPeticion.reset();
        }
    };
    ListSolPeticionesWebComponent.prototype.consultarSolicitudes = function () {
        var _this = this;
        switch (this.selTipoSolicitud) {
            case __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS:
                this.isOwner = true;
                this.service.getAllSolPeticionBySolicitante(this.usuario.id).subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            case __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].EXTERNAS:
                this.service.getAllSolPeticionByNivelAutorizador(this.usuarioProperties.autorizador.nivel).subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            case __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].TODAS:
                this.isSelectable = false;
                this.service.getAllSolPeticion().subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            default:
                console.log("Ni idea como es que usuaste una solicitud con un valor de " + this.selTipoSolicitud);
                this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
        }
    };
    ListSolPeticionesWebComponent.prototype.fillData = function (data) {
        if (data == null) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
            this.isResponse = false;
            return;
        }
        this.listSolicitud = data;
        this.listSolicitudData = this.listSolicitud.map(SolicitudPeticionData.toSolicitudPeticionData);
        if (this.dtSolicitud) {
            this.dtSolicitud.sortOrder = -1;
            this.dtSolicitud.sortField = 'id';
        }
        if (!this.isResponse && this.listSolicitud.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].WARN, 'Sin Solicitudes', "No hay solicitudes " + __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["c" /* EnumTipoSolicitud */].getName(this.selTipoSolicitud));
        }
        this.isResponse = false;
    };
    ListSolPeticionesWebComponent.prototype.consultarPeticiones = function () {
        var _this = this;
        this.service.getAllPeticionBySolicitud(this.selIdSolicitud).subscribe(function (data) {
            _this.listPeticionData = data.map(__WEBPACK_IMPORTED_MODULE_12_app_peticiones_ws_model_PeticionData__["a" /* PeticionData */].toPeticionData);
            _this.isValidListPeticion = (_this.listPeticionData.length > 0);
            if (!_this.isValidListPeticion) {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].WARN, 'Sin Peticiones', 'La solicitud no tiene peticiones');
            }
        });
    };
    ListSolPeticionesWebComponent.prototype.actualizarSolicitudes = function (comentario) {
        var _this = this;
        this.listSelSolicitud.forEach(function (solicitud) {
            solicitud.estatus = _this.selAccion;
            if (_this.selAccion !== _this.CANCELAR) {
                solicitud.autorizador = _this.usuario;
                solicitud.fechaAutorizacion = new Date();
                solicitud.comentarioAutorizador = __WEBPACK_IMPORTED_MODULE_4__utils_StringUtils__["a" /* StringUtils */].trimToNull(comentario);
            }
        });
        this.service.updateEstatusSolPeticion(this.listSelSolicitud).subscribe(function (data) {
            _this.isResponse = true;
            if (data && data.status === __WEBPACK_IMPORTED_MODULE_11_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK) {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].SUCCESS, 'Actualizacion Exitosa', 'Se actualizaron las solicitudes correctamente');
                _this.resetSolicitudData();
                _this.consultarSolicitudes();
            }
            else {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Actualizacion', 'Ocurrio un error al actualizar las solicitudes');
            }
        });
    };
    ListSolPeticionesWebComponent.prototype.getSolicitudData = function (solicitud) {
        return "#" + solicitud.id + " - Justificacion: " + solicitud.justificacion + " - Solicitante: " + __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__["a" /* CommonUtils */].getUserFullName(solicitud.solicitante);
    };
    ListSolPeticionesWebComponent.prototype.onChangeTipoSolicitud = function () {
        this.resetSolicitudData();
        this.consultarSolicitudes();
    };
    ListSolPeticionesWebComponent.prototype.onClickSolicitud = function (data) {
        this.solicitudData = data;
        var id = this.solicitudData.id;
        if (id > 0) {
            this.selIdSolicitud = Number(id);
            this.consultarPeticiones();
        }
    };
    ListSolPeticionesWebComponent.prototype.onClickAccion = function (accion) {
        var _this = this;
        this.validateListSelSolicitud();
        if (!this.isValidListSelected) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].WARN, 'Sin Selección', 'Favor de seleccionar al menos 1 solicitud');
            return;
        }
        this.selAccion = accion;
        var required = true;
        var disabled = false;
        var title = '';
        var isRevocar = false;
        switch (this.selAccion) {
            case this.AUTORIZAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].AUTORIZAR;
                break;
            case this.RECHAZAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].RECHAZAR;
                break;
            case this.CANCELAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].CANCELAR;
                disabled = true;
                required = false;
                break;
            case this.REVOCAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].REVOCAR;
                isRevocar = true;
                break;
            default:
                this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].ERROR, 'Acción No Reconocida', 'La acción no es reconocida');
                return;
        }
        title = '¿' + title + ' las Solicitudes?';
        this.createListSelSolicitud(isRevocar);
        if (this.listSelSolicitud.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_1__alert_service__["b" /* AlertSeverity */].WARN, 'Lista de Solicitudes Incorrecta', 'Solicitudes seleccionadas son incorrectas para la acción');
            return;
        }
        var data = this.listSelSolicitud.map(function (solicitud) {
            return _this.getSolicitudData(solicitud);
        });
        this.outputModalData.emit(new __WEBPACK_IMPORTED_MODULE_5__utils_ModalData__["a" /* ModalData */](title, data, '', required, disabled));
    };
    ListSolPeticionesWebComponent.prototype.validateListSelSolicitud = function () {
        this.isValidListSelected = !(this.listSelSolicitudData === undefined
            || this.listSelSolicitudData == null
            || this.listSelSolicitudData.length == 0);
    };
    ListSolPeticionesWebComponent.prototype.createListSelSolicitud = function (isRevocar) {
        this.listSelSolicitud = [];
        var estatus = !isRevocar ? __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].N_REVISION : __WEBPACK_IMPORTED_MODULE_6__utils_EnumData__["b" /* EnumEstatus */].N_AUTORIZADA;
        if (this.listSelSolicitudData.length > 0) {
            var listaId_1 = [];
            this.listSelSolicitudData.forEach(function (data) {
                if (data.estatus === estatus) {
                    listaId_1.push(data.id);
                }
            });
            if (listaId_1.length > 0) {
                this.listSelSolicitud = this.listSolicitud.filter(function (data) {
                    return listaId_1.indexOf(data.id) !== -1;
                });
            }
        }
    };
    return ListSolPeticionesWebComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('outputModalData'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], ListSolPeticionesWebComponent.prototype, "outputModalData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dtSolPeticion'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTable"]) === "function" && _b || Object)
], ListSolPeticionesWebComponent.prototype, "dtSolicitud", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dtPeticion'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_primeng_primeng__["DataTable"]) === "function" && _c || Object)
], ListSolPeticionesWebComponent.prototype, "dtPeticion", void 0);
ListSolPeticionesWebComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-sol-peticiones-web',
        template: __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AuthService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _f || Object])
], ListSolPeticionesWebComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/list-sol-peticiones-web.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>En esta sección encontrar&aacute;s las solicitudes de permisos sobre Usuarios Corporativos</h5>\n<div *ngIf=\"isTipoSolicitudEnabled\" class=\"row\" style=\"padding-top: 15px;\">\n  <div class=\"col-md-2 form-group\">\n    <label for=\"tipoSolicitud\">Tipo Solicitud</label>\n    <simple-help [ayuda]=\"ayuda.tipoSolicitud\"></simple-help>\n    <div>\n      <p-selectButton id=\"tipoSolicitud\" [options]=\"dataSelector.tipoSolicitud\" [(ngModel)]=\"selTipoSolicitud\" (onChange)=\"onChangeTipoSolicitud()\" [disabled]=\"!isTipoSolicitudEnabled\"></p-selectButton>\n    </div>\n  </div>\n</div>\n\n<div class=\"row\" style=\"padding-top: 25px;\">\n  <p-dataTable id=\"dtSolUsuCorp\" #dtSolUsuCorp [value]=\"listSolicitudData\" [(selection)]=\"listSelSolicitudData\" dataKey=\"id\" emptyMessage=\"Sin Solicitudes\"\n                [paginator]=\"true\" [responsive]=\"true\" [rows]=\"5\" [rowsPerPageOptions]=\"[5,10,20]\">\n    <p-header>Solicitudes de Usuario Corporativo</p-header>\n    <p-column *ngIf=\"isSelectable\" [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\n    <p-column header=\"ID\" field=\"id\" [style]=\"{'width':'50px'}\" [sortable]=\"true\"></p-column>\n    <p-column header=\"Fecha Registro\" field=\"fechaRegistro\" [sortable]=\"true\"></p-column>\n    <p-column header=\"Estatus\" field=\"estatus\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column *ngIf=\"!isOwner\" header=\"Solicitante\" field=\"solicitante\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column header=\"Usuario Corporativo\" field=\"usuarioCorp\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\n    <p-column header=\"Justificaci&oacute;n\" field=\"justificacion\"></p-column>\n    <p-column header=\"Comentario del Responsable\" field=\"comentarioResponsable\"></p-column>\n    <p-footer *ngIf=\"isSelectable\">\n      <div class=\"row\">\n        <div *ngIf=\"isOwner\">\n          <button type=\"button\" pButton icon=\"fa fa-times\" label=\"CANCELAR\" class=\"ui-button-danger\" style=\"float:right;\" (click)=\"onClickAccion(CANCELAR)\"></button>\n        </div>\n        <div *ngIf=\"!isOwner\">\n          <button type=\"button\" pButton icon=\"fa fa-ban\" label=\"REVOCAR\" class=\"ui-button-danger\" style=\"float:right;\" (click)=\"onClickAccion(REVOCAR)\"></button>\n          <button type=\"button\" pButton icon=\"fa fa-times\" label=\"RECHAZAR\" class=\"ui-button-warning\" style=\"float:right;\" (click)=\"onClickAccion(RECHAZAR)\"></button>\n          <button type=\"button\" pButton icon=\"fa fa-check\" label=\"AUTORIZAR\" class=\"ui-button-success\" style=\"float:right;\" (click)=\"onClickAccion(AUTORIZAR)\"></button>\n        </div>\n      </div>\n    </p-footer>\n  </p-dataTable>\n</div>\n"

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListSolUsuarioCorpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_ModalData__ = __webpack_require__("./src/app/peticiones-ws/utils/ModalData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/CommonUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_core_common_HttpStatusCode__ = __webpack_require__("./src/app/core/common/HttpStatusCode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__common_SharedData__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/common/SharedData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_peticiones_ws_utils_DateUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/DateUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SolicitudUsuarioCorpData = (function () {
    function SolicitudUsuarioCorpData(id, fechaRegistro, estatus, usuarioCorp, solicitante, justificacion, comentarioResponsable) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.usuarioCorp = usuarioCorp;
        this.solicitante = solicitante;
        this.justificacion = justificacion;
        this.comentarioResponsable = comentarioResponsable;
    }
    SolicitudUsuarioCorpData.getNewInstance = function (id) {
        return new SolicitudUsuarioCorpData(id, '', '', '', '', '', '');
    };
    SolicitudUsuarioCorpData.toSolicitudUsuarioCorpData = function (r) {
        var output = null;
        var NA = 'N/A';
        var DATE_FORMAT = 'DD/MM/YYYY';
        if (r) {
            output = ({
                id: r.id,
                fechaRegistro: __WEBPACK_IMPORTED_MODULE_12_app_peticiones_ws_utils_DateUtils__["a" /* DateUtils */].formatDate(r.fechaRegistro, DATE_FORMAT, NA),
                estatus: __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].getName(r.estatus),
                usuarioCorp: r.usuarioCorp,
                solicitante: __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__["a" /* CommonUtils */].getUserFullName(r.solicitante),
                justificacion: r.justificacion,
                comentarioResponsable: r.comentarioResponsable
            });
        }
        return output;
    };
    return SolicitudUsuarioCorpData;
}());
var ListSolUsuarioCorpComponent = (function () {
    function ListSolUsuarioCorpComponent(service, authService, alertService) {
        this.service = service;
        this.authService = authService;
        this.alertService = alertService;
        this.outputModalData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.AUTORIZAR = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].AUTORIZADA;
        this.RECHAZAR = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].RECHAZADA;
        this.CANCELAR = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].CANCELADA;
        this.REVOCAR = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].EXPIRADA;
        this.ayuda = __WEBPACK_IMPORTED_MODULE_11__common_SharedData__["a" /* SharedData */].ayuda;
        this.dataSelector = __WEBPACK_IMPORTED_MODULE_11__common_SharedData__["a" /* SharedData */].dataSelectorSolUsuCorp;
    }
    ListSolUsuarioCorpComponent.prototype.ngOnInit = function () {
        this.isResponsable = false;
        this.isResponse = false;
        this.isTipoSolicitudEnabled = false;
        this.defTipoSol = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS;
        this.selTipoSolicitud = this.defTipoSol;
        this.resetSolicitudData();
    };
    ListSolUsuarioCorpComponent.prototype.initComponent = function () {
        this.usuario = __WEBPACK_IMPORTED_MODULE_11__common_SharedData__["a" /* SharedData */].usuario;
        this.usuarioProperties = __WEBPACK_IMPORTED_MODULE_11__common_SharedData__["a" /* SharedData */].usuarioProperties;
        this.isResponsable = (this.usuarioProperties.respUsuCorp != null);
        this.isAdmin = this.usuarioProperties.administrador;
        var isAutorizador = (this.usuarioProperties.autorizador != null);
        var key = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].tipoSolicitud;
        if (this.isAdmin || isAutorizador) {
            this.dataSelector[key] = this.dataSelector[key].filter(function (item) {
                return item.value !== __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS;
            });
            if (this.isAdmin) {
                this.dataSelector[key].push({ label: __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].N_TODAS, value: __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].TODAS });
            }
        }
        if (!this.isResponsable) {
            this.dataSelector[key] = this.dataSelector[key].filter(function (item) {
                return item.value !== __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].EXTERNAS;
            });
        }
        this.isTipoSolicitudEnabled = (this.dataSelector[key].length > 1);
        this.defTipoSol = this.dataSelector[key][0] ? this.dataSelector[key][0].value : -1;
        if (this.defTipoSol == __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS && this.isResponsable) {
            this.defTipoSol = __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].EXTERNAS;
        }
        this.selTipoSolicitud = this.defTipoSol;
        this.isResponse = true;
        this.consultarSolicitudes();
    };
    ListSolUsuarioCorpComponent.prototype.clearScreen = function () {
        this.selTipoSolicitud = this.defTipoSol;
        this.resetSolicitudData();
        this.consultarSolicitudes();
    };
    ListSolUsuarioCorpComponent.prototype.actualizarModal = function (inputModal) {
        if (inputModal) {
            this.actualizarSolicitudes(inputModal.input);
        }
    };
    ListSolUsuarioCorpComponent.prototype.resetSolicitudData = function () {
        this.listSolicitud = [];
        this.listSelSolicitud = [];
        this.listSolicitudData = [];
        this.listSelSolicitudData = [];
        this.selAccion = -1;
        this.isSelectable = true;
        this.isOwner = false;
        if (this.dtSolicitud) {
            this.dtSolicitud.reset();
        }
    };
    ListSolUsuarioCorpComponent.prototype.consultarSolicitudes = function () {
        var _this = this;
        switch (this.selTipoSolicitud) {
            case __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].PROPIAS:
                this.isOwner = true;
                this.service.getAllSolUsuCorpBySolicitante(this.usuario.id).subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            case __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].EXTERNAS:
                this.service.getAllSolUsuCorpByResponsable(this.usuario.id).subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            case __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].TODAS:
                this.isSelectable = false;
                this.service.getAllSolUsuCorp().subscribe(function (data) {
                    _this.fillData(data);
                });
                break;
            default:
                console.log("Ni idea como es que usuaste una solicitud con un valor de " + this.selTipoSolicitud);
                this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
        }
    };
    ListSolUsuarioCorpComponent.prototype.fillData = function (data) {
        if (data == null) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
            this.isResponse = false;
            return;
        }
        this.listSolicitud = data;
        this.listSolicitudData = this.listSolicitud.map(SolicitudUsuarioCorpData.toSolicitudUsuarioCorpData);
        if (this.dtSolicitud) {
            this.dtSolicitud.sortOrder = -1;
            this.dtSolicitud.sortField = 'id';
        }
        if (!this.isResponse && this.listSolicitud.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].WARN, 'Sin Solicitudes', "No hay solicitudes " + __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["c" /* EnumTipoSolicitud */].getName(this.selTipoSolicitud));
        }
        this.isResponse = false;
    };
    ListSolUsuarioCorpComponent.prototype.actualizarSolicitudes = function (comentario) {
        var _this = this;
        this.listSelSolicitud.forEach(function (solicitud) {
            solicitud.estatus = _this.selAccion;
            solicitud.comentarioResponsable = __WEBPACK_IMPORTED_MODULE_5__utils_StringUtils__["a" /* StringUtils */].trimToNull(comentario);
        });
        this.service.updateEstatusSolUsuCorp(this.listSelSolicitud).subscribe(function (data) {
            _this.isResponse = true;
            if (data && data.status === __WEBPACK_IMPORTED_MODULE_10_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK) {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].SUCCESS, 'Actualizacion Exitosa', 'Se actualizaron las solicitudes correctamente');
                _this.resetSolicitudData();
                _this.consultarSolicitudes();
            }
            else {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Actualizacion', 'Ocurrio un error al actualizar las solicitudes');
                _this.isResponse = false;
            }
        });
    };
    ListSolUsuarioCorpComponent.prototype.getSolicitudData = function (solicitud) {
        if (solicitud) {
            return "#" + solicitud.id + " - Usuario Corporativo: " + solicitud.usuarioCorp + " - Solicitante: " + __WEBPACK_IMPORTED_MODULE_8__utils_CommonUtils__["a" /* CommonUtils */].getUserFullName(solicitud.solicitante);
        }
        return 'N/A';
    };
    ListSolUsuarioCorpComponent.prototype.onChangeTipoSolicitud = function () {
        this.resetSolicitudData();
        this.consultarSolicitudes();
    };
    ListSolUsuarioCorpComponent.prototype.onClickAccion = function (accion) {
        var _this = this;
        if (this.listSelSolicitudData.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].WARN, 'Sin Selección', 'Favor de seleccionar al menos 1 solicitud');
            return;
        }
        this.selAccion = accion;
        var required = true;
        var disabled = false;
        var title = '';
        var isRevocar = false;
        switch (this.selAccion) {
            case this.AUTORIZAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].AUTORIZAR;
                break;
            case this.RECHAZAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].RECHAZAR;
                break;
            case this.CANCELAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].CANCELAR;
                disabled = true;
                required = false;
                break;
            case this.REVOCAR:
                title = __WEBPACK_IMPORTED_MODULE_9__utils_Constants__["a" /* Constants */].REVOCAR;
                isRevocar = true;
                break;
            default:
                this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Acción No Reconocida', 'La acción no es reconocida');
                return;
        }
        title = '¿' + title + ' las Solicitudes?';
        this.createListSelSolicitud(isRevocar);
        if (this.listSelSolicitud.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].WARN, 'Lista de Solicitudes Incorrecta', 'Solicitudes seleccionadas son incorrectas para la acción');
            return;
        }
        var data = this.listSelSolicitud.map(function (solicitud) {
            return _this.getSolicitudData(solicitud);
        });
        this.outputModalData.emit(new __WEBPACK_IMPORTED_MODULE_6__utils_ModalData__["a" /* ModalData */](title, data, '', required, disabled));
    };
    ListSolUsuarioCorpComponent.prototype.createListSelSolicitud = function (isRevocar) {
        this.listSelSolicitud = [];
        var estatus = !isRevocar ? __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].N_REVISION : __WEBPACK_IMPORTED_MODULE_7__utils_EnumData__["b" /* EnumEstatus */].N_AUTORIZADA;
        if (this.listSelSolicitudData.length > 0) {
            var listaId_1 = [];
            this.listSelSolicitudData.forEach(function (data) {
                if (data.estatus == estatus) {
                    listaId_1.push(data.id);
                }
            });
            if (listaId_1.length > 0) {
                this.listSelSolicitud = this.listSolicitud.filter(function (data) {
                    return listaId_1.indexOf(data.id) !== -1;
                });
            }
        }
    };
    return ListSolUsuarioCorpComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('outputModalData'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], ListSolUsuarioCorpComponent.prototype, "outputModalData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dtSolUsuCorp'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_primeng_primeng__["DataTable"]) === "function" && _b || Object)
], ListSolUsuarioCorpComponent.prototype, "dtSolicitud", void 0);
ListSolUsuarioCorpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-sol-usuario-corp',
        template: __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */]) === "function" && _e || Object])
], ListSolUsuarioCorpComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/list-sol-usuario-corp.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.css":
/***/ (function(module, exports) {

module.exports = ".noPadding {\r\n  padding: 0px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container theme-showcase\" role=\"main\">\n\n  <div class=\"page-header\">\n    <h1>Mis Solicitudes</h1>\n    <p>Visualiza las solicitudes realizadas</p>\n  </div>\n\n  <ul class=\"nav nav-tabs\" id=\"tablist-tipoSolicitud\" role=\"tablist\">\n    <li class=\"nav-item active\" *ngIf=\"isSolUsuCorpEnabled\">\n      <a class=\"nav-link active\" id=\"tablink-SolUsuCorp\" data-toggle=\"tab\" role=\"tab\" href=\"#tab-SolUsuCorp\" (click)=\"onClickTab(TAB_SOL_USU_CORP)\">Solicitudes de Usuarios Corporativos</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link\" id=\"tablink-SolPeticion\" data-toggle=\"tab\" role=\"tab\" href=\"#tab-SolPeticion\" (click)=\"onClickTab(TAB_SOL_PETICION)\">Solicitudes de Peticiones WS-M2k</a>\n    </li>\n  </ul>\n\n  <div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"tab-SolUsuCorp\">\n      <app-list-sol-usuario-corp></app-list-sol-usuario-corp>\n    </div>\n    <div class=\"tab-pane\" id=\"tab-SolPeticion\">\n      <app-list-sol-peticiones-web></app-list-sol-peticiones-web>\n    </div>\n  </div>\n</div>\n\n<!-- MODAL DE SOLICITUD CON COMENTARIO -->\n<div class=\"modal fade\" id=\"modalSolicitud\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modalSolicitudLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\" id=\"modalSolicitudLabel\">{{modalData.title}}</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div clas=\"row\">\n          <div class=\"col-md-12 form-group\">\n            <ul>\n              <li *ngFor=\"let solicitud of modalData.data\" style=\"text-align: left\">{{solicitud}}</li>\n            </ul>\n          </div>\n        </div>\n        <div *ngIf=\"!modalData.disabled\" class=\"row\">\n          <div class=\"col-md-6 form-group\">\n            <label for=\"modalInput\">Comentario</label>\n            <textarea id=\"modalInput\" class=\"form-control\" [ngModel]=\"modalData.input\" (ngModelChange)=\"validateModalInput($event)\" autoResize=\"autoResize\" style=\"width: 100%;\" [required]=\"modalData.required\"></textarea>\n            <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.comentario\"><i class=\"fa fa-close\"></i> {{formErrors.comentario}}</div>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <div class=\"form-group\">\n            <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"!isValidComentario\" (click)=\"onClickModalOK()\">Actualizar Solicitudes</button>\n            <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickModalCancel()\">Cancelar</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListSolicitudesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_sol_usuario_corp_list_sol_usuario_corp_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__list_sol_peticiones_web_list_sol_peticiones_web_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_ModalData__ = __webpack_require__("./src/app/peticiones-ws/utils/ModalData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__ = __webpack_require__("./src/app/peticiones-ws/utils/FormValidationType.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_SolicitudUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_SharedData__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/common/SharedData.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ListSolicitudesComponent = (function () {
    function ListSolicitudesComponent(service, authService, alertService) {
        this.service = service;
        this.authService = authService;
        this.alertService = alertService;
        this.TAB_SOL_USU_CORP = 1;
        this.TAB_SOL_PETICION = 2;
        this.MODAL_ID = '#modalSolicitud';
        this.initAyuda();
        this.initSelectors();
        this.initForm();
    }
    ListSolicitudesComponent.prototype.initAyuda = function () {
        var ayuda = {};
        ayuda[__WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].tipoSolicitud] = new __WEBPACK_IMPORTED_MODULE_11_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Tipo Solicitud', "Seleccione entre solicitudes [" + __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["c" /* EnumTipoSolicitud */].N_PROPIAS + "] o [" + __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["c" /* EnumTipoSolicitud */].N_EXTERNAS + "] para autorizar");
        ayuda[__WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].estatusSolicitud] = new __WEBPACK_IMPORTED_MODULE_11_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Estatus Solicitud', 'Seleccione el estatus del tipo de solicitud seleccionado');
        __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].ayuda = ayuda;
    };
    ListSolicitudesComponent.prototype.initSelectors = function () {
        var selectorUsuCorp = {};
        var selectorPeticion = {};
        var key = __WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].tipoSolicitud;
        selectorUsuCorp[key] = [];
        selectorPeticion[key] = [];
        __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["c" /* EnumTipoSolicitud */].getNameValuePairs().forEach(function (data) {
            selectorUsuCorp[key].push({ label: data.name, value: data.value });
            selectorPeticion[key].push({ label: data.name, value: data.value });
        });
        key = __WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].estatusSolicitud;
        selectorUsuCorp[key] = [];
        selectorPeticion[key] = [];
        __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["b" /* EnumEstatus */].getNameValuePairs().forEach(function (data) {
            selectorPeticion[key].push({ label: data.name, value: data.value });
            selectorUsuCorp[key].push({ label: data.name, value: data.value });
        });
        selectorUsuCorp[key] = selectorUsuCorp[key].filter(function (item) {
            return item.value !== __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["b" /* EnumEstatus */].URGENTE;
        });
        __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].dataSelectorSolUsuCorp = selectorUsuCorp;
        __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].dataSelectorSolPeticion = selectorPeticion;
    };
    ListSolicitudesComponent.prototype.initForm = function () {
        this.formMessages = {};
        this.formErrors = {};
        var key = __WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].comentario;
        this.formMessages[key] = {};
        this.formMessages[key][__WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED] = __WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].getDefaultMessage(__WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED);
        this.formMessages[key][__WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].MIN_LENGTH] = "Se requiere un m\u00EDnimo de " + __WEBPACK_IMPORTED_MODULE_9__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MIN_CHARS + " caracteres";
        this.formMessages[key][__WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].MAX_LENGTH] = "Se requiere un m\u00E1ximo de " + __WEBPACK_IMPORTED_MODULE_9__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MAX_CHARS + " caracteres";
    };
    ListSolicitudesComponent.prototype.ngOnInit = function () {
        this.selTab = this.TAB_SOL_USU_CORP;
        __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].usuario = this.service.getSessionUser();
        this.isSolUsuCorpEnabled = true;
        this.resetForm();
    };
    ListSolicitudesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var idusuario = __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].usuario.id;
        this.service.getUsuarioPropertiesByUsuario(idusuario).subscribe(function (data) {
            __WEBPACK_IMPORTED_MODULE_13__common_SharedData__["a" /* SharedData */].usuarioProperties = data;
            if (data.autorizador && !data.respUsuCorp) {
                _this.isSolUsuCorpEnabled = false;
                _this.selTab = _this.TAB_SOL_PETICION;
                jQuery('#tablist-tipoSolicitud a[href="#tab-SolPeticion"]').tab('show');
            }
            _this.initChildren();
        });
    };
    ListSolicitudesComponent.prototype.resetForm = function () {
        this.modalData = __WEBPACK_IMPORTED_MODULE_6__utils_ModalData__["a" /* ModalData */].getNewInstance();
        this.isValidComentario = false;
    };
    ListSolicitudesComponent.prototype.initChildren = function () {
        var _this = this;
        if (this.isSolUsuCorpEnabled) {
            this.ListSolUsuarioCorp.initComponent();
            this.ListSolUsuarioCorp.outputModalData.subscribe(function (data) {
                _this.setModalData(data);
            });
        }
        this.ListSolPeticionesWeb.initComponent();
        this.ListSolPeticionesWeb.outputModalData.subscribe(function (data) {
            _this.setModalData(data);
        });
    };
    ListSolicitudesComponent.prototype.clearScreen = function () {
        this.modalData = __WEBPACK_IMPORTED_MODULE_6__utils_ModalData__["a" /* ModalData */].getNewInstance();
        if (this.selTab === this.TAB_SOL_USU_CORP) {
            this.ListSolUsuarioCorp.clearScreen();
        }
        else {
            this.ListSolPeticionesWeb.clearScreen();
        }
    };
    ListSolicitudesComponent.prototype.setModalData = function (data) {
        if (data) {
            this.modalData = data;
            this.isValidComentario = !this.modalData.required;
            this.modalShow();
        }
    };
    ListSolicitudesComponent.prototype.setFormError = function (key, validation) {
        this.formErrors[key] = '';
        if (validation) {
            this.formErrors[key] = this.formMessages[key][validation];
        }
    };
    ListSolicitudesComponent.prototype.onClickTab = function (tab) {
        this.selTab = tab;
        this.clearScreen();
    };
    ListSolicitudesComponent.prototype.onClickModalOK = function () {
        if (this.selTab === this.TAB_SOL_USU_CORP) {
            this.ListSolUsuarioCorp.actualizarModal(this.modalData);
        }
        else {
            this.ListSolPeticionesWeb.actualizarModal(this.modalData);
        }
        this.modalHide();
        this.resetForm();
    };
    ListSolicitudesComponent.prototype.onClickModalCancel = function () {
        this.modalHide();
    };
    ListSolicitudesComponent.prototype.modalShow = function () { jQuery(this.MODAL_ID).modal('show'); };
    ListSolicitudesComponent.prototype.modalHide = function () { jQuery(this.MODAL_ID).modal('hide'); };
    ListSolicitudesComponent.prototype.validateModalInput = function (event) {
        this.modalData.input = event;
        var key = __WEBPACK_IMPORTED_MODULE_10__utils_Constants__["a" /* Constants */].comentario;
        this.setFormError(key);
        if (!this.modalData.required) {
            this.isValidComentario = true;
            return;
        }
        var value = this.modalData.input;
        var validation = null;
        if (__WEBPACK_IMPORTED_MODULE_7__utils_StringUtils__["a" /* StringUtils */].isBlank(value)) {
            validation = __WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED;
        }
        else if (!__WEBPACK_IMPORTED_MODULE_7__utils_StringUtils__["a" /* StringUtils */].hasMinChars(this.modalData.input, __WEBPACK_IMPORTED_MODULE_9__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MIN_CHARS)) {
            validation = __WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].MIN_LENGTH;
        }
        else if (__WEBPACK_IMPORTED_MODULE_7__utils_StringUtils__["a" /* StringUtils */].hasMaxChars(this.modalData.input, __WEBPACK_IMPORTED_MODULE_9__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MAX_CHARS)) {
            validation = __WEBPACK_IMPORTED_MODULE_8__utils_FormValidationType__["a" /* FormValidationType */].MAX_LENGTH;
        }
        this.setFormError(key, validation);
        this.isValidComentario = __WEBPACK_IMPORTED_MODULE_7__utils_StringUtils__["a" /* StringUtils */].isBlank(this.formErrors[key]);
    };
    return ListSolicitudesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__list_sol_usuario_corp_list_sol_usuario_corp_component__["a" /* ListSolUsuarioCorpComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__list_sol_usuario_corp_list_sol_usuario_corp_component__["a" /* ListSolUsuarioCorpComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__list_sol_usuario_corp_list_sol_usuario_corp_component__["a" /* ListSolUsuarioCorpComponent */]) === "function" && _a || Object)
], ListSolicitudesComponent.prototype, "ListSolUsuarioCorp", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__list_sol_peticiones_web_list_sol_peticiones_web_component__["a" /* ListSolPeticionesWebComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__list_sol_peticiones_web_list_sol_peticiones_web_component__["a" /* ListSolPeticionesWebComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__list_sol_peticiones_web_list_sol_peticiones_web_component__["a" /* ListSolPeticionesWebComponent */]) === "function" && _b || Object)
], ListSolicitudesComponent.prototype, "ListSolPeticionesWeb", void 0);
ListSolicitudesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-solicitudes',
        template: __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__alert_service__["a" /* AlertService */]) === "function" && _e || Object])
], ListSolicitudesComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/list-solicitudes.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/AplicativoTelcel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AplicativoTelcel; });
/* harmony export (immutable) */ __webpack_exports__["b"] = toAplicativoTelcel;
/* harmony export (immutable) */ __webpack_exports__["c"] = toAplicativoTelcelList;
/* unused harmony export mapAplicativoTelcel */
/* unused harmony export mapAplicativoTelcelList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_core_model_Area__ = __webpack_require__("./src/app/core/model/Area.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");


var AplicativoTelcel = (function () {
    function AplicativoTelcel(id, nombre, descripcion, areaResponsable, nombreCompuesto) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.areaResponsable = areaResponsable;
        this.nombreCompuesto = nombreCompuesto;
    }
    AplicativoTelcel.getNewInstance = function (id) {
        return new AplicativoTelcel(id, '', '', null, '');
    };
    AplicativoTelcel.getAreaNombre = function (aplicativo) {
        if (aplicativo && aplicativo.areaResponsable) {
            return aplicativo.areaResponsable.nombre;
        }
        return '';
    };
    return AplicativoTelcel;
}());

AplicativoTelcel.MAX_NOMBRE = 255;
AplicativoTelcel.MAX_DESCRIPCION = 500;
function toAplicativoTelcel(r) {
    var output = null;
    if (r) {
        var area = Object(__WEBPACK_IMPORTED_MODULE_0_app_core_model_Area__["a" /* toArea */])(r.areaResponsable);
        var name = __WEBPACK_IMPORTED_MODULE_1__utils_StringUtils__["a" /* StringUtils */].trimToEmpty(r.nombre);
        output = ({
            id: r.id,
            nombre: name,
            descripcion: r.descripcion,
            areaResponsable: area,
            nombreCompuesto: name + " (" + (area ? __WEBPACK_IMPORTED_MODULE_1__utils_StringUtils__["a" /* StringUtils */].toUpperCase(area.nombre, true) : 'SIN AREA') + ")"
        });
    }
    return output;
}
function toAplicativoTelcelList(r) {
    var output = [];
    if (r) {
        output = r.map(toAplicativoTelcel);
    }
    return output;
}
function mapAplicativoTelcel(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toAplicativoTelcel(responseJson);
    }
    return output;
}
function mapAplicativoTelcelList(response) {
    var output = [];
    var responseJson = response.json();
    if (responseJson) {
        output = toAplicativoTelcelList(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/AplicativoTelcel.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/Peticion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Peticion; });
/* unused harmony export toPeticion */
/* harmony export (immutable) */ __webpack_exports__["c"] = toPeticionList;
/* unused harmony export mapPeticion */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapPeticionList;
var Peticion = (function () {
    function Peticion(id, usuarioCorp, ip, region, transaccion, peticionesPorMinuto, solicitudPeticion, ambiente, estatus, repetida) {
        this.id = id;
        this.usuarioCorp = usuarioCorp;
        this.ip = ip;
        this.region = region;
        this.transaccion = transaccion;
        this.peticionesPorMinuto = peticionesPorMinuto;
        this.solicitudPeticion = solicitudPeticion;
        this.ambiente = ambiente;
        this.estatus = estatus;
        this.repetida = repetida;
    }
    Peticion.getNewInstance = function () {
        return new Peticion(null, '', '', '', '', 0, null, -1, -1, false);
    };
    Peticion.getClone = function (p) {
        return new Peticion(p.id, p.usuarioCorp, p.ip, p.region, p.transaccion, p.peticionesPorMinuto, p.solicitudPeticion, p.ambiente, p.estatus, p.repetida);
    };
    return Peticion;
}());

Peticion.MIN_PPM = 1;
Peticion.MAX_PPM = 150;
Peticion.WILDCARD = '*';
Peticion.ALL_IP = '0.0.0.0';
function toPeticion(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            usuarioCorp: r.usuarioCorp,
            ip: r.ip,
            region: r.region,
            transaccion: r.transaccion,
            peticionesPorMinuto: r.peticionesPorMinuto,
            solicitudPeticion: r.solicitudPeticion,
            ambiente: r.ambiente,
            estatus: r.estatus,
            repetida: r.repetida
        });
    }
    return output;
}
function toPeticionList(r) {
    var output = [];
    if (r) {
        output = r.map(toPeticion);
    }
    return output;
}
function mapPeticion(response) {
    var responseJson = response.json();
    var output = null;
    if (responseJson) {
        output = toPeticion(responseJson);
    }
    return output;
}
function mapPeticionList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = responseJson.map(toPeticion);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/Peticion.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/PeticionAutorizador.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NivelPeticionAutorizador */
/* unused harmony export PeticionAutorizador */
/* harmony export (immutable) */ __webpack_exports__["a"] = toPeticionAutorizador;
/* unused harmony export toPeticionAutorizadorList */
/* unused harmony export mapPeticionAutorizador */
/* unused harmony export mapPeticionAutorizadorList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");

var NivelPeticionAutorizador;
(function (NivelPeticionAutorizador) {
    NivelPeticionAutorizador[NivelPeticionAutorizador["GERENTE"] = 1] = "GERENTE";
    NivelPeticionAutorizador[NivelPeticionAutorizador["JEFE"] = 2] = "JEFE";
    NivelPeticionAutorizador[NivelPeticionAutorizador["SUPERVISOR"] = 3] = "SUPERVISOR";
})(NivelPeticionAutorizador || (NivelPeticionAutorizador = {}));
var PeticionAutorizador = (function () {
    function PeticionAutorizador(id, usuario, nivel) {
        this.id = id;
        this.usuario = usuario;
        this.nivel = nivel;
    }
    PeticionAutorizador.getNewInstance = function () {
        return new PeticionAutorizador(null, null, 0);
    };
    PeticionAutorizador.isAutorizadorDev = function (autorizador) {
        return (autorizador.nivel === NivelPeticionAutorizador.GERENTE);
    };
    return PeticionAutorizador;
}());

function toPeticionAutorizador(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            usuario: Object(__WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__["h" /* toUsuario */])(r.idUsuario),
            nivel: r.nivel
        });
    }
    return output;
}
function toPeticionAutorizadorList(r) {
    var output = [];
    if (r) {
        output = r.map(toPeticionAutorizador);
    }
    return output;
}
function mapPeticionAutorizador(response) {
    var responseJson = response.json();
    var output = PeticionAutorizador.getNewInstance();
    if (responseJson) {
        output = toPeticionAutorizador(responseJson);
    }
    return output;
}
function mapPeticionAutorizadorList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = responseJson.map(toPeticionAutorizador);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PeticionAutorizador.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/PeticionData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeticionData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SolicitudPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");



var PeticionData = (function () {
    function PeticionData(id, usuarioCorp, ip, region, transaccion, peticionesPorMinuto, solicitudPeticion, ambiente, estatus, repetida) {
        this.id = id;
        this.usuarioCorp = usuarioCorp;
        this.ip = ip;
        this.region = region;
        this.transaccion = transaccion;
        this.peticionesPorMinuto = peticionesPorMinuto;
        this.solicitudPeticion = solicitudPeticion;
        this.ambiente = ambiente;
        this.estatus = estatus;
        this.repetida = repetida;
    }
    PeticionData.getNewInstance = function (id) {
        return new PeticionData(id, '', '', '', '', '', '', '', '', false);
    };
    PeticionData.getClone = function (p) {
        return new PeticionData(p.id, p.usuarioCorp, p.ip, p.region, p.transaccion, p.peticionesPorMinuto, p.solicitudPeticion, p.ambiente, p.estatus, p.repetida);
    };
    PeticionData.getColumns = function () {
        return [
            { header: 'ID', field: 'id' },
            { header: 'Usuario Corporativo', field: 'usuarioCorp' },
            { header: 'IP', field: 'ip' },
            { header: 'Región', field: 'region' },
            { header: 'Transacción', field: 'transaccion' },
            { header: 'Peticiones por Minuto', field: 'peticionesPorMinuto' },
            { header: 'Ambiente', field: 'ambiente' },
            { header: 'Estatus', field: 'estatus' },
            { header: 'ID Solicitud', field: 'solicitudPeticion' }
        ];
    };
    PeticionData.toPeticionData = function (r) {
        var output = null;
        if (r) {
            output = ({
                id: r.id,
                usuarioCorp: r.usuarioCorp,
                ip: r.ip,
                region: r.region,
                transaccion: r.transaccion,
                peticionesPorMinuto: "" + r.peticionesPorMinuto,
                solicitudPeticion: r.solicitudPeticion ? "" + r.solicitudPeticion.id : '',
                ambiente: __WEBPACK_IMPORTED_MODULE_0__utils_EnumData__["a" /* EnumAmbiente */].getName(r.ambiente),
                estatus: __WEBPACK_IMPORTED_MODULE_0__utils_EnumData__["b" /* EnumEstatus */].getName(r.estatus)
            });
        }
        return output;
    };
    PeticionData.toPeticion = function (r) {
        var output = null;
        if (r) {
            var petSol = null;
            if (!__WEBPACK_IMPORTED_MODULE_2__utils_StringUtils__["a" /* StringUtils */].isBlank(r.solicitudPeticion) && r.solicitudPeticion != '-1') {
                petSol = __WEBPACK_IMPORTED_MODULE_1__SolicitudPeticion__["a" /* SolicitudPeticion */].getNewInstance(Number(r.solicitudPeticion));
            }
            var petId = null;
            if (r.id != null && r.id > 0) {
                petId = r.id;
            }
            output = ({
                id: petId,
                usuarioCorp: r.usuarioCorp,
                ip: r.ip,
                region: r.region,
                transaccion: r.transaccion,
                peticionesPorMinuto: Number(r.peticionesPorMinuto),
                solicitudPeticion: petSol,
                ambiente: __WEBPACK_IMPORTED_MODULE_0__utils_EnumData__["a" /* EnumAmbiente */].getValue(r.ambiente),
                estatus: __WEBPACK_IMPORTED_MODULE_0__utils_EnumData__["b" /* EnumEstatus */].getValue(r.estatus)
            });
        }
        return output;
    };
    return PeticionData;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PeticionData.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/PeticionPaginator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeticionPaginator; });
/* unused harmony export toPeticionPaginator */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapPeticionPaginator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");

var PeticionPaginator = (function () {
    function PeticionPaginator(listPeticion, size, totalElements, totalPages, number) {
        this.listPeticion = listPeticion;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.number = number;
    }
    PeticionPaginator.getNewInstance = function () {
        return new PeticionPaginator([], 0, 0, 0, 0);
    };
    return PeticionPaginator;
}());

function toPeticionPaginator(r) {
    var output = null;
    if (r) {
        output = ({
            listPeticion: Object(__WEBPACK_IMPORTED_MODULE_0__Peticion__["c" /* toPeticionList */])(r.content),
            size: r.size,
            totalElements: r.totalElements,
            totalPages: r.totalPages,
            number: r.number
        });
    }
    return output;
}
function mapPeticionPaginator(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toPeticionPaginator(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PeticionPaginator.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/PeticionProperties.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PeticionProperties */
/* unused harmony export toPeticionProperties */
/* harmony export (immutable) */ __webpack_exports__["a"] = mapPeticionProperties;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__catalogos_model_M2kCatTransaccionesFront__ = __webpack_require__("./src/app/catalogos/model/M2kCatTransaccionesFront.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_model_Area__ = __webpack_require__("./src/app/core/model/Area.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_model_M2kCatUsuarios__ = __webpack_require__("./src/app/core/model/M2kCatUsuarios.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AplicativoTelcel__ = __webpack_require__("./src/app/peticiones-ws/model/AplicativoTelcel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UsuarioProperties__ = __webpack_require__("./src/app/peticiones-ws/model/UsuarioProperties.ts");





var PeticionProperties = (function () {
    function PeticionProperties(listM2kCatUsuarios, listM2kCatTransaccionesFront, listArea, usuarioProperties, listAplicativo) {
        this.listM2kCatUsuarios = listM2kCatUsuarios;
        this.listM2kCatTransaccionesFront = listM2kCatTransaccionesFront;
        this.listArea = listArea;
        this.usuarioProperties = usuarioProperties;
        this.listAplicativo = listAplicativo;
    }
    PeticionProperties.getNewInstance = function () {
        return new PeticionProperties([], [], [], null, []);
    };
    return PeticionProperties;
}());

function toPeticionProperties(r) {
    var output = null;
    if (r) {
        output = ({
            listM2kCatUsuarios: Object(__WEBPACK_IMPORTED_MODULE_2__core_model_M2kCatUsuarios__["a" /* toM2kCatUsuariosList */])(r.listM2kCatUsuarios),
            listM2kCatTransaccionesFront: Object(__WEBPACK_IMPORTED_MODULE_0__catalogos_model_M2kCatTransaccionesFront__["b" /* toM2kCatTransaccionesFrontList */])(r.listM2kCatTransaccionesFront),
            listArea: Object(__WEBPACK_IMPORTED_MODULE_1__core_model_Area__["b" /* toAreaList */])(r.listArea),
            usuarioProperties: Object(__WEBPACK_IMPORTED_MODULE_4__UsuarioProperties__["c" /* toUsuarioProperties */])(r.usuarioProperties),
            listAplicativo: Object(__WEBPACK_IMPORTED_MODULE_3__AplicativoTelcel__["c" /* toAplicativoTelcelList */])(r.listAplicativo)
        });
    }
    return output;
}
function mapPeticionProperties(response) {
    var responseJson = response.json();
    var output = PeticionProperties.getNewInstance();
    if (responseJson) {
        output = toPeticionProperties(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/PeticionProperties.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/ResponsableUsuarioCorp.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ResponsableUsuarioCorp */
/* harmony export (immutable) */ __webpack_exports__["b"] = toResponsableUsuarioCorp;
/* unused harmony export toResponsableUsuarioCorpList */
/* harmony export (immutable) */ __webpack_exports__["a"] = mapResponsableUsuarioCorp;
/* unused harmony export mapResponsableUsuarioCorpList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");

var ResponsableUsuarioCorp = (function () {
    function ResponsableUsuarioCorp(id, usuarioCorp, responsable) {
        this.id = id;
        this.usuarioCorp = usuarioCorp;
        this.responsable = responsable;
    }
    ResponsableUsuarioCorp.getNewInstance = function () {
        return new ResponsableUsuarioCorp(null, '', __WEBPACK_IMPORTED_MODULE_0__admin_admin_service__["f" /* User */].getNewInstance());
    };
    return ResponsableUsuarioCorp;
}());

function toResponsableUsuarioCorp(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            usuarioCorp: r.usuarioCorp,
            responsable: Object(__WEBPACK_IMPORTED_MODULE_0__admin_admin_service__["h" /* toUsuario */])(r.responsable)
        });
    }
    return output;
}
function toResponsableUsuarioCorpList(r) {
    var output = [];
    if (r) {
        output = r.map(toResponsableUsuarioCorp);
    }
    return output;
}
function mapResponsableUsuarioCorp(response) {
    var responseJson = response.json();
    var output = null;
    if (responseJson) {
        output = toResponsableUsuarioCorp(responseJson);
    }
    return output;
}
function mapResponsableUsuarioCorpList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = responseJson.map(toResponsableUsuarioCorp);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ResponsableUsuarioCorp.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/SolicitudPeticion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudPeticion; });
/* harmony export (immutable) */ __webpack_exports__["c"] = toSolicitudPeticion;
/* unused harmony export toSolicitudPeticionList */
/* unused harmony export mapSolicitudPeticion */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapSolicitudPeticionList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AplicativoTelcel__ = __webpack_require__("./src/app/peticiones-ws/model/AplicativoTelcel.ts");


var SolicitudPeticion = (function () {
    function SolicitudPeticion(id, fechaRegistro, estatus, aplicativo, ambiente, fechaCaducidad, solicitante, justificacion, autorizador, fechaAutorizacion, comentarioAutorizador) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.aplicativo = aplicativo;
        this.ambiente = ambiente;
        this.fechaCaducidad = fechaCaducidad;
        this.solicitante = solicitante;
        this.justificacion = justificacion;
        this.autorizador = autorizador;
        this.fechaAutorizacion = fechaAutorizacion;
        this.comentarioAutorizador = comentarioAutorizador;
    }
    SolicitudPeticion.getNewInstance = function (id) {
        return new SolicitudPeticion(id, null, -1, null, -1, null, null, '', null, null, '');
    };
    return SolicitudPeticion;
}());

SolicitudPeticion.MIN_CHARS = 10;
SolicitudPeticion.MAX_CHARS = 500;
function toSolicitudPeticion(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            fechaRegistro: r.fechaRegistro,
            estatus: r.estatus,
            aplicativo: Object(__WEBPACK_IMPORTED_MODULE_1__AplicativoTelcel__["b" /* toAplicativoTelcel */])(r.aplicativo),
            ambiente: r.ambiente,
            fechaCaducidad: r.fechaCaducidad,
            solicitante: Object(__WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__["h" /* toUsuario */])(r.solicitante),
            justificacion: r.justificacion,
            autorizador: Object(__WEBPACK_IMPORTED_MODULE_0_app_admin_admin_service__["h" /* toUsuario */])(r.autorizador),
            fechaAutorizacion: r.fechaAutorizacion,
            comentarioAutorizador: r.comentarioAutorizador,
        });
    }
    return output;
}
function toSolicitudPeticionList(r) {
    var output = [];
    if (r) {
        output = r.map(toSolicitudPeticion);
    }
    return output;
}
function mapSolicitudPeticion(response) {
    var responseJson = response.json();
    var output = null;
    if (responseJson) {
        output = toSolicitudPeticion(responseJson);
    }
    return output;
}
function mapSolicitudPeticionList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = toSolicitudPeticionList(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/SolicitudPeticion.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/SolicitudUsuarioCorp.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudUsuarioCorp; });
/* harmony export (immutable) */ __webpack_exports__["c"] = toSolicitudUsuarioCorp;
/* unused harmony export toSolicitudUsuarioCorpList */
/* unused harmony export mapSolicitudUsuarioCorp */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapSolicitudUsuarioCorpList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_admin_service__ = __webpack_require__("./src/app/admin/admin.service.ts");

var SolicitudUsuarioCorp = (function () {
    function SolicitudUsuarioCorp(id, fechaRegistro, estatus, usuarioCorp, solicitante, justificacion, comentarioResponsable) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.usuarioCorp = usuarioCorp;
        this.solicitante = solicitante;
        this.justificacion = justificacion;
        this.comentarioResponsable = comentarioResponsable;
    }
    SolicitudUsuarioCorp.getNewInstance = function () {
        return new SolicitudUsuarioCorp(null, null, -1, '', __WEBPACK_IMPORTED_MODULE_0__admin_admin_service__["f" /* User */].getNewInstance(), '', '');
    };
    return SolicitudUsuarioCorp;
}());

SolicitudUsuarioCorp.MIN_CHARS = 10;
SolicitudUsuarioCorp.MAX_CHARS = 500;
function toSolicitudUsuarioCorp(r) {
    var output = null;
    if (r) {
        output = ({
            id: r.id,
            fechaRegistro: r.fechaRegistro,
            estatus: r.estatus,
            usuarioCorp: r.usuarioCorp,
            solicitante: Object(__WEBPACK_IMPORTED_MODULE_0__admin_admin_service__["h" /* toUsuario */])(r.solicitante),
            justificacion: r.justificacion,
            comentarioResponsable: r.comentarioResponsable
        });
    }
    return output;
}
function toSolicitudUsuarioCorpList(r) {
    var output = [];
    if (r) {
        output = r.map(toSolicitudUsuarioCorp);
    }
    return output;
}
function mapSolicitudUsuarioCorp(response) {
    var responseJson = response.json();
    var output = null;
    if (responseJson) {
        output = toSolicitudUsuarioCorp(responseJson);
    }
    return output;
}
function mapSolicitudUsuarioCorpList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = responseJson.map(toSolicitudUsuarioCorp);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/SolicitudUsuarioCorp.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/UsuarioProperties.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProperties; });
/* harmony export (immutable) */ __webpack_exports__["c"] = toUsuarioProperties;
/* unused harmony export toUsuarioPropertiesList */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapUsuarioProperties;
/* unused harmony export mapUsuarioPropertiesList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResponsableUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/ResponsableUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PeticionAutorizador__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionAutorizador.ts");


var UsuarioProperties = (function () {
    function UsuarioProperties(respUsuCorp, autorizador, administrador) {
        this.respUsuCorp = respUsuCorp;
        this.autorizador = autorizador;
        this.administrador = administrador;
    }
    UsuarioProperties.getNewInstance = function () {
        return new UsuarioProperties(null, null, false);
    };
    UsuarioProperties.isAdminOrAutorizador = function (props) {
        return (props.administrador || props.autorizador != null);
    };
    return UsuarioProperties;
}());

function toUsuarioProperties(r) {
    var output = null;
    if (r) {
        output = ({
            respUsuCorp: Object(__WEBPACK_IMPORTED_MODULE_0__ResponsableUsuarioCorp__["b" /* toResponsableUsuarioCorp */])(r.respUsuCorp),
            autorizador: Object(__WEBPACK_IMPORTED_MODULE_1__PeticionAutorizador__["a" /* toPeticionAutorizador */])(r.autorizador),
            administrador: r.administrador
        });
    }
    return output;
}
function toUsuarioPropertiesList(r) {
    var output = [];
    if (r) {
        output = r.map(toUsuarioProperties);
    }
    return output;
}
function mapUsuarioProperties(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toUsuarioProperties(responseJson);
    }
    return output;
}
function mapUsuarioPropertiesList(response) {
    var output = [];
    var responseJson = response.json();
    if (responseJson) {
        output = responseJson.map(toUsuarioProperties);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/UsuarioProperties.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/WrapPeticion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WrapPeticion; });
var WrapPeticion = (function () {
    function WrapPeticion(usuario, urgente, accion, listPeticion, filterQuery) {
        this.usuario = usuario;
        this.urgente = urgente;
        this.accion = accion;
        this.listPeticion = listPeticion;
        this.filterQuery = filterQuery;
    }
    WrapPeticion.getNewInstance = function () {
        return new WrapPeticion(null, false, -1, [], null);
    };
    return WrapPeticion;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/WrapPeticion.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/WrapSolicitudPeticion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WrapSolicitudPeticion; });
/* harmony export (immutable) */ __webpack_exports__["b"] = toWrapSolicitudPeticion;
/* unused harmony export mapWrapSolicitudPeticion */
/* unused harmony export mapWrapSolicitudPeticionList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SolicitudPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");


var WrapSolicitudPeticion = (function () {
    function WrapSolicitudPeticion(solicitudPeticion, listPeticion) {
        this.solicitudPeticion = solicitudPeticion;
        this.listPeticion = listPeticion;
    }
    WrapSolicitudPeticion.getNewInstance = function () {
        return new WrapSolicitudPeticion(null, []);
    };
    return WrapSolicitudPeticion;
}());

function toWrapSolicitudPeticion(r) {
    var output = null;
    if (r) {
        output = ({
            solicitudPeticion: Object(__WEBPACK_IMPORTED_MODULE_0__SolicitudPeticion__["c" /* toSolicitudPeticion */])(r.solicitudPeticion),
            listPeticion: Object(__WEBPACK_IMPORTED_MODULE_1__Peticion__["c" /* toPeticionList */])(r.listPeticion)
        });
    }
    return output;
}
function mapWrapSolicitudPeticion(response) {
    var responseJson = response.json();
    var output = null;
    if (responseJson) {
        output = toWrapSolicitudPeticion(responseJson);
    }
    return output;
}
function mapWrapSolicitudPeticionList(response) {
    var responseJson = response.json();
    var output = [];
    if (responseJson) {
        output = responseJson.map(toWrapSolicitudPeticion);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/WrapSolicitudPeticion.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/model/WrapSolicitudUsuarioCorp.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WrapSolicitudUsuarioCorp; });
/* unused harmony export toWrapSolicitudUsuarioCorp */
/* unused harmony export mapWrapSolicitudUsuarioCorp */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResponsableUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/ResponsableUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SolicitudUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudUsuarioCorp.ts");


var WrapSolicitudUsuarioCorp = (function () {
    function WrapSolicitudUsuarioCorp(respUsuCorp, solicitud, reporte) {
        this.respUsuCorp = respUsuCorp;
        this.solicitud = solicitud;
        this.reporte = reporte;
    }
    WrapSolicitudUsuarioCorp.getNewInstance = function () {
        return new WrapSolicitudUsuarioCorp(null, null, 0);
    };
    return WrapSolicitudUsuarioCorp;
}());

function toWrapSolicitudUsuarioCorp(r) {
    var output = null;
    if (r) {
        output = ({
            respUsuCorp: Object(__WEBPACK_IMPORTED_MODULE_0__ResponsableUsuarioCorp__["b" /* toResponsableUsuarioCorp */])(r.respUsuCorp),
            solicitud: Object(__WEBPACK_IMPORTED_MODULE_1__SolicitudUsuarioCorp__["c" /* toSolicitudUsuarioCorp */])(r.solicitud)
        });
    }
    return output;
}
function mapWrapSolicitudUsuarioCorp(response) {
    var output = null;
    var responseJson = response.json();
    if (responseJson) {
        output = toWrapSolicitudUsuarioCorp(responseJson);
    }
    return output;
}
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/WrapSolicitudUsuarioCorp.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/peticiones-ws.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeticionesWSModule", function() { return PeticionesWSModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("./node_modules/primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__peticiones_ws_routing__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__solicitud_usuario_corp_solicitud_usuario_corp_component__ = __webpack_require__("./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__solicitud_peticiones_web_solicitud_peticiones_web_component__ = __webpack_require__("./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__help_help_module__ = __webpack_require__("./src/app/help/help.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__list_solicitudes_list_solicitudes_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__list_solicitudes_list_sol_usuario_corp_list_sol_usuario_corp_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-usuario-corp/list-sol-usuario-corp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__list_solicitudes_list_sol_peticiones_web_list_sol_peticiones_web_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-sol-peticiones-web/list-sol-peticiones-web.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__admin_peticiones_admin_peticiones_component__ = __webpack_require__("./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var PeticionesWSModule = (function () {
    function PeticionesWSModule() {
    }
    return PeticionesWSModule;
}());
PeticionesWSModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SharedModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["BlockUIModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["PanelModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["ButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DropdownModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SpinnerModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputSwitchModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CheckboxModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["TooltipModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextareaModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["SelectButtonModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["AutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MultiSelectModule"],
            __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
            __WEBPACK_IMPORTED_MODULE_6__peticiones_ws_routing__["a" /* PeticionesWSRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_9__help_help_module__["a" /* HelpModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__solicitud_usuario_corp_solicitud_usuario_corp_component__["a" /* SolicitudUsuarioCorpComponent */], __WEBPACK_IMPORTED_MODULE_8__solicitud_peticiones_web_solicitud_peticiones_web_component__["a" /* SolicitudPeticionesWebComponent */], __WEBPACK_IMPORTED_MODULE_10__list_solicitudes_list_solicitudes_component__["a" /* ListSolicitudesComponent */], __WEBPACK_IMPORTED_MODULE_11__list_solicitudes_list_sol_usuario_corp_list_sol_usuario_corp_component__["a" /* ListSolUsuarioCorpComponent */], __WEBPACK_IMPORTED_MODULE_12__list_solicitudes_list_sol_peticiones_web_list_sol_peticiones_web_component__["a" /* ListSolPeticionesWebComponent */], __WEBPACK_IMPORTED_MODULE_13__admin_peticiones_admin_peticiones_component__["a" /* AdminPeticionesComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__peticiones_ws_service__["a" /* PeticionesWSService */]
        ]
    })
], PeticionesWSModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/peticiones-ws.module.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/peticiones-ws.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeticionesWSRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__solicitud_usuario_corp_solicitud_usuario_corp_component__ = __webpack_require__("./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__solicitud_peticiones_web_solicitud_peticiones_web_component__ = __webpack_require__("./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_solicitudes_list_solicitudes_component__ = __webpack_require__("./src/app/peticiones-ws/list-solicitudes/list-solicitudes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_peticiones_admin_peticiones_component__ = __webpack_require__("./src/app/peticiones-ws/admin-peticiones/admin-peticiones.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: 'solicitud_usuario_corp',
        component: __WEBPACK_IMPORTED_MODULE_2__solicitud_usuario_corp_solicitud_usuario_corp_component__["a" /* SolicitudUsuarioCorpComponent */],
    },
    {
        path: 'solicitud_peticiones_web',
        component: __WEBPACK_IMPORTED_MODULE_3__solicitud_peticiones_web_solicitud_peticiones_web_component__["a" /* SolicitudPeticionesWebComponent */],
    },
    {
        path: 'lista_solicitudes',
        component: __WEBPACK_IMPORTED_MODULE_4__list_solicitudes_list_solicitudes_component__["a" /* ListSolicitudesComponent */],
    },
    {
        path: 'admin_peticiones',
        component: __WEBPACK_IMPORTED_MODULE_5__admin_peticiones_admin_peticiones_component__["a" /* AdminPeticionesComponent */],
    },
];
var PeticionesWSRoutingModule = (function () {
    function PeticionesWSRoutingModule() {
    }
    return PeticionesWSRoutingModule;
}());
PeticionesWSRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
    })
], PeticionesWSRoutingModule);

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/peticiones-ws.routing.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/peticiones-ws.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeticionesWSService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_service__ = __webpack_require__("./src/app/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_ResponsableUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/ResponsableUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_SolicitudUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_PeticionProperties__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionProperties.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_SolicitudPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_UsuarioProperties__ = __webpack_require__("./src/app/peticiones-ws/model/UsuarioProperties.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_PeticionPaginator__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionPaginator.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var PeticionesWSService = (function () {
    function PeticionesWSService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* endpointServer */].basePath + '/rest';
        this.restUrl = this.baseUrl + '/peticiones-ws';
        this.restSearchUrl = this.restUrl + '/search';
    }
    PeticionesWSService.prototype.getSessionUser = function () {
        return JSON.parse(localStorage.getItem('user_session_data')).user;
    };
    PeticionesWSService.prototype.getUsuarioPropertiesByUsuario = function (idUsuario) {
        return this.globalService.get(this.restUrl + "/getUsuarioPropertiesByUsuario?idUsuario=" + idUsuario, __WEBPACK_IMPORTED_MODULE_9__model_UsuarioProperties__["b" /* mapUsuarioProperties */]);
    };
    // **************************************************
    // Solicitud Usuario Corporativo
    // **************************************************
    PeticionesWSService.prototype.getRespUsuCorpByUsuarioCorp = function (usuarioCorp) {
        return this.globalService.get(this.restUrl + "/getRespUsuCorpByUsuarioCorp?usuarioCorp=" + usuarioCorp, __WEBPACK_IMPORTED_MODULE_4__model_ResponsableUsuarioCorp__["a" /* mapResponsableUsuarioCorp */]);
    };
    PeticionesWSService.prototype.saveSolicitudUsuarioCorp = function (wrapSolicitud) {
        return this.globalService.post(this.restUrl + "/saveSolicitudUsuarioCorp", wrapSolicitud);
    };
    PeticionesWSService.prototype.reportUsuarioCorp = function (wrapSolicitud) {
        return this.globalService.post(this.restUrl + "/reportUsuarioCorp", wrapSolicitud);
    };
    // **************************************************
    // Solicitud Peticiones Web
    // **************************************************
    PeticionesWSService.prototype.getPeticionPropertiesByUsuario = function (idUsuario) {
        return this.globalService.get(this.restUrl + "/getPeticionPropertiesByUsuario?idUsuario=" + idUsuario, __WEBPACK_IMPORTED_MODULE_6__model_PeticionProperties__["a" /* mapPeticionProperties */]);
    };
    PeticionesWSService.prototype.saveSolicitudPeticion = function (wrapSolicitud) {
        return this.globalService.post(this.restUrl + "/saveSolicitudPeticion", wrapSolicitud);
    };
    // **************************************************
    // List Solicitudes - Usuario Corporativo
    // **************************************************
    PeticionesWSService.prototype.getAllSolUsuCorpBySolicitante = function (idUsuario) {
        return this.globalService.get(this.restUrl + "/getAllSolUsuCorpBySolicitante?idUsuario=" + idUsuario, __WEBPACK_IMPORTED_MODULE_5__model_SolicitudUsuarioCorp__["b" /* mapSolicitudUsuarioCorpList */]);
    };
    PeticionesWSService.prototype.getAllSolUsuCorpByResponsable = function (idUsuario) {
        return this.globalService.get(this.restUrl + "/getAllSolUsuCorpByResponsable?idUsuario=" + idUsuario, __WEBPACK_IMPORTED_MODULE_5__model_SolicitudUsuarioCorp__["b" /* mapSolicitudUsuarioCorpList */]);
    };
    PeticionesWSService.prototype.getAllSolUsuCorp = function () {
        return this.globalService.get(this.restUrl + "/getAllSolUsuCorp", __WEBPACK_IMPORTED_MODULE_5__model_SolicitudUsuarioCorp__["b" /* mapSolicitudUsuarioCorpList */]);
    };
    PeticionesWSService.prototype.updateEstatusSolUsuCorp = function (listSolicitud) {
        return this.globalService.post(this.restUrl + "/updateEstatusSolUsuCorp", listSolicitud);
    };
    // **************************************************
    // List Solicitudes - Peticion
    // **************************************************
    PeticionesWSService.prototype.getAllSolPeticionBySolicitante = function (idUsuario) {
        return this.globalService.get(this.restUrl + "/getAllSolPeticionBySolicitante?idUsuario=" + idUsuario, __WEBPACK_IMPORTED_MODULE_7__model_SolicitudPeticion__["b" /* mapSolicitudPeticionList */]);
    };
    PeticionesWSService.prototype.getAllSolPeticionByNivelAutorizador = function (nivel) {
        return this.globalService.get(this.restUrl + "/getAllSolPeticionByNivelAutorizador?nivel=" + nivel, __WEBPACK_IMPORTED_MODULE_7__model_SolicitudPeticion__["b" /* mapSolicitudPeticionList */]);
    };
    PeticionesWSService.prototype.getAllSolPeticion = function () {
        return this.globalService.get(this.restUrl + "/getAllSolPeticion", __WEBPACK_IMPORTED_MODULE_7__model_SolicitudPeticion__["b" /* mapSolicitudPeticionList */]);
    };
    PeticionesWSService.prototype.getAllPeticionBySolicitud = function (idSolicitud) {
        return this.globalService.get(this.restUrl + "/getAllPeticionBySolicitud?idSolicitud=" + idSolicitud, __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["b" /* mapPeticionList */]);
    };
    PeticionesWSService.prototype.updateEstatusSolPeticion = function (listSolicitud) {
        return this.globalService.post(this.restUrl + "/updateEstatusSolPeticion", listSolicitud);
    };
    // **************************************************
    // Admin Peticiones
    // **************************************************
    PeticionesWSService.prototype.findAllPeticionByFilters = function (size, page, filters) {
        return this.globalService.get(this.restSearchUrl + "/findAllPeticionByFilters?size=" + size + "&page=" + page + "&filters=" + filters, __WEBPACK_IMPORTED_MODULE_10__model_PeticionPaginator__["b" /* mapPeticionPaginator */]);
    };
    PeticionesWSService.prototype.getAllPeticionByFilters = function (filters) {
        return this.globalService.get(this.restUrl + "/getAllPeticionByFilters?filters=" + filters, __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["b" /* mapPeticionList */]);
    };
    PeticionesWSService.prototype.updatePeticiones = function (wrapPeticion) {
        return this.globalService.post(this.restUrl + "/updatePeticiones", wrapPeticion);
    };
    PeticionesWSService.prototype.checkPeticionRepetida = function (peticion) {
        return this.globalService.post(this.restUrl + "/checkPeticionRepetida", peticion);
    };
    return PeticionesWSService;
}());
PeticionesWSService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_service__["a" /* GlobalService */]) === "function" && _b || Object])
], PeticionesWSService);

var _a, _b;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/peticiones-ws.service.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.css":
/***/ (function(module, exports) {

module.exports = ".noPadding {\r\n  padding: 0px;\r\n}\r\n\r\np-dropdown {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: 100%;\r\n}\r\n\r\np-spinner {\r\n  padding-left: 1px;\r\n  padding-top: 1px;\r\n  padding-right: 1px;\r\n  padding-bottom: 1px;\r\n  width: -webkit-fit-content;\r\n  width: -moz-fit-content;\r\n  width: fit-content;\r\n}\r\n\r\n.danger_marker {\r\n  color:red;\r\n  font-weight: bold;\r\n}\r\n\r\n.spinFa {\r\n  position: absolute;\r\n  z-index: 2;\r\n  opacity: 0.5;\r\n  bottom: 35px;\r\n  left: 45%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header\">\r\n  <h1>Solicitud de Peticiones WS-M2k</h1>\r\n  <p>Solicita permisos para el consumo de servicios web de M2k</p>\r\n</div>\r\n\r\n<p-dialog [(visible)]=\"isUIBlocked\" modal=\"modal\" width=\"0\" height=\"0\" [contentStyle]=\"{'width': '300px', 'height': '300px'}\" class=\"spinFa\" [responsive]=\"true\" [showHeader]=\"false\" [resizable]=\"false\" [draggable]=\"false\" [closable]=\"false\">\r\n  <i class=\"fa fa-spinner fa-spin\" style=\"font-size: 200px; text-align: center; color:rgb(0, 89, 255);\"></i>\r\n</p-dialog>\r\n\r\n<div *ngIf=\"!isComponentEnabled\">\r\n  <h1>No tienes permisos sobre este m&oacute;dulo</h1>\r\n</div>\r\n\r\n<div *ngIf=\"isComponentEnabled\">\r\n\r\n  <div class=\"row\" style=\"text-align: left; padding-top: 25px;\">\r\n    <p>Campos marcados con <span class=\"danger_marker\">*</span> son obligatorios</p>\r\n  </div>\r\n  <h2>Datos de la Solicitud</h2>\r\n\r\n  <div *ngIf=\"isAdmin\" class=\"row\">\r\n    <div class=\"col-md-2 form-group\">\r\n      <label for=\"urgente\">Solicitud Urgente</label>\r\n      <simple-help [ayuda]=\"ayuda.urgente\"></simple-help>\r\n      <div>\r\n        <p-checkbox id=\"urgente\" [(ngModel)]=\"isUrgente\" label=\"Urgente\" binary=\"true\" [disabled]=\"!isAdmin\" (onChange)=\"onChangeUrgente($event)\"></p-checkbox>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <form id=\"formSolicitud\" [formGroup]=\"formSolicitud\" (ngSubmit)=\"sendSolicitud()\" class=\"form-horizontal\">\r\n    <div class=\"row\" formGroupName=\"solicitudData\">\r\n      <div class=\"col-md-6 form-group\">\r\n        <label class=\"control-label\" for=\"aplicativo\">Aplicativo Telcel</label>\r\n        <span *ngIf=\"!isUrgente\" class=\"danger_marker\">*</span>\r\n        <simple-help [ayuda]=\"ayuda.aplicativo\"></simple-help>\r\n        <p-dropdown id=\"aplicativo\" formControlName=\"aplicativo\" [options]=\"dataSelector.aplicativo\" placeholder=\"--SELECCIONAR UN APLICATIVO--\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.aplicativo\"><i class=\"fa fa-close\"></i> {{formErrors.aplicativo}}</div>\r\n      </div>\r\n      <div class=\"col-md-2 form-group\">\r\n        <label class=\"control-label\" for=\"ambiente\">Ambiente de Ejecuci&oacute;n</label>\r\n        <span class=\"danger_marker\">*</span>\r\n        <simple-help [ayuda]=\"ayuda.ambiente\"></simple-help>\r\n        <p-dropdown id=\"ambiente\" formControlName=\"ambiente\" [options]=\"dataSelector.ambiente\" placeholder=\"--SELECCIONAR AMBIENTE EJECUCIÓN--\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\" (onChange)=\"onChangeAmbiente($event)\"></p-dropdown>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ambiente\"><i class=\"fa fa-close\"></i> {{formErrors.ambiente}}</div>\r\n      </div>\r\n      <div class=\"col-md-2 form-group\" *ngIf=\"isFechaEnabled\">\r\n        <label class=\"control-label\" for=\"fechaCaducidad\">Fecha Caducidad</label>\r\n        <span *ngIf=\"isUrgente\" class=\"danger_marker\">*</span>\r\n        <simple-help [ayuda]=\"ayuda.fechaCaducidad\"></simple-help>\r\n        <p-calendar id=\"fechaCaducidad\" formControlName=\"fechaCaducidad\" dateFormat=\"dd/mm/yy\" [minDate]=\"minDate\" [readonlyInput]=\"true\" [style]=\"{'width':'100%'}\"></p-calendar>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.fechaCaducidad\"><i class=\"fa fa-close\"></i> {{formErrors.fechaCaducidad}}</div>\r\n      </div>\r\n    </div>\r\n\r\n    <h2 style=\"padding-top: 25px;\">Datos de la Petici&oacute;n</h2>\r\n    <div class=\"row\" formGroupName=\"peticionData\">\r\n      <div class=\"col-md-2 form-group\">\r\n        <label class=\"control-label\" for=\"usuarioCorp\">Usuario Corporativo</label>\r\n        <simple-help [ayuda]=\"ayuda.usuarioCorp\"></simple-help>\r\n        <p-dropdown id=\"usuarioCorp\" formControlName=\"usuarioCorp\" [options]=\"dataSelector.usuarioCorp\" placeholder=\"--SELECCIONAR USUARIO--\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioCorp\"><i class=\"fa fa-close\"></i> {{formErrors.usuarioCorp}}</div>\r\n      </div>\r\n      <div class=\"col-md-3 form-group\">\r\n        <label class=\"control-label\" for=\"ip\">IP Ejecuci&oacute;n</label>\r\n        <simple-help [ayuda]=\"ayuda.ip\"></simple-help>\r\n        <div>\r\n          <input type=\"text\" id=\"ip\" [(ngModel)]=\"peticionData.ip\" [ngModelOptions]=\"{'standalone': true}\" placeholder=\"--INGRESSAR IP--\" style=\"width: 85%;\" />\r\n          <button type=\"button\" pButton class=\"btn btn-primary\" icon=\"fa fa-plus\" style=\"float: right;\" pTooltip=\"Agregar IP\" tooltipPosition=\"top\" (click)=\"onClickAddIP()\"></button>\r\n        </div>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ip\"><i class=\"fa fa-close\"></i> {{formErrors.ip}}</div>\r\n      </div>\r\n      <div class=\"col-md-2 form-group\">\r\n        <label class=\"control-label\" for=\"region\">Regi&oacute;n</label>\r\n        <simple-help [ayuda]=\"ayuda.region\"></simple-help>\r\n        <div>\r\n          <p-multiSelect id=\"region\" formControlName=\"region\" [style]=\"{'width': '100%'}\" [options]=\"dataSelector.region\" defaultLabel=\"--SELECCIONAR REGIÓN--\" (onChange)=\"onChangeRegion($event)\"></p-multiSelect>\r\n        </div>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.region\"><i class=\"fa fa-close\"></i> {{formErrors.region}}</div>\r\n      </div>\r\n      <div class=\"col-md-2 form-group\">\r\n        <label class=\"control-label\" for=\"transaccion\">Transacci&oacute;n</label>\r\n        <simple-help [ayuda]=\"ayuda.transaccion\"></simple-help>\r\n        <p-multiSelect id=\"transaccion\" formControlName=\"transaccion\" [style]=\"{'width': '100%'}\" [options]=\"dataSelector.transaccion\" defaultLabel=\"--SELECCIONAR TRANSACCIÓN--\" (onChange)=\"onChangeTransaccion($event)\"></p-multiSelect>\r\n        <!-- <p-dropdown id=\"transaccion\" formControlName=\"transaccion\" [options]=\"dataSelector.transaccion\" placeholder=\"--SELECCIONAR TRANSACCIÓN--\" [filter]=\"true\" [autoWidth]=\"false\" [style]=\"{'width':'100%'}\"></p-dropdown> -->\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.transaccion\"><i class=\"fa fa-close\"></i> {{formErrors.transaccion}}</div>\r\n      </div>\r\n      <div class=\"col-md-2 form-group\">\r\n        <label class=\"control-label\" for=\"ppm\">Peticiones Por Minuto</label>\r\n        <simple-help [ayuda]=\"ayuda.ppm\"></simple-help>\r\n        <p-spinner id=\"ppm\" formControlName=\"ppm\" [min]=\"MIN_PPM\" [max]=\"MAX_PPM\" maxlength=\"3\" [formatInput]=\"false\" placeholder=\"--INGRESAR CANTIDAD--\"></p-spinner>\r\n        <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.ppm\"><i class=\"fa fa-close\"></i> {{formErrors.ppm}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-2\">&nbsp;&nbsp;</div>\r\n      <div class=\"col-md-3\">\r\n        <p-dataTable id=\"dtIP\" [value]=\"peticionData.listIP\" scrollable=\"true\" [scrollHeight]=\"DT_SCROLL\" emptyMessage=\"Sin IPs\" [immutable]=\"false\">\r\n          <p-column field=\"ip\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" (click)=\"onClickDeleteIP(row['ip'])\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-footer>Total: {{peticionData.listIP.length}}</p-footer>\r\n        </p-dataTable>\r\n      </div>\r\n      <div class=\"col-md-2\">\r\n        <p-dataTable id=\"dtRegion\" [value]=\"peticionData.region\" scrollable=\"true\" [scrollHeight]=\"DT_SCROLL\" emptyMessage=\"Sin Regiones\" [immutable]=\"false\">\r\n          <p-column field=\"region\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" (click)=\"onClickDeleteRegion(row['region'])\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-footer>Total: {{peticionData.region.length}}</p-footer>\r\n        </p-dataTable>\r\n      </div>\r\n      <div class=\"col-md-2\">\r\n        <p-dataTable id=\"dtTransaccion\" [value]=\"peticionData.transaccion\" scrollable=\"true\" [scrollHeight]=\"DT_SCROLL\" emptyMessage=\"Sin Transacciones\" [immutable]=\"false\">\r\n          <p-column field=\"transaccionPantallaTransient\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n          <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align': 'center'}\">\r\n            <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n              <button type=\"button\" pButton class=\"ui-button-danger\" icon=\"fa fa-trash-o\" (click)=\"onClickDeleteTransaccion(row['transaccion'])\"></button>\r\n            </ng-template>\r\n          </p-column>\r\n          <p-footer>Total: {{peticionData.transaccion.length}}</p-footer>\r\n        </p-dataTable>\r\n      </div>\r\n      <div class=\"col-md-2\">&nbsp;&nbsp;</div>\r\n    </div>\r\n    <div clas=\"row\" style=\"padding-top: 25px;\">\r\n      <div class=\"col-md-1 form-group\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"addPeticion()\">Agregar Peticiones</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\" style=\"padding-top: 50px;\">\r\n      <p-dataTable id=\"dtPeticiones\" #dtPeticiones [value]=\"listPeticion\" [(selection)]=\"listSelPeticion\" dataKey=\"id\" [responsive]=\"true\" [paginator]=\"true\" [rows]=\"9\" emptyMessage=\"Sin Peticiones\" [immutable]=\"false\">\r\n        <p-header>Lista de Peticiones</p-header>\r\n        <p-column [style]=\"{'width':'38px'}\" selectionMode=\"multiple\"></p-column>\r\n        <p-column header=\"Usuario Corporativo\" field=\"usuarioCorp\" sortable=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n        <p-column header=\"IP\" field=\"ip\" sortable=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n        <p-column header=\"Regi&oacute;n\" field=\"region\" sortable=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n        <p-column header=\"transacci&oacute;n\" field=\"transaccion\" sortable=\"true\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n        <p-column header=\"Peticiones por Minuto\" field=\"peticionesPorMinuto\" [filter]=\"true\" filterPlaceholder=\"Buscar\" filterMatchMode=\"contains\"></p-column>\r\n        <p-column *ngIf=\"isResponse\" header=\"Repetida\" field=\"repetida\" sortable=\"true\" styleClass=\"col-button\" [style]=\"{'width':'70px', 'text-align':'center'}\">\r\n          <ng-template let-col let-row=\"rowData\" pTemplate=\"body\">\r\n            <i *ngIf=\"row[col.field]\" class=\"fa fa-check\"></i>\r\n          </ng-template>\r\n        </p-column>\r\n        <p-column styleClass=\"col-button\" [style]=\"{'width':'35px', 'text-align':'center'}\">\r\n          <ng-template let-row=\"rowData\" pTemplate=\"body\">\r\n            <button type=\"button\" pButton class=\"ui-button-danger\" pTooltip=\"Eliminar\" tooltipPosition=\"left\" icon=\"fa fa-trash-o\" (click)=\"onClickRowDelete(row['id'])\"></button>\r\n          </ng-template>\r\n        </p-column>\r\n        <p-footer>\r\n          <div class=\"row\">\r\n            <button type=\"button\" pButton icon=\"fa fa-trash\" label=\"Borrar Todas\" class=\"ui-button-danger\" style=\"float: right;\" (click)=\"onClickDeleteAll()\"></button>\r\n            <button type=\"button\" pButton icon=\"fa fa-ban\" label=\"Borrar Seleccionadas\" class=\"ui-button-warning\" style=\"float: right;\" (click)=\"onClickDeleteSelected()\"></button>\r\n          </div>\r\n        </p-footer>\r\n      </p-dataTable>\r\n    </div>\r\n\r\n    <div clas=\"row\" style=\"padding-top: 25px;\">\r\n      <div class=\"col-md-1 form-group\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClickModal()\">Generar Solicitud</button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- MODAL SOLICITUD -->\r\n    <div class=\"modal fade\" id=\"modalSolicitud\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modalSolicitudLabel\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header text-center\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n            <h4 class=\"modal-title\" id=\"modalSolicitudLabel\">Solicitud de Peticiones WS-M2k</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"row\" formGroupName=\"solicitudData\">\r\n              <div class=\"col-md-6 form-group\">\r\n                <label for=\"justificacion\">Escribe una justificaci&oacute;n explicando la solicitud</label>\r\n                <textarea id=\"justificacion\" formControlName=\"justificacion\" class=\"form-control\" autoResize=\"autoResize\" style=\"width: 100%;\"></textarea>\r\n                <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.justificacion\"><i class=\"fa fa-close\"></i> {{formErrors.justificacion}}</div>\r\n              </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n              <div class=\"form-group\">\r\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!isValidSolicitud\">Enviar Solicitud <i class=\"fa fa-paper-plane-o ml-1\"></i></button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudPeticionesWebComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__ = __webpack_require__("./src/app/core/common/HttpStatusCode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_catalogos_model_M2kCatTransaccionesFront__ = __webpack_require__("./src/app/catalogos/model/M2kCatTransaccionesFront.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_WrapSolicitudPeticion__ = __webpack_require__("./src/app/peticiones-ws/model/WrapSolicitudPeticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__model_UsuarioProperties__ = __webpack_require__("./src/app/peticiones-ws/model/UsuarioProperties.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__ = __webpack_require__("./src/app/peticiones-ws/utils/FormValidationType.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__utils_CommonUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/CommonUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var SolicitudPeticionesWebComponent = (function () {
    function SolicitudPeticionesWebComponent(service, authService, alertService, fb) {
        this.service = service;
        this.authService = authService;
        this.alertService = alertService;
        this.fb = fb;
        this.DT_SCROLL = '100px';
        this.KEY_LIST_IP = 'listIP';
        this.MODAL_ID = '#modalSolicitud';
        this.TRANSACCION_WILDCARD = new __WEBPACK_IMPORTED_MODULE_3_app_catalogos_model_M2kCatTransaccionesFront__["a" /* M2kCatTransaccionesFront */](-1, '*', '(TODAS)', '', '* (TODAS)', '', '');
        this.MIN_PPM = __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].MIN_PPM;
        this.MAX_PPM = __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].MAX_PPM;
        this.initKeys();
        this.initAyuda();
        this.initSelectors();
        this.initForm();
        this.initPeticionData();
    }
    SolicitudPeticionesWebComponent.prototype.initKeys = function () {
        var _this = this;
        this.allKeys = [];
        this.keysPet = [];
        __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].getKeysSolPeticion().forEach(function (key) {
            _this.allKeys.push(key);
        });
        __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].getKeysPeticion().forEach(function (key) {
            if (key !== __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente) {
                _this.allKeys.push(key);
                _this.keysPet.push(key);
            }
        });
    };
    SolicitudPeticionesWebComponent.prototype.initAyuda = function () {
        this.ayuda = {};
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].urgente] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Solicitud Urgente', 'Las peticiones de la solicitud se registrarán en calor a producción');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].folioSISAP] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Folio SISAP', 'Folio SISAP Asociado a la solicitud');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Aplicativo', 'Nombre del aplicativo que hará uso del servicio');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].area] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Área Responsable', 'Área responsable del desarrollo de la aplicación que consumirá el servicio');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Ambiente Ejecución', 'Tipo de ambiente desde el que se consumirá el servicio');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].fechaCaducidad] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Fecha de Caducidad', 'Fecha en la que las peticiones serán deshabilitadas (solo ambiente no productivo)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Usuario Corporativo', 'Usuario corporativo que se usará en el servicio web');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('IP', 'Dirección IP desde donde será ejecutado el servicio web');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Región', 'Número de la región donde se consumirá el servicio (del 1 al 9)');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Transacción', 'Identificador de transacción que se ejecuta directamente en Mobile y que en el XML se encuentra en el tag <function>I*XX</function>');
        this.ayuda[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ppm] = new __WEBPACK_IMPORTED_MODULE_6_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Peticiones Por Minuto', "N\u00FAmero m\u00E1ximo de llamadas por minuto que se invocara al servicio web (m\u00E1ximo " + this.MAX_PPM + ")");
    };
    SolicitudPeticionesWebComponent.prototype.initSelectors = function () {
        var _this = this;
        this.dataSelector = {};
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].area] = [];
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente] = [];
        __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["a" /* EnumAmbiente */].getNameValuePairs().forEach(function (ambiente) {
            _this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente].push({ label: ambiente.name, value: ambiente.value });
        });
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp] = [];
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion] = [];
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo] = [];
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region] = [];
        this.labelSelector = {};
        this.labelSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region] = '--SELECCIONAR REGIÓN--';
        this.labelSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion] = '--SELECCIONAR TRANSACCIÓN--';
    };
    SolicitudPeticionesWebComponent.prototype.initForm = function () {
        var _this = this;
        this.formMessages = {};
        this.formErrors = {};
        this.formValidators = {};
        this.formControlValid = {};
        var msgRequerdia = __WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].getDefaultMessage(__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED);
        this.allKeys.forEach(function (key) {
            _this.formMessages[key] = {};
            _this.formMessages[key][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED] = msgRequerdia;
            _this.formErrors[key] = '';
            _this.formControlValid[key] = false;
        });
        this.formMessages[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].FORMAT] = 'Formato IP incorrecto';
        this.formMessages[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ppm][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].RANGE] = "Valor debe ser entre " + this.MIN_PPM + " y " + this.MAX_PPM;
        this.formMessages[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].MIN_LENGTH] = "Longitud m\u00EDnima de " + __WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__["a" /* SolicitudPeticion */].MIN_CHARS + " caracteres";
        this.formMessages[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].MAX_LENGTH] = "Longitud m\u00E1xima de " + __WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__["a" /* SolicitudPeticion */].MAX_CHARS + " caracteres";
        this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo] = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]);
        this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente] = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]);
        this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion] = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(__WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__["a" /* SolicitudPeticion */].MIN_CHARS), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(__WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__["a" /* SolicitudPeticion */].MAX_CHARS)]);
        this.formSolicitud = this.fb.group({
            solicitudData: this.fb.group({
                aplicativo: [null, this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo]],
                ambiente: [null, this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente]],
                fechaCaducidad: [null],
                justificacion: ['', this.formValidators[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion]]
            }),
            peticionData: this.fb.group({
                usuarioCorp: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]],
                ip: [[], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required])],
                region: [[], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]],
                transaccion: [[], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]],
                ppm: [0, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]]
            })
        });
        this.formSolicitud.valueChanges.subscribe(function (data) { _this.onFormValueChanged(data); });
        this.onFormValueChanged();
    };
    SolicitudPeticionesWebComponent.prototype.onFormValueChanged = function (data) {
        if (this.formSolicitud == null
            || this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData) == null
            || this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData) == null) {
            return;
        }
        var form = this.formSolicitud;
        this.onFormValueChangedData(form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData), __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].getKeysSolPeticion());
        this.onFormValueChangedData(form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData), this.keysPet);
        this.validateSolicitud();
    };
    SolicitudPeticionesWebComponent.prototype.onFormValueChangedData = function (formGroup, fields) {
        var _this = this;
        fields.forEach(function (key) {
            _this.formErrors[key] = '';
            var control = formGroup.get(key);
            if (control) {
                _this.formControlValid[key] = (control.valid || control.disabled);
                if (control.dirty && !control.valid) {
                    var messages = _this.formMessages[key];
                    if (messages) {
                        for (var validation in control.errors) {
                            _this.formErrors[key] = messages[validation];
                            _this.formControlValid[key] = false;
                        }
                    }
                }
            }
        });
    };
    SolicitudPeticionesWebComponent.prototype.resetFormSolicitudData = function () {
        var _this = this;
        var form = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData);
        var keys = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].getKeysSolPeticion();
        keys.forEach(function (key) {
            var control = form.get(key);
            control.clearValidators();
            if (!_this.isUrgente || key === __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente) {
                var validator = _this.formValidators[key];
                if (validator) {
                    control.setValidators(validator);
                }
            }
        });
        form.updateValueAndValidity();
        this.onFormValueChanged();
    };
    SolicitudPeticionesWebComponent.prototype.resetForm = function () {
        var _this = this;
        this.allKeys.forEach(function (key) {
            _this.formErrors[key] = '';
            _this.formControlValid[key] = false;
        });
        this.resetFormSolicitudData();
        this.formSolicitud.reset();
    };
    SolicitudPeticionesWebComponent.prototype.initPeticionData = function () {
        this.peticionData = {};
        this.resetPeticionData();
    };
    SolicitudPeticionesWebComponent.prototype.resetPeticionData = function () {
        this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip] = '';
        this.peticionData[this.KEY_LIST_IP] = [];
        this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region] = [];
        this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion] = [];
    };
    SolicitudPeticionesWebComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario = this.service.getSessionUser();
        this.isAdmin = false;
        this.isComponentEnabled = false;
        this.isUIBlocked = false;
        this.resetAll();
        this.blockUI();
        this.service.getPeticionPropertiesByUsuario(this.usuario.id).subscribe(function (data) {
            _this.peticionProperties = data;
            _this.usuarioProperties = _this.peticionProperties.usuarioProperties;
            _this.isAdmin = __WEBPACK_IMPORTED_MODULE_13__model_UsuarioProperties__["a" /* UsuarioProperties */].isAdminOrAutorizador(_this.usuarioProperties);
            _this.createLists();
            _this.unblockUI();
            if (_this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp].length == 0) {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'Sin Usuarios Corporativos', 'No tiene usuarios corporativos autorizados');
            }
            else {
                _this.isComponentEnabled = true;
            }
        }, function (error) {
            console.log('error: ', error);
            _this.unblockUI();
        });
    };
    SolicitudPeticionesWebComponent.prototype.resetAll = function () {
        this.minDate = new Date();
        this.minDate.setDate(new Date().getDate() + 1);
        this.listPeticion = [];
        this.listSelPeticion = [];
        this.isUrgente = false;
        this.lastId = 0;
        this.isResponse = false;
        this.isBlocked = false;
        this.isAmbienteProd = false;
        this.isValidSolicitud = false;
        this.isValidSolicitudData = false;
        this.isFechaEnabled = false;
        this.prevListTransaccion = [];
        this.isUIBlocked = false;
        this.resetPeticionData();
        this.resetForm();
    };
    SolicitudPeticionesWebComponent.prototype.createLists = function () {
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp] = this.peticionProperties.listM2kCatUsuarios.map(function (p) {
            return { label: p.claveUsuario, value: p.claveUsuario };
        });
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion] = this.peticionProperties.listM2kCatTransaccionesFront.map(function (p) {
            return { label: p.transaccionPantallaTransient, value: p };
        });
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].area] = this.peticionProperties.listArea.map(function (p) {
            return { label: p.nombre, value: p };
        });
        this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo] = this.peticionProperties.listAplicativo.map(function (p) {
            return { label: p.nombreCompuesto, value: p };
        });
        for (var i = 1; i < 10; i++) {
            this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region].push({ label: "" + i, value: "" + i });
        }
        if (this.isAdmin) {
            this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp].unshift({ label: '*', value: '*' });
            this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion].unshift({ label: this.TRANSACCION_WILDCARD.transaccionPantallaTransient, value: this.TRANSACCION_WILDCARD });
            this.dataSelector[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region].unshift({ label: '*', value: '*' });
        }
    };
    SolicitudPeticionesWebComponent.prototype.addPeticion = function () {
        var form = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData);
        this.keysPet.forEach(function (key) {
            if (key != __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente && key != __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].estatus) {
                form.get(key).markAsDirty();
            }
        });
        this.onFormValueChanged();
        if (!this.isValidPeticionData()) {
            return;
        }
        this.splitPeticiones(form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp).value, form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ppm).value);
    };
    SolicitudPeticionesWebComponent.prototype.splitPeticiones = function (usuarioCorp, ppm) {
        this.blockUI();
        var repetidas = 0;
        for (var i = 0; i < this.peticionData[this.KEY_LIST_IP].length; i++) {
            var ip = this.peticionData[this.KEY_LIST_IP][i].ip;
            for (var j = 0; j < this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region].length; j++) {
                var region = this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region][j].region;
                for (var k = 0; k < this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion].length; k++) {
                    var transaccion = this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion][k].transaccion;
                    var peticion = __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].getNewInstance();
                    peticion.usuarioCorp = usuarioCorp;
                    peticion.ip = ip;
                    peticion.region = region;
                    peticion.transaccion = transaccion;
                    peticion.peticionesPorMinuto = ppm;
                    if (this.isPeticionRepetida(peticion)) {
                        repetidas++;
                    }
                    else {
                        peticion.id = this.lastId--;
                        this.listPeticion.push(peticion);
                    }
                }
            }
        }
        this.validateSolicitud();
        this.unblockUI();
        if (repetidas > 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'Peticiones Repetidas', "Se detectaron " + repetidas + " peticiones repetidas");
        }
    };
    SolicitudPeticionesWebComponent.prototype.isPeticionRepetida = function (petNew) {
        if (this.listPeticion.length > 0) {
            for (var i = 0; i < this.listPeticion.length; i++) {
                var petOld = this.listPeticion[i];
                if (__WEBPACK_IMPORTED_MODULE_16__utils_CommonUtils__["a" /* CommonUtils */].isPeticionEqualOrWildcard(petOld, petNew)) {
                    return true;
                }
            }
        }
        return false;
    };
    SolicitudPeticionesWebComponent.prototype.sendSolicitud = function () {
        var _this = this;
        if (this.isBlocked) {
            return;
        }
        this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].INFO, 'Enviando Solicitud', 'Revisando y enviando la solicitud');
        this.isBlocked = true;
        var form = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData);
        var solicitud = __WEBPACK_IMPORTED_MODULE_9__model_SolicitudPeticion__["a" /* SolicitudPeticion */].getNewInstance();
        solicitud.fechaRegistro = new Date();
        solicitud.estatus = __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["b" /* EnumEstatus */].REVISION;
        solicitud.aplicativo = form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo).value;
        solicitud.ambiente = form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente).value;
        solicitud.fechaCaducidad = form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].fechaCaducidad).value;
        solicitud.solicitante = this.usuario;
        solicitud.justificacion = __WEBPACK_IMPORTED_MODULE_11__utils_StringUtils__["a" /* StringUtils */].trimToNull(form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion).value);
        if (this.isUrgente) {
            solicitud.estatus = __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["b" /* EnumEstatus */].URGENTE;
            solicitud.autorizador = this.usuario;
            solicitud.fechaAutorizacion = solicitud.fechaRegistro;
        }
        this.listPeticion.forEach(function (peticion) {
            peticion.id = null;
            peticion.ambiente = form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente).value;
            peticion.estatus = solicitud.estatus;
            delete peticion['_$visited']; // Elimina el campo _$visited creado por p-dataTable al usar [(selection)]
        });
        this.lastId = 0;
        var wrapSolicitudPeticion = new __WEBPACK_IMPORTED_MODULE_10__model_WrapSolicitudPeticion__["a" /* WrapSolicitudPeticion */](solicitud, this.listPeticion);
        this.listSelPeticion = [];
        this.service.saveSolicitudPeticion(wrapSolicitudPeticion).subscribe(function (data) {
            switch (data.status) {
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].ALREADY_REPORTED:
                    _this.isResponse = true;
                    var wrapper = Object(__WEBPACK_IMPORTED_MODULE_10__model_WrapSolicitudPeticion__["b" /* toWrapSolicitudPeticion */])(data.json);
                    if (wrapper) {
                        _this.listPeticion = wrapper.listPeticion.map(function (pet) {
                            pet.id = _this.lastId--;
                            return pet;
                        });
                    }
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'Peticiones Repetidas', 'Se detectaron peticiones ya registradas, favor de validar');
                    break;
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].NO_CONTENT:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].ERROR, 'Error en la Solicitud', 'Error al registrar la solicitud');
                case __WEBPACK_IMPORTED_MODULE_2_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK:
                    _this.resetAll();
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].SUCCESS, 'Solicitud Registrada', 'La solicitud fue registrada exitosamente');
                    break;
            }
            _this.isBlocked = false;
        }, function (error) {
            console.log('Error al enviar la solicitud:', error);
            _this.isBlocked = false;
        });
        this.modalHide();
    };
    SolicitudPeticionesWebComponent.prototype.blockUI = function () { this.isUIBlocked = true; };
    SolicitudPeticionesWebComponent.prototype.unblockUI = function () { this.isUIBlocked = false; };
    SolicitudPeticionesWebComponent.prototype.modalShow = function () { jQuery(this.MODAL_ID).modal('show'); };
    SolicitudPeticionesWebComponent.prototype.modalHide = function () { jQuery(this.MODAL_ID).modal('hide'); };
    SolicitudPeticionesWebComponent.prototype.onChangeUrgente = function (event) {
        this.isUrgente = event;
        this.resetFormSolicitudData();
        this.onChangeAmbiente();
    };
    SolicitudPeticionesWebComponent.prototype.onChangeAmbiente = function (event) {
        if (event) {
            this.isAmbienteProd = (event.value === __WEBPACK_IMPORTED_MODULE_12__utils_EnumData__["a" /* EnumAmbiente */].PROD);
        }
        var controlAmbiente = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData).get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente);
        controlAmbiente.markAsDirty();
        controlAmbiente.updateValueAndValidity();
        var controlFechaCaducidad = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData).get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].fechaCaducidad);
        controlFechaCaducidad.clearValidators();
        controlFechaCaducidad.patchValue(null);
        if (this.formControlValid[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente]) {
            this.isFechaEnabled = !this.isAmbienteProd;
        }
        if (!this.isUrgente && !this.isAmbienteProd) {
            controlFechaCaducidad.setValidators([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]);
        }
        controlFechaCaducidad.markAsDirty();
        controlFechaCaducidad.updateValueAndValidity();
        this.onFormValueChanged();
    };
    SolicitudPeticionesWebComponent.prototype.onChangeRegion = function (event) {
        var key = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region;
        this.multiSelectHack(key);
        var lista = event.value;
        if (this.isAdmin) {
            var isAll = lista.indexOf(__WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].WILDCARD) !== -1;
            if (isAll) {
                lista = [__WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].WILDCARD];
                this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region).patchValue(lista.slice());
            }
        }
        this.peticionData[key] = lista.map(function (data) {
            return { region: data };
        });
    };
    SolicitudPeticionesWebComponent.prototype.onChangeTransaccion = function (event) {
        var key = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion;
        this.multiSelectHack(key);
        var lista = event.value;
        if (this.isAdmin) {
            var isAll = false;
            for (var i = 0; i < lista.length; i++) {
                var t = lista[i].transaccion;
                if (t === __WEBPACK_IMPORTED_MODULE_8__model_Peticion__["a" /* Peticion */].WILDCARD) {
                    isAll = true;
                    break;
                }
            }
            if (isAll) {
                lista = [this.TRANSACCION_WILDCARD];
                this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(key).patchValue(lista.slice());
            }
        }
        if (lista.length == this.dataSelector[key].length) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'No Permitido', 'No se permite seleccionar todas las transacciones');
            this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(key).patchValue(this.prevListTransaccion);
        }
        else {
            this.peticionData[key] = lista.slice();
            this.prevListTransaccion = lista.slice();
        }
    };
    SolicitudPeticionesWebComponent.prototype.onClickAddIP = function () {
        var key = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip;
        var ip = __WEBPACK_IMPORTED_MODULE_11__utils_StringUtils__["a" /* StringUtils */].trim(this.peticionData[key]);
        this.formErrors[key] = '';
        if (!__WEBPACK_IMPORTED_MODULE_16__utils_CommonUtils__["a" /* CommonUtils */].isValidIP(ip)) {
            this.formErrors[key] = this.formMessages[key][__WEBPACK_IMPORTED_MODULE_14__utils_FormValidationType__["a" /* FormValidationType */].FORMAT];
            return;
        }
        if (!this.isIPRepetida(ip)) {
            this.peticionData[this.KEY_LIST_IP].push({ ip: ip });
            var lista = this.peticionData[this.KEY_LIST_IP].map(function (data) {
                return data.ip;
            });
            var control = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip);
            control.patchValue(lista);
            control.markAsDirty();
            this.onFormValueChanged();
        }
    };
    SolicitudPeticionesWebComponent.prototype.onClickDeleteIP = function (ip) {
        var lista = this.peticionData[this.KEY_LIST_IP].filter(function (data) {
            return data.ip !== ip;
        });
        this.peticionData[this.KEY_LIST_IP] = lista.slice();
        lista = lista.map(function (data) {
            return data.ip;
        });
        this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip).patchValue(lista);
        this.onFormValueChanged();
    };
    SolicitudPeticionesWebComponent.prototype.onClickDeleteRegion = function (region) {
        var key = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region;
        var lista = this.peticionData[key].filter(function (data) {
            return data.region !== region;
        });
        this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(key).patchValue(lista.map(function (data) { return data.region; }));
        this.peticionData[key] = lista.slice();
    };
    SolicitudPeticionesWebComponent.prototype.onClickDeleteTransaccion = function (transaccion) {
        var key = __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion;
        var lista = this.peticionData[key].filter(function (data) {
            return data.transaccion !== transaccion;
        });
        this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData).get(key).patchValue(lista);
        this.peticionData[key] = lista.slice();
        this.prevListTransaccion = lista.slice();
    };
    SolicitudPeticionesWebComponent.prototype.isIPRepetida = function (ip) {
        for (var i = 0; i < this.peticionData[this.KEY_LIST_IP].length; i++) {
            var data = this.peticionData[this.KEY_LIST_IP][i].ip;
            if (data === ip) {
                return true;
            }
        }
        return false;
    };
    SolicitudPeticionesWebComponent.prototype.onClickRowDelete = function (id) {
        if (this.listPeticion.length > 0) {
            this.listPeticion = this.listPeticion.filter(function (peticion) {
                return peticion.id !== id;
            });
        }
        this.validateSolicitud();
    };
    SolicitudPeticionesWebComponent.prototype.onClickModal = function () {
        var form = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].solicitudData);
        if (!this.isUrgente) {
            __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].getKeysSolPeticion().forEach(function (key) {
                if (key !== __WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion) {
                    form.get(key).markAsDirty();
                }
            });
            this.onFormValueChanged();
        }
        if (this.isValidSolicitudData) {
            this.modalShow();
        }
        else if (!this.isValidListPeticion()) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'Lista Peticiones Vacía', 'Se requiere registrar al menos 1 petición');
        }
        else {
            console.log('Ocurrio un error inesperado');
        }
    };
    SolicitudPeticionesWebComponent.prototype.onClickDeleteSelected = function () {
        if (this.listSelPeticion.length == 0) {
            this.alertService.alert(__WEBPACK_IMPORTED_MODULE_4_app_alert_service__["b" /* AlertSeverity */].WARN, 'Lista Vacía', 'Debe seleccionar al menos 1 petición');
            return;
        }
        var listaID = this.listSelPeticion.map(function (peticion) {
            return peticion.id;
        });
        var lista = this.listPeticion.filter(function (peticion) {
            return listaID.indexOf(peticion.id) === -1;
        });
        this.listPeticion = lista.slice();
        this.listSelPeticion = [];
        this.validateSolicitud();
    };
    SolicitudPeticionesWebComponent.prototype.onClickDeleteAll = function () {
        this.listPeticion = [];
        this.listSelPeticion = [];
        this.validateSolicitud();
    };
    SolicitudPeticionesWebComponent.prototype.validateSolicitud = function () {
        this.isValidSolicitudData = this.isValidListPeticion()
            && this.formControlValid[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ambiente]
            && (this.isUrgente
                || (this.formControlValid[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].aplicativo]
                    && this.formControlValid[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].fechaCaducidad]));
        this.isValidSolicitud = this.isValidSolicitudData && (this.isUrgente
            || this.formControlValid[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].justificacion]);
    };
    SolicitudPeticionesWebComponent.prototype.isValidListPeticion = function () {
        return !(this.listPeticion === undefined
            || this.listPeticion == null
            || this.listPeticion.length == 0);
    };
    SolicitudPeticionesWebComponent.prototype.isValidPeticionData = function () {
        var validIP = this.peticionData[__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ip].length > 0;
        var form = this.formSolicitud.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].peticionData);
        return (form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].usuarioCorp).valid
            && validIP
            && form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].region).valid
            && form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].transaccion).valid
            && form.get(__WEBPACK_IMPORTED_MODULE_15__utils_Constants__["a" /* Constants */].ppm).valid);
    };
    SolicitudPeticionesWebComponent.prototype.multiSelectHack = function (key) {
        var _this = this;
        setTimeout(function () {
            $("#" + key + " .ui-multiselect-label-container")[0].children[0].textContent = _this.labelSelector[key];
        }, 1);
    };
    return SolicitudPeticionesWebComponent;
}());
SolicitudPeticionesWebComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitud-peticiones-web',
        template: __webpack_require__("./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/solicitud-peticiones-web/solicitud-peticiones-web.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_app_app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_app_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_app_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_alert_service__["a" /* AlertService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _d || Object])
], SolicitudPeticionesWebComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/solicitud-peticiones-web.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.css":
/***/ (function(module, exports) {

module.exports = ".noPadding {\r\n  padding: 0px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header\">\r\n  <h1>Solicitud de Usuario Corporativo</h1>\r\n  <p>Solicita permisos para el uso de un Usuario Corporativo</p>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-3 form-group\">\r\n    <label for=\"usuarioCorp\">Usuario Corporativo</label>\r\n    <simple-help [ayuda]=\"ayuda.usuarioCorp\"></simple-help>\r\n    <input type=\"text\" id=\"usuarioCorp\" name=\"usuarioCorp\" style=\"text-transform: uppercase;\" #formUsuarioCorp=\"ngModel\" class=\"form-control\" [(ngModel)]=\"solicitud.usuarioCorp\" placeholder=\"VI9...\" />\r\n    <div class=\"alert alert-danger noPadding\" *ngIf=\"formErrors.usuarioCorp\"><i class=\"fa fa-close\"></i> {{formErrors.usuarioCorp}}</div>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-md-1 form-group\">\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"buscarResponsableUsuarioCorp()\">Buscar</button>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"respUsuCorp\" class=\"row\" style=\"padding-top: 25px; width: 50%;\">\r\n  <p-panel>\r\n    <p-header style=\"font-size:16px;display:inline-block;font-weight:bold\">Usuario {{respUsuCorp.usuarioCorp}}</p-header>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <label>Nombre del Responsable</label>\r\n        <p>{{respUsuCorp.responsable.nombre}} {{respUsuCorp.responsable.apaterno}} {{respUsuCorp.responsable.amaterno}}</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <label>Correo</label>\r\n        <p>{{respUsuCorp.responsable.correo}}</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <label>Extensión</label>\r\n        <p>{{respUsuCorp.responsable.extension}}</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <label>Estatus</label>\r\n        <p *ngIf=\"!isResponsable\">Sin autoridad para requerir permisos de ejecuci&oacute;n</p>\r\n        <p *ngIf=\"isResponsable\">Ya cuenta con autoridad para solicitar permisos de ejecuci&oacute;n</p>\r\n      </div>\r\n    </div>\r\n    <p-footer>\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12\">\r\n          <button type=\"button\" [disabled]=\"isResponsable\" class=\"btn btn-primary\" style=\"float: right;\" data-toggle=\"modal\" data-target=\"#modalSolicitudForm\">Solicitar Permiso</button>\r\n        </div>\r\n      </div>\r\n    </p-footer>\r\n  </p-panel>\r\n</div>\r\n\r\n<!-- MODAL DE SOLICITUD CON COMENTARIO -->\r\n<div class=\"modal fade\" id=\"modalSolicitudForm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modalSolicitudFormLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header text-center\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <h4 class=\"modal-title\" id=\"modalSolicitudFormLabel\">{{modalData.title}}</h4>\r\n      </div>\r\n      <form id=\"formSolicitud\" #formSolicitud=\"ngForm\" (ngSubmit)=\"generarSolicitud()\" class=\"form-horizontal\">\r\n        <div class=\"modal-body\">\r\n          <div class=\"row\">\r\n            <div *ngIf=\"!modalData.disabled\" class=\"col-md-6 form-group\">\r\n              <label for=\"justificacion\">Escribe una justificacion explicando la solicitud (m&iacute;nimo 10 caracteres)</label>\r\n              <textarea type=\"text\" id=\"justificacion\" name=\"justificacion\" #formJustificacion=\"ngModel\" class=\"form-control\" [ngModel]=\"solicitud.justificacion\" (ngModelChange)=\"validateJustificacion($event)\" autoResize=\"autoResize\" style=\"width: 100%;\"></textarea>\r\n              <div class=\"alert alert-danger noPadding\" *ngIf=\"formJustificacion.dirty && formErrors.justificacion\"><i class=\"fa fa-close\"></i> {{formErrors.justificacion}}</div>\r\n            </div>\r\n            <div *ngIf=\"modalData.disabled\">\r\n              <p>El usuario corporativo no tiene un responsable asignado</p>\r\n              <p>&iquest;Desea enviar un reporte al equipo de soporte?</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <div class=\"form-group\">\r\n            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!isValidSolicitud\">Enviar {{modalData.label}}</button>\r\n            <button type=\"button\" class=\"btn btn-warning\" (click)=\"onClickModalCancel()\">Cancelar</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolicitudUsuarioCorpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_core_common_HttpStatusCode__ = __webpack_require__("./src/app/core/common/HttpStatusCode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alert_service__ = __webpack_require__("./src/app/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("./src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__peticiones_ws_service__ = __webpack_require__("./src/app/peticiones-ws/peticiones-ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/SolicitudUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_WrapSolicitudUsuarioCorp__ = __webpack_require__("./src/app/peticiones-ws/model/WrapSolicitudUsuarioCorp.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_help_model_SimpleHelpModel__ = __webpack_require__("./src/app/help/model/SimpleHelpModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_UsuarioProperties__ = __webpack_require__("./src/app/peticiones-ws/model/UsuarioProperties.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__ = __webpack_require__("./src/app/peticiones-ws/utils/FormValidationType.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_Constants__ = __webpack_require__("./src/app/peticiones-ws/utils/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils_EnumData__ = __webpack_require__("./src/app/peticiones-ws/utils/EnumData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utils_ModalData__ = __webpack_require__("./src/app/peticiones-ws/utils/ModalData.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var SolicitudUsuarioCorpComponent = (function () {
    function SolicitudUsuarioCorpComponent(authService, alertService, service) {
        this.authService = authService;
        this.alertService = alertService;
        this.service = service;
        this.MODAL_ID = '#modalSolicitudForm';
        this.MODAL_TITLE_SOLICTITUD = 'Solicitud de Usuario Corporativo';
        this.MODAL_TITLE_REPORTE = 'Reportar Usuario Corporativo';
        this.MODAL_LABEL_SOLICITUD = 'Solicitud';
        this.MODAL_LABEL_REPORTE = 'Reporte';
        this.initAyuda();
        this.initForm();
    }
    SolicitudUsuarioCorpComponent.prototype.initAyuda = function () {
        this.ayuda = {};
        this.ayuda[__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].usuarioCorp] = new __WEBPACK_IMPORTED_MODULE_8_app_help_model_SimpleHelpModel__["a" /* SimpleHelp */]('Usuario Corporativo', 'Usuario corporativo a buscar');
    };
    SolicitudUsuarioCorpComponent.prototype.initForm = function () {
        var _this = this;
        this.formErrors = {};
        this.formMessages = {};
        this.formControlValid = {};
        var msgRequired = __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].getDefaultMessage(__WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED);
        __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].getKeysSolUsuCorp().forEach(function (key) {
            _this.formMessages[key] = {};
            _this.formMessages[key][__WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED] = msgRequired;
            _this.formErrors[key] = '';
            _this.formControlValid[key] = false;
        });
        this.formMessages[__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].justificacion][__WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].MIN_LENGTH] = "Se requiere un m\u00EDnimo de " + __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MIN_CHARS + " caracteres";
        this.formMessages[__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].justificacion][__WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].MAX_LENGTH] = "Se requiere un m\u00E1ximo de " + __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MAX_CHARS + " caracteres";
    };
    SolicitudUsuarioCorpComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario = this.service.getSessionUser();
        this.isAdmin = false;
        this.resetForm();
        this.service.getUsuarioPropertiesByUsuario(this.usuario.id).subscribe(function (data) {
            _this.usuarioProperties = data;
            _this.isAdmin = __WEBPACK_IMPORTED_MODULE_10__model_UsuarioProperties__["a" /* UsuarioProperties */].isAdminOrAutorizador(_this.usuarioProperties);
        });
    };
    SolicitudUsuarioCorpComponent.prototype.resetForm = function () {
        var _this = this;
        this.formSolicitud.resetForm();
        var usuCorp = this.solicitud != null ? this.solicitud.usuarioCorp : '';
        this.solicitud = __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].getNewInstance();
        this.solicitud.usuarioCorp = usuCorp;
        this.respUsuCorp = null;
        this.isResponsable = false;
        this.isValidSolicitud = false;
        this.tipoReporte = 0;
        __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].getKeysSolUsuCorp().forEach(function (key) {
            _this.formErrors[key] = '';
            _this.formControlValid[key] = false;
        });
        this.modalData = __WEBPACK_IMPORTED_MODULE_14__utils_ModalData__["a" /* ModalData */].getNewInstance();
        this.modalData.title = this.MODAL_TITLE_SOLICTITUD;
        this.modalData.label = this.MODAL_LABEL_SOLICITUD;
    };
    SolicitudUsuarioCorpComponent.prototype.buscarResponsableUsuarioCorp = function () {
        var _this = this;
        if (!this.isValidUsuarioCorp()) {
            return;
        }
        this.respUsuCorp = null;
        this.service.getRespUsuCorpByUsuarioCorp(this.solicitud.usuarioCorp).subscribe(function (data) {
            if (data) {
                if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(data.usuarioCorp)) {
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Usuario Corporativo Inexistente', 'El usuario corporativo no existe, favor de validar');
                }
                else if (data.responsable == null) {
                    _this.tipoReporte = 1;
                    _this.modalData.title = _this.MODAL_TITLE_REPORTE;
                    _this.modalData.label = _this.MODAL_LABEL_REPORTE;
                    _this.modalData.disabled = true;
                    _this.isValidSolicitud = true;
                    _this.modalShow();
                }
                else {
                    _this.respUsuCorp = data;
                    _this.isResponsable = (_this.respUsuCorp.responsable.id === _this.usuario.id) || _this.isAdmin;
                }
            }
            else {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Búsqueda', 'Ocurrió un error en la búsqueda');
            }
        });
    };
    SolicitudUsuarioCorpComponent.prototype.generarSolicitud = function () {
        var _this = this;
        this.solicitud.fechaRegistro = new Date();
        this.solicitud.solicitante = this.usuario;
        if (this.respUsuCorp == null) {
            this.enviarReporte();
            return;
        }
        this.solicitud.estatus = __WEBPACK_IMPORTED_MODULE_13__utils_EnumData__["b" /* EnumEstatus */].REVISION;
        var wrapSolicitud = new __WEBPACK_IMPORTED_MODULE_7__model_WrapSolicitudUsuarioCorp__["a" /* WrapSolicitudUsuarioCorp */](this.respUsuCorp, this.solicitud);
        this.service.saveSolicitudUsuarioCorp(wrapSolicitud).subscribe(function (data) {
            switch (data.status) {
                case __WEBPACK_IMPORTED_MODULE_1_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].SUCCESS, 'Solicitud Exitosa', 'Solicitud registrada exitosamente');
                    break;
                case __WEBPACK_IMPORTED_MODULE_1_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].ALREADY_REPORTED:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].WARN, 'Solicitud Existente', 'La solicitud ya existe, favor de validar');
                    break;
                default:
                    _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Solicitud', 'Ocurrió un error al registrar la solicitud');
            }
        }, function (error) {
            console.log(error);
            _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error en Solicitud', 'Ocurrió un error al procesar tu solicitud, intentalo de nuevo');
        });
        this.modalHide();
        this.resetForm();
    };
    SolicitudUsuarioCorpComponent.prototype.enviarReporte = function () {
        var _this = this;
        var wrapSolicitud = new __WEBPACK_IMPORTED_MODULE_7__model_WrapSolicitudUsuarioCorp__["a" /* WrapSolicitudUsuarioCorp */](null, this.solicitud, this.tipoReporte);
        this.service.reportUsuarioCorp(wrapSolicitud).subscribe(function (data) {
            if (data && data.status === __WEBPACK_IMPORTED_MODULE_1_app_core_common_HttpStatusCode__["a" /* HttpStatusCode */].OK) {
                _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].SUCCESS, 'Reporte Enviado', 'El reporte fue enviado al equipo de soporte');
            }
        }, function (error) {
            console.log(error);
            _this.alertService.alert(__WEBPACK_IMPORTED_MODULE_2__alert_service__["b" /* AlertSeverity */].ERROR, 'Error al Enviar', 'Ocurrió un error al enviar el reporte');
        });
        this.modalHide();
        this.resetForm();
    };
    SolicitudUsuarioCorpComponent.prototype.modalShow = function () { jQuery(this.MODAL_ID).modal('show'); };
    SolicitudUsuarioCorpComponent.prototype.modalHide = function () { jQuery(this.MODAL_ID).modal('hide'); };
    SolicitudUsuarioCorpComponent.prototype.setFormError = function (key, validation) {
        this.formErrors[key] = '';
        this.formControlValid[key] = true;
        if (validation) {
            this.formErrors[key] = this.formMessages[key][validation];
            this.formControlValid[key] = false;
        }
    };
    SolicitudUsuarioCorpComponent.prototype.onClickModalCancel = function () {
        if (this.tipoReporte > 0) {
            this.resetForm();
        }
        this.modalHide();
    };
    SolicitudUsuarioCorpComponent.prototype.validateJustificacion = function (event) {
        this.solicitud.justificacion = event;
        var key = __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].justificacion;
        var value = this.solicitud.justificacion;
        var validation = null;
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(value)) {
            validation = __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED;
        }
        else if (!__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].hasMinChars(value, __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MIN_CHARS)) {
            validation = __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].MIN_LENGTH;
        }
        else if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].hasMaxChars(value, __WEBPACK_IMPORTED_MODULE_6__model_SolicitudUsuarioCorp__["a" /* SolicitudUsuarioCorp */].MAX_CHARS)) {
            validation = __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].MAX_LENGTH;
        }
        this.setFormError(key, validation);
        this.validateSolicitud();
    };
    SolicitudUsuarioCorpComponent.prototype.validateSolicitud = function () {
        this.isValidSolicitud = (this.usuario != null
            && this.formControlValid[__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].usuarioCorp]
            && this.formControlValid[__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].justificacion]);
    };
    SolicitudUsuarioCorpComponent.prototype.isValidUsuarioCorp = function () {
        console.log(this.solicitud.usuarioCorp);
        var usuarioCorp = __WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].toUpperCase(this.solicitud.usuarioCorp, true);
        console.log(usuarioCorp);
        var validation = null;
        if (__WEBPACK_IMPORTED_MODULE_9__utils_StringUtils__["a" /* StringUtils */].isBlank(usuarioCorp)) {
            validation = __WEBPACK_IMPORTED_MODULE_11__utils_FormValidationType__["a" /* FormValidationType */].REQUIRED;
        }
        this.setFormError(__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* Constants */].usuarioCorp, validation);
        this.solicitud.usuarioCorp = usuarioCorp;
        return validation == null;
    };
    return SolicitudUsuarioCorpComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formSolicitud'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["NgForm"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["NgForm"]) === "function" && _a || Object)
], SolicitudUsuarioCorpComponent.prototype, "formSolicitud", void 0);
SolicitudUsuarioCorpComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-solicitud-usuario-corp',
        template: __webpack_require__("./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.html"),
        styles: [__webpack_require__("./src/app/peticiones-ws/solicitud-usuario-corp/solicitud-usuario-corp.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__alert_service__["a" /* AlertService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__peticiones_ws_service__["a" /* PeticionesWSService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__peticiones_ws_service__["a" /* PeticionesWSService */]) === "function" && _d || Object])
], SolicitudUsuarioCorpComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/solicitud-usuario-corp.component.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/CommonUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Peticion__ = __webpack_require__("./src/app/peticiones-ws/model/Peticion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_PeticionData__ = __webpack_require__("./src/app/peticiones-ws/model/PeticionData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumberUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/NumberUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");




var CommonUtils = (function () {
    function CommonUtils() {
    }
    CommonUtils.getUserFullName = function (usuario) {
        if (usuario) {
            return usuario.nombre + " " + usuario.apaterno + " " + usuario.amaterno;
        }
        return '';
    };
    CommonUtils.formatIP = function (ip) {
        var format = '';
        var prefix = '';
        var arr = ip.trim().split('.');
        arr.forEach(function (octet) {
            format += prefix + Number(octet);
            prefix = '.';
        });
        return format;
    };
    CommonUtils.isValidIP = function (ip) {
        if (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isBlank(ip)) {
            return false;
        }
        var arr = ip.trim().split('.');
        if (arr.length == 4) {
            var i = 0;
            while (i < 4) {
                var part = arr[i].trim();
                if (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isBlank(part)) {
                    break;
                }
                var octet = Number(part);
                if (isNaN(octet)) {
                    break;
                }
                if (__WEBPACK_IMPORTED_MODULE_2__NumberUtils__["a" /* NumberUtils */].isNotInRange(octet, 0, 254)) {
                    break;
                }
                i++;
            }
            if (i == 4) {
                return true;
            }
        }
        return false;
    };
    CommonUtils.isPeticionEqualOrWildcard = function (petOld, petNew) {
        if (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.ip, petNew.ip, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)) {
            return (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.usuarioCorp, petNew.usuarioCorp, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)
                && __WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.region, petNew.region, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)
                && __WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.transaccion, petNew.transaccion, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD));
        }
        return false;
    };
    CommonUtils.isPeticionDataEqualOrWildcard = function (petOld, petNew) {
        if (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.ip, petNew.ip, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)) {
            return (__WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.usuarioCorp, petNew.usuarioCorp, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)
                && __WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.region, petNew.region, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD)
                && __WEBPACK_IMPORTED_MODULE_3__StringUtils__["a" /* StringUtils */].isEqualOrDefault(petOld.transaccion, petNew.transaccion, __WEBPACK_IMPORTED_MODULE_0__model_Peticion__["a" /* Peticion */].WILDCARD));
        }
        return false;
    };
    CommonUtils.isPeticionRepetida = function (petNew, listPeticion) {
        if (listPeticion === undefined || listPeticion == null) {
            return false;
        }
        if (listPeticion.length > 0) {
            for (var i = 0; i < listPeticion.length; i++) {
                var petOld = listPeticion[i];
                if (this.isPeticionEqualOrWildcard(petOld, petNew)) {
                    return true;
                }
            }
        }
        return false;
    };
    CommonUtils.isPeticionDataRepetida = function (petNew, listPeticionData) {
        if (listPeticionData.length > 0) {
            for (var i = 0; i < listPeticionData.length; i++) {
                var petOld = listPeticionData[i];
                if (petOld.id === petNew.id
                    || this.isPeticionDataEqualOrWildcard(petOld, petNew)) {
                    return true;
                }
            }
        }
        return false;
    };
    CommonUtils.addPeticionDataToList = function (data, listTarget, clone) {
        if (!this.isPeticionDataRepetida(data, listTarget)) {
            if (clone) {
                listTarget.push(__WEBPACK_IMPORTED_MODULE_1__model_PeticionData__["a" /* PeticionData */].getClone(data));
            }
            else {
                listTarget.push(data);
            }
            return true;
        }
        return false;
    };
    CommonUtils.addListPeticionDataToList = function (listData, listTarget, clone) {
        var _this = this;
        listData.forEach(function (data) {
            _this.addPeticionDataToList(data, listTarget, clone);
        });
    };
    return CommonUtils;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/CommonUtils.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/Constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = (function () {
    function Constants() {
    }
    Constants.getKeysSolUsuCorp = function () {
        return [this.usuarioCorp, this.justificacion];
    };
    Constants.getKeysSolPeticion = function () {
        return [this.aplicativo, this.ambiente, this.fechaCaducidad, this.justificacion];
    };
    Constants.getKeysPeticion = function () {
        return [this.usuarioCorp, this.ip, this.region, this.transaccion, this.ppm, this.ambiente, this.estatus];
    };
    return Constants;
}());

Constants.usuarioCorp = 'usuarioCorp';
Constants.ip = 'ip';
Constants.region = 'region';
Constants.transaccion = 'transaccion';
Constants.ppm = 'ppm';
Constants.ambiente = 'ambiente';
Constants.estatus = 'estatus';
Constants.solicitudPeticion = 'solicitudPeticion';
Constants.urgente = 'urgente';
Constants.folioSISAP = 'folioSISAP';
Constants.aplicativo = 'aplicativo';
Constants.area = 'area';
Constants.fechaCaducidad = 'fechaCaducidad';
Constants.justificacion = 'justificacion';
Constants.comentario = 'comentario';
Constants.tipoSolicitud = 'tipoSolicitud';
Constants.estatusSolicitud = 'estatusSolicitud';
Constants.solicitudData = 'solicitudData';
Constants.peticionData = 'peticionData';
Constants.AUTORIZAR = 'AUTORIZAR';
Constants.RECHAZAR = 'RECHAZAR';
Constants.CANCELAR = 'CANCELAR';
Constants.REVOCAR = 'REVOCAR';
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/Constants.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/DateUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StringUtils__ = __webpack_require__("./src/app/peticiones-ws/utils/StringUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);


var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.formatDate = function (date, format, defaultText) {
        if (date == null || __WEBPACK_IMPORTED_MODULE_0__StringUtils__["a" /* StringUtils */].isBlank(format)) {
            return defaultText ? defaultText : '';
        }
        var mDate = __WEBPACK_IMPORTED_MODULE_1_moment__(date);
        if (!mDate.isValid()) {
            return defaultText ? defaultText : '';
        }
        return mDate.format(format);
    };
    return DateUtils;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/DateUtils.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/EnumData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EnumEstatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnumAmbiente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EnumTipoSolicitud; });
var EnumEstatus = (function () {
    function EnumEstatus() {
    }
    EnumEstatus.getValues = function () {
        return [this.REVISION, this.AUTORIZADA, this.RECHAZADA, this.CANCELADA, this.EXPIRADA, this.URGENTE];
    };
    EnumEstatus.getNames = function () {
        return [this.N_REVISION, this.N_AUTORIZADA, this.N_RECHAZADA, this.N_CANCELADA, this.N_EXPIRADA, this.N_URGENTE];
    };
    EnumEstatus.getNameValuePairs = function () {
        return [
            { name: this.N_REVISION, value: this.REVISION },
            { name: this.N_AUTORIZADA, value: this.AUTORIZADA },
            { name: this.N_RECHAZADA, value: this.RECHAZADA },
            { name: this.N_CANCELADA, value: this.CANCELADA },
            { name: this.N_EXPIRADA, value: this.EXPIRADA },
            { name: this.N_URGENTE, value: this.URGENTE }
        ];
    };
    EnumEstatus.getName = function (value) {
        switch (value) {
            case this.REVISION: return this.N_REVISION;
            case this.AUTORIZADA: return this.N_AUTORIZADA;
            case this.RECHAZADA: return this.N_RECHAZADA;
            case this.CANCELADA: return this.N_CANCELADA;
            case this.EXPIRADA: return this.N_EXPIRADA;
            case this.URGENTE: return this.N_URGENTE;
            case this.ELIMINADA: return this.N_ELIMINADA;
        }
        return '';
    };
    EnumEstatus.getValue = function (name) {
        switch (name) {
            case this.N_REVISION: return this.REVISION;
            case this.N_AUTORIZADA: return this.AUTORIZADA;
            case this.N_RECHAZADA: return this.RECHAZADA;
            case this.N_CANCELADA: return this.CANCELADA;
            case this.N_EXPIRADA: return this.EXPIRADA;
            case this.N_URGENTE: return this.URGENTE;
            case this.N_ELIMINADA: return this.ELIMINADA;
        }
        return -1;
    };
    return EnumEstatus;
}());

EnumEstatus.REVISION = 0;
EnumEstatus.AUTORIZADA = 1;
EnumEstatus.RECHAZADA = 2;
EnumEstatus.CANCELADA = 3;
EnumEstatus.EXPIRADA = 4;
EnumEstatus.URGENTE = 5;
EnumEstatus.ELIMINADA = 6;
EnumEstatus.N_REVISION = 'REVISIÓN';
EnumEstatus.N_AUTORIZADA = 'AUTORIZADA';
EnumEstatus.N_RECHAZADA = 'RECHAZADA';
EnumEstatus.N_CANCELADA = 'CANCELADA';
EnumEstatus.N_EXPIRADA = 'EXPIRADA';
EnumEstatus.N_URGENTE = 'URGENTE';
EnumEstatus.N_ELIMINADA = 'ELIMINADA';
var EnumAmbiente = (function () {
    function EnumAmbiente() {
    }
    EnumAmbiente.getValues = function () {
        return [this.PROD, this.DEV];
    };
    EnumAmbiente.getNames = function () {
        return [this.N_PROD, this.N_DEV];
    };
    EnumAmbiente.getNameValuePairs = function () {
        return [
            { name: this.N_PROD, value: this.PROD },
            { name: this.N_DEV, value: this.DEV }
        ];
    };
    EnumAmbiente.getName = function (value) {
        switch (value) {
            case this.PROD: return this.N_PROD;
            case this.DEV: return this.N_DEV;
            case this.SICATEL: return this.N_SICATEL;
        }
        return '';
    };
    EnumAmbiente.getValue = function (name) {
        switch (name) {
            case this.N_PROD: return this.PROD;
            case this.N_DEV: return this.DEV;
            case this.N_SICATEL: return this.SICATEL;
        }
        return -1;
    };
    return EnumAmbiente;
}());

EnumAmbiente.PROD = 0;
EnumAmbiente.DEV = 1;
EnumAmbiente.SICATEL = 2;
EnumAmbiente.N_PROD = 'PRODUCCIÓN';
EnumAmbiente.N_DEV = 'DESARROLLO';
EnumAmbiente.N_SICATEL = 'SICATEL';
var EnumTipoSolicitud = (function () {
    function EnumTipoSolicitud() {
    }
    EnumTipoSolicitud.getValues = function () {
        return [this.PROPIAS, this.EXTERNAS];
    };
    EnumTipoSolicitud.getNames = function () {
        return [this.N_PROPIAS, this.N_EXTERNAS];
    };
    EnumTipoSolicitud.getNameValuePairs = function () {
        return [
            { name: this.N_PROPIAS, value: this.PROPIAS },
            { name: this.N_EXTERNAS, value: this.EXTERNAS }
        ];
    };
    EnumTipoSolicitud.getName = function (value) {
        switch (value) {
            case this.PROPIAS: return this.N_PROPIAS;
            case this.EXTERNAS: return this.N_EXTERNAS;
        }
        return '';
    };
    EnumTipoSolicitud.getValue = function (name) {
        switch (name) {
            case this.N_PROPIAS: return this.PROPIAS;
            case this.N_EXTERNAS: return this.EXTERNAS;
        }
        return -1;
    };
    return EnumTipoSolicitud;
}());

EnumTipoSolicitud.PROPIAS = 0;
EnumTipoSolicitud.EXTERNAS = 1;
EnumTipoSolicitud.TODAS = 2;
EnumTipoSolicitud.N_PROPIAS = 'PROPIAS';
EnumTipoSolicitud.N_EXTERNAS = 'EXTERNAS';
EnumTipoSolicitud.N_TODAS = 'TODAS';
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/EnumData.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/FormValidationType.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormValidationType; });
var FormValidationType = (function () {
    function FormValidationType() {
    }
    FormValidationType.getValidationTypes = function () {
        return [this.REQUIRED, this.MIN_LENGTH, this.MAX_LENGTH, this.FORMAT];
    };
    FormValidationType.getDefaultMessage = function (msgType) {
        switch (msgType) {
            case this.REQUIRED: return 'Campo requerido';
            case this.MIN_LENGTH: return 'Longitud mínima requerdia';
            case this.MAX_LENGTH: return 'Longitud máxima excedida';
            case this.FORMAT: return 'Formato incorrecto';
            case this.RANGE: return 'Valor fuera del rango';
        }
        return '';
    };
    return FormValidationType;
}());

FormValidationType.REQUIRED = 'required';
FormValidationType.MIN_LENGTH = 'minlength';
FormValidationType.MAX_LENGTH = 'maxlength';
FormValidationType.FORMAT = 'format';
FormValidationType.RANGE = 'range';
//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/FormValidationType.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/ModalData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalData; });
var ModalData = (function () {
    function ModalData(title, data, input, required, disabled, label) {
        this.title = title;
        this.data = data;
        this.input = input;
        this.required = required;
        this.disabled = disabled;
        this.label = label;
    }
    ModalData.getNewInstance = function () {
        return new ModalData('', [], '', false, false, '');
    };
    return ModalData;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/ModalData.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/NumberUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberUtils; });
var NumberUtils = (function () {
    function NumberUtils() {
    }
    NumberUtils.isBetween = function (input, min, max) {
        return (min < input && input < max);
    };
    NumberUtils.isNotBetween = function (input, min, max) {
        return !this.isBetween(input, min, max);
    };
    NumberUtils.isInRange = function (input, min, max) {
        return (min <= input && input <= max);
    };
    NumberUtils.isNotInRange = function (input, min, max) {
        return !this.isInRange(input, min, max);
    };
    return NumberUtils;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/NumberUtils.js.map

/***/ }),

/***/ "./src/app/peticiones-ws/utils/StringUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringUtils; });
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isEmpty = function (text) {
        if (text === undefined || text == null) {
            return true;
        }
        return (text.length == 0);
    };
    StringUtils.isBlank = function (text) {
        return this.isEmpty(text) || (text.trim().length == 0);
    };
    StringUtils.isNotEmpty = function (text) {
        return !this.isEmpty(text);
    };
    StringUtils.isNotBlank = function (text) {
        return !this.isBlank(text);
    };
    StringUtils.trim = function (text) {
        return this.trimToEmpty(text);
    };
    StringUtils.trimToEmpty = function (text) {
        if (this.isBlank(text)) {
            return '';
        }
        return text.trim();
    };
    StringUtils.trimToNull = function (text) {
        if (this.isBlank(text)) {
            return null;
        }
        return text.trim();
    };
    StringUtils.hasMinChars = function (text, minimum) {
        return minimum <= this.trimToEmpty(text).length;
    };
    StringUtils.hasMaxChars = function (text, maximum) {
        return maximum <= this.trimToEmpty(text).length;
    };
    StringUtils.hasCharsRange = function (text, minimum, maximum) {
        return this.hasMinChars(text, minimum) && !this.hasMaxChars(text, maximum);
    };
    StringUtils.toUpperCase = function (text, trim) {
        if (this.isBlank(text)) {
            return '';
        }
        if (trim) {
            return text.trim().toUpperCase();
        }
        return text.toUpperCase();
    };
    StringUtils.toLowerCase = function (text, trim) {
        if (this.isBlank(text)) {
            return '';
        }
        if (trim) {
            return text.trim().toLowerCase();
        }
        return text.toLowerCase();
    };
    StringUtils.defaultString = function (text, defaultText) {
        if (text == null) {
            if (defaultText == null) {
                return '';
            }
            return defaultText;
        }
        return text;
    };
    StringUtils.defaultIfBlank = function (text, defaultText) {
        return this.defaultString(this.trimToNull(text), defaultText);
    };
    StringUtils.isEqual = function (text, compareText) {
        return (this.trimToEmpty(text) === this.trimToEmpty(compareText));
    };
    StringUtils.isEqualOrDefault = function (text, compareText, defaultText, compareBoth) {
        if (this.isEqual(text, compareText)) {
            return true;
        }
        if (this.isEqual(text, defaultText)) {
            return true;
        }
        if (compareBoth) {
            return this.isEqual(compareText, defaultText);
        }
        return false;
    };
    return StringUtils;
}());

//# sourceMappingURL=D:/WsToolsMigra/GUIA/d29-main-application/src/StringUtils.js.map

/***/ })

});
//# sourceMappingURL=peticiones-ws.module.chunk.js.map