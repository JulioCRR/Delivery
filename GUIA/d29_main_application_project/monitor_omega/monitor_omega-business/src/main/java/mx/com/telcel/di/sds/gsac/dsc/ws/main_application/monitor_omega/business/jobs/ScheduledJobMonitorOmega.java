package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.jobs;

import java.util.Date;
import javax.annotation.PostConstruct;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import org.joda.time.Interval;
import org.joda.time.Period;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Monitoreo de Omegamon II for DB2
 *
 * @author VI9XXI3
 */
@Component
public class ScheduledJobMonitorOmega {

    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobMonitorOmega.class);

    @Autowired
    private MonitorOmegaJob monitorOmegaJob;

    /**
     * Llama a la inicializaci&oacute;n de los valores parametrizados del
     * monitor de Omegamon II for DB2 al inicio de la aplicaci&oacute;n
     */
    @PostConstruct
    protected void initUtilMonitorOmega() {
        LOG.info("INICIO DEL MONITOR OMEGA");
        monitorOmegaJob.initializeUtilMonitorOmega();
    }

    /**
     * Cron para ejecutar el monitoreo del monitor Omegamon II for DB2
     * <br>
     * <i>cron=0 0/1 7-22 * * ?</i>
     * <br>
     * Se ejecuta cada minuto de todos los d&iacute;as entre las 07:00 y 22:59
     * horas
     */
    @Scheduled(cron = "0 0/1 7-22 * * ?")
    protected void verifyThreads() {
        Date now = new Date();
        if (timer(now)) {
            LOG.info("INICIO DE VERIFICACION DE PROCESOS CICS");
            try {
                monitorOmegaJob.verificaProcesos(now);
            } catch (Exception ignored) {
            }
            LOG.info("FIN DE VERIFICACION DE PROCESOS CICS");
        }
    }

    /**
     * Cron para limpiar la base de datos de alertas de Omega antiguas
     * <br>
     * <i>cron=0 15 23 * * ?</i>
     * <br>
     * Se ejecuta cada d&iacute;a a las 23:15 horas
     */
    @Scheduled(cron = "0 15 23 * * ?")
    protected void cleanupOmegaAlertas() {
        LOG.info("INICIO DE DEPURACION DE ALERTAS DE OMEGA");
        monitorOmegaJob.eliminaAlertasAntiguas();
        LOG.info("FIN DE DEPURACION DE ALERTAS DE OMEGA");
    }

    /**
     * Verifica la hora actual contra la &uacute;ltima hora de
     * actualizaci&oacute;n del monitor de Omegamon II for DB2
     *
     * @return true - la hora es igual o mayor al intervalo de refrescado
     */
    private boolean timer(Date now) {
        Interval interval = new Interval(UtilMonitorOmega.getUltimaActualizacion().getTime(), now.getTime() + 5000);
        Period period = interval.toPeriod();
        return (period.getMinutes() >= UtilMonitorOmega.getPropiedadesMonitorOmega().getIntervaloRefrescado());
    }
}
