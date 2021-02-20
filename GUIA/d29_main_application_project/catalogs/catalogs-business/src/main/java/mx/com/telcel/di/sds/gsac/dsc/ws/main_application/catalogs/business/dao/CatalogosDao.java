/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira
 */
@Service
public class CatalogosDao {
    
    private static final Logger LOG = LoggerFactory.getLogger(CatalogosDao.class);

    @Autowired
    private EntityManagerUtil emUtil;
    
    public List<M2kCatTransaccionesFront> getAllTransactions() {
    
        
        try {

            EntityManager em = emUtil.getEntityManagerInformix();
            em.clear();
            Query query = em.createQuery("SELECT m FROM M2kCatTransaccionesFront m where m.id in (select distinct(n.m2kCatTransaccionesFront) from M2kRelAccionTransaccionFront n) order by m.transaccion asc");
            List<M2kCatTransaccionesFront> resultados = query.getResultList();
            for(int i=0;i<resultados.size();i++){
                String tr=resultados.get(i).getTransaccion().substring(0, 2);
                if(tr.equals("I*")){
                    //LOG.info("RESULTADO TRANSACCIÓN "+resultados.get(i).getTransaccion());
                }else{
                    resultados.remove(i);
                }
            }
            //return (List<M2kCatTransaccionesFront>) resultados;
            return resultados; 
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER LISTADO DE TRANSACCIONES FRONT: " + e.getMessage());
            return null;
        }
    
    }
    
    
    public List<M2kRelAccionTransaccionFront> getAccionesPorTransaccion(int idTransaccion) {
        
        try {
            
            EntityManager em = emUtil.getEntityManagerInformix();
            em.clear();
            Query query = em.createQuery("SELECT m FROM M2kRelAccionTransaccionFront m WHERE m.m2kRelAccionTransaccionFrontPK.idTransaccion = :idTransaccion order by m.m2kCatAccion.clave asc");
            query.setParameter("idTransaccion", idTransaccion);
            List resultados = query.getResultList();
            
            return (List<M2kRelAccionTransaccionFront>)resultados;
 
        } catch(Exception e) {
            LOG.error("ERROR AL OBTENER ACCIONES DE LA TRANSACCION: " + idTransaccion + "--> " + e.getMessage());
            return null;
        }
        
    }
    
    public List<M2kCatTransaccionesFront> getAllM2kCatTransaccionesFront() {
        try {
            EntityManager em = emUtil.getEntityManagerInformix();
            em.clear();
            return em.createQuery("SELECT m FROM M2kCatTransaccionesFront m", M2kCatTransaccionesFront.class)
                    .getResultList();
        } catch (NoResultException ex) {
            LOG.error("ERROR AL OBTENER LISTADO DE TRANSACCIONES FRONT: " + ex.getMessage());
            return null;
        }
    }
}
