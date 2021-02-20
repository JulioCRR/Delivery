
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.AgendaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.jobs.ScheduledJobPermisosDesa;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



public class BloqueoPermisos {
    
    
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobPermisosDesa.class);

    @Autowired
    private AgendaDao agendaDao;
    
    public void quitarPermisos() {
      LOG.info("SE  BLOQUEAN LOS  PERMISO DE EJECUCION  AL AMBIENTE DE DESARROLLO WS-M2K PARA EL TURNO DE LA TARDE ");
        agendaDao.updateEstatus(2);
    }
    
}
