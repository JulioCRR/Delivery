/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 *
 * @author VI9XXG0
 */
public class BatchPersistencia {

    private static final Logger LOG = LoggerFactory.getLogger(BatchPersistencia.class);

    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactory;

    @Autowired
    private AdministradorListaMensajes administradorListaMensajes;

    public void iniciaBatch() {
        //LOG.error("iniciando batch");
        guardaMensajes();
    }

    public void guardaMensajes() {
        for (int i = 0; i < 5; i++) {
            M2kInfoRegistro registro = new M2kInfoRegistro();
            LinkedList<M2kInfoRegistro> lista;
            Iterator<M2kInfoRegistro> iterator;
            int numeroRegistros = 0;
            lista = administradorListaMensajes.getNelements(200);
            numeroRegistros = lista.size();
            //LOG.error("size de lista a guardar: " + numeroRegistros);
            long tiempoInicial = System.currentTimeMillis();
            EntityManager entityManager = managerFactory.createEntityManager();
            EntityTransaction transaction = entityManager.getTransaction();
            transaction.begin();
            iterator = lista.iterator();
            while (iterator.hasNext()) {
                registro = iterator.next();
                //LOG.error("guardando este id: " + registro.getIdPeticion());
                entityManager.persist(registro);
            }
            entityManager.flush();
            entityManager.clear();
            transaction.commit();
            UtilMonitoreo.setMensajesGuardados(numeroRegistros + UtilMonitoreo.getMensajesGuardados());
            UtilMonitoreo.setMensajesGuardadosPorHora(numeroRegistros + UtilMonitoreo.getMensajesGuardadosPorHora());
            UtilMonitoreo.setMensajesGuardadosPorDia(numeroRegistros + UtilMonitoreo.getMensajesGuardadosPorDia());
            if(numeroRegistros>0){
                UtilMonitoreo.setHoraUltimoMensajeGuardado(new Date(System.currentTimeMillis()));
            }
                
            
            UtilMonitoreo.setUltimoMensajeGuardado(registro.getIdPeticion());
            //LOG.error("tiempo final: " + (System.currentTimeMillis() - tiempoInicial) +"ms / "+numeroRegistros+" registros");
        }
    }

}
