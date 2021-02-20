
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;



import java.time.LocalTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class ValidadorTiempo {
    
   private static final Logger LOG = LoggerFactory.getLogger(ValidadorTiempo.class);
    
    LocalTime time;
    LocalTime horaActual=LocalTime.now();


    public int validarHoraSolicitud() {
        int status = 2;
        if(horaActual.isAfter(getbloqueoPerm())){
            LOG.info("SE VALIDA FIN DE HORARIO DE EJECUCIÓN");
            status=4;
        }else if (horaActual.isAfter(getInicioTurno3())) {
             LOG.info("SE VALIDA EL TURNO DE LAS 3 DE LA TARDE");
            status = 3;
        }
        return status;
    }
    
    
    public LocalTime getInicioTurno3() {
         this.time = LocalTime.of(14,45);
        return time;
    }
    public LocalTime getbloqueoPerm(){
        this.time=LocalTime.of(18,45);
        return time;
    }
    
    }
