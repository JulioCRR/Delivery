
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.preferences.AppPreferences;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest.MenuTree;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.rest.UserSessionData;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.LdapService;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session.UserSession;
import org.jasypt.util.password.BasicPasswordEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional(noRollbackFor = BadCredentialsException.class)
public class LoginDao {

    private static final Logger LOG = LoggerFactory.getLogger(LoginDao.class);

    private static final String USER_DEFAULT = "admin";
    private static final String PASS_DEFAULT = "admin";
    private static final short TOKEN_TIME = 30;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private UserSession userSession;

    @Autowired
    private MenuDao menuDao;

    @Autowired
    private AppPreferences appPreferences;

    public boolean login(String nEmpleado, String password) {
        LOG.info("Inicio de sesion para... " + nEmpleado);

        Usuario usuario;

        /*LdapService ldapService = new LdapService();
        String result = ldapService.getLdap().autenticarUsuario(nEmpleado, password);
        String arrResult[] = result.split("\\|");
        
        if (!arrResult[0].equals("1")) {
            LOG.info("CHECKING IN LOCAL DATABASE");
            return checkLocalUserInDatabase(em, nEmpleado, password);
        }*/

        try {

            usuario = em.createQuery("SELECT u FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Usuario.class)
                    .setParameter("nEmpleado", nEmpleado)
                    .getSingleResult();

            configMenuForUser(usuario);
            

            return true;
        } catch (NoResultException e) {
            
            throw new BadCredentialsException("El usuario no tiene permisos para esta aplicación");

        } catch (Exception e) {
            throw new BadCredentialsException("El usuario no tiene permisos para esta aplicación");
        }

    }

    public boolean checkLocalUserInDatabase(EntityManager em, String nEmpleado, String password) {
        Usuario usuario;
        try {
            usuario = em.createQuery("SELECT u FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Usuario.class)
                    .setParameter("nEmpleado", nEmpleado)
                    .getSingleResult();

        } catch (NoResultException e) {
            return false;
        }
        if (new BasicPasswordEncryptor().checkPassword(password, usuario.getPassword())) {
            configMenuForUser(usuario);
            return true;
        }
        return false;
    }

    public void configMenuForUser(Usuario usuario) {
        List<Menu> menus = menuDao.getMenuForUser(usuario);

        if (menus.isEmpty()) {
            throw new BadCredentialsException("El usuario no tiene permisos para esta aplicación");
        }

        List<Menu> menusVisible = new ArrayList<>();
        List<String> menusNoVisible = new ArrayList<>();
        for (Menu menu : menus) {
            if (menu.getVisible().equals((short) 1)) {
                menusVisible.add(menu);
            } else {
                menusNoVisible.add(menu.getUrl());
            }
        }

        List<MenuTree> menuTrees = new LinkedList<>();
        for (MenuTree tree : appPreferences.getAllMenus()) {
            menuTrees.add(new MenuTree(tree));
        }

        MenuTree menuTree;
        boolean foundIt;
        for (int i = menuTrees.size() - 1; i >= 0; i--) {
            menuTree = menuTrees.get(i);
            foundIt = false;
            for (Menu menu : menusVisible) {
                if (menuTree.getId().equals(menu.getId())) {
                    foundIt = true;
                    break;
                }
            }
            if (!foundIt) {
                menuTrees.remove(menuTree);
                continue;
            }

            menuTree.setMenuTrees(new LinkedList<>(menuTree.getMenuTrees()));
            searchRemoveMenu(menuTree.getMenuTrees(), menusVisible);
        }

        userSession.setSessionData(new UserSessionData(menuTrees, menusNoVisible, usuario));
    }

    public void searchRemoveMenu(List<MenuTree> menuTrees, List<Menu> menusVisible) {
        if (menuTrees == null) {
            return;
        }
        boolean foundIt;
        for (int i = menuTrees.size() - 1; i >= 0; i--) {
            foundIt = false;
            for (Menu menu : menusVisible) {
                if (menuTrees.get(i).getId().equals(menu.getId())) {
                    foundIt = true;
                    break;
                }
            }
            if (!foundIt) {
                menuTrees.remove(menuTrees.get(i));
                continue;
            }
            menuTrees.get(i).setMenuTrees(new LinkedList<>(menuTrees.get(i).getMenuTrees()));
            searchRemoveMenu(menuTrees.get(i).getMenuTrees(), menusVisible);
        }
    }

    public void logout(String token) {

    }

}
