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
@Table(name = "m2k_cat_transacciones_front")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kCatTransaccionesFront.findAll", query = "SELECT m FROM M2kCatTransaccionesFront m"),
    @NamedQuery(name = "M2kCatTransaccionesFront.findById", query = "SELECT m FROM M2kCatTransaccionesFront m WHERE m.id = :id"),
    @NamedQuery(name = "M2kCatTransaccionesFront.findByTransaccion", query = "SELECT m FROM M2kCatTransaccionesFront m WHERE m.transaccion = :transaccion"),
    @NamedQuery(name = "M2kCatTransaccionesFront.findByNombrePantalla", query = "SELECT m FROM M2kCatTransaccionesFront m WHERE m.nombrePantalla = :nombrePantalla")})
public class M2kCatTransaccionesFront implements Serializable {
   
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "transaccion")
    private String transaccion;

    @Column(name = "nombre_pantalla")
    private String nombrePantalla;

    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name="responsable_m2k")
    private String responsableM2k;
    
    @Column (name="correspondencia")
    private String correspondencia;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "m2kCatTransaccionesFront", fetch = FetchType.LAZY)
    private Collection<M2kRelAccionTransaccionFront> m2kRelAccionTransaccionFrontCollection;

    public M2kCatTransaccionesFront() {
    }

    public M2kCatTransaccionesFront(Integer id) {
        this.id = id;
    }

    public M2kCatTransaccionesFront(Integer id, String transaccion, String nombrePantalla, String responsableM2k, String correspondencia) {
        this.id = id;
        this.transaccion = transaccion;
        this.nombrePantalla = nombrePantalla;
        this.responsableM2k=responsableM2k;
        this.correspondencia=correspondencia;
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

    public String getNombrePantalla() {
        return nombrePantalla;
    }

    public void setNombrePantalla(String nombrePantalla) {
        this.nombrePantalla = nombrePantalla;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsableM2k() {
        return responsableM2k;
    }

    public void setResponsableM2k(String responsableM2k) {
        this.responsableM2k = responsableM2k;
    }

    public String getCorrespondencia() {
        return correspondencia;
    }

    public void setCorrespondencia(String correspondencia) {
        this.correspondencia = correspondencia;
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
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront[ id=" + id + " ]";
    }
    
}
