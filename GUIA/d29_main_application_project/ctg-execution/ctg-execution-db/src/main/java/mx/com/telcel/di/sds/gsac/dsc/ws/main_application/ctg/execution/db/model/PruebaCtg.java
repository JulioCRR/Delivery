/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model;

import java.util.Date;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class PruebaCtg {

    private String usuario;
    private String password;
    private String programa;
    private String region;
    private String transaccion;
    private String cadena;
    private String ambiente;
    private String codigoProduccion;
    private Date fhEjecucion;
    private Integer idUsuarioEjecucion;
    private Integer idSolicitudEjecucion;
            
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public String getCadena() {
        return cadena;
    }

    public void setCadena(String cadena) {
        this.cadena = cadena;
    }

    public String getAmbiente() {
        return ambiente;
    }

    public void setAmbiente(String ambiente) {
        this.ambiente = ambiente;
    }

    public String getCodigoProduccion() {
        return codigoProduccion;
    }

    public void setCodigoProduccion(String codigoProduccion) {
        this.codigoProduccion = codigoProduccion;
    }

    public Date getFhEjecucion() {
        return fhEjecucion;
    }

    public void setFhEjecucion(Date fhEjecucion) {
        this.fhEjecucion = fhEjecucion;
    }

    public Integer getIdUsuarioEjecucion() {
        return idUsuarioEjecucion;
    }

    public void setIdUsuarioEjecucion(Integer idUsuarioEjecucion) {
        this.idUsuarioEjecucion = idUsuarioEjecucion;
    }

    public Integer getIdSolicitudEjecucion() {
        return idSolicitudEjecucion;
    }

    public void setIdSolicitudEjecucion(Integer idSolicitudEjecucion) {
        this.idSolicitudEjecucion = idSolicitudEjecucion;
    }

    @Override
    public String toString() {
        return "PruebaCtg{" + "usuario=" + usuario + ", password=" + password + ", programa=" + programa + ", region=" + region + ", transaccion=" + transaccion + ", cadena=" + cadena + ", ambiente=" + ambiente + ", codigoProduccion=" + codigoProduccion + ", fhEjecucion=" + fhEjecucion + ", idUsuarioEjecucion=" + idUsuarioEjecucion + ", idSolicitudEjecucion=" + idSolicitudEjecucion + '}';
    }
    
}
