package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business;

import com.ibm.icu.text.SimpleDateFormat;
import java.math.BigInteger;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PruebaCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.SolicitudCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.History;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.HistoryDetail;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.apache.commons.lang3.time.DateUtils;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com/>
 */
@Service
public class HistoryDataDao {

    private static final Logger LOG = LoggerFactory.getLogger(HistoryDataDao.class);
    private LocalDateTime time;
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private EntityManagerUtil emUtil= new EntityManagerUtil();
    
    @Transactional
    public boolean save(History history) {
        LOG.info("Inicio de guardado de registro");
        long tiempoInicial = System.currentTimeMillis();
        try {

            em.persist(history);
            em.flush();

            return true;
        } catch (Exception e) {
            LOG.error("Ocurrio una excepcion al guardar el registro", e);
            LOG.info("se:" + (System.currentTimeMillis() - tiempoInicial));
            return false;
        }
    }

    
    public D29CreUsuario getUsuario(int id)throws Exception{
        LOG.info("ID DE USUARIO -> "+id);
        D29CreUsuario resultado = new D29CreUsuario();
        
        try{
            EntityManager eman=emUtil.getEntityManager();
            eman.clear();
            Query qry=eman.createQuery("SELECT d FROM D29CreUsuario d WHERE d.id = :id");
            qry.setParameter("id", Long.parseLong(""+id));
            List resultados=qry.getResultList();
            
            if (resultados != null && resultados.size()>0) {
                resultado = (D29CreUsuario) resultados.get(0);
            }
            
            
        }catch(NoResultException e){
            LOG.error("ERROR AL OBTENER EL USUARIO: " + e.getMessage());
            return null;
        }
        System.out.println("RESULTADO USUARIO -> "+resultado.getNEmpleado());
        return resultado;
    }
    
    
    public D29CreUsuario getResponsable(int id)throws Exception{
        LOG.info("ID DE USUARIO -> "+id);
        D29CreUsuario resultado=null;
        D29CreUsuario responsable=null;
        
        try{
            EntityManager entM=emUtil.getEntityManager();
            Query query = entM.createQuery("SELECT d FROM D29CreUsuario d WHERE d.id = :id");
            query.setParameter("id", Long.parseLong(""+id));
            List resultados = query.getResultList();
            
            if (resultados != null && resultados.size()>0) {
                resultado = (D29CreUsuario) resultados.get(0);
                if (resultado != null && resultado.getD29CreUsuarioList() != null && resultado.getD29CreUsuarioList() .size()>0) {
                    responsable = resultado.getD29CreUsuarioList().get(0);
                }
            }
            
            
        }catch(NoResultException ne){
            LOG.error("ERROR AL OBTENER RESPONSABLE AUTORIZACION: " + ne.getMessage());
            return null;
        }
        return responsable;
    }
    
    
    public D29SolicitudAmbienteCtg guardarSolicitud(SolicitudCtg solicitud)throws Exception{
        if(solicitud!=null){
        
            EntityManager eMa = emUtil.getEntityManager();
            eMa.clear();
            D29SolicitudAmbienteCtg sol = new D29SolicitudAmbienteCtg();
           try {
            
                eMa.getTransaction().begin();
                Integer consecutivo = null;
                String folio = null;
                
                Calendar calendarFsol = DateUtils.toCalendar(solicitud.getFecha_solicitud()); //Calendar Fecha Solicitud
                Calendar calendarFact = DateUtils.toCalendar(new Date()); // Calendar Fecha Actual
                
                int esDiaMenor = DateUtils.truncatedCompareTo(calendarFsol, calendarFact, Calendar.DAY_OF_MONTH);
                int esMesMenor = DateUtils.truncatedCompareTo(calendarFsol, calendarFact, Calendar.MONTH);
                int esAñoMenor = DateUtils.truncatedCompareTo(calendarFsol, calendarFact, Calendar.YEAR);
                
                int esFechaMenorHoy = this.compareDates(solicitud.getFecha_solicitud(), calendarFact.getTime());
                int esFechaMayor1dia = this.compareDates(solicitud.getFecha_solicitud(), DateUtils.addDays(calendarFact.getTime(), 1));
                
                    if (solicitud.getAmbiente().equals("D")) {
                        folio = "S/F";
                        consecutivo = 0;
                    } else if ("P".equals(solicitud.getAmbiente())
                            && (esDiaMenor < 0 || esMesMenor < 0 || esAñoMenor < 0) ) {
                        throw new Exception("No se pueden guardar solicitudes con un fecha menor a la actual.");
                    } else if ("P".equals(solicitud.getAmbiente())
                            && (esFechaMenorHoy <= 0 && !this.compareHours(solicitud.getHora_inicio()))) {
                        throw new Exception("No se pueden guardar solicitudes con un horario menor al actual.");
                    } else if ("P".equals(solicitud.getAmbiente())
                            && esFechaMayor1dia > 0 ) {
                        throw new Exception("No se pueden guardar solicitudes con un fecha mayor a un día.");
                    } else {
                        consecutivo = this.getConsecutivo();
                        folio = this.generarFolio(consecutivo);
                    }

                    sol.setNumTotalTransacciones(BigInteger.valueOf(Long.parseLong(""+solicitud.getTotal_transacciones())));
                    sol.setEstatus("INA");
                    sol.setSolicitante(this.getUsuario(solicitud.getSolicitante()));
                    sol.setConsecutivo(BigInteger.valueOf(Long.parseLong(""+consecutivo)));
                    sol.setFolio(folio);
                    sol.setHoraInicio(getFormattedHour(solicitud.getHora_inicio(), "HH:mm"));
                    sol.setHoraFin(getFormattedHour(solicitud.getHora_fin(), "HH:mm"));
                    sol.setFechaCreacion(new Date());
                    sol.setFechaSolicitud(solicitud.getFecha_solicitud());
                    sol.setProyectoAsociado(solicitud.getProyectoAsociado());
                    sol.setComentarios(solicitud.getComentarios());
                    sol.setTransaccion(solicitud.getTransaccion());
                    sol.setUsuarioM2k(solicitud.getUsuario());
                    sol.setAmbiente(solicitud.getAmbiente());
                    sol.setPrograma(solicitud.getPrograma());

                    if (solicitud.getAmbiente().equals("D")) {
                        sol.setFechaCaducidad(null);
                        sol.setResponsableAutorizacion(this.getUsuario(solicitud.getSolicitante()));
                    } else {
                        sol.setFechaCaducidad(this.getFechaHoraCaducidad(solicitud.getFecha_solicitud(),solicitud.getHora_fin()));
                        sol.setResponsableAutorizacion(this.getUsuario(solicitud.getResponsableAutorizacion()));
                    }

                eMa.persist(sol);
                eMa.flush();
                eMa.getTransaction().commit();
                return sol;
            
            } catch(Exception e) {
                eMa.getTransaction().rollback();
                this.LOG.error("ERROR AL GUARDAR LA SOLICITUD: ", e);
                throw new Exception(e);
            }
            
        } else {
            throw new Exception("No se puede guardar una solicitud nula.");
        }
        
    }
    
