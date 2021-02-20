package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;

/**
 *
 * @author Juan
 */
public class WrapPeticion {

    private Usuario usuario;
    private boolean urgente;
    private int accion;
    private List<Peticion> listPeticion;
    private String filterQuery;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public boolean isUrgente() {
        return urgente;
    }

    public void setUrgente(boolean urgente) {
        this.urgente = urgente;
    }

    public int getAccion() {
        return accion;
    }

    public void setAccion(int accion) {
        this.accion = accion;
    }

    public List<Peticion> getListPeticion() {
        return listPeticion;
    }

    public void setListPeticion(List<Peticion> listPeticion) {
        this.listPeticion = listPeticion;
    }

    public String getFilterQuery() {
        return filterQuery;
    }

    public void setFilterQuery(String filterQuery) {
        this.filterQuery = filterQuery;
    }

    @Override
    public String toString() {
        return "WrapPeticion{" + "urgente=" + urgente + ", accion=" + accion + ", listPeticion=" + listPeticion + ", filterQuery=" + filterQuery + '}';
    }
}
