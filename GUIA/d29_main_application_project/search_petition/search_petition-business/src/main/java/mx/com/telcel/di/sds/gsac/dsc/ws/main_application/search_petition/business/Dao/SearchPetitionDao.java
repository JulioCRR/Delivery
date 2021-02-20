package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.DAO;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EnviarPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util.FormaterDate;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29EstatusBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Service
public class SearchPetitionDao {

    private static final Logger LOG = LoggerFactory.getLogger(SearchPetitionDao.class);

    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactory;
    
    @Autowired
    private FormaterDate formater;
     
    @Autowired
    private EntityManagerUtil emUtil;
        
    public List validarConsulta(EnviarPeticion enviarConsulta) throws Exception {

        try {
                EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createNativeQuery("SELECT COUNT(*) FROM D29_CON_PETICION_BATCH p,  D29_ESTATUS_BATCH es WHERE p.ESTATUS_PET=es.ID and ID_USUARIO_BATCH="
                                                                                     + enviarConsulta.getUser() + " and TELEFONO_PET=" + enviarConsulta.getTelefono()
                                   + " and FECHA_INICIO= TO_DATE ('" + formater.formatStringDate2(enviarConsulta.getFechaInicio()) + "','DD/MM/YY')" + " and es.id=1");
            List resultado = query.getResultList();
            resultado.remove(" ");
            LOG.info("Se valida duplicidad de datos: " + resultado.toString());
            return (List<D29ConPeticionBatch>) resultado;

        } catch (NoResultException e) {
            LOG.error(e.getMessage());
            return null;
        }
    }
    
       public List<EstatusFront> serachByFolio(String userId) {
           EntityManager em = emUtil.getEntityManager();
           em.clear();  
           List<EstatusFront> status = new ArrayList<>();
           EstatusFront front;
           int id=Integer.parseInt(userId);

           try {
               List<D29ConPeticionBatch> peticionBatch = null;

               String query = "SELECT d FROM D29ConPeticionBatch d WHERE d.idusuariobatch = :idusuariobatch order by d.idfolio DESC" ;

               TypedQuery<D29ConPeticionBatch> q = em.createQuery(query, D29ConPeticionBatch.class);
               q.setParameter("idusuariobatch", new Usuario(id));
               peticionBatch = q.getResultList();
               
               for (D29ConPeticionBatch reg : peticionBatch) {
                   front = new EstatusFront();
                   front.setFolioFront(reg.getIdfolio());
                   front.setEstatusFront(reg.getEstatusPet().getId());
                   front.setTelefonoFront(reg.getTelefonoPet());
                   front.setIpFront(reg.getIpPet());
                   front.setRegionFront(reg.getRegionPet());
                   front.setUsuarioFront(reg.getUsuarioPet());
                   front.setTransaccionFront(reg.getTransaccionPet());
                   front.setFechaInicioFront(reg.getFechaInicio());
                   front.setHoraInicioFront(reg.getHoraInicio());
                   front.setHoraFinalFront(reg.getHoraFinal());
                   front.setFechaSolicituFront(reg.getFechaSolicitud());
                   front.setFechaEjecucion(reg.getFechaProcesamineto());
                   front.setMsjStatus(reg.getEstatusPet().getMensajeBatch());
                   front.setFechaCom(formater.parseString(reg.getFechaInicio(),reg.getHoraInicio(),reg.getHoraFinal(),1));
                   status.add(front);
               }
               LOG.info("SE ACTUALIZA LA TABLAFRONT" );
           } catch (NoResultException e) {
               e.printStackTrace();
           } catch (Exception ex) {
               LOG.error("Error al buscar la peticion: ");
               ex.printStackTrace();
           }
           return status;
        }
    
    
     public M2kInfoRegistro serachByPetition(String idPeticion) {
        EntityManager em = managerFactory.createEntityManager();
        em.clear();  
        M2kInfoRegistro registro =null;
        try {
            
 /*            String query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.idPeticion = :idPeticion";
           
           
            M2kRegistroPeticiones peticion = em.createQuery(query, M2kRegistroPeticiones.class).setParameter("idPeticion", idPeticion).getSingleResult();
            
            if (peticion != null && peticion.getIdPeticion()!= null && !peticion.getIdPeticion().equals("")) {
                
                registro = new M2kInfoRegistro();
                registro.setIdPeticion(peticion.getIdPeticion());
                registro.setFuncion(peticion.getIdTransaccion().getTransaccion());
                registro.setIp(peticion.getIpOrigen());
                registro.setInstancia(peticion.getIdInstancia() != null ? peticion.getIdInstancia().getInstancia(): "SIN_DEFINIR");
                registro.setServerHost(peticion.getIdInstancia()!=null && peticion.getIdInstancia().getServerId() != null ? peticion.getIdInstancia().getServerId().getHost():"NO DEFINIDO");
                registro.setRegion(peticion.getIdRegion().getClave());
                registro.setTiempoTotalConector(Long.parseLong(String.valueOf(peticion.getTiempoConector())));
                registro.setTiempoTotalWeb(Long.parseLong(String.valueOf(peticion.getTiempoEjecucion())));
                registro.setTipoConector(peticion.getIdConector().getClave());
                registro.setUsuario(peticion.getIdUsuario().getClaveUsuario());
                registro.setXmlEntrada(peticion.getPeticionm2k().getRequestxml());
                registro.setXmlRespuesta(peticion.getPeticionm2k().getResponsexml());
                registro.setAccion(peticion.getIdAccion().getClave());
                registro.setTipoRespuesta(peticion.getIdTipoRespuesta().getDescripcion());
                registro.setFechaInicio(new LocalDateTime(peticion.getFechaPeticion2()));
                
               LOG.info("Resultado Obtenido: " + registro.toString());
               
            } else {
               
                LOG.info("No se ha encontrado resultado para la peticion: " + idPeticion);
                
           }*/
           return em.createQuery("SELECT m FROM M2kInfoRegistro m WHERE m.idPeticion = :idPeticion", M2kInfoRegistro.class)
                            .setParameter("idPeticion", idPeticion)
                            .getSingleResult();
        } catch (NoResultException e) {
            LOG.error("No se encontro resultados: " + e.getMessage());
        } catch (Exception e) {
            LOG.error("Error al buscar la peticion: " + e.getMessage());
        }

        return registro;
    }
    
    
 
 

       
      
