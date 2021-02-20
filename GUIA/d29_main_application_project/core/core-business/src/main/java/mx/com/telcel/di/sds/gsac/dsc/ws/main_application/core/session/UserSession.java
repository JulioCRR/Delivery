/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session;

import java.io.Serializable;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest.UserSessionData;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession implements Serializable {

    private UserSessionData sessionData;

    public UserSessionData getSessionData() {
        return sessionData;
    }

    public void setSessionData(UserSessionData sessionData) {
        this.sessionData = sessionData;
    }

}
