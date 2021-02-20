package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBUtils;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Juan
 */
@Entity
@Table(name = DBConstants.DB_PREF_PWS + "SOL_USU_CORP")
public class SolicitudUsuarioCorp implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final String SEQ = DBConstants.DB_PREF_PWS + "SOL_USU_CORP_SEQ";

    @Id
    @SequenceGenerator(name = SEQ, sequenceName = SEQ, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ)
    @Column(name = "ID")
    private Long id;
    @Column(name = "FECHA_REGISTRO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;
    @Column(name = "ESTATUS")
    private Integer estatus;
    @Size(max = 10)
    @Column(name = "USUARIO_CORP")
    private String usuarioCorp;
    @JoinColumn(name = "ID_USUARIO_SOLICITUD", referencedColumnName = "ID")
    @ManyToOne
    private Usuario solicitante;
    @Size(max = 500)
    @Column(name = "JUSTIFICACION")
    private String justificacion;
    @Size(max = 500)
    @Column(name = "COMENTARIO_USUARIO_RESP")
    private String comentarioResponsable;

    public SolicitudUsuarioCorp() {
    }

    public SolicitudUsuarioCorp(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    public String getUsuarioCorp() {
        return usuarioCorp;
    }

    public void setUsuarioCorp(String usuarioCorp) {
        this.usuarioCorp = usuarioCorp;
    }

    public Usuario getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(Usuario solicitante) {
        this.solicitante = solicitante;
    }

    public String getJustificacion() {
        return justificacion;
    }

    public void setJustificacion(String justificacion) {
        this.justificacion = justificacion;
    }

    public String getComentarioResponsable() {
        return comentarioResponsable;
    }

    public void setComentarioResponsable(String comentarioResponsable) {
        this.comentarioResponsable = comentarioResponsable;
    }

    @JsonIgnore
    public void sanitize() {
        if (id != null && id < 1) {
            id = null;
        }
        usuarioCorp = StringUtils.upperCase(StringUtils.trimToNull(usuarioCorp));
        justificacion = StringUtils.trimToNull(DBUtils.normalizeText(justificacion));
        comentarioResponsable = StringUtils.trimToNull(DBUtils.normalizeText(comentarioResponsable));
    }

    @Override
    public String toString() {
        return "SolicitudUsuarioCorp{" + "id=" + id + ", fechaRegistro=" + fechaRegistro + ", estatus=" + estatus + ", idUsuarioSolicitud=" + solicitante + ", usuarioCorp=" + usuarioCorp + ", justificacion=" + justificacion + ", comentarioUsuarioResp=" + comentarioResponsable + '}';
    }
}