    public HistoryDetail guardarHistoriaCron(PruebaCtg prueba,String request,String respuesta) throws Exception{
        time=new LocalDateTime();
        Date now=new Date();
        EntityManager eMa = emUtil.getEntityManager();
        eMa.clear();
        HistoryDetail histD=new HistoryDetail();
        History historia=new History();
        String descripcion="Ejecución servicio I*2M Migra región ALL_REGIONS : "+ time;
        String descripcionHD="CTG "+time;
        String date=time.getDayOfMonth()+"/"+time.getMonthOfYear()+"/"+time.getYear();
        
        try{
            eMa.getTransaction().begin();
            historia.setDescription(descripcion);
            historia.setStartTime(time);
            historia.setStatus(HistoryStatus.SUCCESSFUL);
            LOG.info("<<<<<<<<<<<<<<<<HISTORIA SIGNADA SATISFACTORIAMENTE >>>>>>>>>>>>>>>>>>>>>>>>");
            LocalDateTime end=new LocalDateTime();  
            histD.setDescription(descripcionHD);
            histD.setEndTime(end);
            histD.setHistory(historia);
            histD.setRegion(Short.parseShort(prueba.getRegion().substring(2)));
            histD.setRequest(request);
            histD.setResponse(respuesta);
            histD.setStartTime(time);
            histD.setStatus(historia.getStatus());
            
            eMa.persist(histD);
            eMa.flush();
            eMa.getTransaction().commit();
            LOG.info("<<<<<<<<<<<<<<<<HISTORIA DETALLE GUARDADA SATISFACTORIAMENTE >>>>>>>>>>>>>>>>>>>>>>>>");
            return histD;
        }catch(Exception ex){
            eMa.getTransaction().rollback();
            this.LOG.error("ERROR AL GUARDAR LA SOLICITUD: ", ex);
            throw new Exception(ex);
        }  
    }
    
    
    private String getFormattedHour(Date hora, String formato) {
        SimpleDateFormat sdf = new SimpleDateFormat(formato);
        return sdf.format(hora);
    }
    
