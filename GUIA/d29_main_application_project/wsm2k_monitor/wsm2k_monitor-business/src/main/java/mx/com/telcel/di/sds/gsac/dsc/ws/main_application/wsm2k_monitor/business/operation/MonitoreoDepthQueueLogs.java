/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import com.ibm.mq.MQException;
import com.ibm.mq.constants.CMQC;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import com.ibm.msg.client.wmq.v6.base.internal.MQQueue;
import com.ibm.msg.client.wmq.v6.base.internal.MQQueueManager;
import java.util.Hashtable;
import javax.jms.Destination;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.aop.advices.AlertadorErrores;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.listener.DefaultMessageListenerContainer;
import org.springframework.scheduling.annotation.Scheduled;

/**
 *
 * @author Praxis
 */
public class MonitoreoDepthQueueLogs {
    
      private static final Logger LOG = LoggerFactory.getLogger(MonitoreoDepthQueueLogs.class);
     
      
      @Autowired
      private MQQueueConnectionFactory connectionFactory;
      
      @Autowired
      private DefaultMessageListenerContainer listenerContainerLogger;

      @Autowired
      private AlertadorErrores alertadorErrores;
      
    public void getQueueDepth() { 
            
    Destination desti = listenerContainerLogger.getDestination();
    String nameQueue = desti.toString().substring(9);

    int queueDepth ;
    int openOptions =  CMQC.MQOO_FAIL_IF_QUIESCING + CMQC.MQOO_INPUT_SHARED + CMQC.MQOO_INQUIRE; 

    try { 
            Hashtable props = new Hashtable(); 

            props.put(CMQC.HOST_NAME_PROPERTY, connectionFactory.getHostName()); 
            props.put(CMQC.PORT_PROPERTY, connectionFactory.getPort()); 
            props.put(CMQC.CHANNEL_PROPERTY, connectionFactory.getChannel()); 

            MQQueueManager qMgr = new MQQueueManager(connectionFactory.getQueueManager(), props);

            MQQueue destQueue = qMgr.accessQueue(nameQueue,   openOptions); 
            
            queueDepth = destQueue.getCurrentDepth();

        int[] selectors = new int[]{CMQC.MQIA_MAX_Q_DEPTH};
        int[] intAttrs = new int[1];
        byte[] charAttrs = new byte[0];
        destQueue.inquire(selectors, intAttrs, charAttrs);

LOG.info("Current Depth Queue:" + destQueue.getCurrentDepth()); 
            destQueue.close(); 
            qMgr.disconnect(); 
             if (queueDepth == intAttrs[0]){
            this.alertadorErrores.queueMaxDepthAlerta(queueDepth);
            }
    }catch(MQException mqe){ 
       LOG.error("MQException" + mqe); 
    } 
}

}