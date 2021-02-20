
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

@Entity
@Table(name = DBConstants.DB_PREF_CATALOG + "INSTANCIA")
public class CatInstancia implements Serializable {
    
    @JsonIgnore
    public static final Short INHABILITADA=0;
    
    @JsonIgnore
    public static final Short HABILITADA=1;
    

    private static final long serialVersionUID = 1L;
    
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "INSTANCIA_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "INSTANCIA_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "INSTANCIA_SEQ")
    @Column(name = "ID")
    private Integer id;
    
    @Size(max = 255)
    @Column(name = "INSTANCIA")
    private String nInstancia;
    
    @NotNull
    @Column(name = "FECHA_MODIFICACION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaModificacion;
    
    
    @Column(name = "HABILITADA")
    private Short habilitada;
      
    
    @JoinColumn(name = "ID_PUERTO", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private CatPuerto catPuerto;
    
    @JoinColumn(name = "ID_SERVIDOR", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private CatServidor catServidor;
    
    @Size(max = 20)
    @JoinColumn(name = "GRUPO_REGIONES", referencedColumnName = "ID")
    @ManyToOne(fetch = FetchType.EAGER)
    private CatRegiones catRegiones;


  
    public CatPuerto getCatPuerto() {
        return catPuerto;
    }

    public void setCatPuerto(CatPuerto catPuerto) {
        this.catPuerto = catPuerto;
    }

    
    public CatServidor getCatServidor() {
        return catServidor;
    }

    public void setCatServidor(CatServidor catServidor) {
        this.catServidor = catServidor;
    }

   
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getnInstancia() {
        return nInstancia;
    }

    public void setnInstancia(String nInstancia) {
        this.nInstancia = nInstancia;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public Short getHabilitada() {
        return habilitada;
    }

    public void setHabilitada(Short habilitada) {
        this.habilitada = habilitada;
    }

    public CatRegiones getCatRegiones() {
        return catRegiones;
    }

    public void setCatRegiones(CatRegiones catRegiones) {
        this.catRegiones = catRegiones;
    }

    @Override
    public String toString() {
        return "CatInstancia{" + "id=" + id + ", nInstancia=" + nInstancia +  
                ", fechaModificacion=" + fechaModificacion + ", habilitada=" + 
                habilitada + ", catPuerto=" + catPuerto + ", catServidor=" + 
                catServidor + ", catRegiones=" + catRegiones + '}';
    }
 
   
}
