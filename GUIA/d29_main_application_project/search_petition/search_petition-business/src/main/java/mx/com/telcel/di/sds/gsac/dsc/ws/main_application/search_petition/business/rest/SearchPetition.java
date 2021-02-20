package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest;

import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.dao.ServiciosInformixDao;
import static mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions.formatXML;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.DAO.SearchPetitionDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.db.D29ConPeticionBatch;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
@RestController
public class SearchPetition {

    private static final Logger LOG = LoggerFactory.getLogger(SearchPetition.class);

    @Autowired
    private SearchPetitionDao searchPetitionDao;
    
    @Autowired
    private ServiciosInformixDao informixDao;
    
    @RequestMapping(value = "/rest/validarConsulta", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity validarPeticion(HttpSession session, @RequestBody EnviarPeticion enviarConsulta) throws Exception {
        LOG.info("Validando Peticion: " + enviarConsulta);
        List <D29ConPeticionBatch>validacion= searchPetitionDao.validarConsulta(enviarConsulta);
        if (validacion != null) {
            return new ResponseEntity<>(validacion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }  
    }
    
    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "search-estatus/{userId}", method = RequestMethod.GET)
    public ResponseEntity<List<EstatusFront>> buscandoEstatus(@PathVariable("userId") String userId) {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO FOLIO DE LA PETICION:"  + userId);
        List<EstatusFront> status =  searchPetitionDao.serachByFolio(userId);
        if (status != null) {
            return new ResponseEntity<>(status, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    
    
    
    
     @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "search-petition/{idpetition}", method = RequestMethod.GET)
    public ResponseEntity<M2kInfoRegistro> executeCleanQueue(@PathVariable("idpetition") String idPetition) {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO PERTICION POR ID" + idPetition);
        M2kInfoRegistro infoRegistro = searchPetitionDao.serachByPetition(idPetition);
        if (infoRegistro != null) {
            infoRegistro.setXmlEntrada(formatXML(infoRegistro.getXmlEntrada()));
            infoRegistro.setXmlRespuesta(formatXML(infoRegistro.getXmlRespuesta()));
            LOG.info(formatXML(infoRegistro.getXmlEntrada()));
            LOG.info(formatXML(infoRegistro.getXmlRespuesta()));
            
            return new ResponseEntity<>(infoRegistro, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/rest/search-trans", method = RequestMethod.GET)
    public ResponseEntity searchTrans() {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO TRANSACCIONES MODULO SEARCH-PETITION ");
        
        if (informixDao.getServices() != null && informixDao.getServices().size() > 0) {
            return new ResponseEntity<>(informixDao.getServices(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/rest/search-users", method = RequestMethod.GET)
    public ResponseEntity searchUsers() {
        LOG.info(">>>>>>>>>>>>>>>>>>>>>>BUSCANDO USUARIOS MODULO SEARCH-PETITION ");
        
        if (informixDao.getUsers() != null && informixDao.getUsers().size()> 0) {
            return new ResponseEntity<>(informixDao.getUsers(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

  
    @RequestMapping(value = "/rest/guardarPeticion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity enviarPeticion(HttpSession session, @RequestBody EnviarPeticion enviarConsulta) {
        LOG.info("Guardando Peticion: " + enviarConsulta);
        if (enviarConsulta != null) {
            try {
                long folioBatch = searchPetitionDao.guardarConsulta(enviarConsulta);
                LOG.info("Obteniendo Folio... " + folioBatch);
                if (folioBatch != 0) {
                    return new ResponseEntity<>(folioBatch, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception ex) {
                LOG.error("ERROR AL GUARDAR SOLICITUD", ex);
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
            }
        } else {
            LOG.error("Error al recibir los datos para la busqueda en bitacora.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
