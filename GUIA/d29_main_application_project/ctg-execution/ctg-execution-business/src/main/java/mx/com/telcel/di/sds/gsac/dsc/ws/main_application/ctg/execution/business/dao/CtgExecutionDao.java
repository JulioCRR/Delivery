/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.dao;

import com.ibm.icu.text.SimpleDateFormat;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesCTGImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29BitacoraEjecucionesCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PermisosCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.SolicitudCtg;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Component
public class CtgExecutionDao {
    
    private static final Logger LOG = LoggerFactory.getLogger(CtgExecutionDao.class);

    @Autowired
    private EntityManagerUtil emUtil;
    
    public D29SolicitudAmbienteCtg isCodigoProduccionValid(String codigo, int idUsuario) throws Exception {
        
        D29SolicitudAmbienteCtg solicitud = null;
        
            try {
            
                EntityManager em = emUtil.getEntityManager();
                em.clear();
                Query query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.folio = :folio and d.solicitante = :solicitante and d.estatus = :estatus", D29SolicitudAmbienteCtg.class);
                query.setParameter("folio", codigo);
                query.setParameter("solicitante", this.getUsuario(idUsuario));
                query.setParameter("estatus", "ACT");
                
                List resultado = query.getResultList();
                
                if (resultado != null && resultado.size()>0) {
                    
                    solicitud = (D29SolicitudAmbienteCtg) resultado.get(0);
                    
                    if (solicitud != null) {
                        
                        Calendar calendarFhSol = Calendar.getInstance();
                        calendarFhSol.setTime(solicitud.getFechaSolicitud());
                        calendarFhSol.set(Calendar.HOUR, 0);
                        calendarFhSol.set(Calendar.MINUTE, 0);
                        calendarFhSol.set(Calendar.SECOND, 0);
                        calendarFhSol.set(Calendar.MILLISECOND, 0);
                        calendarFhSol.set(Calendar.AM_PM, Calendar.AM);
                        
                        Calendar calendarFhAct = Calendar.getInstance();
                        calendarFhAct.setTime(new Date());
                        calendarFhAct.set(Calendar.HOUR, 0);
                        calendarFhAct.set(Calendar.MINUTE, 0);
                        calendarFhAct.set(Calendar.SECOND, 0);
                        calendarFhAct.set(Calendar.MILLISECOND, 0);
                        calendarFhAct.set(Calendar.AM_PM, Calendar.AM);
                        
                        SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
                        Date hi1 = sd.parse(sd.format(calendarFhSol.getTime()));
                        Date hf2 = sd.parse(sd.format(calendarFhAct.getTime()));
                        
                        if (hi1.equals(hf2)) { 
                            //SI LA FECHA DE LA SOLICITUD ES IGUAL A LA FECHA ACTUAL - CONTINUA EVALUACION
                            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                            Date hi = sdf.parse(solicitud.getHoraInicio());
                            Date hf = sdf.parse(solicitud.getHoraFin());
                            Date ha = new Date();
                            
                            Calendar calendarHa = Calendar.getInstance();
                            calendarHa.setTime(ha);
                            
                            Calendar calendarHi = Calendar.getInstance();
                            calendarHi.setTime(hi);
                            calendarHi.set(Calendar.DAY_OF_MONTH, calendarHa.get(Calendar.DAY_OF_MONTH));
                            calendarHi.set(Calendar.MONTH, calendarHa.get(Calendar.MONTH));
                            calendarHi.set(Calendar.YEAR, calendarHa.get(Calendar.YEAR));
                            
                            Calendar calendarHf = Calendar.getInstance();
                            calendarHf.setTime(hf);
                            calendarHf.set(Calendar.DAY_OF_MONTH, calendarHa.get(Calendar.DAY_OF_MONTH));
                            calendarHf.set(Calendar.MONTH, calendarHa.get(Calendar.MONTH));
                            calendarHf.set(Calendar.YEAR, calendarHa.get(Calendar.YEAR));
                            
                            Date x = calendarHa.getTime();
                            Date fhi = calendarHi.getTime();
                            Date fhf = calendarHf.getTime();
                            
                            if (x.after(fhi) && x.before(fhf)) {
                                //SE REVISA SI LA HORA ACTUAL ESTA ENTRE LA HORA INICIO Y HORA FIN.
                                return solicitud;
                            } else {
                                solicitud = null;
                            }
                        } else {
                            solicitud = null;
                        }
                    }
                    
                }
                
            }catch(Exception e) {
                LOG.error("ERROR AL VALIDAR EL CODIGO.", e);
            }
        
        return solicitud;
    }
    
