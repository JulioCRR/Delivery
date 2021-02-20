package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.ManipuladorArchivos;

public class CargadorCatalogoUsuarios {
	
	private static final Logger LOG = LoggerFactory.getLogger(CargadorCatalogoUsuarios.class);
	private String archivoCatalogoUsuarios;
	private String archivoCatalogoServicios;
	
	@Autowired
	RegistroComportamientoUsuarios registroComportamientoUsuarios;
	


	public RegistroComportamientoUsuarios cargaInicialRegistroComportamientoUsuarios(){
		ManipuladorArchivos ma=new ManipuladorArchivos();
		LinkedList<String> usuarios= ma.obtenRenglones(archivoCatalogoUsuarios);
		LinkedList<String> servicios= ma.obtenRenglones(archivoCatalogoServicios);
		Iterator<String> iteratorUsuarios=usuarios.iterator();
		HashMap<String,RegistroComportamientoUsuario> mapaRegistroComportamientoUsuarios=new HashMap<String,RegistroComportamientoUsuario>();
		//RegistroComportamientoUsuarios registroComportamientoUsuarios=new RegistroComportamientoUsuarios();
		RegistroComportamientoUsuario registroComportamientoUsuario;
		//String info;
		String usuario;
		Integer id;
		String aplicacion;
		iteratorUsuarios.next();
		while(iteratorUsuarios.hasNext() ){
			//info=iteratorUsuarios.next();
			StringTokenizer tokenizer=new StringTokenizer(iteratorUsuarios.next(),",");
			usuario=tokenizer.nextToken();
			id=new Integer(tokenizer.nextToken());
			aplicacion=tokenizer.nextToken();
			registroComportamientoUsuario=generaRegistroInicialComportamientoUsuario(usuario,id,aplicacion,servicios);
			mapaRegistroComportamientoUsuarios.put(usuario, registroComportamientoUsuario);
		}
		registroComportamientoUsuarios.setRegistroComportamientoUsuarios(mapaRegistroComportamientoUsuarios);
		LOG.error("registroComportamientoUsuarios size: "+registroComportamientoUsuarios.getRegistroComportamientoUsuarios().size() );
		return registroComportamientoUsuarios;
	}
	
	
	public RegistroComportamientoUsuario generaRegistroInicialComportamientoUsuario(String usuario,Integer id,String sistema,LinkedList<String> servicios){
		LinkedList<String> serviciosCopy=servicios;
		Iterator<String> iterator=serviciosCopy.iterator();
		StringTokenizer tokenizer; 
		String servicio;
		ConsumoServicio consumoServicio;
		HashMap <String,ConsumoServicio> registroConsumoServicios=new HashMap <String,ConsumoServicio>();
		RegistroComportamientoUsuario registroComportamientoUsuario=new RegistroComportamientoUsuario(usuario,id,sistema);
		while(iterator.hasNext() ){
			//servicio=iterator.next();
			String cadena= iterator.next();
			//LOG.error("cadena a analizar: "+cadena);
			tokenizer=new StringTokenizer(cadena,",");
			servicio=tokenizer.nextToken();
			//int idServicio=Integer.parseInt(tokenizer.nextToken());
			consumoServicio=new ConsumoServicio(servicio,tokenizer.nextToken());
			registroConsumoServicios.put(servicio, consumoServicio);
		}
		registroComportamientoUsuario.setRegistroConsumoServicios(registroConsumoServicios);
		LOG.error("registroConsumoServicios size: "+registroComportamientoUsuario.getRegistroConsumoServicios().size() );
		return registroComportamientoUsuario;
	}
	
	
	public String getArchivoCatalogoUsuarios() {
		return archivoCatalogoUsuarios;
	}

	public void setArchivoCatalogoUsuarios(String archivoCatalogoUsuarios) {
		this.archivoCatalogoUsuarios = archivoCatalogoUsuarios;
	}



	public String getArchivoCatalogoServicios() {
		return archivoCatalogoServicios;
	}



	public void setArchivoCatalogoServicios(String archivoCatalogoServicios) {
		this.archivoCatalogoServicios = archivoCatalogoServicios;
	}
	
	
	
	
}
