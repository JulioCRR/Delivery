package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.exception;

import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.ValidaInstanciaThread;
import org.apache.log4j.Logger;

/**
 *
 * @author VI9XXI3
 */
public class InstanceRejectedHandler implements RejectedExecutionHandler {

    private static final Logger LOG = Logger.getLogger(InstanceRejectedHandler.class);

    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        ValidaInstanciaThread th = (ValidaInstanciaThread)r;
        StringBuilder sb = new StringBuilder();
        sb.append("Error al validar instancia ").append(th.getInstancia().getEndPoint()).append("\n");
        sb.append("Informacion de ThreadPoolExecutor:").append("\n");
        sb.append("\t").append("IsShutdown: ").append(executor.isShutdown()).append("\n");
        sb.append("\t").append("ActiveCount: ").append(executor.getActiveCount()).append("\n");
        sb.append("\t").append("CorePoolSize: ").append(executor.getCorePoolSize()).append("\n");
        sb.append("\t").append("MaxPoolSize: ").append(executor.getMaximumPoolSize()).append("\n");
        sb.append("\t").append("PoolSize: ").append(executor.getPoolSize()).append("\n");
        sb.append("\t").append("KeepAliveTime[seconds]: ").append(executor.getKeepAliveTime(TimeUnit.SECONDS)).append("\n");
        sb.append("\t").append("Queue.size: ").append(executor.getQueue().size()).append("\n");
        LOG.error(sb.toString());
    }

}
