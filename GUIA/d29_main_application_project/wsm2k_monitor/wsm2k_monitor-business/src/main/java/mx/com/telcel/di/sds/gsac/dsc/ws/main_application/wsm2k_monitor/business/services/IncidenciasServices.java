/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.services;

import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs.ValidadorInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.messaging.ListenerAnalytic;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.messaging.ListenerLogger;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ListaInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.CargadorCatalogoErrores;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.MailManagerMonitor;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao.CatInstanciaWSM2KDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.IncidenciaEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao.IncidenciasDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

/**
 *
 * @author VI9XXG0
 */
@RestController
@EnableAutoConfiguration
@Configuration
public class IncidenciasServices {

    @Autowired
    private IncidenciasDAO incidenciasDAO;

    @Autowired
    private CargadorCatalogoErrores cargadorCatalogoErrores;

    @Autowired
    private UtilMonitoreo utilMonitoreo;

    @Autowired
    private ValidadorInstancias validadorInstancias;

    @Autowired
    private ListenerAnalytic listenerAnalytic;

    @Autowired
    private ListenerLogger listenerLogger;

    @Autowired
    private ListaInstancias listaInstancias;

    @Autowired
    private CatInstanciaWSM2KDao catInstancias;

    @Autowired
    private MailManagerMonitor validaInstancia;

    private static final Logger LOG = LoggerFactory.getLogger(IncidenciasServices.class);

