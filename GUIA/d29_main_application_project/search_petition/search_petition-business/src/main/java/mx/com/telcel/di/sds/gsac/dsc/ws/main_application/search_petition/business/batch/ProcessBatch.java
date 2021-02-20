package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.mail.ReporteTemplet;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29EstatusBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util.FormaterDate;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util.FormatoExel;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author bermudezja
 */
@Service
public class ProcessBatch {
    
    private static final Logger LOG = LoggerFactory.getLogger(ProcessBatch.class);
    
    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactory;

    @Autowired
    private EntityManagerUtil emUtil;

    @Autowired
    private FormaterDate formater;

    @Autowired
    private FormatoExel formato;
    
    @Autowired
    private PetitionStatus status;

    @Autowired
    private ReporteTemplet reporte;
    
    
     
   
    public void ejecutarProceso() throws ParseException {

        EntityManager em = emUtil.getEntityManager();
        em.clear();
        EstatusFront front = new EstatusFront();
        List<D29ConPeticionBatch> peticionBatch;
        short IdStatus = 1;
        
      
        try {
            String query = "SELECT d FROM D29ConPeticionBatch d WHERE d.estatusPet = :estatusPet";
            TypedQuery<D29ConPeticionBatch> q = em.createQuery(query, D29ConPeticionBatch.class);
            q.setParameter("estatusPet", new D29EstatusBatch(IdStatus));
            peticionBatch = q.getResultList();
            
            for (D29ConPeticionBatch pet : peticionBatch) {
                front.setFolioFront( pet.getIdfolio());
                status.changeStatus(front,2);    
            }
            
            if (peticionBatch != null && !peticionBatch.isEmpty()) {
                for (D29ConPeticionBatch registros : peticionBatch) {
                    front.setFolioFront(registros.getIdfolio());
                    front.setTelefonoFront(registros.getTelefonoPet());
                    front.setIpFront(registros.getIpPet());
                    front.setRegionFront(registros.getRegionPet());
                    front.setUsuarioFront(registros.getUsuarioPet());
                    front.setTransaccionFront(registros.getTransaccionPet());
                    front.setFechaInicioFront(registros.getFechaInicio());
                    front.setHoraInicioFront(registros.getHoraInicio());
                    front.setHoraFinalFront(registros.getHoraFinal());
                    front.setEstatusFront(registros.getEstatusPet().getId());
                    front.setCorreoUsuario(registros.getIdusuariobatch().getCorreo());
                    front.setUserFront(registros.getIdusuariobatch().getId());
                    front.setNomUser(registros.getIdusuariobatch().getNombre());
                    
                    /***
                    * @Metodo serachInfoRegistro()
                    * consulta la tabla m2k_info_registro 
                    * @Metodo serachByM2kRegistroPeticiones()***** 
                    * consulta las tablas de la nueva bitácora
                    ***/                                                   
                    //serachByM2kRegistroPeticiones(front);
                    serachByInfoRegistro(front);    
                }  
            }else{
            
             LOG.info("No se encontraron registros con estatus 1");
            }
        } catch (Exception ex) {
            LOG.error("Error al buscar datos: ");
            ex.printStackTrace();
        }
    }
    
    public int validaStatus( List<M2kRegistroPeticiones> peticion, List<M2kInfoRegistro> bitacoraSalida){
        
       int cambiarStatus=4;
       if( peticion != null && !peticion.isEmpty() || bitacoraSalida != null && !bitacoraSalida.isEmpty()){
           cambiarStatus=3;
       }
    
       return cambiarStatus;
    }
    
  

