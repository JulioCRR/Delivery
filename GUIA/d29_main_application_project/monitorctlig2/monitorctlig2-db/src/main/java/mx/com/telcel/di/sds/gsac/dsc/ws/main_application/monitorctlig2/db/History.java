package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter.JodaLocalDateTimeConverter;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.joda.time.LocalDateTime;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Entity
@Table(name = DBConstants.DB_PREF_CTLIG2 + "HISTORY")
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CTLIG2 + "HISTORY_SEQ", sequenceName = DBConstants.DB_PREF_CTLIG2 + "HISTORY_SEQ")
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CTLIG2 + "HISTORY_SEQ")
    @Column(name = "ID")
    private Long id;
    @Column(name = "START_TIME")
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime startTime;
    @Column(name = "END_TIME")
    @Convert(converter = JodaLocalDateTimeConverter.class)
    private LocalDateTime endTime;
    @Column(name = "DESCRIPTION")
    private String description;
    @Enumerated
    @Column(name = "STATUS")
    private HistoryStatus status;
    @OneToMany(mappedBy = "history", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HistoryDetail> historyDetailList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public static final String DD_M_MYYYY_HHMM = "dd/MM/yy hh:mm";

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

    public List<HistoryDetail> getHistoryDetailList() {
        return historyDetailList;
    }

    public void setHistoryDetailList(List<HistoryDetail> historyDetailList) {
        this.historyDetailList = historyDetailList;
    }

    public History() {
    }

}
