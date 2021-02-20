package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.socket;

import org.springframework.stereotype.Component;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.ctg.client.ECIRequest;
import com.ibm.ctg.client.JavaGateway;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions.CTGValidationException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.service.ValidationService;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesCTGImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesXMLImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.ConexionCTG;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PruebaCtg;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class CtgConector {

    private static final Logger LOG = LoggerFactory.getLogger(CtgConector.class);
    private static final int NUMERO_CARACTERES_USUARIO = 8;
    private static final String ESPACIO_FORZOSO = "                ";
    private static final String ENCODING_IBM = "IBM037";
    private static final String PRODUCCION = "P";
    private static final String DESARROLLO = "D";
    private static final String DESARROLLO_NVO_CICS = "C";
    private static final String SERVER_DESARROLLO = "CTGDES";
    private static final String SERVER_DESARROLLO_NVO_CICS = "CICSDSB9";
    private static final String SERVER_R09 = "CICSSB09";
    private static final String SERVER_R04_R05 = "CICSSB04";
    private static final String SERVER_OTHERS = "CICSSB22";
    private static final String NO_SERVER = "NOSERVER";
    private static final String DUMMY_PETICIONID = "01234567-abcd-0123-abcd-0123456789ab";

    private enum ERegion {
        R01(SERVER_OTHERS),
        R02(SERVER_OTHERS),
        R03(SERVER_OTHERS),
        R04(SERVER_R04_R05),
        R05(SERVER_R04_R05),
        R06(SERVER_OTHERS),
        R07(SERVER_OTHERS),
        R08(SERVER_OTHERS),
        R09(SERVER_R09),
        R0I(SERVER_DESARROLLO);

        public final String serverName;

        private ERegion(String serverName) {
            this.serverName = serverName;
        }
    }

    @Autowired
    private ValidationService validationService;

    @Autowired
    private ConexionCTG conexionCTG;

    public UtilidadesCTGImp ejecutaProgramaCTG(PruebaCtg prueba) throws Exception {
        if (prueba != null) {
            return ejecutaProgramaCTG(prueba.getUsuario(), prueba.getPassword(), prueba.getPrograma(), prueba.getRegion(), prueba.getTransaccion(), prueba.getCadena(), prueba.getAmbiente());
        } else {
            throw new Exception("No se puede ejeuctar una prueba nula.");
        }
    }

    private UtilidadesCTGImp ejecutaProgramaCTG(String user, String password, String programa, String region, String transaccion, String cadena, String ambiente) {
        StringBuilder commarea = new StringBuilder();
        ERegion enumRegion = getRegionEnum(region);
        String userFormat = formatUser(user);

        commarea.append(userFormat);
        commarea.append(enumRegion.name());
        commarea.append(ESPACIO_FORZOSO);
        commarea.append(transaccion);
        commarea.append(cadena);

        ECIRequest eciRequest = null;
        String requestCTG = commarea.toString();
        String respuestaCTG = "ERROR AL EJECUTAR PETICION AL CTG.";
        String respuestaXML = "SIN RESPUESTA";
        String mensajeValidacion = null;
        UtilidadesCTGImp respCTG = new UtilidadesCTGImp();
        UtilidadesXMLImp xmlUtils = new UtilidadesXMLImp();
        JavaGateway jg = null;
        try {
            validationService.isValidCTGText(requestCTG);
            jg = new JavaGateway(conexionCTG.getIp(), conexionCTG.getPort());
            byte[] commareaBytes = StringUtils.rightPad(commarea.toString(), conexionCTG.getCommareaLength()).getBytes(ENCODING_IBM);
            eciRequest = new ECIRequest(ECIRequest.ECI_SYNC,
                    getServerName(enumRegion, ambiente),
                    userFormat,
                    password,
                    programa,
                    getTransaction(transaccion, enumRegion, ambiente),
                    commareaBytes,
                    commareaBytes.length,
                    ECIRequest.ECI_NO_EXTEND,
                    ECIRequest.ECI_LUW_NEW);

            requestCTG = new String(eciRequest.Commarea, ENCODING_IBM).trim();
            jg.flow(eciRequest);
            jg.close();

            respuestaCTG = new String(eciRequest.Commarea, ENCODING_IBM);
            respuestaCTG = respuestaCTG.length() > 365 ? respuestaCTG.substring(365).trim() : "ERROR AL OBTENER RESPUESTA.";
            try {
                respuestaXML = xmlUtils.obtenerRespuesta(respuestaCTG, DUMMY_PETICIONID);
            } catch (Exception ex) {
                LOG.error("Error al obtener respuesta XML", ex);
                respuestaXML = ex.getMessage();
                mensajeValidacion = "ERROR AL GENERAR RESPUESTA XML";
            }
            if (mensajeValidacion == null) {
                validationService.isValidCTGOutput(xmlUtils);
                mensajeValidacion = "VALIDACION EXITOSA";
            }
        } catch (IllegalArgumentException ex) {
            LOG.error("ERROR AL CREAR ECI_REQUEST", ex);
        } catch (IOException e) {
            LOG.error("IO_ERROR", e);
            respuestaCTG = "ERROR DE CONEXION AL CTG, " + e.getMessage();
            if (jg != null) {
                try {
                    jg.close();
                } catch (IOException ex) {
                    LOG.error("ERROR AL CERRAR CONEXION", ex);
                }
            }
        } catch (CTGValidationException ex) {
            mensajeValidacion = ex.getMessage().toUpperCase();
            String error = "ERROR DE VALIDACION: " + mensajeValidacion
                    + "\n\tCTG REQUEST : " + requestCTG
                    + "\n\tCTG RESPONSE: " + respuestaCTG;
            LOG.error(error);
        } catch (Exception ex) {
            LOG.error("ERROR", ex);
        }
        respCTG.setReq(eciRequest);
        respCTG.setCadenaEnviadaCTG(requestCTG);
        respCTG.setRespuestaCTG(respuestaCTG);
        respCTG.setRespuestaXML(respuestaXML);
        respCTG.setMensajeValidacion(mensajeValidacion);
        return respCTG;
    }

    private String getServerName(ERegion enumRegion, String ambiente) {
        if (DESARROLLO.equals(ambiente)) {
            return SERVER_DESARROLLO;
        }
        if (PRODUCCION.equals(ambiente)) {
            return enumRegion.serverName;
        }
        if (DESARROLLO_NVO_CICS.equals(ambiente)) {
            return SERVER_DESARROLLO_NVO_CICS;
        }
        return NO_SERVER;
    }

    private String getTransaction(String transaccion, ERegion enumRegion, String ambiente) {
        StringBuilder sb = new StringBuilder("I");
        if (DESARROLLO.equals(ambiente) || DESARROLLO_NVO_CICS.equals(ambiente)) {
            sb.append(conexionCTG.getLetraRegion().get(ERegion.R0I.name()));
        } else {
            sb.append(conexionCTG.getLetraRegion().get(enumRegion.name()));
        }
        sb.append(transaccion.substring(2));
        return sb.toString();
    }

    private String formatUser(String user) {
        String userFormat = user;
        if (userFormat.length() > NUMERO_CARACTERES_USUARIO) {
            userFormat = userFormat.substring(0, NUMERO_CARACTERES_USUARIO);
        }
        return StringUtils.rightPad(userFormat, NUMERO_CARACTERES_USUARIO);
    }

    private ERegion getRegionEnum(String region) {
        for (ERegion enumObj : ERegion.values()) {
            if (enumObj.name().equals(region)) {
                return enumObj;
            }
        }
        return null;
    }
}
