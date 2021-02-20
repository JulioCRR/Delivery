/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author VI9XXEG
 */
@Entity
@Table(name = "m2k_cat_region")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatRegion.findAll", query = "SELECT m FROM M2kCatRegion m"),
    @NamedQuery(name = "M2kCatRegion.findById", query = "SELECT m FROM M2kCatRegion m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatRegion.findByClave", query = "SELECT m FROM M2kCatRegion m WHERE m.clave = :clave"),
    @NamedQuery(name = "M2kCatRegion.findByDescripcion", query = "SELECT m FROM M2kCatRegion m WHERE m.descripcion = :descripcion")})
public class M2kCatRegion implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "clave")
    private String clave;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idRegion", fetch = FetchType.LAZY)
    private List<M2kRegistroPeticiones> m2kRegistroPeticionesList;

    public M2kCatRegion() {
    }

    public M2kCatRegion(Integer id) {
        this.id = id;
    }

    public M2kCatRegion(Integer id, String clave) {
        this.id = id;
        this.clave = clave;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @XmlTransient
    public List<M2kRegistroPeticiones> getM2kRegistroPeticionesList() {
        return m2kRegistroPeticionesList;
    }

    public void setM2kRegistroPeticionesList(List<M2kRegistroPeticiones> m2kRegistroPeticionesList) {
        this.m2kRegistroPeticionesList = m2kRegistroPeticionesList;
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
        if (!(object instanceof M2kCatRegion)) {
            return false;
        }
        M2kCatRegion other = (M2kCatRegion) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kCatRegion[ id=" + id + " ]";
    }
    
}
