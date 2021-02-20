/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.repository;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Qualifier(value = "entityManagerFactory")
@RepositoryRestResource(collectionResourceRel = "profiles", path = "profiles")
public interface ProfileRepository extends PagingAndSortingRepository<Perfil, Integer> {

//    @RestController
//    public class ProfileRest {
//
//        private static final Logger LOG = LoggerFactory.getLogger(ProfileRest.class);
//
//        @Autowired
//        private ProfileDao profileDao;
//
//        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "profiles/save", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//        public ResponseEntity<Void> userSaveInProfile(HttpSession session, @RequestBody ProfileWrapper pw) {
//            profileDao.saveProfile(new Perfil(pw.id, pw.nombre));
//
//            ResponseEntity<Void> response = new ResponseEntity<>(HttpStatus.OK);
//            return response;
//        }
//
//    }
    public class ProfileWrapper {

        public Integer id;
        public String nombre;

        public ProfileWrapper(Integer id, String nombre) {
            this.id = id;
            this.nombre = nombre;
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

    }

}
