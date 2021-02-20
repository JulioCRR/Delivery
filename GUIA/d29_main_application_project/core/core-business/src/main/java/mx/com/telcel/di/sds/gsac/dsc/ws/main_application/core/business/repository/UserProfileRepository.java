package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.repository;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.LoginDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.UserProfilerDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.model.Modulo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.model.Modulo_usuario_entity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.ModuloUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Oficina;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Puesto;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;
import org.jasypt.util.password.BasicPasswordEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Qualifier(value = "entityManagerFactory")
@RepositoryRestResource(collectionResourceRel = "userprofile", path = "user-profile")
public interface UserProfileRepository extends PagingAndSortingRepository<UsuarioPerfil, Integer> {

    @Query(
            value = "SELECT s.usuario FROM UsuarioPerfil s WHERE s.perfil.id = :perfilId ORDER BY s.usuario.nombre",
            countQuery = "SELECT COUNT(s) FROM UsuarioPerfil s WHERE s.perfil.id = :perfilId"
    )
    Page<Usuario> findByPerfilId(@Param("perfilId") Integer perfilId, Pageable pageable);

    @Query(
            value = "SELECT s.perfil FROM UsuarioPerfil s WHERE s.usuario.id = :userId ORDER BY s.perfil.nombre",
            countQuery = "SELECT COUNT(s) FROM UsuarioPerfil s WHERE s.usuario.id = :userId"
    )
    Page<Perfil> findByUserId(@Param("userId") Integer userId, Pageable pageable);
    
    @Query(
            value = "SELECT s FROM Usuario s WHERE s.id not in (SELECT p.usuario.id FROM UsuarioPerfil p WHERE p.perfil.id = ?2) AND ( lower(s.nEmpleado) like %?1% OR lower(s.nombre) like %?1% OR lower(s.aPaterno) like %?1%  OR lower(s.aMaterno) like %?1%  OR lower(s.nEmpleado) like %?1% ) ORDER BY s.nombre",
            countQuery = "SELECT COUNT(s) FROM Usuario s WHERE s.id not in (SELECT p.usuario.id FROM UsuarioPerfil p WHERE p.perfil.id = ?2) AND (lower(s.nEmpleado) like %?1% OR lower(s.nombre) like %?1% OR lower(s.aPaterno) like %?1%  OR lower(s.aMaterno) like %?1%  OR lower(s.nEmpleado) like %?1% )"
    )
    Page<Usuario> findByTextForWhitoutProfile(@Param("text") String text, @Param("idProfile") Integer idProfile, Pageable pageable);

    @Query(
            value = "SELECT s FROM Perfil s WHERE s.id not in (SELECT p.perfil.id FROM UsuarioPerfil p WHERE p.usuario.id = ?1) ORDER BY s.nombre",
            countQuery = "SELECT COUNT(s) FROM Perfil s WHERE s.id not in (SELECT p.perfil.id FROM UsuarioPerfil p WHERE p.usuario.id = ?1) ORDER BY s.nombre"
    )
    Page<Perfil> findByTextForWhitoutUser(@Param("idUser") Integer idUser, Pageable pageable);
    
    @Query(
            value = "SELECT s FROM Usuario s WHERE s.id = :idUser"
    )
    Usuario findUserById(@Param("idUser") Integer idUser);
    
    
    @RestController
    public class UserProfileRest {
        
        private static final Logger LOG = LoggerFactory.getLogger(UserProfileRest.class);
        private LoginDao logD;

        @Autowired
        private UserProfilerDao userProfilerDao;

        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "user-profile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<Void> userSaveInProfile(HttpSession session, @RequestBody UserProfileWrapper upw) {
            List<Usuario> usuarios = new ArrayList<>();
            List<Perfil> perfiles = new ArrayList<>();
            Usuario usuario;
            Perfil perfil;
            if (upw.getUsers() != null) {
                perfil = new Perfil(upw.getId());
                for (Integer id : upw.getUsers()) {
                    usuario = new Usuario(id);
                    usuarios.add(usuario);
                }
                userProfilerDao.saveUserToProfile(usuarios, perfil);
            } else {
                usuario = new Usuario(upw.getId());
                for (Integer id : upw.getProfiles()) {
                    perfil = new Perfil(id);
                    perfiles.add(perfil);
                }
                userProfilerDao.saveUserToProfile(perfiles, usuario);
            }

