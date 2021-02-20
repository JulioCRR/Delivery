package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model;

/**
 *
 * @author VI9XXI3
 */
public class PropiedadesMonitorOmega {

    private int intervaloRefrescado;
    private double umbralAlertas;
    private boolean monitorOn;
    private String correosAlerta;
    private String correosAlertaError;
    private double maxCpu;

    public PropiedadesMonitorOmega() {
    }

    public PropiedadesMonitorOmega(int intervaloRefrescado, double umbralAlertas) {
        this.intervaloRefrescado = intervaloRefrescado;
        this.umbralAlertas = umbralAlertas;
    }

    public int getIntervaloRefrescado() {
        return intervaloRefrescado;
    }

    public void setIntervaloRefrescado(int intervaloRefrescado) {
        this.intervaloRefrescado = intervaloRefrescado;
    }

    public double getUmbralAlertas() {
        return umbralAlertas;
    }

    public void setUmbralAlertas(double umbralAlertas) {
        this.umbralAlertas = umbralAlertas;
    }

    public boolean isMonitorOn() {
        return monitorOn;
    }

    public void setMonitorOn(boolean monitorOn) {
        this.monitorOn = monitorOn;
    }

    public String getCorreosAlerta() {
        return correosAlerta;
    }

    public void setCorreosAlerta(String correosAlerta) {
        this.correosAlerta = correosAlerta;
    }

    public String getCorreosAlertaError() {
        return correosAlertaError;
    }

    public void setCorreosAlertaError(String correosAlertaError) {
        this.correosAlertaError = correosAlertaError;
    }

    public double getMaxCpu() {
        return maxCpu;
    }

    public void setMaxCpu(double maxCpu) {
        this.maxCpu = maxCpu;
    }

    @Override
    public String toString() {
        return "PropiedadesMonitorOmega{" + "intervaloRefrescado=" + intervaloRefrescado + ", umbralAlertas=" + umbralAlertas + ", monitorOn=" + monitorOn + ", correosAlerta=" + correosAlerta + ", correosAlertaError=" + correosAlertaError + ", maxCpu=" + maxCpu + '}';
    }
}
