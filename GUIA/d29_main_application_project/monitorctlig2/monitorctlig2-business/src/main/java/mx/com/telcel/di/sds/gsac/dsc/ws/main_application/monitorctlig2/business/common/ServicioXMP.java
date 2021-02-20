package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common;

import com.telcel.sds.gsa.xmp.IXMPClient;
import com.telcel.sds.gsa.xmp.ResponseXMP;
import com.telcel.sds.gsa.xmp.ServiceXMP;
import com.telcel.sds.gsa.xmp.exception.XMPException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/**
 * @author VI9XXFF
 *
 */
@Service("ServicioXMP")

public class ServicioXMP {

    private static final Logger LOG = LoggerFactory.getLogger(ServicioXMP.class);

    @Autowired
    private ApplicationContext context;

    // Variables XMP
    private IXMPClient client = null;
    private ServiceXMP serviceXMP = null;
    private ResponseXMP responseXMP = null;

    private static final int INTENTOS_PERMITIDOS = 3;
    private int intentos = 0;

    //Constructor
    public ServicioXMP() {
    }

    /**
     * Invoca al XMP que ejecuta el servicio M2K
     *
     * @param iMap
     * @param parametros
     * @return
     */
    public Map<String, String> invokeService(Map<String, String> iMap, ArrayList<String> parametros) {

        LOG.debug("======11111111111111111=============== Invocacion de Servicio ======================");
        //client = IXMPClient.getInstance();
        //client 						 = new IXMPClient(0);
        client = IXMPClient.getInstance();
        Map<String, String> mapResult = new HashMap();

        /*
		 * Genera mapa con los valores necesarios para invocar el servicio M2K
         */
        serviceXMP = generaMapaServicio(iMap, parametros);

        /*
		 * Ejecuta el servicio, en caso de error lanza un XMPException
         */
        try {

            responseXMP = client.executeService(serviceXMP);
            LOG.debug("<<<<<<<<<<<<<<<<<<<<<<<<<<<<RETORNO responseXMP " + responseXMP);

            mapResult = responseXMP.getMapResult();
            LOG.debug("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<XML REQUEST  = " + responseXMP.getXMLRequest());
            LOG.debug(responseXMP.getXMLRequest());

        } catch (XMPException e) {

            LOG.debug("XMPException generada. " + e.getMessage());

            /*
			 * Procesa resultado del XMPException
             */
            mapResult = procesaXMPException(mapResult, iMap, parametros, e);

        } catch (Exception e) {
            LOG.debug("EXCEPTIONNNNNNNNN [ServicioXMP ln 139]  " + e.getMessage());
            mapResult.put("mensajeExcep", e.getMessage());
        }
        LOG.debug("======================== MAPA RESPUESTA ===========================");
        mapResult.put("xmlResponse", responseXMP.getXMLResponse());
        mapResult.put("xmlRequest", responseXMP.getXMLRequest());
        this.imprimirMap(mapResult);
        LOG.debug("===================================================================");
        return mapResult;
    }

    /**
     * Genera el mapa que contiene la informaci�n para invocar el servicio M2K
     *
     * @param iMap
     * @param parametros
     * @return
     */
    private ServiceXMP generaMapaServicio(Map<String, String> iMap, ArrayList<String> parametros) {

        ServiceXMP servicioXMP = new ServiceXMP();

        //Seteo de Variables.
        if (iMap.get("idService") != null) {
            LOG.debug("idService= [" + iMap.get("idService") + "]");
            servicioXMP.setIDService(iMap.get("idService"));
        }
        if (iMap.get("aplicacion") != null) {
            LOG.debug("aplicacion= [" + iMap.get("aplicacion") + "]");
            servicioXMP.setApp(iMap.get("aplicacion"));
        }
        if (iMap.get("usuario") != null) {
            LOG.debug("usuario= [" + iMap.get("usuario") + "]");
            servicioXMP.setUsuario(iMap.get("usuario"));
        }
        if (iMap.get("region") != null) {
            LOG.debug("region= [" + iMap.get("region") + "]");
            servicioXMP.setRegion(iMap.get("region"));
        }

        LOG.debug("Parametros ....");
        LOG.debug("Parametros ....");
        int i = 1;
        /* Se a�aden parametros, la lista debe estar ordenada conforme a deban ser ingresados los
		 * parametros para el servicio.
         */
        for (String param : parametros) {
            LOG.debug("Param(" + (i++) + ")= [" + param + "]");
            servicioXMP.addParam(param);
        }

        return servicioXMP;
    }

    private Map<String, String> procesaXMPException(Map<String, String> mapResult, Map<String, String> iMap, ArrayList<String> parametros, XMPException e) {

        //Obtiene objeto Response
        responseXMP = client.getResponseXMP();

        LOG.debug("CODE= " + responseXMP.getCode() + "| MSSG= " + responseXMP.getMessage());
        LOG.debug("XML REQUEST  = " + responseXMP.getXMLRequest());
        LOG.debug("XML RESPONSE  = " + responseXMP.getXMLResponse());

        if (responseXMP.getCode() != -600) {
            LOG.debug("if code != -600............");
            mapResult.put("mensajeXMPExcep", "Service=[" + serviceXMP.getIDService() + "] - ResponseCode=[" + responseXMP.getCode() + "] - " + e.getMessage());
            mapResult.put(ConstantesXMP.PENDIENTE, "PE");
        } else {

            LOG.debug("�intentar nuevamente?.....");
            int respuesta = this.intentarNuevamente(e.getMessage());
            LOG.debug("�intentar nuevamente? Respuesta.......... [" + respuesta + "]");

            switch (respuesta) {
                case ConstantesXMP.COD_REINTENTO:
                    LOG.debug("If reintento ................");
                    mapResult = this.invokeService(iMap, parametros);
                    break;
                case ConstantesXMP.COD_PENDIENTE:
                    LOG.debug("If Pendiente ................");
                    mapResult.put("mensajeXMPExcep", e.getMessage());
                    mapResult.put("PENDIENTE", "PE");
                    break;
                case ConstantesXMP.COD_ERROR:
                    LOG.debug("If Error ................");
                    mapResult.put("mensajeXMPExcep", e.getMessage());
                    mapResult.put("ERROR", "ER");
                    break;
                default:
                    break;
            }

        }

        return mapResult;
    }

