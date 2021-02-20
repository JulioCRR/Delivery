package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions;

/**
 *
 * @author VI9XXI3
 */
public class ReservedWordsException extends CTGValidationException {

    public ReservedWordsException(String message) {
        super(message);
    }

    public ReservedWordsException(String message, Throwable cause) {
        super(message, cause);
    }

}
