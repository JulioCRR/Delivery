package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

@Entity
@Table(name = DBConstants.DB_PREF + "FECHAS_RESERVADAS")
public class FechasReservadas implements Serializable {

    private static final long serialVersionUID = 1L;

     @Id
    @SequenceGenerator(name = DBConstants.DB_PREF + "FECHAS_RESERVADAS_SEQ", 
            sequenceName = DBConstants.DB_PREF + "FECHAS_RESERVADAS_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF + "FECHAS_RESERVADAS_SEQ")
    @Column(name = "ID")
    private int id;
    

    @NotNull
    @Column(name = "FECHA_INICIO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicio;

    @NotNull
    @Column(name = "FECHA_FINAL")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFinal;
    
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_FOLIO")
    private AgendaDesarrolloWSM2K agenda; 

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    
    public AgendaDesarrolloWSM2K getAgenda() {
        return agenda;
    }

    public void setAgenda(AgendaDesarrolloWSM2K agenda) {
        this.agenda = agenda;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    
}
    
    

