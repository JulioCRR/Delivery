package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;


import java.util.LinkedList;




public class CatalogoRespuestasError {

	private static HashMap<String,RespuestaError> catalogoErrores;
	private static LinkedList<RespuestaError> catalogoErroresLike;
	private static String archivoCatalogoErrores;
	private static long incidenciasDelDia;
	
	
	public  HashMap<String, RespuestaError> getCatalogoErrores() {
		return catalogoErrores;
	}

	public void setCatalogoErrores(HashMap<String, RespuestaError> catalogoErrores) {
		CatalogoRespuestasError.catalogoErrores = catalogoErrores;
	}

	public static String getArchivoCatalogoErrores() {
		return archivoCatalogoErrores;
	}

	public static void setArchivoCatalogoErrores(String archivoCatalogoErrores) {
		CatalogoRespuestasError.archivoCatalogoErrores = archivoCatalogoErrores;
	}

	public LinkedList<RespuestaError> getCatalogoErroresLike() {
		return catalogoErroresLike;
	}

	public void setCatalogoErroresLike(
			LinkedList<RespuestaError> catalogoErroresLike) {
		CatalogoRespuestasError.catalogoErroresLike = catalogoErroresLike;
	}

	public static long getIncidenciasDelDia() {
		return incidenciasDelDia;
	}

	public static void setIncidenciasDelDia(long incidenciasDelDia) {
		CatalogoRespuestasError.incidenciasDelDia = incidenciasDelDia;
	}
	
	
	

	
	
	
	
	
}
