/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.init;

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
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Modulo creado para la gestion de catalogos de los servicios WSM2K.
 * 
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Component
@Transactional
public class CatalogsModuleInit {
   
    private static final Logger LOG = LoggerFactory.getLogger(CatalogsModuleInit.class);

    public static final String MODULE_SHORT_NAME = "catalogos";
    public static final String MODULE_NAME = "GESTION DE CATALOGOS";
    
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
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-database", "Catálogos M2k", (short) 0, "/admin/catalogos");

        Menu menuTransacciones = initializeCore.getMenu(perfil,  "fa fa-exchange", "Transacciones",(short) 1, "/admin/catalogos/transacciones", menuMainModule);
        initializeCore.getMenu(perfil, "Servicio para obtener Transacciones", "/rest/search-transactions", menuTransacciones);
        initializeCore.getMenu(perfil, "Servicio para obtener acciones por transaccion", "/rest/search-actionsBytransaction", menuTransacciones);
        initializeCore.getMenu(perfil, "Servicio para obtener cadenas transacion", "/rest/search-xmlByActionAndTransaction", menuTransacciones);
        
        //Menu menuAcciones = initializeCore.getMenu(perfil,  "fa fa-list-alt", "Acciones",(short) 2, "/admin/catalogos/acciones", menuMainModule);
        //initializeCore.getMenu(perfil, "Servicio para obtener catalogo de acciones", "/rest/search-actions", menuAcciones);
    }

    public Usuario initUser() {
        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre("Catalogos M2k");
        em.persist(user);
        return user;
    }
    
    
}
