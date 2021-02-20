package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.model.Modulo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.model.Modulo_usuario_entity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.LdapService;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.ModuloUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Oficina;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Puesto;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;
import org.jasypt.util.password.BasicPasswordEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Service
@Component
@Transactional(noRollbackFor = NoResultException.class)
public class UserProfilerDao {
    public boolean pswdFlag=false;
    public boolean userEx=false;
    private LoginDao loginD;
    private static final Logger LOG = LoggerFactory.getLogger(UserProfilerDao.class);
    
    @Autowired
    private MailManager mailM;
    
    @Value(value = "classpath:mail_template_core.html")
    private Resource htmlTemplate;
    
    private static final String MAIL_SUBJECT = "Alerta Monitor Omega";
    private static final String SALTO = "\r\n";
    private static final String TAB = "    ";
    private static final String CORTE = "========================================";
    private static final String ENCODING = "UTF-8";
    private String emailDev="roberto.sosa@mail.telcel.com";
    private String emailProd="wsm2k.tools@mail.telcel.com";
    String message_mail1="El usuario  " ;
    String message_mail2=" requiere su registro en el portal con el fin de establecer la relación organizacional.\n";



    @PersistenceContext
    private EntityManager em;

    public void saveUserToProfile(List<Usuario> usuarios, Perfil perfil) {

        UsuarioPerfil usuarioPerfil;

        for (Usuario u : usuarios) {
            usuarioPerfil = new UsuarioPerfil();
            usuarioPerfil.setPerfil(perfil);
            usuarioPerfil.setUsuario(u);
            em.persist(usuarioPerfil);
        }
    }

    public void saveUserToProfile(List<Perfil> perfiles, Usuario usuario) {

        UsuarioPerfil usuarioPerfil;

        for (Perfil p : perfiles) {
            usuarioPerfil = new UsuarioPerfil();
            usuarioPerfil.setUsuario(usuario);
            usuarioPerfil.setPerfil(p);
            em.persist(usuarioPerfil);
        }
    }

    public void deleteUserToProfile(List<Usuario> usuario, Perfil perfil) {
        em.createQuery("DELETE FROM UsuarioPerfil m WHERE m.perfil = :perfil AND m.usuario IN :user")
                .setParameter("perfil", perfil)
                .setParameter("user", usuario)
                .executeUpdate();
    }

    public void deleteUserToProfile(List<Perfil> perfiles, Usuario usuario) {
        em.createQuery("DELETE FROM UsuarioPerfil m WHERE m.usuario = :usuario AND m.perfil IN :perfiles")
                .setParameter("usuario", usuario)
                .setParameter("perfiles", perfiles)
                .executeUpdate();
    }

    public void saveUser(Usuario usuario) {

        Usuario usrExist = null;

        try {
            usrExist = this.getUserByNumEmpleado(usuario.getNEmpleado());
        } catch (Exception e) {
            LOG.error("Error al buscar Usuario: " + usuario.getNEmpleado(), e);
        }

        if (usrExist != null) {
            LOG.info("SE ACTUALIZARÁ EL USUARIO!");
            usrExist.setNombre(usuario.getNombre());
            usrExist.setAPaterno(usuario.getAPaterno());
            usrExist.setAMaterno(usuario.getAMaterno());
            usrExist.setCorreo(usuario.getCorreo());
            usrExist.setUsuarioRed(usuario.getUsuarioRed());
            usrExist.setExtension(usuario.getExtension());
            em.merge(usrExist);
        } else {
            em.persist(usuario);
        }

    }

    public Usuario getUserById(Integer idUsuario) {
        return em.createQuery("SELECT m FROM Usuario m WHERE m.id = :idusr", Usuario.class)
                .setParameter("idusr", idUsuario)
                .getSingleResult();
    }

    public Usuario getUserByNumEmpleado(String numEmpleado) {
        return em.createQuery("SELECT m FROM Usuario m WHERE m.nEmpleado = :numemp", Usuario.class)
                .setParameter("numemp", numEmpleado)
                .getSingleResult();
    }
    
    /**
     * Método para obtener un usuario a partir de el email ingresado
     * @param email email con el cual se buscará al usuario correspondiente
     * @return usuario obtenido en la busqueda
     */
    public Usuario getUsuarioByMail(String email){
        return em.createQuery("SELECT m FROM Usuario m WHERE m.correo = :email", Usuario.class)
                .setParameter("email", email)
                .getSingleResult();
        
    }
    
    /**
     * Método para obtener los perfiles permitidos en el modulo de registro
     * @return lista de perfiles obtenidos en la busqueda
     */
    public List<Perfil> getPerfilesRegistro() {
        return em.createQuery("SELECT p FROM Perfil p WHERE p.descripcion IS NOT NULL", Perfil.class).getResultList();
    }
    
