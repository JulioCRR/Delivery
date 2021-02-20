
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
 *         &lt;element name="numeroempleado" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="password" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "numeroempleado",
    "password"
})
@XmlRootElement(name = "autenticarUsuario")
public class AutenticarUsuario {

    @XmlElement(required = true, nillable = true)
    protected String numeroempleado;
    @XmlElement(required = true, nillable = true)
    protected String password;

    /**
     * Obtiene el valor de la propiedad numeroempleado.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNumeroempleado() {
        return numeroempleado;
    }

    /**
     * Define el valor de la propiedad numeroempleado.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNumeroempleado(String value) {
        this.numeroempleado = value;
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

}
