/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author VI9XXEG
 */
@Entity
@Table(name = "m2k_tbl_registro_peticiones")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kRegistroPeticiones.findAll", query = "SELECT m FROM M2kRegistroPeticiones m"),
    @NamedQuery(name = "M2kRegistroPeticiones.findByIdPeticion", query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.idPeticion = :idPeticion"),
    @NamedQuery(name = "M2kRegistroPeticiones.findByTiempoConector", query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.tiempoConector = :tiempoConector"),
    @NamedQuery(name = "M2kRegistroPeticiones.findByTiempoEjecucion", query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.tiempoEjecucion = :tiempoEjecucion"),
    @NamedQuery(name = "M2kRegistroPeticiones.findById", query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.id = :id"),
    @NamedQuery(name = "M2kRegistroPeticiones.findByFechaPeticion", query = "SELECT m FROM M2kRegistroPeticiones m WHERE m.fechaPeticion2 = :fechaPeticion2")})
public class M2kRegistroPeticiones implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "id_peticion")
    private String idPeticion;
    
    @Column(name = "tiempo_conector")
    private Integer tiempoConector;
    
    @Column(name = "tiempo_ejecucion")
    private Integer tiempoEjecucion;
    
    @Column(name = "ip_origen")
    private String ipOrigen;
    
    @Column(name = "fecha_peticion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaPeticion2;
    
    @JoinColumn(name = "id_cadenas", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kTblPeticiones peticionm2k;
    
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatUsuarios idUsuario;
    
    @JoinColumn(name = "id_transaccion", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatTransacciones idTransaccion;
    
    @JoinColumn(name = "id_tipo_respuesta", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatTipoRespuesta idTipoRespuesta;
    
    @JoinColumn(name = "id_region", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatRegion idRegion;
    
    @JoinColumn(name = "id_instancia", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private M2kCatInstancias idInstancia;
    
    @JoinColumn(name = "id_conector", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatConectors idConector;
    
    @JoinColumn(name = "id_accion", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private M2kCatAccion2 idAccion;

    public M2kRegistroPeticiones() {
    }

    public M2kRegistroPeticiones(Integer id) {
        this.id = id;
    }

    public M2kRegistroPeticiones(Integer id, String idPeticion) {
        this.id = id;
        this.idPeticion = idPeticion;
    }

    public String getIdPeticion() {
        return idPeticion;
    }

    public void setIdPeticion(String idPeticion) {
        this.idPeticion = idPeticion;
    }

    public Integer getTiempoConector() {
        return tiempoConector;
    }

    public void setTiempoConector(Integer tiempoConector) {
        this.tiempoConector = tiempoConector;
    }

    public Integer getTiempoEjecucion() {
        return tiempoEjecucion;
    }

    public void setTiempoEjecucion(Integer tiempoEjecucion) {
        this.tiempoEjecucion = tiempoEjecucion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaPeticion2() {
        return fechaPeticion2;
    }

    public void setFechaPeticion2(Date fechaPeticion2) {
        this.fechaPeticion2 = fechaPeticion2;
    }

    public M2kTblPeticiones getPeticionm2k() {
        return peticionm2k;
    }

    public void setPeticionm2k(M2kTblPeticiones peticionm2k) {
        this.peticionm2k = peticionm2k;
    }

    public M2kCatUsuarios getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(M2kCatUsuarios idUsuario) {
        this.idUsuario = idUsuario;
    }

    public M2kCatTransacciones getIdTransaccion() {
        return idTransaccion;
    }

    public void setIdTransaccion(M2kCatTransacciones idTransaccion) {
        this.idTransaccion = idTransaccion;
    }

    public M2kCatTipoRespuesta getIdTipoRespuesta() {
        return idTipoRespuesta;
    }

    public void setIdTipoRespuesta(M2kCatTipoRespuesta idTipoRespuesta) {
        this.idTipoRespuesta = idTipoRespuesta;
    }

    public M2kCatRegion getIdRegion() {
        return idRegion;
    }

    public void setIdRegion(M2kCatRegion idRegion) {
        this.idRegion = idRegion;
    }

    public M2kCatInstancias getIdInstancia() {
        return idInstancia;
    }

    public void setIdInstancia(M2kCatInstancias idInstancia) {
        this.idInstancia = idInstancia;
    }

    public M2kCatConectors getIdConector() {
        return idConector;
    }

    public void setIdConector(M2kCatConectors idConector) {
        this.idConector = idConector;
    }

    public M2kCatAccion2 getIdAccion() {
        return idAccion;
    }

    public void setIdAccion(M2kCatAccion2 idAccion) {
        this.idAccion = idAccion;
    }

    public String getIpOrigen() {
        return ipOrigen;
    }

    public void setIpOrigen(String ipOrigen) {
        this.ipOrigen = ipOrigen;
    }

    
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof M2kRegistroPeticiones)) {
            return false;
        }
        M2kRegistroPeticiones other = (M2kRegistroPeticiones) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kRegistroPeticiones[ id=" + id + " ]";
    }
    
}
