/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model;



/**
 *
 * @author VI9XXG0
 */
public class SolicitudEI {
    

    
    
    private int idSolicitud;
    private int tramite;
    private int grupoNacional;
    
    private String aplicacion;
    private String estatus;
    private String mensaje;
    private String fechaIngreso;
    private String fechaEjecucion;
    private String envioRespuesta;
    private int idComudidad;
    
    private String tipo;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(int idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public int getTramite() {
        return tramite;
    }

    public void setTramite(int tramite) {
        this.tramite = tramite;
    }

    public int getGrupoNacional() {
        return grupoNacional;
    }

    public void setGrupoNacional(int grupoNacional) {
        this.grupoNacional = grupoNacional;
    }

    public String getAplicacion() {
        return aplicacion;
    }

    public void setAplicacion(String aplicacion) {
        this.aplicacion = aplicacion;
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

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(String fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public String getEnvioRespuesta() {
        return envioRespuesta;
    }

    public void setEnvioRespuesta(String envioRespuesta) {
        this.envioRespuesta = envioRespuesta;
    }

    public int getIdComudidad() {
        return idComudidad;
    }

    public void setIdComudidad(int idComudidad) {
        this.idComudidad = idComudidad;
    }

   
    
    
    
    
    
}
