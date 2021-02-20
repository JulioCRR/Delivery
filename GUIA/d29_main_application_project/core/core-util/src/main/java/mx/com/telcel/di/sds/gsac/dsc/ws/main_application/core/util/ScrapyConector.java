package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

/**
 *
 * @author VI9XXI3
 */
public class ScrapyConector {

    private String host;
    private Integer puerto;
    private String cics;
    private String cmdLogin;
    private String usuario;
    private String clave;
    private String transaccion;
    private String region;
    private Long timeOut;
    private String sLogin;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPuerto() {
        return puerto;
    }

    public void setPuerto(Integer puerto) {
        this.puerto = puerto;
    }

    public String getCics() {
        return cics;
    }

    public void setCics(String cics) {
        this.cics = cics;
    }

    public String getCmdLogin() {
        return cmdLogin;
    }

    public void setCmdLogin(String cmdLogin) {
        this.cmdLogin = cmdLogin;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Long getTimeOut() {
        return timeOut;
    }

    public void setTimeOut(Long timeOut) {
        this.timeOut = timeOut;
    }

    public String getsLogin() {
        return sLogin;
    }

    public void setsLogin(String sLogin) {
        this.sLogin = sLogin;
    }

    @Override
    public String toString() {
        return "ScrapyBean{" + "host=" + host + ", puerto=" + puerto + ", cics=" + cics + ", cmdLogin=" + cmdLogin + ", usuario=" + usuario + ", clave=" + "********" + ", transaccion=" + transaccion + ", region=" + region + ", timeOut=" + timeOut + ", sLogin=" + sLogin + '}';
    }
}
