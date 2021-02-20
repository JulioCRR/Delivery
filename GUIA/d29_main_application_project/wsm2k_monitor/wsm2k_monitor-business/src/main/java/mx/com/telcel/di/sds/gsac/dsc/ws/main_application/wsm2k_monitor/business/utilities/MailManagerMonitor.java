package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class MailManagerMonitor {

    private JavaMailSenderImpl mailSender;
    
    private boolean instansiasOnOff=true;

    private static final Logger LOG = LoggerFactory.getLogger(MailManagerMonitor.class);   

    public void sendMail(String from, String to, String subject, String msg) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to.split(",")); //los destinatarios que carga del pom los separa por comas
            message.setSubject(subject);
            message.setText(msg);
            mailSender.send(message);
        } catch (Exception e) {
            LOG.error("error al enviar correo:", e);
        }
    }

    public void sendMimeMail(String from, String to, String subject, String msg) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress(from));
            message.addRecipients(Message.RecipientType.TO, parseToAddress(to.split(",")));
            message.setSubject(subject);
            message.setContent(msg, "text/html");
            mailSender.send(message);
        } catch (AddressException e) {

            LOG.error("error al enviar correo:", e);
        } catch (MessagingException e) {

            LOG.error("error al enviar correo:", e);
        }
    }

    public synchronized void sendMimeMailSync(String from, String to, String subject, String msg) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress(from));
            message.addRecipients(Message.RecipientType.TO, parseToAddress(to.split(",")));
            message.setSubject(subject);
            message.setContent(msg, "text/html");
            if(instansiasOnOff){
              mailSender.send(message);
            }
        } catch (AddressException e) {
            LOG.error("error al enviar correo:", e);
        } catch (MessagingException e) {
            LOG.error("error al enviar correo:", e);
        }
    }

    public Address[] parseToAddress(String[] destinatarios) {
        InternetAddress[] address = new InternetAddress[destinatarios.length];
        for (int i = 0; i < destinatarios.length; i++) {
            try {
                address[i] = new InternetAddress(destinatarios[i]);
            } catch (AddressException e) {
                e.printStackTrace();
            }
        }
        return address;
    }

    public JavaMailSenderImpl getMailSender() {
        return mailSender;
    }

    public void setMailSender(JavaMailSenderImpl mailSender) {
        this.mailSender = mailSender;
    }

    public boolean isInstansiasOnOff() {
        return instansiasOnOff;
    }

    public void setInstansiasOnOff(boolean instansiasOnOff) {
        this.instansiasOnOff = instansiasOnOff;
    }
    
    

}
