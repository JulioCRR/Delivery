/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class UserSessionData implements Serializable {

    private List<MenuTree> menuTrees;
    @JsonIgnore
    private List<String> urlAccess;
    private Usuario user;

    public UserSessionData(List<MenuTree> menuTrees, Usuario user) {
        this.menuTrees = menuTrees;
        this.user = user;
    }

    public UserSessionData(List<MenuTree> menuTrees, List<String> urlAccess, Usuario user) {
        this.menuTrees = menuTrees;
        this.urlAccess = urlAccess;
        this.user = user;
    }

    public List<MenuTree> getMenuTrees() {
        return menuTrees;
    }

    public void setMenuTrees(List<MenuTree> menuTrees) {
        this.menuTrees = menuTrees;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public List<String> getUrlAccess() {
        return urlAccess;
    }

    public void setUrlAccess(List<String> urlAccess) {
        this.urlAccess = urlAccess;
    }

}
