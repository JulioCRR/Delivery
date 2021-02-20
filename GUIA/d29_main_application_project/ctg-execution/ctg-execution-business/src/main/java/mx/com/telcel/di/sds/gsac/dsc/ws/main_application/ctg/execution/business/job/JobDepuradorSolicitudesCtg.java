/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.job;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.dao.CtgExecutionDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@Service
public class JobDepuradorSolicitudesCtg {
    
    private static final Logger LOG = LoggerFactory.getLogger(JobDepuradorSolicitudesCtg.class);
    
    @Autowired
    private CtgExecutionDao ctgExecutionDao;
    
    public void depurar() {
        LOG.info("INICIA PROCESO DE DEPURACION DE SOLICITUDES");
        ctgExecutionDao.depurarSolicitudesCtg();
        LOG.info("FINALIZA PROCESO DE DEPURACION!!");
    }

}
