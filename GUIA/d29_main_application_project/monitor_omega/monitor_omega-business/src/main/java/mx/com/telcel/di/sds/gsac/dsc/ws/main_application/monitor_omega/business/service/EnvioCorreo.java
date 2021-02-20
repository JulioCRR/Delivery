package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service;

import java.text.SimpleDateFormat;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common.DBUtils;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.Cics;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.CicsThread;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXI3
 */
@Service
public class EnvioCorreo {

    private static final Logger LOG = LoggerFactory.getLogger(EnvioCorreo.class);
    private static final String MAIL_SUBJECT = "Alerta Monitor Omega";
    private static final String FILE_NAME_PREF = "MonitorOmega_";
    private static final String FILE_NAME_EXT = ".txt";
    private static final String ENCODING = "UTF-8";
    private static final String HTML_BR = "<br>";
    private static final String HTML_TR = "<tr>";
    private static final String HTML_TR_CLOSE = "</tr>";
    private static final String HTML_TD = "<td>";
    private static final String HTML_TD_STYLED = "<td style=\"text-align: center;\">";
    private static final String HTML_TD_CLOSE = "</td>";
    private static final String NEW_LINE = "\r\n";
    private static final String TAB = StringUtils.repeat(" ", 4);
    private static final String FILE_BREAK = StringUtils.repeat("=", 50) + NEW_LINE;
    private static final String NULL_DATA = "-";
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    private static final SimpleDateFormat DATE_FORMAT_FILE = new SimpleDateFormat("yyyyMMddHHmmss");
    private static String HTML_TEMPLATE;
    private static String HTML_TEMPLATE_ERROR;

    @Autowired
    private MailManager mailManager;

    public void enviar(OmegaData omegaData, int alertCount) {
        String updated = DATE_FORMAT.format(omegaData.getFechaUpdate());
        String fileName = FILE_NAME_PREF + DATE_FORMAT_FILE.format(omegaData.getFechaUpdate()) + FILE_NAME_EXT;
        StringBuilder sbFile = new StringBuilder();
        StringBuilder sbHtml = new StringBuilder();
        try {
            sbFile.append(FILE_BREAK)
                    .append("Alertas Omega - ").append(updated).append(NEW_LINE)
                    .append(FILE_BREAK)
                    .append(NEW_LINE);
            sbFile.append(fileHeader("Alertas CICS")).append(NEW_LINE);
            formatCicsData(omegaData.getListCics(), sbFile, sbHtml);
            sbFile.append(fileHeader("Alertas Procesos")).append(NEW_LINE);
            formatThreadData(omegaData.getListCicsThread(), sbFile, sbHtml);
            sbFile.append(fileHeader("Pantallas Mobile2000")).append(NEW_LINE);
            formatDisplayData(omegaData.getListDisplay(), sbFile);
            String htmlMessage = getHtmlTemplate(sbHtml, alertCount, updated);
            if (StringUtils.isBlank(htmlMessage)) {
                htmlMessage = "<p>" + sbFile.toString().replace(NEW_LINE, HTML_BR) + "</p>";
            }

            mailManager.sendMimeMailAttachment(
                    getMailRecipients(UtilMonitorOmega.getPropiedadesMonitorOmega().getCorreosAlerta()),
                    MAIL_SUBJECT,
                    htmlMessage,
                    fileName,
                    sbFile.toString().getBytes(ENCODING));
            LOG.warn("Correo de alerta enviado correctamente");
        } catch (Exception ex) {
            LOG.error("Error al enviar el correo de alerta", ex);
        }
    }

    public void enviarError(int reintentos, List<String> listErrors) {
        String data = formatTextMessageError(listErrors);
        String htmlMessage = getHtmlTemplateError(reintentos, data);
        if (StringUtils.isBlank(htmlMessage)) {
            StringBuilder sb = new StringBuilder();
            for (String split : data.split(HTML_TR_CLOSE)) {
                split = split.replace(HTML_TR, "")
                        .replace(HTML_TD_STYLED, "Reintento:" + TAB)
                        .replace(HTML_TD, "Mensaje Error:" + TAB)
                        .replace(HTML_TD_CLOSE, "")
                        .replace(HTML_TR_CLOSE, "");
                sb.append(split).append(HTML_BR);
            }

            htmlMessage = Constants.HTML_SUBJECT_TITLE_ERROR + HTML_BR
                    + Constants.HTML_DATA_TITLE_ERROR.replace(
                            Constants.HTML_TOTAL_ALERTAS, String.valueOf(reintentos)) + HTML_BR
                    + sb.toString();
        }
        mailManager.sendMimeMail(
                getMailRecipients(UtilMonitorOmega.getPropiedadesMonitorOmega().getCorreosAlertaError()),
                MAIL_SUBJECT,
                htmlMessage);
    }

    private void formatCicsData(List<Cics> listCics, StringBuilder sbFile, StringBuilder sbHtml) {
        String prefix = "";
        for (Cics cics : listCics) {
            if (cics.isAlertRaised()) {
                formatHtmlTableRow(cics.getJobName(), null, null, null, cics.getTotalCpu(), null, null, sbHtml);
                sbFile.append(prefix)
                        .append("Jobname: ").append(cics.getJobName()).append(NEW_LINE)
                        .append("Total CPU").append(cics.getTotalCpu()).append(NEW_LINE);
                prefix = NEW_LINE;
            }
        }
        sbFile.append(NEW_LINE);
    }

