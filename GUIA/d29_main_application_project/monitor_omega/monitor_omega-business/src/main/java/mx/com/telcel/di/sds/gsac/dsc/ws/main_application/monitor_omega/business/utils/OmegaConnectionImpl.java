package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils;

import com.telcel.crm.scrapy.IOHTimeOutException;
import com.telcel.crm.scrapy.IOHUnexpectedScreenException;
import com.telcel.crm.scrapy.ManagedConnectionImpl;
import com.telcel.crm.scrapy.tn3270.RW3270;
import com.telcel.crm.scrapy.tn3270.RWTnAction;
import javax.resource.ResourceException;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.Cics;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.CicsThread;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.OmegaData;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Clase implementadora de com.telcel.crm.scrapy.ManagedConnectionImpl para la
 * conexi&oacute;n de Omega
 *
 * @author Juan
 */
public class OmegaConnectionImpl extends ManagedConnectionImpl {

    private static final Logger LOG = LoggerFactory.getLogger(OmegaConnectionImpl.class);

    public OmegaConnectionImpl() {
        super();
    }

    public OmegaConnectionImpl(String host, Integer puerto, String cics, String cmdLogin, String usuario, String clave,
            String transaccion, String region, Long timeOut) {
        super();
        this.host = host;
        this.puerto = puerto;
        this.cics = cics;
        this.cmdLogin = cmdLogin;
        this.usuario = usuario;
        this.clave = clave;
        this.transaccion = transaccion;
        this.region = region;
        this.timeOut = timeOut;
    }

    @Override
    public void cierraConexion() {
        try {
            nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
            if (rw3270 != null) {
                try {
                    enviaComando(-1, null, true, RW3270.PF3, 5000);
                    enviaComando(-1, null, true, RW3270.PF3, 5000);
                    enviaComando(-1, null, true, RW3270.PF3, 3000);
                    enviaComando(-1, null, true, RW3270.PF3, 1000);
                    enviaComando(-1, null, true, RW3270.PF3, 1000);
                    rw3270.enter();
                } catch (Exception ignored) {
                    LOG.debug("cierraConexionError : " + ignored);
                }
            }
        } catch (Exception ex) {
            LOG.error("Scrappy cleanConnectionError : " + ex);
        } finally {
            try {
                if (rw3270 != null) {
                    rw3270.disconnect();
                }
            } catch (Exception ex) {
                LOG.error("Scrappy disconnectError : " + ex);
            }
        }
        rw3270 = null;
    }

    @Override
    public boolean isConnected() {
        if (nStatus != RWTnAction.DISCONNECTED_BY_REMOTE_HOST
                && nStatus != RWTnAction.CONNECTION_ERROR) {
            try {
                enviaComando(-1, null, true, RW3270.PF1, 5000);
                enviaComando(-1, null, true, RW3270.PF3, 5000);
                return getSegmento(getCoordenada(1, 19), 8).trim().equals(Constants.TXT_ZCICST);
            } catch (Exception ex) {
                LOG.warn("Not connected: " + ex.toString());
                cierraConexion();
            }
        }
        return false;
    }

    @Override
    public boolean login() throws Exception {
        nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
        if (rw3270 == null) {
            rw3270 = new RW3270(2, this);
            rw3270.connect(host, puerto);
        }
        espera(timeOut);
        enviaComando(cics, true, timeOut);
        enviaComando(-1, null, true, RW3270.ENTER, timeOut);
        espera(timeOut);
        if (getSegmento(getCoordenada(10, 26), 27).equals(Constants.MSG_PRESS_ENTER_BEGIN)) {
            enviaComando(-1, null, true, RW3270.ENTER, 2000);
        }

        short coord = getCoordenada(17, 8);
        if (!getSegmento(coord, 4).trim().equals("DB21")) {
            coord = getCoordenada("DB21");
        }
        rw3270.setCursorPosition(coord);
        rw3270.PF(RW3270.PF11);
        espera(timeOut);

        enviaComando(-1, null, true, RW3270.ENTER, timeOut);
        espera(timeOut);
        if (getSegmento(getCoordenada(10, 26), 27).equals(Constants.MSG_PRESS_ENTER_BEGIN)) {
            enviaComando(-1, null, true, RW3270.ENTER, 2000);
        }

        enviaComando(transaccion, true, timeOut);
        espera(timeOut);
        if (!getSegmento(getCoordenada(1, 19), 8).trim().equals(Constants.TXT_ZCICST)) {
            espera(timeOut);
            if (!getSegmento(getCoordenada(1, 19), 8).trim().equals(Constants.TXT_ZCICST)) {
                printDisplay();
                throw new IOHUnexpectedScreenException(Constants.ERR_PANTALLA_INVALIDA);
            }
        }
        return true;
    }

