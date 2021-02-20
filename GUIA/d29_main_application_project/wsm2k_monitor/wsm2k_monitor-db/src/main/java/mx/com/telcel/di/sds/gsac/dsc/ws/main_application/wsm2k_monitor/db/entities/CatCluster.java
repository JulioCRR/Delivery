
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
@Table(name = DBConstants.DB_PREF_CATALOG + "CLUSTER")
public class CatCluster implements Serializable {
    
   
    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "CLUSTER_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "CLUSTER_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "CLUSTER_SEQ")
    @Column(name = "ID")
    private Integer id;
    
    
    @NotNull
    @Column(name = "NOM_CLUSTER")
    @Size(max = 100)
    private String  nCluster;

    
    @Column(name = "DESCRIPCION")
    @Size(max = 255)
    private String  descripcion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getnCluster() {
        return nCluster;
    }

    public void setnCluster(String nCluster) {
        this.nCluster = nCluster;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return "CatCluster{" + "id=" + id + ", nCluster=" + nCluster + 
                ", descripcion=" + descripcion + '}';
    }
         
}
