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
@Table(name = "m2k_tbl_peticiones")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kTblPeticiones.findAll", query = "SELECT m FROM M2kTblPeticiones m"),
    @NamedQuery(name = "M2kTblPeticiones.findById", query = "SELECT m FROM M2kTblPeticiones m WHERE m.id = :id"),
    })
public class M2kTblPeticiones implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "requestxml")
    private String requestxml;
    
    @Column(name = "responsexml")
    private String responsexml;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "peticionm2k", fetch = FetchType.LAZY)
    private List<M2kRegistroPeticiones> m2kRegistroPeticionesList;

    public M2kTblPeticiones() {
    }

    public M2kTblPeticiones(Integer id) {
        this.id = id;
    }

    public M2kTblPeticiones(Integer id, String requestxml, String responsexml) {
        this.id = id;
        this.requestxml = requestxml;
        this.responsexml = responsexml;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRequestxml() {
        return requestxml;
    }

    public void setRequestxml(String requestxml) {
        this.requestxml = requestxml;
    }

    public String getResponsexml() {
        return responsexml;
    }

    public void setResponsexml(String responsexml) {
        this.responsexml = responsexml;
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
        if (!(object instanceof M2kTblPeticiones)) {
            return false;
        }
        M2kTblPeticiones other = (M2kTblPeticiones) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kTblPeticiones[ id=" + id + " ]";
    }
    
}