    private void formatThreadData(List<CicsThread> listThread, StringBuilder sbFile, StringBuilder sbHtml) {
        String prefix = "";
        for (CicsThread cicsThread : listThread) {
            if (cicsThread.isAlertRaised()) {
                formatHtmlTableRow(
                        cicsThread.getJobName(),
                        cicsThread.getPantallaM2k(),
                        cicsThread.getTransaccion(),
                        cicsThread.getRegion(),
                        cicsThread.getCpu(),
                        cicsThread.getStatus(),
                        cicsThread.getElapsed(),
                        sbHtml);
                sbFile.append(prefix)
                        .append("Tran: ").append(cicsThread.getTran()).append(NEW_LINE)
                        .append("Jobname: ").append(cicsThread.getJobName()).append(NEW_LINE)
                        .append("Planname: ").append(cicsThread.getPlanName()).append(NEW_LINE)
                        .append("Elapsed: ").append(cicsThread.getElapsed()).append(NEW_LINE)
                        .append("CPU: ").append(cicsThread.getCpu()).append(NEW_LINE)
                        .append("Status: ").append(cicsThread.getStatus()).append(NEW_LINE)
                        .append("[Pantalla: ").append(cicsThread.getPantallaM2k()).append("]").append(NEW_LINE)
                        .append("[Region: ").append(cicsThread.getRegion()).append("]").append(NEW_LINE);
                prefix = NEW_LINE;
            }
        }
        sbFile.append(NEW_LINE);
    }

    private void formatDisplayData(List<char[]> listDisplay, StringBuilder sbFile) {
        String prefix = "";
        for (char[] display : listDisplay) {
            sbFile.append(prefix).append(DBUtils.getDisplayFormatted(display)).append(NEW_LINE);
            prefix = NEW_LINE;
        }
        sbFile.append(NEW_LINE);
    }

    private void formatHtmlTableRow(String jobName, String pantallaM2k, String transaccion, String region, String cpu, String status, String elapsedTime, StringBuilder sbHtml) {
        pantallaM2k = StringUtils.rightPad(StringUtils.defaultIfEmpty(pantallaM2k, StringUtils.repeat(NULL_DATA, 7)), 7);
        transaccion = StringUtils.defaultIfEmpty(transaccion, StringUtils.repeat(NULL_DATA, 4));
        region = StringUtils.defaultIfEmpty(region, StringUtils.repeat(NULL_DATA, 3));
        status = StringUtils.rightPad(StringUtils.defaultIfEmpty(status, StringUtils.repeat(NULL_DATA, 12)), 12);
        elapsedTime = StringUtils.rightPad(StringUtils.defaultIfEmpty(elapsedTime, StringUtils.repeat(NULL_DATA, 11)), 11);
        sbHtml.append(HTML_TR)
                .append(HTML_TD).append(jobName).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(pantallaM2k).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(transaccion).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(region).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(cpu).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(status).append(HTML_TD_CLOSE)
                .append(HTML_TD).append(elapsedTime).append(HTML_TD_CLOSE)
                .append(HTML_TR_CLOSE);
    }

    private String formatTextMessageError(List<String> listErrors) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < listErrors.size(); i++) {
            sb.append(HTML_TR);
            sb.append(HTML_TD_STYLED).append(i + 1).append(HTML_TD_CLOSE);
            sb.append(HTML_TD).append(listErrors.get(i)).append(HTML_TD_CLOSE);
            sb.append(HTML_TR_CLOSE);
        }
        return sb.toString();
    }

    private String getHtmlTemplate(StringBuilder sbHtml, int alertCount, String updated) {
        if (HTML_TEMPLATE == null) {
            HTML_TEMPLATE = CoreFunctions.getClassPathResourceAsString(Constants.MAIL_TEMPLATE, true);
            if (HTML_TEMPLATE == null) {
                LOG.error("Error al cargar el templado de correo: " + Constants.MAIL_TEMPLATE);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(
                Constants.HTML_SUBJECT_TITLE,
                Constants.HTML_DATA_TITLE,
                HTML_TEMPLATE,
                null);
        if (message == null) {
            return null;
        }

        return message.replace(Constants.HTML_TOTAL_ALERTAS, String.valueOf(alertCount))
                .replace(Constants.HTML_FECHA_EVENTO, updated)
                .replace(Constants.HTML_DATOS_CICS, sbHtml.toString());
    }

    private String getHtmlTemplateError(int reintentos, String data) {
        if (HTML_TEMPLATE_ERROR == null) {
            HTML_TEMPLATE_ERROR = CoreFunctions.getClassPathResourceAsString(Constants.MAIL_TEMPLATE_ERROR, true);
            if (HTML_TEMPLATE_ERROR == null) {
                LOG.error("Error al cargar el templado de correo: " + Constants.MAIL_TEMPLATE_ERROR);
                return null;
            }
        }
        String message = CoreFunctions.getMailTemplate(
                Constants.HTML_SUBJECT_TITLE_ERROR,
                Constants.HTML_DATA_TITLE_ERROR.replace(Constants.HTML_TOTAL_ALERTAS, String.valueOf(reintentos)),
                HTML_TEMPLATE_ERROR,
                null);
        if (message == null) {
            return null;
        }

        return message.replace(Constants.HTML_DATOS_CICS, data);
    }

    private String getMailRecipients(String recipients) {
        String mailTo = mailManager.getMailTo();
        if (!StringUtils.isBlank(recipients)) {
            mailTo += "," + recipients;
        }
        return mailTo;
    }

    private String fileHeader(String text) {
        return StringUtils.repeat("=", 25) + NEW_LINE + text + NEW_LINE + StringUtils.repeat("=", 25) + NEW_LINE;
    }
}
