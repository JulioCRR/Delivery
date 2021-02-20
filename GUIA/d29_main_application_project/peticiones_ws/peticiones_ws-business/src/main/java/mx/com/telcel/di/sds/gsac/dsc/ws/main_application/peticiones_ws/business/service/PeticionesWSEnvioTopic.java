package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate102;
import org.springframework.stereotype.Service;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.utils.PeticionesWSUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 *
 * @author Juan
 */
@Service
public class PeticionesWSEnvioTopic {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSEnvioTopic.class);

    @Autowired
    @Qualifier(value = "jmsTopicTemplate102")
    private JmsTemplate102 jmsTemplate;

    public void send(Integer accion) throws Exception {
        send(accion, null);
    }

    public void send(Integer accion, List<Long> listId) throws Exception {
        sendToTopic(PeticionesWSUtils.convertTopicData(accion, listId));
    }

    private void sendToTopic(String data) throws Exception {
        if (StringUtils.isBlank(data)) {
            throw new Exception("Datos a enviar son nulos");
        }
        LOG.info("Enviando datos a Topic " + PeticionesWSUtils.getJmsTopicName() + ": " + data);
        jmsTemplate.convertAndSend(PeticionesWSUtils.getJmsTopicName(), data);
    }
}
