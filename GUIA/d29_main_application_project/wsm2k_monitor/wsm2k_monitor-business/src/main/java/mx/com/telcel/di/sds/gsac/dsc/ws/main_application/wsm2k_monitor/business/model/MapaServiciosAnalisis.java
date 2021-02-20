package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class MapaServiciosAnalisis {

	private static HashMap<String,String> mapaServiciosParaAnlizar ;

	public static HashMap<String, String> getMapaServiciosParaAnlizar() {
		return mapaServiciosParaAnlizar;
	}

	public static void setMapaServiciosParaAnlizar(
			HashMap<String, String> mapaServiciosParaAnlizar) {
		MapaServiciosAnalisis.mapaServiciosParaAnlizar = mapaServiciosParaAnlizar;
	}

	
	
	
	
}
