package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common;

/**
 *
 * @author Juan
 */
public enum EnumAmbiente {
    PROD(0, "PRODUCCIÓN"),
    DEV(1, "DESARROLLO"),
    SICATEL(2, "SICATEL");

    public final String label;
    public final Integer value;

    private EnumAmbiente(Integer value, String label) {
        this.value = value;
        this.label = label;
    }
}
