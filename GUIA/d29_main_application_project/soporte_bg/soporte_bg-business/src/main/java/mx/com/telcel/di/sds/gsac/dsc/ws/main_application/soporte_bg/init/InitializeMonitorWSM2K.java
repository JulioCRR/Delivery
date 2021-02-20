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
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Se incluye este inicializador en este paquete debido al conflicto entre las 
 * dependecias spring-boot-starter-websocket del monitor WSMK y 
 * spring-boot-starter-web que contiene la anotación @EventListener
 * @author VI9XXG0
 */
@Component
@Transactional
public class InitializeMonitorWSM2K {
    
    private static final Logger LOG = LoggerFactory.getLogger(InitializeMonitorWSM2K.class);

    public static final String MODULE_SHORT_NAME = "monitor wsm2k";
    public static final String MODULE_NAME = "MONITOR WSM2K";
    public static final String DEFAULT_USER_NAME = "MOnitor WSM2K";
    
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
/*
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-thermometer-quarter", "Monitoreo servicios WSM2K", (short) 0);

        Menu menuAdmin = initializeCore.getMenu(perfil, "fa fa-pencil-square-o", "Administrador incidencias", (short) 1, "/admin/monitor-wsm2k/administracion-monitoreo", menuMainModule);
        initializeCore.getMenu(perfil, "Servicio consulta incidencias", "/rest/consultaIncidencias", menuAdmin);
        initializeCore.getMenu(perfil, "Servicio consulta incidencia por mensaje", "/rest/incidencias/consultaPorMensaje", menuAdmin);
        initializeCore.getMenu(perfil, "Servicio consulta detalle", "/rest/guardaIncidencia", menuAdmin);
        
        Menu menuMonitor = initializeCore.getMenu(perfil, "fa fa-desktop", "Reporte monitor", (short) 1, "/admin/monitor-wsm2k/administracion-monitoreo", menuMainModule);
        Menu menuReporteIncidencias = initializeCore.getMenu(perfil, "fa fa-exclamation-triangle", "Reporte incidencias", (short) 1, "/admin/monitor-wsm2k/reporte-incidencias", menuMainModule);
        Menu menuReporteTiempos = initializeCore.getMenu(perfil, "fa fa-clock-o", "Reporte tiempos", (short) 1, "/admin/monitor-wsm2k/reporte-tiempos", menuMainModule);
        Menu menuReporteUsuarios = initializeCore.getMenu(perfil, "fa fa-users", "Reporte usuarios", (short) 1, "/admin/monitor-wsm2k/reporte-usuarios", menuMainModule);
        Menu menuReporteServicios = initializeCore.getMenu(perfil, "fa fa-bolt", "Reporte servicios", (short) 1, "/admin/monitor-wsm2k/reporte-servicios", menuMainModule);
        Menu menuReporteInstancias = initializeCore.getMenu(perfil, "fa fa-server", "Reporte instancias", (short) 1, "/admin/monitor-wsm2k/reporte-instancias", menuMainModule);
*/


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
