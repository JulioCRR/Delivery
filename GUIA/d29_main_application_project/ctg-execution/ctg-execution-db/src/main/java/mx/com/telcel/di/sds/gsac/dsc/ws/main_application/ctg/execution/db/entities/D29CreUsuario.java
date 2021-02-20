/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author VI9XXB3
 */
@Entity
@Table(name = "D29_CRE_USUARIO")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29CreUsuario.findAll", query = "SELECT d FROM D29CreUsuario d"),
    @NamedQuery(name = "D29CreUsuario.findById", query = "SELECT d FROM D29CreUsuario d WHERE d.id = :id"),
    @NamedQuery(name = "D29CreUsuario.findByAMaterno", query = "SELECT d FROM D29CreUsuario d WHERE d.aMaterno = :aMaterno"),
    @NamedQuery(name = "D29CreUsuario.findByAPaterno", query = "SELECT d FROM D29CreUsuario d WHERE d.aPaterno = :aPaterno"),
    @NamedQuery(name = "D29CreUsuario.findByCorreo", query = "SELECT d FROM D29CreUsuario d WHERE d.correo = :correo"),
    @NamedQuery(name = "D29CreUsuario.findByExtension", query = "SELECT d FROM D29CreUsuario d WHERE d.extension = :extension"),
    @NamedQuery(name = "D29CreUsuario.findByFechaAlta", query = "SELECT d FROM D29CreUsuario d WHERE d.fechaAlta = :fechaAlta"),
    @NamedQuery(name = "D29CreUsuario.findByNEmpleado", query = "SELECT d FROM D29CreUsuario d WHERE d.nEmpleado = :nEmpleado"),
    @NamedQuery(name = "D29CreUsuario.findByNombre", query = "SELECT d FROM D29CreUsuario d WHERE d.nombre = :nombre"),
    @NamedQuery(name = "D29CreUsuario.findByPassword", query = "SELECT d FROM D29CreUsuario d WHERE d.password = :password"),
    @NamedQuery(name = "D29CreUsuario.findByStatus", query = "SELECT d FROM D29CreUsuario d WHERE d.status = :status"),
    @NamedQuery(name = "D29CreUsuario.findByUsuarioRed", query = "SELECT d FROM D29CreUsuario d WHERE d.usuarioRed = :usuarioRed")})
