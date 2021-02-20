package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model;

import java.util.Map;

/**
 *
 * @author VI9XXI3
 */
public class ConexionCTG {

    private String ip;
    private Integer port;
    private Integer commareaLength;
    private Map<String, String> letraRegion;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public Integer getCommareaLength() {
        return commareaLength;
    }

    public void setCommareaLength(Integer commareaLength) {
        this.commareaLength = commareaLength;
    }

    public Map<String, String> getLetraRegion() {
        return letraRegion;
    }

    public void setLetraRegion(Map<String, String> letraRegion) {
        this.letraRegion = letraRegion;
    }
}
