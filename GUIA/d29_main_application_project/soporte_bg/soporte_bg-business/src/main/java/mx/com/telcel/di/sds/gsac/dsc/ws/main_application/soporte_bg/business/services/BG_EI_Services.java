/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.services;


import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.DetalleSolicitud;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.HistoricoMovimiento;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.ResponseSoporte;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.SolicitudEI;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation.AdministradorReproceso;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation.BGUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation.ReporteadorSolicitud;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation.UtilParser;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.dao.EquipoIlimitadoDAO;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.HistoricoMovimientosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudEIEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudProductoEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author VI9XXG0
 */
@RestController
@EnableAutoConfiguration
@Configuration
public class BG_EI_Services {
        
    
    @Autowired
    private EquipoIlimitadoDAO dao;   
    
    @Autowired
    private ReporteadorSolicitud reporteador; 
    
    @Autowired
    private AdministradorReproceso administradorReproceso;
    
    private static final Logger LOG = LoggerFactory.getLogger(BG_EI_Services.class);
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/consultaPorTelefono",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity consultaPorTelefono(HttpSession session, @RequestParam(value = "telefono")String telefono){
           
        List<SolicitudEI> solicitudesE= reporteador.consultaSolicitudesPorTelefono(telefono);
        
        return new ResponseEntity<>(solicitudesE, HttpStatus.OK);        
        
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/solicitudProducto",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity consultaSolicitudProducto(HttpSession session, @RequestParam(value = "idSolicitud")Integer idSolicitud){
           
        List<SolicitudProductoEntity> solicitudesE= dao.consultaSolicitudProducto(idSolicitud);
        return new ResponseEntity<>(solicitudesE, HttpStatus.OK);        
        
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/consultaDetalle",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity consultaDetalleSolicitud(HttpSession session, @RequestParam(value = "idSolicitud")Integer idSolicitud,@RequestParam(value = "telefono")String telefono,@RequestParam(value = "estatus")String estatus){
           
        List<DetalleSolicitud> detalles= reporteador.consultaDetallesSolicitud(idSolicitud, telefono,estatus);
        return new ResponseEntity<>(detalles, HttpStatus.OK);        
        
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/consultaMovimientos",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity consultaMovimientos(HttpSession session, @RequestParam(value = "idSolicitud")Integer idSolicitud,@RequestParam(value = "telefono")String telefono){
           
        List<HistoricoMovimientosEntity> movimientosEntity= dao.consultaHistoricoMovimientos(idSolicitud, telefono);
        UtilParser parser=new UtilParser();
        List<HistoricoMovimiento> movimientos=parser.parseHistoricoMovimiento(movimientosEntity);
        
        return new ResponseEntity<>(movimientos, HttpStatus.OK);        
        
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/activaTimerBG",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity activaTimerBG(HttpSession session){
        ResponseSoporte responseTimer=new ResponseSoporte();
        List<ResponseSoporte> lista=new ArrayList();
        BGUtil util=new BGUtil();
        String respuesta=null;
        try{
            respuesta=util.sendGet();
            responseTimer.setRespuesta(respuesta);
            LOG.info("respuesta devuelta : "+responseTimer.getRespuesta() );
            if(util.validaRespuesta(responseTimer.getRespuesta())){
                responseTimer.setMensaje( "Exito al invocar timer" );
            }else{
                responseTimer.setMensaje( "Error al invocar el timer" );
            }
            
        }catch(Exception e){
            responseTimer.setMensaje( "Error al invocar el timer: "+e.getMessage() );
            
        }
        lista.add(responseTimer);
        return new ResponseEntity<>(lista, HttpStatus.OK);        
        
    }
    
     @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "soporte-bg/actualizaEstatusSolicitud",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity actualizaEstatusSolicitud(HttpSession session, @RequestParam(value = "idSolicitud")Integer idSolicitud,@RequestParam(value = "telefono")String telefono){
        List<ResponseSoporte> lista=new ArrayList();
        ResponseSoporte response=new ResponseSoporte();   
        LOG.info("actualizando la solicitud,telefono: "+idSolicitud+","+telefono);
        String mensaje=administradorReproceso.actualizaSolicitudParaReproceso(idSolicitud, telefono);
        response.setMensaje(mensaje);
        lista.add(response);
        
        return new ResponseEntity<>(lista, HttpStatus.OK);        
        
    }
    
}
