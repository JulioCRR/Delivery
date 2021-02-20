
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.wsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para anonymous complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="numeroEmpleado" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="password" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="idApp" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="claveApp" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "numeroEmpleado",
    "password",
    "idApp",
    "claveApp"
})
@XmlRootElement(name = "autenticarUsuarioApp")
public class AutenticarUsuarioApp {

    @XmlElement(required = true, nillable = true)
    protected String numeroEmpleado;
    @XmlElement(required = true, nillable = true)
    protected String password;
    @XmlElement(required = true, nillable = true)
    protected String idApp;
    @XmlElement(required = true, nillable = true)
    protected String claveApp;

    /**
     * Obtiene el valor de la propiedad numeroEmpleado.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }

    /**
     * Define el valor de la propiedad numeroEmpleado.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroEmpleado(String value) {
        this.numeroEmpleado = value;
    }

    /**
     * Obtiene el valor de la propiedad password.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPassword() {
        return password;
    }

    /**
     * Define el valor de la propiedad password.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPassword(String value) {
        this.password = value;
    }

    /**
     * Obtiene el valor de la propiedad idApp.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdApp() {
        return idApp;
    }

    /**
     * Define el valor de la propiedad idApp.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdApp(String value) {
        this.idApp = value;
    }

    /**
     * Obtiene el valor de la propiedad claveApp.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getClaveApp() {
        return claveApp;
    }

    /**
     * Define el valor de la propiedad claveApp.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setClaveApp(String value) {
        this.claveApp = value;
    }

}
