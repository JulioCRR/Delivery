/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author VI9XXB3
 */
@Entity
@Table(name = "D29_SOLICITUD_AMBIENTE_CTG")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findAll", query = "SELECT d FROM D29SolicitudAmbienteCtg d"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findById", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.id = :id"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByFechaCreacion", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.fechaCreacion = :fechaCreacion"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByFechaSolicitud", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.fechaSolicitud = :fechaSolicitud"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByHoraInicio", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.horaInicio = :horaInicio"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByHoraFin", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.horaFin = :horaFin"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByFolio", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.folio = :folio"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByConsecutivo", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.consecutivo = :consecutivo"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByTransaccion", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.transaccion = :transaccion"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByNumTotalTransacciones", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.numTotalTransacciones = :numTotalTransacciones"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByProyectoAsociado", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.proyectoAsociado = :proyectoAsociado"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByComentarios", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.comentarios = :comentarios"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByEstatus", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.estatus = :estatus"),
    @NamedQuery(name = "D29SolicitudAmbienteCtg.findByFechaAprobacion", query = "SELECT d FROM D29SolicitudAmbienteCtg d WHERE d.fechaAprobacion = :fechaAprobacion")})
public class D29SolicitudAmbienteCtg implements Serializable {
    
    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF + "SOL_AMBIENTE_SEQ", sequenceName = DBConstants.DB_PREF + "SOL_AMBIENTE_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF + "SOL_AMBIENTE_SEQ")
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_CREACION")
    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_SOLICITUD")
    @Temporal(TemporalType.DATE)
    private Date fechaSolicitud;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 5)
    @Column(name = "HORA_INICIO")
    private String horaInicio;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 5)
    @Column(name = "HORA_FIN")
    private String horaFin;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "FOLIO")
    private String folio;
    @Basic(optional = false)
    @NotNull
    @Column(name = "CONSECUTIVO")
    private BigInteger consecutivo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 5)
    @Column(name = "TRANSACCION")
    private String transaccion;
    @Basic(optional = false)
    @NotNull
    @Column(name = "NUM_TOTAL_TRANSACCIONES")
    private BigInteger numTotalTransacciones;
    @Size(max = 20)
    @Column(name = "PROYECTO_ASOCIADO")
    private String proyectoAsociado;
    @Size(max = 250)
    @Column(name = "COMENTARIOS")
    private String comentarios;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 3)
    @Column(name = "ESTATUS")
    private String estatus;
    @Column(name = "FECHA_APROBACION")
    @Temporal(TemporalType.DATE)
    private Date fechaAprobacion;
    @Size(max = 10)
    @Column(name = "USUARIO_M2K")
    private String usuarioM2k;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "AMBIENTE")
    private String ambiente;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "PROGRAMA")
    private String programa;
    @JoinColumn(name = "RESPONSABLE_AUTORIZACION", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private D29CreUsuario responsableAutorizacion;
    @JoinColumn(name = "SOLICITANTE", referencedColumnName = "ID")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private D29CreUsuario solicitante;
    //@Basic(optional = false)
    @Column(name = "FECHA_CADUCIDAD_SOL")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCaducidad;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "solicitudCtg", fetch = FetchType.LAZY)
    private List<D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList;
    
    /**
     * Variable utilizada para llevar un conteo de ejecuciones CTG.
     */
    @javax.persistence.Transient
    @JsonSerialize
    @JsonDeserialize
    private int countEjecuciones;
    
    public D29SolicitudAmbienteCtg() {
    }

    public D29SolicitudAmbienteCtg(Integer id) {
        this.id = id;
    }

    public D29SolicitudAmbienteCtg(Integer id, Date fechaCreacion, Date fechaSolicitud, String horaInicio, String horaFin, String folio, BigInteger consecutivo, String transaccion, BigInteger numTotalTransacciones, String estatus) {
        this.id = id;
        this.fechaCreacion = fechaCreacion;
        this.fechaSolicitud = fechaSolicitud;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.folio = folio;
        this.consecutivo = consecutivo;
        this.transaccion = transaccion;
        this.numTotalTransacciones = numTotalTransacciones;
        this.estatus = estatus;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public String getFolio() {
        return folio;
    }

    public void setFolio(String folio) {
        this.folio = folio;
    }

    public BigInteger getConsecutivo() {
        return consecutivo;
    }

    public void setConsecutivo(BigInteger consecutivo) {
        this.consecutivo = consecutivo;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public BigInteger getNumTotalTransacciones() {
        return numTotalTransacciones;
    }

    public void setNumTotalTransacciones(BigInteger numTotalTransacciones) {
        this.numTotalTransacciones = numTotalTransacciones;
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

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public Date getFechaAprobacion() {
        return fechaAprobacion;
    }

    public void setFechaAprobacion(Date fechaAprobacion) {
        this.fechaAprobacion = fechaAprobacion;
    }

    public D29CreUsuario getResponsableAutorizacion() {
        return responsableAutorizacion;
    }

    public void setResponsableAutorizacion(D29CreUsuario responsableAutorizacion) {
        this.responsableAutorizacion = responsableAutorizacion;
    }

    public D29CreUsuario getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(D29CreUsuario solicitante) {
        this.solicitante = solicitante;
    }

    public String getUsuarioM2k() {
        return usuarioM2k;
    }

    public void setUsuarioM2k(String usuarioM2k) {
        this.usuarioM2k = usuarioM2k;
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

    public int getCountEjecuciones() {
        return countEjecuciones;
    }

    public void setCountEjecuciones(int countEjecuciones) {
        this.countEjecuciones = countEjecuciones;
    }

    public Date getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(Date fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
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
        if (!(object instanceof D29SolicitudAmbienteCtg)) {
            return false;
        }
        D29SolicitudAmbienteCtg other = (D29SolicitudAmbienteCtg) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg[ id=" + id + " ]";
    }

    @XmlTransient
    public List<D29BitacoraEjecucionesCtg> getD29BitacoraEjecucionesCtgList() {
        return d29BitacoraEjecucionesCtgList;
    }

    public void setD29BitacoraEjecucionesCtgList(List<D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList) {
        this.d29BitacoraEjecucionesCtgList = d29BitacoraEjecucionesCtgList;
    }
    
}
