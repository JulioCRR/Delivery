package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

//import mx.com.telcel.services.business.queue.GPIOSample;
//import mx.com.telcel.services.business.queue.ReportPublisher;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertasInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ReporteTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
//import mx.com.telcel.services.model.mobileReports.GenericParser;
//import mx.com.telcel.services.model.mobileReports.MQTTMessage;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

//import org.eclipse.paho.client.mqttv3.MqttException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class RefrescadorReportes {

	
	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired private SimpMessagingTemplate template; 
	

	
	@Autowired
	private UtilMonitoreo utilMonitoreo;
	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	/*
	@Autowired
	private GenericParser parser;
	*/
	@Autowired
	private RegistroAlertas registroAlertas;
	
	@Autowired
	private RegistroAlertasInstancias registroAlertasInstancias;
	
	@Autowired
	private CatalogoRespuestasError catalogoRespuestasError;
	/*
	@Autowired
	private GPIOSample publisher;
	
        
	@Autowired
	private ReportPublisher reportPublisher;
	*/
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	private static final Logger LOG = LoggerFactory.getLogger(RefrescadorReportes.class);
	
	public void refrescaReportes(){
		try {
			ReporteTiempos reporteTiempos=new ReporteTiempos();
			reporteTiempos.setRegistroTiempos( utilMonitoreo.registroTiemposToList(mapaRegistroTiemposRegion.getMapaTiempos().values().iterator()) );
			template.convertAndSend("/topic/reporteTiempos", reporteTiempos);
			//publicaMensajesMQTT();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/*
	public void publicaMensajesMQTT(){
		LinkedList<MQTTMessage> mensajes=new LinkedList<MQTTMessage>();
		LinkedList<MQTTMessage> alertas=new LinkedList<MQTTMessage>();
		LinkedList<RegistroComportamientoUsuario> usuariosSmall=utilMonitoreo.obtenUsuariosConMasInvocaciones(registroComportamientoUsuarios, 5);
		List<RegistroComportamientoUsuario> usuariosFull=utilMonitoreo.ordenaPorNumeroInvocaciones( utilMonitoreo.registroUsuariosToList(registroComportamientoUsuarios.getRegistroComportamientoUsuarios().values().iterator() ) );
		LinkedList<RespuestaError> incidencias=utilMonitoreo.obtenIncidenciasConMasOcurrencia(catalogoRespuestasError.getCatalogoErrores().values().iterator() , 5);
		LinkedList<ConsumoServicio> servicios=utilMonitoreo.obtenServiciosConMasInvocaciones(mapaRegistroConsumoServicios.getRegistroConsumoServicios().values().iterator() , 5);
		List<RespuestaError> listaIncidenciasFull=utilMonitoreo.ordenaPorRecurrencia( utilMonitoreo.registroIncidenciasToList( catalogoRespuestasError.getCatalogoErrores().values().iterator() ) );
		LinkedList<RespuestaError> incidenciasConOcurrencia=utilMonitoreo.obtenIncidenciasConOcurrencia(catalogoRespuestasError.getCatalogoErrores().values().iterator());
		List<RegistroTiempos> tiempos=utilMonitoreo.ordenaPorRegion(utilMonitoreo.registroTiemposToListSinTotal(mapaRegistroTiemposRegion.getMapaTiempos().values().iterator()));
		String infoM2KSmall=parser.parseToInfoM2kJsonSmall(utilMonitoreo.getPeticionesPorDia(),utilMonitoreo.getPeticionesUltimaHora());
		String infoM2KFull=parser.parseToInfoM2kFull();
		String infoUsuariosSmall=parser.parseUsuariosToJsonSmall( usuariosSmall,registroComportamientoUsuarios.getPeticionesMinuto() );
		String infoUsuariosFull=parser.parseUsuariosFull(usuariosFull);
		//String infoTiemposFull=parser.parseTiempoToJson(utilMonitoreo.registroTiemposToList(mapaRegistroTiemposRegion.getMapaTiempos().values().iterator()));
		//String infoTiemposSmall=parser.parseTiempoToJsonSmall(utilMonitoreo.registroTiemposToList(mapaRegistroTiemposRegion.getMapaTiempos().values().iterator()));
		String infoIncidenciasSmall=parser.parseIncidenciaToJsonSmall(incidencias,catalogoRespuestasError.getIncidenciasDelDia() );
		String infoIncidenciasPie=parser.parseIncidenciaToJsonSmall(incidenciasConOcurrencia,catalogoRespuestasError.getIncidenciasDelDia());
		String infoIncidenciasFull=parser.parseIncidenciaFull(listaIncidenciasFull);
		String infoTiemposFull=parser.parseTiempoToJson(tiempos);
		String infoTiemposSmall=parser.parseTiempoToJsonSmall(tiempos);
		String infoTiempoPeticiones=infoTiemposSmall;
		String infoServiciosSmall=parser.parseServiciosSmall(servicios,mapaRegistroConsumoServicios.getPeticionesMinuto());
		mensajes.add( new MQTTMessage("/async/infom2k/small",infoM2KSmall) );
		mensajes.add( new MQTTMessage("/async/usuario/small",infoUsuariosSmall) );
		mensajes.add( new MQTTMessage("/async/usuario/full",infoUsuariosFull) );
		mensajes.add( new MQTTMessage("/async/tiempo/small",infoTiemposSmall) );
		mensajes.add( new MQTTMessage("/async/incidencias/small",infoIncidenciasSmall) );
		mensajes.add( new MQTTMessage("/async/incidencias/full",infoIncidenciasFull) );
		mensajes.add( new MQTTMessage("/async/incidencias/pie",infoIncidenciasPie) );
		mensajes.add( new MQTTMessage("/async/tiempo/full",infoTiemposFull) );
		mensajes.add( new MQTTMessage("/async/tiempo/peticiones",infoTiempoPeticiones) );
		mensajes.add( new MQTTMessage("/async/infom2k/full",infoM2KFull) );
		mensajes.add( new MQTTMessage("/async/servicio/small",infoServiciosSmall) );
		if(registroAlertas.getAlertas().size()>0){
			String infoAlertas=parser.parseAlertaToJson(procesaRespuestasError(),System.currentTimeMillis());
			//alertas.add( new MQTTMessage("/alertTest",infoAlertas) );
			alertas.add( new MQTTMessage("/alert",infoAlertas) );
		}
		if(registroAlertasInstancias.getAlertas().size()>0){
			String infoAlertas=parser.parseAlertaInstancia(procesaAlertaInstancia(),System.currentTimeMillis());
			//alertas.add( new MQTTMessage("/alertTest",infoAlertas) );
			alertas.add( new MQTTMessage("/alert-instancia",infoAlertas) );
		}
		//generaInfoTiemposEspecificos(mensajes);
		//generaInfoTiemposEspecificosString(mensajes);
		//GPIOSample publisher=new GPIOSample(); 
		generaDetalleDeUsuario(usuariosSmall,mensajes);
		int size=calculaSizeMensajes(mensajes,alertas);
		try {
			//LOG.error("iniciando envio a topico. Bytes a publicar: "+size);
			//publisher.publish(mensajes,true,0);
			reportPublisher.publish(mensajes,true, 0);
			if(alertas.size()>0){
				//publisher.publish(alertas,false,2);
				reportPublisher.publish(alertas,false,2);
			}
			//LOG.error("fin de envio a topico");
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MqttException e) {
			e.printStackTrace();
		}
	}
	*/
	
	
	public RespuestaError procesaRespuestasError(){
		RespuestaError error;
		error=registroAlertas.getAlertas().getLast();
		registroAlertas.getAlertas().removeLast();
		return error;
	}
	
	public InstanciaWSM2K procesaAlertaInstancia(){
		InstanciaWSM2K alertaInstancia;
		alertaInstancia=registroAlertasInstancias.getAlertas().getLast();
		registroAlertasInstancias.getAlertas().removeLast();
		return alertaInstancia;
	}
	/*
	public int calculaSizeMensajes(LinkedList<MQTTMessage> mensajes,LinkedList<MQTTMessage> alertas){
		Iterator<MQTTMessage> iterator1=mensajes.iterator();
		Iterator<MQTTMessage> iterator2=mensajes.iterator();
		int size=0;
		while(iterator1.hasNext() ){
			size+=iterator1.next().getMessage().length();
		}
		while(iterator2.hasNext() ){
			size+=iterator2.next().getMessage().length();
		}
		return size;
	}
	
	
	public void generaInfoTiemposEspecificosString(LinkedList<MQTTMessage> mensajes){
		//Iterator<RegistroTiempos> iterator= mapaRegistroTiemposRegion.getMapaTiempos().values().iterator();
		
		List<RegistroTiempos> tiempos=utilMonitoreo.ordenaPorRegion(utilMonitoreo.registroTiemposToListSinTotal(mapaRegistroTiemposRegion.getMapaTiempos().values().iterator()));
		Iterator<RegistroTiempos> iterator=tiempos.iterator();
		StringBuilder tiemposMenor1=new StringBuilder();
		StringBuilder tiemposEntre1y5=new StringBuilder();
		StringBuilder tiemposEntre5y10=new StringBuilder();
		StringBuilder tiemposEntre10y20=new StringBuilder();
		StringBuilder tiemposEntre20y30=new StringBuilder();
		StringBuilder tiemposEntre30y40=new StringBuilder();
		StringBuilder tiemposEntre40y50=new StringBuilder();
		StringBuilder tiemposEntre50y60=new StringBuilder();
		StringBuilder tiemposMayor1=new StringBuilder();
		Tiempo tiempo;
		GenericParser parser=new GenericParser();
		while(iterator.hasNext() ){
			RegistroTiempos registro=iterator.next();
			if( ! registro.getRegion().equals("TOTAL") ){
			
			
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setMenor1( registro.getT_menor_un_segundo_5min()+"" );
				//tiemposMenor1.add(tiempo);
				tiemposMenor1.append( registro.getRegion() );tiemposMenor1.append( "," );
				tiemposMenor1.append( registro.getT_menor_un_segundo_5min() );tiemposMenor1.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre1y5( registro.getT_1_a_5_segundos_5min() +"" );
				//tiemposEntre1y5.add(tiempo);
				tiemposEntre1y5.append( registro.getRegion() );tiemposEntre1y5.append( "," );
				tiemposEntre1y5.append( registro.getT_1_a_5_segundos_5min() );tiemposEntre1y5.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre5y10( registro.getT_5_a_10_segundos_5min() +"" );
				//tiemposEntre5y10.add(tiempo);
				tiemposEntre5y10.append( registro.getRegion() );tiemposEntre5y10.append( "," );
				tiemposEntre5y10.append( registro.getT_5_a_10_segundos_5min() );tiemposEntre5y10.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre10y20( registro.getT_10_a_20_segundos_5min() +"" );
				//tiemposEntre10y20.add(tiempo);
				tiemposEntre10y20.append( registro.getRegion() );tiemposEntre10y20.append( "," );
				tiemposEntre10y20.append( registro.getT_10_a_20_segundos_5min() );tiemposEntre10y20.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre20y30( registro.getT_20_a_30_segundos_5min() +"" );
				//tiemposEntre20y30.add(tiempo);
				tiemposEntre20y30.append( registro.getRegion() );tiemposEntre20y30.append( "," );
				tiemposEntre20y30.append( registro.getT_20_a_30_segundos_5min() );tiemposEntre20y30.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre30y40( registro.getT_30_a_40_segundos_5min() +"" );
				//tiemposEntre30y40.add(tiempo);
				tiemposEntre30y40.append( registro.getRegion() );tiemposEntre30y40.append( "," );
				tiemposEntre30y40.append( registro.getT_30_a_40_segundos_5min() );tiemposEntre30y40.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre40y50( registro.getT_40_a_50_segundos_5min() +"" );
				//tiemposEntre40y50.add(tiempo);
				tiemposEntre40y50.append( registro.getRegion() );tiemposEntre40y50.append( "," );
				tiemposEntre40y50.append( registro.getT_40_a_50_segundos_5min() );tiemposEntre40y50.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setEntre50y60( registro.getT_50_a_60_segundos_5min() +"" );
				//tiemposEntre50y60.add(tiempo);
				tiemposEntre50y60.append( registro.getRegion() );tiemposEntre50y60.append( "," );
				tiemposEntre50y60.append( registro.getT_50_a_60_segundos_5min() );tiemposEntre50y60.append("|" );
				tiempo=new Tiempo( registro.getRegion() );
				tiempo.setMayor1( registro.getT_mayor_un_minuto_5min() +"" );
				//tiemposMayor1.add(tiempo);
				tiemposMayor1.append( registro.getRegion() );tiemposMayor1.append( "," );
				tiemposMayor1.append( registro.getT_mayor_un_minuto_5min() );tiemposMayor1.append("|" );
			}
		}
		mensajes.add( new MQTTMessage("/async/tiempo/menor1", GenericParser.remueveUltimoCarater(tiemposMenor1.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/1-5", GenericParser.remueveUltimoCarater(tiemposEntre1y5.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/5-10", GenericParser.remueveUltimoCarater(tiemposEntre5y10.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/10-20", GenericParser.remueveUltimoCarater(tiemposEntre10y20.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/20-30", GenericParser.remueveUltimoCarater(tiemposEntre20y30.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/30-40", GenericParser.remueveUltimoCarater(tiemposEntre30y40.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/40-50", GenericParser.remueveUltimoCarater(tiemposEntre40y50.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/50-60", GenericParser.remueveUltimoCarater(tiemposEntre50y60.toString() ) ) );
		mensajes.add( new MQTTMessage("/async/tiempo/mayor1", GenericParser.remueveUltimoCarater(tiemposMayor1.toString() ) ) );
	}
	*/
	/*
	public void generaDetalleDeUsuario(LinkedList<RegistroComportamientoUsuario> usuariosSmall,LinkedList<MQTTMessage> mensajes){
		Iterator<RegistroComportamientoUsuario> iterator=usuariosSmall.iterator();
		LinkedList<ConsumoServicio> servicios;
		RegistroComportamientoUsuario registroComportamientoUsuario;
		String infoServiciosSmall;
		while(iterator.hasNext() ){
			registroComportamientoUsuario=iterator.next();
			servicios=utilMonitoreo.obtenServiciosConMasInvocaciones(registroComportamientoUsuario.getRegistroConsumoServicios().values().iterator() , 5);
			infoServiciosSmall=parser.parseServiciosSmall(servicios,registroComportamientoUsuario.getPeticionesMinuto());
			mensajes.add( new MQTTMessage("/async/usuario-servicio/"+registroComportamientoUsuario.getId(), infoServiciosSmall) );
		}
	}
	*/
}
