package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.init;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class InitializeAgenda_AmbienteDesa {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeAgenda_AmbienteDesa.class);
    public static final String MODULE_SHORT_NAME = "agenda-ambiente";
    public static final String MODULE_NAME = "AGENDA AMBIENTE";
    public static final String DEFAULT_USER_NAME = "Agenda Ambiente";

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
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-calendar-plus-o", "Agendar Ambiente WS-M2k", (short) 0, "/admin/" + Constants.BASE_NAME);
        initializeCore.getMenu(perfil, "Servicio agendario de ambiente desarrollo WS-M2k", BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME, menuMainModule);
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
