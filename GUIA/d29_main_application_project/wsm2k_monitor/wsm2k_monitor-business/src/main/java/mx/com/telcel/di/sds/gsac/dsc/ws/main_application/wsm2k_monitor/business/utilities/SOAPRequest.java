package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

import java.net.URL;
import java.util.List;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.Name;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.SOAPRequestParameter;


/**
 * Utilidad para Requests de tipo SOAP a servicios WSM2K
 * @author VI9XXI3
 */
public class SOAPRequest {


    private String user;
    private String region;
    private String function;
    private String action;
    private String service;
    private List<SOAPRequestParameter> parametersList;

    private String xmlRequest;
    private String endpoint;
    private Long connectionTime;
    private Long readTime;
    private SOAPMessage soapMessage;

    public SOAPRequest() {
    }

    public SOAPRequest(String user, String region, String function, String action, String service, List<SOAPRequestParameter> parametersList) {
        this.user = user;
        this.region = region;
        this.function = function;
        this.action = action;
        this.service = service;
        this.parametersList = parametersList;
        createRequest();
    }

    private void createRequest() {
        StringBuilder xmlSb = new StringBuilder();
        xmlSb.append("<![CDATA[").append(Constants.XML_HEADER);
        xmlSb.append("<Request>");
        xmlSb.append("<user>").append(user.toUpperCase()).append("</user>");
        xmlSb.append("<region>").append(region.toUpperCase()).append("</region>");
        xmlSb.append("<function>").append(function.toUpperCase()).append("</function>");
        xmlSb.append("<action>").append(action.toUpperCase()).append("</action>");
        xmlSb.append("<inputParameters>");
        xmlSb.append("<").append(service).append(">");
        for (SOAPRequestParameter parameter : parametersList) {
            xmlSb.append(parameter.toXML());
        }
        xmlSb.append("</").append(service).append(">");
        xmlSb.append("</inputParameters>");
        xmlSb.append("</Request>").append("]]>");
        xmlRequest = xmlSb.toString();
    }

    public void createSOAPMessage() throws SOAPException {
        if (xmlRequest == null) {
            createRequest();
        }

        soapMessage = MessageFactory.newInstance().createMessage();

        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", endpoint + Constants.RUN_SERVICE);

        SOAPPart part = soapMessage.getSOAPPart();
        SOAPEnvelope envelope = part.getEnvelope();
        envelope.addNamespaceDeclaration("ser", Constants.TELCEL_NS);

        SOAPBody body = envelope.getBody();
        SOAPElement ejecutaServicio = body.addChildElement(Constants.RUN_SERVICE, "ser");

        Name xmlNode = envelope.createName("xml");
        SOAPElement xml = ejecutaServicio.addChildElement(xmlNode);

        xml.addTextNode(xmlRequest);
        soapMessage.saveChanges();
    }

    public SOAPMessage sendRequest(URL url) throws SOAPException {
        Long initTime = System.currentTimeMillis();
        SOAPConnection connection = (SOAPConnectionFactory.newInstance()).createConnection();
        connectionTime = System.currentTimeMillis() - initTime;

        initTime = System.currentTimeMillis();
        SOAPMessage response = connection.call(soapMessage, url);
        readTime = System.currentTimeMillis() - initTime;

        connection.close();
        return response;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public List<SOAPRequestParameter> getParametersList() {
        return parametersList;
    }

    public void setParametersList(List<SOAPRequestParameter> parametersList) {
        this.parametersList = parametersList;
    }

    public String getXmlRequest() {
        return xmlRequest;
    }

    public void setXmlRequest(String xmlRequest) {
        this.xmlRequest = xmlRequest;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public SOAPMessage getSoapMessage() {
        return soapMessage;
    }

    public void setSoapMessage(SOAPMessage soapMessage) {
        this.soapMessage = soapMessage;
    }

    public Long getConnectionTime() {
        return connectionTime;
    }

    public void setConnectionTime(Long connectionTime) {
        this.connectionTime = connectionTime;
    }

    public Long getReadTime() {
        return readTime;
    }

    public void setReadTime(Long readTime) {
        this.readTime = readTime;
    }
}
