package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.jobs;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao.PeticionesWSDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.DBUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumEstatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Juan
 */
@Component
public class PeticionesWSJob {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSJob.class);
    private final SimpleDateFormat sdfLog = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    @Autowired
    private PeticionesWSDao dao;

    public void checkSolicitudCaducidad() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 99);
        Date fechaCaducidad = calendar.getTime();
        LOG.info("Buscando solicitudes de peticiones WS-M2k con fecha de caducidad: " + sdfLog.format(fechaCaducidad));
        try {
            List<SolicitudPeticion> listSolicitud = dao.getAllSolPeticionByFechaCaducidad(fechaCaducidad);
            if (listSolicitud != null && !listSolicitud.isEmpty()) {
                List<Long> listId = DBUtils.getListSolPeticionId(listSolicitud);
                LOG.info("Actualizando " + listId.size() + " solicitudes");
                int updated = dao.updateEstatusSolPeticionById(listId, EnumEstatus.EXPIRADA.value);
                LOG.info("Se actualizaron " + updated + " solicitudes");
                updated = dao.updateEstatusPeticionBySolPeticion(listSolicitud, EnumEstatus.EXPIRADA.value);
                LOG.info("Se actualizaron " + updated + " peticiones asociadas");
            } else {
                LOG.info("No hay solicitudes caducadas");
            }
        } catch (Exception ex) {
            LOG.error("Error durante la depuracion", ex);
        }
    }

    public void deleteSolicitudesInactivas() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date fechaLimite = calendar.getTime();
        List<Integer> listEstatus = EnumUtils.getListEstatusSolicitudInactive();
        int updated;
        LOG.warn("Buscando solicitudes inactivas de usuario corporativo registradas antes de: " + sdfLog.format(fechaLimite));
        try {
            List<SolicitudUsuarioCorp> listSolicitud = dao.getAllSolUsuCorpByDueFechaRegAndListEstatus(fechaLimite, listEstatus);
            if (listSolicitud != null && !listSolicitud.isEmpty()) {
                List<Long> listId = DBUtils.getListSolUsuCorpId(listSolicitud);
                LOG.warn("Eliminando " + listId.size() + " solicitudes");
                updated = dao.deleteSolUsuCorpById(listId);
                LOG.warn("Se eliminaron " + updated + " solicitudes");
            } else {
                LOG.warn("No hay solicitudes de usuario corporativo vencidas");
            }
        } catch (Exception ex) {
            LOG.error("Error al eliminar las solicitudes de usuario corporativo", ex);
        }

        LOG.warn("Buscando solicitudes inactivas de peticiones WS-M2k registradas antes de: " + sdfLog.format(fechaLimite));
        try {
            List<SolicitudPeticion> listSolicitud = dao.getAllSolPeticionByDueFechaRegAndListEstatus(fechaLimite, listEstatus);
            if (listSolicitud != null && !listSolicitud.isEmpty()) {
                int total = listSolicitud.size();
                LOG.warn("Eliminando " + total + " solicitudes");
                updated = dao.deleteSolPeticionAndPeticionByIdSolicitud(listSolicitud);
                LOG.warn("Se eliminaron " + total + " solicitudes");
                LOG.warn("Se eliminaron " + updated + " peticiones asociadas");
            } else {
                LOG.warn("No hay solicitudes de peticiones vencidas");
            }
        } catch (Exception ex) {
            LOG.error("Error al eliminar las solicitudes de peticiones y sus peticiones asociadas", ex);
        }
    }

    public void deletePeticionesEliminadas() {
        LOG.warn("Eliminando peticiones marcadas para ser eliminadas");
        try {
            List<Peticion> listPeticion = dao.getAllPeticionByEstatus(EnumEstatus.ELIMINADA.value);
            List<Long> listId = DBUtils.getListPeticionId(listPeticion);
            if (listId != null && !listId.isEmpty()) {
                int total = listId.size();
                LOG.warn("Eliminando " + total + " peticiones");
                int updated = dao.deletePeticionById(listId);
                LOG.warn("Se eliminaron " + updated + " peticiones");
            } else {
                LOG.warn("No hay peticiones marcadas para eliminar");
            }
        } catch (Exception ex) {
            LOG.error("Error al eliminar las peticiones", ex);
        }
    }
}
