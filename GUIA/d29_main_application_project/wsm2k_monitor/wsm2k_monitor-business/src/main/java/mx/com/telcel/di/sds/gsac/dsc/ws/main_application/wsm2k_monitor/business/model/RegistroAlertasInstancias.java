package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.LinkedList;

public class RegistroAlertasInstancias {

	private static LinkedList<InstanciaWSM2K> alertas=new LinkedList<InstanciaWSM2K>();

	public static LinkedList<InstanciaWSM2K> getAlertas() {
		return alertas;
	}

	public static void setAlertas(LinkedList<InstanciaWSM2K> alertas) {
		RegistroAlertasInstancias.alertas = alertas;
	}

	public static synchronized void addFirstSync(InstanciaWSM2K instancia) {
            alertas.addFirst(instancia);
        }
	
}
