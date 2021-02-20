package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.rest;

import java.util.ArrayList;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.rest.CtgExecutionRest;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesCTGImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PruebaCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.HistoryDataDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.ConstantesXMP;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common.EjecutaMigraI2W;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.History;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@RestController
public class HistoryData {
    
    private static final Logger LOG = LoggerFactory.getLogger(HistoryData.class);
    
    @Autowired
    private EjecutaMigraI2W ejecutaMig;
    
    @Autowired
    private HistoryDataDao histD;
    
//    @Autowired
//    private HistoryDataDao historyDataDao;
//    @RequestMapping(value = "/rest/history", method = RequestMethod.GET)
    public ResponseEntity<String> executeCleanQueue() {
        History history = new History();
        history.setStatus(HistoryStatus.PROCESSING);
        history.setDescription("Registro de prueba");
        history.setEndTime(LocalDateTime.now().minusMinutes(30));
        history.setStartTime(LocalDateTime.now());

//        historyDataDao.save(history); 
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @RequestMapping(value = "/rest/history/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> executeCleanQueueByRegion(@PathVariable("id") long region) {
        return new ResponseEntity<>(region + "", HttpStatus.OK);
    }

    
    
    @RequestMapping(value=BusinessConstants.BASE_PATH_REST+"restartMigra",method=RequestMethod.POST)
    public ResponseEntity<String> executeIgtoc2P(){
        LOG.info("EJECUTANDO I*2W PARA TODAS LAS REGIONES");
        ejecutaMig.gestionaReinicioMigra(ConstantesXMP.ALL_REGIONS);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @RequestMapping(value=BusinessConstants.BASE_PATH_REST+"restartMigra/{region}",method=RequestMethod.POST)
    public ResponseEntity<String> executeIgtoc2PByRegion(@PathVariable("region") short region){
        LOG.info("EJECUTANDO I*2W PARA LA REGION : " + region);
        ejecutaMig.gestionaReinicioMigra(String.valueOf(region));
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @RequestMapping(value=BusinessConstants.BASE_PATH_REST+"historyMigra",params={"page","size","sort"},method=RequestMethod.GET)
    public ResponseEntity consultaHistoriaMigra(@RequestParam("page") int page, @RequestParam("size")int size,@RequestParam("sort")String sort){
        List<History> respuesta=new ArrayList<>();
        LOG.info("OBTENIENDO HISTORIAL DE SERVICIO MIGRA");
        respuesta = histD.getHistoryMig(page,size,sort);
        LOG.info("RESPUESTA SIZE -> "+respuesta.size());
        return new ResponseEntity<>(respuesta,HttpStatus.OK);
    }
}
