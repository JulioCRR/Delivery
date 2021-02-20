/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.messaging;

import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.listener.DefaultMessageListenerContainer;

/**
 *
 * @author VI9XXG0
 */
public class ListenerAnalytic implements MessageListener, ExceptionListener {

    private static final Logger LOG = LoggerFactory.getLogger(ListenerAnalytic.class);

    @Autowired
    private DefaultMessageListenerContainer listenerContainerAnalytic;

    @Override
    public void onMessage(Message message) {
        try {
            String mensaje = ((TextMessage) message).getText();
            //LOG.info("Mensaje recibido por ListenerAnalytic: "+ mensaje);
        } catch (JMSException e) {
            LOG.error("No se pudo leer el mensaje de ListenerAnalytic", e);
        }
    }

    @Override
    public void onException(JMSException ex) {
        LOG.error("Ocurrio un error de JMS en ListenerAnalytic", ex);
    }

    public DefaultMessageListenerContainer getListenerContainerAnalytic() {
        return listenerContainerAnalytic;
    }

    public void setListenerContainerAnalytic(
            DefaultMessageListenerContainer listenerContainerAnalytic) {
        this.listenerContainerAnalytic = listenerContainerAnalytic;
    }

}
