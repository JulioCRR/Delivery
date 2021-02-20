/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest;

import java.util.Date;


public class EnviarPeticion {
    

 	private Integer user;
        private String telefono;
        private String ip;
        private String region;
        private String usuario;
        private String transaccion;
        private Date fechaInicio;
        private Date horaInicio;
        private Date horaFinal;

    public EnviarPeticion() {
    }

    public EnviarPeticion(Integer user, long status, String telefono, String ip, String region, String usuario, String transaccion, Date fechaInicio, Date horaInicio, Date horaFinal) {
        this.user = user;
        this.telefono = telefono;
        this.ip = ip;
        this.region = region;
        this.usuario = usuario;
        this.transaccion = transaccion;
        this.fechaInicio = fechaInicio;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }


    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
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

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Date horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Date getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(Date horaFinal) {
        this.horaFinal = horaFinal;
    }

    @Override
    public String toString() {
        return "EnviarPeticion{" + "user=" + user +", telefono=" + telefono + ", ip=" + ip + ", region=" + region + ", usuario=" + usuario + ", transaccion=" + transaccion + ", fechaInicio=" + fechaInicio + ", horaInicio=" + horaInicio + ", horaFinal=" + horaFinal + '}';
    }

   



}  
