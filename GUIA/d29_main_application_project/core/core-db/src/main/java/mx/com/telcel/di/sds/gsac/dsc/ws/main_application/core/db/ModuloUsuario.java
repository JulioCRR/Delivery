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
 * @author Roberto Sánchez
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "modulo_usuario")
public class ModuloUsuario implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "MODULO_USUARIO_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "MODULO_USUARIO_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "MODULO_USUARIO_SEQ")
    @Column(name = "idmodulousuario")
    private Integer idmodulousuario;
    @Column(name="modulo")
    private String modulo;
    @Column(name="justificacion")
    private String justificacion;
    @JoinColumn(name = "idusuario", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Usuario idUsuario;

    public Integer getIdmodulousuario() {
        return idmodulousuario;
    }

    public void setIdmodulousuario(Integer idmodulousuario) {
        this.idmodulousuario = idmodulousuario;
    }

    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public String getJustificacion() {
        return justificacion;
    }

    public void setJustificacion(String justificacion) {
        this.justificacion = justificacion;
    }

    public Usuario getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }

    @Override
    public String toString() {
        return "ModuloUsuario{" + "idmodulousuario=" + idmodulousuario + ", modulo=" + modulo + ", justificacion=" + justificacion + ", idUsuario=" + idUsuario + '}';
    }
    
    
    
}
