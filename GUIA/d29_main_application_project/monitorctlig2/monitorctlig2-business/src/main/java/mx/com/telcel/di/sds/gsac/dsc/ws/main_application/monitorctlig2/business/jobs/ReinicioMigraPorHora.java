package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.jobs;


import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.ConstantesXMP;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.EjecutaMigraI2W;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Roberto Sánchez
 */
@Service
public class ReinicioMigraPorHora {
    
    private static final Logger LOG=LoggerFactory.getLogger(ReinicioMigraPorHora.class);
    
    @Autowired
    private EjecutaMigraI2W reinicioMigra;
    
    public void ejecutarReinicioMigra(){
        
        LOG.info("INICIANDO REINICIO AUTOMATIZADO DE SERVICIO I*2M ");
        reinicioMigra.gestionaReinicioMigra(ConstantesXMP.ALL_REGIONS);
        LOG.info("FIN REINICIO AUTOMATIZADO DE SERVICIO I*2M");   
    }  
}
