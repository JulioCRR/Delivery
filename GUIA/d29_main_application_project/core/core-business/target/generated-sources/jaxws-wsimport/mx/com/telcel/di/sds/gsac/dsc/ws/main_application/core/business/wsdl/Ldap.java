
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.8
 * Generated source version: 2.2
 * 
 */
@WebService(name = "ldap", targetNamespace = "http://test.dswi.gsa.telcel.com")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface Ldap {


    /**
     * 
     * @param password
     * @param numeroempleado
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "autenticarUsuario")
    @WebResult(name = "autenticarUsuarioReturn", targetNamespace = "")
    @RequestWrapper(localName = "autenticarUsuario", targetNamespace = "http://test.dswi.gsa.telcel.com", className = "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.AutenticarUsuario")
    @ResponseWrapper(localName = "autenticarUsuarioResponse", targetNamespace = "http://test.dswi.gsa.telcel.com", className = "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.AutenticarUsuarioResponse")
    public String autenticarUsuario(
        @WebParam(name = "numeroempleado", targetNamespace = "")
        String numeroempleado,
        @WebParam(name = "password", targetNamespace = "")
        String password);

    /**
     * 
     * @param idApp
     * @param numeroEmpleado
     * @param password
     * @param claveApp
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "autenticarUsuarioApp")
    @WebResult(name = "autenticarUsuarioAppReturn", targetNamespace = "")
    @RequestWrapper(localName = "autenticarUsuarioApp", targetNamespace = "http://test.dswi.gsa.telcel.com", className = "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.AutenticarUsuarioApp")
    @ResponseWrapper(localName = "autenticarUsuarioAppResponse", targetNamespace = "http://test.dswi.gsa.telcel.com", className = "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl.AutenticarUsuarioAppResponse")
    public String autenticarUsuarioApp(
        @WebParam(name = "numeroEmpleado", targetNamespace = "")
        String numeroEmpleado,
        @WebParam(name = "password", targetNamespace = "")
        String password,
        @WebParam(name = "idApp", targetNamespace = "")
        String idApp,
        @WebParam(name = "claveApp", targetNamespace = "")
        String claveApp);

}
