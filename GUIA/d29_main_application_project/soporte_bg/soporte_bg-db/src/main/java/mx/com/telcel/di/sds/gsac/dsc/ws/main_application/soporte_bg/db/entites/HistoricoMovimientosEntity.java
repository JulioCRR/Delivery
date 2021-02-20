/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author VI9XXG0
 */

@Entity
@Table(name="EI2_MOV_HIST")
public class HistoricoMovimientosEntity implements Serializable {
    
    @Column(name="ID_MOV_HIST")
    @Id
    private int id;
    
    @Column(name="ID_SOLICITUD")
    private int idSolicitud;
    
    @Column(name="TELEFONO")
    private String telefono;
    
    @Column(name="REGION")
    private String region;
    
    @Column(name="CONSECUTIVO")
    private int consecutivo;
    
    @Column(name="ESTATUS")
    private String estatus;
    
    @Column(name="MENSAJE")
    private String mensaje;
    
    @Column(name="FECHA_EJECUCION")
    private Date fechaEjecucion;
    
    @Column(name="GRUPO_NACIONAL")
    private int grupoNacional;
    
    @Column(name="PRODUCTO")
    private String producto;
    
    @Column(name="TIPO")
    private String tipo;
    
    @Column(name="PIVOTE")
    private String pivote;
    
    @Column(name="ID_PETICION_WSM2K")
    private String idPeticion;

    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }

    public int getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(int idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public int getConsecutivo() {
        return consecutivo;
    }

    public void setConsecutivo(int consecutivo) {
        this.consecutivo = consecutivo;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Date getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Date fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public int getGrupoNacional() {
        return grupoNacional;
    }

    public void setGrupoNacional(int grupoNacional) {
        this.grupoNacional = grupoNacional;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPivote() {
        return pivote;
    }

    public void setPivote(String pivote) {
        this.pivote = pivote;
    }
    
    public String getIdPeticion() {
        return idPeticion;
    }

    public void setIdPeticion(String idPeticion) {
        this.idPeticion = idPeticion;
    }
    
    
}
