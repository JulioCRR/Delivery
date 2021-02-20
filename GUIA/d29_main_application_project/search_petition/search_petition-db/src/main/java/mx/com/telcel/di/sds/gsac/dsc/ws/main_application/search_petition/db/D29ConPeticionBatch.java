/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;



/**
 *
 * @author bermudezja
 */
@Entity
@Table(name = "D29_CON_PETICION_BATCH")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29ConPeticionBatch.findAll", query = "SELECT d FROM D29ConPeticionBatch d"),
    @NamedQuery(name = "D29ConPeticionBatch.findByIdfolio", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.idfolio = :idfolio"),
    @NamedQuery(name = "D29ConPeticionBatch.findByTelefonoPet", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.telefonoPet = :telefonoPet"),
    @NamedQuery(name = "D29ConPeticionBatch.findByIpPet", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.ipPet = :ipPet"),
    @NamedQuery(name = "D29ConPeticionBatch.findByRegionPet", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.regionPet = :regionPet"),
    @NamedQuery(name = "D29ConPeticionBatch.findByUsuarioPet", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.usuarioPet = :usuarioPet"),
    @NamedQuery(name = "D29ConPeticionBatch.findByTransaccionPet", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.transaccionPet = :transaccionPet"),
    @NamedQuery(name = "D29ConPeticionBatch.findByFechaInicio", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.fechaInicio = :fechaInicio"),
    @NamedQuery(name = "D29ConPeticionBatch.findByHoraInicio", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.horaInicio = :horaInicio"),
    @NamedQuery(name = "D29ConPeticionBatch.findByHoraFinal", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.horaFinal = :horaFinal"),
    @NamedQuery(name = "D29ConPeticionBatch.findByFechaSolicitud", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.fechaSolicitud = :fechaSolicitud"),
    @NamedQuery(name = "D29ConPeticionBatch.findByFechaProcesamineto", query = "SELECT d FROM D29ConPeticionBatch d WHERE d.fechaProcesamineto = :fechaProcesamineto")})
public class D29ConPeticionBatch implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "IDFOLIO")
    private Long idfolio;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "TELEFONO_PET")
    private String telefonoPet;
    @Size(max = 15)
    @Column(name = "IP_PET")
    private String ipPet;
    @Size(max = 1)
    @Column(name = "REGION_PET")
    private String regionPet;
    @Size(max = 8)
    @Column(name = "USUARIO_PET")
    private String usuarioPet;
    @Size(max = 4)
    @Column(name = "TRANSACCION_PET")
    private String transaccionPet;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_INICIO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicio;
    @Basic(optional = false)
    @NotNull
    @Column(name = "HORA_INICIO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaInicio;
    @Basic(optional = false)
    @NotNull
    @Column(name = "HORA_FINAL")
    @Temporal(TemporalType.TIMESTAMP)
    private Date horaFinal;
    @Basic(optional = false)
    @NotNull
    @Column(name = "FECHA_SOLICITUD")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaSolicitud;
    @Basic(optional = false)
    @Column(name = "FECHA_PROCESAMINETO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaProcesamineto;
    @JoinColumn(name = "ESTATUS_PET", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private D29EstatusBatch estatusPet;
    @JoinColumn(name = "ID_USUARIO_BATCH", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private Usuario idusuariobatch;

    public Usuario getIdusuariobatch() {
        return idusuariobatch;
    }

    public void setIdusuariobatch(Usuario idusuariobatch) {
        this.idusuariobatch = idusuariobatch;
    }


    public D29ConPeticionBatch() {
    }

    public D29ConPeticionBatch(Long idfolio) {
        this.idfolio = idfolio;
    }

    public D29ConPeticionBatch(Long idfolio, String telefonoPet, Date fechaInicio, Date horaInicio, Date horaFinal, Date fechaSolicitud) {
        this.idfolio = idfolio;
        this.telefonoPet = telefonoPet;
        this.fechaInicio = fechaInicio;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.fechaSolicitud = fechaSolicitud;
    }

    public Long getIdfolio() {
        return idfolio;
    }

    public void setIdfolio(Long idfolio) {
        this.idfolio = idfolio;
    }

    public String getTelefonoPet() {
        return telefonoPet;
    }

    public void setTelefonoPet(String telefonoPet) {
        this.telefonoPet = telefonoPet;
    }

    public String getIpPet() {
        return ipPet;
    }

    public void setIpPet(String ipPet) {
        this.ipPet = ipPet;
    }

    public String getRegionPet() {
        return regionPet;
    }

    public void setRegionPet(String regionPet) {
        this.regionPet = regionPet;
    }

    public String getUsuarioPet() {
        return usuarioPet;
    }

    public void setUsuarioPet(String usuarioPet) {
        this.usuarioPet = usuarioPet;
    }

    public String getTransaccionPet() {
        return transaccionPet;
    }

    public void setTransaccionPet(String transaccionPet) {
        this.transaccionPet = transaccionPet;
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

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public Date getFechaProcesamineto() {
        return fechaProcesamineto;
    }

    public void setFechaProcesamineto(Date fechaProcesamineto) {
        this.fechaProcesamineto = fechaProcesamineto;
    }

    public D29EstatusBatch getEstatusPet() {
        return estatusPet;
    }

    public void setEstatusPet(D29EstatusBatch estatusPet) {
        this.estatusPet = estatusPet;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idfolio != null ? idfolio.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof D29ConPeticionBatch)) {
            return false;
        }
        D29ConPeticionBatch other = (D29ConPeticionBatch) object;
        if ((this.idfolio == null && other.idfolio != null) || (this.idfolio != null && !this.idfolio.equals(other.idfolio))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch[ idfolio=" + idfolio + " ]";
    }

    public void getIdfolio(Object next) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

   

   
    
}
