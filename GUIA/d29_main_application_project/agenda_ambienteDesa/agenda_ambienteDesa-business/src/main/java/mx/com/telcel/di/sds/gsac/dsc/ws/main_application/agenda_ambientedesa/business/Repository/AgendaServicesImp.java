package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.annotation.PostConstruct;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.AgendaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.DiasInhabliesDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.EditarAgendaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.ConteoSolicitudes;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.TempletAgendaMail;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosIp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosTrans;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.CleanCadenas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.FormaterDateAgenda;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.ServicesPropertiesFuncionTo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.ValidadorTiempo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.DiasInhabiles;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.dao.ServiciosInformixDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class AgendaServicesImp implements AgendaRepository {

    private static final Logger LOG = LoggerFactory.getLogger(AgendaServicesImp.class);
    
    @Autowired
    public AgendaServicesImp(@Lazy AgendaDao agendaDao) {
        this.agendaDao = agendaDao;
    }
    
     @Autowired
    private EditarAgendaDao ediarAgenta;
    
    /*@Autowired
    public AgendaServicesImp(@Lazy EditarAgendaDao ediarAgenta) {
        this.ediarAgenta = ediarAgenta;
    }*/
     
    @Autowired
    private ServiciosInformixDao informixDao;

 
    private AgendaDao agendaDao;
    
     @Autowired
    private ServicesPropertiesFuncionTo ServicesWS;
   

    @Autowired
    private DiasInhabliesDao diasInhabiles;

    @Autowired
    private TempletAgendaMail temple;
    
    @Autowired
    private EditarAgendaDao edita;
     
    ValidadorTiempo val=new ValidadorTiempo();
    
    SolicitudAmbiente nSol;
    
    List<SolicitudAmbiente> solicitud;
    
    int limiteReservacion;
    
    int limiteAmbiente;
    
    int limiteHabiles;
    
    @Autowired
    private FormaterDateAgenda formato;
    
    
    /**
     * Este metodo en via la solicitud para que se persista.
     *
     * @param Solicitud objeto de la clase SolicitudAmbiente
     * @return true/false.
     */
    @Override
    public boolean enviarSolicitud(SolicitudAmbiente solicitud) {
        LOG.info("solicitud" + solicitud.toString());
        if (agendaDao.save(solicitud)) {
            temple.enviarHtml(solicitud);
            return true;
        }
        return false;
    }

    /**
     * Este metodo retorna una lista de los servicios.
     *
     * @return lista M2kRegistroPeticiones.
     */
    @Override
    public List<M2kRegistroPeticiones> buscarTransacciones() {
        List<M2kRegistroPeticiones> transacciones = informixDao.getServices();
        return transacciones;
    }
     
    
    @Override
     public List<SolicitudAmbiente> validarPerfil(String fecha) {
    Date now = new Date();
    Date fechaFront = this.formato.getMonthCalendar(fecha);
    this.solicitud = new ArrayList<>();
    List<AgendaDesarrolloWSM2K> agenda = this.agendaDao.getAgenda(fecha);
    for (AgendaDesarrolloWSM2K p : CleanCadenas.cleanList(agenda)) {
      this.nSol = new SolicitudAmbiente();
      this.nSol.setFolio(p.getIdFolio());
      this.nSol.setNomProyect(p.getNomProyecto());
      this.nSol.setFechaInicio((p.getDiasReservados().get(0)).getFechaInicio());
      this.nSol.setFechaFinal((p.getDiasReservados().get(0)).getFechaFinal());
      this.nSol.setTurno(p.getpTurno());
      if (p.getDiasReservados().size() > 0){
        int validador=0;
        for (int i = 0; i < p.getDiasReservados().size() - 1; i++) {
          int cont = i + 1;
          if (nSol.getFechaInicio().getMonth()!=p.getDiasReservados().get(cont).getFechaInicio().getMonth() && validador == 0) {
            SolicitudAmbiente aux = new SolicitudAmbiente();
            aux.setFechaInicio((p.getDiasReservados().get(cont)).getFechaInicio());
            aux.setFechaFinal((p.getDiasReservados().get(cont)).getFechaFinal());
            aux.setNomProyect(this.nSol.getNomProyect());
            aux.setFolio(this.nSol.getFolio());
            aux.setTurno(this.nSol.getTurno());
            validador++;
            if (this.formato.validarMesFront(fechaFront, (p.getDiasReservados().get(cont)).getFechaInicio()))
              this.solicitud.add(aux); 
          }/*else if(nSol.getFechaInicio().getMonth()!=p.getDiasReservados().get(cont).getFechaInicio().getMonth() && validador == 0){
            SolicitudAmbiente aux = new SolicitudAmbiente();
            aux.setFechaInicio((p.getDiasReservados().get(cont)).getFechaInicio());
            aux.setFechaFinal((p.getDiasReservados().get(cont)).getFechaFinal());
            aux.setNomProyect(this.nSol.getNomProyect());
            aux.setFolio(this.nSol.getFolio());
            aux.setTurno(this.nSol.getTurno());
            validador++;
            LOG.info("AÑADIENDO CAMBIO DE MES  ---->>>> ");
            if (this.formato.validarMesFront(fechaFront, (p.getDiasReservados().get(cont)).getFechaInicio()))
                this.solicitud.add(aux); 
          }*/
          
        }
      }
      if (this.formato.validarMesFront(fechaFront, (p.getDiasReservados().get(0)).getFechaInicio())){
        this.solicitud.add(this.nSol);
      }
    } 
    return this.solicitud;
  }

    /**
     * Este metodo busca la peticion por el folio.
     *
     * @param folio es el Id para buscar la petición.
     * @return lista SolicitudAmbiente.
     */
    @Override
    public List<SolicitudAmbiente> buscarAgendaFolio(int folio) {

        solicitud = new ArrayList<>();
        int c = 0;
        AgendaDesarrolloWSM2K agenda = agendaDao.getByFolio(folio);
        String nomUsuario=agenda.getIdusuariobatch().getNombre()+ " "+agenda.getIdusuariobatch().getAPaterno()+ " "+agenda.getIdusuariobatch().getaMaterno();
        List<String> ip = agendaDao.getPemisosDesa(folio, 1);
        PermisosIp[] pId = new PermisosIp[ip.size()];
        List<String> trans = agendaDao.getPemisosDesa(folio, 2);
        PermisosTrans[] pTra = new PermisosTrans[trans.size()];
        nSol = new SolicitudAmbiente();
        nSol.setFolio(agenda.getIdFolio());
        nSol.setComentarios(agenda.getComentarios());
        nSol.setDias(agenda.getDiasReservado());
        nSol.setFechaFinal(agenda.getDiasReservados().get(0).getFechaFinal());
        nSol.setFechaInicio(agenda.getDiasReservados().get(0).getFechaInicio());
        nSol.setNomProyect(agenda.getNomProyecto());
        nSol.setUser(agenda.getIdusuariobatch().getId());
        nSol.setUsuario(agenda.getUsuarioDesa());
        nSol.setUserMail(agenda.getIdusuariobatch().getCorreo());
        nSol.setTurno(agenda.getpTurno());
        nSol.setNomUser(nomUsuario);
        for (int i = 0; i < ip.size(); i++) {
            pId[c] = new PermisosIp(ip.get(i));
            c++;
        }
        c = 0;
        for (int i = 0; i < trans.size(); i++) {
            pTra[c] = new PermisosTrans(trans.get(i));
            c++;
        }
        nSol.setPermisosIp(pId);
        nSol.setPermisosTrans(pTra);
        solicitud.add(nSol);
        return solicitud;
    }
    
    /**
    * Este metodo busca los permisos para intregrar el peticiones.properties en BD.
    * @return lista AgendaDesarrolloWSM2K.
    */
    @Override
    public List<AgendaDesarrolloWSM2K> buscarAgendaPermisos(int turno) {
        return agendaDao.searchPermisos(turno);
    }
    
    /**
    * Este metodo valida si la peticion esta activa.
    * @param indicador entero para cambiar la bandera en BD
    * @return cuantas lineas de modificaron.
    */
    @Override
    public int validarEstatus(int indicador) {
        return agendaDao.updateEstatus(indicador);
    }
    
    /**
    * Este metodo valida que la peticion no este duplicada.
    * @param solicitudes un objeto la clase SolicitudAmbiente
    * @return treu/false.
    */
    @Override
    public synchronized  boolean validarSolicitud(SolicitudAmbiente solicitud) {
        return agendaDao.verificarPeticion(solicitud);
    }
    
    
     /**
    * Este metodo valida la disponibilidad en BD(solo se permiten 3 reservaciones).
    * @param date la fecha del origen de la solicitu
    * @return entero.
    */

    @Override
    public ConteoSolicitudes validarAmbiente(SolicitudAmbiente solicitud) {
        return agendaDao.getConteoAmbiente(solicitud);
    }
    
    
      @PostConstruct
    public void cargarLimitesSolicitudes() {
        short idR = 9952, idA = 9953, idH=9954;
         //diasInhabilesDao.getDiasInhaCal();
        this.limiteHabiles=diasInhabiles.buscarLimite(idH);
        LOG.info("SE CARGA EL LIMITE DE DÍAS HABILES "+this.limiteHabiles);
        this.limiteReservacion = diasInhabiles.buscarLimite(idR);
        LOG.info("SE CARGA EL LIMITE DE RESERVACION  " + this.limiteReservacion);
        this.limiteAmbiente = diasInhabiles.buscarLimite(idA);
        LOG.info("SE CARGA EL LIMITE DISPONIBLE DE AMBIENTES " + this.limiteAmbiente);
        diasInhabiles.buscarDiasInhabiles();
        LOG.info("SE CARGA DIAS INHABILES" );
    }

    @Override
    public  List<DiasInhabiles> buscarDiasInhabiles() {
       List<DiasInhabiles> diasInabiles=diasInhabiles.getDiasInhabilesDao();
        return diasInabiles;
    }

    public int getLimiteDiasHabiles(){
        return limiteHabiles;
    }
    
    public int getLmtReservacion() {
        return limiteReservacion;
    }

    public int getLimiteAmbiente() {
        return limiteAmbiente;
    }

    
    @Override
    public List<SolicitudAmbiente> buscarAgendaUsuario(Date starDate, int user) {
        List<SolicitudAmbiente> solicitudAu = new ArrayList<>();
        int perfil=agendaDao.getPerfil(user);
        List<AgendaDesarrolloWSM2K> sol=agendaDao.getAgendaUser(perfil, starDate ,user );
        for(AgendaDesarrolloWSM2K agenda:CleanCadenas.cleanList(sol)){
           nSol = new SolicitudAmbiente();
           nSol.setNomProyect(agenda.getNomProyecto());
           nSol.setFolio(agenda.getIdFolio());
           nSol.setTurno(agenda.getpTurno());
           nSol.setFechaFinal(agenda.getDiasReservados().get(0).getFechaFinal());
           nSol.setFechaInicio(agenda.getDiasReservados().get(0).getFechaInicio());
           solicitudAu.add(nSol);
        }       
        return solicitudAu;
    }

    @Override
    public boolean agregarIp(int folio, String ip) {
        return ediarAgenta.insertarIP(folio, ip);
    }
    
    @Override
    public boolean agregarIps(int folio, String[] ips){
        List<String> ipsDao=agendaDao.getPemisosDesa(folio, 0);
        List<String> nIps=CleanCadenas.eliminarRepetidos(ips, ipsDao);
        return ediarAgenta.insertaIps(folio, nIps);
    }
    
    @Override
    public boolean agregarTrans(int folio, String[] trans) {
        List<String> tranDao = agendaDao.getPemisosDesa(folio, 0);
        List<String> ntrsan = CleanCadenas.eliminarRepetidos(trans, tranDao);
        return ediarAgenta.insertarTrans(folio, ntrsan);
    }
    
    @Override
    public boolean eliminarSolicitud(int folio) {
        return ediarAgenta.deleteAgendaById(folio);
    }

   
    public int getWeek(Date fecha) {
        int week=0;
        Calendar cal= Calendar.getInstance();
        cal.setTime(fecha);
        week=cal.get(Calendar.WEEK_OF_YEAR);
        
        return week;
    }
    
    public int getDays(Date fi, Date ff){
        int days;
        if(fi.getMonth()==ff.getMonth()){
            days=ff.getDate()-fi.getDate();
        }else{
            Calendar cal=Calendar.getInstance();
            int lastDay=cal.getActualMaximum(Calendar.DATE);
            int r1=(lastDay-fi.getDate())-1;
            int r2=ff.getDate();
            days=r1+r2;
        }
        return days;
    }
    
    public List<String> getFestivos(){
        List<String> festivos=new ArrayList<>();
        festivos.add("01-01");
        festivos.add("05-01");
        festivos.add("09-16");
        festivos.add("11-01");
        festivos.add("11-02");
        festivos.add("11-16");
        festivos.add("12-26");
        return festivos;
    }
}

