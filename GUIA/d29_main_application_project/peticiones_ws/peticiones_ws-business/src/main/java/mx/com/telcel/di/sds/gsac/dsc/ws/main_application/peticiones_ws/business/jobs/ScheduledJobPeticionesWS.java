package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author Juan
 */
@Component
public class ScheduledJobPeticionesWS {

    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobPeticionesWS.class);

    @Autowired
    private PeticionesWSJob job;

    @Scheduled(cron = "0 0 23 * * ?")
    public void executeJob() {
        deletePeticionesEliminadas();
        updateSolPeticionCaducada();
        deleteSolicitudesInactivas();
    }

    protected void updateSolPeticionCaducada() {
        LOG.info("INICIANDO DEPURACION DE SOLICITUD DE PETICIONES CADUCADAS");
        job.checkSolicitudCaducidad();
        LOG.info("FIN DE DEPURACION");
    }

    protected void deleteSolicitudesInactivas() {
        LOG.info("INICIANDO DEPURACION DE SOLICITUDES VENCIDAS");
        job.deleteSolicitudesInactivas();
        LOG.info("FIN DE DEPURACION");
    }

    protected void deletePeticionesEliminadas() {
        LOG.info("INICIANDO DEPURACION DE PETICIONES ELIMINADAS");
        job.deletePeticionesEliminadas();
        LOG.info("FIN DE DEPURACION");
    }
}
