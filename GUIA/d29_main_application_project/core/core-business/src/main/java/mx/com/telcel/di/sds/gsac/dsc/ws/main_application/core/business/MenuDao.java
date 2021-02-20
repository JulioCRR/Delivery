/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.PerfilMenu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioMenu;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class MenuDao {

    private static final Logger LOG = LoggerFactory.getLogger(MenuDao.class);

    @PersistenceContext
    private EntityManager em;

    public void saveMenuToUser(List<Menu> menus, Usuario usuario) {

        em.createQuery("DELETE FROM UsuarioMenu m WHERE m.usuario = :usuario")
                .setParameter("usuario", usuario)
                .executeUpdate();

        System.out.println("usuario ------------------------------- " + usuario);
        List<Menu> listMenus = em.createQuery("SELECT m FROM Menu m ", Menu.class)
                .getResultList();

        List<Perfil> listPerfil = em.createQuery("SELECT p.perfil FROM UsuarioPerfil p WHERE p.usuario = :usuario", Perfil.class)
                .setParameter("usuario", usuario)
                .getResultList();

        List<Menu> listMenuPerfil;
        if (listPerfil.isEmpty()) {
            listMenuPerfil = new LinkedList<>();
        } else {
            listMenuPerfil = em.createQuery("SELECT p.menu FROM PerfilMenu p WHERE p.perfil IN :listPerfil", Menu.class)
                    .setParameter("listPerfil", listPerfil)
                    .getResultList();
        }

//menus que se agrega permiso aparte del perfil
        ArrayList<Menu> addExtraMenu = new ArrayList<>(menus);
        addExtraMenu.removeAll(listMenuPerfil);

        //menus que tienen el perfil pero se quita permiso
        ArrayList<Menu> removeExtraMenu = new ArrayList<>(listMenuPerfil);
        removeExtraMenu.removeAll(menus);

        // menus que se tenia permiso al usuario indpendiente pero se quitan
        ArrayList<Menu> removeMenuUsuario = new ArrayList<>(listMenus);
        removeMenuUsuario.removeAll(listMenuPerfil);
        removeMenuUsuario.removeAll(menus);

        UsuarioMenu usuarioMenu;
        for (Menu m : addExtraMenu) {
            usuarioMenu = new UsuarioMenu();
            usuarioMenu.setMenu(m);
            usuarioMenu.setUsuario(usuario);
            usuarioMenu.setEstatus(1);
            em.persist(usuarioMenu);
        }
        em.flush();

        for (Menu m : removeExtraMenu) {
            usuarioMenu = new UsuarioMenu();
            usuarioMenu.setMenu(m);
            usuarioMenu.setUsuario(usuario);
            usuarioMenu.setEstatus(0);
            em.persist(usuarioMenu);
        }
        em.flush();

    }

    public void saveMenuToProfile(List<Menu> menus, Perfil perfil) {
        List<Menu> listMenuPerfil = em.createQuery("SELECT m.menu FROM PerfilMenu m WHERE m.perfil.id = :idPerfil", Menu.class)
                .setParameter("idPerfil", perfil.getId())
                .getResultList();

        ArrayList<Menu> add = new ArrayList<>(menus);
        add.removeAll(listMenuPerfil);
        ArrayList<Menu> remove = new ArrayList<>(listMenuPerfil);
        remove.removeAll(menus);

        PerfilMenu perfilMenu;
        for (Menu m : add) {
            perfilMenu = new PerfilMenu();
            perfilMenu.setMenu(m);
            perfilMenu.setPerfil(perfil);
            em.persist(perfilMenu);
        }
        em.flush();
        if (!remove.isEmpty()) {
            em.createQuery("DELETE FROM PerfilMenu m WHERE m.perfil = :perfil AND m.menu IN :menus")
                    .setParameter("perfil", perfil)
                    .setParameter("menus", remove)
                    .executeUpdate();
        }

    }

    public MenuMainData getMenus() {
        List<Menu> listMenu = em.createQuery("SELECT m FROM Menu m WHERE m.menuPadre = null ORDER BY m.orden", Menu.class)
                .getResultList();
        MenuMainData menuMainData = new MenuMainData();
        menuMainData.setData(new LinkedList<MenuData>());
        MenuData data = null;
        for (Menu m : listMenu) {
            data = setMenuData(data, m);
            menuMainData.getData().add(data);
        }

        return menuMainData;

    }
  
    public List<Menu> getMenuForUser(Usuario usuario) {
        LOG.info("Getting menus for: " + usuario.getNEmpleado());

        List<Perfil> listPerfil = em.createQuery("SELECT p.perfil FROM UsuarioPerfil p WHERE p.usuario = :usuario", Perfil.class)
                .setParameter("usuario", usuario)
                .getResultList();

        List<Menu> listMenuPerfil;
        if (listPerfil.isEmpty()) {
            listMenuPerfil = new LinkedList<>();
        } else {
            listMenuPerfil = em.createQuery("SELECT p.menu FROM PerfilMenu p WHERE p.perfil IN :listPerfil", Menu.class)
                    .setParameter("listPerfil", listPerfil)
                    .getResultList();
        }

        List<UsuarioMenu> listMenuUsuario = em.createQuery("SELECT p FROM UsuarioMenu p JOIN FETCH p.menu WHERE p.usuario = :usuario", UsuarioMenu.class)
                .setParameter("usuario", usuario)
                .getResultList();

        System.out.println("listMenuUsuario:       " + listMenuUsuario);

        List<Menu> listMenuReturn = new LinkedList<>(listMenuPerfil);
        Menu menuTemp;
        if (listMenuUsuario.isEmpty()) {
            return listMenuReturn;
        }

        for (UsuarioMenu usuarioMenu : listMenuUsuario) {
            menuTemp = usuarioMenu.getMenu();
            if (listMenuReturn.contains(menuTemp)) {
                if (usuarioMenu.getEstatus().equals(0)) {
                    listMenuReturn.remove(menuTemp);
                }
            } else {
                if (usuarioMenu.getEstatus().equals(1)) {
                    listMenuReturn.add(menuTemp);
                }
            }
        }

        return listMenuReturn;

    }

    public List<Integer> getMenusByPerfil(Integer idPerfil) {
        List<Integer> listMenuPerfil = em.createQuery("SELECT m.menu.id FROM PerfilMenu m WHERE m.perfil.id = :idPerfil", Integer.class)
                .setParameter("idPerfil", idPerfil)
                .getResultList();

        return listMenuPerfil;

    }
    
   

    public List<Integer> getMenusByUsuario(Integer id) {
        List<Integer> listPerfil = em.createQuery("SELECT p.perfil.id FROM UsuarioPerfil p WHERE p.usuario.id = :id", Integer.class)
                .setParameter("id", id)
                .getResultList();

        List<Integer> listMenuPerfil;
        if (listPerfil.isEmpty()) {
            listMenuPerfil = new LinkedList<>();
        } else {
            listMenuPerfil = em.createQuery("SELECT p.menu.id FROM PerfilMenu p WHERE p.perfil.id IN :listPerfil", Integer.class)
                    .setParameter("listPerfil", listPerfil)
                    .getResultList();
        }

        List<Integer> listMenuUsuarioAdd = em.createQuery("SELECT p.menu.id FROM UsuarioMenu p WHERE p.usuario.id = :id and p.estatus = 1", Integer.class)
                .setParameter("id", id)
                .getResultList();

        List<Integer> listMenuUsuarioRemove = em.createQuery("SELECT p.menu.id FROM UsuarioMenu p WHERE p.usuario.id = :id and p.estatus = 0", Integer.class)
                .setParameter("id", id)
                .getResultList();

        for (Integer menuId : listMenuUsuarioAdd) {
            if (!listMenuPerfil.contains(menuId)) {
                listMenuPerfil.add(menuId);
            }
        }
        for (Integer menuId : listMenuUsuarioRemove) {
            if (listMenuPerfil.contains(menuId)) {
                listMenuPerfil.remove(menuId);
            }
        }

        Collections.sort(listMenuPerfil);

        return listMenuPerfil;

    }

    public List<MenuData> addMenuTree(Menu menu) {
        List<MenuData> list = null;
        MenuData data = null;
        if (menu.getMenuList() != null) {
            list = new LinkedList<>();
            for (Menu m : menu.getMenuList()) {
                data = setMenuData(data, m);
                list.add(data);
            }
        }
        return list;
    }

    public MenuData setMenuData(MenuData data, Menu m) {
        data = new MenuData();
        data.label = m.getNombre();
        if (m.getVisible() == (short) 0) {
            data.label = data.label.concat(" (").concat(m.getUrl()).concat(")");
        }
        if (m.getIcono() != null) {
            data.icon = m.getIcono();
        } else {
            data.icon = "fa fa-cog";
        }
        data.data = String.valueOf(m.getId());
        data.children = addMenuTree(m);
        return data;
    }

    public class MenuMainData {

        private List<MenuData> data;

        public List<MenuData> getData() {
            return data;
        }

        public void setData(List<MenuData> data) {
            this.data = data;
        }

    }

    public class MenuData {

        private String label;
        private String data;
        private String icon;
        private List<MenuData> children;
        private boolean expanded = true;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public List<MenuData> getChildren() {
            return children;
        }

        public void setChildren(List<MenuData> children) {
            this.children = children;
        }

        public boolean isExpanded() {
            return expanded;
        }

        public void setExpanded(boolean expanded) {
            this.expanded = expanded;
        }

    }

}
