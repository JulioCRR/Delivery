/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public enum EClaves {

    SMTP_SERVER("CLAVE_SMTP_SERVER"),
    SMTP_SERVER_PORT("CLAVE_SMTP_SERVER_PORT"),
    MAIL_SENDER_USR("CLAVE_MAIL_SENDER_USR"),
    MAIL_SENDER_PWD("CLAVE_MAIL_SENDER_PWD"),
    CORREO_RECEPTOR("CLAVE_CORREO_RECEPTOR"),
    TIPO_ENVIO("CLAVE_TIPO_ENVIO"),
    DIRECCION_URL_TEMPLATE("CLAVE_UR_TEMPLATE"),
    TEMPLATE_PROPERTIES("CLAVE_TEMPLATE_PROPS");
    
    private String clave;
    
    EClaves(String key) {
        this.clave = key;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
    
}
