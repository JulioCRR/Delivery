/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import static mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions.formatXML;

/**
 *
 * @author vi9xxeg
 */
@Entity
@Table(name = "m2k_rel_accion_transaccion_front")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "M2kRelAccionTransaccionFront.findAll", query = "SELECT m FROM M2kRelAccionTransaccionFront m"),
    @NamedQuery(name = "M2kRelAccionTransaccionFront.findByIdTransaccion", query = "SELECT m FROM M2kRelAccionTransaccionFront m WHERE m.m2kRelAccionTransaccionFrontPK.idTransaccion = :idTransaccion"),
    @NamedQuery(name = "M2kRelAccionTransaccionFront.findByIdAccion", query = "SELECT m FROM M2kRelAccionTransaccionFront m WHERE m.m2kRelAccionTransaccionFrontPK.idAccion = :idAccion"),
    @NamedQuery(name = "M2kRelAccionTransaccionFront.findByFechaCreacion", query = "SELECT m FROM M2kRelAccionTransaccionFront m WHERE m.fechaCreacion = :fechaCreacion"),
    @NamedQuery(name = "M2kRelAccionTransaccionFront.findByFechaUltimaModificacion", query = "SELECT m FROM M2kRelAccionTransaccionFront m WHERE m.fechaUltimaModificacion = :fechaUltimaModificacion")})
public class M2kRelAccionTransaccionFront implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @EmbeddedId
    protected M2kRelAccionTransaccionFrontPK m2kRelAccionTransaccionFrontPK;

    @Column(name = "request")
    private String request;

    @Column(name = "response_exitoso")
    private String responseExitoso;

    @Column(name = "respones_error_m2k")
    private String responesErrorM2k;

    @Column(name = "response_error_mob")
    private String responseErrorMob;

    @Column(name = "fecha_creacion")
    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;
    
    @Column(name = "fecha_ultima_modificacion")
    @Temporal(TemporalType.DATE)
    private Date fechaUltimaModificacion;
    
    @JoinColumn(name = "id_transaccion", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private M2kCatTransaccionesFront m2kCatTransaccionesFront;
    
    @JoinColumn(name = "id_accion", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private M2kCatAccion m2kCatAccion;

    public M2kRelAccionTransaccionFront() {
    }

    public M2kRelAccionTransaccionFront(M2kRelAccionTransaccionFrontPK m2kRelAccionTransaccionFrontPK) {
        this.m2kRelAccionTransaccionFrontPK = m2kRelAccionTransaccionFrontPK;
    }

    public M2kRelAccionTransaccionFront(M2kRelAccionTransaccionFrontPK m2kRelAccionTransaccionFrontPK, String request, Date fechaCreacion) {
        this.m2kRelAccionTransaccionFrontPK = m2kRelAccionTransaccionFrontPK;
        this.request = request;
        this.fechaCreacion = fechaCreacion;
    }

    public M2kRelAccionTransaccionFront(int idTransaccion, int idAccion) {
        this.m2kRelAccionTransaccionFrontPK = new M2kRelAccionTransaccionFrontPK(idTransaccion, idAccion);
    }

    public M2kRelAccionTransaccionFrontPK getM2kRelAccionTransaccionFrontPK() {
        return m2kRelAccionTransaccionFrontPK;
    }

    public void setM2kRelAccionTransaccionFrontPK(M2kRelAccionTransaccionFrontPK m2kRelAccionTransaccionFrontPK) {
        this.m2kRelAccionTransaccionFrontPK = m2kRelAccionTransaccionFrontPK;
    }

    public String getRequest() {
        if (request != null && !request.equals("")) {
            return formatXML(request);
        } else {
            return request;
        }
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getResponseExitoso() {
        
        if (responseExitoso != null && !responseExitoso.equals("")) {
            return formatXML(responseExitoso);
        } else {
            return responseExitoso; 
        }
        
    }

    public void setResponseExitoso(String responseExitoso) {
        this.responseExitoso = responseExitoso;
    }

    public String getResponesErrorM2k() {

        if (responesErrorM2k != null && !responesErrorM2k.equals("")) {
            return formatXML(formatXML(responesErrorM2k));
        } else {
            return responesErrorM2k; 
        }
 
    }

    public void setResponesErrorM2k(String responesErrorM2k) {
        this.responesErrorM2k = responesErrorM2k;
    }

    public String getResponseErrorMob() {
        
        if (responseErrorMob != null && !responseErrorMob.equals("")) {
            return formatXML(responseErrorMob);
        } else {
            return responseErrorMob; 
        }
        
        
    }

    public void setResponseErrorMob(String responseErrorMob) {
        this.responseErrorMob = responseErrorMob;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaUltimaModificacion() {
        return fechaUltimaModificacion;
    }

    public void setFechaUltimaModificacion(Date fechaUltimaModificacion) {
        this.fechaUltimaModificacion = fechaUltimaModificacion;
    }

    public M2kCatTransaccionesFront getM2kCatTransaccionesFront() {
        return m2kCatTransaccionesFront;
    }

    public void setM2kCatTransaccionesFront(M2kCatTransaccionesFront m2kCatTransaccionesFront) {
        this.m2kCatTransaccionesFront = m2kCatTransaccionesFront;
    }

    public M2kCatAccion getM2kCatAccion() {
        return m2kCatAccion;
    }

    public void setM2kCatAccion(M2kCatAccion m2kCatAccion) {
        this.m2kCatAccion = m2kCatAccion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (m2kRelAccionTransaccionFrontPK != null ? m2kRelAccionTransaccionFrontPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof M2kRelAccionTransaccionFront)) {
            return false;
        }
        M2kRelAccionTransaccionFront other = (M2kRelAccionTransaccionFront) object;
        if ((this.m2kRelAccionTransaccionFrontPK == null && other.m2kRelAccionTransaccionFrontPK != null) || (this.m2kRelAccionTransaccionFrontPK != null && !this.m2kRelAccionTransaccionFrontPK.equals(other.m2kRelAccionTransaccionFrontPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFront[ m2kRelAccionTransaccionFrontPK=" + m2kRelAccionTransaccionFrontPK + " ]";
    }
    
}
