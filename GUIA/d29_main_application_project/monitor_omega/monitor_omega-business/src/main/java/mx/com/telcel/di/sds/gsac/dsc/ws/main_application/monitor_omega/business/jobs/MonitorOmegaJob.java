package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.jobs;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.common.CoreUtilConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.dao.MonitorOmegaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.logger.ElasticLogger;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service.EnvioCorreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service.InspectorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service.OmegaConnection;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.ReportePantallaOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.CicsThread;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.PropiedadesMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXI3
 */
@Service
public class MonitorOmegaJob {

    private static final Logger LOG = LoggerFactory.getLogger(MonitorOmegaJob.class);
    private static int reintentos = 0;
    private static List<String> listErrores = new ArrayList<>();
    private static final SimpleDateFormat SDF_LOG = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    @Autowired
    private MonitorOmegaDao monitorOmegaDao;

    @Autowired
    private OmegaConnection omegaConnection;

    @Autowired
    private UtilMonitorOmega utilMonitorOmega; // Permite la inyeccion de datos estaticos

    @Autowired
    private InspectorOmega inspectorOmega;

    @Autowired
    private EnvioCorreo envioCorreo;

    /**
     * Obtiene los valores parametrizables de la BD al iniciar la
     * aplicaci&oacute;n
     */
    protected void initializeUtilMonitorOmega() {
        actualizarUtilMonitorOmega();
        resetReintentos();
        LOG.debug(omegaConnection.getScrapyInfo());
        UtilMonitorOmega.setUltimaActualizacion(new Date());
        creaPantalla(0);
        monitorOmegaDao.createMapPantallasM2k();
    }

    /**
     * Ejecuta la consulta y verificaci&oacute;n del monitor de Omegamon II for
     * DB2
     *
     * @param fechaHoraActual Fecha-Hora actual de ejecuci&oacute;n
     * @throws java.lang.Exception
     */
    public void verificaProcesos(Date fechaHoraActual) throws Exception {
        if (!UtilMonitorOmega.getPropiedadesMonitorOmega().isMonitorOn()) {
            UtilMonitorOmega.setUltimaActualizacion(fechaHoraActual);
            resetReintentos();
            creaPantalla(0);
            LOG.warn("Monitor omega apagado");
            return;
        }

        if (!omegaConnection.isConnected()) {
            long tiempoInicio = System.currentTimeMillis();
            try {
                omegaConnection.createConnection();
                LOG.debug("Tiempo Conexion: " + (System.currentTimeMillis() - tiempoInicio) + " ms");
            } catch (Exception ex) {
                LOG.error("No se pudo conectar a Omega despues de " + (System.currentTimeMillis() - tiempoInicio) + " ms", ex);
                revisaReintentos(ex.getMessage());
                throw ex;
            }
        }

        String errorTitle = "Error al obtener informacion de Omega";
        try {
            OmegaData omegaData = omegaConnection.ejecutaConsultaOmega();
            if (omegaData == null || omegaData.getListCics().isEmpty()) {
                throw new Exception("Lista de procesos CICS esta vacia!");
            }
            errorTitle = "Error al inspeccionar los procesos CICS";
            int alertCount = inspectorOmega.revisarAlertas(omegaData);
            UtilMonitorOmega.setUltimaActualizacion(fechaHoraActual);
            UtilMonitorOmega.setOmegaData(omegaData);
            creaPantalla(alertCount);

            if (alertCount > 0) {
                LOG.warn("Se han encontrado [" + alertCount + "] procesos altos");
                envioCorreo.enviar(omegaData, alertCount);
                sendToRedis(omegaData);
            } else {
                LOG.info("Sin alertas");
            }
            resetReintentos();
        } catch (Exception ex) {
            LOG.error(errorTitle, ex);
            revisaReintentos(ex.getMessage());
            throw ex;
        }
    }

    /**
     * Crea la pantalla que se mostrar&aacute; en Tools
     *
     * @param alertCount Contador de alertas
     */
    private void creaPantalla(int alertCount) {
        PropiedadesMonitorOmega propiedades = UtilMonitorOmega.getPropiedadesMonitorOmega();
        ReportePantallaOmega pantalla = new ReportePantallaOmega();
        pantalla.setLastUpdate(UtilMonitorOmega.getUltimaActualizacion());
        pantalla.setAlertsCount(alertCount);
        pantalla.setOmegaData(UtilMonitorOmega.getOmegaData());
        pantalla.setPropiedadesMonitorOmega(propiedades);
        UtilMonitoreo.setPantallaOmega(pantalla);
    }

