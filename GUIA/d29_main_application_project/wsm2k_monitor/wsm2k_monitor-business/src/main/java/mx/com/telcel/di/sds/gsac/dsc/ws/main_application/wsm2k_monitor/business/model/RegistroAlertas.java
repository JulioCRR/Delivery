package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.LinkedList;

public class RegistroAlertas {

	private static LinkedList<RespuestaError> alertas=new LinkedList<RespuestaError>();

	public static LinkedList<RespuestaError> getAlertas() {
		return alertas;
	}

	public static void setAlertas(LinkedList<RespuestaError> alertas) {
		RegistroAlertas.alertas = alertas;
	}

	
	
	
	
	
}
