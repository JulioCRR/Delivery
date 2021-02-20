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
@Table(name = "m2k_cat_transacciones")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatTransacciones.findAll", query = "SELECT m FROM M2kCatTransacciones m"),
    @NamedQuery(name = "M2kCatTransacciones.findById", query = "SELECT m FROM M2kCatTransacciones m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatTransacciones.findByTransaccion", query = "SELECT m FROM M2kCatTransacciones m WHERE m.transaccion = :transaccion"),
    @NamedQuery(name = "M2kCatTransacciones.findByPantalla", query = "SELECT m FROM M2kCatTransacciones m WHERE m.pantalla = :pantalla")})
public class M2kCatTransacciones implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "transaccion")
    private String transaccion;
    
    @Column(name = "pantalla")
    private String pantalla;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idTransaccion", fetch = FetchType.LAZY)
    private List<M2kRegistroPeticiones> m2kRegistroPeticionesList;

    public M2kCatTransacciones() {
    }

    public M2kCatTransacciones(Integer id) {
        this.id = id;
    }

    public M2kCatTransacciones(Integer id, String transaccion) {
        this.id = id;
        this.transaccion = transaccion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public String getPantalla() {
        return pantalla;
    }

    public void setPantalla(String pantalla) {
        this.pantalla = pantalla;
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
        if (!(object instanceof M2kCatTransacciones)) {
            return false;
        }
        M2kCatTransacciones other = (M2kCatTransacciones) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.M2kCatTransacciones[ id=" + id + " ]";
    }
    
}
