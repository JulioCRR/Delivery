
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository;


import java.util.Date;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.ConteoSolicitudes;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.DiasInhabiles;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;


public interface AgendaRepository  {
    
    boolean enviarSolicitud(SolicitudAmbiente solicitud );
    
    List<M2kRegistroPeticiones> buscarTransacciones();
    
    List <SolicitudAmbiente> validarPerfil(String fecha);
    
    List <SolicitudAmbiente> buscarAgendaFolio(int folio);
    
    List<AgendaDesarrolloWSM2K>buscarAgendaPermisos(int turno);
    
    int validarEstatus(int indicador);
    
    boolean validarSolicitud(SolicitudAmbiente solicitud) ;
    
    ConteoSolicitudes validarAmbiente(SolicitudAmbiente solicitud);
    
    List<DiasInhabiles> buscarDiasInhabiles() ;
    
    List<SolicitudAmbiente>  buscarAgendaUsuario(Date starDate, int user);
    
    boolean agregarIp(int  folio, String ip);
    
    boolean agregarIps(int folio,String[] ips);
    
    boolean agregarTrans(int folio, String[] trans); 
    
     boolean eliminarSolicitud(int folio);
    
   
}
