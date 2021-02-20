package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.mail;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch.PetitionStatus;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util.FormaterDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.lang.StringUtils;


/**
 *
 * @author bermudezja
 */
@Service
public class ReporteTemplet {
    
    private static final Logger LOG = LoggerFactory.getLogger(ReporteTemplet.class);
    
    private static final String HTML_H4 = "<h4>";
    private static final String HTML_H4_CLOSE = "</h4>";
    private static final String HTML_TR = "<tr style=\"text-align: center;>\" ";
    private static final String HTML_TR_CLOSE = "</tr>";
    private static final String NOMBRE_ARCHIVO = "ReporteWS-M2K_";
    private static final String FORMATO = ".xls";
    private static String HTML_TEMPLATE;
    // Correos temporales
    private static final String MAIL_ADMIN1="antonio.bermudez@mail.telcel.com";
    private static final String MAIL_ADMIN2="daniel.bermudez@mail.telcel.com";
   
    @Autowired
    private FormaterDate formato;
    
    @Autowired
    private PetitionStatus  status;
    
    @Autowired
    private MailManager mailManagerMain;
    
   
    public void enviarHtml(EstatusFront frontPeticion, int select, String mensaje, byte[] file) {
        
        StringBuilder sbText = new StringBuilder(); 
        String archivoXls=NOMBRE_ARCHIVO+frontPeticion.getTelefonoFront()+FORMATO;
        
        try {    
            String htmlFormat = formatoMensajeHtml(frontPeticion);
            if (htmlFormat == null || htmlFormat.trim().isEmpty()) {
                htmlFormat = sbText.toString();
            }
            
            
            String htmlTemplate = getHtmlTemplate(htmlFormat,frontPeticion,mensaje);
            if (StringUtils.isBlank(htmlTemplate)) {
               LOG.error("EL TEMPLATE NO CONTIENE INFORMACION");
            }
            
            
            if(file==null){
                mailManagerMain.sendMimeMail(null,frontPeticion.getCorreoUsuario()+","+MAIL_ADMIN1+
                                                                                   ","+MAIL_ADMIN2
                                                                             ,Constants.MAIL_SUBJECT
                                                                                    ,htmlTemplate);
            }else{ 
                mailManagerMain.sendMimeMailAttachment(null,frontPeticion.getCorreoUsuario()+
                                                                                    ","+MAIL_ADMIN1+
                                                                                    ","+MAIL_ADMIN2
                                                                              ,Constants.MAIL_SUBJECT
                                                                                      , htmlTemplate
                                                                                         ,archivoXls
                                                                                              ,file);
            }
            
            LOG.info("SE ENVIO CORREO AL DESTINATARIO:  "+ frontPeticion.getCorreoUsuario());
                 
        } catch (Exception ex) {
            LOG.error("ERROR AL CARGAR LA PLANTILLA HTML", ex);
            status.changeStatus(frontPeticion,1);
            status.updateDateEjec(frontPeticion,-1);
        }
    }
    
    private String getHtmlTemplate(String htmlMessage,EstatusFront frontPeticion, String messengeInfo) {
             
        if (HTML_TEMPLATE == null) {
            HTML_TEMPLATE = CoreFunctions.getClassPathResourceAsString(Constants.MAIL_TEMPLATE, true);
            if (HTML_TEMPLATE == null) {
                return null;
            }
        }
        
        String message = CoreFunctions.getMailTemplate(Constants.HTML_SUBJECT_TITLE,messengeInfo,
                                                                                    HTML_TEMPLATE,
                                                                                            null);
        if (message == null) {
            return null;
        }

        return message.replace(Constants.HTML_DATOS_PETICION, htmlMessage)
                       .replace(Constants.FOLIO, frontPeticion.getFolioFront().toString() != null 
                                                ?frontPeticion.getFolioFront().toString() : "N/A");
                      
    }

