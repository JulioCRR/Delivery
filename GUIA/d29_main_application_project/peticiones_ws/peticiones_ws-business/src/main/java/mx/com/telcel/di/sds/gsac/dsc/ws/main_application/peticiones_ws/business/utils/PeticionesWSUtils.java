package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.utils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.dao.CatalogosDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.UserProfilerDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.dao.ServiciosInformixDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Area;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kCatUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.common.CoreUtilConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao.PeticionesWSAplicativoTelcelDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.AplicativoTelcel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author Juan
 */
@Component
public class PeticionesWSUtils {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSUtils.class);

    public static final List<M2kCatTransaccionesFront> LIST_TRANSACCION = new ArrayList<>();
    public static final List<String> LIST_REGION = new ArrayList<>();
    public static final List<M2kCatUsuarios> LIST_USUARIO_CORP = new ArrayList<>();
    public static final List<Area> LIST_AREA = new ArrayList<>();
    public static final List<AplicativoTelcel> LIST_APLICATIVO_TELCEL = new ArrayList<>();

    private static String jmsTopicName;

    @Autowired
    private CatalogosDao catDao;

    @Autowired
    private ServiciosInformixDao ifxDao;

    @Autowired
    private UserProfilerDao userProfilerDao;

    @Autowired
    private PeticionesWSAplicativoTelcelDao aplicativoTelcelDao;

    @PostConstruct
    public void initUtils() throws Exception {
        createListUsuarioCorp();
        createListRegion();
        createListCatalogoTransaccion();
        createListArea();
        createListAplicativoTelcel();
    }

    public void createListUsuarioCorp() throws Exception {
        List<M2kCatUsuarios> lista = ifxDao.getAllM2kCatUsuarios();
        if (lista != null && !lista.isEmpty()) {
            LIST_USUARIO_CORP.clear();
            for (M2kCatUsuarios cat : lista) {
                if (StringUtils.isBlank(cat.getClaveUsuario())) {
                    continue;
                }
                cat.setClaveUsuario(cat.getClaveUsuario().trim().toUpperCase());
            }
            LIST_USUARIO_CORP.addAll(lista);
            LOG.info("Se cargaron usuarios corporativos: " + LIST_USUARIO_CORP.size());
        } else {
            throw new Exception("LISTA DE USUARIOS CORPORATIVOS ESTA VACIA");
        }
    }

    public void createListRegion() throws Exception {
        LIST_REGION.clear();
        for (int i = 1; i < 10; i++) {
            LIST_REGION.add(String.valueOf(i));
        }
    }

    public void createListCatalogoTransaccion() throws Exception {
        List<M2kCatTransaccionesFront> lista = catDao.getAllM2kCatTransaccionesFront();
        if (lista != null && !lista.isEmpty()) {
            LIST_TRANSACCION.clear();
            for (M2kCatTransaccionesFront transaccion : lista) {
                if (StringUtils.isBlank(transaccion.getTransaccion())) {
                    continue;
                }
                transaccion.setTransaccion(transaccion.getTransaccion().trim().toUpperCase());
                transaccion.setNombrePantalla(StringUtils.defaultIfBlank(transaccion.getNombrePantalla(), "SIN DEFINIR"));
            }
            LIST_TRANSACCION.addAll(lista);
            LOG.info("Se cargaron transacciones: " + LIST_TRANSACCION.size());
        } else {
            throw new Exception("LISTA DE TRANSACCIONES ESTA VACIA");
        }
    }

    public void createListArea() throws Exception {
        List<Area> lista = userProfilerDao.getAreas();
        if (lista != null && !lista.isEmpty()) {
            LIST_AREA.clear();
            LIST_AREA.addAll(lista);
        } else {
            throw new Exception("LISTA DE AREAS ESTA VACIA");
        }
    }

    public void createListAplicativoTelcel() throws Exception {
        List<AplicativoTelcel> lista = aplicativoTelcelDao.getAllAplicativoTelcel();
        if (lista != null && !lista.isEmpty()) {
            LIST_APLICATIVO_TELCEL.clear();
            LIST_APLICATIVO_TELCEL.addAll(lista);
        }
    }

    public static String toStringCatalogos() {
        return "PeticionesWSUtils{LIST_TRANSACCION=" + LIST_TRANSACCION.size() + ", LIST_REGION=" + LIST_REGION.size() + ", LIST_USUARIO_CORP=" + LIST_USUARIO_CORP.size() + ", LIST_AREA=" + LIST_AREA.size() + "}";
    }

    public static String getJmsTopicName() throws Exception {
        if (StringUtils.isBlank(jmsTopicName)) {
            jmsTopicName = CoreFunctions.getJMSProperty(CoreUtilConstants.PROP_PETICIONES_JMS_TOPIC_PUBLISHER);
        }
        return jmsTopicName;
    }

    public static String convertTopicData(Integer accion) {
        return convertTopicData(accion, null);
    }

    public static String convertTopicData(Integer accion, List<Long> listId) {
        if (accion == null) {
            return null;
        }
        JSONObject json = new JSONObject();
        json.put(Constants.TOPIC_KEY_ACCION, accion);
        if (listId != null && !listId.isEmpty()) {
            JSONArray jsonArray = new JSONArray();
            for (Long id : listId) {
                jsonArray.put(id);
            }
            json.put(Constants.TOPIC_KEY_LIST_PETICION_ID, jsonArray);
        }
        return json.toString();
    }

    public static Map<Long, Peticion> getMapIdPeticion(List<Peticion> listPeticion) {
        if (listPeticion == null || listPeticion.isEmpty()) {
            return null;
        }
        Map<Long, Peticion> mapIdPeticion = new LinkedHashMap<>();
        for (Peticion peticion : listPeticion) {
            if (peticion.getId() != null && peticion.getId() > 0) {
                mapIdPeticion.putIfAbsent(peticion.getId(), peticion);
            }
        }
        return mapIdPeticion;
    }

    public static String stringToJSONMessage(String message) {
        JSONObject json = new JSONObject();
        json.put(Constants.JSON_KEY_MESSAGE, StringUtils.trimToEmpty(message));
        return json.toString();
    }
}
