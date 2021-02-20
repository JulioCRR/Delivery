/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import java.io.Serializable;



import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name="M2K_INFO_REGISTRO")
public class RecolectorInformacionEntity implements Serializable{
	
	
	/**
	 * Esta clase tiene las variables con los datos referentes a la informacion recuperada de los archivos creados por el metodo
	 * alternativo de guardado de informacion del proyecto servicios web m2k
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="XML_RECIBIDO")
	private String 	xmlEntrada;
	@Column(name="XML_REGRESADO")
	private String 	xmlRespuesta;
	@Column(name="IP")
	private String	ip;
	@Id
	@Column(name="IDPETICION")
	private String 	peticionId;
	@Column(name="REGION")
	private String 	region;
	@Column(name="USUARIO")
	private String 	usuario;
	@Column(name="SERVICIO")
	private String 	funcion;
	@Column(name="FECHA_INICIO")
	@Temporal(value=TemporalType.TIMESTAMP)
	private Date fechaInicio;
	@Column(name="TIEMPO_EJECUCION")
	private long	tiempoTotalWeb;
	@Column(name="TIEMPO_CONECTOR")
	//El tiempo del conector puede ser nulo por eso se declaro de esta manera
	private Long	tiempoTotalConector;
	@Column(name="TIPO_CONECTOR")
	private String 	tipoConector;
	
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
	public Date getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(Date fechaInicio) {
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
	

}
