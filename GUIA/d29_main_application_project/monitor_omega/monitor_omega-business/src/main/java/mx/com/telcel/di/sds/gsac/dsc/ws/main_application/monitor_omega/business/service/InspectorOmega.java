package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.dao.MonitorOmegaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common.DBUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.entities.OmegaAlerta;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.Cics;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.CicsThread;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXI3
 */
@Service
public class InspectorOmega {

    private static final Logger LOG = LoggerFactory.getLogger(InspectorOmega.class);
    private static final String[] ARRAY_CICS_IGNORED = {"CICSR01T"};

    @Autowired
    private MonitorOmegaDao monitorOmegaDao;

    public int revisarAlertas(OmegaData omegaData) {
        List<OmegaAlerta> listOmegaAlerta = new ArrayList<>();
        long fechaAlertaTime = omegaData.getFechaUpdate().getTime();
        Iterator<Cics> itCics = omegaData.getListCics().iterator();
        while (itCics.hasNext()) {
            Cics cics = itCics.next();
            try {
                Double cpu = DBUtils.getDouble(cics.getTotalCpu());
                if (isCpuMax(cpu)) {
                    listOmegaAlerta.add(new OmegaAlerta(fechaAlertaTime, cics.getJobName(), cpu));
                    cics.setAlertRaised(true);
                }
            } catch (Exception ex) {
                LOG.error("ERROR AL INSPECCIONAR CICS - LINEA DE OMEGA: " + cics.getFullText() + " - EXCEPCION: " + ex.toString());
                itCics.remove();
            }
        }
        Iterator<CicsThread> itCicsThread = omegaData.getListCicsThread().iterator();
        while (itCicsThread.hasNext()) {
            CicsThread cicsThread = itCicsThread.next();
            try {
                String transaccion = cicsThread.getTran().toUpperCase();
                if (transaccion.isEmpty() || cicsThread.getJobName().isEmpty()) {
                    throw new Exception("DATOS INCOMPLETOS");
                }
                char regionLetter = transaccion.charAt(1);
                for (Map.Entry<String, String> entries : UtilMonitorOmega.getLetraRegion().entrySet()) {
                    if (regionLetter == entries.getValue().charAt(0)) {
                        cicsThread.setRegion(entries.getKey());
                        break;
                    }
                }
                transaccion = transaccion.charAt(0) + "*" + transaccion.substring(2);
                cicsThread.setTransaccion(transaccion);
                cicsThread.setPantallaM2k(StringUtils.defaultIfEmpty(UtilMonitorOmega.getMapPantallasM2k().get(transaccion), Constants.NULL_PANTALLA_M2K));
                if (isIgnored(cicsThread.getJobName(), transaccion)) {
                    cicsThread.setThreadType(CicsThread.THREAD_TYPE_IGNORED);
                } else {
                    isAlert(listOmegaAlerta, cicsThread, fechaAlertaTime);
                }
            } catch (Exception ex) {
                LOG.error("ERROR AL INSPECCIONAR TRANSACCION - EXCEPCION: " + ex.toString() + " - LINEA OMEGA: \"" + cicsThread.getFullText() + "\"");
                itCicsThread.remove();
            }
        }
        if (!listOmegaAlerta.isEmpty()) {
            omegaData.setAlertRaised(true);
            monitorOmegaDao.saveAlertasBatch(listOmegaAlerta);
        }
        return listOmegaAlerta.size();
    }

    private boolean isIgnored(String jobName, String transaccion) throws Exception {
        for (String cicsName : ARRAY_CICS_IGNORED) {
            if (jobName.equals(cicsName.toUpperCase())) {
                return true;
            }
        }
        return transaccion.matches(OmegaData.IGNORE_Y4);
    }

    private boolean isAlert(List<OmegaAlerta> listAlertas, CicsThread summary, long fechaAlerta) throws Exception {
        double time = summary.createElapsedTime();
        Double cpu = summary.createCpuPct();
        if (cpu < 0) {
            cpu = null;
        }
        if (time >= UtilMonitorOmega.getPropiedadesMonitorOmega().getUmbralAlertas()
                || isCpuMax(cpu)) {
            summary.setThreadType(CicsThread.THREAD_TYPE_ALERT);
            OmegaAlerta alerta = new OmegaAlerta();
            alerta.setFechaAlerta(fechaAlerta);
            alerta.setCics(summary.getJobName());
            alerta.setTransaccion(summary.getTransaccion());
            alerta.setRegion(summary.getRegion());
            alerta.setCpu(cpu);
            alerta.setEjecucion(time);
            listAlertas.add(alerta);
            return true;
        }
        return false;
    }

    private boolean isCpuMax(Double cpu) {
        return (cpu != null && cpu >= UtilMonitorOmega.getPropiedadesMonitorOmega().getMaxCpu());
    }
}
