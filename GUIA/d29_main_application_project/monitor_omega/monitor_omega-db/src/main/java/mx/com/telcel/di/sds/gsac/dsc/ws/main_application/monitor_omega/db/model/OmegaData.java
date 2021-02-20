package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author VI9XXI3
 */
public class OmegaData {

    /**
     * Patr&oacute;n para ignorar las transacciones I*Y4
     */
    public static final String IGNORE_Y4 = ".*Y4";
    private static final SimpleDateFormat SDF_OMEGA_DATE = new SimpleDateFormat("MM/dd/yy HH:mm:ss");

    private Date fechaUpdate;
    private List<Cics> listCics = new ArrayList<>();
    private List<CicsThread> listCicsThread = new ArrayList<>();
    @JsonIgnore
    private List<char[]> listDisplay = new ArrayList<>();

    // Campos Informativos
    @JsonIgnore
    private boolean alertRaised;

    public Date getFechaUpdate() {
        return fechaUpdate;
    }

    public void setFechaUpdate(Date fechaUpdate) {
        this.fechaUpdate = fechaUpdate;
    }

    public List<Cics> getListCics() {
        return listCics;
    }

    public void setListCics(List<Cics> listCics) {
        this.listCics = listCics;
    }

    public void addCics(Cics cics) {
        this.listCics.add(cics);
    }

    public List<CicsThread> getListCicsThread() {
        return listCicsThread;
    }

    public void setListCicsThread(List<CicsThread> listCicsThread) {
        this.listCicsThread = listCicsThread;
    }

    public void addCicsThread(CicsThread thread) {
        this.listCicsThread.add(thread);
    }

    public List<char[]> getListDisplay() {
        return listDisplay;
    }

    public void setListDisplay(List<char[]> listDisplay) {
        this.listDisplay = listDisplay;
    }

    public boolean isAlertRaised() {
        return alertRaised;
    }

    public void setAlertRaised(boolean alertRaised) {
        this.alertRaised = alertRaised;
    }

    @JsonIgnore
    public void parseDate(String stringDate) {
        try {
            fechaUpdate = SDF_OMEGA_DATE.parse(stringDate);
        } catch (Exception ignored) {
            fechaUpdate = new Date();
        }
    }

    @Override
    public String toString() {
        return "OmegaData{" + "fechaUpdate=" + fechaUpdate + ", listCicsThread=" + listCics + ", listDisplay=" + listDisplay.size() + ", alertRaised=" + alertRaised + '}';
    }
}
