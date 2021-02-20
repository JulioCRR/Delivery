package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.logger;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author VI9XXM5
 */
public class ElasticLogger {

    private static final Logger LOG = LoggerFactory.getLogger(ElasticLogger.class);

    private final List<LogEntry> listLogEntry = new ArrayList<>();

    public void addEntry(Date date, String region, String transaction, Long execTime, double cpu, String cics, String status, String pantallaM2k, String programa, boolean isAlert) {
        listLogEntry.add(new LogEntry(
                date,
                region,
                transaction,
                execTime,
                cpu,
                cics,
                status,
                pantallaM2k,
                programa,
                isAlert));
    }

    public void sendToRedis() {
        if (listLogEntry.isEmpty()) {
            return;
        }
        Thread thread = new Thread() {
            @Override
            public void run() {
                sendToBroker();
            }
        };
        thread.start();
    }

    private void sendToBroker() {
        int total = listLogEntry.size();
        int sent = 0;
        long inicioEjecucion = System.currentTimeMillis();
        LOG.info("Se enviaran " + total + " transacciones a Redis");
        for (LogEntry entry : listLogEntry) {
            try {
                Broker.sendMessage(entry.getJson().toString());
                sent++;
            } catch (Exception ex) {
                LOG.error("Error al enviar a Redis", ex);
            }
        }
        LOG.info("Se enviaron " + sent + " transacciones a Redis en " + (System.currentTimeMillis() - inicioEjecucion) + " ms");
        try {
            Thread.sleep(100);
        } catch (InterruptedException ignored) {
        }
        Thread.currentThread().interrupt();
    }
}
