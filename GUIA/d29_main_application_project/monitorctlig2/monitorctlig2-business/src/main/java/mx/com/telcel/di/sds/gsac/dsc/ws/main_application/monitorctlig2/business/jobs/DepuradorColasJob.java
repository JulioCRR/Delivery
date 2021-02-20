package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.jobs;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.ConstantesXMP;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.DepuradorColas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.init.InitializeMonitorCtlig2;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepuradorColasJob {

    private static final Logger LOG = LoggerFactory.getLogger(DepuradorColasJob.class);

    @Autowired
    private DepuradorColas depuradorColas;

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void depuraColas() {

        Propiedades value = null;
        try {
            value = em.createQuery("SELECT p FROM Propiedades p WHERE p.name = :name", Propiedades.class)
                    .setParameter("name", InitializeMonitorCtlig2.TIME_TO_CLEAN_QUEUE_NAME)
                    .getSingleResult();
        } catch (NoResultException ex) {

        }

        if (value == null) {
            ejecutarDepuracion();
            return;
        }

        if (value.getTemporal() == null) {
            value.setTemporal(String.valueOf(LocalDateTime.now().toDateTime().getMillis()));

            em.merge(value);
            em.flush();
            ejecutarDepuracion();
            return;
        }

        LocalDateTime lastExecution = new LocalDateTime(Long.parseLong(value.getTemporal()));
        if (lastExecution.plusMinutes(Integer.parseInt(value.getValue())).toString("ddMMyyyyhhmm").equals(LocalDateTime.now().toString("ddMMyyyyhhmm"))) {
            ejecutarDepuracion();
            value.setTemporal(String.valueOf(LocalDateTime.now().toDateTime().getMillis()));

            em.merge(value);
            em.flush();

        }

    }

    public void ejecutarDepuracion() {
        LOG.debug("Inicio depuracion automatizada de colas: " + LocalDateTime.now().toString("dd/MM/yyyy hh:mm"));
        depuradorColas.gestionaDepuracionColas(ConstantesXMP.ALL_REGIONS);
        LOG.debug("fin depuracion automatizada de colas");
    }

}
