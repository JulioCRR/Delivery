
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;


@Entity
@Table(name = DBConstants.DB_PREF_CATALOG + "REGIONES")
public class CatRegiones implements Serializable {
    
   
    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "REGIONES_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "REGIONES_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "REGIONES_SEQ")
    @Column(name = "ID")
    private Integer id;
    
    
    @NotNull
    @Column(name = "GRUPO")
    @Size(max = 2)
    private String  nGrupo;

    
    @Column(name = "REGIONES")
    @Size(max = 12)
    private String  regiones;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getnGrupo() {
        return nGrupo;
    }

    public void setnGrupo(String nGrupo) {
        this.nGrupo = nGrupo;
    }

    public String getRegiones() {
        return regiones;
    }

    public void setRegiones(String regiones) {
        this.regiones = regiones;
    }

    @Override
    public String toString() {
        return "CatRegiones{" + "id=" + id + ", nGrupo=" + nGrupo + ", "
                + "regiones=" + regiones + '}';
    }      
}