    public void serachByM2kRegistroPeticiones(EstatusFront frontPeticion) throws ParseException {
        EntityManager em = managerFactory.createEntityManager();
        em.clear();

        try {
            String query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.peticionm2k.requestxml like :idtelefono and m.fechaPeticion2 BETWEEN  :horaInicio and :horaFinal";

            if (frontPeticion.getIpFront() != null && !frontPeticion.getIpFront().isEmpty()) {
                query = query + " and  m.ipOrigen = :ip";
            }
            if (frontPeticion.getUsuarioFront() != null && !frontPeticion.getUsuarioFront().isEmpty()) {
                query = query + " and  m.idUsuario.claveUsuario = :idUsuario";
            }
            if (frontPeticion.getTransaccionFront() != null && !frontPeticion.getTransaccionFront().isEmpty()) {
                query = query + " and  m.idTransaccion.transaccion = :idTransaccion";
            }
            if (frontPeticion.getRegionFront() != null && !frontPeticion.getRegionFront().isEmpty()) {
                query = query + " and  m.idRegion.clave = :idRegion";
            }
            TypedQuery<M2kRegistroPeticiones> q = em.createQuery(query, M2kRegistroPeticiones.class);

            q.setParameter("horaInicio", formater.parseDate(frontPeticion.getFechaInicioFront(), frontPeticion.getHoraInicioFront()));
            q.setParameter("horaFinal", formater.parseDate(frontPeticion.getFechaInicioFront(), frontPeticion.getHoraFinalFront()));

            if (frontPeticion.getTelefonoFront() != null && !frontPeticion.getTelefonoFront().isEmpty()) {
                q.setParameter("idtelefono", "%" + frontPeticion.getTelefonoFront() + "%");
            }
            if (frontPeticion.getIpFront() != null && !frontPeticion.getIpFront().isEmpty()) {
                q.setParameter("ip", frontPeticion.getIpFront());
            }
            if (frontPeticion.getUsuarioFront() != null && !frontPeticion.getUsuarioFront().isEmpty()) {
                q.setParameter("idUsuario", frontPeticion.getUsuarioFront());
            }
            if (frontPeticion.getTransaccionFront() != null && !frontPeticion.getTransaccionFront().isEmpty()) {
                q.setParameter("idTransaccion", frontPeticion.getTransaccionFront());
            }
            if (frontPeticion.getRegionFront() != null && !frontPeticion.getRegionFront().isEmpty()) {
                q.setParameter("idRegion", frontPeticion.getRegionFront());
            }
           
            LOG.info("SE EJECUTA BUSQUEDA EN BITACORA FOLIO: " +frontPeticion.getFolioFront());
           
            List<M2kRegistroPeticiones> peticion = q.getResultList();
           
            status.updateDateEjec(frontPeticion,1);
            status.changeStatus(frontPeticion, validaStatus(peticion,null));
            formato.crateformatoExel(convertInfoRegistros(peticion), frontPeticion);
        } catch (ParseException | IOException ex) {
            ex.printStackTrace();
            status.changeStatus(frontPeticion,5);
            reporte.enviarHtmlExeption(frontPeticion,ex.toString());
        }
    }
    
     
    public void serachByInfoRegistro(EstatusFront frontPeticion) throws ParseException {
        
        EntityManager em = managerFactory.createEntityManager();
        em.clear();
        
        try {
            String query = "SELECT m FROM M2kInfoRegistro m WHERE m.xmlEntrada like :telefono and m.fechaInicio  BETWEEN  :horaInicio and :horaFinal";

            if (frontPeticion.getIpFront() != null && !frontPeticion.getIpFront().isEmpty()) {
                query = query + " and  m.ip = :ip";
            }
            if (frontPeticion.getUsuarioFront() != null && !frontPeticion.getUsuarioFront().isEmpty()) {
                query = query + " and  m.usuario = :usuario";
            }
            if (frontPeticion.getTransaccionFront() != null && !frontPeticion.getTransaccionFront().isEmpty()) {
                query = query + " and  m.funcion = :servicio";
            }
            if (frontPeticion.getRegionFront() != null && !frontPeticion.getRegionFront().isEmpty()) {
                query = query + " and  m.region = :region";
            }

            Query q = em.createQuery(query, M2kInfoRegistro.class);

            q.setParameter("horaInicio", new LocalDateTime(formater.parseDate(frontPeticion.getFechaInicioFront(), frontPeticion.getHoraInicioFront())));
            q.setParameter("horaFinal", new LocalDateTime(formater.parseDate(frontPeticion.getFechaInicioFront(), frontPeticion.getHoraFinalFront())));

            if (frontPeticion.getTelefonoFront() != null && !frontPeticion.getTelefonoFront().isEmpty()) {
                q.setParameter("telefono", "%" + frontPeticion.getTelefonoFront() + "%");
            }
            if (frontPeticion.getIpFront() != null && !frontPeticion.getIpFront().isEmpty()) {
                q.setParameter("ip", frontPeticion.getIpFront());
            }
            if (frontPeticion.getUsuarioFront() != null && !frontPeticion.getUsuarioFront().isEmpty()) {
                q.setParameter("usuario", frontPeticion.getUsuarioFront());
            }
            if (frontPeticion.getTransaccionFront() != null && !frontPeticion.getTransaccionFront().isEmpty()) {
                q.setParameter("servicio", frontPeticion.getTransaccionFront());
            }
            if (frontPeticion.getRegionFront() != null && !frontPeticion.getRegionFront().isEmpty()) {
                q.setParameter("region", frontPeticion.getRegionFront());
            }
            
            
            LOG.info("SE EJECUTA BUSQUEDA EN BITACORA  FOLIO: " +frontPeticion.getFolioFront());
          
           
            List<M2kInfoRegistro> bitacoraSalida = q.getResultList();
            
            status.updateDateEjec(frontPeticion,1);
            status.changeStatus(frontPeticion,validaStatus(null, bitacoraSalida));
            formato.crateformatoExel(bitacoraSalida, frontPeticion);
        } catch (ParseException | IOException ex) {
            ex.printStackTrace();
            status.changeStatus(frontPeticion,5);
            reporte.enviarHtmlExeption(frontPeticion, ex.toString());

        }
    }
    
