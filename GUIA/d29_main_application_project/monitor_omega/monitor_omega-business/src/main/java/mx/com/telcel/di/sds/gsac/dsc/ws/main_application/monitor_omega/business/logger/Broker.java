package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.logger;

import com.lambdaworks.redis.*;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author VI9XXM5
 */
public class Broker {

    private static final Logger LOG = LoggerFactory.getLogger(Broker.class);
    private static final String REDIS_KEY = "logstash";

    private static RedisClient client;
    private static RedisConnection<String, String> connection;

    private Broker() {
    }

    public static void sendMessage(final String message) throws Exception {
        RedisConnection<String, String> tmpConnection = getConnection();
        if (tmpConnection == null) {
            throw new Exception("No se ha podido iniciar la conexion a Redis");
        }
        Long listLength = tmpConnection.rpush(REDIS_KEY, message);
        LOG.debug("Respuesta de Redis -> " + listLength);
    }

    private static RedisConnection<String, String> getConnection() {
        if (connection == null) {
            LOG.info("Se inicia una nueva conexion a Redis");
            client = new RedisClient(RedisURI.create(Constants.REDIS_IP));
            connection = client.connect();
        }
        return connection;
    }
}