    public boolean validarEjecucionCtgProd(D29SolicitudAmbienteCtg solicitud, String transaccion, String programa, String usrMobile, int idUsuarioEjec) {
    
        boolean esValido = false;
        
        try {
            //SE VALIDA QUE: SE ESTE EJECUTANDO LA TRANSACCION REGISTRADA, QUE NO HAYA SUPERADO EL NUMERO DE TRANSACCIONES REGISTRADAS, QUE LAS ESTE EJECUTANDO EL SOLICITANTE.
            if (solicitud != null) {
                int totalEjecuciones = this.getBitacoraBySolicitud(solicitud.getId());
                BigInteger total = BigInteger.valueOf(Long.parseLong(""+totalEjecuciones));
                
                if (total.compareTo(solicitud.getNumTotalTransacciones()) >= 0 && 
                        solicitud.getPrograma().equals(programa) && 
                        solicitud.getTransaccion().equals(transaccion) &&
                        solicitud.getUsuarioM2k().equals(usrMobile) &&
                        solicitud.getSolicitante().getId() == idUsuarioEjec) {
                    //TOTAL DE EJECUCIONES MAYOR O IGUAL A LAS SOLICITADAS.
                    //SE ACTUALIZA LA SOLICITUD A ESTATUS 'COMPLETADO'
                    String[] sol = new String[1];
                    sol[0] = ""+solicitud.getId();
                    this.actualizarSolicitudes("COMPLETAR", sol);
                    esValido = false;
                } else if (total.compareTo(solicitud.getNumTotalTransacciones()) == -1 && 
                        solicitud.getPrograma().equals(programa) && 
                        solicitud.getTransaccion().equals(transaccion) &&
                        solicitud.getUsuarioM2k().equals(usrMobile) &&
                        solicitud.getSolicitante().getId() == idUsuarioEjec) {
                    //TOTAL DE EJECUCIONES MENOR A LAS SOLICITADAS.
                    esValido = true;
                }
            }

        } catch(Exception e) {
            LOG.error("ERROR AL VALIDAR LA EJECUCION CTG.");
        }
        
        return esValido;
    }
    
    public Integer getBitacoraBySolicitud(Integer idSolicitud) {
        
        int totalEjecucionesBitacora = 0;
        
        try {            
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createNativeQuery("SELECT COUNT(*) AS TOTAL FROM D29_BITACORA_EJECUCIONES_CTG WHERE SOLICITUD_CTG = " + idSolicitud);
            List resultado = query.getResultList();
            
            if (resultado != null && resultado.get(0) != null) {
                totalEjecucionesBitacora = Integer.parseInt(""+resultado.get(0).toString());
            }    
        } catch(Exception e) {
            LOG.error("ERROR AL VALIDAR LA EJECUCION CTG.");
        }
        return totalEjecucionesBitacora;
    }
    
    public D29SolicitudAmbienteCtg guardarSolicitud(SolicitudCtg solicitud) throws Exception {
    
        if (solicitud != null) {
            
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            D29SolicitudAmbienteCtg sol = new D29SolicitudAmbienteCtg();
            
            try {
            
                em.getTransaction().begin();
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

                em.persist(sol);
                em.flush();
                em.getTransaction().commit();
            
            } catch(Exception e) {
                em.getTransaction().rollback();
                this.LOG.error("ERROR AL GUARDAR LA SOLICITUD: ", e);
                throw new Exception(e);
            }
            
            return sol;
        } else {
            throw new Exception("No se puede guardar una solicitud nula.");
        }
    }
    
    private String generarFolio(Integer consecutivo){
        //return "CTGPROD"+ StringUtils.leftPad(""+consecutivo, 13, "0");
        return "CTGPROD"+ consecutivo;
    }
    
    private String getFormattedHour(Date hora, String formato) {
        SimpleDateFormat sdf = new SimpleDateFormat(formato);
        return sdf.format(hora);
    }
    
