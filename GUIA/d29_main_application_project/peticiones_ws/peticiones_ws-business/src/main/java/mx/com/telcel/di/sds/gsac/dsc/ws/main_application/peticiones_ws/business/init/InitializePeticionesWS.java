package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.init;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.common.Constants;
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
 * @author Supaada
 */
@Component
@Transactional
public class InitializePeticionesWS {

    private static final Logger LOG = LoggerFactory.getLogger(InitializePeticionesWS.class);

    public static final String MODULE_SHORT_NAME = "peticiones_ws";
    public static final String MODULE_NAME = "PETICIONES WS";
    public static final String DEFAULT_USER_NAME = "Peticiones WS";
    public static Integer existe = 0;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private InitializeCore initializeCore;

    private Menu menuMainModule;

    @Order(value = 2)
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        LOG.info("#################### Cheking " + MODULE_NAME + " MODULE ####################");
        Perfil perfil = initializeCore.initPerfil(MODULE_NAME);
        initMenu(perfil);

        try {
            em.createQuery("SELECT u.nEmpleado FROM Usuario u WHERE u.nEmpleado = :nEmpleado", String.class)
                    .setParameter("nEmpleado", MODULE_SHORT_NAME)
                    .getSingleResult();
            return;
        } catch (NoResultException e) {
        }
        LOG.info("#################### Initializing " + MODULE_NAME + " MODULE ####################");

        Usuario usuario = initUser();
        initializeCore.addProfileToUser(perfil, usuario);
    }

    public void initMenu(Perfil perfil) {
        final String basePath = "/admin/" + Constants.BASE_NAME_PATH;
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-address-card", "Permisos de Servicios WS-M2k", (short) 0, basePath);

        Menu menuSolicitudUsuarioCorp = initializeCore.getMenu(perfil, "fa fa-user-plus", "Solicitud de Usuario Corporativo", (short) 1, basePath + "solicitud_usuario_corp", menuMainModule);
        Menu menuSolicitudPeticiones = initializeCore.getMenu(perfil, "fa fa-server", "Solicitud de Peticiones WS-M2k", (short) 2, basePath + "solicitud_peticiones_web", menuMainModule);
        Menu menuListaSolicitudes = initializeCore.getMenu(perfil, "fa fa-inbox", "Mis Solicitudes", (short) 3, basePath + "lista_solicitudes", menuMainModule);
        Menu menuAdminPeticiones = initializeCore.getMenu(perfil, "fa fa-cogs", "Administracion de Peticiones WS-M2k", (short) 4, basePath + "admin_peticiones", menuMainModule);
    }

    public Usuario initUser() {
        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre(DEFAULT_USER_NAME);
        em.persist(user);
        return user;
    }
}