    /**
     * Método para obtener un perfil a partir del un id de perfil ingresado
     * @param idPerfil id del perfil que se desea encontrar 
     * @return perfil obtenido en la busqueda
     */
    public Perfil getPerfilById(Integer idPerfil){
        return em.createQuery("SELECT p FROM Perfil p WHERE p.id= :idperf",Perfil.class)
                .setParameter("idperf",idPerfil)
                .getSingleResult();
    }
    
    /**
     * Método para la validación de credencial de acceso a ldap
     * @param nEmpleado número de empleado del usuario
     * @param password contraseña de usuario
     * @return true si la validación es correcta o false en caso contrario
     */
    public boolean validaPassword(String nEmpleado,String password){
        
        LdapService ldapService = new LdapService();
        LOG.info("NEMPLEADO-> "+nEmpleado+", PASSWORD-> "+password);
        String result=ldapService.getLdap().autenticarUsuario(nEmpleado, password);
        String arrResult[] = result.split("\\|");
        if(arrResult[0].equals("1")){
            pswdFlag=true;
        }else{
            pswdFlag=false;
        }
        
        return pswdFlag;
    }
    
    
    /**
     * Método de validación de número de empleado
     * @param nEmpleado
     * @param password
     * @return 
     */
    public boolean validaN_empleado(String nEmpleado,String password){
        //LdapService ldapService = new LdapService();
        LOG.info("NEMPLEADO-> "+nEmpleado+", PASSWORD-> "+password);
        //String result=ldapService.getLdap().autenticarUsuario(nEmpleado, password);
        //String arrResult[] = result.split("\\|");
        /*if(arrResult[0].equals("1")  || arrResult[0].equals("2")){
            userEx=true;
        }else{
            userEx=false;
        }*/
        userEx=true;
        return userEx;
    }
    
    /**
     * Métodode encriptación de contraseña
     * @param password contraseña del usuario
     * @return cadena que contiene la encriptación de la contraseña ingresada.
     */
    public String encryptPass(String password){
        String newPass="";
        BasicPasswordEncryptor encryptor= new BasicPasswordEncryptor();
        newPass=encryptor.encryptPassword(password);

        
        return newPass;
    }
    
    /**
     * Método para envío de email
     * @param to destinatario del email
     * @param nombre nombre del usuario que ah intentado realizar el registro en el sistema
     * @return true en caso de que el email se envíe correctamente o flase en caso contrario
     */
    public boolean sendMail(String to,String nombre){
        try{
            LOG.info("INIT SEND MAIL METHOD");
            String htmlMessage= formatHtml(nombre);
            mailM.sendMimeMail(emailProd, to,  "SOLICITUD DE REGISTRO A WS M2K TOOLS", htmlMessage);
            LOG.info("INIT SEND MAIL METHOD");
            return true;
        }catch(Exception ex){
            ex.printStackTrace();
            return false;
        }
    }
        
