package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBUtils;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Juan
 */
@Entity
@Table(name = DBConstants.DB_PREF_PWS + "PETICION")
public class Peticion implements Serializable {

    public static final String WILDCARD = "*";
    public static final String FILTER_NULL = "-";
    public static final String FILTER_SPLIT = "_";
    public static final String[] HIBERNATE_QUERY_COLS = new String[]{"usuarioCorp", "ip", "region", "transaccion", "peticionesPorMinuto", "ambiente", "estatus", "solicitudPeticion"};

    private static final long serialVersionUID = 1L;
    private static final String SEQ = DBConstants.DB_PREF_PWS + "PETICION_SEQ";

    @Id
    @SequenceGenerator(name = SEQ, sequenceName = SEQ, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ)
    @Column(name = "ID")
    private Long id;
    @Size(max = 10)
    @Column(name = "USUARIO_CORP")
    private String usuarioCorp;
    @Size(max = 20)
    @Column(name = "IP")
    private String ip;
    @Size(max = 4)
    @Column(name = "REGION")
    private String region;
    @Size(max = 25)
    @Column(name = "TRANSACCION")
    private String transaccion;
    @Column(name = "PETICIONES_POR_MINUTO")
    private Integer peticionesPorMinuto;
    @JoinColumn(name = "ID_SOLICITUD", referencedColumnName = "ID")
    @ManyToOne
    private SolicitudPeticion solicitudPeticion;
    @Column(name = "AMBIENTE")
    private Integer ambiente;
    @Column(name = "ESTATUS")
    private Integer estatus;
    @Transient
    @JsonSerialize
    @JsonDeserialize
    private boolean repetida;

    public Peticion() {
    }

    public Peticion(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuarioCorp() {
        return usuarioCorp;
    }

    public void setUsuarioCorp(String usuarioCorp) {
        this.usuarioCorp = usuarioCorp;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public Integer getPeticionesPorMinuto() {
        return peticionesPorMinuto;
    }

    public void setPeticionesPorMinuto(Integer peticionesPorMinuto) {
        this.peticionesPorMinuto = peticionesPorMinuto;
    }

    public SolicitudPeticion getSolicitudPeticion() {
        return solicitudPeticion;
    }

    @JsonIgnore
    public Long getSolicitudPeticionId() {
        if (solicitudPeticion != null) {
            return solicitudPeticion.getId();
        }
        return null;
    }

    public void setSolicitudPeticion(SolicitudPeticion solicitudPeticion) {
        this.solicitudPeticion = solicitudPeticion;
    }

    public Integer getAmbiente() {
        return ambiente;
    }

    public void setAmbiente(Integer ambiente) {
        this.ambiente = ambiente;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    public boolean isRepetida() {
        return repetida;
    }

    public void setRepetida(boolean repetida) {
        this.repetida = repetida;
    }

    @JsonIgnore
    public void sanitize() {
        if (id != null && id < 1) {
            id = null;
        }
        usuarioCorp = StringUtils.trimToNull(usuarioCorp);
        ip = StringUtils.trimToNull(ip);
        region = StringUtils.trimToNull(region);
        if (region != null && (region.equals("0") || region.equals("10"))) {
            region = WILDCARD;
        }
        transaccion = StringUtils.trimToNull(transaccion);
        if (solicitudPeticion != null) {
            solicitudPeticion.sanitize();
        }
    }

    @JsonIgnore
    public void clonePeticion(Peticion clone) {
        id = clone.getId();
        usuarioCorp = clone.getUsuarioCorp();
        ip = clone.getIp();
        region = clone.getRegion();
        transaccion = clone.getTransaccion();
        peticionesPorMinuto = clone.getPeticionesPorMinuto();
        solicitudPeticion = clone.getSolicitudPeticion();
        ambiente = clone.getAmbiente();
        estatus = clone.getEstatus();
    }

    @JsonIgnore
    public String getPeticionPropertiesKey() {
        return usuarioCorp + "_" + ip + "_" + region + "_" + transaccion;
    }

    @JsonIgnore
    public String getPeticionPropertiesFormat() {
        return getPeticionPropertiesKey() + "=" + peticionesPorMinuto;
    }

    @JsonIgnore
    public boolean isFullyEqual(Peticion peticion) {
        if (this.equals(peticion)) {
            return (Objects.equals(this.peticionesPorMinuto, peticion.peticionesPorMinuto)
                    && Objects.equals(this.ambiente, peticion.ambiente)
                    && Objects.equals(this.estatus, peticion.estatus)
                    && DBUtils.isSolPeticionEquals(this.solicitudPeticion, peticion.solicitudPeticion));
        }
        return false;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.id);
        hash = 17 * hash + Objects.hashCode(this.usuarioCorp);
        hash = 17 * hash + Objects.hashCode(this.ip);
        hash = 17 * hash + Objects.hashCode(this.transaccion);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Peticion other = (Peticion) obj;
        if (!Objects.equals(this.usuarioCorp, other.usuarioCorp)) {
            return false;
        }
        if (!Objects.equals(this.ip, other.ip)) {
            return false;
        }
        if (!Objects.equals(this.region, other.region)) {
            return false;
        }
        if (!Objects.equals(this.transaccion, other.transaccion)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Peticion{" + "id=" + id + ", usuarioCorp=" + usuarioCorp + ", ip=" + ip + ", region=" + region + ", transaccion=" + transaccion + ", peticionesPorMinuto=" + peticionesPorMinuto + ", idSolicitud=" + solicitudPeticion + ", ambiente=" + ambiente + ", estatus=" + estatus + ", repetida=" + repetida + '}';
    }
}
