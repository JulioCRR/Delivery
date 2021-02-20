/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.SequenceGenerator;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;


@Entity
@Table(name = DBConstants.DB_PREF_CATALOG + "PUERTO")
public class CatPuerto implements Serializable {
    
    

    private static final long serialVersionUID = 1L;
    @Id
    @SequenceGenerator(name = DBConstants.DB_PREF_CATALOG + "PUERTO_SEQ", sequenceName = DBConstants.DB_PREF_CATALOG + "PUERTO_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CATALOG + "PUERTO_SEQ")
    @Column(name = "ID")
    private Integer id;
    
    
    @NotNull
    @Column(name = "NUM_PUERTO")
    @Size(max = 4)
    private Integer nPuerto;

  

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getnPuerto() {
        return nPuerto;
    }

    public void setnPuerto(Integer nPuerto) {
        this.nPuerto = nPuerto;
    }

 

    @Override
    public String toString() {
        return "CatPuerto{" + "idPuerto=" + id + ", nPuerto=" + nPuerto+"}"  ;
    }
    
    
}
