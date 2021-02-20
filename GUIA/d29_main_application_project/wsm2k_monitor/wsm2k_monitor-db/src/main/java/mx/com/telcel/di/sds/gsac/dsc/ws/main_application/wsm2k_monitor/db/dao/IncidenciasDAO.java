/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.IncidenciaEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXG0
 */
@Service
public class IncidenciasDAO {
    
    private static final Logger LOG = LoggerFactory.getLogger(IncidenciasDAO.class);
    
    @Autowired
    @Qualifier(value = "entityManagerFactory")
    private EntityManagerFactory managerFactory;
    
    
    public List<IncidenciaEntity> consultaIncidencias(){
         try {
            LOG.error("consultando incidencias desde BD");    
            EntityManager em = managerFactory.createEntityManager();
            
            
            
            Query query = em.createQuery("SELECT m FROM IncidenciaEntity m");
            List resultados = query.getResultList();
            
            return (List<IncidenciaEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO DE INCIDENCIAS: " + e.getMessage());
            return null;
        }
    }
    
    public List<IncidenciaEntity> consultaIncidenciasPorMensaje(String mensaje){
         try {
            LOG.info("consultando incidencias desde BD, like");    
            EntityManager em = managerFactory.createEntityManager();
            
            Query query = em.createQuery("SELECT m FROM IncidenciaEntity m where upper(m.mensaje) like '%"+mensaje+"%'");
            List resultados = query.getResultList();
            
            return (List<IncidenciaEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO INCIDENCIAS LIKE: " + e.getMessage());
            return null;
        }
    }
         
       public boolean insertUpdate(IncidenciaEntity incidencia){
         try {  
            LOG.info("merge incidencia incidencia :" +incidencia.toString());    
            EntityManager em = managerFactory.createEntityManager();
            em.getTransaction().begin();
               
            em.merge(incidencia);
            em.getTransaction().commit();
            
            return true;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO INCIDENCIAS LIKE: " + e.getMessage());
            return false;
        } 
       }
       
       
       
    }
    

