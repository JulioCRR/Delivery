package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;

/**
 *
 * @author Juan
 */
public class WrapSolicitudPeticion {

    private SolicitudPeticion solicitudPeticion;
    private List<Peticion> listPeticion;

    public SolicitudPeticion getSolicitudPeticion() {
        return solicitudPeticion;
    }

    public void setSolicitudPeticion(SolicitudPeticion solicitudPeticion) {
        this.solicitudPeticion = solicitudPeticion;
    }

    public List<Peticion> getListPeticion() {
        return listPeticion;
    }

    public void setListPeticion(List<Peticion> listPeticion) {
        this.listPeticion = listPeticion;
    }

    @Override
    public String toString() {
        return "WrapSolicitudPeticion{" + "solicitudPeticion=" + solicitudPeticion + ", listPeticion=" + listPeticion + '}';
    }

}
