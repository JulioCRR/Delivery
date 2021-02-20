/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author VI9XXG0
 */
@Entity
@Table(name="EI2C_SOLICITUD_PRODUCTOS")
public class SolicitudProductoEntity implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name="id_solicitud")
    @Id
    private int idSolicitud;
    
    @Column(name="usuario")
    private String usuario ;
    
    @Column(name="tipo_grupo")
    @Id
    private String tipoGrupo ;
    
    @Column(name="prod_loc")
    private String productoLocal ;
    
    @Column(name="prod_nac")
    private String productoNacional ;
    
    @Column(name="prod_ext")
    private String productoExt ;
    
    @Column(name="pivote")
    private int pivote ;
    
    @Column(name="serviceOffering")
    private String serviceOffering ;
    
    @JoinColumn(name = "id_solicitud", referencedColumnName = "id_solicitud")
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    private SolicitudEIEntity solicitud;

    public SolicitudEIEntity getSolicitud() {
        return solicitud;
    }

    public void setSolicitud(SolicitudEIEntity solicitud) {
        this.solicitud = solicitud;
    }

    
    
    public int getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(int idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTipoGrupo() {
        return tipoGrupo;
    }

    public void setTipoGrupo(String tipoGrupo) {
        this.tipoGrupo = tipoGrupo;
    }

    public String getProductoLocal() {
        return productoLocal;
    }

    public void setProductoLocal(String productoLocal) {
        this.productoLocal = productoLocal;
    }

    public String getProductoNacional() {
        return productoNacional;
    }

    public void setProductoNacional(String productoNacional) {
        this.productoNacional = productoNacional;
    }

    public String getProductoExt() {
        return productoExt;
    }

    public void setProductoExt(String productoExt) {
        this.productoExt = productoExt;
    }

    public int getPivote() {
        return pivote;
    }

    public void setPivote(int pivote) {
        this.pivote = pivote;
    }

    public String getServiceOffering() {
        return serviceOffering;
    }

    public void setServiceOffering(String serviceOffering) {
        this.serviceOffering = serviceOffering;
    }
    
    
    
    
}
