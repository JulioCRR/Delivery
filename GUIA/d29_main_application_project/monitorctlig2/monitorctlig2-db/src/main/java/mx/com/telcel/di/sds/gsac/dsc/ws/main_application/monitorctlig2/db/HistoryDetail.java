package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.joda.time.LocalDateTime;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Entity
@Table(name = DBConstants.DB_PREF_CTLIG2 + "HISTORY_DETAIL")
public class HistoryDetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CTLIG2 + "HISTORY_DETAIL_SEQ", sequenceName = DBConstants.DB_PREF_CTLIG2 + "HISTORY_DETAIL_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CTLIG2 + "HISTORY_DETAIL_SEQ")
    @Column(name = "ID")
    private Long id;
    @NotNull
    @Column(name = "REGION")
    private Short region;
    @JoinColumn(name = "ID_HISTORY", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @NotNull
    private History history;
    @Column(name = "START_TIME")
    @NotNull
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime startTime;
    @Column(name = "END_TIME")
    @NotNull
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime endTime;
    @Column(name = "DESCRIPTION")
    @NotNull
    private String description;
    @Lob
    @Column(name = "RESQUEST")
    @NotNull
    private String request;
    @Lob
    @Column(name = "RESPONSE")
    private String response;
    @Enumerated
    @Column(name = "STATUS")
    @NotNull
    private HistoryStatus status;

    public HistoryDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStartTime() {
        return startTime == null ? null : startTime.toDateTime().getMillis();
    }

    @JsonIgnore
    public LocalDateTime getStartTimeLocalDateTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime == null ? null : endTime.toDateTime().getMillis();
    }

    @JsonIgnore
    public LocalDateTime getEndTimeLocalDateTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HistoryStatus getStatus() {
        return status;
    }

    public void setStatus(HistoryStatus status) {
        this.status = status;
    }

    public Short getRegion() {
        return region;
    }

    public void setRegion(Short region) {
        this.region = region;
    }

    public History getHistory() {
        return history;
    }

    public Long getHistoryId() {
        return history.getId();
    }

    public void setHistory(History history) {
        this.history = history;
    }

    public String getRequest() {
        return CoreFunctions.formatXML(request);
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getResponse() {
        return CoreFunctions.formatXML(response);
    }

    public void setResponse(String response) {
        this.response = response;
    }

}
