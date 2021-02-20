package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common.DBConstants;
import org.joda.time.LocalDateTime;

/**
 *
 * @author VI9XXI3
 */
@Entity
@Table(name = DBConstants.DB_PREF_OMEGA + "ALERTA")
public class OmegaAlerta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_OMEGA + "ALERTA_SEQ", sequenceName = DBConstants.DB_PREF_OMEGA + "ALERTA_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = DBConstants.DB_PREF_OMEGA + "ALERTA_SEQ")
    @Column(name = "ID")
    private Long id;
    @Column(name = "FECHA_ALERTA")
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime fechaAlerta;
    @Size(max = 10)
    @Column(name = "CICS")
    private String cics;
    @Size(max = 4)
    @Column(name = "TRANSACCION")
    private String transaccion;
    @Size(max = 4)
    @Column(name = "REGION")
    private String region;
    @Column(name = "CPU")
    private Double cpu;
    @Column(name = "EJECUCION")
    private Double ejecucion;

    public OmegaAlerta() {
    }

    public OmegaAlerta(Long id) {
        this.id = id;
    }

    public OmegaAlerta(Long fechaAlerta, String cics, Double cpu) {
        this(new LocalDateTime(fechaAlerta), cics, null, null, cpu, null);
    }

    public OmegaAlerta(Long fechaAlerta, String cics, String transaccion, String region, Double cpu, Double ejecucion) {
        this(new LocalDateTime(fechaAlerta), cics, transaccion, region, cpu, ejecucion);
    }

    public OmegaAlerta(LocalDateTime fechaAlerta, String cics, String transaccion, String region, Double cpu, Double ejecucion) {
        this.fechaAlerta = fechaAlerta;
        this.cics = cics;
        this.transaccion = transaccion;
        this.region = region;
        this.cpu = cpu;
        this.ejecucion = ejecucion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFechaAlerta() {
        return fechaAlerta == null ? null : fechaAlerta.toDateTime().getMillis();
    }

    @JsonIgnore
    public LocalDateTime getFechaAlertaLocalDateTime() {
        return fechaAlerta;
    }

    public void setFechaAlerta(LocalDateTime fechaAlerta) {
        this.fechaAlerta = fechaAlerta;
    }

    public void setFechaAlerta(Long fechaAlerta) {
        this.fechaAlerta = new LocalDateTime(fechaAlerta);
    }

    public String getCics() {
        return cics;
    }

    public void setCics(String cics) {
        this.cics = cics;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Double getCpu() {
        return cpu;
    }

    public void setCpu(Double cpu) {
        this.cpu = cpu;
    }

    public Double getEjecucion() {
        return ejecucion;
    }

    public void setEjecucion(Double ejecucion) {
        this.ejecucion = ejecucion;
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
        if (!(object instanceof OmegaAlerta)) {
            return false;
        }
        OmegaAlerta other = (OmegaAlerta) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "OmegaAlerta{" + "id=" + id + ", fechaAlerta=" + fechaAlerta + ", cics=" + cics + ", transaccion=" + transaccion + ", region=" + region + ", cpu=" + cpu + ", ejecucion=" + ejecucion + '}';
    }
}
