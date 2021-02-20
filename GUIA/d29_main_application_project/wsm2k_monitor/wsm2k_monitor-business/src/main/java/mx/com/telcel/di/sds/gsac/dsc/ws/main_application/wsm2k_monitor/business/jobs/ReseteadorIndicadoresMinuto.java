package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import java.util.Iterator;

//import mx.com.telcel.services.business.queue.ListenerAnalytic;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;

import org.springframework.beans.factory.annotation.Autowired;

public class ReseteadorIndicadoresMinuto {

	

	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	
	@Autowired
	private RegistroAlertas registroAlertas;
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	/*@Autowired
	private ListenerAnalytic listenerAnalytic;
	*/
	public void reiniciaIndicadoresPorMinuto(){
		Iterator<RegistroComportamientoUsuario> iterator = registroComportamientoUsuarios.getRegistroComportamientoUsuarios().values().iterator();
		RegistroComportamientoUsuario registro;
		ConsumoServicio consumoServicioUsuario;
		while(iterator.hasNext() ){
			registro=iterator.next();
			registro.setPeticionesMinuto(0);
			Iterator<ConsumoServicio>iteratorServicios=registro.getRegistroConsumoServicios().values().iterator();
			while(iteratorServicios.hasNext() ){
				consumoServicioUsuario=iteratorServicios.next();
				consumoServicioUsuario.setPeticionesMinuto(0);
			}
		}
		registroComportamientoUsuarios.setPeticionesMinuto(0);
		mapaRegistroConsumoServicios.setPeticionesMinuto(0);
		//this.listenerAnalytic.getListenerContainerAnalytic().stop();
		Iterator<ConsumoServicio> iteratorServicios = mapaRegistroConsumoServicios.getRegistroConsumoServicios().values().iterator();
		ConsumoServicio consumoServicio;
		while( iteratorServicios.hasNext() ){
			consumoServicio=iteratorServicios.next();
			consumoServicio.setPeticionesMinuto(0);
		}
		
		
		
	}
	
	
	
}
