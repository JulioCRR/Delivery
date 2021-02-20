package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaServiciosAnalisis;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroConsumoServicios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.ManipuladorArchivos;

public class CargadorCatalogoServicios {

	private static final Logger LOG = LoggerFactory.getLogger(CargadorCatalogoServicios.class);
	
	@Autowired
	private RegistroConsumoServicios mapaRegistroConsumoServicios;
	
	
	@Autowired
	private MapaServiciosAnalisis mapaServiciosAnalisis;
	
	private String archivoCatalogoServicios;
	
	public void cargaInicialServicios(){
		ManipuladorArchivos ma=new ManipuladorArchivos();
		HashMap<String,ConsumoServicio> registroConsumoServicios=new HashMap<String,ConsumoServicio>();
		LinkedList<String> servicios= ma.obtenRenglones(archivoCatalogoServicios);
		Iterator<String> iterator=servicios.iterator();
		ConsumoServicio consumoServicio;
		StringTokenizer tokenizer;
		while( iterator.hasNext()  ){
			tokenizer=new StringTokenizer(iterator.next(),",");
			String servicio=tokenizer.nextToken();
			String id=tokenizer.nextToken();
			String rutina=tokenizer.nextToken();
			consumoServicio=new ConsumoServicio(servicio,rutina,id );
			registroConsumoServicios.put(servicio, consumoServicio);
		}
		cargaServiciosParaAnalizar();
		mapaRegistroConsumoServicios.setRegistroConsumoServicios(registroConsumoServicios);
		LOG.error("size de servicios: "+ mapaRegistroConsumoServicios.getRegistroConsumoServicios().size());
	}

	
	public void cargaServiciosParaAnalizar(){
		HashMap<String,String> mapaServicios= new HashMap<String,String>();
		mapaServicios.put("I*RE","I*RE");
		mapaServiciosAnalisis.setMapaServiciosParaAnlizar(mapaServicios);
	}
	
	
	public String getArchivoCatalogoServicios() {
		return archivoCatalogoServicios;
	}

	public void setArchivoCatalogoServicios(String archivoCatalogoServicios) {
		this.archivoCatalogoServicios = archivoCatalogoServicios;
	}

	
	
}
