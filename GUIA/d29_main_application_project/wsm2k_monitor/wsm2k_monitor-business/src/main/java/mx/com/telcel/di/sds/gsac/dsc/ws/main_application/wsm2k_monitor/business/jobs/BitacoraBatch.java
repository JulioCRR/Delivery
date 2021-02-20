/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.AdministradorListaMensajes;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.BatchPersistencia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author VI9XXG0
 */
public class BitacoraBatch {
    
    @Autowired
    private BatchPersistencia batchPersistencia;
    
    private static final Logger LOG = LoggerFactory.getLogger(BitacoraBatch.class);
    
    public void guardaRegistros(){
        //LOG.info("ejecutando batch de persistencia: ");
        batchPersistencia.guardaMensajes();
        //LOG.info("fin de batch de persistencia: ");
    }
    
}