    public List<M2kInfoRegistro> convertInfoRegistros(List<M2kRegistroPeticiones> peticiones){
        
        M2kInfoRegistro registro;
        List<M2kInfoRegistro> m2kRegistro = new ArrayList<>();
        
        if(peticiones==null){
            return null;
        }
        for(M2kRegistroPeticiones pet:peticiones){
            registro=new M2kInfoRegistro();
            registro.setIdPeticion(pet.getIdPeticion());
            registro.setFuncion(pet.getIdTransaccion().getTransaccion());
            registro.setIp(pet.getIpOrigen());
            registro.setInstancia(pet.getIdInstancia() != null ? pet.getIdInstancia().getInstancia() : "SIN_DEFINIR");
            registro.setServerHost(pet.getIdInstancia() != null && pet.getIdInstancia().getServerId() != null ? pet.getIdInstancia().getServerId().getHost() : "NO DEFINIDO");
            registro.setRegion(pet.getIdRegion().getClave());
            registro.setTiempoTotalConector(Long.parseLong(String.valueOf(pet.getTiempoConector())));
            registro.setTiempoTotalWeb(Long.parseLong(String.valueOf(pet.getTiempoEjecucion())));
            registro.setTipoConector(pet.getIdConector().getClave());
            registro.setUsuario(pet.getIdUsuario().getClaveUsuario());
            registro.setXmlEntrada(pet.getPeticionm2k().getRequestxml());
            registro.setXmlRespuesta(pet.getPeticionm2k().getResponsexml());
            registro.setAccion(pet.getIdAccion().getClave());
            registro.setTipoRespuesta(pet.getIdTipoRespuesta().getDescripcion());
            registro.setFechaInicio(new LocalDateTime(pet.getFechaPeticion2()));
            m2kRegistro.add(registro);
        }
         LOG.info(" SE CONVIERTE AL MODELO INFO_REGISTRO");
         
        return m2kRegistro;
    } 

}