    /**
     * Apaga el monitor de Omegamon II for DB2, verificando si la
     * conexi&oacute;n sigue activa
     *
     * @return Si el monitor est&aacute; iniciado (true) o apagado (false)
     */
    public boolean monitorOnOff() {
        PropiedadesMonitorOmega props = UtilMonitorOmega.getPropiedadesMonitorOmega();
        boolean isMonitorOn = !props.isMonitorOn();
        props.setMonitorOn(isMonitorOn);
        monitorOmegaDao.saveMonitorOnOffStatus(isMonitorOn);
        resetReintentos();
        ((ReportePantallaOmega) UtilMonitoreo.getPantallaOmega()).setPropiedadesMonitorOmega(props);
        LOG.warn("Monitor Omega Encendido: " + isMonitorOn);
        return isMonitorOn;
    }

    /**
     * Actualiza las propiedades de UtilMonitorOmega con la base de datos
     */
    public void actualizarUtilMonitorOmega() {
        LOG.warn("Actualizando propiedades del monitor Omega");
        PropiedadesMonitorOmega propiedades = monitorOmegaDao.getPropiedadesMonitorOmega();
        if (!CoreUtilConstants.ENVIROMENT_PROD.equals(CoreFunctions.getApplicationProperty(CoreUtilConstants.PROP_APPLICATION_ENVIROMENT))) {
            LOG.warn("El entorno NO es productivo. Eliminando correos extra de alerta: Alertas{" + propiedades.getCorreosAlerta()
                    + "}; AlertasErrores{" + propiedades.getCorreosAlertaError() + "}");
            propiedades.setCorreosAlerta("");
            propiedades.setCorreosAlertaError("");
        }
        UtilMonitorOmega.setPropiedadesMonitorOmega(propiedades);
        monitorOmegaDao.createMapPantallasM2k();
        LOG.info(propiedades.toString());
    }

    private void revisaReintentos(String error) {
        reintentos++;
        listErrores.add(error);
        if (reintentos >= UtilMonitorOmega.getPropiedadesMonitorOmega().getIntervaloRefrescado()) {
            LOG.warn("Enviando correo de alertas!");
            envioCorreo.enviarError(reintentos, listErrores);
            resetReintentos();
        }
    }

    private void resetReintentos() {
        reintentos = 0;
        listErrores = new ArrayList<>();
    }

    /**
     * M&eacute;todo que env&iacute;a la informaci&oacute;n recibida al redis
     * para su almacenamiento y procesamiento para vissualizarla en Kibana
     *
     * @param omegaData Datos de Omega recibidos y procesados
     */
    private void sendToRedis(OmegaData omegaData) {
        ElasticLogger elasticLogger = new ElasticLogger();
        for (CicsThread thread : omegaData.getListCicsThread()) {
            if (thread.isAlertRaised()) {
                long elapsed = new Double(thread.getElapsedTime()).longValue();
                elasticLogger.addEntry(
                        omegaData.getFechaUpdate(),
                        thread.getRegion(),
                        thread.getTransaccion(),
                        elapsed,
                        thread.getCpuNum(),
                        thread.getJobName(),
                        thread.getStatus(),
                        thread.getPantallaM2k(),
                        thread.getPlanName(),
                        thread.isAlertRaised());
            }
        }
        elasticLogger.sendToRedis();
    }

    /**
     * Inicia la limpieza de alertas de Omega antiguas
     */
    public void eliminaAlertasAntiguas() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date fechaLimite = calendar.getTime();
        try {
            LOG.warn("Eliminando alertas de Omega generadas antes del: " + SDF_LOG.format(fechaLimite));
            int updated = monitorOmegaDao.deleteAllOmegaAlertaByFechaAlertaLimit(new LocalDateTime(fechaLimite.getTime()));
            if (updated > 0) {
                LOG.warn("Se eliminaron " + updated + " alertas antiguas");
            } else {
                LOG.warn("No hay alertas de Omega antiguas");
            }
        } catch (Exception ex) {
            LOG.error("Error al eliminar las alertas de Omega antiguas", ex);
        }
    }
}
