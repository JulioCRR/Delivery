package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao;



import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosIp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.ConteoSolicitudes;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosTrans;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.FormaterDateAgenda;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.FechasReservadas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.CleanCadenas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;

@Repository
@Transactional
public class AgendaDao {

    private static final Logger LOG = LoggerFactory.getLogger(AgendaDao.class);

    @Autowired
    @Qualifier(value = "entityManagerFactory")
    private EntityManagerFactory managerFactory;

    @Autowired
    private FormaterDateAgenda formato;

    @Autowired
    private DiasInhabliesDao utilDao;
    
     @Autowired
    private AgendaServicesImp agendaIm;

    List<AgendaDesarrolloWSM2K> agendaLista = null;

    AgendaDesarrolloWSM2K agenda;

    Short ACTIVO = 1, INACTIVO = 0, turno;
    
    public boolean save(SolicitudAmbiente solicitud) {

        EntityManager em = managerFactory.createEntityManager();

        PermisosDesarrolloWSM2K permiso;

        FechasReservadas diasReservados;

        short turno = (short) solicitud.getTurno();
        String[] transacciones = new String[utilDao.getListPermisoTrans(solicitud).size()];
        int c = 0;
        for (PermisosTrans t : utilDao.getListPermisoTrans(solicitud)) {
            transacciones[c] = t.getTransaccion();
            c++;
        }
        try {
            em.getTransaction().begin();
            agenda = new AgendaDesarrolloWSM2K();
            agenda.setIdusuariobatch(new Usuario(solicitud.getUser()));
            agenda.setpTurno(turno);
            agenda.setNomProyecto(solicitud.getNomProyect());
            agenda.setComentarios(CleanCadenas.deAccent(solicitud.getComentarios()));
            agenda.setUsuarioDesa(solicitud.getUsuario());
            agenda.setpActivos(INACTIVO);
            int dias = formato.validaFechas(solicitud.getFechaInicio(), solicitud.getFechaFinal());
            int contador = 0;
            for (int i = 0; i < dias; i++) {
                Date diaSemana = formato.modificarDia(solicitud.getFechaInicio(), i);
                diasReservados = new FechasReservadas();
                if (utilDao.validaDiasInahiles(formato.formatDateLess(diaSemana))) {
                    contador--;
                    LOG.info("contador" + contador);
                } else {
                    diasReservados.setFechaFinal(solicitud.getFechaFinal());
                    diasReservados.setAgenda(agenda);
                    diasReservados.setFechaInicio(formato.modificarDia(solicitud.getFechaInicio(), i));
                    em.persist(diasReservados);
             
                }
                contador++;
            }
            agenda.setDiasReservado(contador);
            em.persist(agenda);

            for (PermisosIp p : utilDao.getListPermisoIp(solicitud)) {
                for (int i = 0; i < transacciones.length; i++) {
                    permiso = new PermisosDesarrolloWSM2K();
                    permiso.setIpDesa(p.getIp());
                    permiso.setTransDesa(transacciones[i]);
                    permiso.setAgenda(agenda);
                    em.persist(permiso);
                
                }
            }
            em.flush();
            em.getTransaction().commit();
            LOG.info("SE PERSISTE LA SOLICITUD PARA AGENDAR AMBIENTE DE DESARROLLO, DEL USUARIO:  "+ solicitud.getUser());
            return true;
        } catch (Exception e) {
            em.getTransaction().rollback();
            LOG.error("ERROR AL GUARDAR LOS DATOS PARA AGENDAR EL AMBIENTE ", e);
            return false;
        }
    }

      public List<AgendaDesarrolloWSM2K> getAgendaUser(int idPerfil, Date starDate, int user) {
        List<AgendaDesarrolloWSM2K> agendaListaUsr=null;
        Date fechaInico=starDate;
        LOG.info("SE BUSCA LA AGENDA DEL USUARIO  " + user + "  CON PERFIL " + idPerfil);
        EntityManager em = managerFactory.createEntityManager();
        String query = "SELECT distinct c FROM AgendaDesarrolloWSM2K c, FechasReservadas f WHERE c.idFolio= f.agenda.idFolio and  f.fechaInicio BETWEEN  :fcehaIn and :fechaFn ";
        try {
            if (idPerfil != Constants.ID_PERFIL) {
                query = query + " and c.idusuariobatch.id= :usuario ";
            }
            LOG.info("FECHAAAA" + fechaInico);
            TypedQuery<AgendaDesarrolloWSM2K> q = em.createQuery(query, AgendaDesarrolloWSM2K.class)
                    .setParameter("fcehaIn", fechaInico)
                    .setParameter("fechaFn", formato.modificarDia(fechaInico, (agendaIm.getLimiteDiasHabiles()+5)));
            
            if (idPerfil != Constants.ID_PERFIL) {
                q.setParameter("usuario", user);
            }
            
            agendaListaUsr = q.getResultList();

        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR LA AGENDA ", ex);
            return null;
        }
        return agendaListaUsr;
    }

