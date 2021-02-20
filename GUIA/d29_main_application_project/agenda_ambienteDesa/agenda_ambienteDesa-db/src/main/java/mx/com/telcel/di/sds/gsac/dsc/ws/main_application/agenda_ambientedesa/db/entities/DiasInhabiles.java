package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

@Entity
@Table(name = DBConstants.DB_PREF_CATALOG + "DIAS_INHABILES")
public class DiasInhabiles implements Serializable {

    private static final long serialVersionUID = 1L;

     @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "DIAS_INHABILES_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "DIAS_INHABILES_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "DIAS_INHABILES_SEQ")
    @Column(name = "ID")
    private int id;
   
    @Column(name = "DIA_INHABIL",unique = true)
    @Temporal(TemporalType.DATE)
    private Date diaInhabil;

    public Date getDiaInhabil() {
        return diaInhabil;
    }

    public void setDiaInhabil(Date diaInhabil) {
        this.diaInhabil = diaInhabil;
    }
    
    public long getDiaInhabilTime() {
        return diaInhabil.getTime();
    }

    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    } 
    
}
    
    

