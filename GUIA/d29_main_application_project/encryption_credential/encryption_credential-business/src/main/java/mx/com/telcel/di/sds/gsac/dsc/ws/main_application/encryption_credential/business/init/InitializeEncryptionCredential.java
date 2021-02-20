/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.encryption_credential.business.init;

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
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class InitializeEncryptionCredential {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeEncryptionCredential.class);

    public static final String MODULE_SHORT_NAME = "encriptarcredencial";
    public static final String MODULE_NAME = "ENCRIPTAR CREDENCIALES";
    public static final String DEFAULT_USER_NAME = "Encriptar Credenciales";

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

        menuMainModule = initializeCore.getMenu(perfil, "fa fa-shield", "Generador de credenciales", (short) 0);

        Menu menuGenerate = initializeCore.getMenu(perfil, "fa fa-refresh", "Generar", (short) 1, "/admin/encryption-credential/generate", menuMainModule);
        initializeCore.getMenu(perfil, "Generar token pdf", "/rest/generate-token-pdf", menuGenerate);

        Menu menuValidate = initializeCore.getMenu(perfil, "fa fa-check-circle-o", "Validar", (short) 2, "/admin/encryption-credential/validate", menuMainModule);
        initializeCore.getMenu(perfil, "Validar token pdf", "/rest/validate-token-pdf", menuValidate);

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
