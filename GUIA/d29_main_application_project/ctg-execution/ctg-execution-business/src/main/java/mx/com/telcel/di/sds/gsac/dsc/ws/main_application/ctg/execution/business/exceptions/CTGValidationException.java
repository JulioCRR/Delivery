package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions;

/**
 *
 * @author VI9XXI3
 */
public class CTGValidationException extends Exception {

    public CTGValidationException(String message) {
        super(message);
    }

    public CTGValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
