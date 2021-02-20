/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Oficina;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.PerfilMenu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Puesto;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class InitializeCore {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeCore.class);

    public static final String PROFILE_NAME = "ADMINISTRADOR";
    public static final String SEPARATOR = "\\|";
    private static final String FILE_PATH = "META-INF/defaultdata/";
    private static final String MODULE_NAME = "ADMINISTRADOR";

    @PersistenceContext
    private EntityManager em;

    @Value(value = "classpath:USUARIO.txt")
    private Resource usuarioTxt;

    @Value(value = "classpath:USUARIO_RELOAD.txt")
    private Resource usuarioReloadTxt;

    @Order(value = 1)
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {

        LOG.info("#################### Cheking CORE MODULE catalogs ####################");
//        em = managerFactory.createEntityManager();

        updateAreaFromUsersRealoadFromFile();
        updateOficinaFromUsersRealoadFromFile();
        updatePuestoFromUsersRealoadFromFile();
        updateUsersRealoadFromFile();

        Perfil perfil = initPerfil(MODULE_NAME);

        initMenu(perfil);

        try {
            em.createQuery("SELECT u.id FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Integer.class)
                    .setParameter("nEmpleado", "admin")
                    .getSingleResult();
//            em.close();
            return;
        } catch (NoResultException e) {
        }
        LOG.info("#################### init CORE MODULE catalogs ####################");

        initArea();
        initPuesto();
        initOficina();
        initUser();

        initUsersFromFile();

//        em.close();
    }

    public Area initArea() {

        Area areaDireccion = new Area();
        areaDireccion.setNombre("DIR INFORMATICA");
        areaDireccion.setClave("00400000");
        em.persist(areaDireccion);

        Area areaSubDir = new Area();
        areaSubDir.setNombre("SUBDIR DES DE SFW");
        areaSubDir.setClave("00410000");
        areaSubDir.setAreaPadre(areaDireccion);
        em.persist(areaSubDir);

        Area areaGcia = new Area();
        areaGcia.setNombre("GCIA SISTEMAS DE ACTIVACIONES");
        areaGcia.setClave("00410500");
        areaGcia.setAreaPadre(areaSubDir);
        em.persist(areaGcia);

        Area areaDpto = new Area();
        areaDpto.setNombre("DEPTO SISTEMAS CORPORATIVOS");
        areaDpto.setClave("00410503");
        areaDpto.setAreaPadre(areaGcia);
        em.persist(areaDpto);
        em.flush();
        return areaDpto;
    }

    public Puesto initPuesto() {

        Puesto puesto = new Puesto();
        puesto.setClave("300099");
        puesto.setNombre("ANALISTA DE SISTEMAS CORPORATIVOS EXTERNO");
        em.persist(puesto);
        em.flush();
        return puesto;
    }

    public Oficina initOficina() {

        Oficina oficina = new Oficina();
        oficina.setNombre("CORPORATIVO");
        em.persist(oficina);
        em.flush();
        return oficina;
    }

    public Perfil initPerfil(String moduleName) {
        Perfil perfil;
        try {
            perfil = em.createQuery("SELECT p FROM Perfil p WHERE p.nombre = :nombre", Perfil.class)
                    .setParameter("nombre", moduleName)
                    .getSingleResult();
        } catch (NoResultException e) {
            perfil = new Perfil();
            perfil.setNombre(moduleName);
            addProfileToAdmin(perfil);
        }
        return perfil;

    }

    public void initUser() {

        Usuario usuario = new Usuario();
        usuario.setNEmpleado("admin");
        usuario.setPassword("admin");
        usuario.setNombre("Administrador del Sistema");
        usuario.setCorreo("sactweb@mail.telcel.com");
        usuario.setExtension("0000");
        em.persist(usuario);
        em.flush();
    }

    public void initUsersFromFile() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(usuarioTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            String[] name;
            Usuario usuario;
            while ((renglon = reader.readLine()) != null) {
//                em.getTransaction().begin();
                valores = renglon.split(SEPARATOR);
                usuario = new Usuario();
                usuario.setNEmpleado(valores[0]);
                usuario.setUsuarioRed(valores[1]);
                usuario.setCorreo(valores[2]);
                name = valores[3].split(" ");
                usuario.setAMaterno(name[name.length - 1]);
                usuario.setAPaterno(name[name.length - 2]);
                usuario.setNombre(name[0]);
                if (name.length > 3) {
                    usuario.setNombre(usuario.getNombre() + " " + name[1]);
                }
                usuario.setExtension(valores[4]);
                em.persist(usuario);

            }
        } catch (IOException ex) {
            LOG.error("Error loading USUARIO", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving USUARIO", e);
        }

    }

    public void updateOficinaFromUsersRealoadFromFile() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(usuarioReloadTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            Oficina oficina;
            while ((renglon = reader.readLine()) != null) {

                valores = renglon.split(SEPARATOR);
                try {

                    em.createQuery("SELECT o FROM Oficina o WHERE o.nombre = :oficina", Oficina.class)
                            .setParameter("oficina", valores[11])
                            .getSingleResult();
                } catch (NoResultException ex) {
//                    em.getTransaction().begin();
                    oficina = new Oficina();
                    oficina.setNombre(valores[11]);
                    em.persist(oficina);
//                    em.getTransaction().commit();
                }

            }
        } catch (IOException ex) {
            LOG.error("Error loading OFICINA_RELOAD", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving OFICINA_RELOAD", e);
        }
    }

    public void updatePuestoFromUsersRealoadFromFile() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(usuarioReloadTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            Puesto puesto;
            while ((renglon = reader.readLine()) != null) {

                valores = renglon.split(SEPARATOR);
                try {

                    em.createQuery("SELECT p FROM Puesto p WHERE p.nombre = :puesto", Puesto.class)
                            .setParameter("puesto", valores[12])
                            .getSingleResult();
                } catch (NoResultException ex) {
//                    em.getTransaction().begin();
                    puesto = new Puesto();
                    puesto.setNombre(valores[12]);
                    em.persist(puesto);
//                    em.getTransaction().commit();
                }

            }
        } catch (IOException ex) {
            LOG.error("Error loading PUESTO_RELOAD", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving PUESTO_RELOAD", e);
        }
    }

    public void updateAreaFromUsersRealoadFromFile() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(usuarioReloadTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            Area areaDireccion;
            Area areaSubDirreccion;
            Area areaGerencia;
            while ((renglon = reader.readLine()) != null) {

                valores = renglon.split(SEPARATOR);

                areaDireccion = getSaveArea(valores[7], null);

                areaSubDirreccion = getSaveArea(valores[8], areaDireccion);

                areaGerencia = getSaveArea(valores[9], areaSubDirreccion);

                getSaveArea(valores[10], areaGerencia);

            }
        } catch (IOException ex) {
            LOG.error("Error loading AREA_RELOAD", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving AREA_RELOAD", e);
        }
    }

    public Area getSaveArea(String nombre, Area areaPadre) {
        Area area;
        try {

            area = em.createQuery("SELECT a FROM Area a WHERE a.nombre = :departamento", Area.class)
                    .setParameter("departamento", nombre)
                    .getSingleResult();
        } catch (NoResultException ex) {
//            em.getTransaction().begin();
            area = new Area();
            area.setNombre(nombre);
            area.setAreaPadre(areaPadre);
            em.persist(area);
//            em.getTransaction().commit();
        }
        return area;
    }

    public void updateUsersRealoadFromFile() {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(usuarioReloadTxt.getInputStream(), "UTF-8"));) {

            String renglon;
            String[] valores;
            Usuario usuario;
            Area area;
            Oficina oficina;
            Puesto puesto;
            while ((renglon = reader.readLine()) != null) {
                valores = renglon.split(SEPARATOR);
                try {
                    em.createQuery("SELECT u.id FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Integer.class)
                            .setParameter("nEmpleado", valores[0])
                            .getSingleResult();
                    continue;
                } catch (NoResultException e) {
                }

                usuario = new Usuario();
                usuario.setNEmpleado(valores[0]);
                usuario.setUsuarioRed(valores[1]);
                usuario.setNombre(valores[2]);
                usuario.setAPaterno(valores[3]);
                usuario.setAMaterno(valores[4]);
                usuario.setCorreo(valores[5]);
                usuario.setExtension(valores[6]);
                try {
                    area = em.createQuery("SELECT a FROM Area a WHERE a.nombre = :departamento", Area.class)
                            .setParameter("departamento", valores[10])
                            .getSingleResult();
                } catch (NoResultException ex) {
                    area = null;
                }
                usuario.setArea(area);

                try {
                    oficina = em.createQuery("SELECT o FROM Oficina o WHERE o.nombre = :oficina", Oficina.class)
                            .setParameter("oficina", valores[11])
                            .getSingleResult();
                } catch (NoResultException ex) {
                    oficina = null;
                }
                usuario.setOficina(oficina);

                try {
                    puesto = em.createQuery("SELECT p FROM Puesto p WHERE p.nombre = :puesto", Puesto.class)
                            .setParameter("puesto", valores[12])
                            .getSingleResult();
                } catch (NoResultException ex) {
                    puesto = null;
                }
                usuario.setPuesto(puesto);

                em.persist(usuario);
                em.flush();
            }
        } catch (IOException ex) {
            LOG.error("Error loading USUARIO_RELOAD", ex);
        } catch (NumberFormatException e) {
            LOG.error("Error saving USUARIO_RELOAD", e);
        }

    }

    public void addProfileToAdmin(Perfil perfil) {
        Integer idAdmin = em.createQuery("SELECT u.id FROM Usuario u WHERE u.nEmpleado = :nEmpleado", Integer.class)
                .setParameter("nEmpleado", "admin")
                .getSingleResult();
        addProfileToUser(perfil, new Usuario(idAdmin));
    }

    public void addMenuToProfile(Perfil perfil, Menu menu) {
        PerfilMenu perfilMenu = new PerfilMenu();
        perfilMenu.setMenu(menu);
        perfilMenu.setPerfil(perfil);
        em.persist(perfilMenu);
        em.flush();
    }

    public Menu getMenu(Perfil perfil, String nombre, String url, Menu menuPadre) {
        return getMenu(perfil, null, nombre, null, url, (short) 0, menuPadre);
    }

    public Menu getMenu(Perfil perfil, String url, Menu menuPadre) {
        return getMenu(perfil, null, null, null, url, (short) 0, menuPadre);
    }

    public Menu getMenu(Perfil perfil, String icono, String nombre, Short orden) {
        return getMenu(perfil, icono, nombre, orden, null, (short) 1, null);
    }

    public Menu getMenu(Perfil perfil, String icono, String nombre, Short orden, Menu menuPadre) {
        return getMenu(perfil, icono, nombre, orden, null, (short) 1, menuPadre);
    }

    public Menu getMenu(Perfil perfil, String icono, String nombre, Short orden, String url) {
        return getMenu(perfil, icono, nombre, orden, url, (short) 1, null);
    }

    public Menu getMenu(Perfil perfil, String icono, String nombre, Short orden, String url, Menu menuPadre) {
        return getMenu(perfil, icono, nombre, orden, url, (short) 1, menuPadre);
    }

    public Menu getMenu(Perfil perfil, String icono, String nombre, Short orden, String url, Short visible, Menu menuPadre) {
        Menu menu;
        try {
            if (url != null) {
                menu = em.createQuery("SELECT m FROM Menu m WHERE m.url = :url", Menu.class)
                        .setParameter("url", url)
                        .getSingleResult();
            } else {
                menu = em.createQuery("SELECT m FROM Menu m WHERE m.nombre = :nombre", Menu.class)
                        .setParameter("nombre", nombre)
                        .getSingleResult();
            }
        } catch (NoResultException ex) {
            menu = new Menu();
            menu.setIcono(icono);
            menu.setNombre(nombre);
            menu.setOrden(orden);
            menu.setUrl(url);
            menu.setVisible(visible);
            menu.setMenuPadre(menuPadre);
            em.persist(menu);
            em.flush();
            if (perfil != null) {
                addMenuToProfile(perfil, menu);
            }
        }

        return menu;
    }

    public void addProfileToUser(Perfil perfil, Usuario usuario) {
        UsuarioPerfil usuarioPerfil = new UsuarioPerfil();
        usuarioPerfil.setPerfil(perfil);
        usuarioPerfil.setUsuario(usuario);
        em.persist(perfil);
        em.persist(usuarioPerfil);
        em.flush();
    }

    public void addToProperties(Propiedades propiedades, EntityManager entityManager) {
        try {
            entityManager.createQuery("SELECT p.id FROM Propiedades p WHERE p.name = :name", Short.class)
                    .setParameter("name", propiedades.getName())
                    .getSingleResult();
        } catch (NoResultException ex) {
            entityManager.persist(propiedades);
            entityManager.flush();
        }

    }

    public void initMenu(Perfil perfil) {

        Menu menuMainModule = getMenu(perfil, "fa fa-cogs", "Administración", (short) 0);

        Menu menuUser = getMenu(perfil, "fa fa-users", "Usuarios", (short) 1, "/admin/admin/user", menuMainModule);
        getMenu(perfil, "Servicio de usuario", "/rest/user-profile", menuUser);
        getMenu(perfil, "Servicio de menus de usuario", "/rest/menu-tree-by-usuario", menuUser);

        Menu menuProfile = getMenu(perfil, "fa fa-shield", "Perfiles", (short) 2, "/admin/admin/profile", menuMainModule);
        getMenu(perfil, "Servicio de perfiles", "/rest/profiles", menuProfile);
        getMenu(perfil, "Servicio de usuario/perfil", "/rest/user-profile", menuProfile);
        getMenu(perfil, "Servicio de menu", "/rest/menu", menuProfile);
        getMenu(perfil, "Servicio de arbol de menus", "/rest/menu-tree", menuProfile);
        getMenu(perfil, "Servicio de menus de perfil", "/rest/menu-tree-by-perfil", menuProfile);
        getMenu(perfil, "Servicio de edición de usuarios", "/rest/user-profile-rest", menuProfile);

    }

}
