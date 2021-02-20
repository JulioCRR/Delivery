package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions.CTGValidationException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions.InvalidCharactersException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.exceptions.ReservedWordsException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesXMLImp;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 *
 * @author VI9XXI3
 */
@Component
public class ValidationService {

    public static final int TYPE_REQUEST = 0;
    public static final int TYPE_RESPONSE = 1;
    private static final char[] INVALID_CHARS = {'<', '>', '"', '\'', '&', '!', '¡', '?', '¿', ':', '|'};
    private static final String[] RESERVED_WORDS = {"ESTATUS", "MENSAJE", "PROGRAMA"};
    private static final Pattern CONTROL_CHARS_PATTERN = Pattern.compile("[\\x00-\\x1F]");

    public boolean isValidCTGText(String text) throws InvalidCharactersException {
        return isValidCTGText(text, TYPE_REQUEST);
    }

    public boolean isValidCTGText(String text, int type) throws InvalidCharactersException {
        String textType = (type == TYPE_REQUEST ? "informacion enviada al CTG" : "respuesta del programa");
        if (StringUtils.isBlank(text)) {
            throw new InvalidCharactersException("La " + textType + " esta vacia");
        }

        if (CONTROL_CHARS_PATTERN.matcher(text).find()) {
            throw new InvalidCharactersException("Se detectaron caracteres no reconocidos o especiales en la " + textType);
        }

        int invCharPos;
        for (char invChar : INVALID_CHARS) {
            invCharPos = text.indexOf("" + invChar);
            if (invCharPos > -1) {
                throw new InvalidCharactersException("Se detecto el caracter no valido (" + invChar + ") en la posicion " + (invCharPos + 1) + " en la " + textType);
            }
        }
        return true;
    }

    public boolean hasReservedCTGWords(List<String> campos) throws ReservedWordsException {
        for (String word : RESERVED_WORDS) {
            if (Collections.frequency(campos, word) > 1) {
                throw new ReservedWordsException("Se detecto el uso de la palabra reservada (" + word + ") como un campo de la respuesta del CTG");
            }
        }
        return false;
    }

    public boolean isValidCTGOutput(UtilidadesXMLImp xmlUtils) throws CTGValidationException {
        List<String> campos = new ArrayList<>();
        for (String[] data : xmlUtils.getDataList()) {
            campos.add(data[0].trim().toUpperCase());
        }

        isValidCTGText(xmlUtils.getCleanCTG(), TYPE_RESPONSE);
        hasReservedCTGWords(campos);
        return true;
    }
}
