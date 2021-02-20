/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest;

import java.util.Date;

/**
 *
 * @author bermudezja
 */
public class EstatusFront {
    
        private Long folioFront;
        private Short estatusFront;
        private String telefonoFront;
        private String ipFront;
        private String regionFront;
        private String usuarioFront;
        private String transaccionFront;
        private Date fechaInicioFront;
        private Date horaInicioFront;
        private Date horaFinalFront;
        private Date fechaSolicituFront;  
        private String mailFront;
        private Integer userFront;
        private String nomUser;
        private Date fechaEjecucion;
        private String msjStatus;
        private String fechaCom;

    

    public EstatusFront(Long folioFront, Short estatusFront, String telefonoFront,String ipFront, String regionFront, String usuarioFront, String transaccionFront, Date fechaInicioFront, Date horaInicioFront,
                             Date horaFinalFront, Date fechaSolicituFront, String correoUsuario,Integer userFront,String nomUser,Date fechaEjecucion,String msjStatus,String fechaCom ) {
        this.folioFront = folioFront;
        this.estatusFront = estatusFront;
        this.telefonoFront = telefonoFront;
        this.ipFront = ipFront;
        this.regionFront = regionFront;
        this.usuarioFront = usuarioFront;
        this.transaccionFront = transaccionFront;
        this.fechaInicioFront = fechaInicioFront;
        this.horaInicioFront = horaInicioFront;
        this.horaFinalFront = horaFinalFront;
        this.fechaSolicituFront = fechaSolicituFront;
        this.mailFront =correoUsuario;
        this.userFront=userFront;
        this.nomUser=nomUser;
        this.fechaEjecucion=fechaEjecucion;
        this.fechaCom=fechaCom;
    }

    public String getNomUser() {
        return nomUser;
    }

    public void setNomUser(String nomUser) {
        this.nomUser = nomUser;
    }
      
    public String getMailFront() {
        return mailFront;
    }

    public void setMailFront(String mailFront) {
        this.mailFront = mailFront;
    }

    public Integer getUserFront() {
        return userFront;
    }

    public void setUserFront(Integer userFront) {
        this.userFront = userFront;
    }
        
        
    public EstatusFront( ){
        
    }    
  
    public Long getFolioFront() {
        return folioFront;
    }

    public void setFolioFront(Long folioFront) {
        this.folioFront = folioFront;
    }

    public Short getEstatusFront() {
        return estatusFront;
    }

    public void setEstatusFront(Short estatusFront) {
        this.estatusFront = estatusFront;
    }

    public String getTelefonoFront() {
        return telefonoFront;
    }

    public void setTelefonoFront(String telefonoFront) {
        this.telefonoFront = telefonoFront;
    }

    public String getIpFront() {
        return ipFront;
    }

    public void setIpFront(String ipFront) {
        this.ipFront = ipFront;
    }

    public String getRegionFront() {
        return regionFront;
    }

    public void setRegionFront(String regionFront) {
        this.regionFront = regionFront;
    }

    public String getUsuarioFront() {
        return usuarioFront;
    }

    public void setUsuarioFront(String usuarioFront) {
        this.usuarioFront = usuarioFront;
    }

    public String getTransaccionFront() {
        return transaccionFront;
    }

    public void setTransaccionFront(String transaccionFront) {
        this.transaccionFront = transaccionFront;
    }

    public Date getFechaInicioFront() {
        return fechaInicioFront;
    }

    public void setFechaInicioFront(Date fechaInicioFront) {
        this.fechaInicioFront = fechaInicioFront;
    }

    public Date getHoraInicioFront() {
        return horaInicioFront;
    }

    public void setHoraInicioFront(Date horaInicioFront) {
        this.horaInicioFront = horaInicioFront;
    }

    public Date getHoraFinalFront() {
        return horaFinalFront;
    }

    public void setHoraFinalFront(Date horaFinalFront) {
        this.horaFinalFront = horaFinalFront;
    }

    public Date getFechaSolicituFront() {
        return fechaSolicituFront;
    }

    public void setFechaSolicituFront(Date fechaSolicituFront) {
        this.fechaSolicituFront = fechaSolicituFront;
    }

    public String getCorreoUsuario() {
        return mailFront;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.mailFront = correoUsuario;
    }

    public Date getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Date fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public String getMsjStatus() {
        return msjStatus;
    }

    public void setMsjStatus(String msjStatus) {
        this.msjStatus = msjStatus;
    }

    public String getFechaCom() {
        return fechaCom;
    }

    public void setFechaCom(String fechaCom) {
        this.fechaCom = fechaCom;
    }

    @Override
    public String toString() {
        return "EstatusFront{" + "folioFront=" + folioFront + ", estatusFront=" + estatusFront + ", telefonoFront=" + telefonoFront + ", ipFront=" + ipFront + ", regionFront=" + regionFront + ", usuarioFront=" + usuarioFront + ", transaccionFront=" + transaccionFront + ", fechaInicioFront=" + fechaInicioFront + ", horaInicioFront=" + horaInicioFront + ", horaFinalFront=" + horaFinalFront + ", fechaSolicituFront=" + fechaSolicituFront + ", mailFront=" + mailFront + ", userFront=" + userFront + ", nomUser=" + nomUser + ", fechaEjecucion=" + fechaEjecucion + ", msjStatus=" + msjStatus + ", fechaCom=" + fechaCom + '}';
    }

}
