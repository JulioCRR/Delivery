/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author vi9xxeg
 */
@Embeddable
public class M2kRelAccionTransaccionFrontPK implements Serializable {
    
//    @Basic(optional = false)
//    @NotNull
    @Column(name = "id_transaccion")
    private int idTransaccion;
    
//    @Basic(optional = false)
//    @NotNull
    @Column(name = "id_accion")
    private int idAccion;

    public M2kRelAccionTransaccionFrontPK() {
    }

    public M2kRelAccionTransaccionFrontPK(int idTransaccion, int idAccion) {
        this.idTransaccion = idTransaccion;
        this.idAccion = idAccion;
    }

    public int getIdTransaccion() {
        return idTransaccion;
    }

    public void setIdTransaccion(int idTransaccion) {
        this.idTransaccion = idTransaccion;
    }

    public int getIdAccion() {
        return idAccion;
    }

    public void setIdAccion(int idAccion) {
        this.idAccion = idAccion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idTransaccion;
        hash += (int) idAccion;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof M2kRelAccionTransaccionFrontPK)) {
            return false;
        }
        M2kRelAccionTransaccionFrontPK other = (M2kRelAccionTransaccionFrontPK) object;
        if (this.idTransaccion != other.idTransaccion) {
            return false;
        }
        if (this.idAccion != other.idAccion) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFrontPK[ idTransaccion=" + idTransaccion + ", idAccion=" + idAccion + " ]";
    }
    
}
