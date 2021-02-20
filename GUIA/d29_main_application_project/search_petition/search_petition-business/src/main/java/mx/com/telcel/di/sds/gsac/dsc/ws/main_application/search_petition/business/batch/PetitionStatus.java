
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch;

import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class PetitionStatus {
    
    private static final Logger LOG = LoggerFactory.getLogger(PetitionStatus.class);
    
    @Autowired
    private EntityManagerUtil emUtil;
    
    
    public void updateDateEjec( EstatusFront front, int reintento ) {

        EntityManager em = emUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            D29ConPeticionBatch petBatch=em.find(D29ConPeticionBatch.class, front.getFolioFront());
            tx.commit();
            EntityTransaction txupdate = em.getTransaction();
            if(reintento>0){
                 petBatch.setFechaProcesamineto(new Date());
            }else{
                 petBatch.setFechaProcesamineto(null);
            }
            txupdate.begin();
            em.merge(petBatch);
            txupdate.commit();
            LOG.info("SE ACTUALIZA FECHA DE EJECUCION: " + front.getFolioFront());
        } catch (Exception ex) {
            em.getTransaction().rollback();
            ex.printStackTrace();         
        }
    }
     
     
     public void changeStatus(EstatusFront frontPeticion, int status) {
        EntityManager em = emUtil.getEntityManager();
        try {
            em.clear();
            em.getTransaction().begin();
            Query query = em.createNativeQuery("UPDATE D29_CON_PETICION_BATCH SET ESTATUS_PET="+status+" WHERE IDFOLIO=" + frontPeticion.getFolioFront());
            query.executeUpdate();
            em.getTransaction().commit();
            LOG.info("SE ACTUALIZA ESTATUS "+status +" FOLIO: " + frontPeticion.getFolioFront());
        } catch (Exception ex) {
            em.getTransaction().rollback();
            ex.getStackTrace();
            LOG.error("ERROR AL CAMBIAR SE STATUS FOLIO:"+frontPeticion.getFolioFront() , ex);
            
        }
    }
     
     

    public void deleteRecords() {

        EntityManager em = emUtil.getEntityManager();
        try {
            em.clear();
            em.getTransaction().begin();
            Query query = em.createNativeQuery("DELETE from D29_CON_PETICION_BATCH  where FECHA_PROCESAMINETO < SYSDATE  - 30");
            int resultado = query.executeUpdate();
            em.getTransaction().commit();
            LOG.info("REGISTROS ELIMINADOS [ " + resultado + " ] TABLA D29_CON_PETICION_BATCH");
        } catch (Exception e) {
            em.getTransaction().rollback();
            LOG.error("ERROR AL DEPURAR lA TABLA D29_CON_PETICION_BATCH ", e);
        }
    }
}
