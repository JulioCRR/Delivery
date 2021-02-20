/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.repository;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
//@Configuration
//@Order(Ordered.HIGHEST_PRECEDENCE)
//@Qualifier(value = "entityManagerFactory")
//@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository { //extends PagingAndSortingRepository<Usuario, Integer> {


}
