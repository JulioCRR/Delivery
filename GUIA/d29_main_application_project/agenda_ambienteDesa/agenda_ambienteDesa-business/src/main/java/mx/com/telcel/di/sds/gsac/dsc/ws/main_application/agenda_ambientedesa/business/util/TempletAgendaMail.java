package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.AgendaDao;
import org.springframework.core.io.Resource;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosIp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosTrans;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class TempletAgendaMail {

    private static final Logger LOG = LoggerFactory.getLogger(TempletAgendaMail.class);

    private static final String HTML_BR = "<br>";

    private static String HTML_TEMPLATE;

    @Value(value = "classpath:agenda_ambienteDesa/datosAgenda.html")
    private Resource htmlTemplate;

    @Autowired
    private MailManager mailManagerMain;

    @Autowired
    private FormaterDateAgenda formato;

    @Lazy
    @Autowired
    private AgendaDao agenda;

    public void enviarHtml(SolicitudAmbiente solicitud) {

        StringBuilder sbText = new StringBuilder();

        try {
            String htmlFormat = formatoMensajeHtml1(solicitud);///
            if (htmlFormat == null || htmlFormat.trim().isEmpty()) {
                htmlFormat = sbText.toString();
            }

            String htmlTemplate = getHtmlTemplate(htmlFormat);
            if (StringUtils.isBlank(htmlTemplate)) {
                LOG.error("EL TEMPLATE NO CONTIENE INFORMACION");
            }
            
            LOG.info("CORREO DEL USUARIO:  " + solicitud.getUserMail());
            
            if (solicitud.getUserMail() == null){
                Usuario usuario=agenda.getUsuarioDetalle(solicitud.getUser());
                String mail=usuario.getCorreo();
                LOG.info("USUARIO: "+solicitud.getUser() + " CORREO :"+ mail );
                solicitud.setUserMail(mail);
            }

            mailManagerMain.sendMimeMail(null, solicitud.getUserMail(), Constants.MAIL_SUBJECT, htmlTemplate);

            LOG.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SE ENVIO CORREO AL DESTINATARIO:  " + solicitud.getUserMail());

        } catch (Exception ex) {
            LOG.error("ERROR AL CARGAR LA PLANTILLA HTML", ex);

        }
    }

    private String getHtmlTemplate(String htmlMessage) {

        if (HTML_TEMPLATE == null) {
            HTML_TEMPLATE = CoreFunctions.getClassPathResourceAsString(Constants.MAIL_TEMPLATE_AGENDA, true);
            if (HTML_TEMPLATE == null) {
                return null;
            }
        }

        String message = CoreFunctions.getMailTemplate(Constants.HTML_SUBJECT_TITLE, Constants.MSJ_DETALLE,
                HTML_TEMPLATE,
                null);
        if (message == null) {
            return null;
        }

        return message.replace(Constants.HTML_DATOS_PETICION, htmlMessage);
    }

    private String getTableTrans(SolicitudAmbiente solicitud) {

        StringBuilder sbHtml = new StringBuilder();
        List<PermisosTrans> listaTrans = Arrays.asList(solicitud.getPermisosTrans());
        for (PermisosTrans t : listaTrans) {
            sbHtml.append(t.getTransaccion()).append(HTML_BR);

        }

        return sbHtml.toString();
    }

    private String getTableIp(SolicitudAmbiente solicitud) {

        StringBuilder sbHtml = new StringBuilder();
        List<PermisosIp> listaIp = Arrays.asList(solicitud.getPermisosIp());

        for (PermisosIp p : listaIp) {
            sbHtml.append(p.getIp()).append(HTML_BR);

        }

        return sbHtml.toString();
    }

    private String formatoMensajeHtml1(SolicitudAmbiente solicitud) {

        StringBuilder sb = new StringBuilder();
        BufferedReader reader = null;
        Map<String, String> template = new HashMap<>();
        template.put(Constants.PROYECTO, solicitud.getNomProyect());
        template.put(Constants.USUARIO, solicitud.getUsuario());
        template.put(Constants.FECHA_INICIO, formato.formatDateLess(solicitud.getFechaInicio()));
        template.put(Constants.FECHA_FINAL, formato.formatDateLess(solicitud.getFechaFinal()));
        template.put(Constants.COMENTARIOS, solicitud.getComentarios());
        template.put(Constants.TRANSACCIONES, getTableTrans(solicitud));
        template.put(Constants.IPS, getTableIp(solicitud));
        template.put(Constants.URL_DESA, Constants.ENDPOINT_DESA);
        template.put(Constants.SOPORTE, Constants.POLITICA);
        try {
            reader = new BufferedReader(new InputStreamReader(htmlTemplate.getInputStream(), Constants.ENCODING));
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append(System.lineSeparator());
            }
            reader.close();
            String message = sb.toString();
            for (Map.Entry<String, String> entry : template.entrySet()) {
                message = message.replace(entry.getKey().trim(), entry.getValue().trim());
            }
            return message;
        } catch (IOException ex) {
            LOG.error("No se pudo obtener archivo de templado", ex);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException ex) {
                    LOG.error("No se pudo cerrar el reader", ex);
                }
            }
        }
        return null;
    }

}