            ResponseEntity<Void> response = new ResponseEntity<>(HttpStatus.OK);
            return response;
        }

        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "user-profile", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<Void> userDeleteInProfile(HttpSession session, @RequestBody UserProfileWrapper upw) {
            List<Usuario> usuarios = new ArrayList<>();
            List<Perfil> perfiles = new ArrayList<>();
            Usuario usuario;
            Perfil perfil;

            if (upw.getUsers() != null) {
                perfil = new Perfil(upw.getId());
                for (Integer id : upw.getUsers()) {
                    usuario = new Usuario(id);
                    usuarios.add(usuario);
                }
                userProfilerDao.deleteUserToProfile(usuarios, perfil);
            } else {
                usuario = new Usuario(upw.getId());
                for (Integer id : upw.getProfiles()) {
                    perfil = new Perfil(id);
                    perfiles.add(perfil);
                }
                userProfilerDao.deleteUserToProfile(perfiles, usuario);
            }

            ResponseEntity<Void> response = new ResponseEntity<>(HttpStatus.OK);
            return response;
        }

        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "user-profile/saveSingleUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity guardarUsuario(HttpSession session, @RequestBody Usuario usuario) {
            
            LOG.info("GUARDANDO USUARIO...");
            LOG.info("USUARIO" + usuario.toString());
            
