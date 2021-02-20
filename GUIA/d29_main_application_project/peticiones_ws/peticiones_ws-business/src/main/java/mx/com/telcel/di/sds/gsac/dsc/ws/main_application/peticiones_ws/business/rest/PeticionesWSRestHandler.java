package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.UserProfilerDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Perfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.UsuarioPerfil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kCatUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao.PeticionesWSDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.jobs.ScheduledJobPeticionesWS;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.service.PeticionesWSEnvioCorreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.service.PeticionesWSEnvioTopic;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.utils.PeticionesWSUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumEstatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.ResponsableUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.PeticionProperties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.PeticionSpecification;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.UsuarioProperties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapSolicitudPeticion;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 *
 * @author Juan
 */
@Service
public class PeticionesWSRestHandler {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSRestHandler.class);

    @Autowired
    private PeticionesWSDao dao;
    @Autowired
    private PeticionesWSEnvioCorreo correo;
    @Autowired
    private UserProfilerDao daoUserProfile;
    @Autowired
    private PeticionesWSEnvioTopic topic;
    @Autowired
    private PeticionesWSUtils utils;
    @Autowired
    private ScheduledJobPeticionesWS job;

    public UsuarioProperties getUsuarioPropertiesByUsuario(Integer idUsuario) {
        UsuarioProperties props = new UsuarioProperties();
        try {
            Usuario usuario = new Usuario(idUsuario);
            props.setRespUsuCorp(dao.getRespUsuCorpByResponsable(usuario));
            props.setAutorizador(dao.getPeticionAutorizadorByUsuario(usuario));
            List<UsuarioPerfil> lista = daoUserProfile.getAllUsuarioPerfilByUsuarioAndPerfil(usuario, new Perfil(1));
            props.setAdministrador(lista != null && !lista.isEmpty());
        } catch (Exception ex) {
            LOG.error("Error al obtener las propiedades del usuario", ex);
        }
        return props;
    }

    private void sendToTopic(Integer accion) {
        sendToTopic(accion, null);
    }

    private void sendToTopic(Integer accion, List<Long> listId) {
        try {
            topic.send(accion, listId);
            LOG.info("PETICIONES REGISTRADAS!");
        } catch (Exception ex) {
            LOG.error("ERROR AL ENVIAR A PRODUCCION", ex);
        }
    }

    // **************************************************
    // Solicitud Usuario Corporativo
    // **************************************************
    public ResponsableUsuarioCorp getRespUsuCorpByUsuarioCorp(String inputUsuarioCorp) {
        ResponsableUsuarioCorp respUsuCorp = new ResponsableUsuarioCorp();
        try {
            String usuarioCorp = null;
            for (M2kCatUsuarios cat : PeticionesWSUtils.LIST_USUARIO_CORP) {
                if (cat.getClaveUsuario().equals(inputUsuarioCorp)) {
                    usuarioCorp = cat.getClaveUsuario();
                    break;
                }
            }
            if (!StringUtils.isBlank(usuarioCorp)) {
                respUsuCorp = dao.getRespUsuCorpByUsuarioCorp(usuarioCorp);
                if (respUsuCorp == null) {
                    respUsuCorp = new ResponsableUsuarioCorp(usuarioCorp);
                } else {
                    LOG.warn("El usuario corporativo \"" + inputUsuarioCorp + "\" no tiene un responsable asignado");
                }
            } else {
                LOG.warn("El usuario corporativo \"" + inputUsuarioCorp + "\" no existe");
            }
        } catch (Exception ex) {
            LOG.error("Error al obtener el responable del usuario corporativo \"" + inputUsuarioCorp + "\"", ex);
            respUsuCorp = null;
        }
        return respUsuCorp;
    }

    public boolean isSolicitudUsuarioCorpRepetida(SolicitudUsuarioCorp solicitud) {
        try {
            List<Integer> listEstatus = EnumUtils.getListEstatusSolicitudActive();
            List<SolicitudUsuarioCorp> lista = dao.getAllSolUsuCorpBySolicitanteAndUsuarioCorpAndEstatus(solicitud.getSolicitante(), solicitud.getUsuarioCorp(), listEstatus);
            return (lista != null && !lista.isEmpty());
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de SolicitudUsuarioCorp", ex);
        }
        return false;
    }

    public boolean saveSolicitudUsuarioCorp(SolicitudUsuarioCorp solicitud, ResponsableUsuarioCorp responsable) {
        solicitud.sanitize();
        SolicitudUsuarioCorp solicitudDB = dao.saveSolicitudUsuarioCorp(solicitud);
        if (solicitudDB != null) {
            correo.enviarSolUsuCorp(solicitud, responsable.getResponsable().getCorreo());
            return true;
        }
        return false;
    }

    public void reportUsuarioCorp(SolicitudUsuarioCorp solicitud, final int reporte) {
        correo.enviarReporteUsuCorp(solicitud, reporte);
    }

    // **************************************************
    // Solicitud Peticiones Web
    // **************************************************
    public PeticionProperties getPeticionPropertiesByUsuario(Integer idUsuario) {
        UsuarioProperties usuarioProps = getUsuarioPropertiesByUsuario(idUsuario);
        List<M2kCatUsuarios> listM2kCatUsuario = new ArrayList<>();
        if (!usuarioProps.isAdminOrAutorizador()) {
            try {
                List<String> listUsuarioCorp = new ArrayList<>();
                Usuario usuario = new Usuario(idUsuario);
                List<SolicitudUsuarioCorp> listSolUsuCorp = dao.getAllSolUsuCorpBySolicitanteAndEstatus(usuario, EnumEstatus.AUTORIZADA.value);
                if (listSolUsuCorp != null && !listSolUsuCorp.isEmpty()) {
                    for (SolicitudUsuarioCorp solicitud : listSolUsuCorp) {
                        listUsuarioCorp.add(solicitud.getUsuarioCorp().trim().toUpperCase());
                    }
                }
                if (usuarioProps.getRespUsuCorp() != null) {
                    List<ResponsableUsuarioCorp> listResponsable = dao.getAllRespUsuCorpByResponsable(usuario);
                    if (listResponsable != null && !listResponsable.isEmpty()) {
                        for (ResponsableUsuarioCorp responsable : listResponsable) {
                            listUsuarioCorp.add(responsable.getUsuarioCorp().trim().toUpperCase());
                        }
                    }
                }
                for (M2kCatUsuarios cat : PeticionesWSUtils.LIST_USUARIO_CORP) {
                    for (String usuarioCorp : listUsuarioCorp) {
                        if (cat.getClaveUsuario().equals(usuarioCorp)) {
                            listM2kCatUsuario.add(cat);
                            break;
                        }
                    }
                }
            } catch (Exception ex) {
                LOG.error("Error al obtener datos del usuario", ex);
            }
        } else {
            listM2kCatUsuario = PeticionesWSUtils.LIST_USUARIO_CORP;
        }
        PeticionProperties petProps = new PeticionProperties();
        petProps.setListM2kCatUsuarios(listM2kCatUsuario);
        petProps.setListM2kCatTransaccionesFront(PeticionesWSUtils.LIST_TRANSACCION);
        petProps.setListArea(PeticionesWSUtils.LIST_AREA);
        petProps.setUsuarioProperties(usuarioProps);
        petProps.setListAplicativo(PeticionesWSUtils.LIST_APLICATIVO_TELCEL);
        return petProps;
    }

    public boolean saveSolicitudPeticion(WrapSolicitudPeticion wrapSolicitud) throws Exception {
        if (!hasPeticionRepetida(wrapSolicitud.getListPeticion())) {
            wrapSolicitud.getSolicitudPeticion().sanitize();
            Integer estatus = wrapSolicitud.getSolicitudPeticion().getEstatus();
            dao.saveSolicitudPeticion(wrapSolicitud);
            try {
                List<Integer> listNivel = EnumUtils.getListAutorizadorProd();
                if (!EnumAmbiente.PROD.value.equals(wrapSolicitud.getListPeticion().get(0).getAmbiente())) {
                    listNivel = EnumUtils.getListAutorizadorDev();
                }
                List<Usuario> listAutorizador = dao.getAllAutorizadorByNivel(listNivel);
                correo.enviarSolPeticion(wrapSolicitud, listAutorizador);
            } catch (Exception ex) {
                LOG.error("Error al obtener los autorizadores", ex);
            }
            if (EnumEstatus.URGENTE.value.equals(estatus)) {
                List<Long> listId = new ArrayList<>();
                for (Peticion peticion : wrapSolicitud.getListPeticion()) {
                    listId.add(peticion.getId());
                }
                sendToTopic(estatus, listId);
            }
            return true;
        }
        return false;
    }

    private boolean hasPeticionRepetida(List<Peticion> listPeticion) {
        boolean repetida = false;
        try {
            List<Integer> listEstatus = EnumUtils.getListEstatusSolicitudActive();
            List<String> listIP = new ArrayList<>();
            for (Peticion peticion : listPeticion) {
                peticion.sanitize();
                if (!listIP.contains(peticion.getIp())) {
                    listIP.add(peticion.getIp());
                }
            }
            List<Peticion> listPeticionDB = new ArrayList<>();
            List<Peticion> lista = dao.getAllPeticionByIPAndEstatus(listIP, listEstatus);
            if (lista != null && !lista.isEmpty()) {
                listPeticionDB.addAll(lista);
            }
            lista = dao.getAllPeticionByIPAndNullSolicitud(listIP);
            if (lista != null && !lista.isEmpty()) {
                listPeticionDB.addAll(lista);
            }
            if (!listPeticionDB.isEmpty()) {
                for (Peticion petNew : listPeticion) {
                    for (Peticion petOld : listPeticionDB) {
                        if (DBUtils.isPeticionEqualOrWildcardInDB(petOld, petNew)) {
                            repetida = true;
                            petNew.setRepetida(true);
                            break;
                        }
                    }
                }
            }
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de peticiones por estatus e IP", ex);
        }
        return repetida;
    }

    // **************************************************
    // List Solicitudes - Usuario Corporativo
    // **************************************************
    public List<SolicitudUsuarioCorp> getAllSolUsuCorpByUsuario(Integer idUsuario, boolean isResponsable) {
        try {
            if (!isResponsable) {
                return dao.getAllSolUsuCorpBySolicitante(new Usuario(idUsuario));
            }
            return dao.getAllSolUsuCorpByResponsable(new Usuario(idUsuario));
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de solicitudes de usuario corporativo", ex);
        }
        return null;
    }

    public List<SolicitudUsuarioCorp> getAllSolUsuCorp() {
        try {
            return dao.getAllSolUsuCorp();
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de solicitudes de usuario corporativo", ex);
        }
        return null;
    }

    public boolean updateEstatusSolUsuCorp(List<SolicitudUsuarioCorp> listSolicitud) {
        List<Long> listId = new ArrayList<>();
        for (SolicitudUsuarioCorp solicitud : listSolicitud) {
            solicitud.sanitize();
            listId.add(solicitud.getId());
        }
        Integer estatus = listSolicitud.get(0).getEstatus();
        String comentario = listSolicitud.get(0).getComentarioResponsable();
        int updated = 0;
        if (!listId.isEmpty() && listId.size() == listSolicitud.size()) {
            updated = dao.updateEstatusSolUsuCorp(listId, estatus, comentario);
            if (updated == listId.size()) {
                LOG.info("Solicitudes de usuario corporativo actualizadas");
                if (!EnumEstatus.CANCELADA.value.equals(estatus)) {
                    enviaCorreoSolUsuCorpResponse(listSolicitud);
                }
                return true;
            }
        }
        return false;
    }

    private void enviaCorreoSolUsuCorpResponse(List<SolicitudUsuarioCorp> listSolicitud) {
        Map<Usuario, List<SolicitudUsuarioCorp>> mapCorreo = new HashMap<>();
        for (SolicitudUsuarioCorp solicitud : listSolicitud) {
            if (!mapCorreo.containsKey(solicitud.getSolicitante())) {
                mapCorreo.put(solicitud.getSolicitante(), new ArrayList<SolicitudUsuarioCorp>());
            }
            mapCorreo.get(solicitud.getSolicitante()).add(solicitud);
        }
        correo.enviarSolUsuCorpResponse(mapCorreo);
    }

    // **************************************************
    // List Solicitudes - Peticion
    // **************************************************
    public List<SolicitudPeticion> getAllSolPeticionBySolicitante(Integer idUsuario) {
        try {
            if (idUsuario != null) {
                return dao.getAllSolPeticionBySolicitante(new Usuario(idUsuario));
            }
            return dao.getAllSolPeticion();
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de solicitudes de peticiones", ex);
        }
        return null;
    }

    public List<SolicitudPeticion> getAllSolPeticionByNivelAutorizador(Integer nivel) {
        try {
            List<Integer> listAmbiente = EnumUtils.getAmbienteByNivelAutorizador(nivel);
            if (listAmbiente != null && !listAmbiente.isEmpty()) {
                return dao.getAllSolPeticionByAmbiente(listAmbiente);
            }
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de solicitudes de peticiones por ambiente", ex);
        }
        return null;
    }

    public List<SolicitudPeticion> getAllSolPeticion() {
        return getAllSolPeticionBySolicitante(null);
    }

    public List<Peticion> getAllPeticionBySolicitud(Long idSolicitud) {
        try {
            return dao.getAllPeticionBySolicitud(new SolicitudPeticion(idSolicitud));
        } catch (Exception ex) {
            LOG.error("Error al obtener lista de solicitudes de peticiones", ex);
        }
        return null;
    }

    public boolean updateEstatusSolPeticion(List<SolicitudPeticion> listSolicitud) {
        List<Long> listId = new ArrayList<>();
        for (SolicitudPeticion solicitud : listSolicitud) {
            solicitud.sanitize();
            listId.add(solicitud.getId());
        }
        SolicitudPeticion solicitud = listSolicitud.get(0);
        Integer estatus = solicitud.getEstatus();
        int updated;
        int updatedPet;
        if (!listId.isEmpty() && listId.size() == listSolicitud.size()) {
            updated = dao.updateEstatusSolPeticionById(listId, solicitud);
            updatedPet = dao.updateEstatusPeticionBySolPeticion(listSolicitud, estatus);
            if (updated == listId.size() && updatedPet > 0) {
                LOG.info("Solicitudes de peticiones actualizadas");
                if (!EnumEstatus.CANCELADA.value.equals(estatus)) {
                    enviarCorreoSolPeticionResponse(listSolicitud);
                }
                return true;
            }
        }
        return false;
    }

    private void enviarCorreoSolPeticionResponse(List<SolicitudPeticion> listSolicitud) {
        Map<Usuario, List<SolicitudPeticion>> mapCorreo = new HashMap<>();
        for (SolicitudPeticion solicitud : listSolicitud) {
            if (!mapCorreo.containsKey(solicitud.getSolicitante())) {
                mapCorreo.put(solicitud.getSolicitante(), new ArrayList<SolicitudPeticion>());
            }
            mapCorreo.get(solicitud.getSolicitante()).add(solicitud);
        }
        correo.enviarSolPeticionResponse(mapCorreo);
    }

    // **************************************************
    // Admin Peticiones
    // **************************************************
    public Page<Peticion> findAllPeticionByFilters(Pageable pageable, String filters) {
        Map<String, Object> mapCols = DBUtils.getFilteredColumnMap(filters);
        PeticionSpecification spec = new PeticionSpecification(mapCols);
        try {
            return dao.findAllPeticionBySpecification(spec, pageable);
        } catch (Exception ex) {
            LOG.error("Ocurrio un error al obtener paginacion de peticiones por Specification: Filters=" + filters + ", MapCols=" + mapCols, ex);
        }
        return null;
    }

    public List<Peticion> getAllPeticionByFilters(String filters) {
        Map<String, Object> mapCols = DBUtils.getFilteredColumnMap(filters);
        PeticionSpecification spec = new PeticionSpecification(mapCols);
        try {
            return dao.getAllPeticionBySpecification(spec);
        } catch (Exception ex) {
            LOG.error("Ocurrio un error al obtener lista de peticiones por Specification: Filters=" + filters + ", MapCols=" + mapCols, ex);
        }
        return null;
    }

    public boolean updatePeticiones(WrapPeticion wrapPeticion) throws Exception {
        List<Peticion> listPeticion = wrapPeticion.getListPeticion();
        List<Peticion> listPeticionOld = new ArrayList<>();
        if (listPeticion == null || listPeticion.isEmpty()) {
            if (StringUtils.isEmpty(wrapPeticion.getFilterQuery())) {
                throw new Exception("Lista y filtro de peticiones son incorrectos!");
            }
            listPeticion = getAllPeticionByFilters(wrapPeticion.getFilterQuery());
            if (listPeticion == null || listPeticion.isEmpty()) {
                throw new Exception("Lista de peticiones vacia");
            }
        }
        int updated = 0;
        Integer accion = wrapPeticion.getAccion();
        List<Long> listId = null;
        List<Peticion> listNew;
        if (!EnumEstatus.REVISION.value.equals(accion)) {
            for (Peticion peticion : listPeticion) {
                if (peticion.getId() != null && peticion.getId() > 0) {
                    listPeticionOld.add(DBUtils.getPeticionClone(peticion));
                }
                peticion.setEstatus(accion);
            }
            listNew = filterModifications(listPeticion, listPeticionOld);
            if (!listPeticion.isEmpty()) {
                listId = DBUtils.getListPeticionId(listPeticion);
                if (listId != null && !listId.isEmpty()) {
                    wrapPeticion.setListPeticion(listPeticion);
                    updated = dao.updateEstatusPeticionById(listId, accion);
                }
            }
        } else {
            listId = DBUtils.getListPeticionId(listPeticion);
            if (listId != null && !listId.isEmpty()) {
                listPeticionOld = dao.getAllPeticionById(listId);
            }
            listNew = filterModifications(listPeticion, listPeticionOld);
            listId = DBUtils.getListPeticionId(listPeticion);
            if (listPeticion.size() > 0) {
                updated = dao.updatePeticion(listPeticion);
            }
        }
        if (listNew != null && !listNew.isEmpty()) {
            updated += dao.savePeticion(listNew);
            if (listId == null) {
                listId = new ArrayList<>();
            }
            listId.addAll(DBUtils.getListPeticionId(listNew));
            listPeticion.addAll(listNew);
        }
        if (updated < 1) {
            return false;
        }
        if (wrapPeticion.isUrgente()) {
            sendToTopic(accion, listId);
        }
        Map<Long, Peticion> mapPeticionOld = PeticionesWSUtils.getMapIdPeticion(listPeticionOld);
        correo.enviarAdminPeticion(wrapPeticion, mapPeticionOld);
        return true;
    }

    private List<Peticion> filterModifications(List<Peticion> listPeticion, List<Peticion> listPeticionOld) throws Exception {
        if (listPeticion.size() < listPeticionOld.size()) {
            throw new Exception("Las lista no tienen los datos suficientes");
        }
        List<Peticion> listDelete = new ArrayList<>();
        List<Peticion> listNew = new ArrayList<>();
        Iterator<Peticion> it = listPeticion.iterator();
        Map<Long, Peticion> mapPeticionOld = PeticionesWSUtils.getMapIdPeticion(listPeticionOld);
        if (mapPeticionOld == null) {
            mapPeticionOld = new HashMap<>();
        }
        while (it.hasNext()) {
            Peticion peticion = it.next();
            Peticion old = mapPeticionOld.get(peticion.getId());
            peticion.sanitize();
            if (old == null) {
                listNew.add(peticion);
                it.remove();
                continue;
            }
            if (peticion.isFullyEqual(old)) {
                listDelete.add(old);
                it.remove();
            }
        }
        if (!listDelete.isEmpty()) {
            listPeticionOld.removeAll(listDelete);
        }
        return listNew;
    }

    public boolean checkPeticionRepetida(Peticion peticion) throws Exception {
        peticion.sanitize();
        if (StringUtils.isBlank(peticion.getIp())) {
            throw new Exception("La IP de la peticion esta vacia!");
        }
        List<Peticion> listPeticion = dao.getAllPeticionByIp(peticion.getIp());
        if (listPeticion == null || listPeticion.isEmpty()) {
            return false;
        }
        for (Peticion petOld : listPeticion) {
            if (DBUtils.isPeticionEqualOrWildcardInDB(petOld, peticion)) {
                peticion.setRepetida(true);
                return true;
            }
        }
        return false;
    }

    // **************************************************
    // Comandos Manuales
    // **************************************************
    public String refreshProperties() {
        LOG.warn("ACTUALIZANDO CATALOGOS ESTATICOS");
        try {
            utils.initUtils();
            LOG.warn("LISTA DE CATALOGOS ACTUALIZADA");
        } catch (Exception ex) {
            LOG.error("NO SE CARGARON LOS CATALOGOS CORRECTAMENTE", ex);
            return ex.toString();
        }
        return PeticionesWSUtils.toStringCatalogos();
    }

    public void forceReadDatabase() {
        LOG.warn("ENVIANDO SOLICITUD DE LECTURA DE BASE DE DATOS!");
        try {
            sendToTopic(EnumEstatus.READ_DB.value);
            LOG.warn("SOLICITUD ENVIADA A TOPICO!");
        } catch (Exception ex) {
            LOG.error("NO SE PUDO SOLICITAR LA LECTURA DE LA BASE DE DATOS", ex);
        }
    }

    public void checkServiceEnabled() {
        LOG.warn("ENVIANDO INSPECCION DE ESTATUS DEL SERVICIO DE PETICIONES!");
        try {
            sendToTopic(EnumEstatus.CHECK_SERVICE_ENABLED.value);
            LOG.warn("SOLICITUD ENVIADA A TOPICO!");
        } catch (Exception ex) {
            LOG.error("NO SE PUDO SOLICITAR LA INSPECCION DEL ESTATUS DEL SERVICIO", ex);
        }
    }

    public void forceExecJobs() {
        LOG.warn("EJECUTANDO JOBS DE DEPURACION");
        job.executeJob();
    }

    public void toggleServiceEnabled(boolean enable) {
        LOG.warn("ENVIANDO CAMBIO DE ESTATUS DEL SERVICIO DE PETICIONES!");
        EnumEstatus accion = enable ? EnumEstatus.ENABLE_SERVICE : EnumEstatus.DISABLE_SERVICE;
        try {
            sendToTopic(accion.value);
            LOG.warn("SOLICITUD ENVIADA A TOPICO!");
        } catch (Exception ex) {
            LOG.error("NO SE PUDO SOLICITAR EL CAMBIO DE ESTATUS DEL SERVICIO DE PETICIONES", ex);
        }
    }
}