    private int compareDates(Date startDate, Date endDate) throws Exception {
        if (startDate == null || endDate == null) {
            throw new Exception("No se pueden comparar fechas nulas.");
        }
        return startDate.compareTo(endDate);
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
    
    public List<D29SolicitudAmbienteCtg> getSolicitudes(int id, int tipo) throws Exception {
        
        List<D29SolicitudAmbienteCtg> solicitudes = null;
        String sql = null;
        Query query = null;
        EntityManager em = emUtil.getEntityManager();
        
            try {
                em.clear();
                D29CreUsuario usr = getUsuario(id);
                
                if (tipo == 1) { //INACTIVAS
                    query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = 'INA' and d.folio <> 'S/F' and (d.solicitante = :solicitanteId or d.responsableAutorizacion = :responsableId) order by d.fechaSolicitud desc");
                } else if (tipo == 2) {//ACTIVAS
                    query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = 'ACT' and d.folio <> 'S/F' and (d.solicitante = :solicitanteId or d.responsableAutorizacion = :responsableId) order by d.fechaSolicitud desc");
                } else if (tipo == 3) { //RECHAZADAS
                    query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = 'REC' and d.folio <> 'S/F' and (d.solicitante = :solicitanteId or d.responsableAutorizacion = :responsableId) order by d.fechaSolicitud desc");
                } else if (tipo == 4) { //CANCELADAS
                    query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = 'CAN' and d.folio <> 'S/F' and (d.solicitante = :solicitanteId or d.responsableAutorizacion = :responsableId) order by d.fechaSolicitud desc");
                } else if (tipo == 5) { //COMPLETADAS
                    query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = 'COM' and d.folio <> 'S/F' and (d.solicitante = :solicitanteId or d.responsableAutorizacion = :responsableId) order by d.fechaSolicitud desc");
                }
                
                query.setParameter("solicitanteId", usr);
                query.setParameter("responsableId", usr);
                solicitudes = query.getResultList();
                
            } catch(Exception e) {
                LOG.error("Error al obtener solicitudes Ctg.", e);
            }
        
        return solicitudes;
    }
    
    public D29CreUsuario obtenerResponsable(int id) throws Exception {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>INICIANDO PROCESO DE OBTENER RESPONSABLE");
        D29CreUsuario resultado = null;
        D29CreUsuario responsable = null;
        try {

            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createQuery("SELECT d FROM D29CreUsuario d WHERE d.id = :id");
            query.setParameter("id", Long.parseLong(""+id));
            List resultados = query.getResultList();
            if (resultados != null && resultados.size()>0) {
                resultado = (D29CreUsuario) resultados.get(0);
                LOG.info("EL USUARIO ES -> "+resultado.getNombre()+" "+resultado.getAPaterno()+" "+resultado.getAMaterno());
                
                if(resultado.getResponsable()==null){
                    responsable=null;
                    LOG.info("EL USUARIO NO TIENE RESPONSABLE ASIGNADO");
                }else{
                    
                    if(resultado.getIdPuesto()==null || resultado.getIdPuesto().getId()!=2952 || resultado.getIdPuesto().getId()!=3952){
                        Query queryR=em.createQuery("SELECT r FROM D29CreUsuario r WHERE r.id=:idR");
                        queryR.setParameter("idR",resultado.getResponsable());
                        responsable=(D29CreUsuario) queryR.getSingleResult();
                        LOG.info("RESPONSABLE ES ->>>>>>> "+responsable.getNombre()+" "+responsable.getAPaterno()+" "+responsable.getAMaterno());
                    }else if(resultado.getIdPuesto().getId()==2952 || resultado.getIdPuesto().getId()==3952){
                    responsable =resultado;
                    LOG.info("RESPONSABLE ES -> "+responsable.getNombre()+" "+responsable.getAPaterno()+" "+responsable.getAMaterno());
                    }
                }
            }
            
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER RESPONSABLE: " + e.getMessage());
            return null;
        }
        
        return responsable;
    }
    
    
    public D29CreUsuario getUsuario(int id) throws Exception {
        
        D29CreUsuario resultado = null;

        try {

            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createQuery("SELECT d FROM D29CreUsuario d WHERE d.id = :id");
            query.setParameter("id", Long.parseLong(""+id));
            List resultados = query.getResultList();
            
            if (resultados != null && resultados.size()>0) {
                resultado = (D29CreUsuario) resultados.get(0);
            }
            
        } catch (NoResultException e) {
            LOG.error("ERROR AL OBTENER EL USUARIO: " + e.getMessage());
            return null;
        }
        
        return resultado;
    }
 
    public boolean actualizarSolicitudes(String op, String[] folios) {
        
        boolean actualizado = false;
        String sql = null;
         EntityManager em = emUtil.getEntityManager();
            try {
               em.clear();
                em.getTransaction().begin();
                if ("APROBAR".equals(op.trim())) {
                    sql = "UPDATE D29_SOLICITUD_AMBIENTE_CTG SET ESTATUS = 'ACT', FECHA_APROBACION = systimestamp WHERE ID IN("+this.formatUpdateFolios(folios)+")";
                } else if ("CANCELAR".equals(op.trim())) {
                    sql = "UPDATE D29_SOLICITUD_AMBIENTE_CTG SET ESTATUS = 'CAN', FECHA_APROBACION = systimestamp WHERE ID IN("+this.formatUpdateFolios(folios)+")";
                } else if ("RECHAZAR".equals(op.trim())) {
                    sql = "UPDATE D29_SOLICITUD_AMBIENTE_CTG SET ESTATUS = 'REC', FECHA_APROBACION = systimestamp WHERE ID IN("+this.formatUpdateFolios(folios)+")";
                } else if ("COMPLETAR".equals(op.trim())) {
                    sql = "UPDATE D29_SOLICITUD_AMBIENTE_CTG SET ESTATUS = 'COM', FECHA_APROBACION = systimestamp WHERE ID IN("+this.formatUpdateFolios(folios)+")";
                }
                
                Query query = em.createNativeQuery(sql);
                int result = query.executeUpdate();
                em.getTransaction().commit();
                
                if(result == folios.length) {
                    actualizado = true;
                }
                
            } catch(Exception e) {
                em.getTransaction().rollback();
                LOG.error("ERROR AL ACTUALIZAR LAS SOLICITUDES.");
            }
        
        return actualizado;
    }
    
    public List<D29SolicitudAmbienteCtg> getSolicitudes(String[] folios) {
        
        List<D29SolicitudAmbienteCtg> sols = new ArrayList<D29SolicitudAmbienteCtg>();
        
        try {
        
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.id = :id");
            
            for (String id: folios) {
                D29SolicitudAmbienteCtg sol = null;
                query.setParameter("id", Integer.parseInt(id));
                sol = (D29SolicitudAmbienteCtg) query.getSingleResult();
                sols.add(sol);
            }
            
        } catch(Exception e) {
            LOG.error("ERROR AL OBTENER LAS SOLICITUDES.", e);
        }
        
        return sols;
    }
    
    public D29SolicitudAmbienteCtg findSolicitudById(Integer id) {
    
        D29SolicitudAmbienteCtg sol = null;
        
        try {
            
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createQuery("SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.id = :id", D29SolicitudAmbienteCtg.class);
            query.setParameter("id", id);
            List resultados = query.getResultList();
            
            if (resultados != null && resultados.size()>0) {
                sol = (D29SolicitudAmbienteCtg) resultados.get(0);
            }
            
        } catch(Exception e) {
            LOG.error("ERROR AL BUSCAR SOLICITUD: ", e);
        }
        
        return sol;
    }
    
    private String formatUpdateFolios(String[] folios) {
        
        StringBuilder formatted = new StringBuilder();
        
        for (String folio : folios) {
            formatted.append(folio);    
            formatted.append(",");
        }
        
        String formatFolios = formatted.toString();
        
        return formatFolios.substring(0, (formatFolios.length()-1));
    }
    
    public void guardarBitacoraCTG(D29SolicitudAmbienteCtg sol, D29CreUsuario usuario, UtilidadesCTGImp respuestaCtg, String env) throws Exception {
    
        if (sol != null && usuario!= null && respuestaCtg != null) {
            
            EntityManager em = emUtil.getEntityManager();
            
            try {
            em.clear();
            em.getTransaction().begin();
            
            D29BitacoraEjecucionesCtg bitacora = new D29BitacoraEjecucionesCtg();
                bitacora.setSolicitudCtg(sol);
                bitacora.setUsuarioEjecucion(usuario);
                bitacora.setFechaEjecucion(new Date());
                bitacora.setCadenaEnviada(respuestaCtg.getCadenaEnviadaCTG()!=null&&!"".equals(respuestaCtg.getCadenaEnviadaCTG().trim())?respuestaCtg.getCadenaEnviadaCTG():"SIN CADENA");
                bitacora.setRespuestaPrograma(respuestaCtg.getRespuestaCTG()!=null&&!"".equals(respuestaCtg.getRespuestaCTG().trim())?respuestaCtg.getRespuestaCTG():"SIN RESPUESTA");
                bitacora.setRespuestaXml(respuestaCtg.getRespuestaXML()!=null?respuestaCtg.getRespuestaXML():"SIN RESPUESTA");
                bitacora.setRespuestaCtg(respuestaCtg.getReq()!=null&&respuestaCtg.getReq().getCicsRcString()!=null?respuestaCtg.getReq().getCicsRcString():"JAVA_ERROR");
                bitacora.setAmbiente(env);
            em.persist(bitacora);
            em.flush();
            em.getTransaction().commit();
            
            } catch(Exception e) {
                em.getTransaction().rollback();
                this.LOG.error("ERROR AL ACTUALIZAR LA BITACORA: ", e);
            }
            
        } else {
            throw new Exception("No se puede guardar una bitacora con valores nulos.");
        }
    }
    
    public PermisosCtg getPermisosSolicitudesCtg(int idUsuario) {
        
        PermisosCtg permiso = new PermisosCtg();
        
        try {
            
            EntityManager em = emUtil.getEntityManager();
            em.clear();
            Query query = em.createNativeQuery("SELECT COUNT(*) AS TOTAL FROM D29_REL_USR_SUP WHERE RESPONSABLE = " + idUsuario);
            List resultado = query.getResultList();
            
            if (resultado != null && resultado.get(0) != null &&
                    BigDecimal.valueOf(Long.parseLong(resultado.get(0).toString())).compareTo(BigDecimal.ZERO) == 1) {
                permiso.setPermiso("CP");
                permiso.setIsCp(true);
            } else {
                permiso.setPermiso("SP");
                permiso.setIsCp(false);
            }
            
        } catch(Exception e) {
            LOG.error("Error al obtener consecutivo para folio.", e);
        }
        
        return permiso;
    }
    
    
    public void depurarSolicitudesCtg() {
        EntityManager em = emUtil.getEntityManager();
        try {
            em.clear();
            em.getTransaction().begin();
            Query query = em.createNativeQuery("UPDATE D29_SOLICITUD_AMBIENTE_CTG SET ESTATUS = 'COM' WHERE ESTATUS IN ('ACT', 'INA') AND FECHA_CADUCIDAD_SOL <= systimestamp");
            int rowsAffected = query.executeUpdate();
            LOG.info("SE HAN ACTUALIZADO [" + rowsAffected + "] SOLICITUDES.");
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            LOG.error("Error al depurar solicitudes CTG.", e);
        }
        
    }
    
    public int asignarResponsable(String responsable,Integer idU){
        EntityManager em=emUtil.getEntityManager();
        D29CreUsuario userResp=null;
        int resp=0;
        long idResp=0;
        long idUser=idU;
        try{
            em.clear();
            em.getTransaction().begin();
            userResp=em.createQuery("SELECT us FROM D29CreUsuario us WHERE Correo=:responsable",D29CreUsuario.class)
            .setParameter("responsable", responsable)
            .getSingleResult();
            LOG.info("EL RESPONSABLE ASIGNADO ES -> "+userResp.getNombre()+" "+userResp.getAPaterno());
            
            idResp=userResp.getId();
            
            LOG.info("EL ID DEL USUARIO A MODIFICAR ES -> "+idUser);
            
            Query query=em.createQuery("UPDATE D29CreUsuario SET responsable=:userResp WHERE id=:idUser")
                  .setParameter("userResp",idResp)
                  .setParameter("idUser", idUser);
            resp=query.executeUpdate();
            em.getTransaction().commit();
            return resp;
        }catch(Exception ex){
            ex.printStackTrace();
            em.getTransaction().rollback();
            LOG.error("Error al intentar asignar responsable");
            return 0;
        }
    }
    
}
