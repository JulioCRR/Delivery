package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Clase que contiene el mapeo de la tabla CicsThread de Omegamon II for DB2
 *
 * @author VI9XXI3
 */
public class CicsThread {

    private static final Logger LOG = LoggerFactory.getLogger(CicsThread.class);

    public static final short THREAD_TYPE_IGNORED = -1;
    public static final short THREAD_TYPE_NORMAL = 0;
    public static final short THREAD_TYPE_ALERT = 1;
    private static final SimpleDateFormat SDF_ELAPSED = new SimpleDateFormat("HH:mm:ss.S");
    private static final SimpleDateFormat SDF_ELAPSED_DAY = new SimpleDateFormat("dd-HH:mm");

    private String elapsed;
    private String planName;
    private String tran;
    private String cpu;
    private String status;
    private String getPg;
    private String update;
    private String commit;
    private String jobName;
    @JsonIgnore
    private String fullText;

    // Campos Informativos
    private String region;
    private String transaccion;
    private short threadType;
    private double elapsedTime;
    private String pantallaM2k;
    @JsonIgnore
    private double cpuNum;

    public CicsThread() {
        region = "N/A";
        transaccion = "N/A";
        threadType = THREAD_TYPE_NORMAL;
        elapsedTime = -1.0;
    }

    public String getElapsed() {
        return elapsed;
    }

    public void setElapsed(String elapsed) {
        this.elapsed = elapsed;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getTran() {
        return tran;
    }

    public void setTran(String tran) {
        this.tran = tran;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGetPg() {
        return getPg;
    }

    public void setGetPg(String getPg) {
        this.getPg = getPg;
    }

    public String getUpdate() {
        return update;
    }

    public void setUpdate(String update) {
        this.update = update;
    }

    public String getCommit() {
        return commit;
    }

    public void setCommit(String commit) {
        this.commit = commit;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getFullText() {
        return fullText;
    }

    public void setFullText(String fullText) {
        this.fullText = fullText;
    }

    /* CAMPOS INFORMATIVOS */
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

    public short getThreadType() {
        return threadType;
    }

    public void setThreadType(short threadType) {
        this.threadType = threadType;
    }

    public double getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(double elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public String getPantallaM2k() {
        return pantallaM2k;
    }

    public void setPantallaM2k(String pantallaM2k) {
        this.pantallaM2k = pantallaM2k;
    }

    public double getCpuNum() {
        return cpuNum;
    }

    public void setCpuNum(double cpuNum) {
        this.cpuNum = cpuNum;
    }

    public boolean isAlertRaised() {
        return THREAD_TYPE_ALERT == threadType;
    }

    @JsonIgnore
    public String getElapsedClean() {
        return elapsed.replaceAll("[a-zA-Z*]", "");
    }

    @JsonIgnore
    public double createElapsedTime() throws Exception {
        String elapsedFormat = getElapsedClean();
        Calendar calendar = Calendar.getInstance();
        elapsedTime = 0.0;
        if (elapsedFormat.contains("-")) {
            calendar.setTime(SDF_ELAPSED_DAY.parse(elapsedFormat));
            elapsedTime += calendar.get(Calendar.DAY_OF_YEAR) * 24 * 60 * 60;
            calendar.add(Calendar.DAY_OF_YEAR, 1);
        } else {
            calendar.setTime(SDF_ELAPSED.parse(elapsedFormat));
        }
        elapsedTime += (calendar.get(Calendar.HOUR_OF_DAY) * 60 * 60);
        elapsedTime += (calendar.get(Calendar.MINUTE) * 60);
        elapsedTime += calendar.get(Calendar.SECOND);
        elapsedTime += (calendar.get(Calendar.MILLISECOND) / 10.0);
        return elapsedTime;
    }

    @JsonIgnore
    public double createCpuPct() throws Exception {
        cpuNum = -1.0;
        cpuNum = Double.parseDouble(cpu.replaceAll("%", "").trim());
        return cpuNum;
    }

    @Override
    public String toString() {
        return "CicsThread{" + "elapsed=" + elapsed + ", planName=" + planName + ", tran=" + tran + ", cpu=" + cpu + ", status=" + status + ", getPg=" + getPg + ", update=" + update + ", commit=" + commit + ", jobName=" + jobName + ", region=" + region + ", transaccion=" + transaccion + ", threadType=" + threadType + ", elapsedTime=" + elapsedTime + ", pantallaM2k=" + pantallaM2k + ", cpuNum=" + cpuNum + ", fullText=" + fullText + +'}';
    }
}
