package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kCatUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional(noRollbackFor = NoResultException.class)
public class ServiciosInformixDao {
    
    private static final Logger LOG = LoggerFactory.getLogger(ServiciosInformixDao.class);
    
    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactoryInformix;
    
    public List<M2kRegistroPeticiones> getServices() {
        try {
                EntityManager em = managerFactoryInformix.createEntityManager();
                em.clear();
                Query query = em.createQuery("SELECT DISTINCT m.transaccion FROM M2kCatTransacciones m");
                List resultados = query.getResultList();
                resultados.remove(" ");
                return (List<M2kRegistroPeticiones>) resultados; 
            } catch (NoResultException e) {
                LOG.error("ERROR AL OBTENER TRANSACCIONES: " + e.getMessage());
                return null;
            }
    }
    
      public List<M2kRegistroPeticiones> getUsers() {
        try {
                EntityManager em = managerFactoryInformix.createEntityManager();
                em.clear();
                Query query = em.createQuery("SELECT DISTINCT m.claveUsuario FROM M2kCatUsuarios m");
                List resultados = query.getResultList();
                resultados.remove(" ");
                return (List<M2kRegistroPeticiones>) resultados;       
            } catch (NoResultException e) {
                LOG.error("ERROR AL OBTENER LOS USUARIOS: " + e.getMessage());
                return null;
            }
    }
      
    public List<M2kCatUsuarios> getAllM2kCatUsuarios() {
        try {
            EntityManager em = managerFactoryInformix.createEntityManager();
            em.clear();
            return em.createQuery("SELECT DISTINCT u FROM M2kCatUsuarios u ORDER BY u.claveUsuario ASC", M2kCatUsuarios.class)
                    .getResultList();
        } catch (NoResultException ex) {
        } catch (Exception ex) {
            LOG.error("Error al obtener los usuarios de M2k", ex);
        }
        return null;
    }
      
    public M2kCatUsuarios getM2kCatUsuarioByClaveUsuario(String claveUsuario) {
        try {
            EntityManager em = managerFactoryInformix.createEntityManager();
            em.clear();
            return em.createQuery("SELECT u FROM M2kCatUsuarios u WHERE u.claveUsuario = :claveUsuario", M2kCatUsuarios.class)
                    .setParameter("claveUsuario", claveUsuario)
                    .getSingleResult();
        } catch (NoResultException ex) {
        } catch (Exception ex) {
            LOG.error("Error al obtener el usuario de M2k", ex);
        }
        return null;
    }
}
