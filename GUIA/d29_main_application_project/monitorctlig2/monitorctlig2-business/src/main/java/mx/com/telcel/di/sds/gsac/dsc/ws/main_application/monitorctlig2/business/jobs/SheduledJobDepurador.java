package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.jobs;

import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SheduledJobDepurador {

    private final static int INTERVAL = 1;
    private static final Logger LOG = LoggerFactory.getLogger(SheduledJobDepurador.class);

    @Autowired
    private DepuradorColasJob depuradorColasJob;

    //@Scheduled(cron = "0/5 * * * * ?")
    @Scheduled(cron = "0 0/" + INTERVAL + " * * * ?") //COMENTADO POR JULIO
    protected void executeInternal() {
        LOG.info("Validacion de timer: " + LocalDateTime.now().toString("dd/MM/yyyy hh:mm"));
        depuradorColasJob.depuraColas();

    }

}
