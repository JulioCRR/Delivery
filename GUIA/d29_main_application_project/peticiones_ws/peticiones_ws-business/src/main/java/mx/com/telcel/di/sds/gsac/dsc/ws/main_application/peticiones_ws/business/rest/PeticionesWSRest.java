package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.rest;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.ResponsableUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.PeticionProperties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.UsuarioProperties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapSolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapSolicitudUsuarioCorp;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Juan
 */
@RestController
public class PeticionesWSRest {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSRest.class);

    @Autowired
    private PeticionesWSRestHandler restHandler;

    @RequestMapping(value = Constants.PATH_REST + "getUsuarioPropertiesByUsuario", method = RequestMethod.GET)
    public ResponseEntity<UsuarioProperties> getUsuarioPropertiesByUsuario(@RequestParam(value = "idUsuario") Integer idUsuario) {
        if (idUsuario == null) {
            LOG.error("El usuario es nulo");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UsuarioProperties props = restHandler.getUsuarioPropertiesByUsuario(idUsuario);
        return new ResponseEntity<>(props, HttpStatus.OK);
    }

    // **************************************************
    // Solicitud Usuario Corporativo
    // **************************************************
    @RequestMapping(value = Constants.PATH_REST + "getRespUsuCorpByUsuarioCorp", method = RequestMethod.GET)
    public ResponseEntity<ResponsableUsuarioCorp> getRespUsuCorpByUsuarioCorp(@RequestParam(value = "usuarioCorp") String usuarioCorp) {
        if (StringUtils.isBlank(usuarioCorp)) {
            LOG.error("El usuario corporativo es nulo");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        ResponsableUsuarioCorp responsable = restHandler.getRespUsuCorpByUsuarioCorp(usuarioCorp.trim().toUpperCase());
        return new ResponseEntity<>(responsable, HttpStatus.OK);
    }

    @RequestMapping(value = Constants.PATH_REST + "saveSolicitudUsuarioCorp", method = RequestMethod.POST)
    public ResponseEntity saveSolicitudUsuarioCorp(@RequestBody WrapSolicitudUsuarioCorp wrapSolicitud) {
        if (wrapSolicitud == null || wrapSolicitud.getRespUsuCorp() == null || wrapSolicitud.getSolicitud() == null) {
            LOG.error("Solicitud incompleta: " + wrapSolicitud);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (restHandler.isSolicitudUsuarioCorpRepetida(wrapSolicitud.getSolicitud())) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        if (restHandler.saveSolicitudUsuarioCorp(wrapSolicitud.getSolicitud(), wrapSolicitud.getRespUsuCorp())) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "reportUsuarioCorp", method = RequestMethod.POST)
    public ResponseEntity reportUsuarioCorp(@RequestBody WrapSolicitudUsuarioCorp wrapSolicitud) {
        if (wrapSolicitud == null || wrapSolicitud.getSolicitud() == null || wrapSolicitud.getSolicitud().getSolicitante() == null) {
            LOG.error("Solicitud incompleta: " + wrapSolicitud);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        restHandler.reportUsuarioCorp(wrapSolicitud.getSolicitud(), wrapSolicitud.getReporte());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // **************************************************
    // Solicitud Peticiones Web
    // **************************************************
    @RequestMapping(value = Constants.PATH_REST + "getPeticionPropertiesByUsuario", method = RequestMethod.GET)
    public ResponseEntity<PeticionProperties> getPeticionPropertiesByUsuario(@RequestParam(value = "idUsuario") Integer idUsuario) {
        if (idUsuario == null) {
            LOG.error("El usuario es nulo");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PeticionProperties props = restHandler.getPeticionPropertiesByUsuario(idUsuario);
        return new ResponseEntity<>(props, HttpStatus.OK);
    }

    @RequestMapping(value = Constants.PATH_REST + "saveSolicitudPeticion", method = RequestMethod.POST)
    public ResponseEntity saveSolicitudPeticion(@RequestBody WrapSolicitudPeticion wrapSolicitud) {
        if (wrapSolicitud == null || wrapSolicitud.getSolicitudPeticion() == null || wrapSolicitud.getListPeticion() == null) {
            LOG.error("Solicitud incompleta: " + wrapSolicitud);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            if (restHandler.saveSolicitudPeticion(wrapSolicitud)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (Exception ex) {
            LOG.error("Ocurrio un error durante el registro de la solicitud", ex);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(wrapSolicitud, HttpStatus.ALREADY_REPORTED);
    }

    // **************************************************
    // List Solicitudes - Usuario Corporativo
    // **************************************************
    @RequestMapping(value = Constants.PATH_REST + "getAllSolUsuCorpBySolicitante", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudUsuarioCorp>> getAllSolUsuCorpBySolicitante(@RequestParam(value = "idUsuario") Integer idUsuario) {
        if (idUsuario == null) {
            LOG.error("Los datos son incompletos: Usuario=" + idUsuario);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<SolicitudUsuarioCorp> listSolicitud = restHandler.getAllSolUsuCorpByUsuario(idUsuario, false);
        if (listSolicitud != null) {
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllSolUsuCorpByResponsable", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudUsuarioCorp>> getAllSolUsuCorpByResponsable(@RequestParam(value = "idUsuario") Integer idUsuario) {
        if (idUsuario == null) {
            LOG.error("Los datos son incompletos: Usuario=" + idUsuario);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<SolicitudUsuarioCorp> listSolicitud = restHandler.getAllSolUsuCorpByUsuario(idUsuario, true);
        if (listSolicitud != null) {
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllSolUsuCorp", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudUsuarioCorp>> getAllSolUsuCorp() {
        List<SolicitudUsuarioCorp> listSolicitud = restHandler.getAllSolUsuCorp();
        if (listSolicitud != null) {
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "updateEstatusSolUsuCorp", method = RequestMethod.POST)
    public ResponseEntity updateEstatusSolUsuCorp(@RequestBody List<SolicitudUsuarioCorp> listSolicitud) {
        if (listSolicitud == null || listSolicitud.isEmpty()) {
            LOG.error("Lista de solicitudes de usuario corporativos esta vacia");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        boolean isUpdated = restHandler.updateEstatusSolUsuCorp(listSolicitud);
        if (isUpdated) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        LOG.info("No se actualizo el estatus de las solicitudes de usuario corporativo");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // **************************************************
    // List Solicitudes - Peticion
    // **************************************************
    @RequestMapping(value = Constants.PATH_REST + "getAllSolPeticionBySolicitante", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudPeticion>> getAllSolPeticionBySolicitante(@RequestParam(value = "idUsuario") Integer idUsuario) {
        if (idUsuario == null) {
            LOG.error("Los datos son incompletos: Usuario=" + idUsuario);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<SolicitudPeticion> listSolicitud = restHandler.getAllSolPeticionBySolicitante(idUsuario);
        if (listSolicitud != null && !listSolicitud.isEmpty()) {
            LOG.info("Se obtuvieron " + listSolicitud.size() + " solicitudes de peticiones del usuario [" + idUsuario + "]");
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        LOG.info("No hay solicitudes de peticiones");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllSolPeticionByNivelAutorizador", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudPeticion>> getAllSolPeticionByNivelAutorizador(@RequestParam(value = "nivel") Integer nivel) {
        if (nivel == null) {
            LOG.error("Los datos son incompletos: Nivel Autorizador=" + nivel);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<SolicitudPeticion> listSolicitud = restHandler.getAllSolPeticionByNivelAutorizador(nivel);
        if (listSolicitud != null && !listSolicitud.isEmpty()) {
            LOG.info("Se obtuvieron " + listSolicitud.size() + " solicitudes de peticiones del nivel de autorizador [" + nivel + "]");
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        LOG.info("No hay solicitudes de peticiones");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllSolPeticion", method = RequestMethod.GET)
    public ResponseEntity<List<SolicitudPeticion>> getAllSolPeticion() {
        List<SolicitudPeticion> listSolicitud = restHandler.getAllSolPeticion();
        if (listSolicitud != null && !listSolicitud.isEmpty()) {
            LOG.info("Se obtuvieron " + listSolicitud.size() + " solicitudes de peticiones");
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        LOG.info("No hay solicitudes de peticiones");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllPeticionBySolicitud", method = RequestMethod.GET)
    public ResponseEntity<List<Peticion>> getAllPeticionBySolicitud(@RequestParam(value = "idSolicitud") Long idSolicitud) {
        if (idSolicitud == null) {
            LOG.error("La solicitud es nula");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Peticion> listSolicitud = restHandler.getAllPeticionBySolicitud(idSolicitud);
        if (listSolicitud != null && !listSolicitud.isEmpty()) {
            LOG.info("Se obtuvieron " + listSolicitud.size() + " peticiones de la solicitud [" + idSolicitud + "]");
            return new ResponseEntity<>(listSolicitud, HttpStatus.OK);
        }
        LOG.info("No hay solicitudes de peticiones");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "updateEstatusSolPeticion", method = RequestMethod.POST)
    public ResponseEntity updateEstatusSolPeticion(@RequestBody List<SolicitudPeticion> listSolicitud) {
        if (listSolicitud == null || listSolicitud.isEmpty()) {
            LOG.error("Lista de solicitudes de peticiones esta vacia");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        boolean isUpdated = restHandler.updateEstatusSolPeticion(listSolicitud);
        if (isUpdated) {
            LOG.info("Solicitudes de peticiones actualizadas correctamente");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        LOG.info("No se actualizaron las solicitudes de peticiones");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // **************************************************
    // Admin Peticiones
    // **************************************************
    @RequestMapping(value = Constants.PATH_REST_SEARCH + "findAllPeticionByFilters", method = RequestMethod.GET)
    public ResponseEntity<Page<Peticion>> findAllPeticionByFilters(
            @PageableDefault(size = 10, page = 0, sort = "id", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(value = "filters") String filters) {
        Page<Peticion> page = restHandler.findAllPeticionByFilters(pageable, filters);
        if (page == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @RequestMapping(value = Constants.PATH_REST + "getAllPeticionByFilters", method = RequestMethod.GET)
    public ResponseEntity<List<Peticion>> getAllPeticionByFilters(@RequestParam(value = "filters") String filters) {
        List<Peticion> listPeticion = restHandler.getAllPeticionByFilters(filters);
        if (listPeticion == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listPeticion, HttpStatus.OK);
    }

    @RequestMapping(value = Constants.PATH_REST + "updatePeticiones", method = RequestMethod.POST)
    public ResponseEntity updatePeticiones(@RequestBody WrapPeticion wrapper) {
        if (wrapper == null) {
            LOG.error("Los datos son nulos!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            boolean isUpdated = restHandler.updatePeticiones(wrapper);
            if (!isUpdated) {
                LOG.error("No se actualizaron las peticiones");
                return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            LOG.error("Error al actualizar peticiones", ex);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = Constants.PATH_REST + "checkPeticionRepetida", method = RequestMethod.POST)
    public ResponseEntity checkPeticionRepetida(@RequestBody Peticion peticion) {
        if (peticion == null) {
            LOG.error("Los datos son nulos!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            boolean isRepeated = restHandler.checkPeticionRepetida(peticion);
            if (isRepeated) {
                LOG.error("La peticion ya existe");
                return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            LOG.error("Error al revisar peticion", ex);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    // **************************************************
    // Comandos Manuales
    // **************************************************
    @RequestMapping(value = Constants.BASE_NAME_PATH + "refreshProperties", method = RequestMethod.GET)
    public ResponseEntity refreshProperties() {
        String message = restHandler.refreshProperties();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "forceReadDatabase", method = RequestMethod.GET)
    public ResponseEntity forceReadDatabase() {
        restHandler.forceReadDatabase();
        return new ResponseEntity<>("Solicitud para lectura de la base de datos", HttpStatus.OK);
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "checkServiceEnabled", method = RequestMethod.GET)
    public ResponseEntity checkServiceEnabled() {
        restHandler.checkServiceEnabled();
        return new ResponseEntity<>("Solicitud para inspeccionar estatus del servicio", HttpStatus.OK);
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "forceExecJobs", method = RequestMethod.GET)
    public ResponseEntity forceExecJobs() {
        restHandler.forceExecJobs();
        return new ResponseEntity<>("Ejecutando jobs de depuracion", HttpStatus.OK);
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "toggleServiceEnabled", method = RequestMethod.GET)
    public ResponseEntity toggleServiceEnabled(@RequestParam(value = "enableService", required = true) String enableService) {
        if (StringUtils.isBlank(enableService)) {
            return new ResponseEntity<>("Comando incorrecto!", HttpStatus.BAD_REQUEST);
        }
        boolean enable = Boolean.parseBoolean(enableService);
        restHandler.toggleServiceEnabled(enable);
        return new ResponseEntity<>("Solicitud para " + (!enable ? "des" : "") + "habilitar el servicio de peticiones", HttpStatus.OK);
    }
}
