package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import java.util.Date;
import java.util.Iterator;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ComportamientoM2KAsincrono;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoM2KAsincrono;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ReseteadorIndicadoresHora {

private static final Logger LOG = LoggerFactory.getLogger(ReseteadorIndicadoresHora.class);
	
	@Autowired
	private CatalogoRespuestasError catalogoRespuestasError;
	
	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	

	
	public void reiniciaIndicadoresPorHora(){
		
		UtilMonitoreo.setPeticionesUltimaHora(0);
		UtilMonitoreo.setMensajesGuardadosPorHora(0);
		Iterator<RespuestaError> iterator= catalogoRespuestasError.getCatalogoErrores().values().iterator();
		while(iterator.hasNext()){
			iterator.next().setErroresAcumuladosHora(0);
		}
		
		Iterator<RegistroTiempos> iteratorT = mapaRegistroTiemposRegion.getMapaTiempos().values().iterator();
		RegistroTiempos tiempos;
		while(iteratorT.hasNext() ){
			tiempos=iteratorT.next();
			tiempos.setNumPeticionesHora(0);
			tiempos.setT_menor_un_segundo_hora(0);
			tiempos.setT_1_a_5_segundos_hora(0);
			tiempos.setT_5_a_10_segundos_hora(0);
			tiempos.setT_10_a_20_segundos_hora(0);
			tiempos.setT_20_a_30_segundos_hora(0);
			tiempos.setT_30_a_40_segundos_hora(0);
			tiempos.setT_40_a_50_segundos_hora(0);
			tiempos.setT_50_a_60_segundos_hora(0);
			tiempos.setT_mayor_un_minuto_hora(0);
		}
		
		Iterator<RegistroComportamientoUsuario> iteratorR = registroComportamientoUsuarios.getRegistroComportamientoUsuarios().values().iterator();
		RegistroComportamientoUsuario registro;
		while(iteratorR.hasNext() ){
			registro=iteratorR.next();
			registro.setPeticionesHora(0);
		}
		registroComportamientoUsuarios.setPeticionesHora(0);
		mapaRegistroConsumoServicios.setPeticionesHora(0);
		Iterator<ConsumoServicio> iteratorServicios = mapaRegistroConsumoServicios.getRegistroConsumoServicios().values().iterator();
		ConsumoServicio consumoServicio;
		while( iteratorServicios.hasNext() ){
			consumoServicio=iteratorServicios.next();
			consumoServicio.setPeticionesHora(0);
		}
		
		LOG.info("Reiniciado contador de indicadores por hora");
	}
	
	
}
