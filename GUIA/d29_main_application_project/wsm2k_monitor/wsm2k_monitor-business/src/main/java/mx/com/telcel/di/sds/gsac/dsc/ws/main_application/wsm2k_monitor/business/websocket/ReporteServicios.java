package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.websocket;

import java.util.LinkedList;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;



public class ReporteServicios {

	private LinkedList<ConsumoServicio> consumoServicios;

	public LinkedList<ConsumoServicio> getConsumoServicios() {
		return consumoServicios;
	}

	public void setConsumoServicios(LinkedList<ConsumoServicio> consumoServicios) {
		this.consumoServicios = consumoServicios;
	}
	
	
	
}
