package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBConstants;

/**
 *
 * @author Juan
 */
@Entity
@Table(name = DBConstants.DB_PREF_CAT + "APLICATIVO_TELCEL")
public class AplicativoTelcel implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final String SEQ = DBConstants.DB_PREF_CAT + "APLICATIVO_TELCEL_SEQ";

    @Id
    @SequenceGenerator(name = SEQ, sequenceName = SEQ, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ)
    @Column(name = "ID")
    private Long id;
    @Size(min = 1, max = 255)
    @Column(name = "NOMBRE")
    private String nombre;
    @Size(max = 500)
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @JoinColumn(name = "ID_AREA_RESPONSABLE", referencedColumnName = "ID")
    @ManyToOne
    private Area areaResponsable;
    @Transient
    private String nombreCompuesto;

    public AplicativoTelcel() {
    }

    public AplicativoTelcel(Long id) {
        this.id = id;
    }

    public AplicativoTelcel(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Area getAreaResponsable() {
        return areaResponsable;
    }

    public void setAreaResponsable(Area areaResponsable) {
        this.areaResponsable = areaResponsable;
    }

    public String getNombreCompuesto() {
        return nombreCompuesto;
    }

    public void setNombreCompuesto(String nombreCompuesto) {
        this.nombreCompuesto = nombreCompuesto;
    }

    @Override
    public String toString() {
        return "AplicativoTelcel{" + "id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + ", areaResponsable=" + areaResponsable + '}';
    }
}
