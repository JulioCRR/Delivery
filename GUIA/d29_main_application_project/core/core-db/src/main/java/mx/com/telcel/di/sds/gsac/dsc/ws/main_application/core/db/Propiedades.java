/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author hernandezaa
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "propiedades", uniqueConstraints = {
    @UniqueConstraint(name = "UNQ_NAME", columnNames = {"name"})})
public class Propiedades implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "PROPIEDADES_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "PROPIEDADES_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "PROPIEDADES_SEQ")
    private Short id;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private String value;
    @Column(name = "temporal")
    private String temporal;

    public Propiedades() {
    }

    public Propiedades(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getTemporal() {
        return temporal;
    }

    public void setTemporal(String temporal) {
        this.temporal = temporal;
    }

    @Override
    public String toString() {
        return "Propiedades{" + "id=" + id + ", name=" + name + ", value=" + value + ", temporal=" + temporal + '}';
    }

}
