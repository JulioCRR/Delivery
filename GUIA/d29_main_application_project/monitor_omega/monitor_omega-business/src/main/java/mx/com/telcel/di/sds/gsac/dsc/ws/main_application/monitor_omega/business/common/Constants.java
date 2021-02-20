package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common;

/**
 * Constantes globales
 *
 * @author VI9XXI3
 */
public class Constants {

    public static final String BASE_NAME = "monitor-omega";
    public static final String BASE_NAME_PATH = BASE_NAME + "/";
    public static final String MAIL_TEMPLATE = "monitor_omega/mail_template.html";
    public static final String MAIL_TEMPLATE_ERROR = "monitor_omega/mail_template_error.html";
    public static final String NULL_PANTALLA_M2K = "SIN DEFINIR";

    public static final String HTML_FECHA_EVENTO = "#FECHA_EVENTO";
    public static final String HTML_DATOS_CICS = "#DATOS_CICS";
    public static final String HTML_TOTAL_ALERTAS = "#TOTAL_ALERTAS";
    public static final String HTML_SUBJECT_TITLE = "Alertas Omega";
    public static final String HTML_SUBJECT_TITLE_ERROR = "Error Monitor Omega";
    public static final String HTML_DATA_TITLE = "Se han detectado <b>" + HTML_TOTAL_ALERTAS + "</b> proceso(s) alto(s) en <b>Omega</b>";
    public static final String HTML_DATA_TITLE_ERROR = "No se pudo obtener informaci&oacute;n de Omega durante <b>" + HTML_TOTAL_ALERTAS + " minutos</b>";

    // ManagedConnectionImpl Constants
    public static final String ERR_INTENTOS_BLOQUEADOS = "Reintentos bloqueados por seguridad";
    public static final String ERR_CONEXION_INVALIDA = "Conexion invalidada por pantalla incorrecta";
    public static final String ERR_PANTALLA_INVALIDA = "El conector no se encuentra en la pantalla esperada";
    public static final String MSG_TITLE_OMEGA = "Omegamon II For DB2 System Status";
    public static final String MSG_TITLE_CICS = "CICS Connections";
    public static final String MSG_TITLE_SUMMARY = "CICS Thread Summary";
    public static final String MSG_PRESS_ENTER_BEGIN = "Please press ENTER to begin";
    public static final String MSG_STAND_BY = "Please Stand By";
    public static final String TXT_KLVNA = "KLVNA";
    public static final String TXT_CICS = "CICS";
    public static final String TXT_ZCICST = "ZCICST";
    public static final String TXT_CICA = "CICA";
    public static final String TXT_THDC = "THDC";
    public static final int MAX_LOGIN_OMEGA = 3;

    //IP REDIS
    public static final String REDIS_IP = "redis://Temp.123@10.119.131.14:6380";
}
