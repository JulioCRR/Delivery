package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class FormaterDate {

    SimpleDateFormat formatYear = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat formatDay = new SimpleDateFormat("HH:mm");
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    SimpleDateFormat formatDate2 = new SimpleDateFormat("dd/MM/yy");

    public Date parseDate(Date fechaInicio, Date hora) throws ParseException {
        String fecha = formatYear.format(fechaInicio);
        String horaCov = formatDay.format(hora);
        String fechaCov = fecha + " " + horaCov + ":00";
        Date dateTime = formatDate.parse(fechaCov);
        return dateTime;
    }

    public String parselocalDate(Long bitacora) {
        Date datetime = new Date(bitacora);
        String dateBitacora = formatDate.format(datetime);
        return dateBitacora;
    }

    public String parseString(Date fechaPeticion2, Date horaIni, Date horaFinal, int valor) {
        if (valor == 1) {
            String fecha = formatYear.format(fechaPeticion2);
            String horaInc = formatDay.format(horaIni);
            String horaFin = formatDay.format(horaFinal);
            String fechaCov = fecha + " " + horaInc + " " + horaFin;
            return fechaCov;
        }
        String datePeticion = formatDate.format(fechaPeticion2);
        return datePeticion;
    }

    public String formatDateString(Date fecha) {
        String fechaIni = formatYear.format(fecha);
        return fechaIni;
    }

    public String formatStringDate(Date hora) {
        String datePeticion = formatDay.format(hora);
        return datePeticion;
    }

    public String formatStringDate2(Date hora) {
        String datePeticion2 = formatDate2.format(hora);
        return datePeticion2;
    }
}