    private String mensaje = "";

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "consultaIncidencias", method = RequestMethod.GET)
    public ResponseEntity consultaIncidencias() {

        List<IncidenciaEntity> incidencias = incidenciasDAO.consultaIncidencias();
        return new ResponseEntity<>(incidencias, HttpStatus.OK);

    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "incidencias/consultaPorMensaje", method = RequestMethod.GET)
    public ResponseEntity consultaIncidenciasPorMensaje(HttpSession session, @RequestParam(value = "mensaje") String mensaje) {

        List<IncidenciaEntity> incidencias = incidenciasDAO.consultaIncidenciasPorMensaje(mensaje.toUpperCase());
        LOG.info("resultados encontrados incidencias: " + incidencias.size());
        return new ResponseEntity<>(incidencias, HttpStatus.OK);

    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "guardaIncidencia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity guardarIncidencia(HttpSession session, @RequestBody IncidenciaEntity incidencia) {
        LOG.info("INCIDENCIA" + incidencia.toString());
        incidenciasDAO.insertUpdate(incidencia);
        cargadorCatalogoErrores.agregaMonitoreoIncidencia(incidencia);
        ResponseEntity<IncidenciaEntity> response = new ResponseEntity(incidencia, HttpStatus.OK);
        LOG.info("INCIDENCIA GUARDADO CORRECTAMENTE!");
        return response;
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "actualizaIncidencia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity actualizaIncidencia(HttpSession session, @RequestBody IncidenciaEntity incidencia) {
        LOG.info("INCIDENCIA" + incidencia.toString());
        incidenciasDAO.insertUpdate(incidencia);
        cargadorCatalogoErrores.actualizaMonitoreoIncidencia(incidencia);
        ResponseEntity<IncidenciaEntity> response = new ResponseEntity(incidencia, HttpStatus.OK);
        LOG.info("INCIDENCIA ACTUALIZADA CORRECTAMENTE!");
        return response;
    }
    // ----------------------------------------

    @RequestMapping("/onOffGuardaMensajesEnBD")
    String onOffGuardaMensajesEnBD(@RequestParam(value = "info", required = false, defaultValue = "") String info, Model model) {
        UtilMonitoreo.setGuardaMensajeEnBD(!UtilMonitoreo.getGuardaMensajeEnBD());
        mensaje = "Guarda mensajes en BD: " + UtilMonitoreo.getGuardaMensajeEnBD();
        model.addAttribute("mensaje", mensaje);
        //return "processParamModified";
        return mensaje;
    }

    @RequestMapping("/setTimeOutMonitoreoInstancias")
    String setTimeOutMonitoreoInstancias(@RequestParam(value = "timeOut") int timeOut, Model model) {
        validadorInstancias.setTimeOutInstancias(timeOut);
        mensaje = "timeOut monitoreo instancias: " + validadorInstancias.getTimeOutInstancias();
        model.addAttribute("mensaje", mensaje);
        //return "processParamModified";
        return mensaje;
    }

    @RequestMapping("/tiempoMaximoEntreAlertas")
    String tiempoMaximoEntreAlertas(@RequestParam(value = "tiempo") int tiempo, Model model) {
        utilMonitoreo.setTiempoMaximoParaAlerta(tiempo);
        mensaje = "Tiempo maximo entre alertas: " + utilMonitoreo.getTiempoMaximoParaAlerta();
        model.addAttribute("mensaje", mensaje);
        //return "processParamModified";
        return mensaje;
    }

    @RequestMapping("/modificaHilosListener")
    String modificaHilosListener(@RequestParam(value = "cola") String cola,
            @RequestParam(value = "numeroHilos") int numeroHilos,
            Model model) {

        if (cola.equals("QL.D29.WS.M2K.LOG.MONITOR.IN")) {
            this.listenerAnalytic.getListenerContainerAnalytic().setConcurrentConsumers(numeroHilos);
            this.listenerAnalytic.getListenerContainerAnalytic().setMaxConcurrentConsumers(numeroHilos);
            mensaje = cola + " Maximos consumidores concurrentes: " + this.listenerAnalytic.getListenerContainerAnalytic().getMaxConcurrentConsumers();
        } else if (cola.equals("QL.D29.WS.M2K.LOG.BD.IN")) {
            this.listenerLogger.getListenerContainerLogger().setConcurrentConsumers(numeroHilos);
            this.listenerLogger.getListenerContainerLogger().setMaxConcurrentConsumers(numeroHilos);
            mensaje = cola + " Maximos consumidores concurrentes: " + this.listenerLogger.getListenerContainerLogger().getMaxConcurrentConsumers();
        } else {
            mensaje = "No existe un listener asociado a la cola: " + "\"" + cola + "\"";
        }
        return mensaje;
    }

    @RequestMapping("/detenerListener")
    String detenerListener(@RequestParam(value = "cola") String cola, Model model) {

        if (cola.equals("QL.D29.WS.M2K.LOG.MONITOR.IN")) {
            this.listenerAnalytic.getListenerContainerAnalytic().stop();
            mensaje = "Listener " + cola + " active: " + listenerAnalytic.getListenerContainerAnalytic().isRunning();
        } else if (cola.equals("QL.D29.WS.M2K.LOG.BD.IN")) {
            this.listenerLogger.getListenerContainerLogger().stop();
            mensaje = "Listener " + cola + " active: " + listenerLogger.getListenerContainerLogger().isRunning();
        } else {
            mensaje = "No existe un listener asociado a la cola: " + "\"" + cola + "\"";
        }
        return mensaje;
    }

    @RequestMapping("/iniciarListener")
    String iniciarListener(@RequestParam(value = "cola") String cola, Model model) {

        if (cola.equals("QL.D29.WS.M2K.LOG.MONITOR.IN")) {
            this.listenerAnalytic.getListenerContainerAnalytic().start();
            mensaje = "Listener " + cola + " active: " + listenerAnalytic.getListenerContainerAnalytic().isRunning();
            model.addAttribute("mensaje", mensaje);
        } else if (cola.equals("QL.D29.WS.M2K.LOG.BD.IN")) {
            this.listenerLogger.getListenerContainerLogger().start();
            mensaje = "Listener " + cola + " active: " + listenerLogger.getListenerContainerLogger().isRunning();
            model.addAttribute("mensaje", mensaje);
        } else {
            mensaje = "No existe un listener asociado a la cola: " + "\"" + cola + "\"";
        }
        return mensaje;
    }

    //-------ACTUALIZACION DE INSTANCIAS------------ 
    @RequestMapping("/alertasInstanciasErrorOnOff")
    String correInstanciasOnOff() {
        String status;
        if (validaInstancia.isInstansiasOnOff()) {
            validaInstancia.setInstansiasOnOff(false);
            status = "OFF";
        } else {
            validaInstancia.setInstansiasOnOff(true);
            status = "ON";
        }
        mensaje = "La alerta de instancias encuentran en estatus: " + status;

        return mensaje;
    }

    @RequestMapping("/actualizacionInstancias")
    public String actualizacionInstanciasBD() {
        listaInstancias.initListaInstancia();
        return "Se actualizaron las Instancias con exito!";
    }

    @RequestMapping("/bloqueIntanciasOnOff")
    public String bloqueoInstanciasOnOff(@RequestParam(value = "servidor") String servidor,
            @RequestParam(value = "puerto") Integer puerto,
            @RequestParam(value = "bloquearDesbloquear") Short bloquearDesbloquear) {
        List<InstanciaWSM2K> lista = null;
        if (catInstancias.inabilitarInstancias(servidor, puerto, bloquearDesbloquear) > 0) {
            lista = listaInstancias.getInstanciasWSM2K();
            for (InstanciaWSM2K ins : lista) {
                if (ins.getHost().equals(servidor) && ins.getPuerto() == puerto) {
                    ins.setHabilitada(bloquearDesbloquear);
                }
            }
          mensaje = actualizacionInstanciasBD();
        } else {
            mensaje = "Hubo un problema en la actualizacion de las instancias";
        }

        return mensaje;
    }

}
