/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class MenuTree implements Serializable {

    private Integer id;
    private String nombre;
    private String icono;
    private String url;
    private List<MenuTree> menuTrees;

    public MenuTree(MenuTree menuTree) {
        this.id = menuTree.id;
        this.nombre = menuTree.nombre;
        this.icono = menuTree.icono;
        this.url = menuTree.url;
        if (menuTree.menuTrees != null) {
            this.menuTrees = new LinkedList<>();
            for (MenuTree tree : menuTree.menuTrees) {
                this.menuTrees.add(new MenuTree(tree));
            }
        }
    }

    public MenuTree() {
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

    public List<MenuTree> getMenuTrees() {
        return menuTrees;
    }

    public void setMenuTrees(List<MenuTree> menuTrees) {
        this.menuTrees = menuTrees;
    }

}
