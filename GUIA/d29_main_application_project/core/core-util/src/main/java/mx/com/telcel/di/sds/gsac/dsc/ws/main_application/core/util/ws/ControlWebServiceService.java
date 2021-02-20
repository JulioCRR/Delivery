/**
 * ControlWebServiceService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.ws;

public interface ControlWebServiceService extends javax.xml.rpc.Service {

    public java.lang.String getControlWebServiceAddress();

    public ControlWebService getControlWebService() throws javax.xml.rpc.ServiceException;

    public ControlWebService getControlWebService(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
