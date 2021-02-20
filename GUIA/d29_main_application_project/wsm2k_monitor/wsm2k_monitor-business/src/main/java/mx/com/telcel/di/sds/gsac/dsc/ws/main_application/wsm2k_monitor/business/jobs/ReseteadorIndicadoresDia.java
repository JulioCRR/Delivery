package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;


import java.util.Iterator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ListaInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

public class ReseteadorIndicadoresDia {

	private static final Logger LOG = LoggerFactory.getLogger(ReseteadorIndicadoresDia.class);
	
	@Autowired
	private CatalogoRespuestasError catalogoRespuestasError;
	
	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	@Autowired
	private ListaInstancias listaInstancias;
	
	public void reiniciaIndicadoresPorDia(){
		UtilMonitoreo.setPeticionesPorDia(0);
		UtilMonitoreo.setMensajesGuardadosPorDia(0);
		Iterator<RespuestaError> iterator= catalogoRespuestasError.getCatalogoErrores().values().iterator();
		while(iterator.hasNext()){
			iterator.next().setErroresAcumuladosDia(0);
		}
		catalogoRespuestasError.setIncidenciasDelDia(0);
		Iterator<RegistroTiempos> iteratorT = mapaRegistroTiemposRegion.getMapaTiempos().values().iterator();
		RegistroTiempos tiempos;
		while(iteratorT.hasNext() ){
			tiempos=iteratorT.next();
			tiempos.setNumPeticionesDia(0);
			tiempos.setT_menor_un_segundo_dia(0);
			tiempos.setT_1_a_5_segundos_dia(0);
			tiempos.setT_5_a_10_segundos_dia(0);
			tiempos.setT_10_a_20_segundos_dia(0);
			tiempos.setT_20_a_30_segundos_dia(0);
			tiempos.setT_30_a_40_segundos_dia(0);
			tiempos.setT_40_a_50_segundos_dia(0);
			tiempos.setT_50_a_60_segundos_dia(0);
			tiempos.setT_mayor_un_minuto_dia(0);
		}
		
		Iterator<RegistroComportamientoUsuario> iteratorR = registroComportamientoUsuarios.getRegistroComportamientoUsuarios().values().iterator();
		RegistroComportamientoUsuario registro;
		while(iteratorR.hasNext() ){
			registro=iteratorR.next();
			registro.setPeticionesDia(0);
		}
		registroComportamientoUsuarios.setPeticionesDia(0);
		mapaRegistroConsumoServicios.setPeticionesDia(0);
		Iterator<ConsumoServicio> iteratorServicios = mapaRegistroConsumoServicios.getRegistroConsumoServicios().values().iterator();
		ConsumoServicio consumoServicio;
		while( iteratorServicios.hasNext() ){
			consumoServicio=iteratorServicios.next();
			consumoServicio.setPeticionesDia(0);
		}
		Iterator<InstanciaWSM2K> iteratorInstancias= listaInstancias.getInstanciasWSM2K().iterator();
		while(iteratorInstancias.hasNext()){
			iteratorInstancias.next().setIntentosExitosos(0);
			iteratorInstancias.next().setIntentosFallidos(0);
		}
				
		LOG.info("Reiniciado contador de indicadores por Dia");
	}
	
	
}
