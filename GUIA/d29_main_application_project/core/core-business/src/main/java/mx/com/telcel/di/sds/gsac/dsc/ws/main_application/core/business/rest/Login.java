package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest;

import java.util.Collections;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.LoginDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {

    private static final Logger LOG = LoggerFactory.getLogger(Login.class);

    @Autowired
    private LoginDao loginDao;

    @Autowired
    private UserSession userSession;

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserSessionData> login(HttpSession session) {
        LOG.info("ID : "+session.getId()+"===================================================");
        for (String value : Collections.list(session.getAttributeNames())) {
            LOG.info(value);
        }

        ResponseEntity<UserSessionData> response = new ResponseEntity<>(userSession.getSessionData(), HttpStatus.OK);
        LOG.error("===================RESPONSE==========================     "+response.toString());
        return response;
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "/logout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> logout(HttpSession session) {
        userSession.setSessionData(null);
        session.invalidate();
        ResponseEntity<Void> response = new ResponseEntity<>(HttpStatus.OK);
        return response;
    }

}
