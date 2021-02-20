/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.SEQUENCE;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.common.DBConstants;

/**
 *
 * @author VI9XXG0
 */
@Entity
@Table(name="D29_CRE_INCIDENCIAS")

public class IncidenciaEntity implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name="ID")
    @SequenceGenerator(name = DBConstants.DB_PREF_CORE + "INCIDENCIAS_SEQ", sequenceName = DBConstants.DB_PREF_CORE + "INCIDENCIAS_SEQ", initialValue=70, allocationSize=1)
    @GeneratedValue(strategy = SEQUENCE, generator = DBConstants.DB_PREF_CORE + "INCIDENCIAS_SEQ" )
    private int id;
    
    @Column(name="MENSAJE")
    private String mensaje;
    
    @Column(name="INTERVALO_ANALISIS")
    private int intervaloTiempo;
    
    @Column(name="MAXIMO_UMBRAL")
    private int maximoUmbralErrores;
    
    @Column(name="TIPO_BUSQUEDA")
    private String tipoBusqueda;
    
    @Column(name="DESTINATARIOS_ALERTAS")
    private String destinatariosAlertas;

    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public int getIntervaloTiempo() {
        return intervaloTiempo;
    }

    public void setIntervaloTiempo(int intervaloTiempo) {
        this.intervaloTiempo = intervaloTiempo;
    }

    public int getMaximoUmbralErrores() {
        return maximoUmbralErrores;
    }

    public void setMaximoUmbralErrores(int maximoUmbralErrores) {
        this.maximoUmbralErrores = maximoUmbralErrores;
    }

    public String getTipoBusqueda() {
        return tipoBusqueda;
    }

    public void setTipoBusqueda(String tipoBusqueda) {
        this.tipoBusqueda = tipoBusqueda;
    }

    public String getDestinatariosAlertas() {
        return destinatariosAlertas;
    }

    public void setDestinatariosAlertas(String destinatariosAlertas) {
        this.destinatariosAlertas = destinatariosAlertas;
    }

    @Override
    public String toString() {
        return "Incidencia{" + "id=" + id + ", mensaje=" + mensaje + ", intervaloTiempo=" + intervaloTiempo + ", maximoUmbralErrores=" + maximoUmbralErrores + ", tipoBusqueda=" + tipoBusqueda + ", destinatariosAlertas=" + destinatariosAlertas + '}';
    }
    
    
    
}
