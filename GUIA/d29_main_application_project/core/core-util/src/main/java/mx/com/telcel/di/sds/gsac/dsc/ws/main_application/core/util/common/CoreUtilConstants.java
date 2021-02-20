package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.common;

/**
 *
 * @author VI9XXI3
 */
public class CoreUtilConstants {

    // application.properties
    public static final String RSC_APPLICATION = "application.properties";
    public static final String PROP_APPLICATION_SERVER_PORT = "server.port";
    public static final String PROP_APPLICATION_ENVIROMENT = "enviroment";
    public static final String ENVIROMENT_PROD = "prod";
    public static final String ENVIROMENT_DEV = "dev";

    // mail_config.properties
    public static final String RSC_MAIL_CONFIG = "mail_config.properties";
    public static final String PROP_MAIL_SMTP_SERVER = "mail.smtp.server";
    public static final String PROP_MAIL_PORT = "mail.port";
    public static final String PROP_MAIL_USR = "mail.usr";
    public static final String PROP_MAIL_TMPL_RESPUESTA_URL = "template.respuesta.url";
    public static final String PROP_MAIL_TMPL_SOLICITUD_URL = "template.solicitud.url";
    public static final String PROP_MAIL_TMPL_TELCEL_LOGO_URL = "template.telcel.logo.url";
    public static final String PROP_MAIL_TMPL_BACKGROUND_LOGO_URL = "template.background.logo.url";
    public static final String PROP_MAIL_TMPL_PORTAL_SERVICIOS_URL = "template.portal.servicios.url";

    // mail_template.html
    public static final String RSC_TMPL_MAIL_TEMPLATE = "templates/mail_template.html";
    public static final String HTML_BACKGROUND_PRINCIPAL = "#BACKGROUND_PRINCIPAL";
    public static final String HTML_TELCEL_LOGO = "#TELCEL_LOGO";
    public static final String HTML_SUBJECT_TITLE = "#SUBJECT_TITLE";
    public static final String HTML_DATA_TITLE = "#DATA_TITLE";
    public static final String HTML_DATA = "#DATA";
    public static final String HTML_FOOTER_NOTE = "#FOOTER_NOTE";

    // wsdl.properties
    public static final String RSC_WSDL = "wsdl.properties";
    public static final String PROP_WSDL_I1H_USER = "wsdl.i1h.user";
    public static final String PROP_WSDL_I1G_USER = "wsdl.i1g.user";
    public static final String PROP_WSDL_I1G_CICS_USER = "wsdl.i1g.cics.user";

    // xmp.properties
    public static final String RSC_XMP = "xmp.properties";
    public static final String PROP_XMP_ISPRODUCCION = "xmp.isproducion";
    public static final String PROP_XMP_USUARIO = "xmp.usuario";
    public static final String PROP_XMP_IDSERVICE = "xmp.idservice";

    // jms_config.properties
    public static final String RSC_JMS_CONFIG = "jms_config.properties";
    public static final String PROP_MONITOR_JMS_HOSTNAME = "monitor.jms.hostName";
    public static final String PROP_MONITOR_JMS_PORT = "monitor.jms.port";
    public static final String PROP_MONITOR_JMS_QUEUE_MANAGER = "monitor.jms.queueManager";
    public static final String PROP_MONITOR_JMS_TRANSPORT_TYPE = "monitor.jms.transportType";
    public static final String PROP_MONITOR_JMS_CHANNEL = "monitor.jms.channel";
    public static final String PROP_MONITOR_JMS_QUEUE_LOGGER = "monitor.jms.queue.logger";
    public static final String PROP_MONITOR_JMS_QUEUE_ANALYZER = "monitor.jms.queue.analyzer";
    public static final String PROP_PETICIONES_JMS_TOPIC_PUBLISHER = "peticiones.jms.topic.publisher";
}
