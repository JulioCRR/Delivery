
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
 *         &lt;element name="autenticarUsuarioAppReturn" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "autenticarUsuarioAppReturn"
})
@XmlRootElement(name = "autenticarUsuarioAppResponse")
public class AutenticarUsuarioAppResponse {

    @XmlElement(required = true, nillable = true)
    protected String autenticarUsuarioAppReturn;

    /**
     * Obtiene el valor de la propiedad autenticarUsuarioAppReturn.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAutenticarUsuarioAppReturn() {
        return autenticarUsuarioAppReturn;
    }

    /**
     * Define el valor de la propiedad autenticarUsuarioAppReturn.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAutenticarUsuarioAppReturn(String value) {
        this.autenticarUsuarioAppReturn = value;
    }

}
