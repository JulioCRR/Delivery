/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db;

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
@Table(name = "m2k_cat_usuarios")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatUsuarios.findAll", query = "SELECT m FROM M2kCatUsuarios m"),
    @NamedQuery(name = "M2kCatUsuarios.findById", query = "SELECT m FROM M2kCatUsuarios m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatUsuarios.findByClaveUsuario", query = "SELECT m FROM M2kCatUsuarios m WHERE m.claveUsuario = :claveUsuario"),
    @NamedQuery(name = "M2kCatUsuarios.findByDescUsuario", query = "SELECT m FROM M2kCatUsuarios m WHERE m.descUsuario = :descUsuario")})
public class M2kCatUsuarios implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "clave_usuario")
    private String claveUsuario;
    
    @Column(name = "desc_usuario")
    private String descUsuario;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idUsuario", fetch = FetchType.LAZY)
    private List<M2kRegistroPeticiones> m2kRegistroPeticionesList;

    public M2kCatUsuarios() {
    }

    public M2kCatUsuarios(Integer id) {
        this.id = id;
    }

    public M2kCatUsuarios(Integer id, String claveUsuario) {
        this.id = id;
        this.claveUsuario = claveUsuario;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClaveUsuario() {
        return claveUsuario;
    }

    public void setClaveUsuario(String claveUsuario) {
        this.claveUsuario = claveUsuario;
    }

    public String getDescUsuario() {
        return descUsuario;
    }

    public void setDescUsuario(String descUsuario) {
        this.descUsuario = descUsuario;
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
        if (!(object instanceof M2kCatUsuarios)) {
            return false;
        }
        M2kCatUsuarios other = (M2kCatUsuarios) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kCatUsuarios[ id=" + id + " ]";
    }
    
}
