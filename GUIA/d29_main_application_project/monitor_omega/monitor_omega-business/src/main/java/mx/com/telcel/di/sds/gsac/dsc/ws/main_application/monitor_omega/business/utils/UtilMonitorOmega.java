package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.PropiedadesMonitorOmega;

/**
 * Clase con est&aacute;ticos para el uso global del monitoreo de Omegamon II
 * for DB2
 *
 * @author VI9XXI3
 */
public class UtilMonitorOmega {

    private static Date ultimaActualizacion;
    private static OmegaData omegaData;
    private static Map<String, String> letraRegion;
    private static PropiedadesMonitorOmega propiedadesMonitorOmega;
    private static final Map<String, String> mapPantallasM2k = new HashMap<>();

    public static Date getUltimaActualizacion() {
        return ultimaActualizacion;
    }

    public static void setUltimaActualizacion(Date aUltimaActualizacion) {
        ultimaActualizacion = aUltimaActualizacion;
    }

    public static OmegaData getOmegaData() {
        return omegaData;
    }

    public static void setOmegaData(OmegaData aOmegaData) {
        omegaData = aOmegaData;
    }

    public static Map<String, String> getLetraRegion() {
        return letraRegion;
    }

    public static void setLetraRegion(Map<String, String> aLetraRegion) {
        letraRegion = aLetraRegion;
    }

    public static PropiedadesMonitorOmega getPropiedadesMonitorOmega() {
        return propiedadesMonitorOmega;
    }

    public static void setPropiedadesMonitorOmega(PropiedadesMonitorOmega aPropiedadesMonitorOmega) {
        propiedadesMonitorOmega = aPropiedadesMonitorOmega;
    }

    public static Map<String, String> getMapPantallasM2k() {
        return mapPantallasM2k;
    }
}
