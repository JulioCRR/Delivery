/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.rest;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.dao.CatalogosDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kRelAccionTransaccionFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
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
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@RestController
public class CatalogosRestService {
    
    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(CatalogosRestService.class);
    
    @Autowired
    CatalogosDao catalogosDao;
    
    @RequestMapping(value = "/rest/search-transactions", method = RequestMethod.GET)
    public ResponseEntity obtenerTransacciones() {
        
        List<M2kCatTransaccionesFront> transacciones = catalogosDao.getAllTransactions();
        
        if (transacciones != null && transacciones.size() > 0) {
            return new ResponseEntity<>(transacciones, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @RequestMapping(value = "/rest/search-actionsBytransaction/{idtransaccion}", method = RequestMethod.GET)
    public ResponseEntity obtenerAccionPorTransaccion(@PathVariable("idtransaccion") int idTransaccion) {

        LOG.info("BUSCANDO LAS ACCIONES DISPONIBLES PARA LA TRANSACCION ID : " + idTransaccion);
        List<M2kRelAccionTransaccionFront> acciones = catalogosDao.getAccionesPorTransaccion(idTransaccion);
        
        if (acciones != null && acciones.size() > 0) {
            return new ResponseEntity<>(acciones, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
    }
       
}
