package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common;

/**
 *
 * @author Juan
 */
public enum EnumNivelAutorizador {
    GERENTE(1),
    JEFE(2),
    SUPERVISOR(3);

    public final Integer value;

    private EnumNivelAutorizador(Integer value) {
        this.value = value;
    }
}
