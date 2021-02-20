/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.preferences;

import java.util.LinkedList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest.MenuTree;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@ApplicationScope
@Component
public class AppPreferences {

    private static final Logger LOG = LoggerFactory.getLogger(AppPreferences.class);

    @PersistenceContext
    private EntityManager em;

    private List<MenuTree> allMenus;

    @PostConstruct
    public void init() {
        reloadMenus();
    }

    public void reloadMenus() {
        allMenus = new LinkedList<>();
        List<Menu> listMenu = em.createQuery("SELECT m FROM Menu m WHERE m.visible = :visible AND m.menuPadre = null ORDER BY m.orden", Menu.class)
                .setParameter("visible", (short) 1)
                .getResultList();

        for (Menu menu : listMenu) {
            MenuTree menuMaptemp;
            menuMaptemp = new MenuTree();
            menuMaptemp.setId(menu.getId());
            menuMaptemp.setNombre(menu.getNombre());
            menuMaptemp.setIcono(menu.getIcono());
            menuMaptemp.setUrl(menu.getUrl());
            menuMaptemp.setMenuTrees(addMenuTree(menu));
            allMenus.add(menuMaptemp);
        }

    }

    public List<MenuTree> addMenuTree(Menu menu) {
        List<MenuTree> list = null;
        MenuTree menuMaptemp;
        if (menu.getMenuList() != null) {
            list = new LinkedList<>();
            for (Menu menuTemp : menu.getMenuList()) {
                if (menuTemp.getVisible().equals((short) 0)) {
                    continue;
                }
                menuMaptemp = new MenuTree();
                menuMaptemp.setId(menuTemp.getId());
                menuMaptemp.setNombre(menuTemp.getNombre());
                menuMaptemp.setIcono(menuTemp.getIcono());
                menuMaptemp.setUrl(menuTemp.getUrl());
                menuMaptemp.setMenuTrees(addMenuTree(menuTemp));
                list.add(menuMaptemp);
            }
        }
        return list;
    }

    public List<MenuTree> getAllMenus() {
        return allMenus;
    }

    public void setAllMenus(List<MenuTree> allMenus) {
        this.allMenus = allMenus;
    }

}
