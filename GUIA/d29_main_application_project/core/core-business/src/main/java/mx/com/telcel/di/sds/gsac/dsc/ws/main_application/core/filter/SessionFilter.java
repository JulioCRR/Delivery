/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.LoginDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
public class SessionFilter implements Filter {

    private static final Logger LOG = LoggerFactory.getLogger(SessionFilter.class);

    public static final String[] WHITE_PATHS = new String[]{
        "/rest/login/",
        "/rest/logout/"};

    public static final String[] SECURE_PATHS = new String[]{
        "/rest"};

    @Autowired
    private LoginDao loginDao;

    @Autowired
    private UserSession userSession;
    
    public SessionFilter() {
    }
    

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        String servletPath = ((HttpServletRequest) req).getServletPath();
        
        LOG.info("request getContextPath " + request.getContextPath());
        LOG.info("request getRequestURI " + request.getRequestURI());

        if (servletPath.contains("?")) {
            servletPath = servletPath.substring(0, servletPath.indexOf('?'));
        } else {
            servletPath = servletPath.concat("/");
        }

        LOG.info("Path: " + servletPath);
        HttpServletResponse response = addHeadersToResponse(req, res);

        if (!servletPath.startsWith(BusinessConstants.BASE_PATH_INIT_REST)) {
            chain.doFilter(request, response);
            return;
        }

        for (String s : WHITE_PATHS) {
            if (s.contains(servletPath)) {
                chain.doFilter(request, response);
                return;
            }
        }

        if (servletPath.contains(BusinessConstants.BASE_PATH_INIT_REST)) {
            chain.doFilter(request, response);
            return;
        }

        if (userSession == null || userSession.getSessionData() == null) {
            LOG.info("Without session ");
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "error message");
            return;
        }

        LOG.info("Session: " + userSession.getSessionData().getUser().getNEmpleado());

        for (String menuUrl : userSession.getSessionData().getUrlAccess()) {
            System.out.println("menuURL:    " + menuUrl);
            if (servletPath.startsWith(menuUrl.concat("/"))) {
                chain.doFilter(request, response);
                return;
            }
        }

        response.sendError(HttpStatus.FORBIDDEN.value(), "error message");
    }

    public HttpServletResponse addHeadersToResponse(ServletRequest req, ServletResponse res) {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        //response.setHeader("Access-Control-Allow-Origin", "http://10.188.86.40:8084");
        //response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        //response.setHeader("Access-Control-Allow-Origin", "http://191.9.6.222:4200");
  
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("origin"));
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Expires, Pragma, Cache-Control");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setHeader("Expires", "0"); // Proxies.
        return response;
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

}
