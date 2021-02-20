package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions;

/**
 *
 * @author VI9XXI3
 */
public class InvalidCharactersException extends CTGValidationException {

    public InvalidCharactersException(String message) {
        super(message);
    }

    public InvalidCharactersException(String message, Throwable cause) {
        super(message, cause);
    }

}
