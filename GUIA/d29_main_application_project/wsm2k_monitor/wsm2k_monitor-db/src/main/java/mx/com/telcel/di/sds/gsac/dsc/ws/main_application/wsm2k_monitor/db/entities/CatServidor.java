
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import java.io.Serializable;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

@Entity
@Table(name = DBConstants.DB_PREF_CATALOG + "SERVIDOR")
public class CatServidor implements Serializable{
     
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "SERVIDOR_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "HOST_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "SERVIDOR_SEQ")
    @Column(name = "ID")
    private Integer id;
    
    @NotNull
    @Column(name = "SERVIDOR")
    @Size(max = 20)
    private String nServidor;
    
    
    @JoinColumn(name = "ID_CLUSTER", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private CatCluster catCluster;

    

    public CatCluster getCatCluster() {
        return catCluster;
    }

    public void setCatCluster(CatCluster catCluster) {
        this.catCluster = catCluster;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getnServidor() {
        return nServidor;
    }

    public void setnServidor(String nServidor) {
        this.nServidor = nServidor;
    }   
}
