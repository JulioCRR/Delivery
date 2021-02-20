package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author VI9XXI3
 */
@Component
@Transactional(noRollbackFor = NoResultException.class)
public class PropiedadesDao {

    @PersistenceContext
    private EntityManager em;

    public Propiedades getPropiedadByName(String name) {
        try {
            return em.createQuery("SELECT p FROM Propiedades p WHERE p.name = :name", Propiedades.class)
                    .setParameter("name", name)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Propiedades savePropiedad(Propiedades propiedad) {
        Propiedades propDB = getPropiedadByName(propiedad.getName());
        if (propDB != null) {
            propDB.setTemporal(propiedad.getTemporal());
            propDB.setValue(propiedad.getValue());
            propDB = em.merge(propDB);
        } else {
            propDB = propiedad;
            em.persist(propDB);
        }
        return propDB;
    }
    
    public Propiedades savePropiedad(String name, String value) {
        return savePropiedad(name, value, null);
    }
    
    public Propiedades savePropiedad(String name, String value, String temporal) {
        if(name == null || name.trim().isEmpty())
            return null;
        Propiedades prop = new Propiedades(name, value);
        prop.setTemporal(temporal);
        return savePropiedad(prop);
    }

    public List<Propiedades> getAllPropiedades() {
        return em.createQuery("SELECT p FROM Propiedades p", Propiedades.class)
                .getResultList();
    }
}
