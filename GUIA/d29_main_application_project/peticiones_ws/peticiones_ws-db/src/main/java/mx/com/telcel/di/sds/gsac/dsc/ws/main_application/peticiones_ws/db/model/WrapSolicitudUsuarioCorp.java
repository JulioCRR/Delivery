package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.ResponsableUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;

/**
 *
 * @author Juan
 */
public class WrapSolicitudUsuarioCorp {

    private ResponsableUsuarioCorp respUsuCorp;
    private SolicitudUsuarioCorp solicitud;
    private int reporte;

    public ResponsableUsuarioCorp getRespUsuCorp() {
        return respUsuCorp;
    }

    public void setRespUsuCorp(ResponsableUsuarioCorp respUsuCorp) {
        this.respUsuCorp = respUsuCorp;
    }

    public SolicitudUsuarioCorp getSolicitud() {
        return solicitud;
    }

    public void setSolicitud(SolicitudUsuarioCorp solicitud) {
        this.solicitud = solicitud;
    }

    public int getReporte() {
        return reporte;
    }

    public void setReporte(int reporte) {
        this.reporte = reporte;
    }

    @Override
    public String toString() {
        return "WrapSolicitudUsuarioCorp{" + "responsable=" + respUsuCorp + ", solicitud=" + solicitud + '}';
    }

}
