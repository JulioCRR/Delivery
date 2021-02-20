package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.rest;

import java.util.Date;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.PropiedadesMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.dao.MonitorOmegaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.jobs.MonitorOmegaJob;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.ReportePantallaOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author VI9XXI3
 */
@RestController
public class RestMonitorOmega {

    private static final Logger LOG = LoggerFactory.getLogger(RestMonitorOmega.class);

    @Autowired
    private MonitorOmegaDao monitorOmegaDao;

    @Autowired
    private MonitorOmegaJob monitorOmegaJob;

    @RequestMapping(value = BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME_PATH + "reporteOmega", method = RequestMethod.GET)
    public ResponseEntity getReporteOmega() {
        ReportePantallaOmega pantalla = (ReportePantallaOmega) UtilMonitoreo.getPantallaOmega();
        return new ResponseEntity<>(pantalla, HttpStatus.OK);
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME_PATH + "propiedadesOmega", method = RequestMethod.GET)
    public ResponseEntity<PropiedadesMonitorOmega> getPropiedadesOmega() {
        return new ResponseEntity<>(UtilMonitorOmega.getPropiedadesMonitorOmega(), HttpStatus.OK);
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_INIT_REST + Constants.BASE_NAME_PATH + "propiedadesOmega", method = RequestMethod.POST)
    public ResponseEntity setPropiedadesOmega(@RequestBody PropiedadesMonitorOmega propiedades) {
        PropiedadesMonitorOmega props = UtilMonitorOmega.getPropiedadesMonitorOmega();
        propiedades.setMonitorOn(props.isMonitorOn());
        propiedades.setCorreosAlerta(props.getCorreosAlerta());
        LOG.info("CAMBIANDO PROPIEDADES MONITOR OMEGA: " + propiedades);
        if (monitorOmegaDao.savePropiedadesOmega(propiedades)) {
            props.setIntervaloRefrescado(propiedades.getIntervaloRefrescado());
            props.setUmbralAlertas(propiedades.getUmbralAlertas());
            props.setMaxCpu(propiedades.getMaxCpu());

            ReportePantallaOmega pantalla = (ReportePantallaOmega) UtilMonitoreo.getPantallaOmega();
            UtilMonitoreo.setPantallaOmega(pantalla);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        LOG.error("NO SE CAMBIARON LAS PROPIEDADES");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // ===== Requests directos (para uso de administradores) =====
    @RequestMapping(value = Constants.BASE_NAME_PATH + "monitorOnOff")
    public String monitorOmegaOnOff() {
        LOG.warn("CAMBIANDO ESTATUS DEL MONITOR");
        String output = "Monitor Omega Encendido: " + monitorOmegaJob.monitorOnOff();
        LOG.warn("ESTATUS CAMBIADO");
        return output;
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "refreshProperties")
    public String refreshProperties() {
        LOG.warn("ACTUALIZANDO PROPIEDADES");
        monitorOmegaJob.actualizarUtilMonitorOmega();
        String mensaje = "Propiedades Actualizadas:<br>" + UtilMonitorOmega.getPropiedadesMonitorOmega();
        LOG.warn("PROPIEDADES ACTUALIZADAS");
        return mensaje;
    }

    @RequestMapping(value = Constants.BASE_NAME_PATH + "forceUpdate")
    public ResponseEntity forceUpdate(@RequestParam(value = "resetAttempts", required = false, defaultValue = "") String action) {
//        if (Boolean.parseBoolean(action)) {
//            monitorOmegaJob.reiniciaLogin();
//        }
        try {
            LOG.warn("EJECUTANDO MONITOREO MANUAL");
            monitorOmegaJob.verificaProcesos(new Date());
            LOG.warn("FIN DEL MONITOREO MANUAL");
            return getReporteOmega();
        } catch (Exception ex) {
            return new ResponseEntity<>("Error al realizar la consulta a Omega: " + ex.toString(), HttpStatus.OK);
        }
    }
}
