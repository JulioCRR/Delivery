package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.utils.MailUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumEstatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common.EnumUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapSolicitudPeticion;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Juan
 */
@Service
public class PeticionesWSEnvioCorreo {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSEnvioCorreo.class);
    private static final SimpleDateFormat SDF = new SimpleDateFormat("dd/MM/yyyy");
    private static final SimpleDateFormat SDF_ADMIN_PETICION = new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss");
    private static final String NOT_AVAILABLE = "N/A";

    private static String TEMPLATE_SOL_USU_CORP;
    private static String TEMPLATE_REPORTE_USU_CORP;
    private static String TEMPLATE_SOL_PETICION;
    private static String TEMPLATE_SOL_USU_CORP_RESPONSE;
    private static String TEMPLATE_SOL_PETICION_RESPONSE;
    private static String TEMPLATE_ADMIN_PETICION;

    @Autowired
    private MailManager mailManager;

    private String getDateFormat(Date fecha) {
        if (fecha == null) {
            return NOT_AVAILABLE;
        }
        try {
            return SDF.format(fecha);
        } catch (Exception ex) {
        }
        return NOT_AVAILABLE;
    }

    // **************************************************
    // Solicitud Usuario Corporativo
    // **************************************************
    public void enviarSolUsuCorp(SolicitudUsuarioCorp solicitud, String correoResp) {
        String htmlMessage = getHtmlSolUsuCorp(solicitud);
        if (StringUtils.isBlank(htmlMessage)) {
            Map<String, String> mapData = new HashMap<>();
            mapData.put("Se solicita el uso del usuario mobile:", solicitud.getUsuarioCorp());
            mapData.put("Solictante:", solicitud.getSolicitante().getNombreCompleto());
            mapData.put("Justificacion:", solicitud.getJustificacion());
            htmlMessage = MailUtils.getSimpleHTML(mapData);
        }
        mailManager.sendMimeMail(correoResp, MailUtils.MAIL_SUBJECT, htmlMessage);
        LOG.info("Correo de solicitud de usuario corporativo enviado");
    }

    private String getHtmlSolUsuCorp(SolicitudUsuarioCorp solicitud) {
        if (StringUtils.isBlank(TEMPLATE_SOL_USU_CORP)) {
            TEMPLATE_SOL_USU_CORP = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_SOL_USU_CORP, true);
            if (StringUtils.isBlank(TEMPLATE_SOL_USU_CORP)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_SOL_USU_CORP);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_SOL_USU_CORP,
                MailUtils.DATA_TITLE_SOL_PENDIENTE,
                TEMPLATE_SOL_USU_CORP,
                MailUtils.MAIL_FOOTER);
        if (StringUtils.isBlank(message)) {
            return null;
        }

        return message
                .replace(MailUtils.TAG_SOLICITUD_ID, String.valueOf(solicitud.getId()))
                .replace(MailUtils.TAG_SOLICITANTE_NOMBRE, solicitud.getSolicitante().getNombreCompleto())
                .replace(MailUtils.TAG_USUARIO_CORP, solicitud.getUsuarioCorp())
                .replace(MailUtils.TAG_JUSTIFICACION, solicitud.getJustificacion())
                .replace(MailUtils.TAG_TOOLS_URL, mailManager.getPortalServiciosUrl());
    }

    public void enviarReporteUsuCorp(SolicitudUsuarioCorp solicitud, int tipoReporte) {
        String tipo = tipoReporte == 1 ? MailUtils.DATA_TITLE_USU_CORP_NO_RESP : MailUtils.DATA_TITLE_USU_CORP_NO_USU;
        String fechaReporte = SDF_ADMIN_PETICION.format(solicitud.getFechaRegistro());
        String htmlMessage = getHtmlReporteUsuCorp(solicitud, tipo, fechaReporte);
        if (StringUtils.isBlank(htmlMessage)) {
            Map<String, String> mapData = new HashMap<>();
            mapData.put(tipo, solicitud.getUsuarioCorp());
            mapData.put("Reportado Por:", solicitud.getSolicitante().getNombreCompleto());
            mapData.put("Correo:", solicitud.getSolicitante().getCorreo());
            mapData.put("Fecha Reporte", fechaReporte);
            htmlMessage = MailUtils.getSimpleHTML(mapData);
        }
        mailManager.sendMimeMail(MailUtils.MAIL_SUBJECT, htmlMessage);
        LOG.info("Correo de reporte de usuario corporativo enviado");
    }

    private String getHtmlReporteUsuCorp(SolicitudUsuarioCorp solicitud, String tipo, String fechaReporte) {
        if (StringUtils.isBlank(TEMPLATE_REPORTE_USU_CORP)) {
            TEMPLATE_REPORTE_USU_CORP = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_REPORTE_USU_CORP, true);
            if (StringUtils.isBlank(TEMPLATE_REPORTE_USU_CORP)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_REPORTE_USU_CORP);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_REPORTE_USU_CORP,
                tipo,
                TEMPLATE_REPORTE_USU_CORP,
                null);
        if (StringUtils.isBlank(message)) {
            return null;
        }
        return message
                .replace(MailUtils.TAG_USUARIO_CORP, solicitud.getUsuarioCorp())
                .replace(MailUtils.TAG_SOLICITANTE_NOMBRE, solicitud.getSolicitante().getNombreCompleto())
                .replace(MailUtils.TAG_SOLICITANTE_CORREO, solicitud.getSolicitante().getCorreo())
                .replace(MailUtils.TAG_FECHA_REGISTRO, fechaReporte);
    }

    // **************************************************
    // Solicitud Peticiones Web
    // **************************************************
    public void enviarSolPeticion(WrapSolicitudPeticion wrapSolicitud, List<Usuario> listAutorizador) {
        String htmlMessage = getHtmlSolPeticion(wrapSolicitud.getSolicitudPeticion(), wrapSolicitud.getListPeticion());
        if (StringUtils.isBlank(htmlMessage)) {
            SolicitudPeticion solicitud = wrapSolicitud.getSolicitudPeticion();
            Map<String, String> mapData = new HashMap<>();
            mapData.put("Se solicita permiso de peticiones:", null);
            mapData.put("ID Solicitud:", String.valueOf(solicitud.getId()));
            mapData.put("Solicitante:", solicitud.getSolicitante().getNombreCompleto());
            mapData.put("Justificacion:", solicitud.getJustificacion());
            htmlMessage = MailUtils.getSimpleHTML(mapData);
        }
        StringBuilder sbMailTo = new StringBuilder(mailManager.getMailTo());
        if (listAutorizador != null && !listAutorizador.isEmpty()) {
            for (Usuario autorizador : listAutorizador) {
                sbMailTo.append(MailManager.MAIL_SEPARATOR_COMMA).append(autorizador.getCorreo());
            }
        }
        mailManager.sendMimeMail(sbMailTo.toString(), MailUtils.MAIL_SUBJECT, htmlMessage);
        LOG.info("Correo enviado");
    }

    private String getHtmlSolPeticion(SolicitudPeticion solicitud, List<Peticion> listPeticion) {
        if (StringUtils.isBlank(TEMPLATE_SOL_PETICION)) {
            TEMPLATE_SOL_PETICION = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_SOL_PETICION, true);
            if (StringUtils.isBlank(TEMPLATE_SOL_PETICION)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_SOL_PETICION);
                return null;
            }
        }
        boolean urgente = EnumEstatus.URGENTE.value.equals(solicitud.getEstatus());
        String dataTitle = urgente ? MailUtils.DATA_TITLE_SOL_URGENTE : MailUtils.DATA_TITLE_SOL_PENDIENTE;
        String footer = urgente ? null : MailUtils.MAIL_FOOTER;
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_SOL_PETICION,
                dataTitle,
                TEMPLATE_SOL_PETICION,
                footer);
        if (StringUtils.isBlank(message)) {
            return null;
        }
        String data = formatPeticionData(listPeticion);
        return message
                .replace(MailUtils.TAG_SOLICITUD_ID, String.valueOf(solicitud.getId()))
                .replace(MailUtils.TAG_FECHA_REGISTRO, getDateFormat(solicitud.getFechaRegistro()))
                .replace(MailUtils.TAG_AMBIENTE, StringUtils.defaultIfBlank(EnumUtils.getAmbienteSolicitud(solicitud.getAmbiente()), NOT_AVAILABLE))
                .replace(MailUtils.TAG_FECHA_CADUCIDAD, getDateFormat(solicitud.getFechaCaducidad()))
                .replace(MailUtils.TAG_APLICATIVO, StringUtils.defaultIfBlank(solicitud.getAplicativo().getNombre(), NOT_AVAILABLE))
                .replace(MailUtils.TAG_AREA, StringUtils.defaultIfBlank(solicitud.getAreaNombre(), NOT_AVAILABLE))
                .replace(MailUtils.TAG_SOLICITANTE_NOMBRE, StringUtils.trimToEmpty(solicitud.getSolicitante().getNombreCompleto()))
                .replace(MailUtils.TAG_JUSTIFICACION, StringUtils.defaultIfBlank(solicitud.getJustificacion(), NOT_AVAILABLE))
                .replace(MailUtils.TAG_DATA_PETICION, data);
    }

    private String formatPeticionData(List<Peticion> listPeticion) {
        StringBuilder sb = new StringBuilder();
        for (Peticion peticion : listPeticion) {
            List<String> data = new ArrayList<>();
            data.add(peticion.getUsuarioCorp());
            data.add(peticion.getIp());
            data.add(peticion.getRegion());
            data.add(peticion.getTransaccion());
            data.add(String.valueOf(peticion.getPeticionesPorMinuto()));
            sb.append(MailUtils.getHTMLRow(data));
        }
        return sb.toString();
    }

    // **************************************************
    // List Solicitudes - Usuario Corporativo
    // **************************************************
    public void enviarSolUsuCorpResponse(Map<Usuario, List<SolicitudUsuarioCorp>> mapCorreo) {
        int sent = 0;
        for (Map.Entry<Usuario, List<SolicitudUsuarioCorp>> entry : mapCorreo.entrySet()) {
            String htmlMessage = getHtmlSolUsuCorpResponse(entry.getValue());
            if (StringUtils.isBlank(htmlMessage)) {
                htmlMessage = MailUtils.HTML_P + "Han respondido a su(s) solicitud(es) de usuario corporativo. Puede verificar en el sitio web de WS-M2k-Tools" + MailUtils.HTML_P_CLOSE;
            }
            mailManager.sendMimeMail(entry.getKey().getCorreo(), MailUtils.MAIL_SUBJECT, htmlMessage);
            sent++;
        }
        LOG.info("Se enviaron " + sent + " correos.");
    }

    private String getHtmlSolUsuCorpResponse(List<SolicitudUsuarioCorp> listSolicitud) {
        if (StringUtils.isBlank(TEMPLATE_SOL_USU_CORP_RESPONSE)) {
            TEMPLATE_SOL_USU_CORP_RESPONSE = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_SOL_USU_CORP_RESPONSE, true);
            if (StringUtils.isBlank(TEMPLATE_SOL_USU_CORP_RESPONSE)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_SOL_USU_CORP_RESPONSE);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_SOL_USU_CORP,
                MailUtils.DATA_TITLE_SOL_RESPONSE,
                TEMPLATE_SOL_USU_CORP_RESPONSE,
                null);
        if (StringUtils.isBlank(message)) {
            return null;
        }
        String data = formatSolUsuCorpResponseData(listSolicitud);
        return message.replace(MailUtils.TAG_DATA_SOL_USU_CORP, data);
    }

    private String formatSolUsuCorpResponseData(List<SolicitudUsuarioCorp> listSolicitud) {
        StringBuilder sb = new StringBuilder();
        for (SolicitudUsuarioCorp solicitud : listSolicitud) {
            List<String> data = new ArrayList<>();
            data.add(String.valueOf(solicitud.getId()));
            data.add(solicitud.getUsuarioCorp());
            data.add(EnumUtils.getEstatusSolicitud(solicitud.getEstatus()));
            data.add(StringUtils.defaultIfBlank(solicitud.getComentarioResponsable(), NOT_AVAILABLE));
            sb.append(MailUtils.getHTMLRow(data));
        }
        return sb.toString();
    }

    // **************************************************
    // List Solicitudes - Peticion
    // **************************************************
    public void enviarSolPeticionResponse(Map<Usuario, List<SolicitudPeticion>> mapCorreo) {
        int sent = 0;
        for (Map.Entry<Usuario, List<SolicitudPeticion>> entry : mapCorreo.entrySet()) {
            String htmlMessage = getHtmlSolPeticionResponse(entry.getValue());
            if (StringUtils.isBlank(htmlMessage)) {
                htmlMessage = MailUtils.HTML_P + "Han respondido a su(s) solicitud(es) de peticiones web. Puede verificar en el sitio web de WS-M2k-Tools" + MailUtils.HTML_P_CLOSE;
            }
            mailManager.sendMimeMail(entry.getKey().getCorreo(), MailUtils.MAIL_SUBJECT, htmlMessage);
            sent++;
        }
        LOG.info("Se enviaron " + sent + " correos.");
    }

    private String getHtmlSolPeticionResponse(List<SolicitudPeticion> listSolicitud) {
        if (StringUtils.isBlank(TEMPLATE_SOL_PETICION_RESPONSE)) {
            TEMPLATE_SOL_PETICION_RESPONSE = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_SOL_PETICION_RESPONSE, true);
            if (StringUtils.isBlank(TEMPLATE_SOL_PETICION_RESPONSE)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_SOL_PETICION_RESPONSE);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_SOL_PETICION,
                MailUtils.DATA_TITLE_SOL_RESPONSE,
                TEMPLATE_SOL_PETICION_RESPONSE,
                MailUtils.MAIL_FOOTER_PERMISOS);
        if (StringUtils.isBlank(message)) {
            return null;
        }
        String data = formatSolPeticionResponseData(listSolicitud);
        return message.replace(MailUtils.TAG_DATA_SOL_PETICION, data);
    }

    private String formatSolPeticionResponseData(List<SolicitudPeticion> listSolicitud) {
        StringBuilder sb = new StringBuilder();
        List<String> data = new ArrayList<>();
        for (SolicitudPeticion solicitud : listSolicitud) {
            data.clear();
            data.add(String.valueOf(solicitud.getId()));
            data.add(EnumUtils.getEstatusSolicitud(solicitud.getEstatus()));
            data.add(StringUtils.defaultIfBlank(solicitud.getComentarioAutorizador(), NOT_AVAILABLE));
            sb.append(MailUtils.getHTMLRow(data));
        }
        return sb.toString();
    }

    // **************************************************
    // Admin Peticiones
    // **************************************************
    public void enviarAdminPeticion(WrapPeticion wrapPeticion, Map<Long, Peticion> mapPeticionOld) {
        final String fechaRegistro = SDF_ADMIN_PETICION.format(new Date());
        String htmlMessage = getHtmlAdminPeticion(wrapPeticion, mapPeticionOld, fechaRegistro);
        if (StringUtils.isBlank(htmlMessage)) {
            final List<String> colData = Arrays.asList("ID", "", "Usuario Corporativo", "IP", "Region", "Transaccion", "PPM", "Ambiente", "Estatus", "ID Solicitud");
            final String data = formatAdminPeticion(mapPeticionOld, wrapPeticion.getListPeticion());
            StringBuilder sb = new StringBuilder();
            sb.append(MailUtils.HTML_P).append("Modificaciones en peticiones WS-M2k").append(MailUtils.HTML_P_CLOSE).append(MailUtils.HTML_BR);
            sb.append(MailUtils.HTML_P).append("Cambios Realizados").append(MailUtils.HTML_P_CLOSE).append(MailUtils.HTML_BR)
                    .append(MailUtils.getSimpleHTMLTable(colData, data));
            htmlMessage = sb.toString();
        }
        mailManager.sendMimeMail(MailUtils.MAIL_SUBJECT, htmlMessage);
        LOG.info("Correo enviado");
    }

    private String getHtmlAdminPeticion(WrapPeticion wrapPeticion, Map<Long, Peticion> mapPeticionOld, String fechaRegistro) {
        if (StringUtils.isBlank(TEMPLATE_ADMIN_PETICION)) {
            TEMPLATE_ADMIN_PETICION = CoreFunctions.getClassPathResourceAsString(MailUtils.MAIL_TEMPLATE_ADMIN_PETICION, true);
            if (StringUtils.isBlank(TEMPLATE_ADMIN_PETICION)) {
                LOG.error("Error al cargar el templado de correo: " + MailUtils.MAIL_TEMPLATE_ADMIN_PETICION);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(MailUtils.SUBJECT_TITLE_ADMIN_PETICION,
                MailUtils.DATA_TITLE_ADMIN_PETICION,
                TEMPLATE_ADMIN_PETICION,
                null);
        if (StringUtils.isBlank(message)) {
            return null;
        }
        Usuario usuario = wrapPeticion.getUsuario();
        String data = formatAdminPeticion(mapPeticionOld, wrapPeticion.getListPeticion());
        return message
                .replace(MailUtils.TAG_FECHA_REGISTRO, fechaRegistro)
                .replace(MailUtils.TAG_SOLICITUD_ID, String.valueOf(usuario.getId()))
                .replace(MailUtils.TAG_SOLICITANTE_NOMBRE, usuario.getNombreCompleto())
                .replace(MailUtils.TAG_SOLICITANTE_CORREO, usuario.getCorreo())
                .replace(MailUtils.TAG_URGENTE, wrapPeticion.isUrgente() ? "SI" : "NO")
                .replace(MailUtils.TAG_DATA_PETICION, data);
    }

    private String formatAdminPeticion(Map<Long, Peticion> mapPeticionOld, List<Peticion> listPeticion) {
        StringBuilder sb = new StringBuilder();
        final String tdSpan = "<td style=\"border-bottom: solid;\" rowspan=\"2\">";
        final String tdDash = "<td style=\"border-bottom: 1px dashed;\">";
        final String tdSolid = "<td style=\"border-bottom: solid;\">";
        for (Peticion petNew : listPeticion) {
            Peticion petOld;
            if (mapPeticionOld == null || (petOld = mapPeticionOld.get(petNew.getId())) == null) {
                sb.append(MailUtils.HTML_TR)
                        .append(tdSolid).append(String.valueOf(petNew.getId())).append(MailUtils.HTML_TD_CLOSE)
                        .append(tdSolid).append("Nuevo").append(MailUtils.HTML_TD_CLOSE)
                        .append(formatAdminPeticionRow(petNew, tdSolid))
                        .append(MailUtils.HTML_TR_CLOSE);
                continue;
            }
            sb.append(MailUtils.HTML_TR)
                    .append(tdSpan).append(String.valueOf(petOld.getId())).append(MailUtils.HTML_TD_CLOSE)
                    .append(tdDash).append("Antes").append(MailUtils.HTML_TD_CLOSE)
                    .append(formatAdminPeticionRow(petOld, tdDash))
                    .append(MailUtils.HTML_TR_CLOSE);
            sb.append(MailUtils.HTML_TR)
                    .append(tdSolid).append("Despues").append(MailUtils.HTML_TD_CLOSE)
                    .append(formatAdminPeticionRow(petNew, tdSolid))
                    .append(MailUtils.HTML_TR_CLOSE);
        }
        return sb.toString();
    }

    private String formatAdminPeticionRow(Peticion peticion, String td) {
        String idSolicitud = (peticion.getSolicitudPeticionId() != null ? String.valueOf(peticion.getSolicitudPeticionId()) : NOT_AVAILABLE);
        StringBuilder sb = new StringBuilder();
        sb
                .append(td).append(peticion.getUsuarioCorp()).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(peticion.getIp()).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(peticion.getRegion()).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(peticion.getTransaccion()).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(String.valueOf(peticion.getPeticionesPorMinuto())).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(EnumUtils.getAmbienteSolicitud(peticion.getAmbiente())).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(EnumUtils.getEstatusSolicitud(peticion.getEstatus())).append(MailUtils.HTML_TD_CLOSE)
                .append(td).append(idSolicitud).append(MailUtils.HTML_TD_CLOSE);
        return sb.toString();
    }
}
