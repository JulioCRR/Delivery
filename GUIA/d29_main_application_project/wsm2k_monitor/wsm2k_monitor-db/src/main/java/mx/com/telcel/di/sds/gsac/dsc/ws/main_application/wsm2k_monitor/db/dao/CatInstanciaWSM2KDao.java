package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.CatInstancia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author VI9XXI3
 */
@Service
@Transactional
public class CatInstanciaWSM2KDao {

    private static final Logger LOG = LoggerFactory.getLogger(CatInstanciaWSM2KDao.class);

    @PersistenceContext
    private EntityManager em;

   

    public List<CatInstancia> listaCatInstancias() {
        List<CatInstancia> lista = null;
        try {
            lista = em.createQuery("SELECT c FROM CatInstancia c ORDER BY c.catServidor.nServidor,c.catPuerto.nPuerto ASC", CatInstancia.class)
                    .getResultList();          
        } catch (Exception ex) {
            LOG.error("Error al buscar instancias", ex);
        }
        return lista;
    }
    
    public int inabilitarInstancias(String servidor, Integer puerto, Short inahibiltada) {
         
        String instancia= buscarNomInstansia(servidor, puerto);
        int updateRow=0;
        try {
             updateRow = em.createQuery("UPDATE CatInstancia c SET c.habilitada= :habilita WHERE c.nInstancia=:instancia")
                         .setParameter("habilita", inahibiltada)
                         .setParameter("instancia", instancia)
                          .executeUpdate();
        } catch (Exception ex) {
            LOG.error("Error al Habilitar y/o desahibiltar instancia", ex);
        }
      
        return updateRow;
    }
    
    public String  buscarNomInstansia(String servidor, Integer puerto) {
       String  lista = null;
        try {
            
             List<CatInstancia> peticion  = em.createQuery("SELECT c FROM CatInstancia c WHERE c.catServidor.nServidor= :servidor and c.catPuerto.nPuerto= :puerto", CatInstancia.class)
                                            .setParameter("servidor", servidor)
                                            .setParameter("puerto", puerto)
                                            .getResultList();
            for(CatInstancia cat:peticion){
                lista=cat.getnInstancia();
            }
        } catch (Exception ex) {
            LOG.error("Error al buscar intancia", ex);       
        }
        return lista;
    }
}