    public void loginOmega() throws ResourceException {
        String sException = "";
        boolean bResp = false;
        final long inicioEjecucion = System.currentTimeMillis();
        inicioLogin = inicioEjecucion;
        bLogin = true;
        for (int i = 0; i < Constants.MAX_LOGIN_OMEGA; i++) {
            if (rw3270 != null) {
                cierraConexion();
            }
            try {
                bResp = login();
                if (bResp) {
                    break;
                }
            } catch (IOHTimeOutException | NullPointerException ex) {
                sException = "Error: " + ex.toString();
                LOG.error(sException + " - Pantalla:" + getDisplay());
                break;
            } catch (Exception ex) {
                sException = "Error: " + ex.toString();
                LOG.error(sException + " - Pantalla:" + getDisplay());
            }
        }
        bLogin = false;
        if (!bResp) {
            sException = "(11). Error en login: " + sException;
            tiempoEjecucion = System.currentTimeMillis() - inicioEjecucion;
            LOG.error(sException + " - " + toStringData() + " - Pantalla:" + getDisplay());
            if (rw3270 != null) {
                cierraConexion();
            }
            throw new ResourceException(sException);
        }
    }

    public OmegaData ejecutaConsultaOmega() throws Exception {
        final long inicioEjecucion = System.currentTimeMillis();
        try {
            enviaComando(-1, null, true, RW3270.ENTER, 5000);
            if (!getSegmento(getCoordenada(1, 19), 8).trim().equals(Constants.TXT_ZCICST)) {
                throw new IOHUnexpectedScreenException(Constants.ERR_PANTALLA_INVALIDA);
            }
            OmegaData omegaData = new OmegaData();
            omegaData.parseDate(getSegmento(getCoordenada(1, 60), 17).trim());
            omegaData.getListDisplay().add(getDisplayClean());

            consultaCics(omegaData);
            consultaCicsThread(omegaData);
            return omegaData;
        } catch (Exception ex) {
            tiempoEjecucion = System.currentTimeMillis() - inicioEjecucion;
            LOG.error("Error al ejecutar la consulta de Omega: " + ex.getMessage() + " - Tiempo Ejecucion: " + tiempoEjecucion + " ms - Pantalla:" + getDisplay());
            throw ex;
        }
    }

