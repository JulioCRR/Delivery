package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;
import java.util.Date;
import javax.xml.soap.SOAPException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertasInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.exception.InstanceException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.MailManagerMonitor;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.SOAPRequest;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author VI9XXI3
 */
public class ValidaInstanciaThread implements Runnable {

    private static final Logger LOG = LoggerFactory.getLogger(ValidaInstanciaThread.class);

    private InstanciaWSM2K instancia;
    private SOAPRequest request;
    private MailManagerMonitor mailManager;
    private String sender;
    private String destinatariosAlertas;
    private RegistroAlertasInstancias registroAlertasInstancias;
    private int reintentos = 3;
     
     
    
    

    public ValidaInstanciaThread(InstanciaWSM2K instancia, SOAPRequest request,
            MailManagerMonitor mailManager, String sender, String destinatariosAlertas,
            RegistroAlertasInstancias registroAlertasInstancias) {
        this.instancia = instancia;
        this.request = request;
        this.mailManager = mailManager;
        this.sender = sender;
        this.destinatariosAlertas = destinatariosAlertas;
        this.registroAlertasInstancias = registroAlertasInstancias;
    }
    
    @Override
    public void run() {
        validaInstancia();
    }

    private void validaInstancia() {
        try {
            valida();
        } catch (InstanceException e) {
            StringBuilder sb = new StringBuilder();
            sb.append("Error al invocar instancia WSM2K<br><br>");
            sb.append("Instancia: ");
            sb.append(instancia.getInstancia());
            //sb.append(request.getEndpoint());
            sb.append("<br>");
            sb.append("Connection time: ");
            sb.append(instancia.getConnectionTime());
            sb.append("<br>");
            sb.append("Read time: ");
            sb.append(instancia.getReadTime());
            sb.append("<br>");
            sb.append("Estaus validacion: ");
            sb.append(instancia.getStatusAlert());
            sb.append("<br>");
            sb.append("Descripcion: ");
            sb.append(instancia.getDescription());
            sb.append("<br>");
            sb.append("Invocaciones correctas: ");
            sb.append(instancia.getIntentosExitosos());
            sb.append("<br>");
            sb.append("Invocaciones incorrectas: ");
            sb.append(instancia.getIntentosFallidos());
            sb.append("<br>");
            sb.append("Hora ultimo exito: ");
            sb.append(instancia.getHoraUltimoExitoString());
            sb.append("<br>");
            sb.append("Hora ultimo error: ");
            sb.append(instancia.getHoraUltimoErrorString());
            sb.append("<br>");
            if (System.currentTimeMillis() - instancia.getHoraUltimaAlerta() > UtilMonitoreo.getTiempoMaximoParaAlerta()) {
                instancia.setHoraUltimaAlerta(System.currentTimeMillis());
                mailManager.sendMimeMailSync(sender, destinatariosAlertas, "Alerta instancia WSM2K: " + instancia.getHost() + ":" + instancia.getPuerto(), sb.toString() );
                registroAlertasInstancias.addFirstSync(instancia);
            }
            LOG.error("Error al validar instancia", e);
        }
    }

    private void valida() throws InstanceException {

        String endpoint = instancia.getEndPoint();
        try {
            URL url = new URL(null, endpoint, new URLStreamHandler() {
                @Override
                protected URLConnection openConnection(URL u) throws IOException {
                    URL clone = new URL(u.toString());
                    URLConnection connection = clone.openConnection();
                    connection.setConnectTimeout(Constants.CONNECTION_TIMEOUT);
                    connection.setReadTimeout(Constants.READ_TIMEOUT);
                    return connection;
                }
            });
            request.setEndpoint(endpoint);
            request.createSOAPMessage();
            while (reintentos > 0) {
                reintentos--;
                try {
                    request.sendRequest(url);
                    instancia.setReadTime(request.getReadTime());
                    instancia.setConnectionTime(request.getConnectionTime());
                    instancia.setStatusValidation(true);
                    instancia.setDescription("successful");
                    instancia.setIntentosExitosos(instancia.getIntentosExitosos() + 1);
                    instancia.setHoraUltimoExito(new Date(System.currentTimeMillis()));
                    instancia.setHoraUltimoExitoString(instancia.getHoraUltimoExito().toString());
                    break;
                } catch (SOAPException e) {
                    if (reintentos >= 0) {
                        try {
                            Thread.sleep(Constants.SLEEP_TIMEOUT);
                            if (reintentos == 0) {
                                throw new InstanceException(getDetalleError(instancia, e)); 
                            }
                        } catch (InterruptedException ignored) {
                        }
                    }
                }
            }
            } catch (MalformedURLException | SOAPException e) {
            // new URL() failed
            // ...
            LOG.error(e.getMessage());
            throw new InstanceException(getDetalleError(instancia, e));
        }  
    }

   
    public MailManagerMonitor getMailManager() {
        return mailManager;
    }

    public void setMailManager(MailManagerMonitor mailManager) {
        this.mailManager = mailManager;
    }

    public RegistroAlertasInstancias getRegistroAlertasInstancias() {
        return registroAlertasInstancias;
    }

    public void setRegistroAlertasInstancias(RegistroAlertasInstancias registroAlertasInstancias) {
        this.registroAlertasInstancias = registroAlertasInstancias;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getDestinatariosAlertas() {
        return destinatariosAlertas;
    }

    public void setDestinatariosAlertas(String destinatariosAlertas) {
        this.destinatariosAlertas = destinatariosAlertas;
    }

    public InstanciaWSM2K getInstancia() {
        return instancia;
    }

    public void setInstancia(InstanciaWSM2K instancia) {
        this.instancia = instancia;
    }

    public SOAPRequest getRequest() {
        return request;
    }

    public void setRequest(SOAPRequest request) {
        this.request = request;
    }

    public int getReintentos() {
        return reintentos;
    }

    public void setReintentos(int reintentos) {
        this.reintentos = reintentos;
    }


    private InstanciaWSM2K getDetalleError(InstanciaWSM2K instancia, Exception e) {

        LOG.error("ERROR EN LA INVOCACION DE LA INSTANCIA:  " + instancia.getHost() + ":" + instancia.getPuerto());
        int mjsException = e.toString().indexOf(":");
        int mjs = e.toString().indexOf(":", mjsException + 1);
        instancia.setStatusValidation(false);
        instancia.setDescription(e.toString().substring(mjs).replace(":", " "));
        instancia.setConnectionTime(request.getConnectionTime());
        //instancia.setConnectionTime(-1);
        instancia.setReadTime(new Long(-1));
        instancia.setIntentosFallidos(instancia.getIntentosFallidos() + 1);
        instancia.setHoraUltimoError(new Date(System.currentTimeMillis()));
        instancia.setHoraUltimoErrorString(instancia.getHoraUltimoError().toString());

        return instancia;
    }

}