public class D29CreUsuario implements Serializable {
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usuarioEjecucion", fetch = FetchType.LAZY)
    private List<D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 255)
    @Column(name = "A_MATERNO")
    private String aMaterno;
    @Size(max = 255)
    @Column(name = "A_PATERNO")
    private String aPaterno;
    @Size(max = 255)
    @Column(name = "CORREO")
    private String correo;
    @Size(max = 255)
    @Column(name = "EXTENSION")
    private String extension;
    @Column(name = "FECHA_ALTA")
    @Temporal(TemporalType.DATE)
    private Date fechaAlta;
    @Size(max = 255)
    @Column(name = "N_EMPLEADO")
    private String nEmpleado;
    @Size(max = 255)
    @Column(name = "NOMBRE")
    private String nombre;
    @Size(max = 255)
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "STATUS")
    private Long status;
    @Size(max = 255)
    @Column(name = "USUARIO_RED")
    private String usuarioRed;
    @Column(name= "RESPONSABLE")
    private Long responsable;
    @JoinTable(name = "D29_REL_USR_SUP", joinColumns = {
        @JoinColumn(name = "USUARIO", referencedColumnName = "ID")}, inverseJoinColumns = {
        @JoinColumn(name = "RESPONSABLE", referencedColumnName = "ID")})
    @ManyToMany(fetch = FetchType.LAZY)
    private List<D29CreUsuario> d29CreUsuarioList;
    @ManyToMany(mappedBy = "d29CreUsuarioList", fetch = FetchType.LAZY)
    private List<D29CreUsuario> d29CreUsuarioList1;
    @OneToMany(mappedBy = "idUsuarioAlta", fetch = FetchType.LAZY)
    private List<D29CreUsuario> d29CreUsuarioList2;
    @JoinColumn(name = "ID_USUARIO_ALTA", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private D29CreUsuario idUsuarioAlta;
    @JoinColumn(name = "ID_PUESTO", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private D29CrePuesto idPuesto;
    @JoinColumn(name = "ID_OFICINA", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private D29CreOficina idOficina;
    @JoinColumn(name = "ID_AREA", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private D29CreArea idArea;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "responsableAutorizacion", fetch = FetchType.LAZY)
    private List<D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "solicitante", fetch = FetchType.LAZY)
    private List<D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList1;

    public D29CreUsuario() {
    }

    public D29CreUsuario(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAMaterno() {
        return aMaterno;
    }

    public void setAMaterno(String aMaterno) {
        this.aMaterno = aMaterno;
    }

    public String getAPaterno() {
        return aPaterno;
    }

    public void setAPaterno(String aPaterno) {
        this.aPaterno = aPaterno;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Date getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(Date fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getNEmpleado() {
        return nEmpleado;
    }

    public void setNEmpleado(String nEmpleado) {
        this.nEmpleado = nEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public String getUsuarioRed() {
        return usuarioRed;
    }

    public void setUsuarioRed(String usuarioRed) {
        this.usuarioRed = usuarioRed;
    }

    public Long getResponsable() {
        return responsable;
    }

    public void setResponsable(Long responsable) {
        this.responsable = responsable;
    }
    
    @XmlTransient
    public List<D29CreUsuario> getD29CreUsuarioList() {
        return d29CreUsuarioList;
    }

    public void setD29CreUsuarioList(List<D29CreUsuario> d29CreUsuarioList) {
        this.d29CreUsuarioList = d29CreUsuarioList;
    }

    @XmlTransient
    public List<D29CreUsuario> getD29CreUsuarioList1() {
        return d29CreUsuarioList1;
    }

    public void setD29CreUsuarioList1(List<D29CreUsuario> d29CreUsuarioList1) {
        this.d29CreUsuarioList1 = d29CreUsuarioList1;
    }

    @XmlTransient
    public List<D29CreUsuario> getD29CreUsuarioList2() {
        return d29CreUsuarioList2;
    }

    public void setD29CreUsuarioList2(List<D29CreUsuario> d29CreUsuarioList2) {
        this.d29CreUsuarioList2 = d29CreUsuarioList2;
    }

    public D29CreUsuario getIdUsuarioAlta() {
        return idUsuarioAlta;
    }

    public void setIdUsuarioAlta(D29CreUsuario idUsuarioAlta) {
        this.idUsuarioAlta = idUsuarioAlta;
    }

    public D29CrePuesto getIdPuesto() {
        return idPuesto;
    }

    public void setIdPuesto(D29CrePuesto idPuesto) {
        this.idPuesto = idPuesto;
    }

    public D29CreOficina getIdOficina() {
        return idOficina;
    }

    public void setIdOficina(D29CreOficina idOficina) {
        this.idOficina = idOficina;
    }

    public D29CreArea getIdArea() {
        return idArea;
    }

    public void setIdArea(D29CreArea idArea) {
        this.idArea = idArea;
    }

    @XmlTransient
    public List<D29SolicitudAmbienteCtg> getD29SolicitudAmbienteCtgList() {
        return d29SolicitudAmbienteCtgList;
    }

    public void setD29SolicitudAmbienteCtgList(List<D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList) {
        this.d29SolicitudAmbienteCtgList = d29SolicitudAmbienteCtgList;
    }

    @XmlTransient
    public List<D29SolicitudAmbienteCtg> getD29SolicitudAmbienteCtgList1() {
        return d29SolicitudAmbienteCtgList1;
    }

    public void setD29SolicitudAmbienteCtgList1(List<D29SolicitudAmbienteCtg> d29SolicitudAmbienteCtgList1) {
        this.d29SolicitudAmbienteCtgList1 = d29SolicitudAmbienteCtgList1;
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
        if (!(object instanceof D29CreUsuario)) {
            return false;
        }
        D29CreUsuario other = (D29CreUsuario) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario[ id=" + id + " ]";
    }

    @XmlTransient
    public List<D29BitacoraEjecucionesCtg> getD29BitacoraEjecucionesCtgList() {
        return d29BitacoraEjecucionesCtgList;
    }

    public void setD29BitacoraEjecucionesCtgList(List<D29BitacoraEjecucionesCtg> d29BitacoraEjecucionesCtgList) {
        this.d29BitacoraEjecucionesCtgList = d29BitacoraEjecucionesCtgList;
    }
    
}
