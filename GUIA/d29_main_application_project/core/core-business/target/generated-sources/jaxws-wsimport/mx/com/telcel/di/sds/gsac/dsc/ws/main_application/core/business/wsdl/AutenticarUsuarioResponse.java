
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
 *         &lt;element name="autenticarUsuarioReturn" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "autenticarUsuarioReturn"
})
@XmlRootElement(name = "autenticarUsuarioResponse")
public class AutenticarUsuarioResponse {

    @XmlElement(required = true, nillable = true)
    protected String autenticarUsuarioReturn;

    /**
     * Obtiene el valor de la propiedad autenticarUsuarioReturn.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAutenticarUsuarioReturn() {
        return autenticarUsuarioReturn;
    }

    /**
     * Define el valor de la propiedad autenticarUsuarioReturn.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAutenticarUsuarioReturn(String value) {
        this.autenticarUsuarioReturn = value;
    }

}
