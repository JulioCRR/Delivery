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
@Table(name = DBConstants.DB_PREF_PWS + "SOL_PETICION")
public class SolicitudPeticion implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final String SEQ = DBConstants.DB_PREF_PWS + "SOL_PETICION_SEQ";

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
    @JoinColumn(name = "ID_APLICATIVO_TELCEL", referencedColumnName = "ID")
    @ManyToOne
    private AplicativoTelcel aplicativo;
    @Column(name = "AMBIENTE")
    private Integer ambiente;
    @Column(name = "FECHA_CADUCIDAD")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCaducidad;
    @JoinColumn(name = "ID_USUARIO_SOLICITUD", referencedColumnName = "ID")
    @ManyToOne
    private Usuario solicitante;
    @Size(max = 500)
    @Column(name = "JUSTIFICACION")
    private String justificacion;
    @JoinColumn(name = "ID_USUARIO_AUTORIZADOR", referencedColumnName = "ID")
    @ManyToOne
    private Usuario autorizador;
    @Column(name = "FECHA_AUTORIZACION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaAutorizacion;
    @Size(max = 500)
    @Column(name = "COMENTARIO_AUTORIZADOR")
    private String comentarioAutorizador;

    public SolicitudPeticion() {
    }

    public SolicitudPeticion(Long id) {
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

    public AplicativoTelcel getAplicativo() {
        return aplicativo;
    }

    public void setAplicativo(AplicativoTelcel aplicativo) {
        this.aplicativo = aplicativo;
    }

    @JsonIgnore
    public String getAreaNombre() {
        if (aplicativo != null) {
            return aplicativo.getAreaResponsable().getNombre();
        }
        return null;
    }

    public Integer getAmbiente() {
        return ambiente;
    }

    public void setAmbiente(Integer ambiente) {
        this.ambiente = ambiente;
    }

    public Date getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(Date fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
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

    public Usuario getAutorizador() {
        return autorizador;
    }

    public String getNombreUsuarioAutorizador() {
        if (autorizador != null) {
            return autorizador.getNombreCompleto();
        }
        return null;
    }

    public void setAutorizador(Usuario autorizador) {
        this.autorizador = autorizador;
    }

    public Date getFechaAutorizacion() {
        return fechaAutorizacion;
    }

    public void setFechaAutorizacion(Date fechaAutorizacion) {
        this.fechaAutorizacion = fechaAutorizacion;
    }

    public String getComentarioAutorizador() {
        return comentarioAutorizador;
    }

    public void setComentarioAutorizador(String comentarioAutorizador) {
        this.comentarioAutorizador = comentarioAutorizador;
    }

    @JsonIgnore
    public void sanitize() {
        if (id != null && id < 1) {
            id = null;
        }
        justificacion = StringUtils.trimToNull(DBUtils.normalizeText(justificacion));
        comentarioAutorizador = StringUtils.trimToNull(DBUtils.normalizeText(comentarioAutorizador));
    }

    @Override
    public String toString() {
        return "SolicitudPeticion{" + "id=" + id + ", fechaRegistro=" + fechaRegistro + ", estatus=" + estatus + ", aplicativoTelcel=" + aplicativo + ", ambiente=" + ambiente + ", fechaCaducidad=" + fechaCaducidad + ", solicitante=" + solicitante + ", justificacion=" + justificacion + ", autorizador=" + autorizador + ", fechaAutorizacion=" + fechaAutorizacion + ", comentarioAutorizador=" + comentarioAutorizador + '}';
    }
}
