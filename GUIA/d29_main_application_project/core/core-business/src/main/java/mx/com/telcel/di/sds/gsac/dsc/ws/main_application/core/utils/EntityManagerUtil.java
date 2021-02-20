/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 *
 * @author Ing. Julio Cesar Lechuga
 */
@Component
public class EntityManagerUtil {
    
    @Autowired
    @Qualifier(value = "entityManagerFactory")
    private EntityManagerFactory managerFactory;
    
    @Autowired
    @Qualifier(value = "entityManagerFactoryInformix")
    private EntityManagerFactory managerFactoryInfx;
    
    private static EntityManager entityManager;
     private static EntityManager entityManagerIfx;
    
    public EntityManager getEntityManager() {
        if(EntityManagerUtil.entityManager==null){
            EntityManagerUtil.entityManager = managerFactory.createEntityManager();
            return EntityManagerUtil.entityManager;
        }
        return EntityManagerUtil.entityManager;
    }
    
    public EntityManager getEntityManagerInformix() {
        if(EntityManagerUtil.entityManagerIfx==null){
            EntityManagerUtil.entityManagerIfx = managerFactoryInfx.createEntityManager();
            return EntityManagerUtil.entityManagerIfx;
        }
        return EntityManagerUtil.entityManagerIfx;
    }

}
