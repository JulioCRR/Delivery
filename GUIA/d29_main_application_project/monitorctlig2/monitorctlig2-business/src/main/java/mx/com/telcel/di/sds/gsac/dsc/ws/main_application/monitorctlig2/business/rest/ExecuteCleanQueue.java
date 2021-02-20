package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.rest;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.ConstantesXMP;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.DepuradorColas;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@RestController
public class ExecuteCleanQueue {

    private static final Logger LOG = LoggerFactory.getLogger(ExecuteCleanQueue.class);

    @Autowired
    private DepuradorColas depuradorColas;

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "execute-clean-queue", method = RequestMethod.POST)
    public ResponseEntity<String> executeCleanQueue() {
        LOG.info("Ejecutando para todas las regiones");
        depuradorColas.gestionaDepuracionColas(ConstantesXMP.ALL_REGIONS);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "execute-clean-queue/{region}", method = RequestMethod.POST)
    public ResponseEntity<String> executeCleanQueueByRegion(@PathVariable("region") short region) {
        LOG.info("Ejecutando para la region " + region);
        depuradorColas.gestionaDepuracionColas(String.valueOf(region));
        return new ResponseEntity<>(region + "", HttpStatus.OK);
    }

}
