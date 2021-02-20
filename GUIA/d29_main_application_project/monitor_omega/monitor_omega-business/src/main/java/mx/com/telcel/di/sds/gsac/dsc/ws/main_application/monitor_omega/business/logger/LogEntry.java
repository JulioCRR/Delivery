package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.logger;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author VI9XXM5
 */
public class LogEntry {

    private static final Logger LOG = LoggerFactory.getLogger(LogEntry.class);
    private static final String INDICE = "logstash-info-ds-gsa-scws-wsm2kwstools-wsm2komegatools-app";
    private static final SimpleDateFormat SDF_DATA;
    private static final SimpleDateFormat SDF_ELK;

    static {
        SDF_DATA = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
        SDF_DATA.setTimeZone(TimeZone.getTimeZone("America/Mexico_City"));
        SDF_ELK = new SimpleDateFormat("yyyy.MM");
    }

    private Date date;
    private String region;
    private String transaction;
    private Long execTime;
    private double cpu;
    private String cics;
    private String status;
    private String pantallaM2k;
    private String programa;
    private boolean isAlert;

    public LogEntry(Date date, String region, String transaction, Long execTime, double cpu, String cics, String status, String pantallaM2k, String programa, boolean isAlert) {
        this.date = date;
        this.region = region;
        this.transaction = transaction;
        this.execTime = execTime;
        this.cpu = cpu;
        this.cics = cics;
        this.status = status;
        this.pantallaM2k = pantallaM2k;
        this.programa = programa;
        this.isAlert = isAlert;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTransaction() {
        return transaction;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public Long getExecTime() {
        return execTime;
    }

    public void setExecTime(Long execTime) {
        this.execTime = execTime;
    }

    public double getCpu() {
        return cpu;
    }

    public void setCpu(double cpu) {
        this.cpu = cpu;
    }

    public String getCics() {
        return cics;
    }

    public void setCics(String cics) {
        this.cics = cics;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPantallaM2k() {
        return pantallaM2k;
    }

    public void setPantallaM2k(String pantallaM2k) {
        this.pantallaM2k = pantallaM2k;
    }

    public String getPrograma() {
        return programa;
    }

    public void setPrograma(String programa) {
        this.programa = programa;
    }

    public boolean isIsAlert() {
        return isAlert;
    }

    public void setIsAlert(boolean isAlert) {
        this.isAlert = isAlert;
    }

    public JSONObject getJson() {
        JSONObject obj = new JSONObject();

        String strDateGeneral = SDF_DATA.format(this.date);
        String strDate = SDF_ELK.format(Calendar.getInstance().getTime());

        obj.put("date", strDateGeneral);
        obj.put("region", this.region);
        obj.put("transaction", this.transaction);
        obj.put("execTime", this.execTime);
        obj.put("cpu", this.cpu);
        obj.put("cics", this.cics);
        obj.put("status", this.status);
        obj.put("m2kScreen", this.pantallaM2k);
        obj.put("program", this.programa);
        obj.put("isAlert", this.isAlert);

        obj.put("indice", INDICE + "-" + strDate);
        return obj;
    }

}
