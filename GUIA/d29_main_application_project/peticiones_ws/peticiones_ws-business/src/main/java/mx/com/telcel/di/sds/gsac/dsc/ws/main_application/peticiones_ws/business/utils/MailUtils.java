package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.utils;

import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.common.Constants;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Juan
 */
public class MailUtils {

    // Tags HTML
    public static final String HTML_BR = "<br>";
    public static final String HTML_TABLE = "<table>";
    public static final String HTML_TABLE_CLOSE = "</table>";
    public static final String HTML_TR = "<tr>";
    public static final String HTML_TR_CLOSE = "</tr>";
    public static final String HTML_TH = "<th>";
    public static final String HTML_TH_CLOSE = "</th>";
    public static final String HTML_TD = "<td>";
    public static final String HTML_TD_CLOSE = "</td>";
    public static final String HTML_P = "<p>";
    public static final String HTML_P_CLOSE = "</p>";
    public static final String TAB = StringUtils.repeat(" ", 4);

    // HTML Mail Templates
    public static final String MAIL_TEMPLATE_SOL_USU_CORP = Constants.BASE_RESOURCES_PATH + "mail_template_sol_usu_corp.html";
    public static final String MAIL_TEMPLATE_REPORTE_USU_CORP = Constants.BASE_RESOURCES_PATH + "mail_template_reporte_usu_corp.html";
    public static final String MAIL_TEMPLATE_SOL_PETICION = Constants.BASE_RESOURCES_PATH + "mail_template_sol_peticion.html";
    public static final String MAIL_TEMPLATE_SOL_USU_CORP_RESPONSE = Constants.BASE_RESOURCES_PATH + "mail_template_sol_usu_corp_response.html";
    public static final String MAIL_TEMPLATE_SOL_PETICION_RESPONSE = Constants.BASE_RESOURCES_PATH + "mail_template_sol_peticion_response.html";
    public static final String MAIL_TEMPLATE_ADMIN_PETICION = Constants.BASE_RESOURCES_PATH + "mail_template_admin_peticion.html";

    // Mail Template Data
    public static final String MAIL_SUBJECT = "Permisos de Servicios WS-M2k";
    public static final String SUBJECT_TITLE_SOL_USU_CORP = "Solicitud de Usuario Corporativo";
    public static final String SUBJECT_TITLE_REPORTE_USU_CORP = "Reporte de Usuario Corporativo";
    public static final String SUBJECT_TITLE_SOL_PETICION = "Solicitud de Peticiones WS-M2k";
    public static final String SUBJECT_TITLE_ADMIN_PETICION = "Administraci&oacute;n de Peticiones WS-M2k";
    public static final String DATA_TITLE_SOL_PENDIENTE = "Solicitud Pendiente";
    public static final String DATA_TITLE_SOL_URGENTE = "Solicitud Urgente";
    public static final String DATA_TITLE_SOL_RESPONSE = "Respuesta a Solicitud";
    public static final String DATA_TITLE_USU_CORP_NO_RESP = "Usuario Corporativo Sin Responsable";
    public static final String DATA_TITLE_USU_CORP_NO_USU = "Usuario Corporativo No Existe";
    public static final String DATA_TITLE_ADMIN_PETICION = "Modificaci&oacute;n de Peticiones WS-M2k";
    public static final String MAIL_FOOTER = "<span>Para administrar sus solicitudes ir al sitio web de <a href=\"#TOOLS_URL\">WS-M2K TOOLS</a></span>";
    public static final String MAIL_FOOTER_PERMISOS = "<span>Las peticiones autorizadas se ver&aacute;n reflejadas al d&iacute;a siguiente</span>";

    // Mail Template Tags
    public static final String TAG_TOOLS_URL = "#TOOLS_URL";
    public static final String TAG_SOLICITUD_ID = "#SOLICITUD_ID";
    public static final String TAG_SOLICITANTE_NOMBRE = "#SOLICITANTE_NOMBRE";
    public static final String TAG_SOLICITANTE_CORREO = "#SOLICITANTE_CORREO";
    public static final String TAG_USUARIO_CORP = "#USUARIO_CORP";
    public static final String TAG_JUSTIFICACION = "#JUSTIFICACION";
    public static final String TAG_FECHA_REGISTRO = "#FECHA_REGISTRO";
    public static final String TAG_AMBIENTE = "#AMBIENTE";
    public static final String TAG_FOLIO_SISAP = "#FOLIO_SISAP";
    public static final String TAG_FECHA_CADUCIDAD = "#FECHA_CADUCIDAD";
    public static final String TAG_APLICATIVO = "#APLICATIVO";
    public static final String TAG_AREA = "#AREA";
    public static final String TAG_URGENTE = "#URGENTE";
    public static final String TAG_DATA_PETICION = "#DATA_PETICION";
    public static final String TAG_DATA_SOL_USU_CORP = "#DATA_SOL_USU_CORP";
    public static final String TAG_DATA_SOL_PETICION = "#DATA_SOL_PETICION";

    public static String getHTMLHeader(String text) {
        return HTML_TH + StringUtils.trimToEmpty(text) + HTML_TH_CLOSE;
    }

    public static String getHTMLRowData(String text) {
        return HTML_TD + StringUtils.trimToEmpty(text) + HTML_TD_CLOSE;
    }

    public static String getHtmlRowData(String text, List<String> attrs) {
        return null;
    }

    public static String getHTMLRow(List<String> data, boolean isHeader) {
        if (data == null || data.isEmpty()) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        sb.append(HTML_TR);
        if (!isHeader) {
            for (String text : data) {
                sb.append(getHTMLRowData(text));
            }
        } else {
            for (String text : data) {
                sb.append(getHTMLHeader(text));
            }
        }
        sb.append(HTML_TR_CLOSE);
        return sb.toString();
    }

    public static String getHTMLRow(List<String> data) {
        return getHTMLRow(data, false);
    }

    public static String getSimpleHTML(Map<String, String> mapData) {
        if (mapData == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder(HTML_P);
        for (Map.Entry<String, String> entry : mapData.entrySet()) {
            sb.append(HTML_BR).append(entry.getKey()).append(TAB).append(StringUtils.trimToEmpty(entry.getValue()));
        }
        sb.append(HTML_BR).append(HTML_P_CLOSE);
        return sb.toString();
    }

    public static String getSimpleHTMLTable(List<String> colData, String rowData) {
        if (StringUtils.isBlank(rowData)) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(HTML_TABLE);
        if (colData != null && !colData.isEmpty()) {
            sb.append(getHTMLRow(colData, true));
        }
        sb.append(rowData).append(HTML_TABLE_CLOSE);
        return sb.toString();
    }

    public static String getSimpleHTMLTable(String rowData) {
        return getSimpleHTMLTable(null, rowData);
    }
}
