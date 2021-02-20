/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class ProfileDao {

    private static final Logger LOG = LoggerFactory.getLogger(ProfileDao.class);

    @PersistenceContext
    private EntityManager em;

    public void saveProfile(Perfil perfil) {
        if (perfil.getId() != null) {
            em.merge(perfil);
        } else {
            em.persist(perfil);
        }
    }

}