    /**
     * ------------------------------------------------------------------------
     * -------------------------------- Funciones de utileria.
     * ------------------
     * --------------------------------------------------------
     * ------------------------------
     */
    private void imprimirMap(Map datosEntrada) {
        if (datosEntrada == null || datosEntrada.size() <= 0) {
            LOG.debug("EL MAPA SE ENCUENTRA VACIO. -------------------");
            return;
        }

        for (Iterator it = datosEntrada.keySet().iterator(); it.hasNext();) {
            String s = (String) it.next();
            String s1 = (String) datosEntrada.get(s);
            LOG.debug(s + " : " + s1);
        }
    }

    /**
     * Verificar si la respuesta es una de las siguientes: --------- Socket,
     * Null, 500, html, conexion, obtuvo, 404, Connection, GRPCO
     * ---------------- En caso de ser una de estas, es posible intentar
     * ejecutar nuevamente el servicio.
     *
     * @param e
     * @return --------- SOLO PA PROBAR COMENTE
     */
    private int intentarNuevamente(String msgError) {
        LOG.debug("Enter to funcion ServicioXMP.intentarNuevamente|" + msgError);
        LOG.debug("CONTEXT|" + context);

        Pattern pattern = Pattern.compile(((Map<String, String>) context.getBean("generalProperties")).get("retryXMPService"));

        Matcher match;
        msgError = msgError.toUpperCase();
        LOG.debug("Verificando MENSAJE DE ERROR= " + msgError);

        LOG.debug("Cadena de reintento retryXMPService=" + ((Map<String, String>) context.getBean("generalProperties")).get("retryXMPService"));
        LOG.debug("Mensaje de Error=" + msgError);
        LOG.debug("REINTENTO|PENDIENTE|ERROR=" + ConstantesXMP.COD_REINTENTO + "|" + ConstantesXMP.COD_PENDIENTE + "|" + ConstantesXMP.COD_ERROR);

        if (msgError != null) {
            match = pattern.matcher(msgError);

            if (match.find()) {
                LOG.debug("Cuenta de Intentos = " + this.intentos);
                LOG.debug("Cuenta de Intentos = " + this.intentos);
                if (this.intentos < ServicioXMP.INTENTOS_PERMITIDOS) {
                    this.intentos++;
                    LOG.debug("No se ha alcanzando el maximo de intentos permitidos, SE INTENTARA NUEVAMENTE.");
                    LOG.debug("No se ha alcanzando el maximo de intentos permitidos, SE INTENTARA NUEVAMENTE.|" + ConstantesXMP.COD_REINTENTO);
                    return ConstantesXMP.COD_REINTENTO;
                } else {
                    LOG.debug("El maximo de intentos ha sido alcanzado, IMPOSIBLE INTENTAR NUEVAMENTE.");
                    LOG.debug("El maximo de intentos ha sido alcanzado, IMPOSIBLE INTENTAR NUEVAMENTE.|" + ConstantesXMP.COD_PENDIENTE);
                    return ConstantesXMP.COD_PENDIENTE;
                }
            } else {
                LOG.debug("El mensaje de error no contiene cadena de reintento.");
                LOG.debug("El mensaje de error no contiene cadena de reintento.|" + ConstantesXMP.COD_ERROR);
                return ConstantesXMP.COD_ERROR;
            }
        } else {
            LOG.debug("El mensaje de error no contiene cadena de reintento.");
            LOG.debug("El mensaje de error no contiene cadena de reintento.|" + ConstantesXMP.COD_ERROR);
            return ConstantesXMP.COD_ERROR;
        }
    }

    public void iniciarIntentos() {
        LOG.debug("Inicializando intentos a 0.");
        this.intentos = 0;
    }

    /**
     * Parsea la cadena para obtener el codigo de ERROR en la respuesta del WS.
     * Como ejemplo, se tiene la cadena, de excepcion obtenida mediante el
     * metodo Exception.getMessage(), el mensaje obtenido se estructura de esta
     * manera 1. Tipo de Excepcion seguido de dos puntos 2. Mensaje de Excepcion
     * seguido de dos puntos 3. Codigo de la excepcion mas la descripcion
     * com.telcel.sds.crm.exceptionsIOH.PostpagoActualizacionException: Codigo
     * de error encontrado: AS159 01 INVALID PRICE PLAN
     *
     * @param excepcion
     * @return
     */
    public String parsearCadena(String excepcion) {
        if (excepcion == null) {
            return "";
        }
        String[] primerParseo = excepcion.split(":");
        LOG.debug("ESTE ES EL CODIGO DE EXCEPCION = "
                + primerParseo[primerParseo.length - 1]);
        return primerParseo[primerParseo.length - 1];
    }

    public int getIntentos() {
        return intentos;
    }

    public void setIntentos(int intentos) {
        this.intentos = intentos;
    }

    public int getINTENTOS_PERMITIDOS() {
        return INTENTOS_PERMITIDOS;
    }
}
