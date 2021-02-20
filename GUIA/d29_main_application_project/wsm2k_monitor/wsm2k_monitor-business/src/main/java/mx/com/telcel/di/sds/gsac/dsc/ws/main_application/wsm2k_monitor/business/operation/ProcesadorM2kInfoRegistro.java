/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import javax.xml.bind.DatatypeConverter;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.RecolectorInformacionEntity;
import mx.telecom.telcel.monitor.beans.RecolectorInformacionNegocio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;

/**
 * Clase que se encarga del tratamiento del mensaje serializado para convertirlo 
 * en objeto de tipo RecolectorInformacionEntity.
 * */
public class ProcesadorM2kInfoRegistro {

		
	/**
	 * Metodo que recibe una cadena serializada obtiene su reprentacion en objeto 
	 * de tipo RecolectorInformacionEntity. En caso de que no pueda obtener su representaci�n
	 * regresa null.
	 * */
	public RecolectorInformacionEntity parseMessageToEntity(String message) throws IOException {
		RecolectorInformacionNegocio recolectorNegocio=null;
		ByteArrayInputStream arrayInputStream = new ByteArrayInputStream(DatatypeConverter.parseBase64Binary( message ) );
        ObjectInputStream inputStream=null;
        RecolectorInformacionEntity registro=null;
		try {
			inputStream = new ObjectInputStream(arrayInputStream);
	        recolectorNegocio = (RecolectorInformacionNegocio)inputStream.readObject();
	        registro=recolectorNegocio.toEntity();
	        //LOG.info(registro.getPeticionId() );
	        inputStream.close();
	        arrayInputStream.close();
		} catch (Exception e) {
			if(inputStream!=null  ){
				inputStream.close();
			}
			if(arrayInputStream != null){
				arrayInputStream.close();
			}
		}
		return registro;
    }

    public M2kInfoRegistro parseMessageToM2KInfoRegistro(String message) throws IOException {
		RecolectorInformacionNegocio recolectorNegocio=null;
		ByteArrayInputStream arrayInputStream = new ByteArrayInputStream(DatatypeConverter.parseBase64Binary( message ) );
        ObjectInputStream inputStream=null;
        M2kInfoRegistro registro=null;
		try {
			inputStream = new ObjectInputStream(arrayInputStream);
	        recolectorNegocio = (RecolectorInformacionNegocio)inputStream.readObject();
	        registro=recolectorNegocio.toM2KInfoRegistro();
	        //LOG.info(registro.getPeticionId() );
	        inputStream.close();
	        arrayInputStream.close();
		} catch (Exception e) {
			if(inputStream!=null  ){
				inputStream.close();
			}
			if(arrayInputStream != null){
				arrayInputStream.close();
			}
		}
		return registro;
    }    
}

