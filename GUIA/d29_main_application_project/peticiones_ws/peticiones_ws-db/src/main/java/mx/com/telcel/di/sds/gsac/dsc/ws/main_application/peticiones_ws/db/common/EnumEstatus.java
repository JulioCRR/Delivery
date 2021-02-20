package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.common;

/**
 *
 * @author Juan
 */
public enum EnumEstatus {
    REVISION(0),
    AUTORIZADA(1),
    RECHAZADA(2),
    CANCELADA(3),
    EXPIRADA(4),
    URGENTE(5),
    ELIMINADA(6),
    READ_DB(7),
    CHECK_SERVICE_ENABLED(8),
    ENABLE_SERVICE(9),
    DISABLE_SERVICE(10);

    public final Integer value;

    private EnumEstatus(Integer value) {
        this.value = value;
    }
}
