package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.converter;

import java.sql.Date;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.joda.time.LocalDate;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com/>
 */
@Converter(autoApply = true)
public class JodaLocalDateConverter implements AttributeConverter<LocalDate, Date> {

    private static final long serialVersionUID = 1L;

    @Override
    public Date convertToDatabaseColumn(LocalDate x) {
        return x == null ? null : new Date(x.toDate().getTime());
    }

    @Override
    public LocalDate convertToEntityAttribute(Date y) {
        return y == null ? null : new LocalDate(y.getTime());
    }
}
