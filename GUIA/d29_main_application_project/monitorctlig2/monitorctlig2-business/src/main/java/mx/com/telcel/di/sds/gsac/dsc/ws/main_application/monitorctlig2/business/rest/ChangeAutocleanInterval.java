package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.rest;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.ChangeAutocleanIntervalDao;
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
public class ChangeAutocleanInterval {

    private static final Logger LOG = LoggerFactory.getLogger(ChangeAutocleanInterval.class);

    @Autowired
    private ChangeAutocleanIntervalDao autocleanIntervalDao;

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "change-autoclean-interval/{time}", method = RequestMethod.PUT)
    public ResponseEntity<String> executeCleanQueueByRegion(@PathVariable("time") short time) {
        if (time > 60) {
            return new ResponseEntity<>("No se permite un valor mayor a 60", HttpStatus.BAD_REQUEST);
        }
        autocleanIntervalDao.changeAutoCleanInterval(time);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "change-autoclean-interval", method = RequestMethod.GET)
    public ResponseEntity<String> getCleanQueueByRegion() {

        Integer time = autocleanIntervalDao.getAutoCleanInterval();
        return new ResponseEntity<>(time.toString(), HttpStatus.OK);
    }

}
