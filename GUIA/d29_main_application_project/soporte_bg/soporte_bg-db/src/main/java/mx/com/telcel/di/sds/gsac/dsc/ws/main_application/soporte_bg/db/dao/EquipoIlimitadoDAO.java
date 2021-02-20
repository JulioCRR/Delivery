/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleStatusProductosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.HistoricoMovimientosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudEIEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudProductoEntity;
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
public class EquipoIlimitadoDAO {
    
    @Autowired
    @Qualifier(value = "entityManagerFactoryVPN")
    private EntityManagerFactory managerFactory;
    
    private static final Logger LOG = LoggerFactory.getLogger(EquipoIlimitadoDAO.class);
    
     public List<Integer> consultaPorTelefono(String telefono){
         try {
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT d.idSolicitud FROM DetalleEntity d where d.telefono = :telefono ");
            //Query query = em.createQuery("SELECT s FROM SolicitudEIEntity s JOIN DetalleEntity d ON s.idSolicitud = d.idSolicitud where d.telefono = :telefono ");
            query.setParameter("telefono", telefono);
            List resultados = query.getResultList();
            LOG.info("size---"+resultados.size());
            return (List<Integer>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO SOLICITUDES: " + e.getMessage());
            return null;
        }  
    }
    
    public List<SolicitudEIEntity> consultaSolicitudes(List<Integer> solicitudes){
         try {
            LOG.info("Consultando solicitudes: ");
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT s FROM SolicitudEIEntity s where s.idSolicitud IN :solicitudes ORDER BY s.idSolicitud DESC");
            query.setParameter("solicitudes", solicitudes);
            List resultados = query.getResultList();
            LOG.info("size de solicitudes---"+resultados.size());
            return (List<SolicitudEIEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO SOLICITUD PRODUCTO: " + e.getMessage());
            return null;
        }
         
    } 
     
    public List<SolicitudProductoEntity> consultaSolicitudProducto(Integer idSolicitud){
         try {
            LOG.info("Consultando solicitud producto: "+idSolicitud);
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT s FROM SolicitudProductoEntity s where s.idSolicitud = :idSolicitud ");
            query.setParameter("idSolicitud", idSolicitud);
            List resultados = query.getResultList();
            
            return (List<SolicitudProductoEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO SOLICITUD PRODUCTO: " + e.getMessage());
            return null;
        }
         
    } 
    
    public List<DetalleEntity> consultaDetalleSolicitud(Integer idSolicitud,String telefono){
         try {
            LOG.info("Consultando detalle de solicitud,telefono: "+idSolicitud+","+telefono);
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT d FROM DetalleEntity d where d.idSolicitud = :idSolicitud and d.telefono = :telefono");
            query.setParameter("idSolicitud", idSolicitud);
            query.setParameter("telefono", telefono);
            List resultados = query.getResultList();
            
            return (List<DetalleEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER DETALLE DE SOLICITUD: " + e.getMessage());
            return null;
        }
         
    } 
    
    public List<DetalleStatusProductosEntity> consultaDetalleStatusProductos(Integer idSolicitud,String telefono){
         try {
            LOG.info("Consultando detalle estatus productos: "+idSolicitud);
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT d FROM DetalleStatusProductosEntity d where d.idSolicitud = :idSolicitud and d.telefono = :telefono");
            query.setParameter("idSolicitud", idSolicitud);
            query.setParameter("telefono", telefono);
            List resultados = query.getResultList();
            
            return (List<DetalleStatusProductosEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER DETALLE DE STATUS DE PRODUCTOS: " + e.getMessage());
            return null;
        }
    }
        
        public List<HistoricoMovimientosEntity> consultaHistoricoMovimientos(Integer idSolicitud,String telefono){
         try {
            LOG.info("Consultando historico movimientos: "+idSolicitud+","+telefono);
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT h FROM HistoricoMovimientosEntity h where h.idSolicitud = :idSolicitud and h.telefono = :telefono ORDER BY h.fechaEjecucion DESC");
            query.setParameter("idSolicitud", idSolicitud);
            query.setParameter("telefono", telefono);
            List resultados = query.getResultList();
            
            return (List<HistoricoMovimientosEntity>) resultados;
               
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO DE MOVIMIENTOS: " + e.getMessage());
            return null;
        }
         
    }  
         
    public boolean actualizaEstatusSolicitud(int idSolicitud,String estatus){
        try{
            LOG.info("Actualizando estatus de solicitud: "+idSolicitud+","+estatus);
            EntityManager em = managerFactory.createEntityManager();
            SolicitudEIEntity solicitud=em.find(SolicitudEIEntity.class , idSolicitud);
            LOG.info("solicitud encontrada: "+ solicitud.toString());
            em.getTransaction().begin();
            solicitud.setEstatus(estatus);
            em.getTransaction().commit();
            return true;
        }catch(Exception e){
            LOG.error("Error al actualizar la solicitud.",e);
            return false;
        }
        
    }     
    
    public boolean actualizaEstatusDetalle(int idSolicitud,String telefono,String estatus){
        try{
            LOG.info("Actualizando estatus de detalle: "+idSolicitud+","+telefono+","+estatus);
            EntityManager em = managerFactory.createEntityManager();
            Query query = em.createQuery("SELECT d FROM DetalleEntity d where d.idSolicitud = :idSolicitud and d.telefono = :telefono");
            query.setParameter("idSolicitud", idSolicitud);
            query.setParameter("telefono", telefono);
            List<DetalleEntity> resultados = query.getResultList();
            DetalleEntity detalle=resultados.get(0);
        
            LOG.info("detalle encontrado: "+ detalle.toString() );
            em.getTransaction().begin();
            detalle.setEstatus(estatus);
            em.getTransaction().commit();
            return true;
        }catch(Exception e){
            LOG.error("Error al actualizar el detalle.",e);
            return false;
        }
        
    }     
    
    
}
