/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import org.joda.time.LocalDateTime;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Entity
@Table(name = "M2K_INFO_REGISTRO")
public class M2kInfoRegistro implements Serializable {

    /**
     * Esta clase tiene las variables con los datos referentes a la informacion
     * recuperada de los archivos creados por el metodo alternativo de guardado
     * de informacion del proyecto servicios web m2k
     */
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "IDPETICION")
    private String idPeticion;
    @Column(name = "XML_RECIBIDO")
    private String xmlEntrada;
    @Column(name = "XML_REGRESADO")
    private String xmlRespuesta;
    @Column(name = "IP")
    private String ip;
    @Column(name = "REGION")
    private String region;
    @Column(name = "USUARIO")
    private String usuario;
    @Column(name = "SERVICIO")
    private String funcion;
    @Column(name = "FECHA_INICIO")
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime fechaInicio;
    @Column(name = "TIEMPO_EJECUCION")
    private long tiempoTotalWeb;
    @Column(name = "TIEMPO_CONECTOR")
    private Long tiempoTotalConector;
    @Column(name = "TIPO_CONECTOR")
    private String tipoConector;

    @Transient
    private String serverHost;
    @Transient
    private String instancia;
    @Transient
    private String accion;
    @Transient
    private String tipoRespuesta;
    
    public String getIdPeticion() {
        return idPeticion;
    }

    public void setIdPeticion(String idPeticion) {
        this.idPeticion = idPeticion;
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

    @JsonIgnore
    public LocalDateTime getFechaInicioLocalDateTime() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Long getFechaInicio() {
        return fechaInicio == null ? null : fechaInicio.toDateTime().getMillis();
    }

    public long getTiempoTotalWeb() {
        return tiempoTotalWeb;
    }

    public void setTiempoTotalWeb(long tiempoTotalWeb) {
        this.tiempoTotalWeb = tiempoTotalWeb;
    }

    public String getTiempoTotalConector(){ 
        return tiempoTotalConector == null ? null:tiempoTotalConector.toString() ;
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

    public void setInstancia(String instancia) {
        this.instancia = instancia;
    }

    public String getInstancia() {
        return instancia;
    }
    
    public String getAccion() {
        return accion;
    }
     
    public String getTipoRespuesta() {
        return tipoRespuesta;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public void setTipoRespuesta(String tipoRespuesta) {
        this.tipoRespuesta = tipoRespuesta;
    }

    public String getServerHost() {
        return serverHost;
    }

    public void setServerHost(String serverHost) {
        this.serverHost = serverHost;
    }   
}