    public int getPerfil(Integer idEmpl) {
        EntityManager em = managerFactory.createEntityManager();
        List<UsuarioPerfil> perfilUsuario = null;
        int perfil = 0;
        try {
            perfilUsuario = em.createQuery("SELECT u FROM UsuarioPerfil u  WHERE u.usuario= :usuario", UsuarioPerfil.class)
                    .setParameter("usuario", new Usuario(idEmpl))
                    .getResultList();
            for (UsuarioPerfil p : perfilUsuario) {
                if(p.getPerfil().getId()==1){
                    perfil=1;
                    break;
                }             
            }
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR EL PERFIL DEL USUARIO", ex);

        }
        return perfil;
    }

    public List<AgendaDesarrolloWSM2K> getAgenda(String fecha) {
        
        Date date=formato.validaMesCalendario( fecha);
        EntityManager em = managerFactory.createEntityManager();                                                                                                                                                         
        try {
            TypedQuery<AgendaDesarrolloWSM2K> q = em.createQuery("SELECT distinct  c FROM AgendaDesarrolloWSM2K c, FechasReservadas f WHERE c.idFolio=f.agenda.idFolio  and f.fechaInicio  BETWEEN :fechaActual  and :fechaFinal ",AgendaDesarrolloWSM2K.class)
                                                                .setParameter("fechaActual", formato.formatStringDate(date))
                                                                .setParameter("fechaFinal", formato.formatStringDate(formato.validaFechaFinal(date)));
            
                    
            agendaLista = q.getResultList();
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR LA AGENDA ", ex);
            return null;
        }
        return agendaLista;
    }

    
    public AgendaDesarrolloWSM2K getByFolio(Integer folio) {
        EntityManager em = managerFactory.createEntityManager();
        try {
            agenda = em.createQuery("SELECT c FROM AgendaDesarrolloWSM2K c WHERE c.idFolio =:folio", AgendaDesarrolloWSM2K.class)
                    .setParameter("folio", folio)
                    .getSingleResult();
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR AGENDA POR FOLIO", ex);
            return null;
        }
        return agenda;
    }

    
    
    public List<String> getPemisosDesa(Integer folio, int indicador) {
        EntityManager em = managerFactory.createEntityManager();
        List<String> permisos = new ArrayList<>();
        String tDist = "";
        if (indicador == 1) {
            tDist = "p.ipDesa";
        } else {
            tDist = "p.transDesa";
        }
        try {
            permisos = em.createQuery("SELECT DISTINCT(" + tDist + ") FROM AgendaDesarrolloWSM2K c, PermisosDesarrolloWSM2K p WHERE p.agenda.idFolio =:folio", String.class)
                    .setParameter("folio", folio)
                    .getResultList();

        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR LISTA DE IP'S", ex);
            return null;
        }
        return permisos;
    }

    
    
    public List<AgendaDesarrolloWSM2K> searchPermisos(int indicador) {
        EntityManager em = managerFactory.createEntityManager();
        turno=(short) indicador;
        try {
         agendaLista = em.createQuery("SELECT a  FROM AgendaDesarrolloWSM2K a WHERE a.pTurno=:turno and  a.pActivos=:activo", AgendaDesarrolloWSM2K.class)
                 .setParameter("turno", turno)   
                 .setParameter("activo", ACTIVO)
                    .getResultList();
                   
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR LOS PERMISOS EN DESARROLLO WS-M2K", ex);
            return null;
        }
        return agendaLista;
    }

    
    
