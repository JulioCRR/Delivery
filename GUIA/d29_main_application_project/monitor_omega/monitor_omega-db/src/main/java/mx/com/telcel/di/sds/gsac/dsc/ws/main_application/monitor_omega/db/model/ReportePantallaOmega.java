package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model;

import java.util.Date;

/**
 * Clase con la estructura de la pantalla del monitor Omegamon II for DB2
 *
 * @author VI9XXI3
 */
public class ReportePantallaOmega {

    private Date lastUpdate;
    private int alertsCount;
    private OmegaData omegaData;
    private PropiedadesMonitorOmega propiedadesMonitorOmega;

    public ReportePantallaOmega() {
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public int getAlertsCount() {
        return alertsCount;
    }

    public void setAlertsCount(int alertsCount) {
        this.alertsCount = alertsCount;
    }

    public OmegaData getOmegaData() {
        return omegaData;
    }

    public void setOmegaData(OmegaData omegaData) {
        this.omegaData = omegaData;
    }

    public PropiedadesMonitorOmega getPropiedadesMonitorOmega() {
        return propiedadesMonitorOmega;
    }

    public void setPropiedadesMonitorOmega(PropiedadesMonitorOmega propiedadesMonitorOmega) {
        this.propiedadesMonitorOmega = propiedadesMonitorOmega;
    }
}
