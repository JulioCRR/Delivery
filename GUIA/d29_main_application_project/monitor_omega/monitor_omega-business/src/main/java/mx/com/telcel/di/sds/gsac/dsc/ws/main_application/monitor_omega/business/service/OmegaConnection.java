package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.service;

import javax.resource.ResourceException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.ScrapyConector;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.OmegaConnectionImpl;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXI3
 */
@Service
public class OmegaConnection {

    private static final Logger LOG = LoggerFactory.getLogger(OmegaConnection.class);

    private static OmegaConnectionImpl connection;

    @Autowired
    @Qualifier(value = "scrapyConectorOmega")
    private ScrapyConector scrapy;

    private OmegaConnection() {
    }

    public void createConnection() throws Exception {
        if (connection == null) {
            try {
                connection = new OmegaConnectionImpl(
                        scrapy.getHost(),
                        scrapy.getPuerto(),
                        scrapy.getCics(),
                        scrapy.getCmdLogin(),
                        scrapy.getUsuario(),
                        scrapy.getClave(),
                        scrapy.getTransaccion(),
                        scrapy.getRegion(),
                        scrapy.getTimeOut()
                );
                connection.loginOmega();
            } catch (ResourceException ex) {
                connection = null;
                throw ex;
            }
        }
    }

    public boolean isConnected() {
        if (connection != null) {
            if (!connection.isConnected()) {
                connection = null;
                return false;
            }
            return true;
        }
        return false;
    }

    public void cierraConexion() {
        if (isConnected()) {
            connection.cierraConexion();
            connection = null;
        }
    }

    public String getScrapyInfo() {
        return scrapy.toString();
    }

    public OmegaData ejecutaConsultaOmega() throws Exception {
        OmegaData omegaData = null;
        try {
            omegaData = connection.ejecutaConsultaOmega();
        } catch (Exception ex) {
            throw ex;
        } finally {
            cierraConexion();
        }
        return omegaData;
    }
}
