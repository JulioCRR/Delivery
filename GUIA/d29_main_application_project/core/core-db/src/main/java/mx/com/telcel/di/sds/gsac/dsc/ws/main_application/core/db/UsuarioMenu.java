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
@Table(name = DBConstants.DB_PREF_CORE + "usuario_menu")
public class UsuarioMenu implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "USUARIO_MENU_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "USUARIO_MENU_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "USUARIO_MENU_SEQ")
    @Column(name = "id")
    private Integer id;
    @Column(name = "estatus")
    private Integer estatus;
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Menu menu;
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Usuario usuario;

    public UsuarioMenu() {
    }

    public UsuarioMenu(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEstatus() {
        return estatus;
    }

    public void setEstatus(Integer estatus) {
        this.estatus = estatus;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
        if (!(object instanceof UsuarioMenu)) {
            return false;
        }
        UsuarioMenu other = (UsuarioMenu) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioMenu[ id=" + id + " ]";
    }

}
