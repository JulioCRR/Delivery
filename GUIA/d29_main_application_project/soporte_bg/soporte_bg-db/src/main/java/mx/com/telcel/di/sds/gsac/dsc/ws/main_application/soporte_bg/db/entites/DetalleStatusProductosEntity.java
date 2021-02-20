/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author VI9XXG0
 */
@Entity
@Table(name="EI2C_DETALLE_STAT_PROD")
public class DetalleStatusProductosEntity implements Serializable {
    
    @Column(name="id_solicitud")
    @Id
    private int idSolicitud;
    
    @Column(name="telefono")
    @Id
    private String telefono;
    
    @Column(name="stat_prod_loc")
    private String estatusProductoLocal;
    
    @Column(name="stat_prod_nac")
    private String estatusProductoNacional;
    
    @Column(name="stat_prod_ext")
    private String estatusProductoExt;

    
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

    public String getEstatusProductoLocal() {
        return estatusProductoLocal;
    }

    public void setEstatusProductoLocal(String estatusProductoLocal) {
        this.estatusProductoLocal = estatusProductoLocal;
    }

    public String getEstatusProductoNacional() {
        return estatusProductoNacional;
    }

    public void setEstatusProductoNacional(String estatusProductoNacional) {
        this.estatusProductoNacional = estatusProductoNacional;
    }

    public String getEstatusProductoExt() {
        return estatusProductoExt;
    }

    public void setEstatusProductoExt(String estatusProductoExt) {
        this.estatusProductoExt = estatusProductoExt;
    }
    
    
    
}
