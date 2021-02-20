package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common;

import java.util.LinkedList;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.ws.RunService;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.HistoryDataDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.History;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.HistoryDetail;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.db.common.HistoryStatus;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepuradorColas {

    private static final Logger LOG = LoggerFactory.getLogger(DepuradorColas.class);
    static int countReintentos = 0;
    
    @Autowired
    private InvocaService invocaService;

    @Autowired
    private HistoryDataDao historyDataDao;
    
    private boolean asyncStatusHistory = true;

    @SuppressWarnings("SleepWhileInLoop")
    public void gestionaDepuracionColas(String keyForExecute) {
        LocalDateTime localDateTime = LocalDateTime.now();
        String request, response;
        History history = new History();
        LinkedList<HistoryDetail> details = new LinkedList<>();
        boolean statusHistory = true;
        HistoryDetail detail;
        boolean statusDetail;
        String[] r;
        history.setDescription("Depuracion region: " + keyForExecute + " : " + localDateTime);
        history.setStartTime(localDateTime);
        if (CoreFunctions.getApplicationProperty("enviroment").equals("dev")) {
            if (keyForExecute.equals(ConstantesXMP.ALL_REGIONS)) {
                request = ConstantsWsdl.getI1H("I");
                for (short i = 1; i < 10; i++) {
                    statusHistory = executeService("CTG", i, request, history, statusHistory, details);
                }
                request = ConstantsWsdl.getI1G("I");
                for (short i = 1; i < 10; i++) {
                    statusHistory = executeService("IOH", i, request, history, statusHistory, details);
                }
                
                //V2 - Se agrega llamada a servicio I*1G por medio de CICS
                for (short i = 1; i < 10; i++) {
                    LOG.info("EJECUTANDO CICS PARA REGION: " + i);
                    request = ConstantsWsdl.getCISC(String.valueOf(i));
                    statusHistory = executeService("IOH_CICS", i, request, history, statusHistory, details);
                    try {
                        LOG.info("ESPERANDO 12 SEGUNDOS PARA LA EJECUCION DE LA SIGUIENTE REGION...");
                        Thread.sleep(12000);
                        LOG.info("TIEMPO DE ESPERA FINALIZADO!");
                    } catch (InterruptedException ex) {
                       LOG.error("ERROR AL EJECUTAR SLEEP", ex);
                        Thread.currentThread().interrupt();
                    }
                   
                }
                
            } else {
                request = ConstantsWsdl.getI1H("I");
                statusHistory = executeService("CTG", Short.valueOf(keyForExecute), request, history, statusHistory, details);

                request = ConstantsWsdl.getI1G("I");
                statusHistory = executeService("IOH", Short.valueOf(keyForExecute), request, history, statusHistory, details);
                
                request = ConstantsWsdl.getCISC(String.valueOf(keyForExecute));
                statusHistory = executeService("IOH_CICS", Short.valueOf(keyForExecute), request, history, statusHistory, details);
            }
        } else {
            if (keyForExecute.equals(ConstantesXMP.ALL_REGIONS)) {
                r = ConstantesXMP.REGIONES;
            } else {
                r = new String[1];
                r[0] = keyForExecute;
            }

            for (String r1 : r) {
                request = ConstantsWsdl.getI1H(r1);
                statusHistory = executeService("CTG", Short.valueOf(r1), request, history, statusHistory, details);
            }
            for (String r1 : r) {
                request = ConstantsWsdl.getI1G(r1);
                statusHistory = executeService("IOH", Short.valueOf(r1), request, history, statusHistory, details);
            }
            for (String r1 : r) {
                request = ConstantsWsdl.getCISC(r1);
                statusHistory = executeService("IOH_CICS", Short.valueOf(r1), request, history, statusHistory, details);
            }
        }
        history.setStatus(asignaStatus(statusHistory));
        history.setHistoryDetailList(details);
        historyDataDao.save(history);

    }

    public boolean executeService(String key, Short region, String request, History history, boolean statusHistory, LinkedList<HistoryDetail> details) throws NumberFormatException {
        LocalDateTime localDateTime;
        HistoryDetail detail;
        String response;
        boolean statusDetail;
        localDateTime = LocalDateTime.now();
        detail = new HistoryDetail();
        detail.setStartTime(localDateTime);
        detail.setDescription(key + " " + localDateTime);
        response = invocaServicioDepuracion(request);
        localDateTime = LocalDateTime.now();
        detail.setEndTime(localDateTime);
        detail.setHistory(history);
        detail.setRegion(region);
        detail.setRequest(request);
        detail.setResponse(response == null ? "No se pudo conectar al servicio" : response);
        statusDetail = validaRespuesta(response,"PG010 OPERACION EXITOSA");
        
        if (!statusDetail) { // SI NO DEVUELVE PG010, SE VALIDA QUE EL USUARIO NO ESTE LOGEADO "You are already signed on at another terminal."
            statusDetail = validaRespuesta(response,"performe#DFHCE3588"); //performe#DFHCE3588
            if (statusDetail && DepuradorColas.countReintentos < 1) {
                 try {
                        LOG.info("ESPERANDO 10 SEGUNDOS PARA REINTENTO...");
                        Thread.sleep(10000);
                        LOG.info("TIEMPO DE ESPERA FINALIZADO!");
                        DepuradorColas.countReintentos++;
                        executeService(key,region,request,history,statusHistory,details);
                    } catch (InterruptedException ex) {
                       LOG.error("ERROR AL EJECUTAR SLEEP", ex);
                        Thread.currentThread().interrupt();
                    }
            } else {
                DepuradorColas.countReintentos=0;
            }
        } else {
            DepuradorColas.countReintentos=0;
        }
        
        statusHistory = statusHistory && statusDetail;
        detail.setStatus(asignaStatus(statusDetail));
        details.add(detail);
        return statusHistory;
    }

    public String invocaServicioDepuracion(String xml) {
        LOG.debug("depurando colas");
        try {
            RunService runService = new RunService();
            String result = runService.ejecutaServicio(xml);

            return result;
        } catch (Exception ex) {
            return null;
        }
    }

    public boolean validaRespuesta(String respuesta, String valorEsperado) {
        try {
            return respuesta.contains(valorEsperado);

        } catch (Exception e) {
            return false;
        }
    }

    public HistoryStatus asignaStatus(boolean status) {
        if (status) {
            return HistoryStatus.SUCCESSFUL;
        }
        return HistoryStatus.ERROR;
    }

}
