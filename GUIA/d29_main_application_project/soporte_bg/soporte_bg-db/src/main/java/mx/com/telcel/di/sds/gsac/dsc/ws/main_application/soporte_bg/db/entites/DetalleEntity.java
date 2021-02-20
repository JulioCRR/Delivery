/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


/**
 *
 * @author VI9XXG0
 */
@Entity
@Table(name="EI2_DETALLE")
public class DetalleEntity implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name="id_solicitud")
    @Id
    private int idSolicitud;
    @Id
    @Column(name="telefono")
    private String telefono;
    
    @Column(name="region")
    private String region;
    
    @Column(name="estatus")
    private String estatus;
    
    @Column(name="codigo")
    private String codigo;
    
    @Column(name="fecha_Ejecucion")
    private Date fechaEjecucion;
    
    @Column(name="mensaje")
    private String mensaje;
    
    @Column(name="producto")
    private String producto;
    
    /*
    @JoinColumn(name = "id_solicitud", referencedColumnName = "id_solicitud")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private SolicitudEIEntity solicitud;

    public SolicitudEIEntity getSolicitud() {
        return solicitud;
    }

    public void setSolicitud(SolicitudEIEntity solicitud) {
        this.solicitud = solicitud;
    }
    */
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

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Date getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Date fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    @Override
    public String toString() {
        return "DetalleEntity{" + "idSolicitud=" + idSolicitud + ", telefono=" + telefono + ", region=" + region + ", estatus=" + estatus + ", codigo=" + codigo + ", fechaEjecucion=" + fechaEjecucion + ", mensaje=" + mensaje + ", producto=" + producto + '}';
    }
    
    
    
    
}
