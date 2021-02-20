/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Entity
@Table(name = "D29_BITACORA_EJECUCIONES_CTG")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findAll", query = "SELECT d FROM D29BitacoraEjecucionesCtg d"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findById", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.id = :id"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findByFechaEjecucion", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.fechaEjecucion = :fechaEjecucion"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findByCadenaEnviada", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.cadenaEnviada = :cadenaEnviada"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findByRespuestaPrograma", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.respuestaPrograma = :respuestaPrograma"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findByRespuestaXml", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.respuestaXml = :respuestaXml"),
    @NamedQuery(name = "D29BitacoraEjecucionesCtg.findByRespuestaCtg", query = "SELECT d FROM D29BitacoraEjecucionesCtg d WHERE d.respuestaCtg = :respuestaCtg")})
public class D29BitacoraEjecucionesCtg implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF + "BITACORA_CTG_SEQ", sequenceName = DBConstants.DB_PREF + "BITACORA_CTG_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF + "BITACORA_CTG_SEQ")
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_EJECUCION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaEjecucion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 3536)
    @Column(name = "CADENA_ENVIADA")
    private String cadenaEnviada;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RESP_PRG")
    private String respuestaPrograma;
    @Basic(optional = false)
    @NotNull
    @Column(name = "RESP_XML")
    private String respuestaXml;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "RESPUESTA_CTG")
    private String respuestaCtg;
    @JoinColumn(name = "SOLICITUD_CTG", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private D29SolicitudAmbienteCtg solicitudCtg;
    @JoinColumn(name = "USUARIO_EJECUCION", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private D29CreUsuario usuarioEjecucion;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "AMBIENTE")
    private String ambiente;
    
    public D29BitacoraEjecucionesCtg() {
    }

    public D29BitacoraEjecucionesCtg(Integer id) {
        this.id = id;
    }

    public D29BitacoraEjecucionesCtg(Integer id, Date fechaEjecucion, String cadenaEnviada, String respuestaPrograma, String respuestaXml, String respuestaCtg) {
        this.id = id;
        this.fechaEjecucion = fechaEjecucion;
        this.cadenaEnviada = cadenaEnviada;
        this.respuestaPrograma = respuestaPrograma;
        this.respuestaXml = respuestaXml;
        this.respuestaCtg = respuestaCtg;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Date fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public String getCadenaEnviada() {
        return cadenaEnviada;
    }

    public void setCadenaEnviada(String cadenaEnviada) {
        this.cadenaEnviada = cadenaEnviada;
    }

    public String getRespuestaPrograma() {
        return respuestaPrograma;
    }

    public void setRespuestaPrograma(String respuestaPrograma) {
        this.respuestaPrograma = respuestaPrograma;
    }

    public String getRespuestaXml() {
        return respuestaXml;
    }

    public void setRespuestaXml(String respuestaXml) {
        this.respuestaXml = respuestaXml;
    }

    public String getRespuestaCtg() {
        return respuestaCtg;
    }

    public void setRespuestaCtg(String respuestaCtg) {
        this.respuestaCtg = respuestaCtg;
    }

    public D29SolicitudAmbienteCtg getSolicitudCtg() {
        return solicitudCtg;
    }

    public void setSolicitudCtg(D29SolicitudAmbienteCtg solicitudCtg) {
        this.solicitudCtg = solicitudCtg;
    }

    public D29CreUsuario getUsuarioEjecucion() {
        return usuarioEjecucion;
    }

    public void setUsuarioEjecucion(D29CreUsuario usuarioEjecucion) {
        this.usuarioEjecucion = usuarioEjecucion;
    }

    public String getAmbiente() {
        return ambiente;
    }

    public void setAmbiente(String ambiente) {
        this.ambiente = ambiente;
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
        if (!(object instanceof D29BitacoraEjecucionesCtg)) {
            return false;
        }
        D29BitacoraEjecucionesCtg other = (D29BitacoraEjecucionesCtg) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29BitacoraEjecucionesCtg[ id=" + id + " ]";
    }
    
}
