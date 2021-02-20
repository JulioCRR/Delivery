package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.common;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;

/**
 *
 * @author Juan
 */
public class Constants {

    public static final String BASE_NAME = "peticiones-ws";
    public static final String BASE_NAME_PATH = BASE_NAME + "/";
    public static final String PATH_REST = BusinessConstants.BASE_PATH_INIT_REST + BASE_NAME_PATH;
    public static final String PATH_REST_SEARCH = PATH_REST + "search/";

    public static final String BASE_RESOURCES_PATH = "peticiones_ws/";

    public static final String TOPIC_KEY_ACCION = "accion";
    public static final String TOPIC_KEY_LIST_PETICION_ID = "listPeticionId";
    public static final String JSON_KEY_MESSAGE = "message";
}
