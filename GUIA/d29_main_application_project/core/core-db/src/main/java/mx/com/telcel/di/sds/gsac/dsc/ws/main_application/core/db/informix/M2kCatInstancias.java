/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix;

import java.io.Serializable;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author VI9XXEG
 */
@Entity
@Table(name = "m2k_cat_instancias")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatInstancias.findAll", query = "SELECT m FROM M2kCatInstancias m"),
    @NamedQuery(name = "M2kCatInstancias.findById", query = "SELECT m FROM M2kCatInstancias m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatInstancias.findByInstancia", query = "SELECT m FROM M2kCatInstancias m WHERE m.instancia = :instancia")})
public class M2kCatInstancias implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "instancia")
    private String instancia;
    
    @OneToMany(mappedBy = "idInstancia", fetch = FetchType.LAZY)
    private List<M2kRegistroPeticiones> m2kRegistroPeticionesList;
    
    @JoinColumn(name = "server_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER)
    private M2kCatServidores serverId;

    public M2kCatInstancias() {
    }

    public M2kCatInstancias(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getInstancia() {
        return instancia;
    }

    public void setInstancia(String instancia) {
        this.instancia = instancia;
    }

    @XmlTransient
    public List<M2kRegistroPeticiones> getM2kRegistroPeticionesList() {
        return m2kRegistroPeticionesList;
    }

    public void setM2kRegistroPeticionesList(List<M2kRegistroPeticiones> m2kRegistroPeticionesList) {
        this.m2kRegistroPeticionesList = m2kRegistroPeticionesList;
    }

    public M2kCatServidores getServerId() {
        return serverId;
    }

    public void setServerId(M2kCatServidores serverId) {
        this.serverId = serverId;
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
        if (!(object instanceof M2kCatInstancias)) {
            return false;
        }
        M2kCatInstancias other = (M2kCatInstancias) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kCatInstancias[ id=" + id + " ]";
    }
    
}
