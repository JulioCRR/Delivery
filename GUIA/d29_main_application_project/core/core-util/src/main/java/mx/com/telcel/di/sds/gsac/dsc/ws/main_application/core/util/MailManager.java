package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailManager {

    private static final Logger LOG = LoggerFactory.getLogger(MailManager.class);

    public static final String MAIL_SEPARATOR_COMMA = ",";
    public static final String MAIL_SEPARATOR_SEMICOLON = ";";
    public static final String MULTIPART_HTML = "text/html";

    private JavaMailSenderImpl mailSender;
    private String mailFrom;
    private String mailTo;
    private String telcelLogoUrl;
    private String backgroundUrl;
    private String portalServiciosUrl;

    public void sendMail(String subject, String msg) {
        sendMail(null, null, subject, msg);
    }

    public void sendMail(String to, String subject, String msg) {
        sendMail(null, to, subject, msg);
    }

    public void sendMail(String from, String to, String subject, String msg) {
        String sFrom = (StringUtils.isBlank(from) ? mailFrom : from);
        String sTo = (StringUtils.isBlank(to) ? mailTo : to);
        sTo = sTo.replace(MAIL_SEPARATOR_SEMICOLON, MAIL_SEPARATOR_COMMA);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sFrom);
            message.setTo(sTo.split(MAIL_SEPARATOR_COMMA));
            message.setSubject(subject);
            message.setText(msg);
            mailSender.send(message);
        } catch (Exception e) {
            LOG.error("Error al enviar correo", e);
        }
    }

    public void sendMimeMail(String subject, String msg) {
        sendMimeMail(null, null, subject, msg);
    }

    public void sendMimeMail(String to, String subject, String msg) {
        sendMimeMail(null, to, subject, msg);
    }

    public void sendMimeMail(String from, String to, String subject, String msg) {
        String sFrom = (StringUtils.isBlank(from) ? mailFrom : from);
        String sTo = (StringUtils.isBlank(to) ? mailTo : to);
        sTo = sTo.replace(MAIL_SEPARATOR_SEMICOLON, MAIL_SEPARATOR_COMMA);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress(sFrom));
            message.addRecipients(Message.RecipientType.TO, parseToAddress(sTo.split(MAIL_SEPARATOR_COMMA)));
            message.setSubject(subject);
            message.setContent(msg, MULTIPART_HTML);
            mailSender.send(message);
        } catch (AddressException e) {
            LOG.error("Error al parsear direccion de correo: " + sFrom, e);
        } catch (MessagingException e) {
            LOG.error("Error al enviar correo", e);
        }
    }

    public void sendMimeMailAttachment(String subject, String msg, String attachName, byte[] attachSource) {
        sendMimeMailAttachment(null, null, subject, msg, attachName, attachSource);
    }

    public void sendMimeMailAttachment(String to, String subject, String msg, String attachName, byte[] attachSource) {
        sendMimeMailAttachment(null, to, subject, msg, attachName, attachSource);
    }

    public void sendMimeMailAttachment(String from, String to, String subject, String msg, String attachName, byte[] attachSource) {
        String sFrom = (StringUtils.isBlank(from) ? mailFrom : from);
        String sTo = (StringUtils.isBlank(to) ? mailTo : to);
        sTo = sTo.replace(MAIL_SEPARATOR_SEMICOLON, MAIL_SEPARATOR_COMMA);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(new InternetAddress(sFrom));
            helper.setTo(parseToInternetAddress(sTo.split(MAIL_SEPARATOR_COMMA)));
            helper.setSubject(subject);
            helper.setText(msg, true);
            helper.addAttachment(attachName, new ByteArrayResource(attachSource));
            mailSender.send(message);
        } catch (AddressException e) {
            LOG.error("Error al parsear direccion de correo: " + sFrom, e);
        } catch (MessagingException e) {
            LOG.error("Error al enviar correo", e);
        }
    }

    public Address[] parseToAddress(String[] dest) {
        return parseToInternetAddress(dest);
    }

    public InternetAddress[] parseToInternetAddress(String[] dest) {
        InternetAddress[] address = new InternetAddress[dest.length];
        for (int i = 0; i < dest.length; i++) {
            try {
                address[i] = new InternetAddress(dest[i]);
            } catch (AddressException e) {
                LOG.error("Error al parsear direccion de correo: " + dest[i], e);
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

    public String getMailFrom() {
        return mailFrom;
    }

    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }

    public String getMailTo() {
        return mailTo;
    }

    public void setMailTo(String mailTo) {
        this.mailTo = mailTo;
    }

    public String getTelcelLogoUrl() {
        return telcelLogoUrl;
    }

    public void setTelcelLogoUrl(String telcelLogoUrl) {
        this.telcelLogoUrl = telcelLogoUrl;
    }

    public String getBackgroundUrl() {
        return backgroundUrl;
    }

    public void setBackgroundUrl(String backgroundUrl) {
        this.backgroundUrl = backgroundUrl;
    }

    public String getPortalServiciosUrl() {
        return portalServiciosUrl;
    }

    public void setPortalServiciosUrl(String portalServiciosUrl) {
        this.portalServiciosUrl = portalServiciosUrl;
    }
}
