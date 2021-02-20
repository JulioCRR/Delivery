/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class SolicitudCtg {
    
    private String programa;
    private String ambiente;
    private String usuario;
    private String transaccion;
    private String proyectoAsociado;
    private String comentarios;
    private String folioGenerado;
    private String estatus;
    
    private int id;
    private int total_transacciones;
    private int solicitante;
    private int responsableAutorizacion;
    
    private Date fecha_solicitud;
    private Date fechaHoraGeneracion;
    private Date hora_inicio;
    private Date hora_fin;
    
    public Date getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(Date hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public Date getHora_fin() {
        return hora_fin;
    }

    public void setHora_fin(Date hora_fin) {
        this.hora_fin = hora_fin;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public String getProyectoAsociado() {
        return proyectoAsociado;
    }

    public void setProyectoAsociado(String proyectoAsociado) {
        this.proyectoAsociado = proyectoAsociado;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getFolioGenerado() {
        return folioGenerado;
    }

    public void setFolioGenerado(String folioGenerado) {
        this.folioGenerado = folioGenerado;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTotal_transacciones() {
        return total_transacciones;
    }

    public void setTotal_transacciones(int total_transacciones) {
        this.total_transacciones = total_transacciones;
    }

    public int getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(int solicitante) {
        this.solicitante = solicitante;
    }

    public int getResponsableAutorizacion() {
        return responsableAutorizacion;
    }

    public void setResponsableAutorizacion(int responsableAutorizacion) {
        this.responsableAutorizacion = responsableAutorizacion;
    }

    public Date getFecha_solicitud() {
        return fecha_solicitud;
    }

    public void setFecha_solicitud(Date fecha_solicitud) {
        this.fecha_solicitud = fecha_solicitud;
    }

    public Date getFechaHoraGeneracion() {
        return fechaHoraGeneracion;
    }

    public void setFechaHoraGeneracion(Date fechaHoraGeneracion) {
        this.fechaHoraGeneracion = fechaHoraGeneracion;
    }

    public String getAmbiente() {
        return ambiente;
    }

    public void setAmbiente(String ambiente) {
        this.ambiente = ambiente;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    public static SolicitudCtg toSolicitudCtg(PruebaCtg prueba, int responsable) {
        
        SolicitudCtg solicitud = new SolicitudCtg();
    
        if (prueba != null) {
            Date fecha = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            solicitud.setUsuario(prueba.getUsuario());
            solicitud.setTransaccion(prueba.getTransaccion());
            solicitud.setProyectoAsociado("DESARROLLO");
            solicitud.setComentarios("DESARROLLO");
            solicitud.setFolioGenerado("SIN_FOLIO");
            solicitud.setEstatus("INA");
            solicitud.setTotal_transacciones(1);
            solicitud.setSolicitante(prueba.getIdUsuarioEjecucion());
            solicitud.setResponsableAutorizacion(responsable);
            solicitud.setFechaHoraGeneracion(fecha);
            solicitud.setFecha_solicitud(fecha);
            solicitud.setHora_inicio(fecha);
            solicitud.setHora_fin(fecha);
            solicitud.setAmbiente(prueba.getAmbiente());
            solicitud.setPrograma(prueba.getPrograma());
        }
        
        return solicitud;
    }
    
    @Override
    public String toString() {
        return "SolicitudCtg{" + "hora_inicio=" + hora_inicio + ", hora_fin=" + hora_fin + ", usuario=" + usuario + ", transaccion=" + transaccion + ", proyectoAsociado=" + proyectoAsociado + ", comentarios=" + comentarios + ", folioGenerado=" + folioGenerado + ", estatus=" + estatus + ", id=" + id + ", total_transacciones=" + total_transacciones + ", solicitante=" + solicitante + ", responsableAutorizacion=" + responsableAutorizacion + ", fecha_solicitud=" + fecha_solicitud + ", fechaHoraGeneracion=" + fechaHoraGeneracion + '}';
    }

}