    public int updateEstatus(int indicador) {
        EntityManager em = managerFactory.createEntityManager();
        Date date = new Date();
        int executeUpdate = 0;
        Short estatus;
        String query="SELECT b.agenda.idFolio FROM FechasReservadas b WHERE b.fechaInicio= :fecha";
        if(indicador==1){
            LOG.info("SE CAMBIA ESTATUS A ACTIVO");
           estatus=ACTIVO;
        }else{
            LOG.info("SE CAMBIA ESTATUS A INACTIVO");
          estatus=INACTIVO;
        }
        try {
            em.clear();
            em.getTransaction().begin();
            List<Integer> ids = em.createQuery(query, Integer.class)
                    .setParameter("fecha", formato.formatStringDate(date))
                    .getResultList();

            if (ids.size() > 0) {
                executeUpdate = em.createQuery("UPDATE AgendaDesarrolloWSM2K a SET a.pActivos= :activo WHERE a.idFolio IN :ids")
                        .setParameter("activo", estatus)
                        .setParameter("ids", ids)
                        .executeUpdate();

            }      
            em.getTransaction().commit();
            LOG.info("ROW MODIFICADAS  " + executeUpdate +":"+ids.toString());
        } catch (Exception ex) {
            LOG.error("ERROR AL MODIFICAR EL ESTATUS DE LA AGENDA DE DESARROLLO", ex);
        }
        return executeUpdate;
    }
    
  
    
    public boolean verificarPeticion(SolicitudAmbiente solicitud) {
        EntityManager em = managerFactory.createEntityManager();
        boolean validacion = true;
        int duplicadas = 0;
        turno = (short) solicitud.getTurno();
        try {
            for (PermisosIp p : utilDao.getListPermisoIp(solicitud)) {
                for (PermisosTrans t : utilDao.getListPermisoTrans(solicitud)) {

                    Query q = em.createQuery("SELECT COUNT(c) FROM AgendaDesarrolloWSM2K c , PermisosDesarrolloWSM2K p , FechasReservadas f WHERE c.idFolio=p.agenda.idFolio and c.idFolio=f.agenda.idFolio and c.pTurno=:turno and  c.usuarioDesa= :usuario and p.ipDesa= :ip and p.transDesa= :trans and f.fechaInicio= :fecha")
                            .setParameter("turno", turno)
                            .setParameter("usuario", solicitud.getUsuario())
                            .setParameter("ip", p.getIp())
                            .setParameter("trans", t.getTransaccion())
                            .setParameter("fecha", formato.formatStringDate(solicitud.getFechaInicio()));
                    duplicadas = ((Number) q.getSingleResult()).intValue();
                    LOG.info("BUSQUEDA DE PARAMETROS: " + solicitud.getUsuario() + " " + p.getIp() + " " + t.getTransaccion() + " " + formato.formatStringDate(solicitud.getFechaInicio()));
                    LOG.info("PERMISOS DUPLICADOS  " + duplicadas);
                    if (duplicadas > 0) {
                        return false;
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR DUPLICIDAD DE SOLICITUD", ex);
        }
        return validacion;
    }
    
   
    public ConteoSolicitudes getConteoAmbiente(SolicitudAmbiente solicitud) {
        ConteoSolicitudes sol=new ConteoSolicitudes();
        EntityManager em = managerFactory.createEntityManager();
        int totalPeticiones = 0;
        turno=(short) solicitud.getTurno();
        int dias = formato.validaFechas(solicitud.getFechaInicio(), solicitud.getFechaFinal());
        try {
            for (int i = 0; i < dias; i++) {
                Date fecha=formato.modificarDia(solicitud.getFechaInicio(), i);
                Query q = em.createQuery("SELECT COUNT(a) FROM  AgendaDesarrolloWSM2K a , FechasReservadas f  WHERE a.idFolio=f.agenda.idFolio and  a.pTurno= :turno and f.fechaInicio= :fecha ")
                        .setParameter("turno", turno )
                        .setParameter("fecha", formato.formatStringDate(fecha));

                totalPeticiones = ((Number) q.getSingleResult()).intValue();
                LOG.info("AMBIENTE RESERVADO : " + totalPeticiones + "  EVENTOS DEL DÍA :  " + fecha);
                if (totalPeticiones >= agendaIm.getLimiteAmbiente()) {
                    sol.setcDias(totalPeticiones);
                    sol.setDiaOcupado(fecha);
                   break;
                }
            }
        } catch (Exception ex) {
            LOG.error("ERROR AL VALIDAR DISPONIBILIDAD DE AMBIENTE", ex);
            return null;
        }
        return sol;
    }
    
     
      public Usuario  getUsuarioDetalle(int userId) {
        EntityManager em = managerFactory.createEntityManager();
        Usuario usuario;
        try {
            usuario = em.createQuery("SELECT c FROM Usuario c WHERE c.id= :empleado ", Usuario.class)
                    .setParameter("empleado", userId)
                    .getSingleResult();
        return  usuario;
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR  USUARIO", ex);
           return null;
        }
        
    }
         
}