            userProfilerDao.saveUser(usuario);
            ResponseEntity<Usuario> response = new ResponseEntity<Usuario>(usuario,HttpStatus.OK);    
            LOG.info("USUARIO GUARDADO CORRECTAMENTE!");
            return response;
            
        }
       
        
        /**
         * 
         * @param session
         * @param email
         * @param usuario
         * @return 
         */
        @RequestMapping(value="/registro/user-profile/enviaEmail",method=RequestMethod.POST,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity sendEmailBoss(HttpSession session,@RequestBody String email){
            LOG.info("SE ENVIAR� EL EMAIL A -> "+email);
            String arrResult[] = email.split("\\|");
            try{
                LOG.info("INTO TRY");
                userProfilerDao.sendMail(arrResult[0], arrResult[1]);
                LOG.info("FINISH SEND MAIL METHOD");
                return new ResponseEntity<>(email,HttpStatus.OK);
            }catch(Exception ex){
                ex.printStackTrace();
                return new ResponseEntity<>(email,HttpStatus.NOT_ACCEPTABLE);
            }
        }
        
        /**
         * 
         * @param session
         * @param modUsuario
         * @param usuario
         * @return 
         */
        @RequestMapping(value ="/registro/user-profile/saveUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity guardarRegistro( HttpSession session, @RequestBody Modulo_usuario_entity modUsuario) {
            LOG.info("EL USUARIO ES ->" +modUsuario.toString());
            boolean saved=false;
            String resp="";
            Usuario user=new Usuario();
            boolean pwd=false;
            boolean userEx=false;
            try{    
                user.setNEmpleado(modUsuario.getnEmpleado());
                user.setNombre(modUsuario.getNombre());
                user.setAPaterno(modUsuario.getaPaterno());
                user.setAMaterno(modUsuario.getaMaterno());
                user.setCorreo(modUsuario.getCorreo());
                user.setUsuarioRed(modUsuario.getUsuarioRed());
                user.setExtension(modUsuario.getExtension());
                user.setArea(userProfilerDao.getArea(""+modUsuario.getArea()));
                user.setOficina(userProfilerDao.getOficina(""+modUsuario.getOficina()));
                user.setPuesto(userProfilerDao.getPuesto(""+modUsuario.getPuesto()));
                LOG.info("RESPONSABLE -> "+modUsuario.getResponsable());
                resp=modUsuario.getResponsable();
                user.setPassword(modUsuario.getPassword());
                List<Modulo> modulos=new ArrayList();
                Modulo modU = new Modulo();
                modU.setModulo("4952");
                modU.setJustificacion("Modulo creado de forma automatica");
                LOG.info("MODULO A GUARDAR ---->>>>>> "+modU.getModulo());
                modulos.add(modU);
                /*for(String mu: userProfilerDao.getModulos(modUsuario)){
                    Modulo modU = new Modulo();
                    //modU.setIdUsuario(modUsuario);
                    modU.setModulo(mu);
                    modU.setJustificacion(modUsuario.getJustificacion());
                    LOG.info("MODULO A GUARDAR ---->>>>>> "+mu);
                    modulos.add(modU);
                }*/
                
                /*try{
                    responsable=userProfilerDao.getUsuarioByMail(modUsuario.getResponsable());
                    LOG.info("EL RESPONSABLE ES -> "+responsable);
                }catch(Exception ex){
                
                }*/
                
                /*if(user.getPuesto().getNombre().equals("Gerente")){
                    LOG.info("EL USUARIO ES GERENTE");
                }else{
                    if(responsable.getId()==null){
                        LOG.info("EL CORREO NO SE ENCUENTRA REGISTRADO EN EL SISTEMA, SE PEDIRA REGISTRO");
                        return new ResponseEntity<>(user,HttpStatus.PRECONDITION_REQUIRED);
                    }
                    user.setResponsable(responsable.getId().toString());
                }*/
                
                LOG.info("INIT THE LOGIN VALIDATION FOR PASSWORD");
               pwd=userProfilerDao.validaPassword(""+user.getNEmpleado(), user.getPassword());
               userEx=userProfilerDao.validaN_empleado(user.getNEmpleado(), user.getPassword());
               
               if(!userEx){
                   LOG.info("EL NÚMERO DE EMPLEADO INGRESADO ES ERRONEO ");
                   return new ResponseEntity<>(user,HttpStatus.LOCKED);
               }
               
               LOG.info("FINISH THE LOGIN VALIDATION FOR PASSWORD");
               if(pwd){
                   /*INGRESAR VALORES DE USUARIO A GUARDAR JUNTO SIN EL PASSWORD 
                   */
                   user.setPassword(userProfilerDao.encryptPass(modUsuario.getPassword()));
                   LOG.info("NO SE GUARDARO EL PWD ->"+user.getPassword() );
                   user.setPassword(null);
                   saved=userProfilerDao.registerUser(user,modulos);
                   LOG.info("SAVED VALUE IS ->>>> "+ saved);
               }else{
                   LOG.info("SE GUARDARO EL PWD ->"+user.getPassword());
                   saved=userProfilerDao.registerUser(user, modulos);
                   LOG.info("SAVED VALUE IS ->>>> "+ saved);
               }
                if(saved){
                    LOG.info("USUARIO -> "+user.toString());
                    LOG.info("<<<<<<<<<<<==========EL CLIENTE NG AH CONSUMIDO CORRECTAMENTE EL SERVICIO EXPUESTO =======>>>>>>>>>>>>>>>>>>>");
                    return new ResponseEntity<>(user,HttpStatus.OK);
                }else{
                    LOG.info("EL USUARIO YA EXISTE");
                    return new ResponseEntity<>(user,HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }catch(Exception ex){
                ex.printStackTrace();
                return new ResponseEntity<>(user,HttpStatus.CONFLICT);
            }
            
            
            //ResponseEntity<Usuario> response = new ResponseEntity<Usuario>(usuario,HttpStatus.OK);    
            //LOG.info("USUARIO GUARDADO CORRECTAMENTE!");
            //return response;
        }
        
        /**
         * 
         * @return 
         */
        @RequestMapping(value="/registro/user-profile/getModules", method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity obtenerModulos(){
            List<Perfil> listaPerf=userProfilerDao.getPerfilesRegistro();
            
            for(int i=0;i<listaPerf.size();i++){
                if(listaPerf.get(i).getDescripcion()==null || listaPerf.get(i).getDescripcion()=="" || listaPerf.get(i).getId()==1){
                    listaPerf.remove(i);
                    i--;
                }
            }
            LOG.info("INIT GET PROFILES FOR REGISTER");
            return new ResponseEntity<>(listaPerf,HttpStatus.OK);
        }
        
        /**
         * 
         * @return 
         */
        @RequestMapping(value="/registro/user-profile/getAreas", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity obtenerAreas(){
            List<Area> listaArea=userProfilerDao.getAreas();
            LOG.info("INIT GET AREAS FOR REGISTER");
            return new ResponseEntity<>(listaArea,HttpStatus.OK);
        }
        
        /**
         * 
         * @return 
         */
        @RequestMapping(value="/registro/user-profile/getPuestos", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity obtenerPuestos(){
            List<Puesto> listaPuestos=userProfilerDao.getPuestos();
            LOG.info("INIT GET PUESTOS FOR REGISTER");
            return new ResponseEntity<>(listaPuestos,HttpStatus.OK);
        }
        
        /**
         * 
         * @return 
         */
        @RequestMapping(value="/registro/user-profile/getOficinas", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity obtenerOficinas(){
            List<Oficina> listaOficinas=userProfilerDao.getOficinas();
            LOG.info("INIT GET OFICINAS FOR REGISTER");
            return new ResponseEntity<>(listaOficinas, HttpStatus.OK);
        }
        
        /**
         * 
         * @param session
         * @param usuario
         * @return 
         */
        @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "user/{idusuario}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getUsuario(HttpSession session, @PathVariable("idusuario") Integer usuario) {
            LOG.info("OBTENIENDO USUARIO...");
            LOG.info("USUARIO: " +  usuario);
            
            Usuario user = userProfilerDao.getUserById(usuario);
            LOG.info("USUARIO OBTENIDO: " + user.toString());
            ResponseEntity<Usuario> response = new ResponseEntity<Usuario>(user,HttpStatus.OK);    
            LOG.info("USUARIO OBTENIDO CORRECTAMENTE!");
            return response;
            
        }
        
        /**
         * M�todo para obtener un usuario a partir de su n�mero de empleado
         
        @RequestMapping(value=BusinessConstants.BASE_PATH_REST+"user/{Nemp}",method=RequestMethod.GET,produces=MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity getUsuarioByNemp(HttpSession session, @PathVariable("Nemp")String Nempleado){
            LOG.info("OBTENIENDO USUARIO...");
            LOG.info("N� Empleado: " +  Nempleado);
            Usuario user=userProfilerDao.getUserByNumEmpleado(Nempleado);
            if(user!=null){
                LOG.info("USUARIO OBTENIDO -> "+user.toString());
                ResponseEntity<Usuario> response=new ResponseEntity<Usuario>(user,HttpStatus.OK);
                LOG.info("USUARIO OBTENIDO CORRECTAMENTE!");
                return response;
            }else{
                LOG.info("EL USUARIO NO EXISTE DENTRO DEL SISTEMA");
                ResponseEntity<Usuario> response=new ResponseEntity<Usuario>(user,HttpStatus.NOT_FOUND);
                return response;
            }
        }*/
        
    }

    public class UserProfileWrapper {

        public Integer id;
        public List<Integer> users;
        public List<Integer> profiles;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public List<Integer> getUsers() {
            return users;
        }

        public void setUsers(List<Integer> users) {
            this.users = users;
        }

        public List<Integer> getProfiles() {
            return profiles;
        }

        public void setProfiles(List<Integer> profiles) {
            this.profiles = profiles;
        }

    }

}