    private void consultaCics(OmegaData omegaData) throws Exception {
        int coordLinea = getCoordenada(11, 1);
        if (!getSegmento(coordLinea, 5).trim().equals(Constants.TXT_CICA)) {
            coordLinea = getCoordenada(Constants.TXT_CICA);
        }
        coordLinea += 320;

        final long inicioEjecucion = System.currentTimeMillis();
        final long execTimeOut = 10000L;
        try {
            while (getSegmento(coordLinea, 1).equals("+")) {
                verificaExecTimeOut(inicioEjecucion, execTimeOut);
                Cics cicsData = new Cics();
                cicsData.setFullText(StringUtils.trimToEmpty(getSegmento(coordLinea, 79)));
                cicsData.setCicsRels(StringUtils.trimToEmpty(getSegmento(coordLinea + 2, 5)));
                cicsData.setJobName(StringUtils.trimToEmpty(getSegmento(coordLinea + 8, 9)).toUpperCase());
                cicsData.setTotalCpu(StringUtils.trimToEmpty(getSegmento(coordLinea + 18, 7)));
                cicsData.setDb2Cpu(StringUtils.trimToEmpty(getSegmento(coordLinea + 26, 7)));
                cicsData.setpThrdMax(StringUtils.trimToEmpty(getSegmento(coordLinea + 34, 9)));
                cicsData.setActiveThreads(StringUtils.trimToEmpty(getSegmento(coordLinea + 44, 9)));
                cicsData.setCommitRateSec(StringUtils.trimToEmpty(getSegmento(coordLinea + 54, 10)));
                cicsData.setRoCommitRateSec(StringUtils.trimToEmpty(getSegmento(coordLinea + 65, 9)));
                omegaData.addCics(cicsData);
                coordLinea += 80;
            }
        } catch (Exception ex) {
            LOG.error("Error en la consulta de CICS: " + ex.getMessage() + " - Tiempo Ejecucion: " + (System.currentTimeMillis() - inicioEjecucion) + " ms");
            throw ex;
        }
    }

    private void consultaCicsThread(OmegaData omegaData) throws Exception {
        final int maxCoord = getCoordenada(24, 80);
        int coordLinea = getCoordenada(18, 1);
        if (!getSegmento(coordLinea, 5).trim().equals(Constants.TXT_THDC)) {
            coordLinea = getCoordenada(Constants.TXT_THDC);
        }
        coordLinea += 320;

        final long inicioEjecucion = System.currentTimeMillis();
        final long execTimeOut = 15000L;
        try {
            while (getSegmento(coordLinea, 1).equals("+")) {
                verificaExecTimeOut(inicioEjecucion, execTimeOut);
                CicsThread cicsThread = new CicsThread();
                cicsThread.setFullText(StringUtils.trimToEmpty(getSegmento(coordLinea, 79)));
                cicsThread.setElapsed(StringUtils.trimToEmpty(getSegmento(coordLinea + 1, 11)));
                cicsThread.setPlanName(StringUtils.trimToEmpty(getSegmento(coordLinea + 13, 8)));
                cicsThread.setTran(StringUtils.trimToEmpty(getSegmento(coordLinea + 22, 4)));
                cicsThread.setCpu(StringUtils.trimToEmpty(getSegmento(coordLinea + 27, 5)));
                cicsThread.setStatus(StringUtils.trimToEmpty(getSegmento(coordLinea + 33, 12)));
                cicsThread.setGetPg(StringUtils.trimToEmpty(getSegmento(coordLinea + 46, 6)));
                cicsThread.setUpdate(StringUtils.trimToEmpty(getSegmento(coordLinea + 53, 6)));
                cicsThread.setCommit(StringUtils.trimToEmpty(getSegmento(coordLinea + 60, 6)));
                cicsThread.setJobName(StringUtils.trimToEmpty(getSegmento(coordLinea + 67, 8)).toUpperCase());
                omegaData.addCicsThread(cicsThread);
                coordLinea += 80;

                if (coordLinea >= maxCoord) {
                    avanzaPantalla(1000);
                    coordLinea = getCoordenada(2, 1);
                    espera(100);
                    omegaData.getListDisplay().add(getDisplayClean());
                }
            }
            espera(timeOut);
        } catch (Exception ex) {
            LOG.error("Error en la consulta de Transacciones: " + ex.getMessage() + " - Tiempo Ejecucion: " + (System.currentTimeMillis() - inicioEjecucion) + " ms");
            throw ex;
        }
    }

    private char[] getDisplayClean() {
        int len = rw3270.getDisplay().length;
        char[] disp = new char[len];
        for (int i = 0; i < len; i++) {
            char caracter = rw3270.getDisplay()[i];
            switch ((int) caracter) {
                case 0:
                    caracter = ' ';
                    break;
                case 203:
                    caracter = '|';
                    break;
            }
            disp[i] = caracter;
        }
        return disp;
    }

}
