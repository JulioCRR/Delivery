package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import org.springframework.beans.factory.annotation.Autowired;

//import mx.com.telcel.services.business.ResponseAnalyzer;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.RecolectorInformacionEntity;


/**
 * Clase que se encarga del procesamiento de los mensajes obtenidos de la cola "aquiLaColaAnalizadora".
 * Su objetivo es procesar los mensajes de texto tomados de la cola y analizarlos para
 * encontrar recurrencias en errores. 
 * */
public class ProcesadorRespuestasPeticionesM2K {

	@Autowired
	private ResponseAnalyzer responseAnalyzer;
	
	@Autowired
	private ProcesadorM2kInfoRegistro procesadorM2kInfoRegistro;
	
	public void procesaRespuestaMensaje(String mensaje ){
		try{
			RecolectorInformacionEntity registro= procesadorM2kInfoRegistro.parseMessageToEntity(mensaje);
			responseAnalyzer.analizaRespuestaV2(registro,mensaje);
			responseAnalyzer.analizaTiempoRespuesta(registro);
			responseAnalyzer.registraConsumoServicios(registro);
		}catch(Exception e){
			;
		}
		
	}
	
}
