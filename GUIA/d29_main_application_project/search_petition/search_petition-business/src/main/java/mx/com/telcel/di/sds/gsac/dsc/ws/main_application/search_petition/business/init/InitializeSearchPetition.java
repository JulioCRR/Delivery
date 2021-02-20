
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.init;


import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.InitializeCore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Menu;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch.PetitionStatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29EstatusBatch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Component
@Transactional
public class InitializeSearchPetition {

    private static final Logger LOG = LoggerFactory.getLogger(InitializeSearchPetition.class);

    public static final String MODULE_SHORT_NAME = "busquedapeticion";
    public static final String MODULE_NAME = "SEARCH PETITION";
    

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private InitializeCore initializeCore;

    private Menu menuMainModule;
    
    @Autowired
    private PetitionStatus status;
    
    
    @Autowired
    private EntityManagerUtil emUtil;
    

    @Order(Ordered.HIGHEST_PRECEDENCE)
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        
        busquedaEstatus();
        LOG.info("#################### Cheking " + MODULE_NAME + " MODULE catalogs ####################");
        Perfil perfil = initializeCore.initPerfil(MODULE_NAME);
        
         initMenu(perfil);
         //updateUsersProfileReloadFromFile(perfil);

        try {
            em.createQuery("SELECT u.nEmpleado FROM Usuario u WHERE u.nEmpleado = :nEmpleado", String.class)
                    .setParameter("nEmpleado", MODULE_SHORT_NAME)
                    .getSingleResult();
            return;
        } catch (NoResultException e) {
        }
        LOG.info("#################### Initializing " + MODULE_NAME + " MODULE catalogs ####################");
        
        Usuario usuario = initUser();

        initMenu(perfil);
        initializeCore.addProfileToUser(perfil, usuario);
        //initUsersProfileFromFile(perfil);
    }

    public void initMenu(Perfil perfil) {
        menuMainModule = initializeCore.getMenu(perfil, "fa fa-book", "Buscar en Bitácora", (short) 1, "/admin/search-petition");

        initializeCore.getMenu(perfil, "Servicio de búsqueda petición", "/rest/search-petition", menuMainModule);
   
    }

    public Usuario initUser() {
        Usuario user = new Usuario();
        user.setNEmpleado(MODULE_SHORT_NAME);
        user.setPassword(MODULE_SHORT_NAME);
        user.setNombre("Busqueda de peticiones");
        em.persist(user);
        return user;
    }
    
     public void busquedaEstatus(){
    
     LOG.info(" #################### SEARCH FOR STATUS #################### ");
     
       EntityManager em = emUtil.getEntityManager();
       List<D29ConPeticionBatch> peticionBatch;
       EstatusFront front = new EstatusFront();
        short Id = 2;
        try {
            String query = "SELECT d FROM D29ConPeticionBatch d WHERE d.estatusPet = :estatusPet";
            TypedQuery<D29ConPeticionBatch> q = em.createQuery(query, D29ConPeticionBatch.class);
            q.setParameter("estatusPet", new D29EstatusBatch(Id));
           
            peticionBatch =  q.getResultList();
            
            for(D29ConPeticionBatch registros : peticionBatch){
                front.setFolioFront(registros.getIdfolio());
                status.changeStatus(front, 1);
            }
            
            status.deleteRecords();           
        } catch (Exception ex) {
            LOG.error("Error al buscar estatus con el reinicio");
            ex.printStackTrace();
        }
    }
}
