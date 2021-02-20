package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Juan
 */
public class EnumUtils {

    private static final List<Integer> LIST_SOLICITUD_ACTIVE = new ArrayList<>();
    private static final List<Integer> LIST_SOLICITUD_INACTIVE = new ArrayList<>();
    private static final List<Integer> LIST_AMBIENTE_DEV = new ArrayList<>();
    private static final List<Integer> LIST_AMBIENTE_PROD = new ArrayList<>();
    private static final List<Integer> LIST_AUTORIZADOR_PROD = new ArrayList<>();
    private static final List<Integer> LIST_AUTORIZADOR_DEV = new ArrayList<>();

    public static List<Integer> getListEstatusSolicitudActive() {
        if (LIST_SOLICITUD_ACTIVE.isEmpty()) {
            LIST_SOLICITUD_ACTIVE.add(EnumEstatus.REVISION.value);
            LIST_SOLICITUD_ACTIVE.add(EnumEstatus.AUTORIZADA.value);
            LIST_SOLICITUD_ACTIVE.add(EnumEstatus.URGENTE.value);
        }
        return LIST_SOLICITUD_ACTIVE;
    }

    public static List<Integer> getListEstatusSolicitudInactive() {
        if (LIST_SOLICITUD_INACTIVE.isEmpty()) {
            LIST_SOLICITUD_INACTIVE.add(EnumEstatus.RECHAZADA.value);
            LIST_SOLICITUD_INACTIVE.add(EnumEstatus.CANCELADA.value);
            LIST_SOLICITUD_INACTIVE.add(EnumEstatus.EXPIRADA.value);
            LIST_SOLICITUD_INACTIVE.add(EnumEstatus.ELIMINADA.value);
        }
        return LIST_SOLICITUD_INACTIVE;
    }

    public static List<Integer> getListAmbienteProd() {
        if (LIST_AMBIENTE_PROD.isEmpty()) {
            LIST_AMBIENTE_PROD.add(EnumAmbiente.PROD.value);
            LIST_AMBIENTE_PROD.add(EnumAmbiente.SICATEL.value);
        }
        return LIST_AMBIENTE_PROD;
    }

    public static List<Integer> getListAmbienteDev() {
        if (LIST_AMBIENTE_DEV.isEmpty()) {
            LIST_AMBIENTE_DEV.add(EnumAmbiente.DEV.value);
        }
        return LIST_AMBIENTE_DEV;
    }

    public static List<Integer> getListAutorizadorProd() {
        if (LIST_AUTORIZADOR_PROD.isEmpty()) {
            LIST_AUTORIZADOR_PROD.add(EnumNivelAutorizador.GERENTE.value);
            LIST_AUTORIZADOR_PROD.add(EnumNivelAutorizador.JEFE.value);
        }
        return LIST_AUTORIZADOR_PROD;
    }

    public static List<Integer> getListAutorizadorDev() {
        if (LIST_AUTORIZADOR_DEV.isEmpty()) {
            LIST_AUTORIZADOR_DEV.add(EnumNivelAutorizador.GERENTE.value);
        }
        return LIST_AUTORIZADOR_DEV;
    }

    public static List<Integer> getAmbienteByNivelAutorizador(Integer nivel) {
        List<Integer> listNivel = new ArrayList<>();
        if (getListAutorizadorProd().contains(nivel)) {
            listNivel.addAll(getListAmbienteProd());
        }
        if (getListAutorizadorDev().contains(nivel)) {
            listNivel.addAll(getListAmbienteDev());
        }
        return listNivel;
    }

    public static List<Integer> getListAmbienteByAmbiente(Integer ambiente) {
        if (getListAmbienteProd().contains(ambiente)) {
            return LIST_AMBIENTE_PROD;
        }
        if (getListAmbienteDev().contains(ambiente)) {
            return LIST_AMBIENTE_DEV;
        }
        return null;
    }

    public static String getEstatusSolicitud(Integer estatus) {
        for (EnumEstatus enumEstatus : EnumEstatus.values()) {
            if (enumEstatus.value.equals(estatus)) {
                return enumEstatus.name();
            }
        }
        return null;
    }

    public static String getAmbienteSolicitud(Integer ambiente) {
        for (EnumAmbiente enumAmbiente : EnumAmbiente.values()) {
            if (enumAmbiente.value.equals(ambiente)) {
                return enumAmbiente.label;
            }
        }
        return null;
    }

}
