package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kCatUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.AplicativoTelcel;

/**
 *
 * @author Juan
 */
public class PeticionProperties {

    private List<M2kCatUsuarios> listM2kCatUsuarios;
    private List<M2kCatTransaccionesFront> listM2kCatTransaccionesFront;
    private List<Area> listArea;
    private UsuarioProperties usuarioProperties;
    private List<AplicativoTelcel> listAplicativo;

    public List<M2kCatUsuarios> getListM2kCatUsuarios() {
        return listM2kCatUsuarios;
    }

    public void setListM2kCatUsuarios(List<M2kCatUsuarios> listM2kCatUsuarios) {
        this.listM2kCatUsuarios = listM2kCatUsuarios;
    }

    public List<M2kCatTransaccionesFront> getListM2kCatTransaccionesFront() {
        return listM2kCatTransaccionesFront;
    }

    public void setListM2kCatTransaccionesFront(List<M2kCatTransaccionesFront> listM2kCatTransaccionesFront) {
        this.listM2kCatTransaccionesFront = listM2kCatTransaccionesFront;
    }

    public List<Area> getListArea() {
        return listArea;
    }

    public void setListArea(List<Area> listArea) {
        this.listArea = listArea;
    }

    public UsuarioProperties getUsuarioProperties() {
        return usuarioProperties;
    }

    public void setUsuarioProperties(UsuarioProperties usuarioProperties) {
        this.usuarioProperties = usuarioProperties;
    }

    public List<AplicativoTelcel> getListAplicativo() {
        return listAplicativo;
    }

    public void setListAplicativo(List<AplicativoTelcel> listAplicativo) {
        this.listAplicativo = listAplicativo;
    }

    @Override
    public String toString() {
        return "PeticionProperties{" + "listM2kCatUsuarios=" + listM2kCatUsuarios + ", listM2kCatTransaccionesFront=" + listM2kCatTransaccionesFront + ", listArea=" + listArea + ", usuarioProperties=" + usuarioProperties + ", listAplicativoTelcel=" + listAplicativo + '}';
    }
}
