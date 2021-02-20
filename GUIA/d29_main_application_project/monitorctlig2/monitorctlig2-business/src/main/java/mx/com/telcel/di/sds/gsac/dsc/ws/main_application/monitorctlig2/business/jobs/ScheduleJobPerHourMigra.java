package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.jobs;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 *
 * @author Roberto Sánchez
 */
public class ScheduleJobPerHourMigra extends QuartzJobBean{

    private ReinicioMigraPorHora reinicioMigraPorHora;
    
    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException{
        Date now= new Date();
        try {
            reinicioMigraPorHora.ejecutarReinicioMigra();
            System.out.println("<<<<=======================LA TRANSACCIÓN FUE REALIZADA CORRECTAMENTE============================================>>>>>>>>>");
            System.out.println("=====================CRON MIGRA EJECUTADO CORRECTAMENTE===========================>>>>>>>>>> HORA DE EJECUCIÓN : "+now.getHours()+":0"+now.getMinutes()+":"+now.getSeconds());
        } catch (Exception ex) {
            Logger.getLogger(ScheduleJobPerHourMigra.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void setReinicioMigraPorHora(ReinicioMigraPorHora reinicioMigraPorHora){
        this.reinicioMigraPorHora=reinicioMigraPorHora;
    }
    
    
}
