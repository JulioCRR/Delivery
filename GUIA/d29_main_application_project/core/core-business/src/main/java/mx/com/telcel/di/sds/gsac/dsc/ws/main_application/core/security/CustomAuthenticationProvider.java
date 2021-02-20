/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.security;

import java.util.Collection;
import java.util.Collections;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.LoginDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private static final Logger LOG = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

    @Autowired
    private LoginDao loginDao;

    /**
     *
     * @param authentication
     * @return
     */
    @Override
    public Authentication authenticate(Authentication authentication) {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        LOG.info("USER: " + name);

//        userSession.setUser(new Usuario(999));
        if (loginDao.login(name, password)) {
//            return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
            Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(name, password, authorities);

            return authenticationToken;
        } else {
            throw new BadCredentialsException("Usuario o contraseña inválido");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
