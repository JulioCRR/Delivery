/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.init;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class InitializeMonitorCtlig2 {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeMonitorCtlig2.class);

    public static final String MODULE_SHORT_NAME = "monitor";
    public static final String MODULE_NAME = "MONITOR CTLIG2";
    public static final String TIME_TO_CLEAN_QUEUE_NAME = "TIME_TO_CLEAN_QUEUE";
    public static final String TIME_TO_CLEAN_QUEUE_VALUE = "15";

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private InitializeCore initializeCore;

    @Value(value = "classpath:USUARIO_PERFIL_RELOAD.txt")
    private Resource perfilReloadTxt;

    private Menu menuMainModule;

    @Order(value = 2)
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        LOG.info("#################### Cheking " + MODULE_NAME + " MODULE catalogs ####################");
        Perfil perfil = initializeCore.initPerfil(MODULE_NAME);
        updateUsersProfileReloadFromFile(perfil);

        initMenu(perfil);

        initializeCore.addToProperties(new Propiedades(TIME_TO_CLEAN_QUEUE_NAME, TIME_TO_CLEAN_QUEUE_VALUE), em);
        resetPropertieSchedule();
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

        menuMainModule = initializeCore.getMenu(perfil, "fa fa-desktop", "Monitor de CTLIG2", (short) 0, "/admin/monitor-ctlig2");

        initializeCore.getMenu(perfil, "Servicio de historial", "/rest/history", menuMainModule);

        initializeCore.getMenu(perfil, "Servicio de detalle historial", "/rest/history-detail", menuMainModule);

        initializeCore.getMenu(perfil, "Servicio de ejecion de limpiado", "/rest/execute-clean-queue", menuMainModule);

        initializeCore.getMenu(null, "Servicio de cambio de intervalo", "/rest/change-autoclean-interval", menuMainModule);

    }

    public Usuario initUser() {

        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre("Monitor CTLIG2");
        em.persist(user);
        em.flush();
        return user;
    }

    public void updateUsersProfileReloadFromFile(Perfil perfil) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(perfilReloadTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            UsuarioPerfil usuarioPerfil;
            Usuario usuario;
            while ((renglon = reader.readLine()) != null) {

                valores = renglon.split(InitializeCore.SEPARATOR);

                //SERACH USER
                usuario = em.createQuery("SELECT u FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Usuario.class)
                        .setParameter("nEmpleado", valores[0])
                        .getSingleResult();
                //SERACH USER

                try {
                    em.createQuery("SELECT u FROM UsuarioPerfil u WHERE u.perfil = :perfil and u.usuario = :usuario", UsuarioPerfil.class)
                            .setParameter("perfil", perfil)
                            .setParameter("usuario", usuario)
                            .getSingleResult();
                } catch (NoResultException ex) {

                    usuarioPerfil = new UsuarioPerfil();
                    usuarioPerfil.setUsuario(usuario);
                    usuarioPerfil.setPerfil(perfil);
                    em.persist(usuarioPerfil);
                    em.flush();
                }

            }
        } catch (IOException ex) {
            LOG.error("Error loading USUARIO_PERFIL_RELOAD", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving USUARIO_PERFIL_RELOAD", e);
        }

    }

    private void resetPropertieSchedule() {
        Propiedades value = null;
        try {
            value = em.createQuery("SELECT p FROM Propiedades p WHERE p.name = :name", Propiedades.class)
                    .setParameter("name", InitializeMonitorCtlig2.TIME_TO_CLEAN_QUEUE_NAME)
                    .getSingleResult();
            value.setTemporal(null);
            em.merge(value);
            em.flush();
        } catch (NoResultException ex) {

        }

    }

}
