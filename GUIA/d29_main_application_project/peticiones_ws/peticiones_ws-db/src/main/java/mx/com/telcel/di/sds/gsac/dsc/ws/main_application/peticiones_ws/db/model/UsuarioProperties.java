package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.PeticionAutorizador;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.ResponsableUsuarioCorp;

/**
 *
 * @author Juan
 */
public class UsuarioProperties {

    private ResponsableUsuarioCorp respUsuCorp;
    private PeticionAutorizador autorizador;
    private boolean administrador;

    public ResponsableUsuarioCorp getRespUsuCorp() {
        return respUsuCorp;
    }

    public void setRespUsuCorp(ResponsableUsuarioCorp respUsuCorp) {
        this.respUsuCorp = respUsuCorp;
    }

    public PeticionAutorizador getAutorizador() {
        return autorizador;
    }

    public void setAutorizador(PeticionAutorizador autorizador) {
        this.autorizador = autorizador;
    }

    public boolean isAdministrador() {
        return administrador;
    }

    public void setAdministrador(boolean administrador) {
        this.administrador = administrador;
    }

    @JsonIgnore
    public boolean isAdminOrAutorizador() {
        return (administrador
                || autorizador != null);
    }

    @Override
    public String toString() {
        return "UserProperties{" + "responsable=" + respUsuCorp + ", autorizador=" + autorizador + ", administrador=" + administrador + '}';
    }

}
