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
@Table(name = "m2k_cat_servidores")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatServidores.findAll", query = "SELECT m FROM M2kCatServidores m"),
    @NamedQuery(name = "M2kCatServidores.findById", query = "SELECT m FROM M2kCatServidores m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatServidores.findByHost", query = "SELECT m FROM M2kCatServidores m WHERE m.host = :host"),
    @NamedQuery(name = "M2kCatServidores.findByComentario", query = "SELECT m FROM M2kCatServidores m WHERE m.comentario = :comentario")})
public class M2kCatServidores implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "host")
    private String host;
    
    @Column(name = "comentario")
    private String comentario;
    
    @OneToMany(mappedBy = "serverId", fetch = FetchType.LAZY)
    private List<M2kCatInstancias> m2kCatInstanciasList;

    public M2kCatServidores() {
    }

    public M2kCatServidores(Integer id) {
        this.id = id;
    }

    public M2kCatServidores(Integer id, String host) {
        this.id = id;
        this.host = host;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @XmlTransient
    public List<M2kCatInstancias> getM2kCatInstanciasList() {
        return m2kCatInstanciasList;
    }

    public void setM2kCatInstanciasList(List<M2kCatInstancias> m2kCatInstanciasList) {
        this.m2kCatInstanciasList = m2kCatInstanciasList;
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
        if (!(object instanceof M2kCatServidores)) {
            return false;
        }
        M2kCatServidores other = (M2kCatServidores) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kCatServidores[ id=" + id + " ]";
    }
    
}
