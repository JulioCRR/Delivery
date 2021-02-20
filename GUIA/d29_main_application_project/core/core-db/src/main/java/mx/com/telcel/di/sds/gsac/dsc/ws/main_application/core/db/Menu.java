/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author hernandezaa
 */
@Entity
@Table(name = DBConstants.DB_PREF_CORE + "menu")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "MENU_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "MENU_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "MENU_SEQ")
    @Column(name = "id")
    private Integer id;
    @Column(name = "nombre", unique = true)
    private String nombre;
    @Column(name = "orden")
    private Short orden;
    @Column(name = "icono")
    private String icono;
    @Column(name = "url", unique = true)
    private String url;
    @Column(name = "visible")
    private Short visible;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menuPadre", fetch = FetchType.LAZY)
    private List<Menu> menuList;
    @JoinColumn(name = "id_menu_padre", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Menu menuPadre;

    public Menu() {
    }

    public Menu(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Short getOrden() {
        return orden;
    }

    public void setOrden(Short orden) {
        this.orden = orden;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Short getVisible() {
        return visible;
    }

    public void setVisible(Short visible) {
        this.visible = visible;
    }

    public List<Menu> getMenuList() {
        return menuList;
    }

    public void setMenuList(List<Menu> menuList) {
        this.menuList = menuList;
    }

    public Menu getMenuPadre() {
        return menuPadre;
    }

    public void setMenuPadre(Menu menuPadre) {
        this.menuPadre = menuPadre;
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
        if (!(object instanceof Menu)) {
            return false;
        }
        Menu other = (Menu) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu[ id=" + id + " ]";
    }

}
