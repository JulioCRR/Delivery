/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.repository;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.MenuDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Qualifier(value = "entityManagerFactory")
@RepositoryRestResource(collectionResourceRel = "menu", path = "menu")
public interface MenuRepository extends PagingAndSortingRepository<Usuario, Integer> {

    @RestController
    public class MenuRest {

        private static final Logger LOG = LoggerFactory.getLogger(MenuRest.class);

        @Autowired
        private MenuDao menuDao;
        
        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "menu-tree", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<MenuDao.MenuMainData> menuTree(HttpSession session) {
            ResponseEntity<MenuDao.MenuMainData> response = new ResponseEntity<>(menuDao.getMenus(), HttpStatus.OK);
            return response;
        }

        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "menu-tree-by-usuario", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<List<Integer>> menuTreeByUsuario(HttpSession session, @RequestParam(value = "idUsuario") int idUsuario) {
            ResponseEntity<List<Integer>> response = new ResponseEntity<>(menuDao.getMenusByUsuario(idUsuario), HttpStatus.OK);
            return response;
        }

        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "menu-tree-by-perfil", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<List<Integer>> menuTreeByPerfil(HttpSession session, @RequestParam(value = "idPerfil") int idPerfil) {
            ResponseEntity<List<Integer>> response = new ResponseEntity<>(menuDao.getMenusByPerfil(idPerfil), HttpStatus.OK);
            return response;
        }
        
        
        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "menu-tree", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<Void> menuSaveInProfile(HttpSession session, @RequestBody MenuWrapper mpw) {
            List<Menu> menus = new ArrayList<>();

            Menu menu;
            for (Integer id : mpw.getMenus()) {
                menu = new Menu(id);
                menus.add(menu);
            }

            Perfil perfil;
            Usuario usuario;
            if (mpw.getIdPerfil() != null) {
                perfil = new Perfil(mpw.getIdPerfil());
                menuDao.saveMenuToProfile(menus, perfil);
            } else {
                usuario = new Usuario(mpw.getIdUsuario());
                menuDao.saveMenuToUser(menus, usuario);
            }

            ResponseEntity<Void> response = new ResponseEntity<>(HttpStatus.OK);
            return response;
        }

    }

    public class MenuWrapper {

        public Integer idUsuario;
        public Integer idPerfil;
        public List<Integer> menus;

        public Integer getIdUsuario() {
            return idUsuario;
        }

        public void setIdUsuario(Integer idUsuario) {
            this.idUsuario = idUsuario;
        }

        public Integer getIdPerfil() {
            return idPerfil;
        }

        public void setIdPerfil(Integer idPerfil) {
            this.idPerfil = idPerfil;
        }

        public List<Integer> getMenus() {
            return menus;
        }

        public void setMenus(List<Integer> menus) {
            this.menus = menus;
        }

    }
}