    public Long getSeqId() {
        EntityManager em = emUtil.getEntityManager();
        em.clear();
        BigDecimal seq= (BigDecimal) ((List) em.createNativeQuery("select D29_CON_PETICION_BATCH_SEQ.nextval from dual")
                                                                                                .getResultList()).get(0);
        return seq.longValue();
    }
    
  

       
     public Long guardarConsulta(EnviarPeticion enviarConsulta) throws Exception {
   
         D29ConPeticionBatch peticion = new D29ConPeticionBatch();
        
         if (enviarConsulta != null) {
             EntityManager em = emUtil.getEntityManager();
             em.clear();
             short id = 1;
             long seqId = getSeqId();
             try {
                 em.getTransaction().begin();
                 peticion.setIdfolio(seqId);
                 peticion.setIdusuariobatch(new Usuario(enviarConsulta.getUser()));
                 peticion.setEstatusPet(new D29EstatusBatch(id));
                 peticion.setTelefonoPet(enviarConsulta.getTelefono());
                 peticion.setIpPet(enviarConsulta.getIp());
                 peticion.setRegionPet(enviarConsulta.getRegion());
                 peticion.setUsuarioPet(enviarConsulta.getUsuario());
                 peticion.setTransaccionPet(enviarConsulta.getTransaccion());
                 peticion.setFechaInicio(enviarConsulta.getFechaInicio());
                 peticion.setHoraInicio(enviarConsulta.getHoraInicio());
                 peticion.setHoraFinal(enviarConsulta.getHoraFinal());
                 peticion.setFechaSolicitud(new Date());
                 em.persist(peticion);
                 em.flush();
                 em.getTransaction().commit();
                 LOG.info("SE GUARDARON LOS DATOS CON EXITO DEL FOLIO: " + peticion.getIdfolio());
             } catch (Exception e) {
                 em.getTransaction().rollback();
                 this.LOG.error("Error al guardar los datos: ", e);
                 throw new Exception(e);
             }
             return seqId;
         } else {
             throw new Exception("No se puede guardar una solicitud nula.");
        }
    }
    
}

