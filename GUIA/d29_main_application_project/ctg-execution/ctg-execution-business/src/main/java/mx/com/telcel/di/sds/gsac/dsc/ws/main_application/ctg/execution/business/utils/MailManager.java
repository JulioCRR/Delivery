/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira<cesar.lechuga@mail.telcel.com>
 */
@Service
public class MailManager {
    
    private static final Logger LOG = LoggerFactory.getLogger(MailManager.class);
    private final String SUBJECT_SOLICITUD = "SOLICITUD DE AMBIENTE PRODUCTIVO CTG.";
    private final String SUBJECT_RESPUESTA = "RESPUESTA A SOLICITUD DE AMBIENTE PRODUCTIVO CTG.";
   
    private String SMTP_SERVER = "";
    private String SMTP_SERVER_PORT = "";
    private String TELCEL_USR = "";
    private String TELCEL_PWD = "";
    
    private final Properties props = new Properties();
    
    private void loadMailServer() {
        props.put(String.valueOf("mail.smtp.host"), SMTP_SERVER);
        props.put(String.valueOf("mail.smtp.user"), TELCEL_USR);
        props.put(String.valueOf("mail.smtp.port"), SMTP_SERVER_PORT);
        props.put(String.valueOf("mail.smtp.auth"), "false");
    }
    
    public void sendMail(Map<String, Object> propiedades) {

        try {
            
            if (propiedades == null || propiedades.isEmpty()) {
                throw new Exception("NO SE PUEDE ENVIAR UN CORREO CON PROPIEDADES VACIAS.");
            }
            
            String receptor = null;
            String tipoEnvio = null;
            String urlArchivo = null;
            Map<String, String> templateProps = null;
            
            if (propiedades.containsKey(EClaves.SMTP_SERVER.getClave())) {
                this.SMTP_SERVER = propiedades.get(EClaves.SMTP_SERVER.getClave()).toString();
            } else {
                throw new IllegalStateException("NO SE PUEDE ENVIAR CORREO SIN SERVIDOR SMTP.");
            }
            
            if (propiedades.containsKey(EClaves.SMTP_SERVER_PORT.getClave())) {
                this.SMTP_SERVER_PORT = propiedades.get(EClaves.SMTP_SERVER_PORT.getClave()).toString();
            } else {
                throw new Exception("NO SE PUEDE ENVIAR CORREO SIN PUERTO DEL SERVIDOR SMTP.");
            }
            
            if (propiedades.containsKey(EClaves.MAIL_SENDER_USR.getClave())) {
                this.TELCEL_USR = propiedades.get(EClaves.MAIL_SENDER_USR.getClave()).toString();
            } else {
                throw new IllegalStateException("NO SE PUEDE ENVIAR CORREO SIN USUARIO.");
            }
            
            if (propiedades.containsKey(EClaves.MAIL_SENDER_PWD.getClave())) {
                this.TELCEL_PWD = propiedades.get(EClaves.MAIL_SENDER_PWD.getClave()).toString();
            } else {
                throw new Exception("NO SE PUEDE ENVIAR CORREO SIN PUERTO DEL SERVIDOR SMTP.");
            }
            
            if (propiedades.containsKey(EClaves.CORREO_RECEPTOR.getClave())) {
                receptor = propiedades.get(EClaves.CORREO_RECEPTOR.getClave()).toString();
            } else {
                throw new Exception("No se puede enviar correo sin RECEPTOR.");
            }
            
            if (propiedades.containsKey(EClaves.TIPO_ENVIO.getClave())) {
                tipoEnvio = propiedades.get(EClaves.TIPO_ENVIO.getClave()).toString();
            } else {
                throw new Exception("No se puede enviar correo sin TIPO DE ENVIO.");
            }
            
            if (propiedades.containsKey(EClaves.DIRECCION_URL_TEMPLATE.getClave())) {
                urlArchivo = propiedades.get(EClaves.DIRECCION_URL_TEMPLATE.getClave()).toString();
            } else {
                throw new Exception("No se puede enviar correo sin URL DEL TEMPLATE.");
            }
            
            if (propiedades.containsKey(EClaves.TEMPLATE_PROPERTIES.getClave())) {
                templateProps = (Map<String, String>) propiedades.get(EClaves.TEMPLATE_PROPERTIES.getClave());
            } else {
                throw new Exception("No se puede enviar correo sin PROPIEDADES.");
            }
            
            LOG.info("Datos de Envio de EMAIL");
            LOG.info("SMTP SERVER: " + this.SMTP_SERVER);
            LOG.info("SMTP SERVER PORT: " + this.SMTP_SERVER_PORT);
            LOG.info("MAIL USUARIO: " + this.TELCEL_USR);
            LOG.info("MAIL RECEPTOR: " + receptor);
            
            this.loadMailServer();
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            
            message.setFrom(new InternetAddress(TELCEL_USR));
            message.addRecipient(Message.RecipientType.TO,new InternetAddress(receptor));
            message.setSubject(tipoEnvio!=null&&tipoEnvio.equals("SOL")?SUBJECT_SOLICITUD:SUBJECT_RESPUESTA);
            MimeMultipart multipart = new MimeMultipart();
            BodyPart messageBodyPart = new MimeBodyPart();
            
            //HTML mail content
            String htmlText = readEmailFromHtml(urlArchivo,templateProps);
            messageBodyPart.setContent(htmlText, "text/html;  charset=utf-8");
            
            multipart.addBodyPart(messageBodyPart); 
            message.setContent(multipart);
 
            //Conect to smtp server and send Email
            Transport transport = session.getTransport("smtp");
            transport.connect(SMTP_SERVER, TELCEL_USR, TELCEL_PWD);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            
            LOG.info("Mail sent successfully..."); 
         
        } catch (MessagingException ex) {
            LOG.error("ERROR EN EL PROCESO DE ENVIO DE CORREO: ", ex);    
        } catch(Exception e) {
            LOG.error("ERROR AL ENVIAR EL EMAIL", e);
        }
    }
    
    //Method to replace the values for keys
    private String readEmailFromHtml(String filePath, Map<String, String> input) {
        
        String msg = readContentFromFile(filePath);
        
        try {
            
            Set<Entry<String, String>> entries = input.entrySet();
            
            for(Map.Entry<String, String> entry : entries) {
                msg = msg.replace(entry.getKey().trim(), entry.getValue().trim());
            }
            
        } catch(Exception e){
            LOG.error("ERROR AL PROCESAR EMAIL: ", e);
        }
        
        return msg;
    }

    //Method to read HTML file as a String 
    @SuppressWarnings("ConvertToTryWithResources")
    private String readContentFromFile(String fileName) {
        
        StringBuilder contents = new StringBuilder();
        BufferedReader reader = null;
        
        try {

            if (fileName.startsWith("http")) {
                URL url = new URL(fileName);
                InputStream is = url.openStream();
                reader =  new BufferedReader(new InputStreamReader(is, "UTF-8"));
            } else {
                reader =  new BufferedReader(new FileReader(fileName));
            }
            
          String line = null; 
          
          try {  
            while (( line = reader.readLine()) != null){
              contents.append(line);
              contents.append(System.getProperty("line.separator"));
            }
          } catch(Exception ex1) {
              LOG.error("Error al leer la linea [" + line + "]", ex1);
          } finally {
              reader.close();
          }
        }
        catch (IOException ex){
          LOG.error("ERROR AL OBTENER EL ARCHIVO: ", ex);
        }
        
        return contents.toString();
    }
    
    
}
