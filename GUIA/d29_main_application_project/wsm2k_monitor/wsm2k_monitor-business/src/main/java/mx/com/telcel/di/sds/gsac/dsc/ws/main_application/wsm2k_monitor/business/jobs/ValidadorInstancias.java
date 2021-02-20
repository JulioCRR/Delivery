package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ListaInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertasInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.SOAPRequestParameter;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.ValidaInstanciaThread;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.MailManagerMonitor;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.SOAPRequest;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.CatInstancia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

public class ValidadorInstancias {

    private static final org.apache.log4j.Logger LOG = org.apache.log4j.Logger.getLogger(ValidadorInstancias.class);

    @Autowired
    private ListaInstancias listaInstancias;

    @Autowired
    private MailManagerMonitor mailManager;

    @Autowired
    private RegistroAlertasInstancias registroAlertasInstancias;

    private String sender;

    private int timeOutInstancias;


    
    private boolean  validateProfile;

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;
    
    int contador=0;

    public void validaInstancias() {
          
        Iterator<InstanciaWSM2K> instancias = listaInstancias.getInstanciasWSM2K().iterator();
        InstanciaWSM2K instancia = new InstanciaWSM2K();
        if (validateProfile) {
            while (instancias.hasNext()) {
                instancia = instancias.next();
                if (instancia.getHabilitada() == CatInstancia.HABILITADA) {
                    taskExecutor.execute(new ValidaInstanciaThread(instancia, generaSOAPRequest(),
                            mailManager, sender, UtilMonitoreo.getDestinatariosAlertas(),
                            registroAlertasInstancias));                    
                } else {
                    instancia.setStatusValidation(false);
                    instancia.setDescription("disabled");
                }
            }
        }
    }


    public SOAPRequest generaSOAPRequest() {
        SOAPRequest request = new SOAPRequest();
        request.setUser(Constants.USER_TEST);
        request.setRegion(Constants.REGION_TEST);
        request.setFunction(Constants.FUNCTION_TEST);
        request.setAction(Constants.ACTION_TEST);
        request.setService(Constants.SERVICE_TEST);
        List<SOAPRequestParameter> parameterList = new ArrayList<>();
        parameterList.add(new SOAPRequestParameter(Constants.ETIQUETA_TEST, 
                            Constants.LONGUITUD_TEST, Constants.TELEFONO_TEST));
        request.setParametersList(parameterList);
        return request;
    }

    public void enviaCorreoAlerta() {

    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public int getTimeOutInstancias() {
        return timeOutInstancias;
    }

    public void setTimeOutInstancias(int timeOutInstancias) {
        this.timeOutInstancias = timeOutInstancias;
    }

    public boolean isValidateProfile() {
        return validateProfile;
    }

    public void setValidateProfile(boolean validateProfile) {
        this.validateProfile = validateProfile;
    }


}
