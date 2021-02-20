/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.MailProperties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.EClaves;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Component
public class NotificationService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationService.class);
    
    @Autowired
    MailProperties mail;
    
    @Autowired
    MailManager mailManager;
    
    public void notificarSolicitudAmbiente(D29SolicitudAmbienteCtg solicitud) throws Exception {
    
        if (solicitud == null) {
            throw new IllegalStateException("No se puede procesar la solicitud de envio de correo.");
        }
        
        Map<String, Object> propiedades = new HashMap<String, Object>();
        Map<String, String> template = new HashMap<String, String>();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        
        template.put("#BG_PRINCIPAL", mail!=null?mail.getTemplateBackground():"");
        template.put("#TELCEL_LOGO", mail!=null?mail.getTemplateTelcelLogo():"");
        template.put("#FOLIO", solicitud.getFolio());
        template.put("#SOLICITANTE", solicitud.getSolicitante().getNombre() + " " + solicitud.getSolicitante().getAPaterno() + " " + solicitud.getSolicitante().getAMaterno());
        template.put("#PROGRAMA", solicitud.getPrograma());
        template.put("#TRANSACCION", solicitud.getTransaccion());
        template.put("#PROY_ASOCIADO", solicitud.getProyectoAsociado()!=null?solicitud.getProyectoAsociado():"SIN DEFINIR");
        template.put("#FECHA_SOLICITUD", sdf.format(solicitud.getFechaSolicitud()));
        template.put("#HORA_INICIO", solicitud.getHoraInicio());
        template.put("#HORA_FIN", solicitud.getHoraFin());
        template.put("#URL_WSM2K_TOOLS", mail!=null?mail.getTemplateSolicitudUrl():"");
        
        propiedades.put(EClaves.SMTP_SERVER.getClave(), mail!=null?mail.getSmtpServer():"");
        propiedades.put(EClaves.SMTP_SERVER_PORT.getClave(), mail!=null?mail.getSmtpPort():"");
        propiedades.put(EClaves.MAIL_SENDER_USR.getClave(), mail!=null?mail.getMailUsr():"");
        propiedades.put(EClaves.MAIL_SENDER_PWD.getClave(), mail!=null?mail.getMailPwd():"");
        propiedades.put(EClaves.CORREO_RECEPTOR.getClave(), solicitud.getResponsableAutorizacion()!=null?solicitud.getResponsableAutorizacion().getCorreo():null);
        propiedades.put(EClaves.TIPO_ENVIO.getClave(), "SOL");
        propiedades.put(EClaves.DIRECCION_URL_TEMPLATE.getClave(), mail!=null?mail.getMailTemplateSolicitudUrl():"");
        propiedades.put(EClaves.TEMPLATE_PROPERTIES.getClave(), template);
        
        mailManager.sendMail(propiedades);
    }
    
    
    public void notificarRespuesrtaAmbiente(List<D29SolicitudAmbienteCtg> solicitudes) throws Exception {
    
        if (solicitudes == null || solicitudes.isEmpty()) {
            throw new IllegalStateException("No se puede procesar la solicitud de envio de correo.");
        }
        
        for (D29SolicitudAmbienteCtg solicitud: solicitudes) {
            
            try {
                
                Map<String, Object> propiedades = new HashMap<String, Object>();
                Map<String, String> template = new HashMap<String, String>();
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

                template.put("#BG_PRINCIPAL", mail!=null?mail.getTemplateBackground():"");
                template.put("#TELCEL_LOGO", mail!=null?mail.getTemplateTelcelLogo():"");
                
                if (solicitud.getEstatus().equals("ACT")) {
                    template.put("#ESTATUS", "APROBADA");
                } else if (solicitud.getEstatus().equals("REC")) {
                    template.put("#ESTATUS", "RECHAZADA");
                } else if (solicitud.getEstatus().equals("CAN")) {
                    template.put("#ESTATUS", "CANCELADA");
                }
                
                template.put("#FOLIO", solicitud.getFolio());
                template.put("#URL_WSM2K_TOOLS", mail!=null?mail.getTemplateSolicitudUrl():"");

                propiedades.put(EClaves.SMTP_SERVER.getClave(), mail!=null?mail.getSmtpServer():"");
                propiedades.put(EClaves.SMTP_SERVER_PORT.getClave(), mail!=null?mail.getSmtpPort():"");
                propiedades.put(EClaves.MAIL_SENDER_USR.getClave(), mail!=null?mail.getMailUsr():"");
                propiedades.put(EClaves.MAIL_SENDER_PWD.getClave(), mail!=null?mail.getMailPwd():"");
                propiedades.put(EClaves.CORREO_RECEPTOR.getClave(), solicitud.getSolicitante()!=null?solicitud.getSolicitante().getCorreo():null);
                propiedades.put(EClaves.TIPO_ENVIO.getClave(), "RESP");
                propiedades.put(EClaves.DIRECCION_URL_TEMPLATE.getClave(), mail!=null?mail.getMailTemplateRespuestaUrl():"");
                propiedades.put(EClaves.TEMPLATE_PROPERTIES.getClave(), template);

                mailManager.sendMail(propiedades);
                
            } catch(Exception e){
                LOGGER.error("ERROR AL NOTIFICAR RESPUESTA: ", e);
            }
        
        }
        
    }
    
}
