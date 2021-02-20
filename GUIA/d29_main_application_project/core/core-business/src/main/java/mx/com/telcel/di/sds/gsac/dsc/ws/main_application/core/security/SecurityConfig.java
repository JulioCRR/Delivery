/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.Http401AuthenticationEntryPoint;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final Logger LOG = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserSession userSession;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/rest/**").authenticated()
                .antMatchers("/login/**").authenticated()
                .and()
                .formLogin().successForwardUrl("/rest/login")
                .failureHandler(authenticationFailureHandler())
                .successHandler(successHandler())
                .and()
                .cors()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new Http401AuthenticationEntryPoint(""));
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(this.dataSource);
    }

    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest hsr, HttpServletResponse hsr1, AuthenticationException ae) throws IOException, ServletException {
                LOG.info(ae.getMessage());
                hsr1.sendError(HttpServletResponse.SC_UNAUTHORIZED, ae.getMessage());
            }
        };
//        return (HttpServletRequest hsr, HttpServletResponse hsr1, AuthenticationException ae) -> {
//            LOG.info(ae.getMessage());
//            hsr1.sendError(HttpServletResponse.SC_UNAUTHORIZED, ae.getMessage());
//        };
    }

    public AuthenticationSuccessHandler successHandler() {

        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest hsr, HttpServletResponse hsr1, Authentication a) throws IOException, ServletException {
                LOG.info(a.getCredentials() + "");

                ObjectMapper mapper = new ObjectMapper();
                hsr1.setStatus(HttpServletResponse.SC_OK);
                hsr1.setCharacterEncoding("UTF-8");
                hsr1.getWriter().write(mapper.writeValueAsString(userSession.getSessionData()));
                hsr1.getWriter().flush();
                hsr1.getWriter().close();
            }
        };

//        return (HttpServletRequest hsr, HttpServletResponse hsr1, Authentication a) -> {
//            LOG.info(a.getCredentials() + "");
//
//            ObjectMapper mapper = new ObjectMapper();
//            hsr1.setStatus(HttpServletResponse.SC_OK);
//            hsr1.setCharacterEncoding("UTF-8");
//            hsr1.getWriter().write(mapper.writeValueAsString(userSession.getSessionData()));
//            hsr1.getWriter().flush();
//            hsr1.getWriter().close();
//        };
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(3600l);
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return new CorsFilter(source);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/rest/execute-clean-queue")
                        .allowedOrigins("*")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }

        };
    }
}
