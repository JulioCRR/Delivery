package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FormaterDateAgenda {
    
    private static final Logger LOG = LoggerFactory.getLogger(FormaterDateAgenda.class);

    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-DD");
    SimpleDateFormat formatHr = new SimpleDateFormat("HH:mm");
    SimpleDateFormat formatDate1 = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat formatString = new SimpleDateFormat("dd/MM/yy");
    SimpleDateFormat formIN = new SimpleDateFormat("dd/MM");
    SimpleDateFormat formatParseDate = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
   
    
     public Date getMonthCalendar(String fecha) {
         Date dateCalendar=validaMesCalendario(fecha);
         return dateCalendar;
     }
    
    public boolean validarMesFront(Date fechaCalendarFront, Date fechaSolicitu) {
        Calendar fechaFront = getCalendarIns();
        Calendar fechaSol = getCalendarIns();
        fechaFront.setTime(fechaCalendarFront);
        fechaSol.setTime(fechaSolicitu);
        return fechaFront.get(Calendar.MONTH) == fechaSol.get(Calendar.MONTH);
    }
    
    public Calendar getCalendarIns(){
     return Calendar.getInstance();
    } 
    
  
    
     public int getYear(String fecha){
         String[] yearSol = fecha.split("_");
         int nYear=Integer.parseInt(yearSol[1]);
        return nYear;
    }   
     
     public Date validaMesCalendario(String fecha){

        Calendar cal = Calendar.getInstance();
        if(fecha.contains(Constants.ENERO)){cal.set(getYear(fecha), 0, 1);}
        else if(fecha.contains(Constants.FEBRERO)){cal.set(getYear(fecha), 1, 1);}
        else if(fecha.contains(Constants.MARZO)){cal.set(getYear(fecha), 2, 1);}
        else if(fecha.contains(Constants.ABRIL)){cal.set(getYear(fecha), 3, 1);}
        else if(fecha.contains(Constants.MAYO)){cal.set(getYear(fecha), 4, 1);}
        else if(fecha.contains(Constants.JUNIO)){cal.set(getYear(fecha), 5, 1);}
        else if(fecha.contains(Constants.JULIO)){cal.set(getYear(fecha), 6, 1);}
        else if(fecha.contains(Constants.AGOSTO)){cal.set(getYear(fecha), 7, 1);}
        else if(fecha.contains(Constants.SEP)){cal.set(getYear(fecha), 8, 1);}
        else if(fecha.contains(Constants.OCT)){cal.set(getYear(fecha), 9, 1);}
        else if(fecha.contains(Constants.NOV)){cal.set(getYear(fecha), 10, 1);}
        else if(fecha.contains(Constants.DIC)){cal.set(getYear(fecha), 11, 1);}
        return cal.getTime();
    }
     
         
     public Date validaFechaFinal(Date date){
        Calendar cal = Calendar.getInstance();
        LocalDate i = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int y=i.getYear();
        int m=i.getMonthValue();
        int dia=30;
        switch (i.lengthOfMonth()) {
            case 31:
                dia=31;
                break;
            case 29:
                dia=29;
                break;
            case 28:
                dia=28;
                break;
            default:
                break;
        }
        
        cal.set(y,m-1,dia);
        return cal.getTime();
    }
     
    
    
    public Date formatF(String d) throws ParseException {
          Date dateTime = formatDate1.parse(d);
          return dateTime;
     }
     
    
    
    public Date formatDiasFestivos(Date hora) throws ParseException {
        String fecha = formIN.format(hora);
        Date dateTime = formIN.parse(fecha);
        return dateTime;
    }
    
    
     public Date formatDias(String f) throws ParseException {
        String fecha = formIN.format(f);
        Date dateTime = formIN.parse(fecha);
        return dateTime;
    }
    

    public Date formatStringDate(Date hora) throws ParseException {
        String fecha = formatDate.format(hora);
        Date dateTime = formatDate.parse(fecha);
        return dateTime;
    }

    public String formatDateString(Date hora) throws ParseException {
        String fecha = formatString.format(hora);        
        return fecha;
    }

    public String formatDateLess(Date fecha) {
        String fechaIni = formatDate1.format(fecha);
        return fechaIni;
    }

    public String formatHr(Date hora) {
        String datePeticion = formatHr.format(hora);
        return datePeticion;
    }

   
    
    public int validaFechas(Date inicial, Date fn) {
        LocalDate i = inicial.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate f = fn.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return f.getDayOfYear() - i.getDayOfYear() + 1;
    }

    public Date modificarDia(Date inicial, int dias) {
        Date nuevaFecha = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(inicial);
        cal.add(Calendar.DATE, dias);
        nuevaFecha = cal.getTime();
        return nuevaFecha;
    }

    public String getDay(Date date) {
        String diaSemana = null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int dia = cal.get(Calendar.DAY_OF_WEEK);
        switch (dia) {
            case 7:
                diaSemana = "Sabado";
                break;
            case 1:
                diaSemana = "Domingo";
                break;
            default:
                diaSemana = "otro dia de la semana";
                break;
        }

        return diaSemana;
    }

}
