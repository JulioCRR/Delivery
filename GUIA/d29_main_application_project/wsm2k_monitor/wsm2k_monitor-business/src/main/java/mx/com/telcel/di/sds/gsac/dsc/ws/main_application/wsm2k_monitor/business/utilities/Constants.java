
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;


public class Constants {
    
    
    // parametros SOAPRequest
    
    public static final String TELCEL_NS = "http://servicios.web.m2k.sds.telcel.com";
    public static final String XML_HEADER = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
    public static final String RUN_SERVICE = "ejecutaServicio";
    
    
    // Datos del Request Test
    
    public static final String USER_TEST = "PINGUSR";
    public static final String REGION_TEST = "X";
    public static final String FUNCTION_TEST = "I*15";
    public static final String ACTION_TEST = "C";
    public static final String SERVICE_TEST = "servicio";
    public static final String ETIQUETA_TEST = "p01telefono";
    public static final String LONGUITUD_TEST = "10";
    public static final String TELEFONO_TEST = "5555555555";
    
    
    //ValidaInstanciaThread
    
    
    public static final int READ_TIMEOUT = 10_000;
    public static final int CONNECTION_TIMEOUT = 10_000;
    public static final int SLEEP_TIMEOUT = 5000;
     
}
