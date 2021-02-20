/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author hernandezaa
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "perfil")
public class Perfil implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "PERFIL_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "PERFIL_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "PERFIL_SEQ")
    @Column(name = "id")
    private Integer id;
    @Column(name = "nombre")
    private String nombre;
    @JoinColumn(name = "id_area", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Area area;
    @JoinColumn(name = "id_puesto", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Puesto puesto;
    @Column(name="descripcion")
    private String descripcion;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Perfil(Integer id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Perfil() {
    }

    public Perfil(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Puesto getPuesto() {
        return puesto;
    }

    public void setPuesto(Puesto puesto) {
        this.puesto = puesto;
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
        if (!(object instanceof Perfil)) {
            return false;
        }
        Perfil other = (Perfil) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil[ id=" + id + " ]";
    }

}
