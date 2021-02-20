package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.messaging;
//package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.ProcesadorRegistrosPeticionesM2kImpl;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.ProcesadorRespuestasPeticionesM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.listener.DefaultMessageListenerContainer;

/**
 *
 * @author VI9XXG0
 */
public class ListenerLogger implements MessageListener, ExceptionListener {

    private static final Logger LOG = LoggerFactory.getLogger(ListenerLogger.class);

    @Autowired
    private ProcesadorRegistrosPeticionesM2kImpl procesadorRegistrosPeticionesM2kImpl;

    @Autowired
    private DefaultMessageListenerContainer listenerContainerLogger;

    @Autowired
    private ProcesadorRespuestasPeticionesM2K procesadorRespuestas;

    /**
     * Implementacion del metodo onMessage de la interfaz MessageListener.Cada
     * que detecta un mensaje en la cola QL.D29.WS.M2K.LOG.BD.IN procesa el
     * mensaje para su guardado en bitacora.
     *
     * @param message Mensaje recibido desde Queue
     */
    @Override
    public void onMessage(Message message) {
        Thread.currentThread().setName("" + System.currentTimeMillis());
        try {
            String mensaje = ((TextMessage) message).getText();
            UtilMonitoreo.setPeticionesUltimaHora(UtilMonitoreo.getPeticionesUltimaHora() + 1);
            UtilMonitoreo.setPeticionesPorDia(UtilMonitoreo.getPeticionesPorDia() + 1);
            if (UtilMonitoreo.getGuardaMensajeEnBD()) {
                procesadorRegistrosPeticionesM2kImpl.procesaRegistroPeticionV2(mensaje);
            }
            procesadorRespuestas.procesaRespuestaMensaje(mensaje);

        } catch (JMSException e) {
            LOG.error("No se pudo leer el mensaje de ListenerLogger", e);
        }
    }

    @Override
    public void onException(JMSException ex) {
        LOG.error("Ocurrio un error de JMS en ListenerLogger", ex);
    }

    public DefaultMessageListenerContainer getListenerContainerLogger() {
        return listenerContainerLogger;
    }

    public void setListenerContainerLogger(
            DefaultMessageListenerContainer listenerContainerLogger) {
        this.listenerContainerLogger = listenerContainerLogger;
    }

}
