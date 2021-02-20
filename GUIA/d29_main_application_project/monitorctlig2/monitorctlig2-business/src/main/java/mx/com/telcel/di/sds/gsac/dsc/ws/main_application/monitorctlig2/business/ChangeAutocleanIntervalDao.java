/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.init.InitializeMonitorCtlig2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com/>
 */
@Service
@Transactional
public class ChangeAutocleanIntervalDao {

    private static final Logger LOG = LoggerFactory.getLogger(ChangeAutocleanIntervalDao.class);

    @PersistenceContext
    private EntityManager em;

    public boolean changeAutoCleanInterval(short minutes) {

        try {

            Propiedades value = null;
            try {
                value = em.createQuery("SELECT p FROM Propiedades p WHERE p.name = :name", Propiedades.class)
                        .setParameter("name", InitializeMonitorCtlig2.TIME_TO_CLEAN_QUEUE_NAME)
                        .getSingleResult();
                value.setTemporal(null);
                value.setValue(String.valueOf(minutes));

                em.merge(value);

            } catch (NoResultException ex) {

            }

            return true;
        } catch (Exception e) {
            LOG.error("Ocurrio una excepcion al guardar el registro", e);

            return false;
        }
    }

    public int getAutoCleanInterval() {

        try {

            Propiedades value = null;
            try {
                value = em.createQuery("SELECT p FROM Propiedades p WHERE p.name = :name", Propiedades.class)
                        .setParameter("name", InitializeMonitorCtlig2.TIME_TO_CLEAN_QUEUE_NAME)
                        .getSingleResult();

                return Integer.parseInt(value.getValue());
            } catch (NoResultException ex) {

            }

        } catch (Exception e) {
            LOG.error("Ocurrio una excepcion al guardar el registro", e);
        }
        return 15;
    }

}
