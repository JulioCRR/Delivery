package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.rest;

import java.util.Date;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.AgendaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.ConteoSolicitudes;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.CleanCadenas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.FormaterDateAgenda;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.ValidadorTiempo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.DiasInhabiles;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kRegistroPeticiones;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class AgendaRestService {

    private static final Logger LOG = LoggerFactory.getLogger(AgendaRestService.class);
    
	
	@Autowired
    private AgendaServicesImp agendaImp;
	
    @Autowired
    private AgendaServicesImp agenda;
    
    @Autowired
    private AgendaDao agendaDao;
    
    
   // @Autowired
    //private ValidadorTiempo mod;
    
    @Autowired
    private FormaterDateAgenda formater;
    
  
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "sendSolicitud", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registrarSolicitud(@RequestBody SolicitudAmbiente solicitud) {

        LOG.info("SE ENVIA SOLICITUD PARA AMBIENTE DE DESARROLLO");    
        if (solicitud != null) {
            if (agenda.enviarSolicitud(solicitud)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "search-trans", method = RequestMethod.GET)
    public ResponseEntity buscarServicio() {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>> BUSCANDO TRANSACCIONES MODULO AGENDA");

        List<M2kRegistroPeticiones> transacciones = agenda.buscarTransacciones();

        if (transacciones != null && transacciones.size() > 0) {
            return new ResponseEntity<>(transacciones, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "obtener-agenda/{fecha}", method = RequestMethod.GET)
    public ResponseEntity buscarAgenda(@PathVariable String fecha) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO  AGENDA DEL MES: " + fecha);
     
        List<SolicitudAmbiente> solicitudes = agenda.validarPerfil(fecha);
        if (solicitudes != null && solicitudes.size() > 0) {
            return new ResponseEntity<>(solicitudes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "obtener-agendafolio/{folio}", method = RequestMethod.GET)
    public ResponseEntity buscarAgendaFolio(@PathVariable Integer folio) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO LA AGENDA CON EL FOLIO: " + folio);
        List<SolicitudAmbiente> solicitudes = agenda.buscarAgendaFolio(folio);
        if (solicitudes != null && solicitudes.size() > 0) {
            return new ResponseEntity<>(solicitudes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "validaSolicitud", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscarAgendaDuplicada(@RequestBody SolicitudAmbiente solicitud) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>SE VALIDA DUPLICIDAD DE PERMISOS");
        
        boolean peticion =agenda.validarSolicitud(solicitud);      
        if (peticion) {
           return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.CONFLICT);   
    }
    
    
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "validarAmbiente", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity validarAmbiente(@RequestBody SolicitudAmbiente solicitud) {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>VALIDANDO DISPONIBILIDAD DE AMBIENTE  " );
        ConteoSolicitudes con=agenda.validarAmbiente(solicitud);  
        if(con!=null){
           return new ResponseEntity<>(con, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);           
    }
    
    
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "validarDias", method = RequestMethod.GET)
    public ResponseEntity buscarDiasInhabiles() {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>> BUSCANDO DIAS INHABLIES");

        List<DiasInhabiles> diasInhabiles = agenda.buscarDiasInhabiles();
        LOG.info(">>>>>>>>>>>>>>>>>>>>>> DIAS INHABILES"+diasInhabiles.size());
        if (diasInhabiles != null && diasInhabiles.size() > 0) {
            return new ResponseEntity<>(diasInhabiles, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    } 
    
    
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "limiteReservacion", method = RequestMethod.GET)
    public ResponseEntity buscarLimiteReservacion() {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>> BUSCANDO LIMITE DE DIAS PARA RESERVAR AMBIENTE");

       int limiteReservacion = agenda.getLmtReservacion();

        if (limiteReservacion>0) {
            return new ResponseEntity<>(limiteReservacion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    } 
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "limiteAmbiente", method = RequestMethod.GET)
    public ResponseEntity buscarLimiteAmbiente() {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>> BUSCANDO LIMITE DE AMBIENTES");

       int limiteAmbiente = agenda.getLimiteAmbiente();

        if (limiteAmbiente>0) {
            return new ResponseEntity<>(limiteAmbiente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    } 
    
     @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "buscarAgendaUsuario", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity buscarAgendaUsuario(@RequestParam(value = "starDate") Date starDate, @RequestParam(value = "user") int idUser) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>SE BUSCA AGENDA DEL USUARIO:  "+idUser +starDate);
        
        List<SolicitudAmbiente> sol =agendaImp.buscarAgendaUsuario(starDate,idUser );      
        if (sol!=null && sol.size()>0) {
             return new ResponseEntity<>(sol,HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);   
    }
    
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "agregarIp", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity agregarIp(@RequestParam(value = "folio") int folio, @RequestParam(value = "ip") String ip) {
       
       LOG.info(">>>>>>>>>>>>>>>>>>>>>>SE AGREGA LA IP :  " +ip+ " FOLIO "+folio); 
       AgendaDesarrolloWSM2K  agenda=agendaDao.getByFolio(folio);
       if(agenda!=null ){
         if(CleanCadenas.validarIp(agenda, ip)){
              return new ResponseEntity<>(4, HttpStatus.OK);
         }
       /* short status = (short) mod.validarHoraSolicitud(agenda.getpTurno());
        if(status==1){
            return new ResponseEntity<>(status, HttpStatus.OK);
        }*/
        boolean peticion = agendaImp.agregarIp(folio, ip);
        if (peticion) {
            return new ResponseEntity<>("", HttpStatus.OK);

        }
       }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "agregarIps", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity agregarIps(@RequestParam(value = "folio") int folio, @RequestParam(value = "ips") String[] ips) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>AGREGA TRANSACIONES  :  " +ips.length + " FOLIO "+folio);
             AgendaDesarrolloWSM2K  agenda=agendaDao.getByFolio(folio);
             
             boolean peticion = agendaImp.agregarIps(folio, ips);
             if (peticion) {
                 return new ResponseEntity<>("",HttpStatus.OK);
             }
      
        return new ResponseEntity<>(HttpStatus.CONFLICT);   
    }
    
     @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "agregarTrans", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity agregarTrans(@RequestParam(value = "folio") int folio, @RequestParam(value = "trans") String[] trans) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>AGREGA TRANSACIONES  :  " +trans.length + " FOLIO "+folio);
             AgendaDesarrolloWSM2K  agenda=agendaDao.getByFolio(folio);
             
            
            /*  short status = (short) mod.validarHoraSolicitud(agenda.getpTurno());
             if(status==1){
                  return new ResponseEntity<>(status, HttpStatus.OK);
            }*/
             boolean peticion = agendaImp.agregarTrans(folio, trans);
             if (peticion) {
                 return new ResponseEntity<>("",HttpStatus.OK);
             }
      
        return new ResponseEntity<>(HttpStatus.CONFLICT);   
    }
    
    
        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "obtenerIp", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getIpByFolio(@RequestParam(value="folio") int folio){
        LOG.info(">>>>>>>>> SE OBTIENEN LAS IP AGREGADAS AL FOLIO "+folio);
        List<String> ips=agendaDao.getPemisosDesa(folio,1);
        for(int i =0;i<ips.size();i++){
            LOG.info("--------------------------- IP "+ips.get(i));
        }
        if(ips!=null && ips.size()>0){
            LOG.info("--------------------------- RETURNING DATA ");
            return new ResponseEntity<>(ips,HttpStatus.OK);
        }else{
            LOG.info("--------------------------- RETURNING NO CONTENT ");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
    }
    
   @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "obtenerTrans", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity getTransactionByFolio(@RequestParam(value="folio")int folio){
       LOG.info(">>>>>>>>>>>>> SE OBTIENEN LAS TRANSACCIONES ASIGNADAS AL FOLIO "+folio);
       List<String> trans=agendaDao.getPemisosDesa(folio, 2);
       for(int i=0;i<trans.size();i++){
           LOG.info(">>>>>>>>>>>>>> Transaction "+trans.get(i));
       }
       if(trans!=null && trans.size()>0){
           LOG.info("--------------------------- RETURNING TRANSACTIONS ");
           return new ResponseEntity<>(trans,HttpStatus.OK);
       }else{
           LOG.info("--------------------------- RETURNING NO CONTENT ");
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
   }
    
   
   @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "obtenerTurno", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity getTurnByFolio(@RequestParam(value="folio")int folio){
       LOG.info(">>>>>>>>>>>>> SE OBTIENEN LAS TRANSACCIONES ASIGNADAS AL FOLIO "+folio);
       AgendaDesarrolloWSM2K agenda=new AgendaDesarrolloWSM2K();
       agenda=agendaDao.getByFolio(folio);
       if(agenda!=null){
           return new ResponseEntity<>(agenda,HttpStatus.OK);
       }else{
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
   }
    
     @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "eliminarSolicitud", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity eliminarSolicitu(@RequestParam(value = "folio") int folio) {

        LOG.info(">>>>>>>>>>>>>>>>>>>>>>ELIMINAR LA SOLICITUD   :  " +folio );
        
       boolean peticion=agendaImp.eliminarSolicitud(folio);
        if (peticion) {
             return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);   
    }
    
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + Constants.BASE_NAME_PATH + "limiteHabiles", method = RequestMethod.GET)
    public ResponseEntity getLimitDays(){
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>>>> BUSCANDO LIMITE DE DÍAS HABILES");
        int limiteHabiles=agenda.getLimiteDiasHabiles();
        LOG.info("<<<<<<<<<<<<<<<<< LIMITE HABILES --->> ",limiteHabiles);
        if (limiteHabiles > 0 ){
            return new ResponseEntity<>(limiteHabiles,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);  
        }
    }
}
