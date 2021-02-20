
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.jobs;


import java.text.ParseException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation.CargadorPermisosWSM2K;
import org.joda.time.LocalDateTime;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;


public class ScheduledJobPermisosDesa extends QuartzJobBean {
    
    
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobPermisosDesa.class);
    
   
    private CargadorPermisosWSM2K procesoCar;
    
    public String InicioProceso;
    

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        
       
        InicioProceso=LocalDateTime.now().toString("dd/MM/yyyy hh:mm:ss");
       
        try {
             LOG.info("INICIO DEL PROCESO PARA GESTIONAR PERMISOS EN DESARROLLO  "+InicioProceso);
            procesoCar.inciarproceso();
             LOG.info("TERMINA PROCESO  PARA GESTIONAR PERMISOS EN DESARROLLO  "+InicioProceso);
        } catch (ParseException ex) {
           LOG.error("Error: " + ex);
        }
    }

    public CargadorPermisosWSM2K getProcesoCar() {
        return procesoCar;
    }

    public void setProcesoCar(CargadorPermisosWSM2K procesoCar) {
        this.procesoCar = procesoCar;
    }

    
   
 
}
