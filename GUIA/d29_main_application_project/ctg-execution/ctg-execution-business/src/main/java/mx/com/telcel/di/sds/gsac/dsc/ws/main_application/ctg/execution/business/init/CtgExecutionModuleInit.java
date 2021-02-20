/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.init;

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
 * Modulo creado para la gestion servicios ejecutados en el CTG llamados IGTOC's.
 * 
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Component
@Transactional
public class CtgExecutionModuleInit {

    private static final Logger LOG = LoggerFactory.getLogger(CtgExecutionModuleInit.class);

    public static final String MODULE_SHORT_NAME = "ctg_execution";
    public static final String MODULE_NAME = "CTG EXECUTION";
    
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
        
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-server", "Ejecuciones CTG", (short) 0, "/admin/ctg-executions");

        Menu menuCtgExecutions = initializeCore.getMenu(perfil,  "fa fa-toggle-on", "Pruebas IGTOCs",(short) 1, "/admin/ctg-executions/igtoc_test", menuMainModule);
            initializeCore.getMenu(perfil, "Servicio para ejecutar un programa ctg", "/rest/ejecutarPruebaCtg", menuCtgExecutions);
            initializeCore.getMenu(perfil, "Servicio validar codigo de produccion ", "/rest/validarCodigoProduccion", menuCtgExecutions);
        Menu menuSolicitudAmbiente = initializeCore.getMenu(perfil,  "fa fa-file-text-o", "Solicitud de ambiente",(short) 2, "/admin/ctg-executions/solicitud_ambiente", menuMainModule);
            initializeCore.getMenu(perfil, "Servicio guardar solicitud CTG", "/rest/guardarSolicitudCtg", menuSolicitudAmbiente);
            initializeCore.getMenu(perfil, "Servicio obtener responsable autorizacion", "/rest/obtenerResponsableAuth", menuSolicitudAmbiente);
        Menu menuListadoSolicitudes = initializeCore.getMenu(perfil,  "fa fa-table", "Mis Solicitudes",(short) 3, "/admin/ctg-executions/list_solicitudes", menuMainModule);
            initializeCore.getMenu(perfil, "Servicio para listar solicitudes usuario", "/rest/getSolicitudesByUsuario", menuListadoSolicitudes);
            initializeCore.getMenu(perfil, "Servicio para actualziar estatus solicitudes", "/rest/actualizarEstatusSol", menuListadoSolicitudes);
            initializeCore.getMenu(perfil, "Servicio consultar permisos", "/rest/consultarPermisos", menuListadoSolicitudes);
    }
    
    public Usuario initUser() {
        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre("CTG_EXECUTION");
        em.persist(user);
        return user;
    }
}
