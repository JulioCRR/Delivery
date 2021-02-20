/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.filter;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.security.Http401AuthenticationEntryPoint;
import org.springframework.security.core.AuthenticationException;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
//@Component
public class MyHttp401AuthenticationEntryPoint extends Http401AuthenticationEntryPoint {

    private static final Logger LOG = LoggerFactory.getLogger(MyHttp401AuthenticationEntryPoint.class);

    private static final String XML_HTTP_REQUEST = "XMLHttpRequest";
    private static final String X_REQUESTED_WITH = "X-Requested-With";

    public MyHttp401AuthenticationEntryPoint(String headerValue) {
        super(headerValue);
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//
//        super.commence(request, response, authException); //To change body of generated methods, choose Tools | Templates.
        response = addHeadersToResponse(response);
        LOG.info(request.getContextPath());
        LOG.info(request.getHeader(X_REQUESTED_WITH));

//        if (request.getMethod().equals(HttpMethod.OPTIONS.toString())) {
//            response.setStatus(HttpStatus.OK.value());
//            return;
//        }
        if (XML_HTTP_REQUEST.equals(request.getHeader(X_REQUESTED_WITH))) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        } else {
            super.commence(request, response, authException);
        }
    }

    public HttpServletResponse addHeadersToResponse(ServletResponse res) {
        HttpServletResponse response = (HttpServletResponse) res;
//      response.setHeader("Access-Control-Allow-Origin", "http://10.188.86.40:8084");
//        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Expires, Pragma, Cache-Control");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setHeader("Expires", "0"); // Proxies.
        return response;
    }

}
