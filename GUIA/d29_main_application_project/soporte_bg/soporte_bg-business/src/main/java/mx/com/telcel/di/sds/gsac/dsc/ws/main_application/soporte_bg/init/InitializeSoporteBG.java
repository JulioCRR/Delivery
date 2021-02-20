/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.init;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.context.event.EventListener;

/**
 *
 * @author VI9XXG0
 */
@Component
@Transactional
public class InitializeSoporteBG {
    
    private static final Logger LOG = LoggerFactory.getLogger(InitializeSoporteBG.class);

    public static final String MODULE_SHORT_NAME = "soporte bg";
    public static final String MODULE_NAME = "SOPORTE BG";
    public static final String DEFAULT_USER_NAME = "Soporte BG";
    
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

        menuMainModule = initializeCore.getMenu(perfil, "fa fa-cubes", "Soporte Back de grupo-Equipo ilimitado", (short) 0);

        Menu menuGenerate = initializeCore.getMenu(perfil, "fa fa-search-plus", "Detalle línea", (short) 1, "/admin/soporte-bg/detalle-ei", menuMainModule);
        initializeCore.getMenu(perfil, "Servicio consulta por telefono", "/rest/soporte-bg/consultaPorTelefono", menuGenerate);
        initializeCore.getMenu(perfil, "Servicio consulta productos", "/rest/soporte-bg/solicitudProducto", menuGenerate);
        initializeCore.getMenu(perfil, "Servicio consulta detalle", "/rest/soporte-bg/consultaDetalle", menuGenerate);
        initializeCore.getMenu(perfil, "Servicio consulta movimientos", "/rest/soporte-bg/consultaMovimientos", menuGenerate);



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
