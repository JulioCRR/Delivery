/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.telecom.telcel.monitor.beans;

import java.io.Serializable;
import java.util.Date;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.RecolectorInformacionEntity;
import org.joda.time.LocalDateTime;

public class RecolectorInformacionNegocio implements Serializable{
	
	/**
	 * Esta clase tiene las variables con los datos referentes a la informacion recuperada de los archivos creados por el metodo
	 * alternativo de guardado de informacion del proyecto servicios web m2k
	 */
	private static final long serialVersionUID = 1L;
	
	private String 	xmlEntrada;
	private String 	xmlRespuesta;
	private String	ip;
	private String 	peticionId;
	private String 	region;
	private String 	usuario;
	private String 	funcion;
	private long fechaInicio;
	private long	tiempoTotalWeb;
	//El tiempo del conector puede ser nulo por eso se declaro de esta manera
	private Long	tiempoTotalConector;
	private String 	tipoConector;
	
	public RecolectorInformacionNegocio(){
		
	}
	
	public RecolectorInformacionNegocio(RecolectorInformacionEntity entidad){
		this.xmlEntrada=entidad.getXmlEntrada(); 
		this.xmlRespuesta=entidad.getXmlRespuesta();
		this.ip=entidad.getIp();
		this.peticionId=entidad.getPeticionId(); 
		this.region=entidad.getRegion();
		this.usuario=entidad.getUsuario(); 
		this.funcion=entidad.getFuncion(); 
		this.fechaInicio=entidad.getFechaInicio().getTime(); 
		this.tiempoTotalWeb=entidad.getTiempoTotalWeb(); 
		this.tiempoTotalConector=entidad.getTiempoTotalConector(); 
		this.tipoConector=entidad.getTipoConector(); 
	}
	
	public String getXmlEntrada() {
		return xmlEntrada;
	}
	public void setXmlEntrada(String xmlEntrada) {
		this.xmlEntrada = xmlEntrada;
	}
	public String getXmlRespuesta() {
		return xmlRespuesta;
	}
	public void setXmlRespuesta(String xmlRespuesta) {
		this.xmlRespuesta = xmlRespuesta;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getPeticionId() {
		return peticionId;
	}
	public void setPeticionId(String peticionId) {
		this.peticionId = peticionId;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getFuncion() {
		return funcion;
	}
	public void setFuncion(String funcion) {
		this.funcion = funcion;
	}
	public long getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(long fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public long getTiempoTotalWeb() {
		return tiempoTotalWeb;
	}
	public void setTiempoTotalWeb(long tiempoTotalWeb) {
		this.tiempoTotalWeb = tiempoTotalWeb;
	}
	public Long getTiempoTotalConector() {
		return tiempoTotalConector;
	}
	public void setTiempoTotalConector(Long tiempoTotalConector) {
		this.tiempoTotalConector = tiempoTotalConector;
	}
	public String getTipoConector() {
		return tipoConector;
	}
	public void setTipoConector(String tipoConector) {
		this.tipoConector = tipoConector;
	}
	
	public RecolectorInformacionEntity toEntity(){
		RecolectorInformacionEntity entidad = new RecolectorInformacionEntity();
		
		entidad.setXmlEntrada(getXmlEntrada()); 
		entidad.setXmlRespuesta(getXmlRespuesta());
		entidad.setIp(getIp());
		entidad.setPeticionId(getPeticionId()); 
		entidad.setRegion(getRegion());
		entidad.setUsuario(getUsuario()); 
		entidad.setFuncion(getFuncion()); 
		entidad.setFechaInicio(new Date(getFechaInicio())); 
		entidad.setTiempoTotalWeb(getTiempoTotalWeb()); 
		entidad.setTiempoTotalConector(getTiempoTotalConector()); 
		entidad.setTipoConector(getTipoConector()); 
		return entidad;
	}

        public M2kInfoRegistro toM2KInfoRegistro(){
		M2kInfoRegistro entidad = new M2kInfoRegistro();
		
		entidad.setXmlEntrada(getXmlEntrada()); 
		entidad.setXmlRespuesta(getXmlRespuesta());
		entidad.setIp(getIp());
                entidad.setIdPeticion(getPeticionId());
		entidad.setRegion(getRegion());
		entidad.setUsuario(getUsuario()); 
		entidad.setFuncion(getFuncion()); 
		entidad.setFechaInicio(new LocalDateTime(getFechaInicio()));
		entidad.setTiempoTotalWeb(getTiempoTotalWeb()); 
		entidad.setTiempoTotalConector(getTiempoTotalConector()); 
		entidad.setTipoConector(getTipoConector()); 
		return entidad;
	}
        
}
