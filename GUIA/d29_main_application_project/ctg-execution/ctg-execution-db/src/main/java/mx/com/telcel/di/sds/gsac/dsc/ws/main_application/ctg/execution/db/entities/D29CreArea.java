/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author VI9XXB3
 */
@Entity
@Table(name = "D29_CRE_AREA")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "D29CreArea.findAll", query = "SELECT d FROM D29CreArea d"),
    @NamedQuery(name = "D29CreArea.findById", query = "SELECT d FROM D29CreArea d WHERE d.id = :id"),
    @NamedQuery(name = "D29CreArea.findByClave", query = "SELECT d FROM D29CreArea d WHERE d.clave = :clave"),
    @NamedQuery(name = "D29CreArea.findByNombre", query = "SELECT d FROM D29CreArea d WHERE d.nombre = :nombre")})
public class D29CreArea implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 255)
    @Column(name = "CLAVE")
    private String clave;
    @Size(max = 255)
    @Column(name = "NOMBRE")
    private String nombre;
    @OneToMany(mappedBy = "idAreaPadre", fetch = FetchType.LAZY)
    private List<D29CreArea> d29CreAreaList;
    @JoinColumn(name = "ID_AREA_PADRE", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private D29CreArea idAreaPadre;
    @OneToMany(mappedBy = "idArea", fetch = FetchType.LAZY)
    private List<D29CreUsuario> d29CreUsuarioList;

    public D29CreArea() {
    }

    public D29CreArea(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @XmlTransient
    public List<D29CreArea> getD29CreAreaList() {
        return d29CreAreaList;
    }

    public void setD29CreAreaList(List<D29CreArea> d29CreAreaList) {
        this.d29CreAreaList = d29CreAreaList;
    }

    public D29CreArea getIdAreaPadre() {
        return idAreaPadre;
    }

    public void setIdAreaPadre(D29CreArea idAreaPadre) {
        this.idAreaPadre = idAreaPadre;
    }

    @XmlTransient
    public List<D29CreUsuario> getD29CreUsuarioList() {
        return d29CreUsuarioList;
    }

    public void setD29CreUsuarioList(List<D29CreUsuario> d29CreUsuarioList) {
        this.d29CreUsuarioList = d29CreUsuarioList;
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
        if (!(object instanceof D29CreArea)) {
            return false;
        }
        D29CreArea other = (D29CreArea) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreArea[ id=" + id + " ]";
    }
    
}
