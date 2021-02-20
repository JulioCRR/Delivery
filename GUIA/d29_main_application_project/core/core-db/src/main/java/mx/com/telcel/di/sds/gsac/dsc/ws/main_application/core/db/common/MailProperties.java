/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class MailProperties {
   
    private String smtpServer;
    private String smtpPort;
    private String mailUsr;
    private String mailPwd;
    private String mailTemplateRespuestaUrl;
    private String mailTemplateSolicitudUrl;
    private String templateTelcelLogo;
    private String templateBackground;
    private String templateSolicitudUrl;

    public String getSmtpServer() {
        return smtpServer;
    }

    public void setSmtpServer(String smtpServer) {
        this.smtpServer = smtpServer;
    }

    public String getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(String smtpPort) {
        this.smtpPort = smtpPort;
    }

    public String getMailUsr() {
        return mailUsr;
    }

    public void setMailUsr(String mailUsr) {
        this.mailUsr = mailUsr;
    }

    public String getMailPwd() {
        return mailPwd;
    }

    public void setMailPwd(String mailPwd) {
        this.mailPwd = mailPwd;
    }

    public String getMailTemplateRespuestaUrl() {
        return mailTemplateRespuestaUrl;
    }

    public void setMailTemplateRespuestaUrl(String mailTemplateRespuestaUrl) {
        this.mailTemplateRespuestaUrl = mailTemplateRespuestaUrl;
    }

    public String getMailTemplateSolicitudUrl() {
        return mailTemplateSolicitudUrl;
    }

    public void setMailTemplateSolicitudUrl(String mailTemplateSolicitudUrl) {
        this.mailTemplateSolicitudUrl = mailTemplateSolicitudUrl;
    }
    
    public String getTemplateTelcelLogo() {
        return templateTelcelLogo;
    }

    public void setTemplateTelcelLogo(String templateTelcelLogo) {
        this.templateTelcelLogo = templateTelcelLogo;
    }

    public String getTemplateBackground() {
        return templateBackground;
    }

    public void setTemplateBackground(String templateBackground) {
        this.templateBackground = templateBackground;
    }

    public String getTemplateSolicitudUrl() {
        return templateSolicitudUrl;
    }

    public void setTemplateSolicitudUrl(String templateSolicitudUrl) {
        this.templateSolicitudUrl = templateSolicitudUrl;
    }
     
}
