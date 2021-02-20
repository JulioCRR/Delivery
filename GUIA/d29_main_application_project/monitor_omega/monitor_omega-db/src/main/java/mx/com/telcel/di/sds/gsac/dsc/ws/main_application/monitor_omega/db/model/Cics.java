package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Clase entidad para los procesos CICS del Omegamon II for DB2
 *
 * @author VI9XXI3
 */
public class Cics {

    private static final Logger LOG = LoggerFactory.getLogger(Cics.class);

    private String cicsRels;
    private String jobName;
    private String totalCpu;
    private String db2Cpu;
    private String pThrdMax;
    private String activeThreads;
    private String commitRateSec;
    private String roCommitRateSec;
    @JsonIgnore
    private String fullText;

    private boolean alertRaised;

    public Cics() {
        this(null, null);
    }

    public Cics(String jobName) {
        this(jobName, null);
    }

    public Cics(String jobName, String totalCpu) {
        this.jobName = jobName;
        this.totalCpu = totalCpu;
    }

    public String getCicsRels() {
        return cicsRels;
    }

    public void setCicsRels(String cicsRels) {
        this.cicsRels = cicsRels;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getTotalCpu() {
        return totalCpu;
    }

    public void setTotalCpu(String totalCpu) {
        this.totalCpu = totalCpu;
    }

    public String getDb2Cpu() {
        return db2Cpu;
    }

    public void setDb2Cpu(String db2Cpu) {
        this.db2Cpu = db2Cpu;
    }

    public String getpThrdMax() {
        return pThrdMax;
    }

    public void setpThrdMax(String pThrdMax) {
        this.pThrdMax = pThrdMax;
    }

    public String getActiveThreads() {
        return activeThreads;
    }

    public void setActiveThreads(String activeThreads) {
        this.activeThreads = activeThreads;
    }

    public String getCommitRateSec() {
        return commitRateSec;
    }

    public void setCommitRateSec(String commitRateSec) {
        this.commitRateSec = commitRateSec;
    }

    public String getRoCommitRateSec() {
        return roCommitRateSec;
    }

    public void setRoCommitRateSec(String roCommitRateSec) {
        this.roCommitRateSec = roCommitRateSec;
    }

    public String getFullText() {
        return fullText;
    }

    public void setFullText(String fullText) {
        this.fullText = fullText;
    }

    public boolean isAlertRaised() {
        return alertRaised;
    }

    public void setAlertRaised(boolean alertRaised) {
        this.alertRaised = alertRaised;
    }

    @Override
    public String toString() {
        return "Cics{" + "cicsRels=" + cicsRels + ", jobName=" + jobName + ", totalCpu=" + totalCpu + ", db2Cpu=" + db2Cpu + ", pThrdMax=" + pThrdMax + ", activeThreads=" + activeThreads + ", commitRateSec=" + commitRateSec + ", roCommitRateSec=" + roCommitRateSec + ", alertRaised=" + alertRaised + ", fullText=" + fullText + '}';
    }
}
