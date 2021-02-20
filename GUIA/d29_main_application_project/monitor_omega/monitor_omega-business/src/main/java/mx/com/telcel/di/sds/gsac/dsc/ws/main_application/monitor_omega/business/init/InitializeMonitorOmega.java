/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.init;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author VI9XXI3
 */
@Component
@Transactional
public class InitializeMonitorOmega {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeMonitorOmega.class);

    public static final String MODULE_SHORT_NAME = "monitoromega";
    public static final String MODULE_NAME = "MONITOR OMEGA";
    public static final String DEFAULT_USER_NAME = "Monitor Omega";

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private InitializeCore initializeCore;

    private Menu menuMainModule;

    @Order(value = 2)
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        LOG.info("#################### Cheking " + MODULE_NAME + " MODULE catalogs ####################");
        Perfil perfil = initializeCore.initPerfil(MODULE_NAME);
        initMenu(perfil);

        try {
            em.createQuery("SELECT u.nEmpleado FROM Usuario u WHERE u.nEmpleado = :nEmpleado", String.class)
                    .setParameter("nEmpleado", MODULE_SHORT_NAME)
                    .getSingleResult();
            return;
        } catch (NoResultException e) {
        }
        LOG.info("#################### Initializing " + MODULE_NAME + " MODULE catalogs ####################");

        Usuario usuario = initUser();
        initializeCore.addProfileToUser(perfil, usuario);
    }

    public void initMenu(Perfil perfil) {
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-thermometer-quarter", "Monitoreo Omega", (short) 0, "/admin/" + Constants.BASE_NAME);
        initializeCore.getMenu(perfil, "Monitor Omega", BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME, menuMainModule);
        initializeCore.getMenu(perfil, "Propiedades Monitor Omega", BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME_PATH + "propiedadesOmega", menuMainModule);
    }

    public Usuario initUser() {

        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre(DEFAULT_USER_NAME);
        em.persist(user);
        em.flush();
        return user;
    }
}
