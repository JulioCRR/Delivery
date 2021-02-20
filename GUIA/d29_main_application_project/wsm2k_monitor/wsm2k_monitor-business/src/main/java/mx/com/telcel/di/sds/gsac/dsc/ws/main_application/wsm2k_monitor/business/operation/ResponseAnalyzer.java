package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;



import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;


import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaServiciosAnalisis;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.exception.ExternalException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.RecolectorInformacionEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.ManipuladorArchivos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ResponseAnalyzer {
        
          
    
	private static final String MENSAJE_OPEN="<MENSAJE>";
	private static final String MENSAJE_CLOSE="</MENSAJE>";
	private static final String STATUS_FALLIDO="FALLIDO</ESTATUS>";
	private static final Logger LOG = LoggerFactory.getLogger(ResponseAnalyzer.class);
	private static final int ANALIZA_ERROR=1;
	private static final int ANALIZA_RESPUESTA=2;
	private static final int NO_ANALIZAR=0;
	
	
	@Autowired
	private CatalogoRespuestasError catalogoRespuestasError;
	
	@Autowired
	private CargadorCatalogoErrores cargadorCatalogoErrores;
	
	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired
	private RegistroComportamientoUsuarios registroComportamientoUsuarios;
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	@Autowired
	private MapaServiciosAnalisis mapaServiciosAnalisis;
	
	private HashMap<String,String> registroErroresUnico=new HashMap<String,String>();
	
	private String archivoMensajesErrorSerializados;
	
	



	/**Metodo responsable de analizar las respuestas provenientes de la aplicacion
	 * telcel-ws-web recolectadas de la cola de mensajes "aquiLaCola". Si la respuesta
	 * esta catalogada como error y excede el umbral maximo de errores la funcion 
	 * arroja un XXXException para que sea detectada por aop y la clase AlertadorErrores
	 * se encargue de enviar el correo de alerta */
	/*public void analizaRespuesta(RecolectorInformacionEntity respuesta){		
		int indexFallido=respuesta.getXmlRespuesta().indexOf(STATUS_FALLIDO);
		if( indexFallido > 0 ){
			String mensaje=extraeMensajeXML(respuesta.getXmlRespuesta(),);
			RespuestaError respuestaError=catalogoRespuestasError.getCatalogoErrores().get(mensaje);
			if(respuestaError!=null ){
				respuestaError.setErroresAcumulados(respuestaError.getErroresAcumulados()+1);
				LOG.info(respuestaError.getMensaje()+ "  acumulados  :" +respuestaError.getErroresAcumulados());
			}
		}
	}*/
	
	
	
	public void analizaRespuestaV2(RecolectorInformacionEntity respuesta,String mensajeSerializado) throws ExternalException{
		long tiempoActual=System.currentTimeMillis();
		//int indexFallido=respuesta.getXmlRespuesta().indexOf(STATUS_FALLIDO);
		int analiza=determinaAnalisis(respuesta);
		//if( indexFallido > 0 ){
		if( analiza > 0 ){
			String mensaje=extraeMensajeXML(respuesta.getXmlRespuesta(),analiza);
			//RespuestaError respuestaError=catalogoRespuestasError.getCatalogoErrores().get(mensaje);
			RespuestaError respuestaError=buscaIncidencia(mensaje);
			//LOG.info(mensaje);
			if(respuestaError!=null ){
				catalogoRespuestasError.setIncidenciasDelDia(catalogoRespuestasError.getIncidenciasDelDia() + 1 );
				//guardaMensajeBitacoraUnica(mensaje,mensajeSerializado);
				respuestaError.setErroresAcumuladosDia( respuestaError.getErroresAcumuladosDia() + 1 );
				respuestaError.setErroresAcumuladosHora( respuestaError.getErroresAcumuladosHora() + 1 );
				respuestaError.setHoraUltimoErrorString( new Date(System.currentTimeMillis()).toString() );
				//LOG.info(respuestaError.getMensaje()+ "  acumulados dia  :" +respuestaError.getErroresAcumuladosDia()  );
				if( ( tiempoActual-respuestaError.getHoraInicioIntervalo() ) < respuestaError.getIntervaloTiempo() ){
					respuestaError.setErroresAcumulados( respuestaError.getErroresAcumulados() + 1 );
					//LOG.info( "errores acumulados intervalo: "+ respuestaError.getErroresAcumulados() );
					if( respuestaError.getErroresAcumulados() >= respuestaError.getMaximoUmbralErrores() ){
						//String reporte=cargadorCatalogoErrores.reporteToTable();
						String mensajeAlerta=mensaje+". Incidencias presentadas desde las "
													+new Date(respuestaError.getHoraInicioIntervalo())+
													" a las "+new Date(tiempoActual) +" : " +
													//respuestaError.getErroresAcumulados()+"<br><br>"+
													respuestaError.getMaximoUmbralErrores()+"<br><br>"+
                                                                                                        "Acumuladas ultima hora : "+ respuestaError.getErroresAcumuladosHora() +"<br>"+
                                                                                                        "Acumuladas en el dia : "+ respuestaError.getErroresAcumuladosDia() +"<br>"+
                                                                                                        "Maximo umbral alerta : "+respuestaError.getMaximoUmbralErrores() +"<br>"+
                                                                                                        "Intervalo de tiempo (ms) : "+respuestaError.getIntervaloTiempo() +"<br>"+
                                                                                                        "Peticiones registradas en el dia : "+UtilMonitoreo.getPeticionesPorDia() +"<br>"+
													"Peticiones registradas ultima hora : "+UtilMonitoreo.getPeticionesUltimaHora();    
													
						//LOG.info( "mensaje alerta: "+ mensajeAlerta );
						respuestaError.setErroresAcumulados(0);
						respuestaError.setHoraInicioIntervalo(tiempoActual);
						ExternalException externalException=new ExternalException(mensajeAlerta);
						externalException.setRespuestaError(respuestaError);
						//throw new ExternalException(mensajeAlerta); // para que sea tomada por AOP
						throw externalException;
					}
				}else{
					respuestaError.setErroresAcumulados(1);
					respuestaError.setHoraInicioIntervalo(tiempoActual);
				}
			}
		}
		//LOG.info("tiempo de analisis: "+ ( System.currentTimeMillis()-tiempoActual ) );
	}
	
	public void guardaMensajeBitacoraUnica(String mensajeError,String mensajeSerializado){
		String errorObtenido=registroErroresUnico.get(mensajeError);
		//archivoMensajesErrorSerializados
		if(errorObtenido == null){
			registroErroresUnico.put(mensajeError, mensajeSerializado);
			ManipuladorArchivos ma=new ManipuladorArchivos();
			//ma.escribeEnArchivo(archivoMensajesErrorSerializados,mensajeError+"\n");
			ma.escribeEnArchivo(archivoMensajesErrorSerializados,mensajeSerializado+"\n");
		}
	}
	
	public String extraeMensajeXML(String xmlRegresado,int analiza){
		if( analiza == ANALIZA_ERROR ){
			int inicio=xmlRegresado.indexOf(MENSAJE_OPEN);
			int fin=xmlRegresado.indexOf(MENSAJE_CLOSE);
			String mensaje=xmlRegresado.substring(inicio+9 ,fin);
			return mensaje;
		}
		else{
			return xmlRegresado;
		}
	}
	
	public RespuestaError buscaIncidencia(String mensaje){
		RespuestaError error=null;
		error=catalogoRespuestasError.getCatalogoErrores().get(mensaje);
		if(error==null){//no se encontro error en mapa y se debe buscar en la lista de erores like
			error=buscaEnCatalogoLike(mensaje);
		}
		return error;
	}
	
	public RespuestaError buscaEnCatalogoLike(String mensaje){
		//RespuestaError error=null;
		Iterator<RespuestaError> iterator=catalogoRespuestasError.getCatalogoErroresLike().iterator();
		RespuestaError errorLike=null;
		while(iterator.hasNext()){
			errorLike=iterator.next();
			if(mensaje.contains( errorLike.getMensaje() ) ){
				return catalogoRespuestasError.getCatalogoErrores().get(errorLike.getMensaje());
			}		
		}
		return null;
	}
	
	public int determinaAnalisis(RecolectorInformacionEntity respuesta){
		String servicio=mapaServiciosAnalisis.getMapaServiciosParaAnlizar().get(respuesta.getFuncion());
		if(servicio != null){
			return ANALIZA_RESPUESTA;
		}
		else if( respuesta.getXmlRespuesta().indexOf(STATUS_FALLIDO) > 0 ){
			return ANALIZA_ERROR;
		}
		return NO_ANALIZAR;
	}
	
	public synchronized void  analizaTiempoRespuesta(RecolectorInformacionEntity respuesta){
                //LOG.error("analizando tiempo - "+respuesta.getPeticionId());
		long tiempo=respuesta.getTiempoTotalWeb();
		RegistroTiempos registro=mapaRegistroTiemposRegion.getMapaTiempos().get(respuesta.getRegion() );
		RegistroTiempos total=mapaRegistroTiemposRegion.getMapaTiempos().get("TOTAL" );
		registro.setNumPeticiones( registro.getNumPeticiones() +1 );
		registro.setNumPeticiones5min(registro.getNumPeticiones5min() +1);
		registro.setNumPeticionesHora(registro.getNumPeticionesHora()  +1);
		registro.setNumPeticionesDia(registro.getNumPeticionesDia() +1 );
		
		total.setNumPeticiones( total.getNumPeticiones() +1 );
		total.setNumPeticiones5min(total.getNumPeticiones5min() +1);
		total.setNumPeticionesHora(total.getNumPeticionesHora()  +1);
		total.setNumPeticionesDia(total.getNumPeticionesDia() +1 );
		
		if(tiempo < 1000 ){
			registro.setT_menor_un_segundo(registro.getT_menor_un_segundo() + 1  );
			registro.setT_menor_un_segundo_5min( registro.getT_menor_un_segundo_5min() + 1 );
			registro.setT_menor_un_segundo_hora( registro.getT_menor_un_segundo_hora() + 1 );
			registro.setT_menor_un_segundo_dia( registro.getT_menor_un_segundo_dia() + 1 );
			
			total.setT_menor_un_segundo(total.getT_menor_un_segundo() + 1  );
			total.setT_menor_un_segundo_5min( total.getT_menor_un_segundo_5min() + 1 );
			total.setT_menor_un_segundo_hora( total.getT_menor_un_segundo_hora() + 1 );
			total.setT_menor_un_segundo_dia( total.getT_menor_un_segundo_dia() + 1 );
		}
		else if( tiempo >=1000 && tiempo < 5000 ){
			registro.setT_1_a_5_segundos( registro.getT_1_a_5_segundos() + 1);
			registro.setT_1_a_5_segundos_5min( registro.getT_1_a_5_segundos_5min() + 1);
			registro.setT_1_a_5_segundos_hora( registro.getT_1_a_5_segundos_hora() + 1);
			registro.setT_1_a_5_segundos_dia( registro.getT_1_a_5_segundos_dia() + 1);
			
			total.setT_1_a_5_segundos( total.getT_1_a_5_segundos() + 1);
			total.setT_1_a_5_segundos_5min( total.getT_1_a_5_segundos_5min() + 1);
			total.setT_1_a_5_segundos_hora( total.getT_1_a_5_segundos_hora() + 1);
			total.setT_1_a_5_segundos_dia( total.getT_1_a_5_segundos_dia() + 1);
		}
		else if( tiempo >=5000 && tiempo < 10000 ){
			registro.setT_5_a_10_segundos( registro.getT_5_a_10_segundos() + 1);
			registro.setT_5_a_10_segundos_5min( registro.getT_5_a_10_segundos_5min() + 1);
			registro.setT_5_a_10_segundos_hora( registro.getT_5_a_10_segundos_hora() + 1);
			registro.setT_5_a_10_segundos_dia( registro.getT_5_a_10_segundos_dia() + 1);
			
			total.setT_5_a_10_segundos( total.getT_5_a_10_segundos() + 1);
			total.setT_5_a_10_segundos_5min( total.getT_5_a_10_segundos_5min() + 1);
			total.setT_5_a_10_segundos_hora( total.getT_5_a_10_segundos_hora() + 1);
			total.setT_5_a_10_segundos_dia( total.getT_5_a_10_segundos_dia() + 1);
		}
		else if( tiempo >=10000 && tiempo < 20000 ){
			registro.setT_10_a_20_segundos( registro.getT_10_a_20_segundos() + 1);
			registro.setT_10_a_20_segundos_5min( registro.getT_10_a_20_segundos_5min() + 1);
			registro.setT_10_a_20_segundos_hora( registro.getT_10_a_20_segundos_hora() + 1);
			registro.setT_10_a_20_segundos_dia( registro.getT_10_a_20_segundos_dia() + 1);
			
			total.setT_10_a_20_segundos( total.getT_10_a_20_segundos() + 1);
			total.setT_10_a_20_segundos_5min( total.getT_10_a_20_segundos_5min() + 1);
			total.setT_10_a_20_segundos_hora( total.getT_10_a_20_segundos_hora() + 1);
			total.setT_10_a_20_segundos_dia( total.getT_10_a_20_segundos_dia() + 1);
			
		}
		else if( tiempo >=20000 && tiempo < 30000 ){
			registro.setT_20_a_30_segundos( registro.getT_20_a_30_segundos() + 1);
			registro.setT_20_a_30_segundos_5min( registro.getT_20_a_30_segundos_5min() + 1);
			registro.setT_20_a_30_segundos_hora( registro.getT_20_a_30_segundos_hora() + 1);
			registro.setT_20_a_30_segundos_dia( registro.getT_20_a_30_segundos_dia() + 1);
			
			total.setT_20_a_30_segundos( total.getT_20_a_30_segundos() + 1);
			total.setT_20_a_30_segundos_5min( total.getT_20_a_30_segundos_5min() + 1);
			total.setT_20_a_30_segundos_hora( total.getT_20_a_30_segundos_hora() + 1);
			total.setT_20_a_30_segundos_dia( total.getT_20_a_30_segundos_dia() + 1);
		}
		else if( tiempo >=30000 && tiempo < 40000 ){
			registro.setT_30_a_40_segundos( registro.getT_30_a_40_segundos() + 1);
			registro.setT_30_a_40_segundos_5min( registro.getT_30_a_40_segundos_5min() + 1);
			registro.setT_30_a_40_segundos_hora( registro.getT_30_a_40_segundos_hora() + 1);
			registro.setT_30_a_40_segundos_dia( registro.getT_30_a_40_segundos_dia() + 1);
			
			total.setT_30_a_40_segundos( total.getT_30_a_40_segundos() + 1);
			total.setT_30_a_40_segundos_5min( total.getT_30_a_40_segundos_5min() + 1);
			total.setT_30_a_40_segundos_hora( total.getT_30_a_40_segundos_hora() + 1);
			total.setT_30_a_40_segundos_dia( total.getT_30_a_40_segundos_dia() + 1);
		}
		else if( tiempo >=40000 && tiempo < 50000 ){
			registro.setT_40_a_50_segundos( registro.getT_40_a_50_segundos() + 1);
			registro.setT_40_a_50_segundos_5min( registro.getT_40_a_50_segundos_5min() + 1);
			registro.setT_40_a_50_segundos_hora( registro.getT_40_a_50_segundos_hora() + 1);
			registro.setT_40_a_50_segundos_dia( registro.getT_40_a_50_segundos_dia() + 1);
			
			total.setT_40_a_50_segundos( total.getT_40_a_50_segundos() + 1);
			total.setT_40_a_50_segundos_5min( total.getT_40_a_50_segundos_5min() + 1);
			total.setT_40_a_50_segundos_hora( total.getT_40_a_50_segundos_hora() + 1);
			total.setT_40_a_50_segundos_dia( total.getT_40_a_50_segundos_dia() + 1);
		}
		else if( tiempo >=50000 && tiempo < 60000 ){
			registro.setT_50_a_60_segundos( registro.getT_50_a_60_segundos() + 1);
			registro.setT_50_a_60_segundos_5min( registro.getT_50_a_60_segundos_5min() + 1);
			registro.setT_50_a_60_segundos_hora( registro.getT_50_a_60_segundos_hora() + 1);
			registro.setT_50_a_60_segundos_dia( registro.getT_50_a_60_segundos_dia() + 1);
			
			total.setT_50_a_60_segundos( total.getT_50_a_60_segundos() + 1);
			total.setT_50_a_60_segundos_5min( total.getT_50_a_60_segundos_5min() + 1);
			total.setT_50_a_60_segundos_hora( total.getT_50_a_60_segundos_hora() + 1);
			total.setT_50_a_60_segundos_dia( total.getT_50_a_60_segundos_dia() + 1);
			
		}
		else if( tiempo >=60000 ){
			registro.setT_mayor_un_minuto( registro.getT_mayor_un_minuto() + 1);
			registro.setT_mayor_un_minuto_5min( registro.getT_mayor_un_minuto_5min() + 1);
			registro.setT_mayor_un_minuto_hora( registro.getT_mayor_un_minuto_hora() + 1);
			registro.setT_mayor_un_minuto_dia( registro.getT_mayor_un_minuto_dia() + 1);
			
			total.setT_mayor_un_minuto( total.getT_mayor_un_minuto() + 1);
			total.setT_mayor_un_minuto_5min( total.getT_mayor_un_minuto_5min() + 1);
			total.setT_mayor_un_minuto_hora( total.getT_mayor_un_minuto_hora() + 1);
			total.setT_mayor_un_minuto_dia( total.getT_mayor_un_minuto_dia() + 1);
		}
	}
	
	
	public synchronized void registraConsumoServicios(RecolectorInformacionEntity respuesta){
		RegistroComportamientoUsuario  registroUsuario;
		registroComportamientoUsuarios.setPeticionesMinuto(registroComportamientoUsuarios.getPeticionesMinuto() +1);
		registroComportamientoUsuarios.setPeticionesHora( registroComportamientoUsuarios.getPeticionesHora() +1);
		registroComportamientoUsuarios.setPeticionesDia( registroComportamientoUsuarios.getPeticionesDia() +1);
		registroUsuario=registroComportamientoUsuarios.getRegistroComportamientoUsuarios().get(respuesta.getUsuario());
		registroUsuario.setPeticionesMinuto( registroUsuario.getPeticionesMinuto() +1 );
		registroUsuario.setPeticionesHora( registroUsuario.getPeticionesHora() + 1);
		registroUsuario.setPeticionesDia( registroUsuario.getPeticionesDia() + 1);
		ConsumoServicio consumoServicio=registroUsuario.getRegistroConsumoServicios().get(respuesta.getFuncion());
		consumoServicio.setPeticionesMinuto( consumoServicio.getPeticionesMinuto() + 1 );
		consumoServicio.setPeticionesHora( consumoServicio.getPeticionesHora() + 1 );
		consumoServicio.setPeticionesDia( consumoServicio.getPeticionesDia() +1 );
		//System.out.println("-----------> consumo servicio: "+consumoServicio.getNombre()+" , "+consumoServicio.getPeticionesMinuto() );
		mapaRegistroConsumoServicios.setPeticionesMinuto( mapaRegistroConsumoServicios.getPeticionesMinuto() + 1 );
		mapaRegistroConsumoServicios.setPeticionesHora( mapaRegistroConsumoServicios.getPeticionesHora() +1 );
		mapaRegistroConsumoServicios.setPeticionesDia( mapaRegistroConsumoServicios.getPeticionesDia() + 1 );
		ConsumoServicio servicio=mapaRegistroConsumoServicios.getRegistroConsumoServicios().get(respuesta.getFuncion());
		servicio.setPeticionesMinuto( servicio.getPeticionesMinuto() + 1 );
		servicio.setPeticionesHora( servicio.getPeticionesHora() + 1 );
		servicio.setPeticionesDia( servicio.getPeticionesDia() +1 );
	}

	
	public String getArchivoMensajesErrorSerializados() {
		return archivoMensajesErrorSerializados;
	}



	public void setArchivoMensajesErrorSerializados(
			String archivoMensajesErrorSerializados) {
		this.archivoMensajesErrorSerializados = archivoMensajesErrorSerializados;
	}
	
}
