package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.AplicativoTelcel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Juan
 */
@Service
@Transactional(noRollbackFor = NoResultException.class)
public class PeticionesWSAplicativoTelcelDao {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSAplicativoTelcelDao.class);

    @PersistenceContext
    private EntityManager em;

    public List<AplicativoTelcel> getAllAplicativoTelcel() throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT a FROM AplicativoTelcel a ORDER BY a.nombre ASC", AplicativoTelcel.class)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<AplicativoTelcel> getAllAplicativoTelcelByNombre(String nombre) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT a FROM AplicativoTelcel a WHERE a.nombre = :nombre ORDER BY a.nombre ASC", AplicativoTelcel.class)
                    .setParameter("nombre", nombre)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<AplicativoTelcel> getAllAplicativoTelcelByAreaResponsable(Area areaResponsable) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT a FROM AplicativoTelcel a WHERE a.areaResponsable ORDER BY a.nombre ASC", AplicativoTelcel.class)
                    .setParameter("areaResponsable", areaResponsable)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }
}
