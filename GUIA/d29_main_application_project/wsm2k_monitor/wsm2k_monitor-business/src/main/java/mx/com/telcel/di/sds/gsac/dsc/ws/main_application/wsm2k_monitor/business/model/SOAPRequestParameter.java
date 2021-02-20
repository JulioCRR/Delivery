package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

/**
 * Parametros a enviar al servicio de WSM2K
 * @author VI9XXI3
 */
public class SOAPRequestParameter {
    private String parameter;
    private String longitud;
    private String value;

    public SOAPRequestParameter() {
    }

    public SOAPRequestParameter(String parameter, String longitud, String value) {
        this.parameter = parameter;
        this.longitud = longitud;
        this.value = value;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public String getLongitud() {
        return longitud;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
    public String toXML() {
        StringBuilder sb = new StringBuilder();
        sb.append("<").append(parameter);
        if (longitud != null) {
            sb.append(" ").append("longitud=\"").append(longitud).append("\"");
        }
        sb.append(">");
        sb.append(value);
        sb.append("</").append(parameter).append(">");
        return sb.toString();
    }

    @Override
    public String toString() {
        return "SOAPRequestParameter{" + "parametro=" + parameter 
                + ", longitud=" + longitud + ", value=" + value + '}';
    }
}
