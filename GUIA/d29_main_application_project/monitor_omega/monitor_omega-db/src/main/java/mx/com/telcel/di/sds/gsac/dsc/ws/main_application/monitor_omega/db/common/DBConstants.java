package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common;

/**
 *
 * @author VI9XXI3
 */
public class DBConstants {
    public static final String DB_PREF_OMEGA = 
            mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants.DB_PREF + "OMG_";
    public static final String OMEGA_REFRESH_INTERVAL = "OMEGA_REFRESH_INTERVAL";
    public static final String OMEGA_ALERT_THRESHOLD = "OMEGA_ALERT_THRESHOLD";
    public static final String OMEGA_MONITOR_ON = "OMEGA_MONITOR_ON";
    public static final String OMEGA_ALERT_EMAILS = "OMEGA_ALERT_EMAILS";
    public static final String OMEGA_ALERT_ERROR_EMAILS = "OMEGA_ALERT_ERROR_EMAILS";
    public static final int DEFAULT_REFRESH_INTERVAL = 10;
    public static final double DEFAULT_ALERT_THRESHOLD = 15.0;
    public static final boolean DEFAULT_MONITOR_ON = false;
    public static final String OMEGA_MAX_CPU = "OMEGA_MAX_CPU";
    public static final double DEFAULT_MAX_CPU = 50.0;
}
