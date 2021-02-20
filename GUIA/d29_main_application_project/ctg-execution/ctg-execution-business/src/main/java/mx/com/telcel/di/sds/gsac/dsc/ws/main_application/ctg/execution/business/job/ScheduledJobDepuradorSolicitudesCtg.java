/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.job;

import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Component
public class ScheduledJobDepuradorSolicitudesCtg {
 
    private final static int INTERVAL = 2;
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobDepuradorSolicitudesCtg.class);

    @Autowired
    private JobDepuradorSolicitudesCtg depurador;

    //@Scheduled(cron = "0/5 * * * * ?")
    @Scheduled(cron = "0 0/" + INTERVAL + " * * * ?")
    protected void execute() {
        LOG.info("Depurando solicitudes CTG: " + LocalDateTime.now().toString("dd/MM/yyyy hh:mm"));
        depurador.depurar();
    }
    
}
