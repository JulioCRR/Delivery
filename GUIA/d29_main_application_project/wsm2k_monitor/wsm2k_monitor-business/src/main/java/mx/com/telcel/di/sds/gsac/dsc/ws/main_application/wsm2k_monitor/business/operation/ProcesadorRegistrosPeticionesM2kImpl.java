package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;


/**
 * Clase que se encarga del procesamiento de los mensajes obtenidos de la cola.
 * Contiene la logica necesaria para el guardado en bitacora. 
 * */
public class ProcesadorRegistrosPeticionesM2kImpl  {

	
	private static final Logger LOG = LoggerFactory.getLogger(ProcesadorRegistrosPeticionesM2kImpl.class);
	
	
        
	@Autowired
	private ProcesadorM2kInfoRegistro procesadorM2kInfoRegistro;
        
        @Autowired
	private AdministradorListaMensajes administradorListaMensajes;
	
	
	
	/**
	 * Metodo que implementa la logica necesaria antes de persistir en BD.
	 * Realiza la conversi�n del mensaje serializado a un objeto de tipo RecolectorInformacionEntity
	 * para guardarlo en BD.
	 * En caso de error en el guardado del registro y la bandera UtilError.encolaMensajeEnError es true
	 * el mensaje se vuelve a encolar.
	 * */
	public boolean procesaRegistroPeticionV2(String mensaje){
		boolean resultadoSave=false;
		try{
			
			M2kInfoRegistro registro= procesadorM2kInfoRegistro.parseMessageToM2KInfoRegistro(mensaje);
                        
                        if(administradorListaMensajes.getListaMensajes().size()<administradorListaMensajes.getMaxSizeList() ){
                            administradorListaMensajes.agregaRegistro(registro);
                            
                            UtilMonitoreo.setMensajesEncolados(administradorListaMensajes.getListaMensajes().size() );
                        }
                        
		}catch(Exception e){
			;
		}
		
		return resultadoSave;
	}
	
	
	
	
	
}
