package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBConstants;

/**
 *
 * @author Juan
 */
@Entity
@Table(name = DBConstants.DB_PREF_PWS + "REL_USU_CORP_RESP")
public class ResponsableUsuarioCorp implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final String SEQ = DBConstants.DB_PREF_PWS + "REL_USU_CORP_RESP_SEQ";

    @Id
    @SequenceGenerator(name = SEQ, sequenceName = SEQ, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ)
    @Column(name = "ID")
    private Long id;
    @Size(max = 10)
    @Column(name = "USUARIO_CORP")
    private String usuarioCorp;
    @JoinColumn(name = "ID_USUARIO_RESP", referencedColumnName = "ID")
    @ManyToOne
    private Usuario responsable;

    public ResponsableUsuarioCorp() {
    }

    public ResponsableUsuarioCorp(Long id) {
        this.id = id;
    }

    public ResponsableUsuarioCorp(Usuario idUsuarioResp) {
        this.responsable = idUsuarioResp;
    }

    public ResponsableUsuarioCorp(String usuarioCorp) {
        this.usuarioCorp = usuarioCorp;
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

    public Usuario getResponsable() {
        return responsable;
    }

    public void setResponsable(Usuario responsable) {
        this.responsable = responsable;
    }

    @Override
    public String toString() {
        return "ResponsableUsuarioCorp{" + "id=" + id + ", usuarioCorp=" + usuarioCorp + ", idUsuarioResp=" + responsable + '}';
    }

}
