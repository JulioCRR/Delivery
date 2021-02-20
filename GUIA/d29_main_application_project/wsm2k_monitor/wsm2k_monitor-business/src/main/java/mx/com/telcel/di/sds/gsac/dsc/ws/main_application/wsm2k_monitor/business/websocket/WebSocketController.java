package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.websocket;

import ch.qos.logback.classic.util.ContextInitializer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.CargadorCatalogoErrores;
/*import mx.com.telcel.services.business.jobs.ValidadorInstancias;
import mx.com.telcel.services.business.queue.ListenerAnalytic;
import mx.com.telcel.services.business.queue.ListenerLogger;
import mx.com.telcel.services.business.queue.SimpleMessageListener;*/
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ListaInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.PropiedadMonitoreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteEstadoMonitoreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteIncidencias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class WebSocketController {

	@Autowired
	private CargadorCatalogoErrores cargadorCatalogoErrores;
	
	@Autowired
	private CatalogoRespuestasError catalogoRespuestasError;
	
	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	/*
	@Autowired
	private SimpleMessageListener messageListener;
	
	@Autowired
	private ListenerAnalytic listenerAnalytic;
	
	@Autowired
	private ListenerLogger listenerLogger;
	*/
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	private static final Logger LOG = LoggerFactory.getLogger(WebSocketController.class);
	
	@Autowired
	private UtilMonitoreo utilMonitoreo;
	
	@Autowired
	private ListaInstancias listaInstancias;
	/*
	@Autowired
	private ValidadorInstancias validadorInstancias;
	*/
	@MessageMapping("/incidencias")
    @SendTo("/topic/reporteIncidencias")
    public ReporteIncidencias reporteIncidencias(Message message) throws Exception {
		//System.out.println("mensaje de prueba: "+message.toString()  );
                ReporteIncidencias reporteIncidencias=new ReporteIncidencias("reporteIncidencias");
		Iterator<RespuestaError> iterator= catalogoRespuestasError.getCatalogoErrores().values().iterator();
		List<RespuestaError> errores=new ArrayList<RespuestaError>();
		while(iterator.hasNext()){
			errores.add(iterator.next());
		}
                
		errores=utilMonitoreo.ordenaPorRecurrencia(errores);
                //System.out.println("size de errores: "+errores.size());
		reporteIncidencias.setErrores(errores);
		return reporteIncidencias;
	}
	
	
	@MessageMapping("/monitoreoInstancias")
    @SendTo("/topic/monitoreoInstancias")
    public ReporteInstancias monitoreoInstancias(Message message) throws Exception {
		ReporteInstancias reporteInstancias=new ReporteInstancias();
		//System.out.println(message.getMessage() );
                reporteInstancias.setListaInstancias(listaInstancias.getInstanciasWSM2K() );
		//System.out.println("************ validaron "+reporteInstancias.getListaInstancias().size()+" **********" );
		return reporteInstancias;
	}
	
	
	@MessageMapping("/tiempos")
    @SendTo("/topic/reporteTiempos")
    public ReporteTiempos reporteTiempos(Message message) throws Exception {
		ReporteTiempos reporteTiempos=new ReporteTiempos();
		Iterator<RegistroTiempos> iterator = mapaRegistroTiemposRegion.getMapaTiempos().values().iterator();
		LinkedList<RegistroTiempos> registrostiempos=new LinkedList<RegistroTiempos>();
		while(iterator.hasNext() ){
			registrostiempos.add( iterator.next() );
		}
		RegistroTiempos total=new RegistroTiempos("Total");
		reporteTiempos.setRegistroTiempos(registrostiempos);
		return reporteTiempos;
	}
	
	
	@MessageMapping("/comportamientoUsuarios")
    @SendTo("/topic/comportamientoUsuarios")
    public ReporteUsuarios reporteComportamientoUsuarios(Message message) throws Exception {
                //System.out.println("el mensaje: "+message.getMessage());
		ReporteUsuarios reporteUsuarios=new ReporteUsuarios();
		Iterator<RegistroComportamientoUsuario> iterator = registroComportamientoUsuarios.getRegistroComportamientoUsuarios().values().iterator();
		LinkedList<RegistroComportamientoUsuario> registroUsuarios=new LinkedList<RegistroComportamientoUsuario>();
		while(iterator.hasNext() ){
			registroUsuarios.add( iterator.next() );
		}
		RegistroComportamientoUsuario total=new RegistroComportamientoUsuario("TOTAL");
		total.setPeticionesMinuto( registroComportamientoUsuarios.getPeticionesMinuto()  );
		total.setPeticionesHora( registroComportamientoUsuarios.getPeticionesHora() );
		total.setPeticionesDia( registroComportamientoUsuarios.getPeticionesDia() );
		registroUsuarios.add(total);
		reporteUsuarios.setComportamientoUsuarios(registroUsuarios);
		return reporteUsuarios;
	}
	
	@MessageMapping("/consumoServicios")
    @SendTo("/topic/consumoServicios")
    public ReporteServicios reporteComportamientoServicios(Message message) throws Exception {
		ReporteServicios reporteServicios=new ReporteServicios();
		Iterator<ConsumoServicio> iterator = mapaRegistroConsumoServicios.getRegistroConsumoServicios().values().iterator();
		LinkedList<ConsumoServicio> registroServicios=new LinkedList<ConsumoServicio>();
		while(iterator.hasNext() ){
			registroServicios.add( iterator.next() );
		}
		ConsumoServicio total=new ConsumoServicio("TOTAL");
		total.setPeticionesMinuto( mapaRegistroConsumoServicios.getPeticionesMinuto()  );
		total.setPeticionesHora( mapaRegistroConsumoServicios.getPeticionesHora() );
		total.setPeticionesDia( mapaRegistroConsumoServicios.getPeticionesDia() );
		registroServicios.add(total);
		reporteServicios.setConsumoServicios(registroServicios);
		return reporteServicios;
	}
	
	@MessageMapping("/estadoMonitoreo")
    @SendTo("/topic/estadoMonitoreo")
    public ReporteEstadoMonitoreo reporteEstadoMonitoreo(Message message) throws Exception {
		ReporteEstadoMonitoreo reporteMonitoreo=new ReporteEstadoMonitoreo();
		
		LinkedList<PropiedadMonitoreo> propiedadesMonitoreo=UtilMonitoreo.propertiesToList();

		//propiedadesMonitoreo.add( new PropiedadMonitoreo("Consumidores activos SERV_WEB_M2K_CARGALOGS_R0X" , messageListener.getListenerContainer().getActiveConsumerCount()+"" ) ) ;
		//propiedadesMonitoreo.add( new PropiedadMonitoreo("Maximos consumidores concurrentes SERV_WEB_M2K_CARGALOGS_R0X" ,messageListener.getListenerContainer().getMaxConcurrentConsumers()+"" ) );
		
                /*
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Consumidores activos QL.D29.WS.M2K.LOG.BD.IN" , listenerLogger.getListenerContainerLogger() .getActiveConsumerCount()+"" ) ) ;
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Maximos consumidores concurrentes QL.D29.WS.M2K.LOG.BD.IN" ,listenerLogger.getListenerContainerLogger().getMaxConcurrentConsumers()+"" ) );
		
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Consumidores activos QL.D29.WS.M2K.LOG.MONITOR.IN" , listenerAnalytic.getListenerContainerAnalytic().getActiveConsumerCount()+"" ) ) ;
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Maximos consumidores concurrentes QL.D29.WS.M2K.LOG.MONITOR.IN" ,listenerAnalytic.getListenerContainerAnalytic().getMaxConcurrentConsumers()+"" ) );
		
		propiedadesMonitoreo.add( new PropiedadMonitoreo("timeOut validacion instancias" ,validadorInstancias.getTimeOutInstancias() +"" ) );
		*/
		reporteMonitoreo.setPropiedadesMonitoreo(propiedadesMonitoreo);
		return reporteMonitoreo;
	}
    
    /**
     * WebSocket para la pantalla Omega
     * @param message
     * @return CicsCtgThread
     */
    @SuppressWarnings("static-access")
    @MessageMapping("/pantallaOmega")
    @SendTo("/topic/pantallaOmega")
    public Object pantallaOmega(Message message) {
        return utilMonitoreo.getPantallaOmega();
    }
}