    private String formatoMensajeHtml(EstatusFront frontPeticion) {
        
        StringBuilder sbHtml = new StringBuilder();
        
          sbHtml.append(HTML_TR);
          sbHtml.append(HTML_H4).append("Teléfono: ").append(frontPeticion.getTelefonoFront()).append(HTML_H4_CLOSE);
          sbHtml.append(HTML_H4).append("Fecha: ").append(formato.formatDateString(frontPeticion.getFechaInicioFront())).append(HTML_H4_CLOSE);
          sbHtml.append(HTML_H4).append("Hora Inicio: ").append(formato.formatStringDate(frontPeticion.getHoraInicioFront())).append(HTML_H4_CLOSE);
          sbHtml.append(HTML_H4).append("Hora Final: ").append(formato.formatStringDate(frontPeticion.getHoraFinalFront())).append(HTML_H4_CLOSE);
          
          if (frontPeticion.getIpFront()!=null) sbHtml.append(HTML_H4).append("Ip: ").append(frontPeticion.getIpFront()).append(HTML_H4_CLOSE);
          if (frontPeticion.getUsuarioFront()!=null) sbHtml.append(HTML_H4).append("Usuario :").append(frontPeticion.getUsuarioFront()).append(HTML_H4_CLOSE);
          if (frontPeticion.getTransaccionFront()!=null)sbHtml.append(HTML_H4).append("Servicio :").append(frontPeticion.getTransaccionFront()).append(HTML_H4_CLOSE);
          if (frontPeticion.getRegionFront()!=null) sbHtml.append(HTML_H4).append("Región :").append(frontPeticion.getRegionFront()).append(HTML_H4_CLOSE);
          sbHtml.append(HTML_TR_CLOSE);
        
          return sbHtml.toString();
      
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
 public void enviarHtmlExeption(EstatusFront frontPeticion, String mensaje ) {
         
        StringBuilder sbText = new StringBuilder();
       
        try {    
            String htmlFormatExeption = MensajeHtmlExeption( mensaje);
            if (htmlFormatExeption == null || htmlFormatExeption.trim().isEmpty()) {
                htmlFormatExeption = sbText.toString();
            }  

            
            String htmlTemplateException = getHtmlTemplateExeption(htmlFormatExeption,frontPeticion);
            if (StringUtils.isBlank(htmlTemplateException)) {
               LOG.error("EL TEMPLATE NO CONTIENE INFORMACION");
            }
            mailManagerMain.sendMimeMail(null,frontPeticion.getCorreoUsuario()+","+MAIL_ADMIN1+
                                                                                ","+MAIL_ADMIN2
                                                                ,Constants.MAIL_SUBJECT_EXEPTION
                                                                                ,htmlTemplateException);
           
        } catch (Exception ex) {
            LOG.error("ERROR AL CARGAR LA PLANTILLA HTML EXEPTION", ex);
        }
    }

   
        

    private String MensajeHtmlExeption(String exeption) {
      
        StringBuilder sbHtml = new StringBuilder();
        
          sbHtml.append(HTML_TR);
          sbHtml.append(HTML_H4).append("Error: ").append(exeption).append(HTML_H4_CLOSE);
          sbHtml.append(HTML_TR_CLOSE);
        
          return sbHtml.toString();
        }
    
    
     private String getHtmlTemplateExeption(String htmlMessage,EstatusFront frontPeticion) {
        
          
        if (HTML_TEMPLATE == null) {
            HTML_TEMPLATE= CoreFunctions.getClassPathResourceAsString(Constants.MAIL_TEMPLATE , true);
            if (HTML_TEMPLATE == null) {
                return null;
            }
        }
        
        String message = CoreFunctions.getMailTemplate(Constants.HTML_SUBJECT_TITLE,
                                                        Constants.MESSAGE_EXCEPTION,
                                                                      HTML_TEMPLATE,
                                                                               null);
        if (message == null) {
            return null;
        }

        return message.replace(Constants.HTML_DATOS_PETICION, htmlMessage)
                       .replace(Constants.FOLIO, frontPeticion.getFolioFront().toString());
                      
    }
}

    


