
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.jobs;



import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation.BloqueoPermisos;
import org.joda.time.LocalDateTime;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;


public class ScheduledJoBloqueoPermisos extends QuartzJobBean {
    
    
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJoBloqueoPermisos.class);
    

    private BloqueoPermisos proceso;
    
    public String InicioProceso;
    

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        
       
        InicioProceso=LocalDateTime.now().toString("dd/MM/yyyy hh:mm:ss");
       
        LOG.info("INICIO DEL PROCESO PARA GESTIONAR PERMISOS EN DESARROLLO  "+InicioProceso);
        proceso.quitarPermisos();
        LOG.info("TERMINA PROCESO  PARA GESTIONAR PERMISOS EN DESARROLLO  "+InicioProceso);
    }

    public BloqueoPermisos getProceso() {
        return proceso;
    }

    public void setProceso(BloqueoPermisos proceso) {
        this.proceso = proceso;
    }
    
    

    public String getInicioProceso() {
        return InicioProceso;
    }

    public void setInicioProceso(String InicioProceso) {
        this.InicioProceso = InicioProceso;
    }

    
    
    
    

}
