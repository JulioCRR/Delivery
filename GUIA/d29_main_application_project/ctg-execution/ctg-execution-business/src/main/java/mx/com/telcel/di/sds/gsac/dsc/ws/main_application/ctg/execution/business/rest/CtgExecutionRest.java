/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.rest;

import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.dao.CtgExecutionDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.service.NotificationService;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.socket.CtgConector;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesCTGImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29CreUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.entities.D29SolicitudAmbienteCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PermisosCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PruebaCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.SolicitudCtg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
@RestController
public class CtgExecutionRest {

    private static final Logger LOGGER = LoggerFactory.getLogger(CtgExecutionRest.class);
    
    @Autowired
    CtgConector conectorCTG;
    
    @Autowired
    CtgExecutionDao ctgExecutionDao;
    
    @Autowired
    NotificationService notificationService;
    
    @RequestMapping(value = "/rest/ejecutarPruebaCtg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity ejecutarPruebaCtg(HttpSession session, @RequestBody PruebaCtg prueba) {

        if (prueba != null) {
            try {
                UtilidadesCTGImp respuesta = null;
                
                if ("D".equals(prueba.getAmbiente().trim()) || "C".equals(prueba.getAmbiente().trim())) {
                    D29CreUsuario usr = this.ctgExecutionDao.getUsuario(prueba.getIdUsuarioEjecucion());
                    D29CreUsuario responsable = this.ctgExecutionDao.obtenerResponsable(prueba.getIdUsuarioEjecucion());
                    respuesta = conectorCTG.ejecutaProgramaCTG(prueba);
                    D29SolicitudAmbienteCtg sol = this.ctgExecutionDao.guardarSolicitud(SolicitudCtg.toSolicitudCtg(prueba, responsable!=null?Integer.parseInt(""+responsable.getId()):0));
                    this.ctgExecutionDao.guardarBitacoraCTG(sol, usr, respuesta, prueba.getAmbiente());
                } else {
                    //PRODUCCION
                    D29SolicitudAmbienteCtg sol = this.ctgExecutionDao.findSolicitudById(prueba.getIdSolicitudEjecucion());
                    if (this.ctgExecutionDao.validarEjecucionCtgProd(sol,prueba.getTransaccion(), prueba.getPrograma(), prueba.getUsuario(), prueba.getIdUsuarioEjecucion())) {
                        D29CreUsuario usr = this.ctgExecutionDao.getUsuario(prueba.getIdUsuarioEjecucion());
                        respuesta = conectorCTG.ejecutaProgramaCTG(prueba);    
                        this.ctgExecutionDao.guardarBitacoraCTG(sol, usr, respuesta, prueba.getAmbiente());
                        this.ctgExecutionDao.validarEjecucionCtgProd(sol,prueba.getTransaccion(), prueba.getPrograma(), prueba.getUsuario(), prueba.getIdUsuarioEjecucion());
                    } else {
                        throw new Exception("EL FOLIO: " + sol.getFolio() + " YA NO ES UN FOLIO VALIDO. HA ALCANZADO EL NUMERO MAXIMO DE EJECUCIONES O LOS DATOS DE EJECUCION SON INVALIDOS. FAVOR DE VALIDARLO.");
                    }
                }
                
                if (respuesta != null) {
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception ex) {
                LOGGER.error("ERROR AL EJECUTAR PROGRAMA CTG.",ex);
                return new ResponseEntity<>(ex.getMessage(),HttpStatus.CONFLICT);
            }

        } else {
            LOGGER.error("Error al recibir los datos para la ejecucion de la prueba CTG.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } 
    }
    
    @RequestMapping(value = "/rest/validarCodigoProduccion", params = {"codigo", "usr"}, method = RequestMethod.GET)
    public ResponseEntity validarCodigoProd(@RequestParam("codigo") String codigoProd, @RequestParam("usr") int idUsr) {

        if (codigoProd != null && !"".equals(codigoProd.trim())) {
            try {
                LOGGER.info("Codigo Produccion: " + codigoProd);
                LOGGER.info("Id Usuario: " + idUsr);
                D29SolicitudAmbienteCtg respuesta = ctgExecutionDao.isCodigoProduccionValid(codigoProd.trim(), idUsr);
                
                if (respuesta != null) {
                    respuesta.setCountEjecuciones(ctgExecutionDao.getBitacoraBySolicitud(respuesta.getId()));
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception ex) {
                LOGGER.error("ERROR AL EJECUTAR PROGRAMA CTG.",ex);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

        } else {
            LOGGER.error("Error al validar el codigo de produccion de la prueba CTG.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @RequestMapping(value = "/rest/guardarSolicitudCtg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity guardarSolicitudCtg(HttpSession session, @RequestBody SolicitudCtg solicitud) {

        if (solicitud != null) {
            
            try {
                
                LOGGER.info("Datos de prueba: " + solicitud.toString());
                
                D29SolicitudAmbienteCtg respuesta = this.ctgExecutionDao.guardarSolicitud(solicitud);
                
                if (respuesta != null) {
                    this.notificationService.notificarSolicitudAmbiente(respuesta);
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
                
            } catch (Exception ex) {
                LOGGER.error("ERROR AL GUARDAR SOLICITUD DE AMBIENTE CTG.",ex);
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
            }

        } else {
            LOGGER.error("Error al recibir los datos para la guardar la solicitud CTG.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } 
    }
    
    @RequestMapping(value = "/rest/getSolicitudesByUsuario", params = {"id", "tipo"}, method = RequestMethod.GET)
    public ResponseEntity getSolicitudesByUsuario(@RequestParam("id") int id, @RequestParam("tipo") int tipo) {

            try {
                LOGGER.info("Id usuario: " + id);
                List<D29SolicitudAmbienteCtg> respuesta = ctgExecutionDao.getSolicitudes(id, tipo);
                
                if (respuesta != null && respuesta.size()>0) {
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception ex) {
                LOGGER.error("ERROR AL EJECUTAR PROGRAMA CTG.",ex);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

    }
    
    
    @RequestMapping(value = "/rest/obtenerResponsableAuth/{id}", method = RequestMethod.GET)
    public ResponseEntity getResponsableAuth(@PathVariable("id") int id) {

            try {
                LOGGER.info("Id usuario: " + id);
                D29CreUsuario respuesta = ctgExecutionDao.obtenerResponsable(id);
                
                if (respuesta != null) {
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            } catch (Exception ex) {
                LOGGER.error("ERROR AL EJECUTAR PROGRAMA CTG.",ex);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

    }
    
    @RequestMapping(value = "/rest/consultarPermisos/{id}", method = RequestMethod.GET)
    public ResponseEntity getPermisos(@PathVariable("id") int id) {

            try {
                
                LOGGER.info("Id usuario: " + id);
                PermisosCtg respuesta = ctgExecutionDao.getPermisosSolicitudesCtg(id);
                
                if (respuesta != null) {
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
                
            } catch (Exception ex) {
                LOGGER.error("ERROR AL EJECUTAR PROGRAMA CTG.",ex);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

    }
            
    @RequestMapping(value = "/rest/actualizarEstatusSol", params = {"solicitudes","opcion"}, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizarSolicitudes(@RequestParam("solicitudes") String[] sols, @RequestParam("opcion") String op) {

            try {
                
                boolean respuesta = ctgExecutionDao.actualizarSolicitudes(op, sols);
                
                if (respuesta) {
                    List<D29SolicitudAmbienteCtg> solicitudes = this.ctgExecutionDao.getSolicitudes(sols);
                    this.notificationService.notificarRespuesrtaAmbiente(solicitudes);
                    return new ResponseEntity<>(respuesta, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
                
            } catch (Exception ex) {
                LOGGER.error("ERROR AL ACTUALIZAR SOLICITUDES CTG.",ex);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
    }
    
    @RequestMapping(value="/asignaResponsable", params={"responsable","idU"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity asignaResp(@RequestParam("responsable") String resp, @RequestParam("idU")Integer idUser){
        int responsable=0;
        LOGGER.info("INICIANDO SERVICIO DE ASIGNACIÓN DE RESPONSABLE");
        try{
            responsable=ctgExecutionDao.asignarResponsable(resp,idUser);
            if(responsable!=0){
                LOGGER.info("EL RESPONSABLE FUE ASIGNADO CORRECTAMENTE ");
                return new ResponseEntity<>(responsable, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(responsable, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(responsable, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    
    
    public class Responsable{
        public String idUser;
        public String emailResponsable;
        
        public String getIdUser(){
            return idUser;
        }
        
        public void setIdUser(String idUser){
            this.idUser=idUser;
        }
        
        public String getEmailResponsable(){
            return emailResponsable;
        }
        
        public void setEmailResponsable(String emailResponsable){
            this.emailResponsable=emailResponsable;
        }
    }
}