    private boolean compareHours (Date horaInicioSolicitud) {
        
        boolean esHoraSolValida = false;
        
        try {
            
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            Date hi = sdf.parse(this.getFormattedHour(horaInicioSolicitud, "HH:mm"));
            Date ha = new Date();
            
            Calendar calendarHa = Calendar.getInstance();
            calendarHa.setTime(ha);
            
            Calendar calendarHi = Calendar.getInstance();
            calendarHi.setTime(hi);
            calendarHi.set(Calendar.DAY_OF_MONTH, calendarHa.get(Calendar.DAY_OF_MONTH));
            calendarHi.set(Calendar.MONTH, calendarHa.get(Calendar.MONTH));
            calendarHi.set(Calendar.YEAR, calendarHa.get(Calendar.YEAR));
            
            Date x = calendarHa.getTime();
            Date fhi = calendarHi.getTime();
            
            if ( fhi.equals(x) || fhi.after(x)) {
                //SE REVISA SI LA HORA ACTUAL ESTA ENTRE LA HORA INICIO Y HORA FIN.
                esHoraSolValida = true;
            }
            
        } catch (ParseException ex) {
            LOG.error("ERROR AL COMPARAR HORAS: ", ex);
        }
        
        return esHoraSolValida;
        
    }
    
    
    private int compareDates(Date startDate, Date endDate) throws Exception {
        if (startDate == null || endDate == null) {
            throw new Exception("No se pueden comparar fechas nulas.");
        }
        return startDate.compareTo(endDate);
    }
    
    public List<History> getHistoryMig(int page, int size, String sort){
        page=page+1;
        int max=(page*size);
        int min=((max-size));
        List<History> historias=new ArrayList<>();
        try{
            EntityManager enM=emUtil.getEntityManager();
            enM.clear();
            Query quer=enM.createQuery("FROM  History h WHERE description LIKE '%Reinicio Tarea MIGRA%' ORDER BY h.startTime DESC");
            
            historias=quer.getResultList();
            
            return historias;
        }catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
    }
    
    private Integer getConsecutivo() {
        
        Integer consecutivo = null;
        
        try {
            
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createNativeQuery("SELECT MAX(CONSECUTIVO) AS MAX_CONSECUTIVO FROM D29_SOLICITUD_AMBIENTE_CTG");
            List resultado = query.getResultList();
            
            if (resultado != null && resultado.get(0) != null) {
                consecutivo = Integer.parseInt(""+resultado.get(0).toString())+1;
            } else {
                consecutivo = Integer.parseInt("1");
            }
            
        } catch(Exception e) {
            LOG.error("Error al obtener consecutivo para folio.", e);
        }
        
        return consecutivo;
    }
    
    
     private String generarFolio(Integer consecutivo){
        //return "CTGPROD"+ StringUtils.leftPad(""+consecutivo, 13, "0");
        return "CTGPROD"+ consecutivo;
    }
     
     
    private Date getFechaHoraCaducidad(Date fecha, Date hora) throws Exception {
        
        if (fecha == null || hora == null) {
            throw new Exception("No se puede obtener la fecha de caducidad.");
        }
        
        Date fechaCaducidad = null;
        
        try {
            
            Calendar fhHora = Calendar.getInstance();
            fhHora.setTime(hora);
            Calendar fhCad = Calendar.getInstance();
            fhCad.setTime(fecha);
            fhCad.set(Calendar.HOUR, fhHora.get(Calendar.HOUR_OF_DAY));
            fhCad.set(Calendar.HOUR_OF_DAY, fhHora.get(Calendar.HOUR_OF_DAY));
            fhCad.set(Calendar.MINUTE, fhHora.get(Calendar.MINUTE));
            fhCad.set(Calendar.SECOND, 0);
            fhCad.set(Calendar.MILLISECOND, 0);
            
            fechaCaducidad = fhCad.getTime();
//            LOG.info("****************************");
//            LOG.info("****************************");
//            LOG.info("FECHA DE CADUCIDAD: " + this.getFormattedHour(fechaCaducidad, "dd/MM/yyyy HH:mm"));
//            LOG.info("****************************");
//            LOG.info("****************************");
        } catch(Exception e) {
            LOG.error("ERROR AL CONSTRUIR LA FECHA DE CADUCIDAD..!", e);
        }
        
        return fechaCaducidad;
    }
    
    
    
}