    /**
     * Método para dar formato a un email a enviar
     * @param nombre nombre del usuario que ah intentado realizar el registro en el sistema
     * @return cadena que contiene el email ya formateado al templete asignado
     */
    public String formatHtml(String nombre){
        StringBuilder sb = new StringBuilder();
        
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        BufferedReader reader = null;
        Map<String, String> template = new HashMap<>();
        template.put(Constants.BG_PRINCIPAL, mailM.getBackgroundUrl() != null ? mailM.getBackgroundUrl() : "");
        template.put(Constants.TELCEL_LOGO, mailM.getTelcelLogoUrl() != null ? mailM.getTelcelLogoUrl() : "");
        template.put(Constants.INFORMACION ,message_mail1+" "+nombre+" "+message_mail2);
        template.put(Constants.FOOTER_NOTE, "");
        template.put(Constants.FOOTER_LINK, "");
        try {
            reader = new BufferedReader(new InputStreamReader(htmlTemplate.getInputStream(), ENCODING));
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append(System.lineSeparator());
            }
            reader.close();
            String message = sb.toString();
            for (Map.Entry<String, String> entry : template.entrySet()) {
                message = message.replace(entry.getKey().trim(), entry.getValue().trim());
            }
            return message;
        } catch (IOException ex) {
            LOG.error("No se pudo obtener archivo de templado", ex);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException ex) {
                    LOG.error("No se pudo cerrar el reader", ex);
                }
            }
        }
        return null;
    }
            
    
    
    
    /**
     * Método ara obtener las áreas laborales registradas en el sistema
     * @return listado de las áreas laborales registradas
     */
    public List<Area> getAreas(){
        return em.createQuery("SELECT a FROM Area a", Area.class).getResultList();
    }
    
    /**
     * Método para obtener un área laboral especifica a partir de un id de área
     * @param area identificador del area a buscar
     * @return área obtenida en la busqueda.
     */
    public Area getArea(String area){
        return em.createQuery("SELECT a FROM Area a WHERE a.id="+area,Area.class).getSingleResult();
    }
    
    /**
     * Método para obtener una locación de oficinaa a partir de un identificador de oficina
     * @param oficina identificador de la oficina que se requiere
     * @return oficinaobtenida en la busqueda
     */
    public Oficina getOficina(String oficina){
        return em.createQuery("SELECT o FROM Oficina o WHERE o.id="+oficina,Oficina.class).getSingleResult();
    }
    
    /**
     * Método para obtener las oficinas registradas en el sistema
     * @return listado de las oficinas registradas
     */
    public List<Oficina> getOficinas(){
        return em.createQuery("SELECT o FROM Oficina o", Oficina.class).getResultList();
    }
    
    /**
     * método para obtener un puesto de empleado especifico a partir de un identificador de puesto
     * @param puesto identificador del puesto a obtener
     * @return puesto de empleado obtenido en la busqueda.
     */
    public Puesto getPuesto(String puesto){
        return em.createQuery("SELECT p FROM Puesto p WHERE p.id="+puesto,Puesto.class).getSingleResult();
    }
    
    /**
     * Método para obtener los puestos de empleado registrados en el sistema
     * @return listado de puestos de empleado registrados.
     */
    public List<Puesto> getPuestos(){
        return em.createQuery("SELECT p FROM Puesto p", Puesto.class).getResultList();
    }
    
    
    /**
     * 
     * @param usuario
     * @param modUser
     * @param modUser3
     * @param modUser2952
     * @param modUser4952 
     */
    public boolean registerUser(Usuario usuario,List<Modulo> modUser) {
        Perfil perf=new Perfil();
        Usuario usrExist = null;
        try {
            usrExist = this.getUserByNumEmpleado(usuario.getNEmpleado());
        } catch (Exception e) {
            LOG.error("Error al buscar Usuario: " + usuario.getNEmpleado(), e);
        }

        if (usrExist != null) {
            return false;
        } else {
            usrExist=usuario;
            em.persist(usrExist);
            for(Modulo mod : modUser){
                UsuarioPerfil userPerf=new UsuarioPerfil();
                ModuloUsuario mu = new ModuloUsuario();
                int idp=Integer.parseInt(mod.getModulo());
                perf=getPerfilById(idp);
                userPerf.setPerfil(perf);
                userPerf.setUsuario(usrExist);
                mu.setModulo(mod.getModulo());
                mu.setJustificacion(mod.getJustificacion());
                mu.setIdUsuario(usuario);
                em.persist(mu);
                em.persist(userPerf);
                
            }
            /*if(modUser.getModulo()!=null){
                UsuarioPerfil userPerf2=new UsuarioPerfil();               
                int idp=Integer.parseInt(modUser.getModulo());
                perf=getPerfilById(idp);
                userPerf2.setPerfil(perf);
                userPerf2.setUsuario(usrExist);
                em.persist(modUser);
                em.persist(userPerf2);
            }
            if(modUser3.getModulo()!=null){
                UsuarioPerfil userPerf3=new UsuarioPerfil();
                int idp2=Integer.valueOf(""+modUser3.getModulo());
                perf=getPerfilById(idp2);
                userPerf3.setPerfil(perf);
                userPerf3.setUsuario(usrExist);
                em.persist(modUser3);
                em.persist(userPerf3);
            }
            if(modUser2952.getModulo()!=null){
                UsuarioPerfil userPerf2952=new UsuarioPerfil();
                int idp2=Integer.valueOf(""+modUser2952.getModulo());
                perf=getPerfilById(idp2);
                userPerf2952.setPerfil(perf);
                userPerf2952.setUsuario(usrExist);
                em.persist(modUser2952);
                em.persist(userPerf2952);
            }
            if(modUser4952.getModulo()!=null){
                UsuarioPerfil userPerf4952=new UsuarioPerfil();
                int idp2=Integer.valueOf(""+modUser4952.getModulo());
                perf=getPerfilById(idp2);
                userPerf4952.setPerfil(perf);
                userPerf4952.setUsuario(usrExist);
                em.persist(modUser4952);
                em.persist(userPerf4952);
            }
            if(modUsr9952.getModulo()!=null){
                UsuarioPerfil userPerf9952=new UsuarioPerfil();
                int idp2=Integer.valueOf(""+modUsr9952.getModulo());
                perf=getPerfilById(idp2);
                userPerf9952.setPerfil(perf);
                userPerf9952.setUsuario(usrExist);
                em.persist(modUsr9952);
                em.persist(userPerf9952);
            }*/
            
            return true;
        }

    }
    
    public List<String> getModulos(Modulo_usuario_entity modUser){
        List<String> listModules = Arrays.asList(modUser.getModulos());
        return listModules;
        
    }
        
    public List<UsuarioPerfil> getAllUsuarioPerfilByUsuarioAndPerfil(Usuario usuario, Perfil perfil) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT u FROM UsuarioPerfil u WHERE u.usuario = :usuario AND u.perfil = :perfil", UsuarioPerfil.class)
                    .setParameter("usuario", usuario)
                    .setParameter("perfil", perfil)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

}
