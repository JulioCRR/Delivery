/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db;

import java.io.Serializable;
import java.util.Collection;
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
 * @author vi9xxeg
 */
@Entity
@Table(name = "m2k_cat_accion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatAccion.findAll", query = "SELECT m FROM M2kCatAccion m"),
    @NamedQuery(name = "M2kCatAccion.findById", query = "SELECT m FROM M2kCatAccion m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatAccion.findByClave", query = "SELECT m FROM M2kCatAccion m WHERE m.clave = :clave"),
    @NamedQuery(name = "M2kCatAccion.findByDescripcion", query = "SELECT m FROM M2kCatAccion m WHERE m.descripcion = :descripcion")})
public class M2kCatAccion implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "clave")
    private String clave;

    @Column(name = "descripcion")
    private String descripcion;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "m2kCatAccion", fetch = FetchType.LAZY)
    private Collection<M2kRelAccionTransaccionFront> m2kRelAccionTransaccionFrontCollection;

    public M2kCatAccion() {
    }

    public M2kCatAccion(int id) {
        this.id = id;
    }

    public M2kCatAccion(int id, String clave) {
        this.id = id;
        this.clave = clave;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
    public Collection<M2kRelAccionTransaccionFront> getM2kRelAccionTransaccionFrontCollection() {
        return m2kRelAccionTransaccionFrontCollection;
    }

    public void setM2kRelAccionTransaccionFrontCollection(Collection<M2kRelAccionTransaccionFront> m2kRelAccionTransaccionFrontCollection) {
        this.m2kRelAccionTransaccionFrontCollection = m2kRelAccionTransaccionFrontCollection;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatAccion[ id=" + id + " ]";
    }
    
}
