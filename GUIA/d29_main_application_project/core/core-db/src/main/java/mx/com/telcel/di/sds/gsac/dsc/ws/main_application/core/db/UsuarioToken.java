/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import org.joda.time.LocalDateTime;

/**
 *
 * @author hernandezaa
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "usuario_token")
public class UsuarioToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "USUARIO_TOKEN_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "USUARIO_TOKEN_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "USUARIO_TOKEN_SEQ")
    @Column(name = "ID")
    private Long id;

    @JoinColumn(name = "ID_USER", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @NotNull
    private Usuario usuario;

    @Column(name = "TOKEN", nullable = false)
    @NotNull
    private String token;

    @Column(name = "LAST_TIME", nullable = false)
    @NotNull
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime lastTime;

    public UsuarioToken() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getLastTime() {
        return lastTime;
    }

    public void setLastTime(LocalDateTime lastTime) {
        this.lastTime = lastTime;
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
        if (!(object instanceof UsuarioToken)) {
            return false;
        }
        UsuarioToken other = (UsuarioToken) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario[ id=" + id + " ]";
    }

}
