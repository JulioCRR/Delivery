/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites;


import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


/**
 *
 * @author VI9XXG0
 */
@Entity
@Table(name="EI2_SOLICITUD")
public class SolicitudEIEntity implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name="id_solicitud")
    @Id
    private int idSolicitud;
    @Column(name="tramite")
    private int tramite;
    @Column(name="grupo_Nacional")
    private int grupoNacional;
    @Column(name="tipo")
    private int tipo;
    @Column(name="app")
    private int aplicacion;
    @Column(name="estatus")
    private String estatus;
    @Column(name="mensaje")
    private String mensaje;
    @Column(name="fecha_Ingreso")
    private Date fechaIngreso;
    @Column(name="fecha_Ejecucion")
    private Date fechaEjecucion;
    @Column(name="envio_resp")
    private String envioRespuesta;
    @Column(name="id_comunidad")
    private int idComudidad;

    /*
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "solicitud", fetch = FetchType.LAZY)
    private List<DetalleEntity> detalles;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "solicitud", fetch = FetchType.LAZY)
    private SolicitudProductoEntity solicitudProducto;
    */
    
    /*public SolicitudProductoEntity getSolicitudProducto() {
        return solicitudProducto;
    }

    public void setSolicitudProducto(SolicitudProductoEntity solicitudProducto) {
        this.solicitudProducto = solicitudProducto;
    }*/
    /*
    public List<DetalleEntity> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleEntity> detalles) {
        this.detalles = detalles;
    }
    */
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

    public int getTipo() {
        return tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    public int getAplicacion() {
        return aplicacion;
    }

    public void setAplicacion(int aplicacion) {
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

    public Date getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(Date fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Date getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Date fechaEjecucion) {
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

    @Override
    public String toString() {
        return "SolicitudEIEntity{" + "idSolicitud=" + idSolicitud + ", tramite=" + tramite + ", grupoNacional=" + grupoNacional + ", tipo=" + tipo + ", aplicacion=" + aplicacion + ", estatus=" + estatus + ", mensaje=" + mensaje + ", fechaIngreso=" + fechaIngreso + ", fechaEjecucion=" + fechaEjecucion + ", envioRespuesta=" + envioRespuesta + ", idComudidad=" + idComudidad + '}';
    }

   
    
    
    
    
    
}
