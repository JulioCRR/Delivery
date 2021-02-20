package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.Job;

import java.text.ParseException;
import java.util.logging.Level;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch.ProcessBatch;
import org.joda.time.LocalDateTime;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;


/**
 *
 * @author bermudezja
 * 
 */
  
public class ScheduledJobProcesoBatch extends QuartzJobBean {
    
  private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobProcesoBatch.class);
  
    private ProcessBatch procesoBatch;
    public String InicioProceso;
    


    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
       InicioProceso=LocalDateTime.now().toString("dd/MM/yyyy hh:mm");
       LOG.info("SE EJECUTA PROCESO BATCH: " + InicioProceso);
      try {
          procesoBatch.ejecutarProceso();
      } catch (ParseException ex) {
          java.util.logging.Logger.getLogger(ScheduledJobProcesoBatch.class.getName()).log(Level.SEVERE, null, ex);
      }
       LOG.info("TERMINA PROCESO BATCH: " + LocalDateTime.now().toString("dd/MM/yyyy hh:mm  ")+">>>>> INICIO DEL PROCESO:" + InicioProceso);
    }

    public ProcessBatch getProcesoBatch() {
        return procesoBatch;
    }

    public void setProcesoBatch(ProcessBatch procesoBatch) {
        this.procesoBatch = procesoBatch;
    }
      
}

