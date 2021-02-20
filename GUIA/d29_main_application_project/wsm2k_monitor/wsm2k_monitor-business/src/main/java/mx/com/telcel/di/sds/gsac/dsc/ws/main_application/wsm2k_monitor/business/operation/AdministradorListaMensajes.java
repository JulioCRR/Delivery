/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.Delayer;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;


/**
 *
 * @author VI9XXG0
 */
public class AdministradorListaMensajes {
    
    private static final Logger LOG = LoggerFactory.getLogger(AdministradorListaMensajes.class);
    
    private LinkedList<M2kInfoRegistro> listaMensajes=new LinkedList();
    
    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactory;
    
    private int maxSizeList=50000;
    
    public LinkedList<M2kInfoRegistro> getListaMensajes() {
        return listaMensajes;
    }

    public void setListaMensajes(LinkedList<M2kInfoRegistro> listaMensajes) {
        this.listaMensajes = listaMensajes;
    }
    
    public synchronized  void  agregaRegistro(M2kInfoRegistro registro){
         
        //LOG.info("se agrega registro: "+ registro.getIdPeticion() );
        //Delayer.delay(3);
        LinkedList<M2kInfoRegistro> aux;
        if( listaMensajes.size()>500 ){
            LOG.error("ejecutado limpieza auxiliar");
            aux=(LinkedList<M2kInfoRegistro>) this.listaMensajes.clone();
            this.listaMensajes=new LinkedList<M2kInfoRegistro>();
            long tiempoInicial=System.currentTimeMillis();
            guardaMensajes(aux);
            LOG.error("tiempo de limpieza auxiliar: "+(System.currentTimeMillis()-tiempoInicial)+" / num registros: "+aux.size());
        }
        this.listaMensajes.add(registro);
        
        
        
    }
    
    public LinkedList<M2kInfoRegistro> getNelements(int numeroRegistros){
        
        LinkedList<M2kInfoRegistro> registros=new LinkedList<>();
        int exceptions=0;
        for(int i=0;i<numeroRegistros;i++){
           try{
               //Delayer.delay(2);
               registros.add( listaMensajes.remove() );
           }
           catch(Exception e){
               exceptions++;
           } 
            
        }
        //LOG.error("bloque,exceptions,sizeTotal: "+registros.size()+","+exceptions+","+listaMensajes.size());
        
    
        return registros;
    }

    public int getMaxSizeList() {
        return maxSizeList;
    }

    public void setMaxSizeList(int maxSizeList) {
        this.maxSizeList = maxSizeList;
    }

     public void guardaMensajes(LinkedList<M2kInfoRegistro> registrosAux ) {
        
            M2kInfoRegistro registro = new M2kInfoRegistro();
            
            Iterator<M2kInfoRegistro> iterator;
            int numeroRegistros = 0;
            
            numeroRegistros = registrosAux.size();
            LOG.error("size de lista a guardar: " + numeroRegistros);
            long tiempoInicial = System.currentTimeMillis();
            EntityManager entityManager = managerFactory.createEntityManager();
            EntityTransaction transaction = entityManager.getTransaction();
            transaction.begin();
            iterator = registrosAux.iterator();
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
            UtilMonitoreo.setHoraUltimoMensajeGuardado(new Date(System.currentTimeMillis()));
            UtilMonitoreo.setUltimoMensajeGuardado(registro.getIdPeticion());
            //LOG.error("tiempo final: " + (System.currentTimeMillis() - tiempoInicial) +"ms / "+numeroRegistros+" registros");
        
    }
    
    
}
