package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;


import java.util.LinkedList;
import java.util.List;
import javax.annotation.PostConstruct;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.services.IncidenciasServices;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao.CatInstanciaWSM2KDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.CatInstancia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ListaInstancias {
    
    @Autowired
    private CatInstanciaWSM2KDao dao;

    private static LinkedList<InstanciaWSM2K> instanciasWSM2K;
    
    private static final Logger LOG = LoggerFactory.getLogger(IncidenciasServices.class);

    @PostConstruct
    public boolean initListaInstancia() {
       
        List<CatInstancia> listaInstancias = dao.listaCatInstancias();
        if (listaInstancias != null && listaInstancias.size() > 0){
            instanciasWSM2K = new LinkedList<>();
            for (CatInstancia cat : listaInstancias) {
                instanciasWSM2K.add(new InstanciaWSM2K(cat.getId(),
                        cat.getCatServidor().getnServidor(), cat.getCatPuerto().getnPuerto(), cat.getHabilitada()));
            }
            LOG.info("SE CARGAN LAS INSTANCIAS");
            return true;
        }
        
        return false;
    }

    public LinkedList<InstanciaWSM2K> getInstanciasWSM2K() {
        return instanciasWSM2K;
    }

    public void setInstanciasWSM2K(LinkedList<InstanciaWSM2K> instanciasWSM2K) {
        this.instanciasWSM2K = instanciasWSM2K;
    }

    public synchronized void addInstanciaWSM2KSync(CatInstancia instancia) {
        instanciasWSM2K.add(new InstanciaWSM2K(instancia.getId(), instancia.getCatServidor().getnServidor(),
                instancia.getCatPuerto().getnPuerto(), instancia.getHabilitada()));
    }
}
