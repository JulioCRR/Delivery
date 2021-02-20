package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author Juan
 */
public class DBUtils {

    public static String normalizeText(String text) {
        if (StringUtils.isBlank(text)) {
            return "";
        }
        String output = StringUtils.trimToEmpty(text.replace("\r", " ").replace("\n", " ").replace("\r\n", " "));
        output = Normalizer.normalize(output, Normalizer.Form.NFKD).replaceAll("[^\\p{ASCII}]", "");
        return output;
    }

    public static boolean isEqualOrDefault(String text, String compareTo, String defaultText) {
        return isEqualOrDefault(text, compareTo, defaultText, false);
    }

    public static boolean isEqualOrDefault(String text, String compareTo, String defaultText, boolean both) {
        final String t1 = StringUtils.trimToEmpty(text).toUpperCase();
        final String t2 = StringUtils.trimToEmpty(compareTo).toUpperCase();
        final String td = StringUtils.trimToEmpty(defaultText).toUpperCase();
        if (t1.equals(t2)) {
            return true;
        }
        if (t1.equals(td)) {
            return true;
        }
        if (both) {
            return t2.equals(td);
        }
        return false;
    }

    public static boolean isPeticionEqualOrWildcardInDB(Peticion petOld, Peticion petNew) {
        if (petOld.equals(petNew)) {
            return true;
        }
        if (isEqualOrDefault(petOld.getIp(), petNew.getIp(), Peticion.WILDCARD)) {
            return (isEqualOrDefault(petOld.getUsuarioCorp(), petNew.getUsuarioCorp(), Peticion.WILDCARD)
                    && isEqualOrDefault(petOld.getRegion(), petNew.getRegion(), Peticion.WILDCARD)
                    && isEqualOrDefault(petOld.getTransaccion(), petNew.getTransaccion(), Peticion.WILDCARD));
        }
        return false;
    }

    public static Integer parseToInteger(String number) {
        if (StringUtils.isBlank(number)) {
            return null;
        }
        try {
            return Integer.parseInt(number);
        } catch (NumberFormatException ex) {
        }
        return null;
    }

    public static Long parseToLong(String number) {
        if (StringUtils.isBlank(number)) {
            return null;
        }
        try {
            return Long.parseLong(number);
        } catch (NumberFormatException ex) {
        }
        return null;
    }

    public static List<Long> getListSolUsuCorpId(List<SolicitudUsuarioCorp> listSolicitud) {
        if (listSolicitud == null || listSolicitud.isEmpty()) {
            return null;
        }
        List<Long> listId = new ArrayList<>();
        for (SolicitudUsuarioCorp solicitud : listSolicitud) {
            listId.add(solicitud.getId());
        }
        return listId;
    }

    public static List<Long> getListSolPeticionId(List<SolicitudPeticion> solicitud) {
        if (solicitud == null || solicitud.isEmpty()) {
            return null;
        }
        List<Long> listId = new ArrayList<>();
        for (SolicitudPeticion solPeticion : solicitud) {
            listId.add(solPeticion.getId());
        }
        return listId;
    }

    public static List<Long> getListPeticionId(List<Peticion> listPeticion) {
        if (listPeticion == null || listPeticion.isEmpty()) {
            return null;
        }
        List<Long> listId = new ArrayList<>();
        for (Peticion peticion : listPeticion) {
            if (peticion.getId() != null && peticion.getId() > 0) {
                listId.add(peticion.getId());
            }
        }
        return listId;
    }

    public static Map<String, Object> getFilteredColumnMap(String filters) {
        if (StringUtils.isBlank(filters)) {
            return null;
        }
        String[] arr = filters.split(Peticion.FILTER_SPLIT);
        if (arr.length != Peticion.HIBERNATE_QUERY_COLS.length) {
            return null;
        }
        Map<String, Object> mapCols = new HashMap<>();
        for (int i = 0; i < Peticion.HIBERNATE_QUERY_COLS.length; i++) {
            String data = StringUtils.trimToNull(arr[i].replace(Peticion.FILTER_NULL, ""));
            if (data != null) {
                switch (i) {
                    case 4: // PPM
                    case 5: // Ambiente
                    case 6: // Estatus
                        mapCols.put(Peticion.HIBERNATE_QUERY_COLS[i], parseToInteger(data));
                        break;
                    case 7: // SolicitudPeticion
                        SolicitudPeticion solicitud = new SolicitudPeticion(parseToLong(data));
                        mapCols.put(Peticion.HIBERNATE_QUERY_COLS[i], solicitud);
                        break;
                    default:
                        mapCols.put(Peticion.HIBERNATE_QUERY_COLS[i], data);
                }
            }
        }
        return mapCols;
    }

    public static Peticion getPeticionClone(Peticion clone) {
        if (clone == null) {
            return null;
        }
        Peticion peticion = new Peticion();
        peticion.clonePeticion(clone);
        return peticion;
    }

    public static boolean isSolPeticionEquals(SolicitudPeticion solPet1, SolicitudPeticion solPet2) {
        if (Objects.equals(solPet1, solPet2)) {
            return true;
        }
        Long id1 = (solPet1 != null ? solPet1.getId() : null);
        Long id2 = (solPet2 != null ? solPet2.getId() : null);
        return Objects.equals(id1, id2);
    }
}
