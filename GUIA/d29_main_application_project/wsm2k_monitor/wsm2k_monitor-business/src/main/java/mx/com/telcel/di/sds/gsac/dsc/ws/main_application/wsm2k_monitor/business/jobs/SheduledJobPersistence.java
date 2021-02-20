/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 *
 * @author VI9XXG0
 */
public class SheduledJobPersistence extends QuartzJobBean{
    
    private BitacoraBatch bitacoraBatch;
    
    @Override
    protected void executeInternal(JobExecutionContext arg0)throws JobExecutionException {
        bitacoraBatch.guardaRegistros();
    }

    public BitacoraBatch getBitacoraBatch() {
        return bitacoraBatch;
    }

    public void setBitacoraBatch(BitacoraBatch bitacoraBatch) {
        this.bitacoraBatch = bitacoraBatch;
    }
    
    
    
}
